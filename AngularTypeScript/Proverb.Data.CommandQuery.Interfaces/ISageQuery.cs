using System.Collections.Generic;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery.Interfaces
{
    public interface ISageQuery
    {
        ICollection<Sage> GetAll();
        ICollection<Sage> GetAllWithSayings();
        Sage GetById(int id);
        Sage GetByIdWithSayings(int id);
    }
}
