using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.API
{
    public class ApplicationConfiguration
    {
        public string SendGridApiKey { get; set; }

        public string FromEmailAddress { get; set; }

        public string ToEmailAddress { get; set; }

    }
}
