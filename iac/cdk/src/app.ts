#!/usr/bin/env node
import 'source-map-support/register';
import * as CDK from '@aws-cdk/core';
import { OMInvestWebStack } from './om-invest-web-stack';
import { MetaData } from './meta-data';

//var region = process.env["CDK_DEFAULT_REGION"]
var region = "eu-north-1";
var props = {env: {account: process.env["CDK_DEFAULT_ACCOUNT"], region: region } };
logDebug("Using account="+process.env["CDK_DEFAULT_ACCOUNT"]);
logDebug("Using region="+region);
const app = new CDK.App();
new OMInvestWebStack(app, MetaData.PREFIX+'web-stack', props);


function logDebug(msg:String) {
    console.debug(msg);
}