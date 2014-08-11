using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Proverb.Data.CommandQuery.Interfaces;
using Proverb.Data.EntityFramework;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery
{
    public class UserQuery : BaseCommandQuery, IUserQuery
    {
        public UserQuery(ProverbContext context) : base(context) { }

        public ICollection<User> GetAll()
        {
            return _context.Users.ToList();
        }

        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }
    }
}
