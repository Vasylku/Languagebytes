using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearningStarter.Entities
{
    public class Assignment
    {
        public int Id { get; set; }
        public string AssignmentName { get; set; }
        public DateTimeOffset DueDate { get; set; }
        // Needs reference to classrooms once classrooms table has been created
        // How to make this an array of int ids and not assignmentquestions? Unless that's hard to do at our level
        public List<AssignmentQuestion> AssignmentQuestions { get; set; } = new List<AssignmentQuestion>();
    }

    public class AssignmentCreateDto
    {
        public string AssignmentName { get; set; }
        public DateTimeOffset DueDate { get; set; }
    }

    public class AssignmentGetDto
    {
        public int Id { get; set; }
        public string AssignmentName { get; set; }
        public DateTimeOffset DueDate { get; set; }
    }

    public class AssignmentDetailDto
    {
        public int Id { get; set; }
        public string AssignmentName { get; set; }
        public DateTimeOffset DueDate { get; set; }
        public IEnumerable<AssignmentQuestionDetailDto> AssignmentQuestionDetailDtos { get; set; }
    }

    public class AssignmentEditDto
    {
        public string AssignmentName { get; set; }
        public DateTimeOffset DueDate { get; set; }
    }
}
