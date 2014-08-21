using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Proverb.Data.Models;

namespace Proverb.Services.Interfaces
{
    public interface IUserService
    {
        Task<int> DeleteAsync(int id);
        Task<ICollection<User>> GetAllAsync();
        Task<User> GetByIdAsync(int id);
        Task<User> SaveAsync(User user);
    }
}
