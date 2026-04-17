
"use client";

import { useRouter } from "next/navigation";
import FlowerForm from "../components/FlowerForm";

const STORAGE_KEY = "floralHubFlowers";

export default function AddFlowerPage() {
  const router = useRouter();

  function handleSaveFlower(newFlower) {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const flowers = saved ? JSON.parse(saved) : [];
    const nextFlowers = [newFlower, ...flowers];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFlowers));
    router.push("/inventory");
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8">
      <div className="rounded-3xl bg-white/90 p-8 shadow-lg ring-1 ring-pink-200">
        <h1 className="text-4xl font-bold text-pink-600">Add New Flower</h1>
        <p className="mt-2 text-gray-600">
          Use this page to add a new flower to your inventory.
        </p>
      </div>

      <FlowerForm onSave={handleSaveFlower} />
    </div>
  );
}
