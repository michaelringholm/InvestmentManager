using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using System.Net.Http;
using System.Net.Http.Headers;

using WebAppCore.Models;
using System.Text;
using WebAppCore.Extensions;
using WebAppCore.Services;

namespace WebAppCore.Controllers
{
    public class HomeController : Controller
    {
        private IDataService dataService;

        public HomeController(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public IActionResult Index()
        {
            dataService.StoreCategory();
            return View();

            // System.Net.Http.NoWriteNoSeekStreamContent
        }

        public IActionResult Help()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
