using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using LearningStarterServer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace LearningStarter.Entities
{
    public class Classroom
    {
        
        public int Id { get; set; }
        public string Name { get; set; }
        public int EslLevelId { get; set; }
        public int TeacherId { get; set; }
        public string Semester { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
   
    }
    public class ClassroomCreateDto
    {
        
        public string Name { get; set; }
        public int EslLevelId { get; set; }
        public int TeacherId { get; set; }
        public string Semester { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public ICollection<int?> UserIds { get; set; }
    }
    public class ClassroomGetDto
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public int EslLevelId { get; set; }
        public int TeacherId { get; set; }
        public string Semester { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
      //  public ICollection<int> UserIds { get; set; }
    }
    public class ClassroomEditDto
    {
        public string Name { get; set; }
        public int EslLevelId { get; set; }
        public int TeacherId { get; set; }
        public string Semester { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
    }
      
    public class ClassroomDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int EslLevelId { get; set; }
        public int TeacherId { get; set; }
        public string Semester { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public ICollection<UserDto> UserDtos { get; set; }
    }

}
