"use client";

import React, { useEffect, useState } from "react";

export default function ManagePages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPage, setNewPage] = useState({ title: "", slug: "", content: "" });

  // Fetch all pages
  const fetchPages = async () => {
    try {
      const res = await fetch("/api/admin/pages");
      const data = await res.json();
      setPages(data);
    } catch (err) {
      console.error("Error fetching pages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Create new page
  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch("/api/admin/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPage),
    });
    setNewPage({ title: "", slug: "", content: "" });
    fetchPages();
  };

  // Delete page
  const deletePage = async (id) => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
    fetchPages();
  };

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Manage Pages
        </h2>
        <p className="text-gray-500 mt-1 text-sm">
          Create, view, and delete your site pages easily.
        </p>
      </div>

      {/* Add New Page */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Page
        </h3>
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            required
            placeholder="Page Title"
            value={newPage.title}
            onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
            className="border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            required
            placeholder="Slug (e.g. about-us)"
            value={newPage.slug}
            onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
            className="border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <textarea
            placeholder="Content"
            value={newPage.content}
            onChange={(e) =>
              setNewPage({ ...newPage, content: e.target.value })
            }
            className="md:col-span-2 border border-gray-200 rounded-lg px-4 py-2.5 h-32 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
            >
              + Add Page
            </button>
          </div>
        </form>
      </div>

      {/* Page List */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">All Pages</h3>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : pages.length === 0 ? (
          <p className="text-gray-500 italic">No pages found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50 border-b text-gray-700 uppercase text-xs tracking-wide">
                  <th className="text-left p-3">Title</th>
                  <th className="text-left p-3">Slug</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page, idx) => (
                  <tr
                    key={page.id}
                    className={`border-b hover:bg-gray-50 transition-all ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3 font-medium text-gray-800">
                      {page.title}
                    </td>
                    <td className="p-3 text-gray-600">{page.slug}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => alert("Edit coming soon!")}
                        className="px-3 py-1.5 text-sm rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePage(page.id)}
                        className="px-3 py-1.5 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
