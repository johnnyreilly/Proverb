using System.Collections.Generic;
using System.Threading.Tasks;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery.Interfaces
{
    public interface IUserCommand
    {
        Task<int> DeleteAsync(int id);
        Task<User> SaveAsync(User user);
    }
}
