import * as AWS from "aws-sdk";
import * as AWSXray from "aws-xray-sdk";
import * as uuid from "uuid";

const XAWS = AWSXray.captureAWS(AWS);

const s3BucketName = "codygo-interview-bucket";
const UrlExpiration = 300;

export class AttachmentUtils {
  constructor(
    private readonly s3 = new XAWS.S3({ signatureVersion: "v4" }),
    private readonly bucketName = s3BucketName
  ) {}

  getUploadUrl(): string {
    const url = this.s3.getSignedUrl("putObject", {
      Bucket: this.bucketName,
      key: uuid.v4(),
      Expires: UrlExpiration,
    });
    return url as string;
  }

  async getUploads(): Promise<string[]> {
    try {
      const uploads: string[] = [];
      const params: any = {
        Bucket: this.bucketName,
      };

      const data = await this.s3.listObjectsV2(params).promise();
      for (const object of data.Contents!) {
        const downloadUrl = `https://${this.bucketName}.s3.amazonaws.com/${object.Key}`;
        uploads.push(downloadUrl);
      }

      return uploads;
    } catch (error) {
      console.error("An error occurred while getting uploads:", error);
      throw error;
    }
  }
}
