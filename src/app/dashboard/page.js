"use client";

import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  // Local state to store dashboard statistics
  const [stats, setStats] = useState(null);

  // Fetch statistics once when the component mounts
  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    getStats();
  }, []);

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl shadow">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-semibold">
            {stats ? stats.users : "—"}
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow">
          <p className="text-sm text-gray-500">Orders</p>
          <p className="text-2xl font-semibold">
            {stats ? stats.orders : "—"}
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-semibold">
            {stats ? stats.revenue : "—"}
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="p-4 bg-white rounded-2xl shadow">
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => (window.location.href = "/dashboard/users")}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Manage Users
          </button>

          <button
            onClick={() => (window.location.href = "/dashboard/products")}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Manage Products
          </button>
        </div>
      </div>
    </div>
  );
}
