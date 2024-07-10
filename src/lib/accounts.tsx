import { MongoClient } from "mongodb";
import slugify from "slugify";
import ShortUniqueId from "short-unique-id";
import { S3 } from "@aws-sdk/client-s3";
import Account from "src/models/account";

const DB_URL = process.env.MONGODB_URI;

const s3 = new S3({
  region: "us-east-2",
});

export async function getAccounts(userId: string) {
  //get accts from db

  try {
    if (!DB_URL) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }

    const client = await MongoClient.connect(DB_URL);
    const db = client.db();
    const accountsCollection = db.collection("accounts");

    const accountsCollectionData = await accountsCollection
      .find({ associatedUser_ID: userId })
      .toArray();

    const userAccounts = JSON.parse(JSON.stringify(accountsCollectionData));

    // console.log("User Accounts: ", userAccounts);
    client.close();
    return userAccounts;
  } catch (error) {
    console.error("Could not fetch user accounts. Please try again later.");
    return {
      message: "Could not fetch user accounts. Please try again later.",
    };
  }
}

export async function saveNewAccount(account: any) {
  const { randomUUID } = new ShortUniqueId({ length: 12 });

  try {
    if (!DB_URL) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }

    const generatedSlug = `${slugify(account.nickName, {
      lower: true,
    })}-${randomUUID()}`;

    account.accountSlug = generatedSlug;

    if (account.icon.size > 0) {
      console.log("ACCOUNT ICON (user uploaded image): ", account.icon);
      const extension = account.icon.name.split(".").pop();
      const fileName = `${generatedSlug}.${extension}`;
      console.log("IMAGE FILE NAME: ", fileName);
      const bufferedImage = await account.icon.arrayBuffer();

      console.log("Writing image to S3 Bucket...");
      s3.putObject({
        Bucket: "budget-breakdown-account-images",
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: account.icon.type,
      });

      account.icon = fileName;
    } else {
      account.icon = null;
      console.log("ACCOUNT ICON (no uploaded image): ", account.icon);
    }

    const client = await MongoClient.connect(DB_URL);
    const db = client.db();
    const accounts = db.collection("accounts");

    await accounts.insertOne(account);
    console.log("ACCOUNT ADDED TO DATABASE");
    client.close();
  } catch (error) {
    console.error("Something went wrong. Please try again later.", error);
  }
}

export async function overwriteAccount(slug: string, account: any) {
  if (!DB_URL) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  try {
    const client = await MongoClient.connect(DB_URL);
    const db = client.db();
    const accountsCollection = db.collection("accounts");

    await accountsCollection.updateOne(
      {
        accountSlug: slug,
      },
      {
        $set: {
          nickName: account.nickName,
          balance: account.balance,
          icon: `https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${account.icon}`,
          note: account.note,
          creditLimit: account.creditLimit,
          billingDate: account.billingDate,
          dueDate: account.dueDate,
        },
      }
    );

    console.log("OVERWRIGHT SUCCESSFUL!");
    client.close();
  } catch (error) {
    console.error("Could not find account. Please try again later.", error);
  }
}

export async function getAccountDetails(userId: string, accountSlug: string) {
  if (!DB_URL) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  try {
    const client = await MongoClient.connect(DB_URL);
    const db = client.db();
    const accountsCollection = db.collection("accounts");

    const currentUserAccounts = await accountsCollection
      .find({
        associatedUser_ID: userId,
      })
      .toArray();

    const currentAccountData = currentUserAccounts.find(
      (account) => account.accountSlug === accountSlug
    );

    if (!currentAccountData) {
      throw new Error("Account not found.");
    }

    const currentAccount = JSON.parse(JSON.stringify(currentAccountData));
    console.log("Current Account (accounts.tsx): ", currentAccount);
    client.close();
    return currentAccount;
  } catch (error) {
    console.error("Could not find account. Please try again later.", error);
  }
}
