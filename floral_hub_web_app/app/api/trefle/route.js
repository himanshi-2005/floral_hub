import { NextResponse } from "next/server";

const sampleFlowers = [
  {
    id: 1,
    name: "Red Rose",
    scientificName: "Rosa",
    image: "/flower-bg.svg",
    category: "Roses",
    price: 18,
    inStock: true,
    description: "A classic red rose, perfect for bouquets and arrangements.",
  },
  {
    id: 2,
    name: "Yellow Tulip",
    scientificName: "Tulipa",
    image: "/flower-bg.svg",
    category: "Growers",
    price: 14,
    inStock: true,
    description: "Bright tulips that bring color to spring displays.",
  },
  {
    id: 3,
    name: "Orchid",
    scientificName: "Orchidaceae",
    image: "/flower-bg.svg",
    category: "Designers",
    price: 26,
    inStock: false,
    description: "Elegant orchids for premium floral arrangements.",
  },
];

function mapTrefleItem(item) {
  const name = item.common_name || item.scientific_name || "Unknown Flower";
  const category = item.family_common_name || item.genus || "Ornamental";
  return {
    id: item.id,
    name,
    scientificName: item.scientific_name || "",
    image: item.image_url || "/flower-bg.svg",
    category,
    price: Number(item.growth?.watering || 10) || 10,
    inStock: Math.random() > 0.2,
    description: item.growth_habit || item.duration || "Flower details available.",
  };
}
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const family = searchParams.get("filter[family]")?.trim();
  const genus = searchParams.get("filter[genus]")?.trim() || searchParams.get("search")?.trim() || "ornamental";
  const apiToken = process.env.TREFLE_API_TOKEN || searchParams.get("token") || searchParams.get("key");

  if (!apiToken) {
    return NextResponse.json({ data: sampleFlowers, source: "sample" });
  }

  const apiUrl = new URL("https://trefle.io/api/v1/plants");
  apiUrl.searchParams.set("token", apiToken);
  if (family) {
    apiUrl.searchParams.set("filter[family]", family);
  } else {
    apiUrl.searchParams.set("filter[genus]", genus);
  }
  apiUrl.searchParams.set("page", searchParams.get("page") || "1");
  apiUrl.searchParams.set("filter[is_complete]", "true");
  apiUrl.searchParams.set("filter[sort]", "name");

  try {
    const response = await fetch(apiUrl.toString(), { next: { revalidate: 3600 } });
    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: response.status });
    }
    const json = await response.json();
    const flowers = Array.isArray(json.data)
      ? json.data.map(mapTrefleItem)
      : sampleFlowers;
    return NextResponse.json({ data: flowers, source: "trefle" });
  } catch (error) {
    return NextResponse.json({ error: error.message, data: sampleFlowers, source: "sample" }, { status: 500 });
  }
}
