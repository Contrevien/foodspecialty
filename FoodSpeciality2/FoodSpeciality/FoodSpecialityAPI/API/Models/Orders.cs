using System;
using System.Collections.Generic;

namespace API.Models
{
    public class Orders
    {


        public string Oid { get; set; }
        public string Uid { get; set; }
        public string Vid { get; set; }
        public string Did { get; set; }
        public int? Quantity { get; set; }
        public string DelStatus { get; set; }
        public DateTime? OrderTime { get; set; }
    }
}
