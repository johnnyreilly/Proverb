using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Proverb.Data.CommandQuery.Interfaces;
using Proverb.Data.EntityFramework;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery
{
    public class UserCommand : BaseCommandQuery, IUserCommand
    {
        public UserCommand(ProverbContext context) : base(context) { }

        public async Task<int> DeleteAsync(int id) 
        {
            var userToDelete = await _context.Users.FindAsync(id);

            if (userToDelete == null)
                return 0;
            
            _context.Users.Remove(userToDelete);

            return await _context.SaveChangesAsync();
        }

        public async Task<User> SaveAsync(User user)
        {
            if (user.Id > 0)
            {
                _context.Entry(user).State = EntityState.Modified;
            }
            else
            {
                _context.Users.Add(user);
            }
            var saved = await _context.SaveChangesAsync();

            return user;
        }
    }
}
