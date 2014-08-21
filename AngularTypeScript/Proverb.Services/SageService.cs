﻿using System;
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

        public async Task<int> DeleteAsync(int id)
        {
            return await _sageCommand.DeleteAsync(id);
        }

        public async Task<ICollection<Sage>> GetAllAsync()
        {
            return await _sageQuery.GetAllAsync();
        }

        public async Task<Sage> GetByIdAsync(int id)
        {
            return await _sageQuery.GetByIdAsync(id);
        }

        public async Task<Sage> SaveAsync(Sage sage) 
        {
            return await _sageCommand.SaveAsync(sage);
        }

    }
}
