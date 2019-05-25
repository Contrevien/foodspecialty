using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FoodSpecialityDataAccessLayer.Models;

namespace API
{
    public class MapItPlease : Profile
    {
        public MapItPlease()
        {
            CreateMap<Users, Models.Users>();
            CreateMap<Models.Users, Users>();
            CreateMap<Vendors, Models.Vendors>();
            CreateMap<Models.Vendors, Vendors>();
            CreateMap<Orders, Models.Orders>();
            CreateMap<Models.Orders, Orders>();
            CreateMap<Payments, Models.Payments>();
            CreateMap<Models.Payments, Payments>();
            CreateMap<Category, Models.Category>();
            CreateMap<Models.Category, Category>();
            CreateMap<Dishes, Models.Dishes>();
            CreateMap<Models.Dishes, Dishes>();
            CreateMap<Ratings, Models.Ratings>();
            CreateMap<Models.Ratings, Ratings>();
        }
    }
}
