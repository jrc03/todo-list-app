using System.Text.Json;
using Backend.Models;

namespace Backend.Repositories
{
    public class TaskRepository
    {
        private readonly string _filePath = "task.json";
        public List<TaskItem> GetAllTasks()
        {
            if (!File.Exists(_filePath))
            {
                return new List<TaskItem>();
            }
            string json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<TaskItem>>(json) ?? new List<TaskItem>();
        }

        public void SaveAllTask(List<TaskItem> tasks)
        {
            var options = new JsonSerializerOptions { WriteIndented = true };
            string json = JsonSerializer.Serialize(tasks, options);

            File.WriteAllText(_filePath, json);
        }
    }
}