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
    public class VendorController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly FSRepository repository;
        public VendorController(IMapper mapper, FSRepository rep)
        {
            _mapper = mapper;
            repository = rep;
        }

        [HttpGet]
        public JsonResult GetDefaultVendor()
        {
            Models.Vendors vend = null;
            try
            {
                vend = _mapper.Map<Models.Vendors>(repository.GetVendorByDefault());
            }
            catch (Exception)
            {
                vend = null;
            }
            return new JsonResult(vend);
        }

        [HttpGet("{emailvendor}")]
        public JsonResult GetVendor(string emailvendor)
        {
            try
            {
                return new JsonResult(_mapper.Map<Models.Vendors>(repository.GetVendor(emailvendor)));
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
        }

        public JsonResult GetPendingQueriesVendor()
        {
            try
            {
                List<Models.Vendors> result = new List<Models.Vendors>();
                var returned = repository.GetPendingQueriesVendor();
                foreach (var item in returned)
                {
                    result.Add(_mapper.Map<Models.Vendors>(item));
                }
                return new JsonResult(result);
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
        }

        [HttpGet("{id}")]
        public JsonResult GetVendorById(string id)
        {
            try
            {
                return new JsonResult(_mapper.Map<Models.Vendors>(repository.GetVendorById(id)));
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
        }

        [HttpGet]
        public JsonResult GetNextVendorId()
        {
            try
            {
                return new JsonResult(repository.GetNextVendorId());
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
        }

        [HttpGet("{id}")]
        public JsonResult GetInProgressForVendor(string id)
        {
            try
            {
                var ords = repository.GetInProgressForVendor(id);
                List<object> result = new List<object>();
                foreach (var ord in ords)
                {
                    var usr = repository.GetUserById(ord.Uid);
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
                        dname = repository.GetDish(ord.Did).Name  
                    };
                    result.Add(temp);
                }
                
                return new JsonResult(result);
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
        }

        [HttpPost]
        public JsonResult AddVendor(Models.Vendors vendor)
        {
            bool status = false;
            try
            {
                status = repository.AddVendors(_mapper.Map<Vendors>(vendor));
            }
            catch (Exception)
            {
                status = false;
            }
            return new JsonResult(status);
        }

        [HttpPut]
        public JsonResult UpdateVendor(Models.Vendors prodObj)
        {
            bool status = false;
            try
            {
                status = repository.UpdateVendor(_mapper.Map<Vendors>(prodObj));
            }
            catch (Exception)
            {
                status = false;
            }
            return new JsonResult(status);
        }

    }
}
