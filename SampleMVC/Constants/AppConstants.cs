using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sandbox.Constants
{
    public class AppPerformanceCounters
    {
        // Performance counter category. This should be unique for each application.
        public const string CATEGORY = "SampleMVC";

        public const string NO_OF_APPLICATION_ERRORS = "# of application errors";
        public const string NO_OF_REQUESTS = "# of requests";
        //TODO: add your own performance counters (e.g. # of cache hits in the case a cache is implemented etc)
    }
}