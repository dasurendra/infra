import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3 from 'aws-cdk-lib/aws-s3';

interface CloudFrontStackProps extends cdk.StackProps {
  bucket: s3.Bucket;
}

export class CloudFrontStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CloudFrontStackProps) {
    super(scope, id, props);

    new cloudfront.CloudFrontWebDistribution(this, 'FrontendDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: props.bucket,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });
  }
}
