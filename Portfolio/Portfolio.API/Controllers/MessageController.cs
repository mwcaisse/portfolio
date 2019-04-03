using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Portfolio.API.ViewModels;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Portfolio.API.Controllers
{
    [Produces("application/json")]
    [Route("message")]
    public class MessageController : Controller
    {
        private readonly ApplicationConfiguration _applicationConfiguration;

        public MessageController( ApplicationConfiguration applicationConfiguration)
        {
            this._applicationConfiguration = applicationConfiguration;
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> Create([FromBody] MessageViewModel message)
        {
            var res = await SendEmail(message);
            return Ok(res.StatusCode == HttpStatusCode.Accepted);
        }

        protected async Task<Response> SendEmail(MessageViewModel message)
        {
            var client = new SendGridClient(_applicationConfiguration.SendGridApiKey);
            var from = new EmailAddress(_applicationConfiguration.FromEmailAddress, "Portfolio");
            var to = new EmailAddress(_applicationConfiguration.ToEmailAddress, "Mitchell");
            var subject = "Portfolio: New Message";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, null, ConstructEmailBody(message));
            return await client.SendEmailAsync(msg);
        }

        protected string ConstructEmailBody(MessageViewModel message)
        {
            var sb = new StringBuilder();
            sb.Append("<p>").Append(message.Name).Append("</p>");
            sb.Append("<p>").Append(message.Email).Append("</p>");
            sb.Append("<p>").Append(message.Message).Append("</p>");

            return sb.ToString();
        }

    }
}
