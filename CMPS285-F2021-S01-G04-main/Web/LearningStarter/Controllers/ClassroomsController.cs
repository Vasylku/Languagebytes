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
    [Route("api/classrooms")]
    public class ClassroomsController : Controller
    {
        private readonly DataContext _dataContext;


        public ClassroomsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllClassrooms()
        {
            var response = new Response();
            
            response.Data = await _dataContext.Classrooms.ToListAsync();
           
            return Ok(response);
        }
        [HttpGet("{Id:int}")]
        public async Task<IActionResult> GetClassroom([FromRoute] int Id)
        {
            var response = new Response();

            var classroomToReturn = await _dataContext
                .Classrooms
                .Include(x => x.Enrollments)
                .ThenInclude( x => x.User)
                .Select(x => new ClassroomDetailDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    EslLevelId = x.EslLevelId,
                    TeacherId = x.TeacherId,
                    Semester = x.Semester,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate,
                    UserDtos = (ICollection<UserDto>)x.Enrollments
                    .Select(y => y.User)
                    .Select(y => new UserDto
                    {
                        Id = y.Id,
                        FirstName = y.FirstName,
                        LastName = y.LastName,
                        Username = y.Username,
                         

                    }),

                }) 
                .FirstOrDefaultAsync(x => x.Id == Id);


            if (classroomToReturn == null)
            {
                return NotFound($"Unable to find Id {Id}");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            response.Data = classroomToReturn;
           
            return Ok(response);

        }

        [HttpPost]

        public IActionResult CreateClassroom([FromBody]ClassroomCreateDto classroomCreateDto)
        {
            var response = new Response();

           /* var userAddToClassroom = _dataContext
                .Users
                .Where(x => classroomCreateDto.UserIds.Contains(x.Id))
                .ToList();
            */
            if (classroomCreateDto == null)
            {
                response.AddError("", "Critical error");

            }

            //todo after updating User endpoints, user must be admin in order to create a classroom

            if (string.IsNullOrEmpty(classroomCreateDto.Name?.Trim()))
            {

                response.AddError("Name", "Name must not be empty");

            }
            if (classroomCreateDto.Name != null && classroomCreateDto.Name?.Length > 20)
            {
                response.AddError("Name", " Name must be less than or equal to 20 characters");

            }
            
            if (classroomCreateDto.EslLevelId == 0 ) 
            {
                response.AddError("EslLevelId", " Esl Level cannot be empty or zero");

            }
            if (classroomCreateDto.EslLevelId < 0 || classroomCreateDto.EslLevelId >= 10000)
            {
                response.AddError("ESL Id", " Id must not be negative or unreasonably large");
            }

            if (classroomCreateDto.TeacherId == 0)
            {
                response.AddError("TeacherId", " Teacher Id cannot be empty or zero");

            }
            if (classroomCreateDto.TeacherId < 0 || classroomCreateDto.TeacherId >= 10000)
            {
                response.AddError("Teacher Id", " Id must not be negative or unreasonably large");
            }

            if (string.IsNullOrEmpty(classroomCreateDto.Semester?.Trim()))
            {
                response.AddError("Semester", "Semester must not be empty");

            }
            if (classroomCreateDto.Semester != null && classroomCreateDto.Semester?.Length > 20)
            {
                response.AddError("Semester", " Semester must be less than or equal to 20 characters");

            }

            if (classroomCreateDto.StartDate > classroomCreateDto.EndDate)
            {
                response.AddError("StartDate", " StartDate must be before the EndDate");

            }
            if (classroomCreateDto.StartDate == classroomCreateDto.EndDate)
            {
                response.AddError("StartDate", " Start Date cannot be equal to End Date");

            }

            if (classroomCreateDto.StartDate <= DateTime.UtcNow)
            {
                response.AddError("Start Date", " Start date cannot be in the past");
            }

            if (classroomCreateDto.EndDate < DateTimeOffset.Now )
            {
                response.AddError("End Date", " End date cannot be in the past or before Start Date");
            }
       
            if (response.HasErrors)
            {
                return BadRequest(response);
            }
           
            var classroomToCreate = new Classroom
            {
                Name = classroomCreateDto.Name,
                EslLevelId = classroomCreateDto.EslLevelId,
                TeacherId = classroomCreateDto.TeacherId,
                Semester = classroomCreateDto.Semester,
                StartDate = classroomCreateDto.StartDate,
                EndDate = classroomCreateDto.EndDate,
              
            };
        /*   foreach (var user in userAddToClassroom)
            {
                var enrollment = new Enrollment
                {
                    ClassroomId = classroomToCreate.Id,
                    UserId = user.Id,

                };
                classroomToCreate.Enrollments.Add(enrollment);
            }*/
            _dataContext.Classrooms.Add(classroomToCreate);
            _dataContext.SaveChanges();

            var classroomToReturn = new ClassroomGetDto
            {
                Id = classroomToCreate.Id,
                EslLevelId = classroomToCreate.EslLevelId,
                Name = classroomToCreate.Name,
                Semester = classroomToCreate.Semester,
                TeacherId = classroomToCreate.TeacherId,
                StartDate = classroomToCreate.StartDate,
                EndDate = classroomToCreate.EndDate,

            };
            response.Data = classroomToReturn;
            return Ok(response);
        }

        [HttpPut("{Id:int}")]
        public IActionResult PutClassroom([FromRoute] int Id,[FromBody] ClassroomEditDto classroomEditDto)
        {
            var response = new Response();

            var classroomToEdit = _dataContext.Classrooms.FirstOrDefault(x => x.Id == Id);

            if (classroomEditDto == null)
            {
                response.AddError("", " Critical error");

            }
            //todo here we need to add if User RoleNAme is not == Admin , reference to the User Controller?
            // if (UserDto.Id != UserDto.Role.RoleName) todo next {
            //response.AddError("Id", " Admin required for creating classroom")}
            //   var roleName = new RoleGetDto();..
            if (string.IsNullOrEmpty(classroomEditDto.Name?.Trim()))
            {

                response.AddError("Name", "Name must not be empty");

            }
            if (classroomEditDto.Name != null && classroomEditDto.Name?.Length > 20)
            {
                response.AddError("Name", " Name must be less than or equal to 20 characters");

            }
            if (classroomEditDto.EslLevelId < 0 || classroomEditDto.EslLevelId >= 10000)
            {
                response.AddError("ESL Id", " Esl Id must not be negative or too large");
            }
            if (classroomEditDto.EslLevelId == 0)
            {
                response.AddError("EslLevelId", " Esl Id cannot be empty or zero");

            }
            if (classroomEditDto.TeacherId == 0)
            {
                response.AddError("TeacherId", " Teacher Id cannot be empty or zero");

            }
            if (classroomEditDto.TeacherId < 0 || classroomEditDto.TeacherId >= 10000)
            {
                response.AddError("ESL Id", "Esl Id must not be negative or too large");
            }

            if (string.IsNullOrEmpty(classroomEditDto.Semester?.Trim()))
            {
                response.AddError("Semester", "Semester must not be empty");

            }

            if (classroomEditDto.Semester != null && classroomEditDto.Semester.Length > 20)
            {
                response.AddError("Semester", " Semester must be less than or equal to 20 characters");

            }

            if (classroomEditDto.StartDate > classroomEditDto.EndDate)
            {
                response.AddError("StartDate", " StartDate must be before the EndDate");

            }
            if (classroomEditDto.StartDate == classroomEditDto.EndDate)
            {
                response.AddError("StartDate", " Start Date cannot be equal to EndDate");

            }

            if (classroomEditDto.StartDate < DateTimeOffset.Now)
            {
                response.AddError("Start Date", " Start date cannot be in the past");
            }

            if (classroomEditDto.EndDate < DateTimeOffset.Now || classroomEditDto.EndDate < classroomEditDto.StartDate)
            {
                response.AddError("End Date", " End date cannot be in the past or before Start Date");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);

            }
           
            classroomToEdit.Name = classroomEditDto.Name;
            classroomToEdit.EslLevelId = classroomEditDto.EslLevelId;
            classroomToEdit.TeacherId = classroomEditDto.TeacherId;
            classroomToEdit.Semester = classroomEditDto.Semester;
            classroomToEdit.StartDate = classroomEditDto.StartDate;
            classroomToEdit.EndDate = classroomEditDto.EndDate;
       
             _dataContext.SaveChangesAsync();

            var classroomToReturn = new ClassroomGetDto
            {
                Id = classroomToEdit.Id,
                Name = classroomToEdit.Name,
                EslLevelId = classroomToEdit.EslLevelId,
                TeacherId = classroomToEdit.TeacherId,
                Semester = classroomToEdit.Semester,
                StartDate = classroomToEdit.StartDate,
                EndDate = classroomToEdit.EndDate
            };
            
            response.Data = classroomToReturn;
            return Ok(response);
        }

        [HttpDelete("{Id:int}")]
        public IActionResult DeleteClassroom([FromRoute] int Id) {
            var response = new Response();

            var classroomToDelete = _dataContext.Classrooms.FirstOrDefault(x=> x.Id==Id);

            if (classroomToDelete == null)
            {
                response.AddError("Id", $"{Id} is not found. There was a problem deleting the classroom.");
                return NotFound(response);
            }
            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            _dataContext.Classrooms.Remove(classroomToDelete);
            _dataContext.SaveChanges();

            response.Data = true;

            return Ok(response);
         }
    }
}
