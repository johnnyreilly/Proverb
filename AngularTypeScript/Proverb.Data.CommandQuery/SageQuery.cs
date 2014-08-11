using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Proverb.Data.CommandQuery.Interfaces;
using Proverb.Data.EntityFramework;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery
{
    public class SageQuery : BaseCommandQuery, ISageQuery
    {
        public SageQuery(ProverbContext context) : base(context) { }

        public ICollection<Sage> GetAll()
        {
            var sages = _context.Sages.ToList();
            
            return sages;
        }

        public ICollection<Sage> GetAllWithSayings()
        {
            var sagesWithSayings = _context.Sages.Include(x => x.Sayings).ToList();
            
            return sagesWithSayings;
        }

        public Sage GetById(int id)
        {
            var sage = _context.Sages.Find(id);
            
            return sage;
        }

        public Sage GetByIdWithSayings(int id)
        {
            var sageWithSayings = _context.Sages.Include(x => x.Sayings).SingleOrDefault(x => x.Id == id);

            return sageWithSayings;
        }
    }
}
