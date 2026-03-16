# Todo List App

A lightweight task management system built with a C# .NET REST API and a React frontend. To keep the architecture simple and cost-effective, this project uses a local JSON file (`tasks.json`) for data persistence instead of a traditional database.

##  Tech Stack

* **Backend:** C# .NET 10 Web API
* **Frontend:** React (Vite) + Tailwind CSS
* **Storage:** File-based JSON persistence (`tasks.json`)

## Features

* Create new tasks with a title and description.
* View all tasks or filter them by status (Pending/Completed).
* Edit existing tasks.
* Mark tasks as completed.
* Delete tasks.
* Handles corrupt JSON files safely.

##  How to Run

### 1. Start the Backend (API)
Navigate to the Backend folder and run the .NET application:
```bash
cd Backend
dotnet run