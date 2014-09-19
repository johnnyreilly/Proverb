using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using log4net;
using Proverb.Web.Implementations;
using Proverb.Web.Interfaces;
using Proverb.Web.Utilities;
using System.Reflection;
using System.Web;
using System.Web.Optimization;

namespace Proverb.Web
{
    public class AutofacConfig
    {
        public static void RegisterAndBuild()
        {
            var builder = new ContainerBuilder();

            // Web Project
            var assembly = Assembly.GetExecutingAssembly();
            builder.RegisterControllers(assembly).InstancePerLifetimeScope();
            builder.RegisterApiControllers(assembly).InstancePerLifetimeScope();

            builder.RegisterType<UserHelper>().As<IUserHelper>().InstancePerLifetimeScope();

            // Logger
            builder.Register(c => LoggerHelper.GetLogger()).As<ILog>().InstancePerLifetimeScope();

            builder.RegisterFilterProvider();

            var container = builder.Build();

            // Set the dependency resolver for Web API.
            var webApiResolver = new AutofacWebApiDependencyResolver(container);
            System.Web.Http.GlobalConfiguration.Configuration.DependencyResolver = webApiResolver;

            // Set the dependency resolver for MVC.
            var mvcResolver = new AutofacDependencyResolver(container);
            System.Web.Mvc.DependencyResolver.SetResolver(mvcResolver);
        }
    }
}
