import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Building2,
  Stethoscope,
  Settings,
  LogOut,
  Heart,
  ChevronLeft,
  Menu
} from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Appointments", href: "/admin/appointments", icon: CalendarDays },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-64"} hidden border-r bg-card transition-all duration-300 lg:flex lg:flex-col`}>
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">Geeth HealthCare</span>
            </Link>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-1.5 hover:bg-secondary"
          >
            <ChevronLeft
              className={`h-4 w-4 text-muted-foreground transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href;

            return (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <link.icon className="h-4.5 w-4.5 shrink-0" />
                {!collapsed && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            {!collapsed && <span>Back to Website</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
          <button className="rounded-lg p-2 hover:bg-secondary lg:hidden">
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-hero text-xs font-bold text-primary-foreground">
              H
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">Hackers</p>
              <p className="text-xs text-muted-foreground">hackers@gmail.com</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}