using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearningStarter.Entities
{
    public class AssignmentAnswer
    {
        public int Id { get; set; }
        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }
        public int AssignmentQuestionId { get; set; }
    }

    public class AssignmentAnswerCreateDto
    {
        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }
        public int AssignmentQuestionId { get; set; }
    }

    public class AssignmentAnswerGetDto
    {
        public int Id { get; set; }
        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }
        public int AssignmentQuestionId { get; set; }
    }

    public class AssignmentAnswerEditDto
    {
        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }
    }
}
