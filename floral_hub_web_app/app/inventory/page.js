"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import FlowerList from "../components/FlowerList";
import FilterPanel from "../components/FilterPanel";
import SearchBar from "../components/SearchBar";

const STORAGE_KEY = "floralHubFlowers";
const API_KEY = "usr-3crDSa3J7k3byQHw4HeexzKzt8v53z0AOpGlyPBGYVY";
const API_URL = `/api/trefle?token=${API_KEY}&filter[family]=Orchidaceae`;

export default function InventoryPage () {
  const [flowers, setFlowers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const savedFlowers = saved ? JSON.parse(saved) : [];
    setFlowers(savedFlowers);

    async function loadFlowers() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        const apiFlowers = Array.isArray(json.data) ? json.data : [];

        const savedById = new Map(savedFlowers.map((flower) => [String(flower.id), flower]));
        const mergedFlowers = [
          ...apiFlowers.map((flower) => savedById.get(String(flower.id)) || flower),
          ...savedFlowers.filter(
            (flower) => !apiFlowers.some((item) => String(item.id) === String(flower.id))
          ),
        ];

        setFlowers(mergedFlowers);
      } catch (fetchError) {
        setError("Unable to load flowers from the API.");
      } finally {
        setLoading(false);
      }
    }

    loadFlowers();
  }, []);

  useEffect(() => {
    if (!loading) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(flowers));
    }
  }, [flowers, loading]);

  const categories = useMemo(
    () => ["All", ...new Set(flowers.map((flower) => flower.category || "Others"))],
    [flowers]
  );

  const filteredFlowers = useMemo(
    () =>
      flowers.filter((flower) => {
        const matchesSearch =
          search.trim().length === 0 ||
          flower.name?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || flower.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [flowers, search, selectedCategory]
  );

  function handleDeleteFlower(id) {
    setFlowers((current) => current.filter((flower) => flower.id !== id));
  }

  const showErrorOnly = Boolean(error && flowers.length === 0);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div className="rounded-3xl bg-white/90 p-8 shadow-lg ring-1 ring-pink-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-pink-600">Floral Hub Inventory</h1>
            <p className="mt-2 text-gray-600">
              Browse all flowers, filter by category, and edit or remove items from the inventory.
            </p>
          </div>
          <Link
            href="/add_flower"
            className="inline-flex rounded-full bg-pink-500 px-6 py-3 text-white shadow hover:bg-pink-600"
          >
            Add New Flower
          </Link>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">
        <section className="space-y-6">
          <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
            <SearchBar value={search} onChange={setSearch} />
            <FilterPanel
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {loading ? (
            <div className="rounded-3xl bg-white/90 p-8 text-center text-gray-600 shadow-sm ring-1 ring-pink-200">
              Loading flowers from the API...
            </div>
          ) : showErrorOnly ? (
            <div className="rounded-3xl bg-red-50 p-8 text-center text-red-700 shadow-sm ring-1 ring-red-200">
              {error}
            </div>
          ) : (
            <>
              {error ? (
                <div className="rounded-3xl bg-red-50 p-5 text-sm text-red-700 shadow-sm ring-1 ring-red-200">
                  {error}
                </div>
              ) : null}
              <FlowerList flowers={filteredFlowers} onDelete={handleDeleteFlower} />
            </>
          )}
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-pink-200">
            <h2 className="text-xl font-semibold text-pink-700">Inventory Snapshot</h2>
            <p className="mt-3 text-sm text-gray-600">Total flowers: {flowers.length}</p>
            <p className="mt-2 text-sm text-gray-600">Showing: {filteredFlowers.length} flowers</p>
            <p className="mt-4 rounded-2xl bg-pink-50 p-4 text-sm text-gray-700">
              Use the add page to create a new flower, or edit any item from the list.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
