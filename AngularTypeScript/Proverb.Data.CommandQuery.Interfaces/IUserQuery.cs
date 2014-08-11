﻿using System.Collections.Generic;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery.Interfaces
{
    public interface IUserQuery
    {
        ICollection<User> GetAll();
        User GetById(int id);
    }
}
