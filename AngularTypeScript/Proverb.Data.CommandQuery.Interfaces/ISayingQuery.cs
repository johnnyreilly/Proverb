using System.Collections.Generic;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery.Interfaces
{
    public interface ISayingQuery
    {
        ICollection<Saying> GetAll();
        Saying GetById(int id);
        ICollection<Saying> GetBySageId(int sageId);
    }
}
