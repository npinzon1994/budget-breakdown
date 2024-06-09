"use server";

import { currentUser } from "@clerk/nextjs/server";
import { saveAccount } from "./accounts";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  accountType: z.string().min(1),
  accountNickname: z.string().optional(),
  bank: z.string().min(1),
  accountNumber: z.preprocess(
    (val) => Number(val),
    z.number().positive("Account number must be a positive number.")
  ),
  routingNumber: z.preprocess(
    (val) => Number(val),
    z.number().positive("Routing number must be a positive number.")
  ),
  startingBalance: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Starting balance must be at least 0.")
  ),
});

export async function createNewAccount(prevState: any, formData: FormData) {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 404,
        message: "User is not signed in.",
      };
    }

    const formInputs = {
      accountType: formData.get("accountType"),
      accountNickname: formData.get("accountNickname"),
      bank: formData.get("bank"),
      accountNumber: formData.get("accountNumber"),
      routingNumber: formData.get("routingNumber"),
      startingBalance: formData.get("startingBalance"),
    };

    //separate try/catch block for validation errors
    try {
      const validData = schema.parse(formInputs);

      const newAccount = {
        associatedUser_ID: user.id,
        type: validData.accountType,
        nickName: validData.accountNickname,
        bank: validData.bank,
        accountNumber: validData.accountNumber,
        routingNumber: validData.routingNumber,
        balance: validData.startingBalance,
      };

      await saveAccount(newAccount);
      revalidatePath("/dashboard/accounts");
      return { status: 200, message: "Account added successfully!" };
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const errors = validationError.errors.reduce(
          (acc: Record<string, string>, err) => {
            acc[err.path[0]] = err.message;
            console.log("errors: ", acc)
            return acc;
          },
          {}
        );
        return { status: 400, message: "Validation failed.", errors };
      } else {
        throw validationError;
      }
    }
  } catch (error) {
    console.error("Something went wrong. Please try again later.", error);
    return { status: 500, message: "Internal Server Error." };
  }
}
