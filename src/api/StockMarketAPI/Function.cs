using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DroidInvest.Services;
using Amazon.Lambda.Core;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
using System.Net.Http;
using DroidInvest.Extensions;
using Newtonsoft.Json;
using Amazon.Lambda.APIGatewayEvents;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace StockMarketAPI
{    
    public class Function
    {
        
        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        private static IDataService dataService;
        public APIGatewayProxyResponse FunctionHandler(dynamic input, ILambdaContext context)
        {
            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);
            var serviceProvider = serviceCollection.BuildServiceProvider();
            dataService = serviceProvider.GetService<IDataService>();
            var assetCategories = dataService.GetAssetCategories();

            //resp.Headers.Add(AccessControlAllowOrigin, request.Headers.GetValues(Origin).First());
            //return new { assetCategories = assetCategories };            
            var resp = new { AssetCategories = assetCategories, SerializedInput = JsonConvert.SerializeObject(input), SerializedContext = JsonConvert.SerializeObject(context) };
            //return await Task.FromResult(resp);
            return AWSHttpHelper.BuildHttpResponse(resp, HttpStatusCode.OK);
        }

        private static void ConfigureServices(IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<IPriceService,BorsenPriceService>();
            serviceCollection.AddTransient<IJsonSerializer,SimpleJsonSerializer>();
            serviceCollection.AddTransient<IDataService,DataService>();
        }        
    }
}
