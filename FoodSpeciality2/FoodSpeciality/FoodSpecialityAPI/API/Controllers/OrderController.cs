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
    public class OrderController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly FSRepository repository;
        public OrderController(IMapper mapper, FSRepository rep)
        {
            _mapper = mapper;
            repository = rep;
        }

        // GET: api/Order
        [HttpGet]
        public JsonResult GetAllOrders()
        {
            List<Models.Orders> orders = new List<Models.Orders>();
            try
            {
                List<Orders> orderList = repository.GetAllOrders();
                if (orderList != null)
                {
                    foreach (var order in orderList)
                    {
                        Models.Orders orderObj = _mapper.Map<Models.Orders>(order);
                        orders.Add(orderObj);
                    }
                }
            }
            catch (Exception ex)
            {
                orders = null;
            }
            return new JsonResult(orders);
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public JsonResult GetOrders(string id)
        {
            Models.Orders odrs = null;
            try
            {
                odrs = _mapper.Map<Models.Orders>(repository.GetOrderById(id));
            }
            catch (Exception ex)
            {
                odrs = null;
            }
            return new JsonResult(odrs);
        }

        [HttpGet("{id}")]
        public JsonResult GetOrdersByDid(string id)
        {
            List<Models.Orders> orders = new List<Models.Orders>();
            try
            {
                List<Orders> orderList = repository.GetOrdersByDid(id);
                if (orderList != null)
                {
                    foreach (var order in orderList)
                    { 
                        orders.Add(_mapper.Map<Models.Orders>(order));
                    }
                }
            }
            catch (Exception ex)
            {
                orders = null;
            }
            return new JsonResult(orders);
        }

        [HttpGet("{id}")]
        public JsonResult GetOrdersByUid(string id)
        {
            List<object> result = new List<object>();
            try
            {
                var ords = repository.GetOrdersByUid(id);
                foreach (var ord in ords)
                {
                    var usr = repository.GetVendorById(ord.Vid);
                    var dish = repository.GetDish(ord.Did);
                    var temp = new
                    {
                        ord.Oid,
                        ord.Uid,
                        ord.Vid,
                        ord.Did,
                        vname = usr.Name,
                        vemail = usr.Email,
                        vphone = usr.Phone,
                        vadd = usr.Address,
                        dname = dish.Name,
                        dprice = dish.Price,
                        ord.Quantity,
                        ord.OrderTime,
                        ord.DelStatus
                    };
                    result.Add(temp);
                }
            }
            catch (Exception ex)
            {
                result = null;
            }
            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public JsonResult GetOrdersByVid(string id)
        {
            List<object> result = new List<object>();
            try
            {
                var ords = repository.GetOrdersByVid(id);
                foreach (var ord in ords)
                {
                    var usr = repository.GetUserById(ord.Uid);
                    var dish = repository.GetDish(ord.Did);
                    var temp = new
                    {
                        ord.Oid,
                        ord.Uid,
                        ord.Vid,
                        ord.Did,
                        ord.Quantity,
                        ord.DelStatus,
                        ord.OrderTime,
                        uname = usr.Name,
                        uphone = usr.Phone,
                        uadd = usr.Address,
                        dname = dish.Name,
                        dprice= dish.Price
                    };
                    result.Add(temp);
                }
            }
            catch (Exception ex)
            {
                result = null;
            }
            return new JsonResult(result);
        }

        // POST: api/Order
        [HttpPost]
        public JsonResult AddOrder(Models.Orders order)
        {
            bool status = false;
            try
            {
                status = repository.AddOrder(_mapper.Map<Orders>(order));
            }
            catch (Exception ex)
            {
                status = false;
            }
            return new JsonResult(status);
        }


        [HttpGet]
        public JsonResult GetNextOrderId()
        {
            string id = null;
            try
            {
                id = repository.GetNextOrderId();
            }
            catch (Exception ex)
            {
                id = null;
            }
            return new JsonResult(id);
        }

        // PUT: api/Order/5
        [HttpPut]
        public JsonResult UpdateOrder(Models.Orders odr)
        {
            bool status = false;
            try
            {
                status = repository.UpdateOrder(_mapper.Map<Orders>(odr));
            }
            catch (Exception ex)
            {
                status = false;
            }
            return new JsonResult(status);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public JsonResult DeleteOrders(string ordrId)
        {
            bool status = false;
            try
            {
                status = repository.DeleteOrder(ordrId);
            }
            catch (Exception ex)
            {
                status = false;
            }
            return new JsonResult(status);
        }
    }
}
