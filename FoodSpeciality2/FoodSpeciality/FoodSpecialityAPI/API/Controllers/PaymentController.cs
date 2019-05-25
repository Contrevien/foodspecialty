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
    public class PaymentController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly FSRepository repository;
        public PaymentController(IMapper mapper, FSRepository rep)
        {
            _mapper = mapper;
            repository = rep;
        }
        // GET: api/Payment
        [HttpGet]
        public JsonResult GetAllPayments()
        {
            List<Models.Payments> payment = new List<Models.Payments>();
            try
            {
                List<Payments> paymentList = repository.GetAllPayment();
                if (paymentList != null)
                {
                    foreach (var pmt in paymentList)
                    {
                        Models.Payments payObj = _mapper.Map<Models.Payments>(pmt);
                        payment.Add(payObj);
                    }
                }
            }
            catch (Exception ex)
            {
                payment = null;
            }
            return new JsonResult(payment);
        }

        // GET: api/Payment/5
        [HttpGet("{id}")]
        public JsonResult GetPaymentById(string pmtId)
        {
            Models.Payments payment = null;
            try
            {
                payment = _mapper.Map<Models.Payments>(repository.GetOrderById(pmtId));
            }
            catch (Exception ex)
            {
                payment = null;
            }
            return new JsonResult(payment);
        }

        [HttpGet]
        public JsonResult GetNextPaymentId()
        {
            string id = null;
            try
            {
                id = repository.GetNextPaymentId();
            }
            catch (Exception ex)
            {
                id = null;
            }
            return new JsonResult(id);
        }

        // POST: api/Payment
        [HttpPost]
        public JsonResult AddPayment(Models.Payments payment)
        {
            bool status = false;
            try
            {
                status = repository.AddPayment(_mapper.Map<Payments>(payment));
            }
            catch (Exception ex)
            {
                status = false;
            }
            return new JsonResult(status);
        }

        // PUT: api/Payment/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public JsonResult DeletePayments(string paymentId)
        {
            bool status = false;
            try
            {
                status = repository.DeletePayment(paymentId);
            }
            catch (Exception ex)
            {
                status = false;
            }
            return new JsonResult(status);
        }
    }
}
