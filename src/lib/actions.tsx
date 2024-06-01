"use server";

import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { MongoClient } from "mongodb";

const DB_URL =
  "mongodb+srv://npinzon1994:Oc9bfOtIAa1wNYEj@budget-breakdown.ilrnm2k.mongodb.net/?retryWrites=true&w=majority&appName=budget-breakdown";

export async function createNewUser(prevState, formData: FormData) {
  //form data
  const newUser = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
    name: "",
    accounts: [],
    bills: [],
  };

  const { password, confirmPassword } = newUser;

  try {
    if (password !== confirmPassword) {
      console.log(password, confirmPassword);
      return { message: "passwords need to match!" };
    }

    const client = await MongoClient.connect(DB_URL);
    const db = client.db();

    //a collection is like a table -- and a document is like an entry
    const usersCollection = db.collection("users");

    //inserts a new user into the users collection -- documents are just JS objects
    const result = await usersCollection.insertOne(newUser);
    

    client.close();

    return {message: "User created successfully!"}

  } catch (error) {
    console.log(error);
  }
}
