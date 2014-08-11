using System.Collections.Generic;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery.Interfaces
{
    public interface ISageCommand
    {
        void Delete(int id);
        Sage Save(Sage sage);
    }
}
