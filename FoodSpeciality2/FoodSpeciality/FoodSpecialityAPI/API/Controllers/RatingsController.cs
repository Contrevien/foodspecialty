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
    public class RatingsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly FSRepository repository;
        public RatingsController(IMapper mapper, FSRepository rep)
        {
            _mapper = mapper;
            repository = rep;
        }

        [HttpGet("{did}")]
        public JsonResult GetRatingsByDid(string did)
        {
            try
            {
                var result = repository.GetRatingsByDid(did);
                List<Models.Ratings> toSend = new List<Models.Ratings>();
                foreach (var item in result)
                {
                    toSend.Add(_mapper.Map<Models.Ratings>(item));
                }
                return new JsonResult(toSend);
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
        }

        [HttpGet("{did}")]
        public JsonResult GetAvgRating(string did)
        {
            try
            {
                var toSend = repository.GetAvgRating(did);
                return new JsonResult(toSend);
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
        }

        [HttpPost]
        public JsonResult AddRating(Models.Ratings rating)
        {
            try
            {
                rating.Rid = repository.GetNextRatingId();
                return new JsonResult(repository.AddRating(_mapper.Map<Ratings>(rating)));
            }
            catch (Exception)
            {
                return new JsonResult(null);
            }
        }
    }
}