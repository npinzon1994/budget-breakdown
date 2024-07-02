"use server";

import { currentUser } from "@clerk/nextjs/server";
import { saveAccount } from "./accounts";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateInitialTransaction, saveExpense } from "./transactions";

const MAX_FILE_SIZE = 5000000;

const accountSchema = z.object({
  accountType: z.string(),
  accountNickname: z.string().min(1, { message: "Name is required" }),
  // accountNumber: z.preprocess(
  //   (val) => Number(val),
  //   z.number().min(1, { message: "Account Number required" })
  // ),
  startingBalance: z.preprocess((val) => Number(val), z.number()),
  icon: z
    .any()
    .refine(
      (file) => file && file.size <= MAX_FILE_SIZE,
      "Max image size is 5MB."
    )
    .optional(),
  note: z.string().optional(),
  creditLimit: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .positive({ message: "Credit limit must be above $0" })
      .optional()
      .or(z.literal(0))
  ),
  billingDate: z.string().date().nullable().or(z.literal("")),
  dueDate: z.string().date().nullable().or(z.literal("")),
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
      // accountNumber: formData.get("accountNumber"),
      startingBalance: Number(formData.get("startingBalance")),
      icon: formData.get("icon"),
      note: formData.get("note"),
      creditLimit: formData.get("creditLimit"),
      billingDate: formData.get("billingDate"),
      dueDate: formData.get("dueDate"),
    };

    console.log("Icon: ", accountSchema.parse(formInputs).icon);

    //separate try/catch block for validation errors
    try {
      const validData = accountSchema.parse(formInputs);

      const newAccount = {
        associatedUser_ID: user.id,
        type: validData.accountType,
        nickName: validData.accountNickname,
        // accountNumber: validData.accountNumber,
        balance: validData.startingBalance,
        icon: validData.icon,
        note: validData.note,
        creditLimit: validData.creditLimit,
        billingDate: validData.billingDate,
        dueDate: validData.dueDate,
      };

      await saveAccount(newAccount);
      await generateInitialTransaction(newAccount);
      revalidatePath("/dashboard/accounts");
      return { status: 200, message: "Account added successfully!" };
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const errors = validationError.errors.reduce(
          (acc: Record<string, string>, err) => {
            acc[err.path[0]] = err.message;
            console.log("errors: ", acc);
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

export async function createNewExpense(prevState: any, formData: FormData) {
  if(!prevState?.currentAccount_ID) {
    console.log("NO ACCOUNT_ID FROM LAST SUBMISSION");
    return;
  }
  const currentAccount_ID = prevState.currentAccount_ID;
  console.log("CURRENT ACCOUNT (actions.tsx) - ", currentAccount_ID);

  const formInputs = {
    amount: Number(formData.get("amount")),
    date: formData.get("datePicker"),
    merchant: formData.get("merchant"),
  };

  try {
    console.log("AMOUNT: ", formInputs.amount);
    console.log("DATE: ", formInputs.date);
    console.log("MERCHANT: ", formInputs.merchant);

    const transaction = {
      associatedAccount_ID: currentAccount_ID,
      //outsideAccount_ID gonna be added later (maybe)
      date: formInputs.date,
      amount: formInputs.amount,
      merchant: formInputs.merchant,
    };

    //here check if amount is valid
    if (transaction.amount <= 0) {
      console.log("ERROR -- amount must be greater than zero!!!");
      return {
        ...prevState,
        status: 400,
        message: "Please enter a dollar amount greater than $0.00",
        currentAccount_ID: prevState.currentAccount_ID,
      };
    }

    await saveExpense(transaction);
    revalidatePath("/[accountSlug]", "page");
    return {
      ...prevState,
      status: 200,
      message: "Account added successfully!",
      currentAccount_ID: prevState.currentAccount_ID,
    };
  } catch (error) {
    console.error("Could not create transaction! Here's why --> ", error);

    return {
      ...prevState,
      status: 400,
      message: "Validation failed.",
      currentAccount_ID: prevState.currentAccount_ID,
    };
  }
}
