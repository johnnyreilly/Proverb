using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Proverb.Web.Interfaces;

namespace Proverb.Web.Controllers
{
    public class HomeController : Proverb.Web.Base.BaseController
    {
        public HomeController(
            IUserHelper userHelper,
            ILog logger)
            : base(userHelper, logger) 
        { 
        }

        public ViewResult Index()
        {
            return View();
        }

        public ViewResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ViewResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}