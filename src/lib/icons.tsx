"use server";

import {
  ListObjectsCommand,
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

const client = new S3Client();

export async function saveIcon(imageFile: FormData, userID: string) {
  //Verifying environment variables
  console.log("ACCESS KEY ID -- ", process.env.AWS_ACCESS_KEY_ID);
  console.log("SECRET KEY -- ", process.env.AWS_SECRET_ACCESS_KEY);
  console.log("REGION -- ", process.env.AWS_REGION);

  const file = imageFile.get("uploadedImage") as File;

  try {
    //need to see if user folder exists
    //if it does, save to that folder ELSE, create the folder

    if (!file) {
      return;
    }

    const bufferedImage = await file.arrayBuffer();
    const params = {
      Bucket: "budget-breakdown-account-images",
      Key: `${userID}/${file.name}`,
      Body: Buffer.from(bufferedImage),
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);
    await client.send(command);
    revalidatePath("/dashboard/accounts/new-account");
    return params.Key;
  } catch (error) {
    console.error(
      "There was a problem uploading the image. Please try again later.",
      error
    );
    return error;
  }
}

function swapIcons(a: any, b: any) {
  if (a.dateModified && b.dateModified) {
    return a.dateModified.getTime() - b.dateModified.getTime();
  }

  if (a.dateModified === null || a.dateModified === undefined) return 1;
  if (b.dateModified === null || b.dateModified === undefined) return -1;
  return 0;
}

export async function getIcons(userID: string) {
  try {
    const command = new ListObjectsCommand({
      Bucket: "budget-breakdown-account-images",
      Prefix: `${userID}/`,
    });
    const response = await client.send(command);
    const contents = response.Contents;

    if (!contents) {
      throw new Error("Failed to fetch contents.");
    }

    //need to extract out VALUE and DATE MODIFIED
    //sort by date modified
    //store in new array and return

    const loadedIcons = contents.map((icon) => {
      return { key: icon.Key, dateModified: icon.LastModified };
    });

    loadedIcons.sort(swapIcons);

    const sortedIcons = loadedIcons.map(icon => icon.key);

    console.log(sortedIcons);
    return sortedIcons;
  } catch (error) {
    console.error("Trouble fetching icons", error);
  }
}
