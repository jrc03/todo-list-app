export default function FilterBar({ value, onChange }) {
  const options = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div className="rounded-2xl border border-surface-700 bg-surface-900 p-4 sm:p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-surface-300">
        Filter Tasks
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                active
                  ? "bg-brand-500 text-surface-100"
                  : "bg-surface-800 text-surface-200 hover:bg-surface-700"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}