using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Proverb.Data.Models;
using Proverb.Services.Interfaces;
using Proverb.Web.Interfaces;

namespace Proverb.Web.Controllers
{
    public class SayingController : ApiController
    {
        ISayingService _sayingService;
        IUserHelper _userHelper;
        ILog _logger;

        public SayingController(
            ISayingService sayingService,
            IUserHelper userHelper,
            ILog logger) 
        {
            _sayingService = sayingService;
            _userHelper = userHelper;
            _logger = logger;
        }

        public async Task<IHttpActionResult> Get()
        {
            var sayings = await _sayingService.GetAllAsync();

            return Ok(sayings);
        }

        /*
        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
         */
    }
}