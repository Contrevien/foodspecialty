using System;
using System.Collections.Generic;

namespace API.Models
{
    public class Dishes
    {

        public string Did { get; set; }
        public string Name { get; set; }
        public int? Price { get; set; }
        public string Description { get; set; }
        public string Vid { get; set; }
        public string CatId { get; set; }
        public string Status { get; set; }
        public byte[] Image { get; set; }
        public string ImageType { get; set; }
    }
}
