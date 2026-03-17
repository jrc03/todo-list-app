import TaskCard from "./TaskCard";

export default function TaskList({ tasks, loading, error, onDelete, onComplete }) {
  if (loading)
    return <p className="text-gray-500 text-center py-4">Loading tasks...</p>;
  if (error)
    return <p className="text-red-500 text-center py-4">Error: {error}</p>;
  if (tasks.length === 0)
    return (
      <p className="text-gray-500 text-center italic py-4">
        No tasks found. Create one!
      </p>
    );

  return (
    <div className="space-y-4">
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onDelete={onDelete} onComplete={onComplete} />
      ))}
    </div>
  );
}
