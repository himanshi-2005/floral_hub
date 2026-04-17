
"use client";

export default function EditFlowerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Flower</h1>

      <p className="text-gray-500">
        (UI only - no backend update yet)
      </p>

      <input className="border p-2 mt-2" placeholder="Update name" />
      <input className="border p-2 mt-2" placeholder="Update price" />

      <button className="bg-blue-500 text-white p-2 mt-2">
        Update
      </button>
    </div>
  );
}