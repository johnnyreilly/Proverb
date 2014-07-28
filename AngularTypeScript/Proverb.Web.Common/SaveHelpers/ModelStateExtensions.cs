using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proverb.Web.Common.SaveHelpers
{
    public static class ModelStateExtensions
    {
        public static Dictionary<string, IEnumerable<string>> ToErrorDictionary(
            this System.Web.Http.ModelBinding.ModelStateDictionary modelState) 
        {
            var errors = modelState
                .Where(x => x.Value.Errors.Any())
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage)
                );

            return errors;
        } 
    }
}
