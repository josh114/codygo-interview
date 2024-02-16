import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class CodygoBucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new cdk.aws_s3.Bucket(this, "CodygoBucket", {
      bucketName: "codygo-intervew-bucket",
      publicReadAccess: true,
    });

    new cdk.CfnOutput(this, "BucketName", {
      value: bucket.bucketName,
    });
  }
}
