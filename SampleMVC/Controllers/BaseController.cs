using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using Sandbox.Constants;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.ExceptionHandling;
using Sandbox.Models;

namespace Sandbox.Controllers
{
    [HandleError]
    public class BaseController : Controller
    {
        protected override void OnException(ExceptionContext filterContext)
        {
            try
            {
                //make sure to log the exception
                var exManager = EnterpriseLibraryContainer.Current.GetInstance<ExceptionManager>();
                exManager.HandleException(filterContext.Exception, "DefaultPolicy");

                filterContext.ExceptionHandled = true;

                ApplicationErrorModel error = new ApplicationErrorModel();
                error.Message = filterContext.Exception.Message;
                error.InnerException = filterContext.Exception.InnerException == null ? "Inner exception is empty." : filterContext.Exception.InnerException.Message;
                error.StackTrace = filterContext.Exception.StackTrace == null ? "" : filterContext.Exception.StackTrace;

                if (Request.IsAjaxRequest())
                {
                    // make sure we set the status code to HTTP 500 - internal server error 
                    // this will ensure the standard AJAX error handler will get invoked
                    Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    // return just the error details view (without the site master)
                    // it's up to the AJAX error handler to display the error properly
                    this.View("ErrorDetails", error).ExecuteResult(this.ControllerContext);
                }
                else
                    // return the customized error page
                    this.View("Error", error).ExecuteResult(this.ControllerContext);
                // TODO: exception logging
            }
            catch (Exception e)
            {
                filterContext.ExceptionHandled = false;
                ApplicationErrorModel error = new ApplicationErrorModel();
                error.Message = e.Message;
                error.InnerException = e.InnerException == null ? "Inner exception is empty." : e.InnerException.Message;
                error.StackTrace = e.StackTrace == null ? "" : e.StackTrace;
                this.View("Error", error).ExecuteResult(this.ControllerContext);
            }
            return;
        }

        public ActionResult ErrorDetails(ApplicationErrorModel model)
        {
            return View(model);
        }

        public ActionResult IISError()
        {
            return View();
        }

    }
}
