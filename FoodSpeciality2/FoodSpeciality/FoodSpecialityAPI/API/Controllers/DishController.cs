using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FoodSpecialityDataAccessLayer;
using FoodSpecialityDataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class DishController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly FSRepository repository;
        public DishController(IMapper mapper, FSRepository rep)
        {
            _mapper = mapper;
            repository = rep;
        }

        // GET: api/Dish
        [HttpGet]
        public JsonResult GetAllDishes()
        {
            List<object> dish = new List<object>();
            try
            {
                var returned = repository.GetAllDishes();
                
                foreach (var d in returned) {
                    var rat = repository.GetAvgRating(d.Did);
                    var dc = repository.GetOrdersByDid(d.Did).Count;
                    var temp = new
                    {
                        d.Did,
                        rating = rat,
                        d.Name,
                        d.Status,
                        d.Vid,
                        seller = repository.GetVendorById(d.Vid).Name,
                        sellerAddress = repository.GetVendorById(d.Vid).Address,
                        ordered = dc,
                        d.CatId,
                        d.Image,
                        d.Imagetype,
                        d.Price,
                        d.Description,
                        type = repository.GetCategoryById(d.CatId).Name
                    };
                    dish.Add(temp);
                }
            }
            catch (Exception)
            {
                dish = null;
            }
            return new JsonResult(dish);
        }

        [HttpGet]
        public JsonResult GetNextDishId()
        {
            return new JsonResult(repository.GetNextDishId());
        }

        [HttpGet]
        public JsonResult GetAllCategories()
        {
            List<Models.Category> cats = new List<Models.Category>();
            try
            {
                var returned = repository.GetAllCategories();
                foreach (var item in returned)
                {
                    cats.Add(_mapper.Map<Models.Category>(item));
                }
            }
            catch (Exception)
            {
                cats = null;
            }
            return new JsonResult(cats);
        }

        [HttpPost]
        public JsonResult AddCategory(Models.Category cat)
        {
            try
            {
                cat.CatId = repository.GetNextCategoryId();
                return new JsonResult(repository.AddCategory(_mapper.Map<Category>(cat)));
            }
            catch (Exception)
            {
                return new JsonResult(false);
            }

        }


        // GET: api/Dish
        [HttpGet("{Vid}")]
        public JsonResult GetAllDishesByVendor(string Vid)
        {
            List<object> dish = new List<object>();
            try
            {
                var returned = repository.GetAllDishesByVendor(Vid);
                foreach (var d in returned)
                {
                    var temp = new
                    {
                        d.Did,
                        d.Name,
                        d.Status,
                        d.Vid,
                        d.CatId,
                        d.Description,
                        d.Price,
                        d.Image,
                        d.Imagetype,
                        type = repository.GetCategoryById(d.CatId).Name,
                        sold = repository.GetOrdersByDid(d.Did).Count
                    };
                    dish.Add(temp);
                }
            }
            catch (Exception)
            {
                dish = null;
            }
            return new JsonResult(dish);
        }

        // GET: api/Dish/5
        [HttpGet("{id}")]

        public JsonResult GetDish(string id)
        {
            try
            {
                var d = repository.GetDish(id);
                var v = repository.GetVendorById(d.Vid);
                var dc = repository.GetOrdersByDid(id).Count;
                var rat = repository.GetAvgRating(id);
                var temp = new
                {
                    d.Did,
                    d.Name,
                    d.Status,
                    d.Vid,
                    seller = v.Name,
                    sellerEmail = v.Email,
                    sellerAddress = v.Address,
                    sellerPhone = v.Phone,
                    ordered = dc,
                    d.CatId,
                    d.Description,
                    d.Price,
                    d.Image,
                    d.Imagetype,
                    rating = rat,
                    type = repository.GetCategoryById(d.CatId).Name
                };
                return new JsonResult(temp);
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
        }


        // POST: api/Dish
        [HttpPost]
        public JsonResult AddDish(Models.Dishes dish)
        {
            bool status = false;
            try
            {
                dish.Did = repository.GetNextDishId();
                status = repository.AddDish(_mapper.Map<Dishes>(dish));
            }
            catch (Exception)
            {
                status = false;
            }
            return new JsonResult(status);
        }

        // PUT: api/Dish/5
        [HttpPut]
        public JsonResult UpdateDish(Models.Dishes dish)
        {
            bool status = false;
            try
            {
                status = repository.UpdateDish(_mapper.Map<Dishes>(dish));
            }
            catch (Exception)
            {
                status = false;
            }
            return new JsonResult(status);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{Id}")]
        public JsonResult DeleteDish(string Id)
        {
            bool status = false;
            try
            {
                status = repository.DeleteDish(Id);
            }
            catch (Exception)
            {
                status = false;
            }
            return new JsonResult(status);
        }
    }
}
