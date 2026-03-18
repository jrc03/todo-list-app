import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [statusFilter, setStatusFilter] = useState("");
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  const {
    tasks,
    loading,
    error,
    loadTasks,
    addTask,
    removeTask,
    editTask,
    completeTask,
  } = useTasks();

  useEffect(() => {
    loadTasks(statusFilter || null);
  }, [loadTasks, statusFilter]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 1).length;
  const pendingTasks = totalTasks - completedTasks;

  const handleAddFromMobile = async (taskData) => {
    await addTask(taskData);
    setIsMobileFormOpen(false);
  };

  const toDateTimeLocal = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const offsetMs = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
  };

  const openEditModal = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title ?? "");
    setEditDescription(task.description ?? "");
    setEditDueDate(toDateTimeLocal(task.dueDate));
    setIsEditOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingTaskId || !editTitle.trim()) return;

    await editTask(editingTaskId, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      dueDate: editDueDate ? new Date(editDueDate).toISOString() : null,
    });

    setIsEditOpen(false);
    setEditingTaskId(null);
  };

  return (
    <main className="flex h-dvh w-screen flex-col bg-surface-950 p-3 text-surface-100 sm:p-4">
      <Header
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

      <FilterBar value={statusFilter} onChange={setStatusFilter} />

      <section className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1 pb-20 sm:pb-0">
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onDelete={removeTask}
          onEdit={openEditModal}
          onComplete={completeTask}
        />
      </section>

      <section className="sticky bottom-0 mt-5 hidden rounded-2xl border border-surface-700 bg-surface-900 p-4 shadow-lg sm:block sm:p-5">
        <TaskForm onAdd={addTask} />
      </section>

      <button
        type="button"
        onClick={() => setIsMobileFormOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-3xl leading-none text-surface-100 shadow-xl transition hover:bg-brand-400 sm:hidden"
        aria-label="Add task"
      >
        +
      </button>

      {isMobileFormOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/60 sm:hidden" onClick={() => setIsMobileFormOpen(false)}>
          <div
            className="w-full rounded-t-3xl border border-surface-600 bg-surface-900 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-surface-100">Add Task</h2>
              <button
                type="button"
                onClick={() => setIsMobileFormOpen(false)}
                className="rounded-md px-2 py-1 text-surface-300 hover:bg-surface-800 hover:text-surface-100"
              >
                Close
              </button>
            </div>
            <TaskForm onAdd={handleAddFromMobile} />
          </div>
        </div>
      )}

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center" onClick={() => setIsEditOpen(false)}>
          <div
            className="w-full max-w-lg rounded-t-3xl border border-surface-600 bg-surface-900 p-5 sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-surface-100">Edit Task</h2>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="rounded-md px-2 py-1 text-surface-300 hover:bg-surface-800 hover:text-surface-100"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-surface-300">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  className="w-full rounded-xl border border-surface-600 bg-surface-800 px-3 py-3 text-surface-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/35"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-surface-300">
                  Description
                </label>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full rounded-xl border border-surface-600 bg-surface-800 px-3 py-3 text-surface-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/35"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-surface-300">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="w-full rounded-xl border border-surface-600 bg-surface-800 px-3 py-3 text-surface-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/35"
                />
              </div>

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-brand-500 px-6 text-sm font-bold uppercase tracking-wide text-surface-100 transition hover:bg-brand-400"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
