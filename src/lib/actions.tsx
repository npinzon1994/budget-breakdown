"use server";

import { currentUser } from "@clerk/nextjs/server";
import { saveAccount } from "./accounts";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateInitialTransaction } from "./transactions";

const MAX_FILE_SIZE = 5000000;

const schema = z.object({
  accountType: z.string(),
  accountNickname: z.string().min(1, { message: "Name is required" }),
  accountNumber: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Account Number required" })
  ),
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
      accountNumber: formData.get("accountNumber"),
      startingBalance: formData.get("startingBalance"),
      icon: formData.get("icon"),
      note: formData.get("note"),
      creditLimit: formData.get("creditLimit"),
      billingDate: formData.get("billingDate"),
      dueDate: formData.get("dueDate"),
    };

    console.log("Icon: ", schema.parse(formInputs).icon);

    //separate try/catch block for validation errors
    try {
      const validData = schema.parse(formInputs);

      const newAccount = {
        associatedUser_ID: user.id,
        type: validData.accountType,
        nickName: validData.accountNickname,
        accountNumber: validData.accountNumber,
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
