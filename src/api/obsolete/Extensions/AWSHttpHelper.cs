using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Amazon.Lambda.APIGatewayEvents;
using Newtonsoft.Json;

namespace DroidInvest.Extensions
{
    public class AWSHttpHelper
    {
        public static Object PostJson(String baseUri, String apiMethod, StringContent payload)
        {
            var apiKey = System.Environment.GetEnvironmentVariable("apiKey");
            // https://81kkzuo344.execute-api.eu-central-1.amazonaws.com/prod/Invest_StoreDocNJS
            HttpClient httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
            //httpClient.DefaultRequestHeaders.Add("Content-Type", "application/json");
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            httpClient.DefaultRequestHeaders.Add("x-api-key", apiKey);
            httpClient.BaseAddress = new Uri(baseUri);
            
            var resultTask = httpClient.PostAsync(apiMethod, payload).Result;
            var readTask = resultTask.Content.ReadAsStringAsync();
            readTask.Wait();            
            Console.Out.WriteLine("StatusCode:" + resultTask.StatusCode);
            Console.Out.WriteLine("Content:" + readTask.Result);
            if(resultTask.StatusCode != HttpStatusCode.OK) throw new Exception(readTask.Result);
            return readTask.Result;
        }

        public static APIGatewayProxyResponse BuildHttpResponse(object data, HttpStatusCode httpStatusCode)
        {
            string body = JsonConvert.SerializeObject(data);
            var response = new APIGatewayProxyResponse
            {
                StatusCode = Enum.Parse<int>(httpStatusCode.ToString()),
                Body = body,
                Headers = new Dictionary<string, string>
                { 
                    { "Content-Type", "application/json" }, 
                    { "Access-Control-Allow-Origin", "*" } 
                }
            };
            return response;
        }
    }
}