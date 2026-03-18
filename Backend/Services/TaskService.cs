using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Services
{
    public class TaskService : ITaskService
    {
        private readonly TaskRepository _repository;
        public TaskService(TaskRepository repository)
        {
            _repository = repository;
        }

        public TaskItem CreateTask(TaskItem task)
        {
            if (string.IsNullOrWhiteSpace(task.Title))
            {
                throw new ArgumentException("Title is required.");
            }

            task.Id = Guid.NewGuid();
            task.Status = Backend.Models.TaskStatus.Pending;
            task.CreatedAt = DateTime.UtcNow;

            List<TaskItem> tasks = _repository.GetAllTasks();
            tasks.Add(task);
            _repository.SaveAllTask(tasks);
            return task;
        }

        public List<TaskItem> GetAllTasks(Models.TaskStatus? status = null)
        {
            List<TaskItem> tasks = _repository.GetAllTasks();
            if (status.HasValue)
            {
                return tasks.Where(task => task.Status == status).ToList();
            }
            return tasks;
        }

        public TaskItem? GetTaskById(Guid id)
        {
            List<TaskItem> tasks = _repository.GetAllTasks();
            return tasks.FirstOrDefault(task => task.Id == id);
        }

        public TaskItem UpdateTask(Guid id, TaskItem updatedTask)
        {
            List<TaskItem> tasks = _repository.GetAllTasks();
            var task = tasks.FirstOrDefault(t => t.Id == id);

            if (task == null)
            {
                throw new KeyNotFoundException("Task not found.");
            }

            if (string.IsNullOrWhiteSpace(updatedTask.Title))
            {
                throw new ArgumentException("Title is required.");
            }

            task.Title = updatedTask.Title.Trim();
            task.Description = updatedTask.Description;
            task.DueDate = updatedTask.DueDate;

            _repository.SaveAllTask(tasks);

            return task;
        }

        public TaskItem CompleteTask(Guid id)
        {
            List<TaskItem> tasks = _repository.GetAllTasks();
            var task = tasks.FirstOrDefault(t => t.Id == id);

            if (task == null)
            {
                throw new KeyNotFoundException("Task not found.");
            }

            if (task.Status == Backend.Models.TaskStatus.Completed)
            {
                throw new InvalidOperationException("Task is already completed.");
            }

            task.Status = Backend.Models.TaskStatus.Completed;
            _repository.SaveAllTask(tasks);

            return task;
        }

        public bool DeleteTask(Guid id)
        {
            List<TaskItem> tasks = _repository.GetAllTasks();
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return false;
            }

            tasks.Remove(task);
            _repository.SaveAllTask(tasks);
            return true;
        }
    }
}