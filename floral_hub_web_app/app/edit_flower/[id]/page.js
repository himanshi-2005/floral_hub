"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FlowerForm from "../../components/FlowerForm";

const STORAGE_KEY = "floralHubFlowers";

export default function EditFlowerPage() {
  const params = useParams();
  const router = useRouter();
  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const flowers = saved ? JSON.parse(saved) : [];
    const match = flowers.find((item) => String(item.id) === String(params.id));

    if (!match) {
      setError("Flower not found.");
    } else {
      setFlower(match);
    }
    setLoading(false);
  }, [params.id]);

  function handleSaveFlower(updatedFlower) {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const flowers = saved ? JSON.parse(saved) : [];
    const nextFlowers = flowers.map((item) =>
      String(item.id) === String(updatedFlower.id) ? updatedFlower : item
    );
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFlowers));
    router.push("/inventory");
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 text-center text-gray-600">
        Loading flower details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 text-center text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8">
      <div className="rounded-3xl bg-white/90 p-8 shadow-lg ring-1 ring-pink-200">
        <h1 className="text-4xl font-bold text-pink-600">Edit Flower</h1>
        <p className="mt-2 text-gray-600">
          Update flower details and save changes back to your inventory.
        </p>
      </div>

      <FlowerForm
        flower={flower}
        onSave={handleSaveFlower}
        onCancel={() => router.push("/inventory")}
      />
    </div>
  );
}
