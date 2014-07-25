using System.Collections.Generic;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery.Interfaces
{
    public interface IUserCommand
    {
        User Save(User user);
    }
}
