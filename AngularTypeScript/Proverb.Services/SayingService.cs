using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Proverb.Data.CommandQuery.Interfaces;
using Proverb.Data.Models;
using Proverb.Services.Interfaces;

namespace Proverb.Services
{
    public class SayingService : ISayingService
    {
        public SayingService(ISayingQuery sayingQuery)
        {
            _sayingQuery = sayingQuery;
        }

        private ISayingQuery _sayingQuery;

        public async Task<ICollection<Saying>> GetAllAsync()
        {
            return await _sayingQuery.GetAllAsync();
        }

    }
}
