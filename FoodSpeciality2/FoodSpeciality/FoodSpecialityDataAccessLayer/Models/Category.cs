using System;
using System.Collections.Generic;

namespace FoodSpecialityDataAccessLayer.Models
{
    public partial class Category
    {
        public Category()
        {
            Dishes = new HashSet<Dishes>();
        }

        public string CatId { get; set; }
        public string Name { get; set; }

        public ICollection<Dishes> Dishes { get; set; }
    }
}
