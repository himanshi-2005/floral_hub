import FlowerCard from "./FlowerCard";

export default function FlowerList({ flowers, onDelete }) {
  if (!flowers.length) {
    return (
      <div className="rounded-3xl border border-dashed border-pink-300 bg-white/80 p-8 text-center text-gray-500">
        No flowers match your search or filter.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {flowers.map((flower) => (
        <FlowerCard
          key={flower.id}
          flower={flower}
          editLink={`/edit_flower/${flower.id}`}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}