using System;
using System.Collections.Generic;

namespace FoodSpecialityDataAccessLayer.Models
{
    public partial class Orders
    {
        public Orders()
        {
            Payments = new HashSet<Payments>();
        }

        public string Oid { get; set; }
        public string Uid { get; set; }
        public string Vid { get; set; }
        public string Did { get; set; }
        public int? Quantity { get; set; }
        public string DelStatus { get; set; }
        public DateTime? OrderTime { get; set; }

        public Dishes D { get; set; }
        public Users U { get; set; }
        public Vendors V { get; set; }
        public ICollection<Payments> Payments { get; set; }
    }
}
