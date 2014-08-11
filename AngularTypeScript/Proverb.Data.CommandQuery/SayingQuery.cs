using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Proverb.Data.CommandQuery.Interfaces;
using Proverb.Data.EntityFramework;
using Proverb.Data.Models;

namespace Proverb.Data.CommandQuery
{
    public class SayingQuery : BaseCommandQuery, ISayingQuery
    {
        public SayingQuery(ProverbContext context) : base(context) { }

        public ICollection<Saying> GetAll()
        {
            return _context.Sayings.ToList();
        }

        public Saying GetById(int id)
        {
            return _context.Sayings.Find(id);
        }

        public ICollection<Saying> GetBySageId(int sageId)
        {
            return _context.Sayings.Where(x => x.SageId == sageId).ToList();
        }
    }
}
