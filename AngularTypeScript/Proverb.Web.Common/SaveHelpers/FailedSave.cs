using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proverb.Web.Common.SaveHelpers
{
    public class FailedSave
    {
        public Dictionary<string, IEnumerable<string>> Errors { get; set; }
    }
}
