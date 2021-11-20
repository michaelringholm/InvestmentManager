import * as CloudFront from '@aws-cdk/aws-cloudfront';
import { CloudFrontWebDistribution, OriginAccessIdentity, ViewerCertificate } from '@aws-cdk/aws-cloudfront';
import { Distribution, IDistribution, SecurityPolicyProtocol, SSLMethod } from '@aws-cdk/aws-cloudfront/lib/distribution';
import { IRole, Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import { ARecord, HostedZone, RecordTarget } from '@aws-cdk/aws-route53';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import { BucketDeployment } from '@aws-cdk/aws-s3-deployment/lib/bucket-deployment';
import { Source } from '@aws-cdk/aws-s3-deployment/lib/source';
import { BlockPublicAccess, Bucket, BucketEncryption, IBucket } from '@aws-cdk/aws-s3/lib/bucket';
import * as Core from '@aws-cdk/core';
import { RemovalPolicy, Tags } from '@aws-cdk/core';
import { Certificate } from 'crypto';
import { MetaData } from './meta-data';

export class OMInvestWebStack extends Core.Stack {
  private acmCertificateArn:string;
  constructor(scope: Core.Construct, id: string, acmCertificateArn: string, props?: Core.StackProps) {
    super(scope, id, props);
    this.acmCertificateArn = acmCertificateArn;
    var bucket = this.defineWebBucket();
    var cdn = this.defineCDN(bucket);
    //this.defineAssets(bucket);
    this.defineDeployment(bucket, cdn);
  }

  private defineDeployment(bucket: IBucket, cdn: CloudFront.IDistribution) {
    new BucketDeployment(this, 'DeployWebsite', {
      sources: [Source.asset('../../src/static/')],
      destinationBucket: bucket,
      distribution: cdn,
      //distributionPaths: ['/images/*.png']
    });
  }

  private defineCDN(bucket:IBucket):IDistribution {
    var oai = new OriginAccessIdentity(this, MetaData.PREFIX+"oai", {comment:MetaData.PREFIX+"oai"});
    bucket.grantRead(oai);
    //const certificate = Certificate.fromCertificateArn(this, 'Certificate', arn);
    //var viewerCertificate = ViewerCertificate.fromAcmCertificate(certificate, {aliases: []});
    var distribution = new CloudFrontWebDistribution(this, MetaData.PREFIX+"cdn", {       
      originConfigs: [
      {
        s3OriginSource: {
          s3BucketSource: bucket,
          originAccessIdentity: oai
        },      
        behaviors : [ {isDefaultBehavior: true}],        
      }],
      viewerCertificate:  {        
        aliases: ["om-invest.sundgaar.people.aws.dev"],
        props: {acmCertificateArn: this.acmCertificateArn, minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_1_2016,sslSupportMethod:SSLMethod.SNI}
      }
    });

    // https://docs.aws.amazon.com/cdk/api/latest/docs/aws-route53-targets-readme.html
    var hostedZone = HostedZone.fromLookup(this, MetaData.PREFIX+"hosted-zone", {
      domainName: "sundgaar.people.aws.dev",
    });
    new ARecord(this, "arecord", {
      recordName: "om-invest.sundgaar.people.aws.dev",
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone: hostedZone
    });    
            
    Tags.of(distribution).add(MetaData.NAME, MetaData.PREFIX+"cdn");
    return distribution;
  }

  private defineWebBucket():IBucket {
    var bucket = new Bucket(this, MetaData.PREFIX+"s3-web", { 
      bucketName: MetaData.PREFIX+"s3-web",
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      versioned: false,
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      autoDeleteObjects: true
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

