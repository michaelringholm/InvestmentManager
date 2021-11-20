#!/usr/bin/env node
import 'source-map-support/register';
import * as CDK from '@aws-cdk/core';
import { OMInvestWebStack } from './om-invest-web-stack';
import { MetaData } from './meta-data';
import { OMInvestNetworkStack } from './om-invest-network-stack';
import { OMInvestAPIStack } from './om-invest-api-stack';
import { OMInvestDataStack } from './om-invest-data-stack';

//var region = process.env["CDK_DEFAULT_REGION"]
var region = "eu-north-1";
var props = {env: {account: process.env["CDK_DEFAULT_ACCOUNT"], region: region } };
var acmCertificateArn = process.env["ACM_CERTIFICATE_ARN"];
if(!acmCertificateArn) throw new Error("Please set the env var ACM_CERTIFICATE_ARN");
logDebug("Using account="+process.env["CDK_DEFAULT_ACCOUNT"]);
logDebug("Using region="+region);
const app = new CDK.App();
var networkStack = new OMInvestNetworkStack(app, MetaData.PREFIX+'network-stack', props);
var apiStack = new OMInvestAPIStack(app, MetaData.PREFIX+'api-stack', networkStack.vpc, props);
new OMInvestWebStack(app, MetaData.PREFIX+'web-stack', acmCertificateArn, props);
new OMInvestDataStack(app, MetaData.PREFIX+'data-stack', apiStack.apiRole, props);

function logDebug(msg:String) {
    console.debug(msg);
}