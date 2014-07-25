using Proverb.Web.Interfaces;
using System.Security.Principal;
using System.Web;

namespace Proverb.Web.Implementations
{
    public class UserHelper : IUserHelper
    {
        public IPrincipal User
        {
            get { return HttpContext.Current.User; }
        }
    }
}