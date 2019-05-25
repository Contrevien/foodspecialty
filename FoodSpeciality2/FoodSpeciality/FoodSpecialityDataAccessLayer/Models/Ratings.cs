using System;
using System.Collections.Generic;

namespace FoodSpecialityDataAccessLayer.Models
{
    public partial class Ratings
    {
        public string Rid { get; set; }
        public string Uid { get; set; }
        public string Name { get; set; }
        public string Rating { get; set; }
        public string Comment { get; set; }
        public DateTime? Date { get; set; }
        public string Did { get; set; }

        public Dishes D { get; set; }
        public Users U { get; set; }
    }
}
