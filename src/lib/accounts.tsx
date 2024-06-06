import { MongoClient } from "mongodb";
import slugify from "slugify";

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

    console.log("User Accounts: ", userAccounts);
    return userAccounts;
  } catch (error) {
    console.error("Could not fetch user accounts. Please try again later.");
    return {
      message: "Could not fetch user accounts. Please try again later.",
    };
  }
}

export async function saveAccount(account: any) {
  try {
    if (!DB_URL) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }

    if (account.nickName) {
      account.accountSlug = slugify(account.nickName, { lower: true });
    } else {
      account.accountSlug = slugify(`${account.bank} ${account.type}`, {
        lower: true,
      });
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
