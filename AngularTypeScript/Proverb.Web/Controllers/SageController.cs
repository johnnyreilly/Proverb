using log4net;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Proverb.Data.Models;
using Proverb.Services.Interfaces;
using Proverb.Web.Common.SaveHelpers;
using Proverb.Web.Interfaces;

namespace Proverb.Web.Controllers
{
    public class SageController : ApiController
    {
        ISageService _sageService;
        IUserHelper _userHelper;
        ILog _logger;

        public SageController(
            ISageService userService,
            IUserHelper userHelper,
            ILog logger) 
        {
            _sageService = userService;
            _userHelper = userHelper;
            _logger = logger;
        }

        public Sage Get(int id)
        {
            return _sageService.GetById(id);
        }

        public IEnumerable<Sage> Get()
        {
            return _sageService.GetAll();
        }

        public IHttpActionResult Post(Sage sage)
        {
            if (!ModelState.IsValid) {

                return this.BadRequest(new { 
                    Errors = ModelState.ToErrorDictionary() 
                });
            }

            sage = _sageService.Save(sage);

            return Ok(new {
                Entity = sage
            });
        }

        // DELETE api/<controller>/5
        public IHttpActionResult Delete(int id)
        {
            _sageService.Delete(id);

            return Ok();
        }

        /*

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }
         */
    }
}