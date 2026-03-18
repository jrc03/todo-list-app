using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services
{
    public interface ITaskService
    {
        TaskItem CreateTask(TaskItem task);
        List<TaskItem> GetAllTasks(Models.TaskStatus? status = null);
        TaskItem? GetTaskById(Guid id);
        TaskItem UpdateTask(Guid id, TaskItem updatedTask);
        TaskItem CompleteTask(Guid id);
        bool DeleteTask(Guid id);

    }
}