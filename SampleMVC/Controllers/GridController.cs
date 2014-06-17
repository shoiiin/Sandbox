using System;
using System.IO;
using System.Net;
using System.Web.Mvc;

namespace Sandbox.Controllers
{
    public class GridController : BaseController
    {

        public ActionResult Index()
        {
            //TODO: place your code here and customize the view
            return View();
        }

        public ActionResult Hierarchical()
        {
            //TODO: place your code here and customize the view
            return View();
        }

        [HttpPost]
        public JsonResult GetHGridData(string operation = "application")
        {
            string headerUrl = String.Format("http://t1w105884:9080/dwroot/datawrks/views/{0}/json_definition?__ac_name=admin&__ac_password=admin",
                                             operation);
            string dataUrl = String.Format("http://t1w105884:9080/dwroot/datawrks/views/{0}/json?__ac_name=admin&__ac_password=admin",
                                             operation);
            string headerData = ReadURL(headerUrl);
            string gridData = ReadURL(dataUrl);
            
            // Remove it from your controller
            return Json(new
            {
                Success = true,
                Data = new
                {
                    Header = headerData,
                    Grid = gridData
                }
            });
        }

        private string ReadURL(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            StreamReader reader = new StreamReader(response.GetResponseStream());
            return reader.ReadToEnd();
        }
    }
}
