"use server";
import { MongoClient } from "mongodb";
import { redirect } from "next/navigation";
import { z } from "zod";

const DB_URL =
  "mongodb+srv://npinzon1994:Oc9bfOtIAa1wNYEj@budget-breakdown.ilrnm2k.mongodb.net/?retryWrites=true&w=majority&appName=budget-breakdown";

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

  try {
    if (!validatedFields.success) {
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to register",
      };
    }

    //form data
    const newUser = {
      email: formData.get("email"),
      password: formData.get("password"),
      name: "",
      accounts: [],
      bills: [],
    };

    const client = await MongoClient.connect(DB_URL);
    const db = client.db();

    //a collection is like a table -- and a document is like an entry
    const usersCollection = db.collection("users");

    //inserts a new user into the users collection -- documents are just JS objects
    const result = await usersCollection.insertOne(newUser);

    client.close();
    return {
      ...prevState,
      formData: "ok",
      message: "User created successfully!",
    };
  } catch (error) {
    console.log(error);
  }

  redirect("/overview");
}
