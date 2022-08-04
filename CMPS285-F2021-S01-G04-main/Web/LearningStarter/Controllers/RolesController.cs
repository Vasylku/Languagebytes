using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LearningStarter.Common;
using LearningStarter.Entities;
using LearningStarterServer.Data;
using LearningStarterServer.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace LearningStarter.Controllers
{

    [ApiController]
    [Route("api/user-roles")]
    public class RolesController : Controller
    {
        private readonly DataContext _dataContext;
        public RolesController(DataContext dataContext)
        {
            _dataContext = dataContext;


        }

        [HttpGet("get-all-roles")]
        public async Task<IActionResult> GetAllRoles()
        {
            var response = new Response();

            response.Data = await _dataContext.Roles.ToListAsync();
          
            return Ok(response);
        }


        [HttpGet("{Id:int}")]
        public async Task<IActionResult> GetRole([FromRoute] int Id)
        {
            var response = new Response();
           
            var roleToReturn = await _dataContext
                .Roles
                .Select(x => new RoleDetailDto{
                Id = x.Id,
                RoleName = x.RoleName,
                UserDtos = (ICollection<UserDto>)x.Users
                        .Select(y => new UserDto
                         {
                             Id = y.Id,
                             FirstName = y.FirstName,
                             LastName = y.LastName,
                             Username = y.Username,


                         }),
                    })
            
                .FirstOrDefaultAsync(x =>x.Id == Id);

            if (roleToReturn == null)
            {
                return NotFound($"Unable to find Id {Id}");
            }
            if (response.HasErrors)
            {
                return BadRequest(response);
            }
            
            response.Data = roleToReturn;

            return Ok(response);

        }


        [HttpPost("create-role")]

        public IActionResult CreateRole(RoleCreateDto roleCreateDto)
        {
            var response = new Response();

            var userAddToRole = _dataContext
              .Users
              .Where(x => roleCreateDto.UserIds.Contains(x.Id))
              .ToList();
            if (roleCreateDto == null)
            {
                response.AddError("", " Critical error");

            }
            if (roleCreateDto.RoleName?.Length < 0)
            {
                response.AddError("Role Name", " Role name must exist");

            }

            if (string.IsNullOrEmpty(roleCreateDto.RoleName?.Trim()))
            {
                response.AddError("Role Name", "Name must not be empty");

            }


            var a = "admin";
            var s = "student";
            var t = "teacher";

            if (roleCreateDto.RoleName?.ToLower() != a && roleCreateDto.RoleName?.ToLower() != s && roleCreateDto.RoleName?.ToLower() != t)
            {
                response.AddError("Role", "Role must be either Admin, Student or Teacher");

            }

            if (response.HasErrors)
            {
                return BadRequest(response);

            }
            var roleToCreate = new Role
            {
                RoleName = roleCreateDto.RoleName
            };
           
          
                var roleToReturn = new RoleGetDto
                {
                    Id = roleToCreate.Id,

                    RoleName = roleToCreate.RoleName.ToLower(),

                };

                response.Data = roleToReturn;

                return Ok(response);
            }
        

        [HttpPut("{Id:int}")]
        public async Task<IActionResult> UpdateRole([FromRoute] int Id, [FromBody] RoleEditDto roleEditDto)
        {
            var response = new Response();

            var roleToEdit = await _dataContext.Roles.FirstOrDefaultAsync(x => x.Id == Id);

            if (roleToEdit == null)
            {
                response.AddError("roleId", $" {Id} not found in the database");

            }

            if (string.IsNullOrEmpty(roleToEdit.RoleName?.Trim()))
            {
                response.AddError("Role Name", "Name must not be empty");

            }
            
            if (roleToEdit.RoleName?.Length < 0)
            {
                response.AddError("Role Name", " Role name must exist");

            }
            var a = "admin";
            var s = "student";
            var t = "teacher";

            if (roleEditDto.RoleName?.ToLower() != a && roleEditDto.RoleName?.ToLower() != s && roleEditDto.RoleName?.ToLower() != t)
            {
                response.AddError("Role", "Role must be either Admin, Student or Teacher");

            }

            if (response.HasErrors)
            {
                return BadRequest(response);

            }

            roleToEdit.RoleName = roleEditDto.RoleName.ToLower();

            _dataContext.SaveChanges();

            var roleToReturn = new RoleGetDto
            {
                Id = roleToEdit.Id,
                RoleName = roleToEdit.RoleName
            };


            response.Data = roleToReturn;

            return Ok(response);
        }

        [HttpDelete("{Id:int}")]
        public IActionResult DeleteRole([FromRoute] int Id)
        {
            var response = new Response();

            var roleToDelete = _dataContext.Roles.FirstOrDefault(x => x.Id == Id);

            if (roleToDelete == null)
            {
                response.AddError("Role Id", $"No role found with the id  {Id}");

            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            _dataContext.Roles.Remove(roleToDelete);
            _dataContext.SaveChanges();

            return Ok(response);
        }

    }

}

