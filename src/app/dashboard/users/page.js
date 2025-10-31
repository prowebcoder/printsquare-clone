"use client";

import React, { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Create user
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Failed to create user");
      const created = await response.json();
      setUsers([...users, created]);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // UI
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Manage Users
        </h2>
        <p className="text-gray-500 mt-1 text-sm">
          View, create, and remove user accounts.
        </p>
      </div>

      {/* All Users */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">All Users</h3>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-indigo-600 rounded-full"></div>
          </div>
        ) : users.length === 0 ? (
          <p className="text-gray-500 italic">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50 border-b text-gray-700 uppercase text-xs tracking-wide">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr
                    key={u.id}
                    className={`border-b hover:bg-gray-50 transition-all ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3 font-medium text-gray-800">{u.name}</td>
                    <td className="p-3 text-gray-600">{u.email}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => deleteUser(u.id)}
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

      {/* Create User */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Create New User
        </h3>
        <form
          onSubmit={createUser}
          className="flex flex-col md:flex-row gap-4 items-center"
        >
          <input
            required
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="Full Name"
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            required
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email Address"
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
          >
            + Add User
          </button>
        </form>
      </div>
    </div>
  );
}
