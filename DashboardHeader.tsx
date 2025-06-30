import { Button } from "@/components/ui/button";
import { useBusinessAuth } from "@/hooks/use-business-auth";
import { Menu, LogOut } from "lucide-react";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export default function DashboardHeader({
  onToggleSidebar,
}: DashboardHeaderProps) {
  const { user, logout } = useBusinessAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              ARRSAL Dashboard
            </h1>
            <p className="text-sm text-gray-600">{user?.company.name}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-600 capitalize">
              {user?.role.replace("_", " ")}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
