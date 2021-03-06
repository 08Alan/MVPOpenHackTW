using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mvphack.service.analyze;

namespace boilerplate_dotnetcore_mvc_react.ApiControllers
{
    [Route("api/[controller]")]
    public class TodoApiController : Controller
    {
        AzureAnalyze service = new AzureAnalyze();
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            // service.get();
            service.get();
            return new string[] { "value1", "value2" };
            // return result;
        }
        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            service.get();
            // return result;
            return "value";
        }
        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpPost("UploadFile")]
        public string UploadFile([FromForm]IFormFile file)
        {
            return $"got file: {file.FileName}";
        }
    }
}
