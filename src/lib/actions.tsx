"use server";

import { currentUser } from "@clerk/nextjs/server";
import { saveAccount } from "./accounts";
import { revalidatePath } from "next/cache";

export async function createNewAccount(prevState: any, formData: FormData) {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 404,
        message: "User is not signed in."
      }
    }

    const newAccount = {
      associatedUser_ID: user.id,
      type: formData.get("account-type"),
      nickName: formData.get("account-nickname"),
      bank: formData.get("bank"),
      accountNumber: formData.get("account-number"),
      routingNumber: formData.get("routing-number"),
      balance: formData.get("starting-balance"),
    };

    await saveAccount(newAccount);
    revalidatePath("/dashboard/accounts");
  } catch (error) {
    console.error("Something went wrong. Please try again later.", error);
  }

  return {status: 200, message: "Account added successfully!"}
}
