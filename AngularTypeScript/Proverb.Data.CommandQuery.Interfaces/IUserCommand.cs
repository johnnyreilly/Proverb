using System.Collections.Generic;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery.Interfaces
{
    public interface IUserCommand
    {
        void Delete(int id);
        User Save(User user);
    }
}
