#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { S3Stack } from '../lib/s3-stack';
import { CloudFrontStack } from '../lib/cloudfront-stack';
import { LambdaStack } from '../lib/lambda-stack';
import { ApiGatewayStack } from '../lib/api-gateway-stack';

const app = new cdk.App();

const s3Stack = new S3Stack(app, 'S3Stack');
const cloudFrontStack = new CloudFrontStack(app, 'CloudFrontStack', {
  bucket: s3Stack.bucket,
});
const lambdaStack = new LambdaStack(app, 'LambdaStack');
const apiGatewayStack = new ApiGatewayStack(app, 'ApiGatewayStack', {
  backendFunction: lambdaStack.backendFunction,
});