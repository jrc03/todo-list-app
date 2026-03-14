using System.Text.Json;
using Backend.Models;

namespace Backend.Repositories
{
    public class TaskRepository
    {
        private readonly string _filePath = "task.json";
        public List<TaskItem> GetAllTasks()
        {
            if (!File.Exists(_filePath)) return new List<TaskItem>();

            try
            {
                string json = File.ReadAllText(_filePath);
                return JsonSerializer.Deserialize<List<TaskItem>>(json) ?? new List<TaskItem>();
            }
            catch (JsonException error)
            {
                throw new JsonException("Error loading json", error);
            }

        }

        public void SaveAllTask(List<TaskItem> tasks)
        {
            var options = new JsonSerializerOptions { WriteIndented = true };
            string json = JsonSerializer.Serialize(tasks, options);

            File.WriteAllText(_filePath, json);
        }
    }
}