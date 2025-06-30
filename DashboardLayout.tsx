import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import BusinessAuth from "./BusinessAuth";
import { useBusinessAuth } from "@/hooks/use-business-auth";
import { cn } from "@/lib/utils";

export default function DashboardLayout() {
  const { user, isLoading } = useBusinessAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Temporary debug logging
  console.log("DashboardLayout Debug:");
  console.log("- isLoading:", isLoading);
  console.log("- user exists:", !!user);
  console.log("- user.isAuthenticated:", user?.isAuthenticated);
  console.log("- user email:", user?.email);

  if (isLoading) {
    console.log("Showing loading screen");
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
    console.log("User not authenticated, showing BusinessAuth");
    return <BusinessAuth />;
  }

  console.log("User authenticated, showing dashboard");

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <DashboardHeader
        onToggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar
          isCollapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
        />

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 overflow-auto bg-muted/20",
            "transition-all duration-300",
          )}
        >
          <div className="container mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
