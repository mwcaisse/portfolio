using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using SendGrid.Helpers.Mail;
using Serilog;

namespace Portfolio.API
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestLoggingMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            await _next(context);
            
            Log.Information($"{context.Request.Method} {context.Request.Path} -- {context.Response.StatusCode}"); 
        }
    }
}