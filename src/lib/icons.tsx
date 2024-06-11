import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "us-east-2",
});

export async function getIcons() {
  try {
    const command = new ListObjectsCommand({
      Bucket: "budget-breakdown-account-images",
      Prefix: "bank-icons"
    });
    const response = await client.send(command);
    const contents = response.Contents;
    const icons = contents?.map((icon) => icon.Key);
    icons?.shift()
    console.log(icons);
    return icons;
  } catch (error) {
    console.error("Trouble fetching icons", error);
  }
}
