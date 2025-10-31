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
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Manage Pages</h2>

      {/* Add new page */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">Add New Page</h3>
        <form onSubmit={handleAdd} className="flex flex-col gap-3">
          <input
            required
            placeholder="Title"
            value={newPage.title}
            onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            required
            placeholder="Slug (e.g. about-us)"
            value={newPage.slug}
            onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Content"
            value={newPage.content}
            onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Page
          </button>
        </form>
      </div>

      {/* Page list */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">All Pages</h3>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <table className="w-full text-sm border">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Slug</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b">
                  <td className="p-2">{page.title}</td>
                  <td className="p-2">{page.slug}</td>
                  <td className="p-2">
                    <button
                      className="px-2 py-1 border rounded mr-2"
                      onClick={() => alert("Edit coming soon!")}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 border rounded text-red-500"
                      onClick={() => deletePage(page.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
