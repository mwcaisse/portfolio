using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Portfolio.API.Data;

namespace Portfolio.API.Manager
{
    public class ContactMessageManager
    {

        private readonly DataContext _dataContext;

        public ContactMessageManager(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

    }
}
