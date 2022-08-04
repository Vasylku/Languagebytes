using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearningStarter.Entities
{
    public class AssignmentQuestion
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public Assignment Assignment { get; set; }
        public List<AssignmentAnswer> AssignmentAnswers { get; set; } = new List<AssignmentAnswer>();
        public int AssignmentId { get; set; }
    }

    public class AssignmentQuestionCreateDto
    {
        public string QuestionText { get; set; }
        public int AssignmentId { get; set; }
    }

    public class AssignmentQuestionGetDto
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public int AssignmentId { get; set; }
    }

    public class AssignmentQuestionDetailDto
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public int AssignmentId { get; set; }
        public IEnumerable<AssignmentAnswerGetDto> AssignmentAnswerGetDtos { get; set; }

    }

    public class AssignmentQuestionEditDto
    {
        public string QuestionText { get; set; }
    }
}
