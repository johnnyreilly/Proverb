using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Proverb.Data.CommandQuery.Interfaces;
using Proverb.Data.EntityFramework;
using Proverb.Data.Models;
using System.Threading.Tasks;

namespace Proverb.Data.CommandQuery
{
    public class SayingCommand : BaseCommandQuery, ISayingCommand
    {
        public SayingCommand(ProverbContext context) : base(context) { }

        public async Task<int> DeleteAsync(int id) 
        {
            var sayingToDelete = await _context.Sayings.FindAsync(id);

            if (sayingToDelete == null)
                return 0;

            _context.Sayings.Remove(sayingToDelete);

            var saved = await _context.SaveChangesAsync();

            return saved;
        }

        public async Task<Saying> SaveAsync(Saying saying)
        {
            if (saying.Id > 0)
            {
                _context.Entry(saying).State = EntityState.Modified;
            }
            else
            {
                _context.Sayings.Add(saying);
            }
            var saved = await _context.SaveChangesAsync();

            return saying;
        }
    }
}
