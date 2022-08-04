using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LearningStarter.Common;
using LearningStarter.Entities;
using LearningStarterServer.Common;
using LearningStarterServer.Data;
using LearningStarterServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using LearningStarterServer.Entities;

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/enrollment")]
    public class EnrollmentsController : Controller
    {
        private readonly DataContext _dataContext;


        public EnrollmentsController(DataContext dataContext)
        {
            _dataContext = dataContext;

        }
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllEnrollments()
        {
            var response = new Response();

            response.Data = await _dataContext.Enrollments.ToListAsync();
            return Ok(response);
        }

        [HttpGet("{Id:int}")]
        public async Task<IActionResult> GetEnrollment([FromRoute] int Id)
        {
            var response = new Response();

            var enrollmentToRead = await _dataContext.Enrollments.FirstOrDefaultAsync(x=> x.Id == Id);

            if (enrollmentToRead == null)
            {
                return NotFound($" Id {Id} does not exist");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }
            var enrollmentReturn = new EnrollmentGetDto
            {
                Id = enrollmentToRead.Id,
                UserId = enrollmentToRead.UserId,
                ClassroomId = enrollmentToRead.ClassroomId
            };
            response.Data = enrollmentReturn;
            return Ok(response);
        }

        [HttpPost]

        public IActionResult CreateEnrollment( EnrollmentCreateDto enrollmentCreateDto)
        {
           
            var response = new Response();
            
            
            if (enrollmentCreateDto == null)
            {
                response.AddError("error ", " Critical error");
               
            }
         
            //todo if user is not student 
            if (enrollmentCreateDto.UserId == 0)
            {
                response.AddError("Userid", "User must craete an account before enrollment ");
               
            }
            if (enrollmentCreateDto.UserId < 0 || enrollmentCreateDto.UserId >= 100000)
            {
                response.AddError("User Id", " User Id cannot be negative or unreasonably large");
            }

            if ( enrollmentCreateDto.ClassroomId ==0)
            {
                response.AddError("Classroom", " Classroom must exist ");
             
            }
            if (enrollmentCreateDto.ClassroomId < 0 || enrollmentCreateDto.ClassroomId >= 100000)
            {
                response.AddError(" Classroom Id", "Classroom Id cannot be negative or unreasonably large");
            }
            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            var enrollmentToCreate = new Enrollment
            {
                UserId = enrollmentCreateDto.UserId, 
                ClassroomId= enrollmentCreateDto.ClassroomId,             
           
            };

            _dataContext.Enrollments.Add(enrollmentToCreate);
            _dataContext.SaveChanges();

            var enrollmentToReturn = new EnrollmentGetDto
            {
              Id= enrollmentToCreate.Id,
              UserId = enrollmentToCreate.UserId,
              ClassroomId = enrollmentToCreate.ClassroomId,

            };

            response.Data = enrollmentToReturn;
            return Ok(response);
        }

        [HttpDelete("{Id:int}")]
        public IActionResult DeleteEnrollment ( [FromRoute] int Id)
        {
            var response = new Response();

            var enrollmentToDelete = _dataContext.Enrollments.FirstOrDefault(x => x.Id == Id);

            if (enrollmentToDelete == null)
            {
                response.AddError(" Id", $" Id {Id} does not exist");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }

             _dataContext.Enrollments.Remove(enrollmentToDelete);
            _dataContext.SaveChanges();

            response.Data = true;

            return Ok(response);
        }
           
    }
}
