using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sandbox.Helpers
{
    public static class ControlsHelper
    {
        public static string RenderControl(this HtmlHelper helper, object objectToRender)
        {
            return String.Format("Object rendered: {0}", objectToRender.GetType().ToString());
        }
    }
}