import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.4fr_1.2fr_1fr_auto]">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-surface-300">
            Title <span className="text-danger-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Prepare sprint board"
            className="w-full rounded-xl border border-surface-600 bg-surface-800 px-3 py-3 text-surface-100 placeholder:text-surface-300/75 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/35"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-surface-300">
            Description
          </label>
          <input
            type="text"
            placeholder="Optional details"
            className="w-full rounded-xl border border-surface-600 bg-surface-800 px-3 py-3 text-surface-100 placeholder:text-surface-300/75 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/35"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-surface-300">
            Due Date
          </label>
          <input
            type="datetime-local"
            className="w-full rounded-xl border border-surface-600 bg-surface-800 px-3 py-3 text-surface-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/35"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="h-12 w-full rounded-xl bg-brand-500 px-6 text-sm font-bold uppercase tracking-wide text-surface-100 transition hover:bg-brand-400 lg:w-auto"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}