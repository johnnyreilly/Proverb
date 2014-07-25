using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Proverb.Data.CommandQuery.Interfaces;
using Proverb.Data.EntityFramework;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery
{
    public class UserCommand : BaseCommandQuery, IUserCommand
    {
        public UserCommand(ProverbContext context) : base(context) { }

        public User Save(User user)
        {
            if (user.Id > 0)
            {
                _context.Entry(user).State = EntityState.Modified;
            }
            else
            {
                _context.Users.Add(user);
            }
            _context.SaveChanges();

            return user;
        }
    }
}
