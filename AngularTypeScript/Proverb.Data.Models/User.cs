using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proverb.Data.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string UserName { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        
        public ICollection<Saying> Proverbs { get; set; }
    }
}
