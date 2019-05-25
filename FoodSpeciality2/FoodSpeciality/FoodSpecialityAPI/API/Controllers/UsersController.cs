using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using FoodSpecialityDataAccessLayer;
using FoodSpecialityDataAccessLayer.Models;

namespace API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly FSRepository repository;
        public UsersController(IMapper mapper, FSRepository rep)
        {
            _mapper = mapper;
            repository = rep;
        }

        [HttpGet]
        public JsonResult GetDefault()
        {
            Models.Users user = null;
            try
            {
                user = _mapper.Map<Models.Users>(repository.GetDefault());
            }
            catch (Exception)
            {
                user = null;
            }
            return new JsonResult(user);
        }

        // GET: Users/akkimysite@gmail.com
        [HttpGet("{email}")]
        public JsonResult GetUser(string email)
        {
            try
            {
                return new JsonResult(_mapper.Map<Models.Users>(repository.GetUser(email)));
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
        }

        [HttpGet("{id}")]
        public JsonResult GetUserById(string id)
        {
            try
            {
                return new JsonResult(_mapper.Map<Models.Users>(repository.GetUserById(id)));
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
        }

        public JsonResult GetNextUserId()
        {
            try
            {
                return new JsonResult(repository.GetNextUserId());
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
        }

        public JsonResult GetPendingQueriesUser()
        {
            try
            {
                List<Models.Users> result = new List<Models.Users>();
                var returned = repository.GetPendingQueriesUser();
                foreach (var item in returned)
                {
                    result.Add(_mapper.Map<Models.Users>(item));
                }
                return new JsonResult(result);
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
        }

        // POST: api/Users
        [HttpPost]
        public JsonResult AddUser(Models.Users usr)
        {
            var status = false;
            try
            {
                status = repository.AddUser(_mapper.Map<Users>(usr));
            }
            catch (Exception)
            {
                status = false;
            }
            return new JsonResult(status);
        }

        // PUT: api/Product/5
        [HttpPut]
        public JsonResult UpdateUser(Models.Users prodObj)
        {
            bool status = false;
            try
            {
                status = repository.UpdateUser(_mapper.Map<Users>(prodObj));
            }
            catch (Exception)
            {
                status = false;
            }
            return new JsonResult(status);
        }


        [HttpGet("{email}")]
        public JsonResult GetNotDeliveredForUser(string email)
        {
            try
            {
                var user = repository.GetUser(email);
                var ord = repository.GetNotDeliveredForUser(user.Uid);
                var vendor = repository.GetVendorById(ord.Vid);
                var result = new
                {
                    ord.Oid,
                    ord.Uid,
                    ord.Vid,
                    ord.Did,
                    vname = vendor.Name,
                    vemail = vendor.Email,
                    vphone = vendor.Phone,
                    vadd = vendor.Address,
                    dname = repository.GetDish(ord.Did).Name,
                    ord.Quantity,
                    ord.OrderTime,
                    ord.DelStatus
                };
                return new JsonResult(result);
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
            
        }

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{productId}")]
        //public JsonResult DeleteProduct(string productId)
        //{
        //    bool status = false;
        //    try
        //    {
        //        status = repository.DeleteProduct(productId);
        //    }
        //    catch (Exception ex)
        //    {
        //        status = false;
        //    }
        //    return new JsonResult(status);
        //}
    }
}
