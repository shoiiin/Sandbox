using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.ExceptionHandling;
using Sandbox.Constants;
using System.Security;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using System.ServiceModel;
using Sandbox.TemplateServiceReference;
using Microsoft.Practices.EnterpriseLibrary.Caching;

namespace Sandbox.Controllers
{
    public class BasicsController : BaseController
    {
        //
        // GET: /Main/

        private ICacheManager cacheManager = CacheFactory.GetCacheManager("DataCache");

        public ActionResult Index()
        {
            //TODO: place your code here and customize the view
            return View();
        }

        public ActionResult NewPage(string operation)
        {
            //TODO: template function for testing the normal controller action. 
            // Remove it from your controller
            if (operation == "ERROR")
                throw (new Exception("Internal generic error - Exception"));
            return View();
        }

        [HttpPost]
        public ActionResult AJAX_HTML(string operation)
        {
            LogEntry logData = new LogEntry();
            logData.Categories = new List<string>();
            logData.Categories.Add("Action");
            logData.Message = "Invoke method: AJAX_HTML";
            logData.Severity = System.Diagnostics.TraceEventType.Information;

            Logger.Write(logData);
            //TODO: template function for AJAX_HTML controller action
            // Remove it from your controller
            if (operation == "ERROR")
                throw (new SecurityException("Internal security error - SecurityException"));
            return PartialView();
        }

        [HttpPost]
        public JsonResult AJAX_JSON(string operation)
        {
            //TODO: template function for AJAX_JSON controller action
            // Remove it from your controller
            if (operation == "ERROR")
                throw (new ApplicationException("Internal application error - ApplicationException"));
            return Json(new
            {
                Success = true,
                Data = new
                {
                    Message = "AJAX - JSON result"
                }
            });
        }

        [HttpPost]
        public ActionResult WCF(string operation)
        {
            //TODO: template function for WCF call controller action
            string retVal = "";
            try
            {
                if (cacheManager.Contains("WCF_Data"))
                {
                    retVal = String.Format("{0} - from cache", (string)(cacheManager.GetData("WCF_Data")));
                }
                else
                {

                    TemplateServiceClient wcfProxy = new TemplateServiceClient();
                    if (operation == "ERROR")
                    {
                        retVal = wcfProxy.GetData(0);
                    }
                    else
                    {
                        retVal = wcfProxy.GetData(1);
                    }
                    cacheManager.Add("WCF_Data", retVal);
                }
            }
            catch (FaultException<ServiceFault> ex)
            {
                throw (ex);
            }
            catch (FaultException ex)
            {
                throw (ex);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            ViewData["WCFResponse"] = retVal;
            return PartialView();
        }

        [HttpPost]
        public ActionResult ClearCache()
        {
            cacheManager.Flush();
            return PartialView();
        }
    }
}
