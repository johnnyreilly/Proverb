using System.Collections.Generic;
using Proverb.Data.Models;
using System.Threading.Tasks;

namespace Proverb.Data.CommandQuery.Interfaces
{
    public interface ISayingCommand
    {
        Task<int> DeleteAsync(int id);
        Task<Saying> SaveAsync(Saying saying);
    }
}
