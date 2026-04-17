"use client";

import Link from "next/link";

export default function EditFlowerPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8">
      <div className="rounded-3xl bg-white/90 p-8 shadow-lg ring-1 ring-pink-200">
        <h1 className="text-4xl font-bold text-pink-600">Edit Flower</h1>
        <p className="mt-4 text-gray-600">
          To edit a flower, open it from the inventory list using the Edit button.
        </p>
        <p className="mt-2 text-gray-500">
          The route <code className="rounded bg-gray-100 px-2 py-1">/edit_flower/[id]</code> is the real edit page.
        </p>
        <Link
          href="/inventory"
          className="mt-6 inline-flex rounded-full bg-pink-500 px-6 py-3 text-white shadow hover:bg-pink-600"
        >
          Back to Inventory
        </Link>
      </div>
    </div>
  );
}
