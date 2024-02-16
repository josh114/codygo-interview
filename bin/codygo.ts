#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CodygoBucketStack } from "../lib/codygo-bucket-stack";
import { CodygoLambdaStack } from "../lib/codygo-lambda-stack";

const app = new cdk.App();

const bucketStack = new CodygoBucketStack(app, "CodygoBucketStack");
const lambdaStack = new CodygoLambdaStack(app, "CodygoLambdaStack");
