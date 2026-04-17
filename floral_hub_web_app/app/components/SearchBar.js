export default function SearchBar({ value, onChange }) {
  return (
    <label className="block rounded-3xl bg-white p-4 shadow-sm ring-1 ring-pink-200">
      <span className="text-sm font-medium text-gray-700">Search flowers</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name..."
        className="mt-3 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-pink-500 focus:bg-white"
      />
    </label>
  );
}
