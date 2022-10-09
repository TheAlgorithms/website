import dotenv from "dotenv";
import AWS from "aws-sdk";

dotenv.config();

let s3: AWS.S3;

export const awsAvailable =
  process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY;

export const shouldUseISR = awsAvailable || !process.env.VERCEL;

export function S3() {
  if (awsAvailable) {
    if (!s3)
      s3 = new AWS.S3({
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      });
    return s3;
  }
  return undefined;
}
