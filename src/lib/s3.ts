import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: 'global',  // Can be anything
  endpoint: process.env.MEGA_S4_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.MEGA_S4_ACCESS_KEY!,
    secretAccessKey: process.env.MEGA_S4_SECRET_KEY!,
  },
  forcePathStyle: true,  // Important for MEGA S4!
});