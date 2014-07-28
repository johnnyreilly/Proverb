using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proverb.Web.Common.SaveHelpers
{
    public class SaveResponse<TEntity>
    {
        public bool Success { get; set; }
        public TEntity Entity { get; set; }
        public Dictionary<string, IEnumerable<string>> Errors { get; set; }
    }
}
