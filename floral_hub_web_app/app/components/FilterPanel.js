export default function FilterPanel({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-pink-200">
      <h3 className="text-lg font-semibold text-pink-700">Filter by category</h3>
      <div className="mt-4 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              selectedCategory === category
                ? "bg-pink-500 text-white"
                : "bg-pink-50 text-pink-700 hover:bg-pink-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

