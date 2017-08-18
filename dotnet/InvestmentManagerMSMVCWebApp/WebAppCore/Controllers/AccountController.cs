using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using WebAppCore.Models;
using WebAppCore.Services;
using WebAppCore.Context;
using System.Net;
using System.Text;
using System.IO;
using System.Web;

namespace WebAppCore.Controllers
{
    //[Authorize]
    public class AccountController : Controller
    {
        public ActionResult Login()
        {
            return View();
        }       
    }
}
