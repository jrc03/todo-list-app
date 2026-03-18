import TaskCard from "./TaskCard";

export default function TaskList({ tasks, loading, error, onDelete, onEdit, onComplete }) {
  if (loading)
    return <p className="py-6 text-center text-surface-300">Loading tasks...</p>;
  if (error)
    return <p className="py-6 text-center text-danger-500">Error: {error}</p>;
  if (tasks.length === 0)
    return (
      <p className="py-8 text-center italic text-surface-300">
        No tasks found. Create one!
      </p>
    );

  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          onDelete={onDelete}
          onEdit={onEdit}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}
