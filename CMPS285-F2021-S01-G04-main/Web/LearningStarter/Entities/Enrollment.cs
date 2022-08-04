using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LearningStarterServer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities
{
    public class Enrollment

    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ClassroomId { get; set; }
        public Classroom Classroom { get; set; }

         
    }
    public class EnrollmentCreateDto
    {
        public int UserId { get; set; }
        public int ClassroomId { get; set; }
   

    }
    public class EnrollmentGetDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ClassroomId { get; set; }
    }
}
