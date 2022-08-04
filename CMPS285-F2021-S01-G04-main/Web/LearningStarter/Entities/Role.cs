using LearningStarterServer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearningStarter.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
        public ICollection<User> Users { get; set; } = new List<User>();
    }

    public class RoleCreateDto
    {
       
        public string RoleName { get; set; }
        public ICollection<int> UserIds { get; set; }
    }

    public class RoleGetDto
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
    }

    public class RoleEditDto
    {
        public string RoleName { get; set; }
    }
    public class RoleDetailDto
    { 
        public int Id { get; set; }
        public string RoleName { get; set; }
        public ICollection<UserDto> UserDtos { get; set; }
    }
}
