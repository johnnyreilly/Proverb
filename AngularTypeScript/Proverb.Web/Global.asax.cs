using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Proverb.Web.Utilities;

namespace Proverb.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            LoggerHelper.Logger.Info("Application starting....");

            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AutofacConfig.RegisterAndBuild();
        }

        protected void Application_End()
        {
            LoggerHelper.Logger.Info("Application stopping....");
        }

        protected void Session_Start(object sender, EventArgs eventArgs)
        {
            var browser = Request.Browser;
            LoggerHelper.Logger.InfoFormat("Session starting for {0} using {1} v{2} session id: {3}",
                User.Identity.Name, browser.Browser, browser.Version, Session.SessionID.ToString());
        }

        protected void Session_End(object sender, EventArgs eventArgs)
        {
            LoggerHelper.Logger.InfoFormat("Session stopping for session id: {0}", Session.SessionID.ToString());
        }
    }
}
