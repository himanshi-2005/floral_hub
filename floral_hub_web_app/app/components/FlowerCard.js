import Link from "next/link";

export default function FlowerCard({ flower, editLink, onDelete }) {
  return (
    <article className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <img
        src={flower.image || "/flower-bg.svg"}
        alt={flower.name || "Flower image"}
        onError={(event) => {
          event.currentTarget.src = "/flower-bg.svg";
        }}
        className="h-56 w-full object-cover"
      />
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-pink-700">{flower.name}</h3>
          <span className="rounded-full bg-pink-100 px-3 py-1 text-sm text-pink-700">
            {flower.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{flower.category}</p>
        <p className="mt-3 text-sm text-gray-600">{flower.description || "No description available."}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-lg font-semibold text-pink-600">${flower.price.toFixed(2)}</span>
          <div className="flex gap-2">
            {editLink ? (
              <Link
                href={editLink}
                className="rounded-full border border-pink-500 px-4 py-2 text-pink-600 transition hover:bg-pink-50"
              >
                Edit
              </Link>
            ) : null}
            <button
              type="button"
              onClick={() => onDelete?.(flower.id)}
              className="rounded-full bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}