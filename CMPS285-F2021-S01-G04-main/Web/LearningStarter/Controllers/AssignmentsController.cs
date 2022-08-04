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
    [Route("api/assignments")]
    public class AssignmentsController : Controller
    {
        private readonly DataContext _dataContext;
        public AssignmentsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost("create")]
        public IActionResult CreateAssignment([FromBody] AssignmentCreateDto assignmentCreateDto)
        {
            var response = new Response();


            if(assignmentCreateDto == null)
            {
                response.AddError("", "Critical error. Please contact an admin.");
                return BadRequest(response);
            }

            if (assignmentCreateDto.AssignmentName?.Length > 0)
            {
                assignmentCreateDto.AssignmentName = assignmentCreateDto.AssignmentName.Trim(' ');
            }

            if (string.IsNullOrEmpty(assignmentCreateDto.AssignmentName))
            {
                response.AddError("AssignmentName", "AssignmentName cannot be empty.");
            }

            if(assignmentCreateDto.AssignmentName != null && assignmentCreateDto.AssignmentName.Length > 40)
            {
                response.AddError("AssignmentName", "Assignment name too long. Must be less than or equal to 40 characters.");
            }

            // At this point, figure out how to determine if the assignment name already exists in the classroom.
            // If the name already does exist, the teacher cannot post the assignment until the name is unique.
            // Make it so due dates cannot be in the past

            if(assignmentCreateDto.DueDate == null)
            {
                response.AddError("DueDate", "DueDate cannot be empty.");
            }

            if(assignmentCreateDto.DueDate < DateTimeOffset.Now)
            {
                response.AddError("DueDate", "DueDate cannot be in the past.");
            }


            if (response.HasErrors)
            {
                return BadRequest(response);
            }



            var assignmentToCreate = new Assignment
            {
                AssignmentName = assignmentCreateDto.AssignmentName,
                DueDate = assignmentCreateDto.DueDate
            };


            _dataContext.Assignments.Add(assignmentToCreate);
            _dataContext.SaveChanges();

            var assignmentToReturn = new AssignmentGetDto
            {
                Id = assignmentToCreate.Id,
                AssignmentName = assignmentToCreate.AssignmentName,
                DueDate = assignmentToCreate.DueDate
            };

            response.Data = assignmentToReturn;

            return Ok(response);
        }


        [HttpGet("{assignmentId:int}")]
        public IActionResult GetAssignment([FromRoute] int assignmentId)
        {
            var response = new Response();

            var assignment = _dataContext.Assignments.FirstOrDefault(x => x.Id == assignmentId);

            if (assignment == null)
            {
                response.AddError("Id", "This assignment could not be found.");
                return NotFound(response);
            }

            var AssignmentToReturn = new AssignmentGetDto
            {
                Id = assignment.Id,
                AssignmentName = assignment.AssignmentName,
                DueDate = assignment.DueDate
            };

            response.Data = AssignmentToReturn;

            return Ok(response);
        }


        [HttpGet("detail")]
        public IActionResult AssignmentGetDetail(int assignmentId)
        {
            var response = new Response();

            var assignment = _dataContext
                .Assignments
                .Include(x => x.AssignmentQuestions)
                .ThenInclude(x => x.AssignmentAnswers)
                .Select(x => new AssignmentDetailDto { 
                    Id = x.Id,
                    AssignmentName = x.AssignmentName,
                    DueDate = x.DueDate,
                    AssignmentQuestionDetailDtos = x.AssignmentQuestions
                        .Select(y => new AssignmentQuestionDetailDto
                        {
                            Id = y.Id,
                            QuestionText = y.QuestionText,
                            AssignmentId = y.AssignmentId,
                            AssignmentAnswerGetDtos = y.AssignmentAnswers
                                .Select(z => new AssignmentAnswerGetDto
                                { 
                                    Id = z.Id,
                                    AnswerText = z.AnswerText,
                                    IsCorrect = z.IsCorrect,
                                    AssignmentQuestionId = z.AssignmentQuestionId
                                })
                        }),
                })
                .FirstOrDefault(x => x.Id == assignmentId);

            if(assignment == null)
            {
                response.AddError("Id", $"Assignment of Id {assignmentId} could not be found.");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            response.Data = assignment;

            return Ok(response);
        }


        [HttpPut("{assignmentId:int}")]
        public IActionResult AssignmentEdit([FromRoute] int assignmentId, AssignmentEditDto assignmentEditDto)
        {
            var response = new Response();

            var assignmentToEdit = _dataContext.Assignments.FirstOrDefault(x => x.Id == assignmentId);

            if (assignmentToEdit == null)
            {
                response.AddError("Id", "This assignment could not be found.");
                return NotFound(response);
            }

            if (assignmentEditDto == null)
            {
                response.AddError("Id", "There was a problem editing this assignment.");
                return NotFound(response);
            }

            if (assignmentEditDto.AssignmentName?.Length > 0)
            {
                assignmentEditDto.AssignmentName = assignmentEditDto.AssignmentName.Trim(' ');
            }

            if (string.IsNullOrEmpty(assignmentEditDto.AssignmentName))
            {
                response.AddError("Id", "AssignmentName cannot be empty.");
            }

            if (assignmentEditDto.AssignmentName != null && assignmentEditDto.AssignmentName.Length > 40)
            {
                response.AddError("AssignmentName", "Assignment name too long. Must be less than or equal to 40 characters.");
            }

            if (assignmentEditDto.DueDate == null)
            {
                response.AddError("DueDate", "DueDate cannot be empty.");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            assignmentToEdit.AssignmentName = assignmentEditDto.AssignmentName;
            assignmentToEdit.DueDate = assignmentEditDto.DueDate;

            _dataContext.SaveChanges();

            var AssignmentToReturn = new AssignmentGetDto
            {
                Id = assignmentToEdit.Id,
                AssignmentName = assignmentToEdit.AssignmentName,
                DueDate = assignmentToEdit.DueDate
            };

            response.Data = AssignmentToReturn;

            return Ok(response);
        }

        [HttpDelete("{assignmentId:int}")]
        public IActionResult DeleteAssignment([FromRoute] int assignmentId)
        {
            var response = new Response();

            var assignment = _dataContext.Assignments.FirstOrDefault(x => x.Id == assignmentId);

            if (assignment == null)
            {
                response.AddError("Id", "There was a problem deleting the assignment.");
                return NotFound(response);
            }

            _dataContext.Assignments.Remove(assignment);
            _dataContext.SaveChanges();

            response.Data = true;

            return Ok(response);
        }
    }
}