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
            try
            {
                task.Id = Guid.NewGuid();
                task.Status = 0;
                task.CreatedAt = DateTime.Now;

                List<TaskItem> tasks = _repository.GetAllTasks();

                tasks.Add(task);
                _repository.SaveAllTask(tasks);
                return task;
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
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
        public TaskItem GetTaskById(Guid id)
        {
            List<TaskItem> tasks = _repository.GetAllTasks();
            try
            {
                return tasks.FirstOrDefault(task => task.Id == id)!;
            }
            catch (Exception e)
            {
                throw new Exception("Error: " + e);
            }



        }

        public TaskItem UpdateTask(Guid id, TaskItem updatedTask)
        {
            List<TaskItem> tasks = _repository.GetAllTasks();
            try
            {
                var task = tasks.FirstOrDefault(t => t.Id == id);

                if (task == null) throw new Exception("Task not found");

                task.Title = updatedTask.Title;
                task.Description = updatedTask.Description;
                task.DueDate = updatedTask.DueDate;
                task.Status = updatedTask.Status;

                _repository.SaveAllTask(tasks);

                return task;
            }
            catch (Exception e)
            {
                throw new Exception("Error: " + e);
            }
        }
        public void DeleteTask(Guid id)
        {
            List<TaskItem> tasks = _repository.GetAllTasks();
            try
            {
                var task = tasks.FirstOrDefault(t => t.Id == id);
                if (task == null) throw new Exception("Task not found");

                tasks.Remove(task);
                _repository.SaveAllTask(tasks);
            }
            catch (Exception e)
            {
                throw new Exception("Error: " + e);
            }
        }
    }
}