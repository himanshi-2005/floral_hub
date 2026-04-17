
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-pink-500 text-white p-4">
      <div className="mx-auto flex max-w-6xl justify-center gap-8 text-center">
        <Link href="/" className="font-medium hover:underline">
          Home
        </Link>
        <Link href="/inventory" className="font-medium hover:underline">
          Inventory
        </Link>
        <Link href="/add_flower" className="font-medium hover:underline">
          Add Flower
        </Link>
      </div>
    </nav>
  );
}