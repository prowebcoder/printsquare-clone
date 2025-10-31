"use client";

import React, { useEffect, useState } from "react";
import { Users, ShoppingBag, DollarSign, Settings, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

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

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br ${color} text-white flex flex-col gap-2`}
    >
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <Icon size={22} />
        </div>
        <p className="text-sm opacity-80">{label}</p>
      </div>
      <p className="text-3xl font-semibold mt-2">
        {value ?? "—"}
      </p>
    </motion.div>
  );

  const ActionButton = ({ icon: Icon, label, href }) => (
    <motion.button
      whileHover={{ scale: 1.03 }}
      onClick={() => (window.location.href = href)}
      className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl shadow hover:from-indigo-500 hover:to-indigo-400 transition-all"
    >
      <Icon size={18} />
      {label}
    </motion.button>
  );

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats?.users}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          icon={ShoppingBag}
          label="Orders"
          value={stats?.orders}
          color="from-emerald-500 to-emerald-600"
        />
        <StatCard
          icon={DollarSign}
          label="Revenue"
          value={stats?.revenue}
          color="from-orange-500 to-orange-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Settings size={20} className="text-indigo-500" />
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <ActionButton icon={Users} label="Manage Users" href="/dashboard/users" />
          <ActionButton icon={FileText} label="Manage Pages" href="/dashboard/pages" />
        </div>
      </div>
    </div>
  );
}
