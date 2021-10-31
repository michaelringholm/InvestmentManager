import * as CloudFront from '@aws-cdk/aws-cloudfront';
import { CloudFrontWebDistribution, OriginAccessIdentity } from '@aws-cdk/aws-cloudfront';
import { Distribution, IDistribution } from '@aws-cdk/aws-cloudfront/lib/distribution';
import { IRole, Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import { BlockPublicAccess, Bucket, IBucket } from '@aws-cdk/aws-s3/lib/bucket';
import * as Core from '@aws-cdk/core';
import { Tags } from '@aws-cdk/core';
import { MetaData } from './meta-data';

export class OMInvestWebStack extends Core.Stack {
  constructor(scope: Core.Construct, id: string, props?: Core.StackProps) {
    super(scope, id, props);
    var bucket = this.defineWebBucket();
    var cdn = this.defineCDN(bucket);
  }

  private defineCDN(bucket:IBucket):IDistribution {
    var oai = new OriginAccessIdentity(this, MetaData.PREFIX+"oai");
    var distribution = new CloudFrontWebDistribution(this, MetaData.PREFIX+"cdn", {       
      originConfigs: [
      {
        s3OriginSource: {
          s3BucketSource: bucket,
          originAccessIdentity: oai          
        },
        behaviors : [ {isDefaultBehavior: true}],        
      }]
    });
        
    Tags.of(distribution).add(MetaData.NAME, MetaData.PREFIX+"cdn");
    return distribution;
  }

  private defineWebBucket():IBucket {
    var bucket = new Bucket(this, MetaData.PREFIX+"s3-web", { 
      bucketName: MetaData.PREFIX+"s3-web",
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      versioned: false
    });
    
    Tags.of(bucket).add(MetaData.NAME, MetaData.PREFIX+"s3-web");
    return bucket;
  }

  private buildLambdaRole(): IRole {
    var role = new Role(this, MetaData.PREFIX+"role", {
      assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
      roleName: MetaData.PREFIX+"ec2-asg-role",
      description: "EC2 Role used for the auto scaling group launch configuration"
    });
    return role;
  }
}

