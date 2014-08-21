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
        public SayingService(ISayingCommand sayingCommand, ISayingQuery sayingQuery)
        {
            _sayingCommand = sayingCommand;
            _sayingQuery = sayingQuery;
        }

        private ISayingCommand _sayingCommand;
        private ISayingQuery _sayingQuery;

        public async Task<int> DeleteAsync(int id)
        {
            return await _sayingCommand.DeleteAsync(id);
        }

        public async Task<ICollection<Saying>> GetAllAsync()
        {
            return await _sayingQuery.GetAllAsync();
        }

        public async Task<Saying> GetByIdAsync(int id)
        {
            return await _sayingQuery.GetByIdAsync(id);
        }

        public async Task<Saying> SaveAsync(Saying saying)
        {
            return await _sayingCommand.SaveAsync(saying);
        }
    }
}
