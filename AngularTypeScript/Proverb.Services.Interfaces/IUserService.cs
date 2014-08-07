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
        void Delete(int id);
        ICollection<User> GetAll();
        User GetById(int id);
        User Save(User user);
    }
}
