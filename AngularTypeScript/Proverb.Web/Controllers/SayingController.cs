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
using System;

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

        public async Task<IHttpActionResult> Get(int id)
        {
            var sage = await _sayingService.GetByIdAsync(id);

            if (sage == null)
                return NotFound();
            else
                return Ok(sage);
        }

        public async Task<IHttpActionResult> Get()
        {
            var sages = await _sayingService.GetAllAsync();

            return Ok(sages);
        }

        public async Task<IHttpActionResult> Post(Saying saying)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest(new FailedSave(ModelState.ToErrorDictionary()));
            }

            // Probably will move this logic into sayingService - a Validate method
            if (saying.SageId == 0) 
            {
                // eg "saying.sageId"
                var fieldName = ValidationHelpers.GetFieldName<Saying>(x => x.SageId);
                return this.BadRequest(new FailedSave(fieldName, "Please select a sage."));
            }

            saying = await _sayingService.SaveAsync(saying);

            return Ok(saying);
        }


        public async Task<IHttpActionResult> Delete(int id)
        {
            var deleteCount = await _sayingService.DeleteAsync(id);

            if (deleteCount == 0)
                return NotFound();
            else
                return Ok();
        }
    }
}