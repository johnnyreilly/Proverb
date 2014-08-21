using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Proverb.Data.Models;

namespace Proverb.Services.Interfaces
{
    public interface ISayingService
    {
        Task<int> DeleteAsync(int id);
        Task<ICollection<Saying>> GetAllAsync();
        Task<Saying> GetByIdAsync(int id);
        Task<Saying> SaveAsync(Saying saying);
    }
}
