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
using System.Threading.Tasks;

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

        public async Task<IHttpActionResult> Get(int id)
        {
            var sage = await _sageService.GetByIdAsync(id);

            if (sage == null)
                return NotFound();
            else
                return Ok(sage);
        }

        public async Task<IHttpActionResult> Get()
        {
            var sages = await _sageService.GetAllAsync();

            return Ok(sages);
        }

        public async Task<IHttpActionResult> Post(Sage sage)
        {
            if (!ModelState.IsValid) {

                return this.BadRequest(new FailedSave { 
                    Errors = ModelState.ToErrorDictionary() 
                });
            }

            sage = await _sageService.SaveAsync(sage);

            return Ok(sage);
        }

        // DELETE api/<controller>/5
        public async Task<IHttpActionResult> Delete(int id)
        {
            var deleteCount = await _sageService.DeleteAsync(id);

            if (deleteCount == 0)
                return NotFound();
            else
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