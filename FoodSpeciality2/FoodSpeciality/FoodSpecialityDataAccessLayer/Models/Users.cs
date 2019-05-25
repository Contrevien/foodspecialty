using System;
using System.Collections.Generic;

namespace FoodSpecialityDataAccessLayer.Models
{
    public partial class Users
    {
        public Users()
        {
            Orders = new HashSet<Orders>();
            Payments = new HashSet<Payments>();
            Ratings = new HashSet<Ratings>();
        }

        public string Uid { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Query { get; set; }
        public string Response { get; set; }
        public string Status { get; set; }

        public ICollection<Orders> Orders { get; set; }
        public ICollection<Payments> Payments { get; set; }
        public ICollection<Ratings> Ratings { get; set; }
    }
}
