#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CodygoStack } from "../lib/codygo-stack";
// import { CodygoBucketStack } from "../lib/codygo-bucket-stack";

const app = new cdk.App();

const lambdaStack = new CodygoStack(app, "CodygoLambdaStack");
// const bucketStack = new CodygoBucketStack(app, "CodygoBucketStack");
