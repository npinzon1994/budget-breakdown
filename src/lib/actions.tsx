"use server";
import { MongoClient } from "mongodb";
import { z } from "zod";
import { hash } from "bcryptjs";

const DB_URL = process.env.MONGODB_URI;

const schema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(10, { message: "Password length must be at least 10 characters" })
      .max(100, { message: "Password cannot be more than 100 characters" })
      .refine(
        (value) => /[A-Z]/.test(value),
        "Password must contain at least one uppercase letter"
      )
      .refine(
        (value) => /[a-z]/.test(value),
        "Password must contain at least one lowercase letter"
      )
      .refine(
        (value) => /[^A-Za-z0-9]/.test(value),
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .max(100, { message: "Password cannot be more than 100 characters" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords need to match",
        path: ["confirmPassword"],
      });
    }
  });

export async function createNewUser(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to register",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    if (!DB_URL) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }
    const client = await MongoClient.connect(DB_URL);
    const db = client.db();
    const usersCollection = db.collection("users"); //a collection is like a table -- and a document is like an entry

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return {
        ...prevState,
        message: `User with email '${email}' already exists`,
      };
    }

    const hashedPassword = await hash(password, 12);

    const newUser = {
      email,
      password: hashedPassword,
      name: "",
      accounts: [],
      bills: [],
    };

    await usersCollection.insertOne(newUser); //inserts a new user into the users collection -- documents are just JS objects
    client.close();

    return {
      ...prevState,
      formData: {email, password},
      status: "ok",
      message: "User created successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      ...prevState,
      message: "An error occurred. Please try again later.",
    };
  }
}
