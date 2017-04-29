using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Data;
using Portfolio.API.Data.Entity;
using Portfolio.API.Manager;
using Portfolio.API.ViewModel;

namespace Portfolio.API.Controllers
{

    [Route("api/contactmessage")]
    public class ContactMessageController : Controller
    {

        private readonly ContactMessageManager _contactMessageManager;

        public ContactMessageController(DataContext dataContext)
        {
            _contactMessageManager = new ContactMessageManager(dataContext);
        }

        [HttpPost]
        public JsonResponse<bool> Add([FromBody]ContactMessageViewModel message)
        {
            try
            {
                var remoteAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();
                _contactMessageManager.Add(message, remoteAddress);
                return new JsonResponse<bool>()
                {
                    Data = true,
                    ErrorMessage = null
                };
            }
            catch (ManagerException e)
            {
                return new JsonResponse<bool>()
                {
                    Data = false,
                    ErrorMessage = e.Message
                };
            }
            catch (Exception e)
            {
                return new JsonResponse<bool>()
                {
                    Data = false,
                    ErrorMessage = "An error occured while processing your request."
                };
            }
        }

    }
}
