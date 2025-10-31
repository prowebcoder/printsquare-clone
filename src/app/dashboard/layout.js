import React from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export const metadata = {
  title: "Admin - PrintSquare",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-gray-800 font-inter">
      {/* Sidebar */}
      <aside className="w-72 bg-white/70 backdrop-blur-md border-r border-gray-200 shadow-xl hidden md:flex flex-col justify-between">
        <div className="p-6">
          <h2 className="text-2xl font-extrabold text-indigo-700 mb-8 tracking-tight">
            PrintSeoul Admin
          </h2>

          <nav className="flex flex-col gap-3 text-[15px] font-medium">
            {[
              { name: "Dashboard", href: "/dashboard" },
              { name: "Users", href: "/dashboard/users" },
              { name: "Pages", href: "/dashboard/pages" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2.5 rounded-lg transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-700 group flex items-center gap-2"
              >
                <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-indigo-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></span>
                {link.name}
              </Link>
            ))}

            <a
              href="/"
              className="relative px-4 py-2.5 rounded-lg transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2"
            >
              Go to site
            </a>
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-gray-200 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} PrintSeoul
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col relative">
        <header className="flex items-center justify-between p-6 bg-white/60 backdrop-blur-md shadow-md border-b border-gray-200 sticky top-0 z-20">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-500">
              Manage site content and users efficiently
            </p>
          </div>
          <div>
            <LogoutButton />
          </div>
        </header>

        <main className="flex-1 p-8 bg-gradient-to-tr from-white to-gray-50">
          <div className="max-w-7xl mx-auto rounded-3xl bg-white/70 backdrop-blur-lg shadow-lg border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
