using System.Net;
using System.Web.Http;
using System.Web.Http.Results;

namespace Proverb.Web.Common.SaveHelpers 
{
    public static class ControllerExtensions
    {
        public static IHttpActionResult BadRequest<T>(this ApiController controller, T obj)
        {
            return new NegotiatedContentResult<T>(HttpStatusCode.BadRequest, obj, controller);
        }
    }
}
