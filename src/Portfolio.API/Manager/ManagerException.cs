using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.API.Manager
{
    public class ManagerException : Exception
    {

        public ManagerException(string message) : base(message) { }

        public ManagerException(string message, Exception cause) : base(message, cause) { }

    }
}
