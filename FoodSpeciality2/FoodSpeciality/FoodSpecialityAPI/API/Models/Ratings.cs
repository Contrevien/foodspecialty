using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Ratings
    {
        public string Rid { get; set; }
        public string Uid { get; set; }
        public string Name { get; set; }
        public string Rating { get; set; }
        public string Comment { get; set; }
        public DateTime? Date { get; set; }
        public string Did { get; set; }
    }
}
