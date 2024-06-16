import { MongoClient, ObjectId } from "mongodb";
import Transaction from "src/models/transaction";

const DB_URL = process.env.MONGODB_URI;

export async function generateInitialTransaction(account: any) {
  try {
    if (!DB_URL) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }
    const client = await MongoClient.connect(DB_URL);
    const db = client.db();
    const transactionsCollection = db.collection("transactions");

    const transaction = {
      associatedAccount_ID: account._id.toString(),
      //outsideAccount_ID gonna be added later (maybe)
      type: "balance-adjustment",
      date: new Date(),
      amount: account.balance,
      merchant: "Starting balance",
    };

    await transactionsCollection.insertOne(transaction);
    console.log("INITIAL TRANSACTION CREATED FOR ACCOUNT: ", account.nickName);
    client.close();
  } catch (error) {
    console.error(
      "Could not create initial account. Now figure out why!",
      error
    );
  }
}

export async function saveExpense(expense: any) {
  try {
    if (!DB_URL) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }
    const client = await MongoClient.connect(DB_URL);
    const db = client.db();
    const transactionsCollection = db.collection("transactions");

    if (!expense) {
      throw new Error("Transaction not found.");
    }

    const transaction = {
      associatedAccount_ID: expense.associatedAccount_ID,
      //outsideAccount_ID gonna be added later (maybe)
      type: "expense",
      date: new Date(expense.date),
      amount: expense.amount,
      merchant: expense.merchant,
    };

    await transactionsCollection.insertOne(transaction);
    console.log("TRANSACTION SAVED TO DATABASE");

    //now here we should grab the account and update its balance
    const accountsCollection = db.collection("accounts");
    const accountObjectId = new ObjectId(expense.associatedAccount_ID);

    const updateAccount = {
      $inc: {
        balance: -Number(expense.amount),
      },
    };

    //updateOne takes filter {}, updateDocument {}, and options {}
    await accountsCollection.updateOne(
      { _id: accountObjectId },
      updateAccount,
      { upsert: false }
    );

    client.close();
  } catch (error) {
    console.log("Could not save transaction.", error);
  }
}

export async function getTransactions(
  accountID: string
): Promise<Transaction[]> {
  if (!DB_URL) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }
  const client = await MongoClient.connect(DB_URL);
  try {
    if (!client) {
      throw new Error("Could not connect to client");
    }
    const db = client.db();
    const transactionsCollection = db.collection("transactions");

    const numDocs = await transactionsCollection.estimatedDocumentCount();

    console.log("Number of DOCS: ", numDocs);

    const currentAccountTransactions = await transactionsCollection
      .find({
        associatedAccount_ID: accountID,
      })
      .toArray();

    console.log("Raw Transactions: ", currentAccountTransactions.length);

    const transactions: Transaction[] = JSON.parse(
      JSON.stringify(currentAccountTransactions)
    );
    console.log(
      `Parsed transactions for Account ID (${accountID.toString()}) - `,
      transactions
    );

    return transactions;
  } catch (error) {
    console.error(
      "Could not find any transactions associated with this account. Please try again later.",
      error
    );
    throw error;
  } finally {
    client.close();
  }
}
