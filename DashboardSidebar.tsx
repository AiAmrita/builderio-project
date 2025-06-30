import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  BarChart3,
  FileText,
  Users,
  Settings,
  CreditCard,
  Bell,
  HelpCircle,
  Zap,
  BookOpen,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Journal Entries", href: "/dashboard/journal", icon: BookOpen },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Financial Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Budgets & Forecasts", href: "/dashboard/budgets", icon: TrendingUp },
  { name: "Team Management", href: "/dashboard/team", icon: Users },
  { name: "Integrations", href: "/dashboard/integrations", icon: Zap },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Support", href: "/dashboard/support", icon: HelpCircle },
];

export default function DashboardSidebar({
  isCollapsed,
}: DashboardSidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100",
                isCollapsed && "justify-center",
              )}
            >
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
