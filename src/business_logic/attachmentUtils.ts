import * as AWS from "aws-sdk";
import * as AWSXray from "aws-xray-sdk";
import * as uuid from "uuid";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

const XAWS = AWSXray.captureAWS(AWS);

const s3BucketName = process.env.S3_BUCKET_NAME;
const UrlExpiration = 300;

export class AttachmentUtils {
  constructor(
    private readonly s3 = new XAWS.S3({ signatureVersion: "v4" }),
    private readonly bucketName = s3BucketName
  ) {}

  getAttachmentUrl(uploadId: string) {
    return `https://${this.bucketName}.s3.amazonaws.com/${uploadId}`;
  }

  getUploadUrl(): string {
    const url = this.s3.getSignedUrl("putObject", {
      Bucket: this.bucketName,
      key: uuid.v4(),
      Expires: UrlExpiration,
    });
    return url as string;
  }

  async getUploads(): Promise<string[]> {
    const uploads: string[] = [];
    const params: ListObjectsV2Command = {
      Bucket: this.bucketName,
    };

    const data = await this.s3.listObjectsV2({ params });
    return uploads;
  }
}
