using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    [Route("tasks")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public ActionResult<List<TaskItem>> GetAll([FromQuery] Models.TaskStatus? status = null)
        {
            try
            {
                var tasks = _taskService.GetAllTasks(status);
                return Ok(tasks);
            }
            catch (InvalidDataException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public ActionResult<TaskItem> GetTaskByID(Guid id)
        {
            try
            {
                var task = _taskService.GetTaskById(id);
                if (task == null) return NotFound();
                return Ok(task);
            }
            catch (InvalidDataException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult<TaskItem> CreateTask([FromBody] TaskItem task)
        {
            try
            {
                var createdTask = _taskService.CreateTask(task);
                return CreatedAtAction(nameof(GetTaskByID), new { id = createdTask.Id }, createdTask);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidDataException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(Guid id)
        {
            try
            {
                var deleted = _taskService.DeleteTask(id);
                if (!deleted)
                {
                    return NotFound(new { message = "Task not found." });
                }
                return NoContent();
            }
            catch (InvalidDataException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(Guid id, [FromBody] TaskItem task)
        {
            try
            {
                var updatedTask = _taskService.UpdateTask(id, task);
                return Ok(updatedTask);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidDataException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPatch("{id}/complete")]
        public IActionResult CompleteTask(Guid id)
        {
            try
            {
                var completedTask = _taskService.CompleteTask(id);
                return Ok(completedTask);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (InvalidDataException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
    }
}