using System;
using System.IO;
using System.Text;

using Amazon.Lambda.Core;
using Amazon.Lambda.DynamoDBEvents;
using Amazon.DynamoDBv2.Model;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Net;
using System.Collections.Generic;
using Amazon.Lambda.APIGatewayEvents;
using DroidInvest.Extensions;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace PortfolioAPI
{
    public class Function
    {
        public async Task<Object> FunctionHandler(dynamic input, ILambdaContext context)
        {
            /*context.Logger.LogLine($"Beginning to process {dynamoEvent.Records.Count} records...");

            foreach (var record in dynamoEvent.Records)
            {
                context.Logger.LogLine($"Event ID: {record.EventID}");
                context.Logger.LogLine($"Event Name: {record.EventName}");
				
				// TODO: Add business logic processing the record.Dynamodb object.
            }

            context.Logger.LogLine("Stream processing complete.");*/
            var resp = new { SomeProp = "hello22", SerializedInput = JsonConvert.SerializeObject(input), SerializedContext = JsonConvert.SerializeObject(context) };
            //return await Task.FromResult(resp);
            return await Task.FromResult(AWSHttpHelper.BuildHttpResponse(resp, HttpStatusCode.OK));
        }        
    }
}