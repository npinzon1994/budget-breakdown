import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import { MongoClient } from "mongodb";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  const DB_URL = process.env.MONGODB_URI;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  if (!DB_URL) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  //get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  //if there are no headers, throw an error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error ocurred -- no svix headers"), { status: 400 };
  }

  //get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  //create a new svix instance with your secret
  const webhook = new Webhook(WEBHOOK_SECRET);

  let event: WebhookEvent;

  //verify the payload with the headers
  try {
    event = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook", error);
    return new Response("Error ocurred", { status: 400 });
  }

  //do something with the payload

  const data = event.data;
  const eventType = event.type;
  console.log(`Webhook with and ID of ${data.id} and type of ${eventType}`);
  console.log("Webhook body: ", body);

  try {
    if (event.type === "user.created") {
      const client = await MongoClient.connect(DB_URL);
      const db = client.db();
      const usersCollection = db.collection("users");

      console.log("userId", data.id);

      const newUser = {
        clerkId: data.id,
        accounts: {},
        bills: {},
      };

      await usersCollection.insertOne(newUser);
      client.close();
    }
  } catch (error) {
    console.error("There was a problem adding this user to the database", error);
  }

  return new Response("", { status: 200 });
}
