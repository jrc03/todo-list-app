export default function FilterBar({ value, onChange }) {
  return (
    <div className="bg-gray-50 p-4 border border-gray-200 rounded-md mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="status-filter">
        Filter by status
      </label>
      <select
        id="status-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}