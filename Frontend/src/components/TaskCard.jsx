function formatDate(value) {
  if (!value) return "N/A";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "N/A";
  return d.toLocaleString();
}

export default function TaskCard({ task, onDelete, onComplete }) {
  const isCompleted = task.status === 1;

  return (
    <div className="p-5 border rounded-lg shadow-sm bg-gray-50 flex justify-between items-start transition-all hover:shadow-md">
      <div className="flex flex-col gap-2">
        <h2
          className={`text-lg font-bold ${isCompleted ? "line-through text-gray-400" : "text-gray-900"}`}
        >
          {task.title}
        </h2>

        {task.description && <p className="text-sm text-gray-600">{task.description}</p>}

        <div className="text-xs text-gray-500">
          <p>Created: {formatDate(task.createdAt)}</p>
          <p>Due: {formatDate(task.dueDate)}</p>
        </div>

        <span
          className={`text-xs px-2 py-1 rounded w-max mt-1 font-medium ${
            isCompleted ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onComplete(task.id)}
          disabled={isCompleted}
          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}