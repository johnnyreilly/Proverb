using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Proverb.Data.Models
{
    public class Sage : User
    {
        public ICollection<Saying> Sayings { get; set; }
    }
}
