import dotenv from "dotenv";
dotenv.config();

import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

async function getObjectUrl(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour expiry
  return url;
}

async function putObj(fileName, contentType) {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
}
async function listObjects() {
  const commond = new ListObjectsV2Command({
    Bucket: process.env.BUCKET_NAME,
    Prefix: "",
  });
  const result = await s3Client.send(commond);
  console.log(result);
  return result;
}

async function deleteObject(key) {
  const commond = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });
  try {
    const response = await s3Client.send(commond);
    console.log("Deleted ", response);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { putObj, listObjects, getObjectUrl, deleteObject };

// async function init() {
// console.log("Signed GET URL:", await getObjectUrl("uploads/ziauddin/class-B.A/Maths/1758362978851.pdf"));
// console.log("Signed GET URL:", await deleteObject());
// console.log("Signed PUT URL:", await putObj(`image-${Date.now()}.jpeg`, "image/jpeg"));
// init();
// }
