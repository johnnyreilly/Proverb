﻿using Proverb.Data.CommandQuery.Interfaces;
using Proverb.Data.Common;
using Proverb.Data.Models;
using Proverb.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        public ValidationMessages Validate(Saying saying)
        {
            var validations = new ValidationMessages();

            // Probably will move this logic into sayingService - a Validate method
            if (saying.SageId == 0) 
            {
                // eg "saying.sageId"
                var fieldName = ValidationHelpers.GetFieldName(saying, x => x.SageId);
                validations.AddError(fieldName, "Please select a sage.");
            }

            return validations;
        }
    }
}
