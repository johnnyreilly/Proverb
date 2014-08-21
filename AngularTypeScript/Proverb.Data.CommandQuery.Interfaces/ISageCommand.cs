using System.Collections.Generic;
using Proverb.Data.Models;
using System.Threading.Tasks;

namespace Proverb.Data.CommandQuery.Interfaces
{
    public interface ISageCommand
    {
        Task<int> DeleteAsync(int id);
        Task<Sage> SaveAsync(Sage sage);
    }
}
