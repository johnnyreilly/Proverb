using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Proverb.Data.CommandQuery.Interfaces;
using Proverb.Data.Models;
using Proverb.Services.Interfaces;

namespace Proverb.Services
{
    public class UserService : IUserService
    {
        public UserService(IUserCommand userCommand, IUserQuery userQuery)
        {
            _userCommand = userCommand;
            _userQuery = userQuery;
        }

        private IUserCommand _userCommand;
        private IUserQuery _userQuery;

        public void Delete(int id)
        {
            _userCommand.Delete(id);
        }

        public ICollection<User> GetAll()
        {
            return _userQuery.GetAll();
        }

        public User GetById(int id)
        {
            return _userQuery.GetById(id);
        }

        public User Save(User user) 
        {
            return _userCommand.Save(user);
        }

    }
}
