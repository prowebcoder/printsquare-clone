import React from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton"; // 👈 import client component

export const metadata = {
  title: "Admin - PrintSquare",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 hidden md:block">
        <h2 className="text-xl font-semibold mb-6">PrintSquare Admin</h2>
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/dashboard" className="px-3 py-2 rounded hover:bg-gray-100">Dashboard</Link>
          <Link href="/dashboard/users" className="px-3 py-2 rounded hover:bg-gray-100">Users</Link>
          <Link href="/dashboard/pages" className="px-3 py-2 rounded hover:bg-gray-100">Pages</Link>
          <a href="/" className="px-3 py-2 rounded hover:bg-gray-100">Go to site</a>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-sm text-gray-500">Manage site content and users</p>
          </div>
          <div>
            <LogoutButton /> {/* 👈 replaced button with client component */}
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
