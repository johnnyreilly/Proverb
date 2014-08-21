using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proverb.Web.Common.SaveHelpers
{
    public class FailedSave
    {
        public FailedSave(string field, string error)
        {
            this.Errors = new Dictionary<string, IEnumerable<string>> 
            {
                { field, new string[] { error } }
            };
        }

        public FailedSave(Dictionary<string, IEnumerable<string>> errors)
        {
            this.Errors = errors;
        }

        public Dictionary<string, IEnumerable<string>> Errors { get; set; }
    }
}
