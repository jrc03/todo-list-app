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
            var tasks = _taskService.GetAllTasks(status);
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public ActionResult<TaskItem> GetTaskByID(Guid id)
        {
            var task = _taskService.GetTaskById(id);
            if (task == null) return NotFound();
            return Ok(task);
        }

        [HttpPost]
        public ActionResult<TaskItem> CreateTask([FromBody] TaskItem task)
        {
            var createdTask = _taskService.CreateTask(task);
            return Ok(createdTask);
        }

        [HttpDelete("{id}")]
        public ActionResult<TaskItem> DeleteTask(Guid id)
        {
            _taskService.DeleteTask(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public ActionResult<TaskItem> UpdateTask(Guid id, [FromBody] TaskItem task)
        {
            try
            {

                var updatedTask = _taskService.UpdateTask(id, task);
                return Ok(updatedTask);
            }
            catch (Exception)
            {

                return NotFound();
            }
        }
    }
}