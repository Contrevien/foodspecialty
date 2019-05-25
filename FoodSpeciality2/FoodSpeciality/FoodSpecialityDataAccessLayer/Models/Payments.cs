using System;
using System.Collections.Generic;

namespace FoodSpecialityDataAccessLayer.Models
{
    public partial class Payments
    {
        public string Pid { get; set; }
        public string Uid { get; set; }
        public string Oid { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public int? Amount { get; set; }
        public DateTime? PaymentTime { get; set; }

        public Orders O { get; set; }
        public Users U { get; set; }
    }
}
