using LearningStarter.Common;
using LearningStarter.Entities;
using LearningStarterServer.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/assignmentquestions")]
    public class AssignmentQuestionsController : Controller
    {
        private readonly DataContext _dataContext;
        public AssignmentQuestionsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost("create")]
        public IActionResult CreateAssignmentQuestion([FromBody] AssignmentQuestionCreateDto assignmentQuestionCreateDto)
        {
            var response = new Response();

            var assignmentId = assignmentQuestionCreateDto.AssignmentId;

            // Foreign key thing
            var AssignmentToAddAssignmentQuestionInto = _dataContext.Assignments.FirstOrDefault(x => x.Id == assignmentId);

            if(assignmentQuestionCreateDto == null)
            {
                response.AddError("", "Critical error. Please contact admin.");
                return BadRequest(response);
            }

            if(AssignmentToAddAssignmentQuestionInto == null)
            {
                response.AddError("Id", $"Could not find assignment of Id {assignmentId} to add question to.");
                return BadRequest(response);
            }


            if (assignmentQuestionCreateDto.QuestionText?.Length > 0)
            {
                assignmentQuestionCreateDto.QuestionText = assignmentQuestionCreateDto.QuestionText.Trim(' ');
            }

            if (string.IsNullOrEmpty(assignmentQuestionCreateDto.QuestionText))
            {
                response.AddError("QuestionText", "QuestionText cannot be empty.");
            }

            if(assignmentQuestionCreateDto.QuestionText != null && assignmentQuestionCreateDto.QuestionText.Length > 400)
            {
                response.AddError("QuesetionText", "QuestionText too long. Must be less than or equal to 400 characters.");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            

            var assignmentQuestionToCreate = new AssignmentQuestion
            {
                QuestionText = assignmentQuestionCreateDto.QuestionText,
                AssignmentId = AssignmentToAddAssignmentQuestionInto.Id
            };

            // Is this safe security-wise? Hydrating with an entity rather than dto?
            AssignmentToAddAssignmentQuestionInto.AssignmentQuestions.Add(assignmentQuestionToCreate);

            _dataContext.AssignmentQuestions.Add(assignmentQuestionToCreate);
            _dataContext.SaveChanges();

            var assignmentQuestionToReturn = new AssignmentQuestionGetDto
            {
                Id = assignmentQuestionToCreate.Id,
                QuestionText = assignmentQuestionToCreate.QuestionText,
                AssignmentId = assignmentQuestionToCreate.AssignmentId
            };

            response.Data = assignmentQuestionToReturn;

            return Ok(response);
        }

        [HttpGet("{assignmentquestionId:int}")]
        public IActionResult GetAssignmentQuestion([FromRoute] int assignmentquestionId)
        {
            var response = new Response();

            var assignmentquestion = _dataContext.AssignmentQuestions.FirstOrDefault(x => x.Id == assignmentquestionId);

            if (assignmentquestion == null)
            {
                response.AddError("Id", "This assignmentquestion could not be found.");
                return NotFound(response);
            }

            var assignmentQuestionToReturn = new AssignmentQuestionGetDto
            {
                Id = assignmentquestion.Id,
                QuestionText = assignmentquestion.QuestionText,
                AssignmentId = assignmentquestion.AssignmentId
            };

            response.Data = assignmentQuestionToReturn;

            return Ok(response);
        }


        [HttpGet("get-all")]
        public IActionResult GetAssignmentQuestionByAssignment(int assignmentId)
        {
            var response = new Response();

            var assignmentWithQuestions = _dataContext.Assignments.FirstOrDefault(x => x.Id == assignmentId);

            if(assignmentWithQuestions == null)
            {
                response.AddError("id", $"Assignment with Id {assignmentId} could not be found.");
                return NotFound(response);
            }

            List<AssignmentQuestionDetailDto> questionList = new List<AssignmentQuestionDetailDto>();

            foreach (var AssignmentQuestion in assignmentWithQuestions.AssignmentQuestions)
            {
                var questionToReturn = new AssignmentQuestionDetailDto
                {
                    Id = AssignmentQuestion.Id,
                    QuestionText = AssignmentQuestion.QuestionText,
                    AssignmentId = AssignmentQuestion.AssignmentId,
                    // Assignments list?
                };

                questionList.Add(questionToReturn);
            }

            response.Data = questionList;

            return Ok(response);
        }

        [HttpGet("detail")]
        public IActionResult AssignmentQuestionDetail(int assignmentQuestionId)
        {
            var response = new Response();

            var assignmentQuestion = _dataContext.AssignmentQuestions
                .Include(x => x.AssignmentAnswers)
                .Select(x => new AssignmentQuestionDetailDto
                {
                    Id = x.Id,
                    QuestionText = x.QuestionText,
                    AssignmentId = x.AssignmentId,
                    AssignmentAnswerGetDtos = x.AssignmentAnswers
                        .Select(y => new AssignmentAnswerGetDto
                        {
                            Id = y.Id,
                            AnswerText = y.AnswerText,
                            IsCorrect = y.IsCorrect,
                            AssignmentQuestionId = y.AssignmentQuestionId
                        })
                })
                .FirstOrDefault(x => x.Id == assignmentQuestionId);

            if(assignmentQuestion == null)
            {
                response.AddError("Id", $"Could not find assignment question of Id {assignmentQuestionId}.");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            response.Data = assignmentQuestion;

            return Ok(response);
        }

        [HttpPut("{assignmentquestionId:int}")]
        public IActionResult AssignmentQuestionEdit([FromRoute] int assignmentquestionId, AssignmentQuestionEditDto assignmentQuestionEditDto)
        {
            var response = new Response();

            var assignmentquestionToEdit = _dataContext.AssignmentQuestions.FirstOrDefault(x => x.Id == assignmentquestionId);

            if (assignmentquestionToEdit == null)
            {
                response.AddError("Id", "The assignmentquestion could not be found.");
                return NotFound(response);
            }

            if (assignmentQuestionEditDto == null)
            {
                response.AddError("Id", "There was a problem editing this assignmentquestion.");
                return NotFound(response);
            }

            if (assignmentQuestionEditDto.QuestionText?.Length > 0)
            {
                assignmentQuestionEditDto.QuestionText = assignmentQuestionEditDto.QuestionText.Trim(' ');
            }

            if (string.IsNullOrEmpty(assignmentQuestionEditDto.QuestionText))
            {
                response.AddError("QuestionText", "QuestionText cannot be empty.");
            }

            if (assignmentQuestionEditDto.QuestionText != null && assignmentQuestionEditDto.QuestionText.Length > 400)
            {
                response.AddError("QuesetionText", "QuestionText too long. Must be less than or equal to 400 characters.");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            assignmentquestionToEdit.QuestionText = assignmentQuestionEditDto.QuestionText;

            _dataContext.SaveChanges();

            var assignmentQuestionToReturn = new AssignmentQuestionGetDto
            {
                Id = assignmentquestionToEdit.Id,
                QuestionText = assignmentquestionToEdit.QuestionText,
                AssignmentId = assignmentquestionToEdit.AssignmentId
            };

            response.Data = assignmentQuestionToReturn;

            return Ok(response);
        }

        [HttpDelete("{assignmentquestionId:int}")]
        public IActionResult DeleteAssignmentQuestion([FromRoute] int assignmentquestionId)
        {
            var response = new Response();

            var assignmentquestion = _dataContext.AssignmentQuestions.FirstOrDefault(x => x.Id == assignmentquestionId);

            if (assignmentquestion == null)
            {
                response.AddError("Id", "There was a problem deleting this assignmentquestion.");
                return NotFound(response);
            }

            _dataContext.AssignmentQuestions.Remove(assignmentquestion);
            _dataContext.SaveChanges();

            response.Data = true;

            return Ok(response);
        }
    }
}
