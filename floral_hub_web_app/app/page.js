"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="max-w-2xl rounded-3xl bg-white/90 p-10 shadow-lg ring-1 ring-pink-200">
        <h1 className="text-5xl font-bold text-pink-600">?? Floral Hub</h1>
        <p className="mt-4 text-gray-600 text-lg">
          A simple flower inventory frontend where you can add, view, and delete flowers.
        </p>
        <Link
          href="/inventory"
          className="mt-8 inline-flex rounded-full bg-pink-500 px-6 py-3 text-white shadow hover:bg-pink-600"
        >
          Open Inventory
        </Link>
      </div>
    </div>
  );
}
