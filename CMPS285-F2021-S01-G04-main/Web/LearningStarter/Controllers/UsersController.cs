using LearningStarterServer.Common;
using LearningStarterServer.Data;
using LearningStarterServer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using LearningStarter.Common;
using Microsoft.EntityFrameworkCore;
using LearningStarter.Entities;
using System.Collections.Generic;

namespace LearningStarterServer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            var response = new Response();

                response.Data = _context.Users.ToList();

            return Ok(response);
        }

        [HttpPost]
        public IActionResult Create(UserCreateDto userCreateDto)
        {
            var response = new Response();
         
            /*  var classroomIds = userCreateDto.EnrollmentCreateDtos.Select(x => x.ClassroomId);
              var classAddToUser = _context
                 .Classrooms
                 .Where(x => classroomIds
                 .Contains(x.Id))
                 .ToList();
              */
            if (userCreateDto.FirstName == null || userCreateDto.FirstName == "")
            {
                response.AddError("First Name", "First name cannot be empty.");
            }

            if (userCreateDto.LastName == null || userCreateDto.LastName == "")
            {
                response.AddError("Last Name", "Last name cannot be empty.");
            }

            if (userCreateDto.Username == null || userCreateDto.Username == "")
            {
                response.AddError("User Name", "User name cannot be empty.");
            }
        

            if (userCreateDto.Password == null || userCreateDto.Password == "")
            {
                response.AddError("Password", "Password cannot be empty.");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }
            var userToCreate = new User
            {
                FirstName = userCreateDto.FirstName,
                LastName = userCreateDto.LastName,
                Username = userCreateDto.Username,
                Password = userCreateDto.Password
            };
            
          /*  foreach (var classroom in classAddToUser)
            {
                var enrollment = new Enrollment
                {
                    UserId = userToCreate.Id,
                    ClassroomId = classroom.Id,

                };
                userToCreate.Enrollments.Add(enrollment);
            }*/
            _context.Users.Add(userToCreate);
            _context.SaveChanges();

            var userToReturn = new UserDto
            {
                Id = userToCreate.Id,
                FirstName = userToCreate.FirstName,
                LastName = userToCreate.LastName,
                Username = userToCreate.Username,


            };
            
            response.Data = userToReturn;

            return Created("", response);
        }

        [HttpGet("{Id:int}")]
        public IActionResult Details([FromRoute]int Id)
        {
          var response = new Response();
        
          var userToGet = _context
                .Users
                .Include(x => x.Enrollments)
                .ThenInclude(x => x.Classroom)
                .Select(x => new UserDetailDto
             {
                 Id = x.Id,
                 FirstName = x.FirstName,
                 LastName = x.LastName,
                 Username = x.Username,
                 ClassroomGetDtos = (ICollection<ClassroomGetDto>)x.Enrollments
                 .Select(y => y.Classroom)
                 .Select(y => new ClassroomGetDto
                 {
                     Id = y.Id,
                     Name = y.Name,
                     EslLevelId = y.EslLevelId,
                     TeacherId = y.TeacherId,
                     Semester = y.Semester,
                     StartDate = y.StartDate,
                     EndDate = y.EndDate,
                 }),

             })
                .FirstOrDefault(x => x.Id == Id);
            if (userToGet == null)
            {
                response.AddError("id", "There was a problem finding the user.");
              
            }
            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            response.Data = userToGet;

            return Ok(response);
        }

        [HttpPut]
        public IActionResult Edit(int Id, UserEditDto userEditDto)
        {
            var response = new Response();

            var userToEdit = _context.Users.Find(Id);

            if (userEditDto == null)
            {
                response.AddError("id", "There was a problem deleting the user.");
                return NotFound(response);
            }

            if (userEditDto.FirstName == null || userEditDto.FirstName == "")
            {
                response.AddError("First Name", "First name cannot be empty.");
            }

            if (userEditDto.LastName == null || userEditDto.LastName == "")
            {
                response.AddError("Last Name", "Last name cannot be empty.");
            }

            if (userEditDto.Username == null || userEditDto.Username == "")
            {
                response.AddError("User Name", "User name cannot be empty.");
            }

            if (userEditDto.Password == null || userEditDto.Password == "")
            {
                response.AddError("Password", "Password cannot be empty.");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            userToEdit.FirstName = userEditDto.FirstName;
            userToEdit.LastName = userEditDto.LastName;
            userToEdit.Username = userEditDto.Username;
            userToEdit.Password = userEditDto.Password;

            _context.SaveChanges();

            response.Data = userToEdit;

            return Ok(response);
        }

        [HttpDelete]
        public IActionResult Delete(int Id)
        {
            var response = new Response();

            var user = _context.Users.Find(Id);

            if (user == null)
            {
                response.AddError("id", "There was a problem deleting the user.");
                return NotFound(response);
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            response.Data = true;

            return Ok(response);
        }
    }
}
