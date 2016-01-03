using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;

namespace InvestmentManagerWSClient
{
    class Program
    {
        static void Main(string[] args)
        {
            var wsClient = new InvestmentManagerWSStub.InvestmentManagerInterfaceClient();

            var portfolio = wsClient.getPortfolio("", 1);
            Debug.WriteLine(portfolio.title);
            foreach (var security in portfolio.securities)
            {
                Debug.WriteLine(security.symbol);
                Debug.WriteLine(security.quote);
                Debug.WriteLine(security.avgVoltatility);
            }


            /*var categories = wsClient.getCategories();
            foreach (var category in categories)
            {
                Debug.WriteLine(category.id);
                Debug.WriteLine(category.title);
            }*/

            /*var categories = wsClient.();
            foreach (var category in categories)
            {
                Debug.WriteLine(category.id);
                Debug.WriteLine(category.title);
            }*/
        }
    }
}
