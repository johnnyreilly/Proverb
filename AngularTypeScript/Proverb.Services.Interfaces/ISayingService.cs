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
        Task<ICollection<Saying>> GetAllAsync();
    }
}
