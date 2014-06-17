using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.ExceptionHandling;
using System.Configuration;
using System.Diagnostics;
using Sandbox.Constants;

namespace Sandbox
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}", // URL with parameters
                new { controller = "Main", action = "Index" } // Parameter defaults
            );

            routes.MapRoute(
                "IISError", // Route name
                "{controller}/{action}/{statusCode}", // URL with parameters
                new { controller = "Main", action = "Index", statusCode = "404" } // Parameter defaults
            );
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            try
            {
                Exception ex = Server.GetLastError();
                var exManager = EnterpriseLibraryContainer.Current.GetInstance<ExceptionManager>();
                exManager.HandleException(ex, "DefaultPolicy");

                Response.Redirect(string.Format("~/Base/IISError/{0}", "404"));
            }
            catch
            {
                // no action 
            }
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);

            try
            {
                // register the performance counter
            }
            catch (Exception ex)
            {// make sure to notify the administrator/user that the performance counters could not be created 
                var exManager = EnterpriseLibraryContainer.Current.GetInstance<ExceptionManager>();
                exManager.HandleException(ex, "DefaultPolicy");
            }
        }
    }
}