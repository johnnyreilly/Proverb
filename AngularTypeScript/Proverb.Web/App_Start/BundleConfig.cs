using System.Web;
using System.Web.Optimization;

namespace Proverb.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            var angularApp = new ScriptBundle("~/angularApp").Include(

                // Vendor Scripts 
                "~/scripts/jquery-{version}.js",
                "~/scripts/angular.js",
                "~/scripts/angular-animate.js",
                "~/scripts/angular-route.js",
                "~/scripts/angular-sanitize.js",
                "~/scripts/angular-ui/ui-bootstrap-tpls.js",

                "~/scripts/toastr.js",
                "~/scripts/moment.js",
                "~/scripts/spin.js",

                // Bootstrapping
                "~/app/app.js",
                "~/app/config.exceptionHandler.js",
                "~/app/config.route.js",

                // common Modules
                "~/app/common/common.js",
                "~/app/common/logger.js",
                "~/app/common/spinner.js",

                // common.bootstrap Modules
                "~/app/common/bootstrap/bootstrap.dialog.js"

                // app
                //"~/app/admin/admin.js",
                //"~/app/dashboard/dashboard.js",
                //"~/app/layout/shell.js",
                //"~/app/layout/sidebar.js",
                //"~/app/layout/topnav.js",
                //"~/app/sayings/sayings.js",
                //"~/app/sages/sages.js",
                //"~/app/sages/sageDetail.js",

                // app Services 
                //"~/app/services/datacontext.js",
                //"~/app/services/directives.js"
                );

            // app
            angularApp.IncludeDirectory("~/app/admin", "*.js", true);
            angularApp.IncludeDirectory("~/app/dashboard", "*.js", true);
            angularApp.IncludeDirectory("~/app/layout", "*.js", true);
            angularApp.IncludeDirectory("~/app/sayings", "*.js", true);
            angularApp.IncludeDirectory("~/app/sages", "*.js", true);

            // app services
            angularApp.IncludeDirectory("~/app/services", "*.js", true);

            bundles.Add(angularApp);

            bundles.Add(new StyleBundle("~/css").Include(
                "~/content/ie10mobile.css",
                "~/content/bootstrap.min.css",
                "~/content/font-awesome.min.css",
                "~/content/toastr.css",
                "~/content/styles.css"
            ));
        }
    }
}
