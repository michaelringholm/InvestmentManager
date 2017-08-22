'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');
var d = require('domain').create()

const dynamo = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
    d.on('error', function(err){ console.error("ERROR:" + err) });
    
    if(event.headers.TestMode)
        console.log("Test Mode:" + event.headers.TestMode);
    
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    var doCallback = function(err, res) {
        console.log("invoking callback...");
        console.log("response was [" + JSON.stringify(res) + "]");
        
        if(err)
            console.error("ERROR:" + err.message);
            
        callback(null, {
            statusCode: err ? '400' : '200',
            body: err ? err.message : JSON.stringify(res.Items),
            headers: { 'Content-Type': 'application/json'}
        });
    };

    var data = {};
    
    if(event.headers.TestMode)
        data = event.body;
    else
        data = JSON.parse(event.body);
            
    switch (event.httpMethod) {
        
        case 'GET':
            break;
        case 'POST':
            if(!data.FilterExpr)
                dynamo.scan({ TableName: data.TableName}, doCallback);
            else {
                dynamo.scan({ 
                    TableName: data.TableName
                    ,ExpressionAttributeValues: data.ExprAttrVals
                    ,FilterExpression: data.FilterExpr
                }, doCallback);
            }
            break;
        default:
            doCallback(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
