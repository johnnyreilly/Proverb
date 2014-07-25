using System.Security.Principal;

namespace Proverb.Web.Interfaces
{
    public interface IUserHelper
    {
        IPrincipal User { get; }
    }
}