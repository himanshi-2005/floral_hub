export default function FlowerForm({ flower, onSave, onCancel }) {
  const isEditing = Boolean(flower?.id);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const newFlower = {
          id: flower?.id || Date.now(),
          name: form.name.value.trim(),
          category: form.category.value.trim() || "Others",
          price: Number(form.price.value) || 0,
          quantity: Number(form.quantity.value) || 0,
          image: form.image.value.trim() || "/flower-bg.svg",
          inStock: form.inStock.checked,
          description: form.description.value.trim(),
          scientificName: form.scientificName.value.trim(),
        };
        onSave(newFlower);
      }}
      className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-pink-200"
    >
      <h3 className="text-2xl font-semibold text-pink-700">
        {isEditing ? "Edit Flower" : "Add Flower"}
      </h3>
      <label className="block space-y-2 text-sm text-gray-700">
        <span>Name</span>
        <input
          name="name"
          defaultValue={flower?.name || ""}
          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-500"
          required
        />
      </label>
      <label className="block space-y-2 text-sm text-gray-700">
        <span>Category</span>
        <input
          name="category"
          defaultValue={flower?.category || ""}
          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-500"
          placeholder="Roses, Growers, Designers, Vases"
        />
      </label>
      <label className="block space-y-2 text-sm text-gray-700">
        <span>Scientific name</span>
        <input
          name="scientificName"
          defaultValue={flower?.scientificName || ""}
          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-500"
        />
      </label>
      <label className="block space-y-2 text-sm text-gray-700">
        <span>Image URL</span>
        <input
          name="image"
          defaultValue={flower?.image || ""}
          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-500"
          placeholder="https://..."
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-gray-700">
          <span>Price</span>
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={flower?.price ?? 0}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-500"
          />
        </label>
        <label className="block space-y-2 text-sm text-gray-700">
          <span>Quantity</span>
          <input
            name="quantity"
            type="number"
            defaultValue={flower?.quantity ?? 0}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-500"
          />
        </label>
      </div>
      <label className="block space-y-2 text-sm text-gray-700">
        <span>Description</span>
        <textarea
          name="description"
          defaultValue={flower?.description || ""}
          rows={3}
          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-500"
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="inStock"
            defaultChecked={flower?.inStock ?? true}
            className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
          />
          In Stock
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="inline-flex rounded-full bg-pink-500 px-6 py-3 text-white shadow hover:bg-pink-600"
        >
          {isEditing ? "Save Changes" : "Add Flower"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex rounded-full border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
