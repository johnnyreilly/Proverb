using System;

namespace Proverb.Web.Utilities
{
    public static class AppConfigHelper
    {
        /// <summary>
        /// Return the version of the app
        /// </summary>
        public static Version Version
        {
            get { return System.Reflection.Assembly.GetExecutingAssembly().GetName().Version; }
        }

        public static bool InDebug 
        {
            get { return System.Web.HttpContext.Current.IsDebuggingEnabled; } 
        }
    }
}