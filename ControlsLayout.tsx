import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import ControlsAuth from "./ControlsAuth";

export default function ControlsLayout() {
  const { user, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user?.isAuthenticated) {
    return <ControlsAuth />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Admin Controls
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome to the ARRSAL admin panel, {user.name}
          </p>
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-4">
                  <p>Admin dashboard content goes here.</p>
                  <button
                    onClick={() => useAdminAuth().logout()}
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
