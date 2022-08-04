using System.Collections;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using LearningStarter.Entities;

namespace LearningStarterServer.Entities
{
    public class User
    {
       
         public int Id { get; set; }
         public string FirstName { get; set; }
         public string LastName { get; set; }
         public string Username { get; set; }
     //  public string Email { get; set; }
         public string Password { get; set; }
       /*  public int PhoneNum { get; set; }
         public string Address1 { get; set; }
         public string Address2 { get; set; }
         public string City { get; set; }
         public int Zipcode { get; set; }*/
         public int? RoleId { get; set; }
         public Role Role { get; set; }
         public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
         public ICollection<Class> Classes { get; set; } = new List<Class>();
    }

    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public int RoleId { get; set; }
        //  public string Email { get; set; }
        /* public int PhoneNum { get; set; }
         public string Address1 { get; set; }
         public string Address2 { get; set; }
         public string City { get; set; }
         public int Zipcode { get; set; }*/
        //  public ICollection<int> ClassroomIds { get; set; }


    }
    public class UserCreateDto
    {
        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public ICollection<int> ClassroomIds { get; set; }
        public ICollection<EnrollmentCreateDto> EnrollmentCreateDtos { get; set; }
        public RoleCreateDto Role { get; set; }

    }
    public class UserDetailDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public int RoleId { get; set; }
        public ICollection<ClassroomGetDto> ClassroomGetDtos { get; set; }


    }
    public class UserEditDto

    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
            /* public string Email { get; set; }
             public string Password { get; set; }
             public int PhoneNum { get; set; }
             public string Address1 { get; set; }
             public string Address2 { get; set; }
             public string City { get; set; }
             public int Zipcode { get; set; }


        }*/
    }
