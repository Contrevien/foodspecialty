using System;
using System.Collections.Generic;

namespace FoodSpecialityDataAccessLayer.Models
{
    public partial class Dishes
    {
        public Dishes()
        {
            Orders = new HashSet<Orders>();
            Ratings = new HashSet<Ratings>();
        }

        public string Did { get; set; }
        public string Name { get; set; }
        public int? Price { get; set; }
        public string Description { get; set; }
        public string Vid { get; set; }
        public string CatId { get; set; }
        public string Status { get; set; }
        public byte[] Image { get; set; }
        public string Imagetype { get; set; }

        public Category Cat { get; set; }
        public Vendors V { get; set; }
        public ICollection<Orders> Orders { get; set; }
        public ICollection<Ratings> Ratings { get; set; }
    }
}
