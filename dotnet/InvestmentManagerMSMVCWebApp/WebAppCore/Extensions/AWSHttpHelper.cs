using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace WebAppCore.Extensions
{
    internal class AWSHttpHelper
    {
        internal static void PostJson(String baseUri, String apiMethod, StringContent payload)
        {
            // https://81kkzuo344.execute-api.eu-central-1.amazonaws.com/prod/Invest_StoreDocNJS
            HttpClient httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
            //httpClient.DefaultRequestHeaders.Add("Content-Type", "application/json");
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            httpClient.DefaultRequestHeaders.Add("x-api-key", "maZYMtpzBw6PEscbRQASw8er5uvtiBaT8trhSoy6");

            httpClient.BaseAddress = new Uri(baseUri);
            
            var resultTask = httpClient.PostAsync(apiMethod, payload).Result;
            var readTask = resultTask.Content.ReadAsStringAsync();
            readTask.Wait();
            Console.Out.WriteLine("StatusCode:" + resultTask.StatusCode);
            Console.Out.WriteLine("Content:" + readTask.Result);
        }
    }
}