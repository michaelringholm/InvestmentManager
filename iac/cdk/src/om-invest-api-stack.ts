import { ISecurityGroup } from '@aws-cdk/aws-ec2/lib/security-group';
import * as Core from '@aws-cdk/core';
import { MetaData } from './meta-data';
import EC2 = require('@aws-cdk/aws-ec2');
import IAM = require("@aws-cdk/aws-iam");
import Lambda = require('@aws-cdk/aws-lambda');
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2';
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { IRole } from '@aws-cdk/aws-iam';
import { IVpc } from '@aws-cdk/aws-ec2';

export class OMInvestAPIStack extends Core.Stack {
  private runtime:Lambda.Runtime = Lambda.Runtime.NODEJS_12_X;
  public apiRole:IRole; // Expose to grant access to buckets and DB

  constructor(scope: Core.Construct, id: string, vpc: IVpc, props?: Core.StackProps) {
    super(scope, id, props);
    this.apiRole = this.buildAPIRole();
    var apiSecurityGroup = this.createAPISecurityGroup(vpc);
    this.createGetAssetCategoriesFunction(this.apiRole, apiSecurityGroup, vpc);
    this.createGetAssetCategoryFunction(this.apiRole, apiSecurityGroup, vpc);
    this.createGetLatestQuoteFunction(this.apiRole, apiSecurityGroup, vpc);
  }

  private createAPISecurityGroup(vpc: IVpc): EC2.ISecurityGroup {
    var postFix = "api-sg";
    var securityGroup = new EC2.SecurityGroup(this, MetaData.PREFIX+postFix, {
        vpc: vpc,
        securityGroupName: MetaData.PREFIX+postFix,
        description: MetaData.PREFIX+postFix,
        allowAllOutbound: true
    });
    
    //securityGroup.connections.allowTo(this.metaData.RDSSecurityGroup, EC2.Port.tcp(3306), "Lambda to RDS");
    Core.Tags.of(securityGroup).add(MetaData.NAME, MetaData.PREFIX+postFix);
    //this.metaData.APISecurityGroup = securityGroup;
    return securityGroup;
} 

  private createLambdaFunction(apiRole: IRole, apiSecurityGroup: ISecurityGroup, name:string, handlerMethod:string, assetPath:string, vpc:EC2.IVpc):Lambda.Function {
    var codeFromLocalZip = Lambda.Code.fromAsset(assetPath);
    var lambdaFunction = new Lambda.Function(this, MetaData.PREFIX+name, { 
        functionName: MetaData.PREFIX+name, 
        //vpc: vpc, 
        code: codeFromLocalZip, 
        handler: handlerMethod, 
        runtime: this.runtime, 
        memorySize: 256, 
        timeout: Core.Duration.seconds(20), role: apiRole, securityGroups: [apiSecurityGroup],
        tracing: Lambda.Tracing.ACTIVE,
    });
    
    const proxyIntegration = new LambdaProxyIntegration({
        handler: lambdaFunction,
        });
        
    const httpApi = new HttpApi(this, MetaData.PREFIX+name+"-api");
    
    httpApi.addRoutes({
    path: "/" + name,
    methods: [ HttpMethod.POST, HttpMethod.OPTIONS ],
    integration: proxyIntegration,
    });
    
    Core.Tags.of(lambdaFunction).add(MetaData.NAME, MetaData.PREFIX+name);
    return lambdaFunction;
  } 

  private createGetAssetCategoriesFunction(apiRole: IRole, apiSecurityGroup: ISecurityGroup, vpc: IVpc):Lambda.Function {
    return this.createLambdaFunction(apiRole, apiSecurityGroup, "get-asset-categories-fn", "index.handler", "../../src/api/get-asset-categories", vpc);
  }

  private createGetAssetCategoryFunction(apiRole: IRole, apiSecurityGroup: ISecurityGroup, vpc: IVpc):Lambda.Function {
    return this.createLambdaFunction(apiRole, apiSecurityGroup, "get-asset-category-fn", "index.handler", "../../src/api/get-asset-category", vpc);
  }  


private createGetLatestQuoteFunction(apiRole: IRole, apiSecurityGroup: ISecurityGroup, vpc: IVpc):Lambda.Function {
    return this.createLambdaFunction(apiRole, apiSecurityGroup, "get-latest-quote-fn", "index.handler", "../../src/api/get-latest-quote", vpc);
  }    

  private buildAPIRole(): IAM.IRole {
    var role = new IAM.Role(this, MetaData.PREFIX+"api-role", {
        description: "Lambda API Role",
        roleName: MetaData.PREFIX+"api-role",
        assumedBy: new IAM.ServicePrincipal("lambda.amazonaws.com"),
        managedPolicies: [
            IAM.ManagedPolicy.fromAwsManagedPolicyName("AWSStepFunctionsFullAccess"),
            IAM.ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMFullAccess"),
            IAM.ManagedPolicy.fromManagedPolicyArn(this, "AWSLambdaSQSQueueExecutionRole", "arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole"),
            IAM.ManagedPolicy.fromManagedPolicyArn(this, "AWSLambdaBasicExecutionRole", "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"),
            IAM.ManagedPolicy.fromManagedPolicyArn(this, "AWSLambdaVPCAccessExecutionRole", "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole")
        ],
    });
    role.addToPolicy(new IAM.PolicyStatement({
      effect: IAM.Effect.ALLOW,
      resources: ["*"],
      actions: ["secretsmanager:GetSecretValue","dbqms:*","rds-data:*","xray:*","dynamodb:GetItem","dynamodb:PutItem","dynamodb:UpdateItem","dynamodb:Scan","dynamodb:Query"]
    }));

    Core.Tags.of(role).add(MetaData.NAME, MetaData.PREFIX+"api-role");
    return role;
}        
}

