"use client";

import React from "react";

export default function LogoutButton() {
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ps_admin_token");
      window.location.href = "/login";
    }
  };

  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
