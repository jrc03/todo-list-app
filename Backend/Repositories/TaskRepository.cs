using System.Text.Json;
using Backend.Models;

namespace Backend.Repositories
{
    public class TaskRepository
    {
        private readonly string _filePath = "tasks.json";
        private readonly string _legacyFilePath = "task.json";

        private void EnsureFileExists()
        {
            if (File.Exists(_filePath)) return;
            if (File.Exists(_legacyFilePath))
            {
                File.Copy(_legacyFilePath, _filePath, overwrite: true);
                return;
            }
            File.WriteAllText(_filePath, "[]");
        }

        public List<TaskItem> GetAllTasks()
        {
            EnsureFileExists();

            try
            {
                string json = File.ReadAllText(_filePath);
                return JsonSerializer.Deserialize<List<TaskItem>>(json) ?? new List<TaskItem>();
            }
            catch (JsonException)
            {
                throw new InvalidDataException("The tasks.json file is corrupted.");
            }

        }

        public void SaveAllTask(List<TaskItem> tasks)
        {
            EnsureFileExists();
            var options = new JsonSerializerOptions { WriteIndented = true };
            string json = JsonSerializer.Serialize(tasks, options);

            File.WriteAllText(_filePath, json);
        }
    }
}