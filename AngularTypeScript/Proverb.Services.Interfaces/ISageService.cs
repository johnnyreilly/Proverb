using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Proverb.Data.Models;

namespace Proverb.Services.Interfaces
{
    public interface ISageService
    {
        Task<int> DeleteAsync(int id);
        Task<ICollection<Sage>> GetAllAsync();
        Task<Sage> GetByIdAsync(int id);
        Task<Sage> SaveAsync(Sage sage);
    }
}
