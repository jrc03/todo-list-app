function formatDate(value) {
  if (!value) return "N/A";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "N/A";
  return d.toLocaleString();
}

export default function TaskCard({ task, onDelete, onEdit, onComplete }) {
  const isCompleted = task.status === 1;

  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-surface-700 bg-surface-900 p-5 transition-colors hover:border-surface-600">
      <div className="flex flex-col gap-2">
        <h2
          className={`text-lg font-bold ${isCompleted ? "line-through text-surface-300/75" : "text-surface-100"}`}
        >
          {task.title}
        </h2>

        {task.description && <p className="text-sm text-surface-200/90">{task.description}</p>}

        <div className="text-xs text-surface-300/90">
          <p>Created: {formatDate(task.createdAt)}</p>
          <p>Due: {formatDate(task.dueDate)}</p>
        </div>

        <span
          className={`mt-1 w-max rounded-full px-3 py-1 text-xs font-semibold ${
            isCompleted ? "bg-success-500/25 text-success-500" : "bg-warning-500/20 text-warning-500"
          }`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          onClick={() => onEdit(task)}
          className="rounded-xl border border-surface-600 bg-surface-800 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-surface-100 transition hover:bg-surface-700"
        >
          Edit
        </button>

        <button
          onClick={() => onComplete(task.id)}
          disabled={isCompleted}
          className="rounded-xl bg-brand-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-surface-100 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:bg-surface-700 disabled:text-surface-300"
        >
          Complete
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="rounded-xl border border-danger-500/70 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-danger-500 transition hover:bg-danger-500/15"
        >
          Delete
        </button>
      </div>
    </div>
  );
}