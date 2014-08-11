using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Proverb.Data.CommandQuery.Interfaces;
using Proverb.Data.EntityFramework;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery
{
    public class SageCommand : BaseCommandQuery, ISageCommand
    {
        public SageCommand(ProverbContext context) : base(context) { }

        public void Delete(int id) 
        {
            var userToDelete = _context.Sages.Find(id);
            
            _context.Sages.Remove(userToDelete);

            _context.SaveChanges();
        }

        public Sage Save(Sage sage)
        {
            if (sage.Id > 0)
            {
                _context.Entry(sage).State = EntityState.Modified;
            }
            else
            {
                _context.Sages.Add(sage);
            }
            _context.SaveChanges();

            return sage;
        }
    }
}
