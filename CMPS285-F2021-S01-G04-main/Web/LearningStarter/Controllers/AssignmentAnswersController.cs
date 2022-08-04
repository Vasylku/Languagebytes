using LearningStarter.Common;
using LearningStarter.Entities;
using LearningStarterServer.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/assignmentanswers")]
    public class AssignmentAnswersController : Controller
    {
        private readonly DataContext _dataContext;
        public AssignmentAnswersController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost("create")]
        public IActionResult CreateAssignmentAnswer([FromBody] AssignmentAnswerCreateDto assignmentAnswerCreateDto)
        {
            var response = new Response();

            var assignmentQuestionId = assignmentAnswerCreateDto.AssignmentQuestionId;

            // Foreign key
            var assignmentQuestionToAddAnswerTo = _dataContext.AssignmentQuestions.FirstOrDefault(x => x.Id == assignmentQuestionId);


            if(assignmentQuestionToAddAnswerTo == null)
            {
                response.AddError("Id", $"Could not find assignment question of Id {assignmentQuestionId} to add answer to.");
                return BadRequest(response);
            }

            if(assignmentAnswerCreateDto == null)
            {
                response.AddError("", "Critical error. Please contact admin.");
                return BadRequest(response);
            }


            if (assignmentAnswerCreateDto.AnswerText?.Length > 0)
            {
                assignmentAnswerCreateDto.AnswerText = assignmentAnswerCreateDto.AnswerText.Trim(' ');
            }

            if (string.IsNullOrEmpty(assignmentAnswerCreateDto.AnswerText))
            {
                response.AddError("AnswerText", "AnswerText cannot be empty.");
            }

            if(assignmentAnswerCreateDto.AnswerText != null && assignmentAnswerCreateDto.AnswerText.Length > 200)
            {
                response.AddError("AnswerText", "AnswerText too long. Must be less than or equal to 200 characters.");
            }

            if(assignmentAnswerCreateDto.IsCorrect == null)
            {
                response.AddError("IsCorrect", "IsCorrect cannot be empty.");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }


            var assignmentAnswerToCreate = new AssignmentAnswer
            {
                AnswerText = assignmentAnswerCreateDto.AnswerText,
                IsCorrect = assignmentAnswerCreateDto.IsCorrect,
                AssignmentQuestionId = assignmentQuestionId
            };

            assignmentQuestionToAddAnswerTo.AssignmentAnswers.Add(assignmentAnswerToCreate);

            _dataContext.AssignmentAnswers.Add(assignmentAnswerToCreate);
            _dataContext.SaveChanges();

            var assignmentAnswerToReturn = new AssignmentAnswerGetDto
            {
                Id = assignmentAnswerToCreate.Id,
                AnswerText = assignmentAnswerToCreate.AnswerText,
                IsCorrect = assignmentAnswerToCreate.IsCorrect,
                AssignmentQuestionId = assignmentAnswerToCreate.AssignmentQuestionId
            };

            response.Data = assignmentAnswerToReturn;

            return Ok(response);
        }

        [HttpGet("{assignmentanswerId:int}")]
        public IActionResult GetAssignmentAnswer([FromRoute] int assignmentanswerId)
        {
            var response = new Response();

            var assignmentanswer = _dataContext.AssignmentAnswers.FirstOrDefault(x => x.Id == assignmentanswerId);


            if (assignmentanswer == null)
            {
                response.AddError("Id", "This assignmentanswer could not be found.");
                return NotFound(response);
            }

            var assignmentAnswerToReturn = new AssignmentAnswerGetDto
            {
                Id = assignmentanswer.Id,
                AnswerText = assignmentanswer.AnswerText,
                IsCorrect = assignmentanswer.IsCorrect,
                AssignmentQuestionId = assignmentanswer.AssignmentQuestionId
            };

            response.Data = assignmentAnswerToReturn;

            return Ok(response);
        }

        [HttpPut("{assignmentanswerId:int}")]
        public IActionResult AssignmentAnswerEdit([FromRoute] int assignmentanswerId, AssignmentAnswerEditDto assignmentAnswerEditDto)
        {
            var response = new Response();

            var assignmentanswerToEdit = _dataContext.AssignmentAnswers.FirstOrDefault(x => x.Id == assignmentanswerId);

            if (assignmentanswerToEdit == null)
            {
                response.AddError("Id", "This assignmentanswer could not be found.");
                return NotFound(response);
            }

            if (assignmentAnswerEditDto == null)
            {
                response.AddError("Id", "There was a problem editing this assignmentanswer.");
                return NotFound(response);
            }

            if (assignmentAnswerEditDto.AnswerText?.Length > 0)
            {
                assignmentAnswerEditDto.AnswerText = assignmentAnswerEditDto.AnswerText.Trim(' ');
            }

            if (string.IsNullOrEmpty(assignmentAnswerEditDto.AnswerText))
            {
                response.AddError("AnswerText", "AnswerText cannot be empty.");
            }

            if (assignmentAnswerEditDto.AnswerText != null && assignmentAnswerEditDto.AnswerText.Length > 200)
            {
                response.AddError("AnswerText", "AnswerText too long. Must be less than or equal to 200 characters.");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            assignmentanswerToEdit.AnswerText = assignmentAnswerEditDto.AnswerText;
            assignmentanswerToEdit.IsCorrect = assignmentAnswerEditDto.IsCorrect;

            _dataContext.SaveChanges();

            var assignmentAnswerToReturn = new AssignmentAnswerGetDto
            {
                Id = assignmentanswerToEdit.Id,
                AnswerText = assignmentAnswerEditDto.AnswerText,
                IsCorrect = assignmentAnswerEditDto.IsCorrect
            };

            response.Data = assignmentAnswerToReturn;

            return Ok(response);
        }

        [HttpDelete("{assignmentanswerId:int}")]
        public IActionResult DeleteAssignmentAnswer([FromRoute] int assignmentanswerId)
        {
            var response = new Response();

            var assignmentanswer = _dataContext.AssignmentAnswers.FirstOrDefault(x => x.Id == assignmentanswerId);

            if(assignmentanswer == null)
            {
                response.AddError("Id", "There was a problem deleting this assignmentanswer.");
                return NotFound(response);
            }

            _dataContext.AssignmentAnswers.Remove(assignmentanswer);
            _dataContext.SaveChanges();

            response.Data = true;

            return Ok(response);
        }
    }
}
