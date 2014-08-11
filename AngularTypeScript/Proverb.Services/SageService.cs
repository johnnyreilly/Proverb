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
    public class SageService : ISageService
    {
        public SageService(ISageCommand sageCommand, ISageQuery sageQuery)
        {
            _sageCommand = sageCommand;
            _sageQuery = sageQuery;
        }

        private ISageCommand _sageCommand;
        private ISageQuery _sageQuery;

        public void Delete(int id)
        {
            _sageCommand.Delete(id);
        }

        public ICollection<Sage> GetAll()
        {
            return _sageQuery.GetAll();
        }

        public Sage GetById(int id)
        {
            return _sageQuery.GetById(id);
        }

        public Sage Save(Sage sage) 
        {
            return _sageCommand.Save(sage);
        }

    }
}
