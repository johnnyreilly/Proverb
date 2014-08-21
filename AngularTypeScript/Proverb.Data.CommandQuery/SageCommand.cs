using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Proverb.Data.CommandQuery.Interfaces;
using Proverb.Data.EntityFramework;
using Proverb.Data.Models;
using System.Threading.Tasks;

namespace Proverb.Data.CommandQuery
{
    public class SageCommand : BaseCommandQuery, ISageCommand
    {
        public SageCommand(ProverbContext context) : base(context) { }

        public async Task<int> DeleteAsync(int id) 
        {
            var userToDelete = await _context.Sages.FindAsync(id);

            if (userToDelete == null)
                return 0;

            _context.Sages.Remove(userToDelete);

            var saved = await _context.SaveChangesAsync();

            return saved;
        }

        public async Task<Sage> SaveAsync(Sage sage)
        {
            if (sage.Id > 0)
            {
                _context.Entry(sage).State = EntityState.Modified;
            }
            else
            {
                _context.Sages.Add(sage);
            }
            var saved = await _context.SaveChangesAsync();

            return sage;
        }
    }
}
