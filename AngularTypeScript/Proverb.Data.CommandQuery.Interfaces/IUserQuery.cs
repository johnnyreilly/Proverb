using System.Collections.Generic;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery.Interfaces
{
    public interface IUserQuery
    {
        ICollection<User> GetAll();
        ICollection<User> GetAllWithProverbs();
        User GetById(int id);
        User GetByIdWithProverbs(int id);
    }
}
