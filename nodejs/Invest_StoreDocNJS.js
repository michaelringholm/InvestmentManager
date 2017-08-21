'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');
var d = require('domain').create()

const dynamo = new doc.DynamoDB();


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 * 
 * curl -H "x-api-key: maZYMtpzBw6PEscbRQASw8er5uvtiBaT8trhSoy6" -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"TableName":"Category","Item":{"CategoryName":"finance","Title":"Finance"}}' https://81kkzuo344.execute-api.eu-central-1.amazonaws.com/dev/StoreCategoryNJS
 * curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"TableName":"Category","Item":{"CategoryName": "finance","Title": "Finance"}' https://07pjh8rce8.execute-api.eu-central-1.amazonaws.com/prod/StoreCategoryNJS
 * 
 * {
    "httpMethod":"POST",
    "body": {
                "TableName":"Category",
                "Item":{
                    "CategoryName": "finance",
                    "Title": "Finance"
                }
    }
}
 */
exports.handler = (event, context, callback) => {
    d.on('error', function(err){ console.error("ERROR:" + err) });
    
    if(event.headers.TestMode)
        console.log("Test Mode:" + event.headers.TestMode);
    
    console.log('Received event:', JSON.stringify(event, null, 2));

    /*const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });*/
    
    var doCallback= function(err, res) {
        console.log("invoking callback...");
        console.log("response was [" + JSON.stringify(res) + "]");
        
        if(err)
            console.error("ERROR:" + err.message);
            
        callback(null, {
            statusCode: err ? '400' : '200',
            //body: err ? err.message : JSON.stringify(res),
            body: err ? err.message : JSON.stringify({message:"item upserted!"}),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    };

    var data = {};
    
    if(event.headers.TestMode)
        data = event.body;
    else
        data = JSON.parse(event.body);
            
    switch (event.httpMethod) {
        
        case 'DELETE':
            dynamo.deleteItem(data, doCallback);
            break;
        case 'GET':
            dynamo.scan({ TableName: event.queryStringParameters.TableName }, doCallback);
            break;
        case 'POST':
            console.log("before put....");
            
            // The signature of the callback (2nd parameter of putItem) is function(err,data)
            dynamo.putItem(data, doCallback);
            //console.log("after put....");
            
            /*var item = {
                TableName:"Category",
                Item:{
                    "CategoryName": "medical",
                    "Title": "Medical"
                }
            };*/
            
            //dynamo.putItem(event.body, done);
            break;
        case 'PUT':
            dynamo.updateItem(data, doCallback);
            break;
        default:
            doCallback(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
