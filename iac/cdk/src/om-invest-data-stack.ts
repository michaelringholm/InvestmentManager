import * as Core from '@aws-cdk/core';
import EC2 = require('@aws-cdk/aws-ec2');
import S3 = require('@aws-cdk/aws-s3');
import { IRole } from "@aws-cdk/aws-iam";
import { AttributeType, BillingMode, Table } from '@aws-cdk/aws-dynamodb';
import { MetaData } from './meta-data';
import { Bucket } from '@aws-cdk/aws-s3';
import { Asset } from '@aws-cdk/aws-s3-assets';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';

export class OMInvestDataStack extends Core.Stack {
    private apiRole:IRole;
    constructor(scope: Core.Construct, id: string, apiRole:IRole, props?: Core.StackProps) {
        super(scope, id, props);
        this.apiRole = apiRole;
        this.createLoginTable();
        this.createAssetBucket();
        this.createPortfolioBucket();
        /*this.createHeroTable();
        this.createBattleBucket();
        this.createHeroBucket();
        this.createMapBucket();*/
    }

    private createPortfolioBucket() {
        var name = MetaData.PREFIX+"portfolio-s3";
        var bucket = new Bucket(this, name, {
            bucketName: name,
        });
        bucket.grantReadWrite(this.apiRole);
        Core.Tags.of(bucket).add(MetaData.NAME, name);
    }

    private createAssetBucket() {
        var name = MetaData.PREFIX+"asset-s3";
        var bucket = new Bucket(this, name, {
            bucketName: name,
        });
        bucket.grantReadWrite(this.apiRole);
        new BucketDeployment(this, MetaData.PREFIX+"asset-categories-data-file", {
            sources: [Source.asset("../../data/asset/")],
            destinationBucket: bucket,
        });
        Core.Tags.of(bucket).add(MetaData.NAME, name);
    }     

    /*private createMapBucket() {
        var name = MetaData.PREFIX+"map";
        var bucket = new Bucket(this, name, {
            bucketName: name
        });
        bucket.grantReadWrite(this.apiRole);
        Core.Tags.of(bucket).add(MetaData.NAME, name);
    }    
    
    private createBattleBucket() {
        var name = MetaData.PREFIX+"battle";
        var bucket = new Bucket(this, name, {
            bucketName: name
        });
        bucket.grantReadWrite(this.apiRole);
        Core.Tags.of(bucket).add(MetaData.NAME, name);
    }

    private createHeroBucket() {
        var name = MetaData.PREFIX+"hero-s3";
        var bucket = new Bucket(this, name, {
            bucketName: name
        });
        bucket.grantReadWrite(this.apiRole);
        Core.Tags.of(bucket).add(MetaData.NAME, name);
    }    

    private createHeroTable() {
        var name = MetaData.PREFIX+"hero";
        new Table(this, name, {
            tableName: name,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: {name: "userGuid", type: AttributeType.STRING},
            sortKey: {name: "heroName", type: AttributeType.STRING}
        });
    }*/
    
    private createLoginTable() {
        var name = MetaData.PREFIX+"login";
        new Table(this, name, {
            tableName: name,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: {name: "userName", type: AttributeType.STRING}            
        });
    } 
}