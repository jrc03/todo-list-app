import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";
import "./App.css";
import { useEffect, useState } from "react";


function App() {
  const [statusFilter, setStatusFilter] = useState("");

  const { tasks, loading, error, loadTasks, addTask, removeTask, completeTask } =
    useTasks();

  useEffect(() => {
    loadTasks(statusFilter || null);
  }, [loadTasks, statusFilter]);

  return (
    <>
      <div className="min-h-screen bg-neutral-100 font-sans p-6 text-neutral-900 flex justify-center">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden p-8 border border-neutral-200">
          <Header />
          <TaskForm onAdd={addTask} />
          <FilterBar value={statusFilter} onChange={setStatusFilter} />

          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onDelete={removeTask}
            onComplete={completeTask}
          />
        </div>
      </div>
    </>
  );
}

export default App;
