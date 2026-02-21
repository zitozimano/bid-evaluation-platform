import Link from "next/link";

export default function AdminNav() {
  return (
    <nav className="space-y-2 p-4 border-r min-h-screen bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>

      <Link href="/admin/departments" className="block text-blue-700 hover:underline">
        Departments
      </Link>

      <Link href="/admin/categories" className="block text-blue-700 hover:underline">
        Categories
      </Link>

      <Link href="/tenders" className="block text-blue-700 hover:underline">
        Tenders
      </Link>
    </nav>
  );
}
