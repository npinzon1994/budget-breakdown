import { MongoClient } from "mongodb";

const DB_URL = process.env.MONGODB_URI;

export default async function DashboardPage() {
  try {
    if (!DB_URL) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }
    const client = await MongoClient.connect(DB_URL);
    const db = client.db();
    const users = db.collection("users");

  } catch (error) {
    console.log(error);
  }

  return <div>Dashboard Page</div>;
}
