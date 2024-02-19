import * as cdk from "aws-cdk-lib";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3'
import { Construct } from "constructs";

export class CodygoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const upload_path = "src/lambda/http";
    const auth_path = "src/lambda/auth";
    const bucket_name = 'codygo-inteview-bucket'

    const getUploads = new lambda.Function(this, "CodygoLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset(upload_path),
      handler: "getUpload.handler",
      environment: {
        BUCKET_NAME: bucket_name,
      },
    });

    const generateUploadUrl = new lambda.Function(
      this,
      "GenerateUploadUrl",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        code: lambda.Code.fromAsset(upload_path),
        handler: "generateUploadUrl.handler",
        environment: {
          BUCKET_NAME: bucket_name,
        },
      }
    );

    const auth = new lambda.Function(this, "Auth", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset(auth_path),
      handler: "authorizer.handler",
      environment: {
        BUCKET_NAME: bucket_name,
      },
    });

    new apigw.LambdaRestApi(this, 'GetUpload', {
      handler: getUploads
    });

    new apigw.LambdaRestApi(this, 'GenerateUpload', {
      handler: generateUploadUrl
    });

    // const api = new apigw.RestApi(this, "CodygoApi", {
    //   defaultMethodOptions: {
    //     authorizationType: apigw.AuthorizationType.NONE,
    //   },
    // });

    // new cdk.CfnOutput(this, "BucketName", {
    //   value: bucket.bucketName,
    // });
  }
}
