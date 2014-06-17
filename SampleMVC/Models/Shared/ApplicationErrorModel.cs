using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

//namespace SampleMVC.Models
namespace Sandbox.Models
{
    public class ApplicationErrorModel
    {
        public string Message { get; set; }
        public string InnerException { get; set; }
        public string StackTrace { get; set; }

    }
}