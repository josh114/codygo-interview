import * as cdk from "aws-cdk-lib";

import { Construct } from "constructs";

export class CodygoLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const upload_path = "src/lambda/http";
    const auth_path = "src/lambda/auth";
    const bucket_name = "codygo-interview_bucket";

    const getUploads = new cdk.aws_lambda.Function(this, "CodygoLambda", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      code: cdk.aws_lambda.Code.fromAsset(upload_path),
      handler: "getUpload.handler",
      environment: {
        BUCKET_NAME: bucket_name,
      },
    });

    const generateUploadUrl = new cdk.aws_lambda.Function(
      this,
      "GenerateUploadUrl",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        code: cdk.aws_lambda.Code.fromAsset(upload_path),
        handler: "generateUploadUrl.handler",
        environment: {
          BUCKET_NAME: bucket_name,
        },
      }
    );

    const auth = new cdk.aws_lambda.Function(this, "Auth", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      code: cdk.aws_lambda.Code.fromAsset(auth_path),
      handler: "authorizer.handler",
      environment: {
        BUCKET_NAME: bucket_name,
      },
    });

    const api = new cdk.aws_apigateway.RestApi(this, "CodygoApi", {
      defaultMethodOptions: {
        authorizationType: cdk.aws_apigateway.AuthorizationType.NONE,
      },
    });

    const uploadsResource = api.root.addResource("uploads");

    uploadsResource.addMethod(
      "GET",
      new cdk.aws_apigateway.LambdaIntegration(getUploads),
      {
        methodResponses: [{ statusCode: "200" }],
      }
    );

    uploadsResource.addMethod(
      "POST",
      new cdk.aws_apigateway.LambdaIntegration(generateUploadUrl),
      {
        methodResponses: [{ statusCode: "200" }],
      }
    );
    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
    });
  }
}
