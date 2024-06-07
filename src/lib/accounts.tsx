import { current } from "@reduxjs/toolkit";
import { MongoClient } from "mongodb";
import slugify from "slugify";
import ShortUniqueId from "short-unique-id";

const DB_URL = process.env.MONGODB_URI;

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

export async function saveAccount(account: any) {
  const { randomUUID } = new ShortUniqueId({ length: 12 });

  try {
    if (!DB_URL) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }

    let generatedSlug;
    if (account.nickName) {
      generatedSlug = `${slugify(account.nickName, {
        lower: true,
      })}-${randomUUID()}`;
    } else {
      generatedSlug = `${slugify(`${account.bank} ${account.type}`, {
        lower: true,
      })}-${randomUUID()}`;
    }

    account.accountSlug = generatedSlug;

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

export async function getAccountDetails(userId: string, accountSlug: string) {
  try {
    if (!DB_URL) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }

    const client = await MongoClient.connect(DB_URL);
    const db = client.db();
    const accountsCollection = db.collection("accounts");

    const currentUserAccounts = await accountsCollection
      .find({
        associatedUser_ID: userId,
      })
      .toArray();

    const currentAccountData = await currentUserAccounts.find(
      (account) => account.accountSlug === accountSlug
    );

    const currentAccount = JSON.parse(JSON.stringify(currentAccountData));
    console.log("Current Account: ", currentAccount);
    client.close();
    return currentAccount;
  } catch (error) {
    console.error("Could not find account. Please try again later.", error);
  }
}
