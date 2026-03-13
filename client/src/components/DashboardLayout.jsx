import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Stethoscope,
  Settings,
  LogOut,
  Heart,
  ChevronLeft,
  Menu,
  Phone
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Appointments", href: "/admin/appointments", icon: CalendarDays },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Receptionists", href: "/admin/receptionists", icon: Phone },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function DashboardLayout({ children }) {

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [admin, setAdmin] = useState({});

  /* ================= ADMIN PROFILE ================= */

  useEffect(() => {

    const adminId = localStorage.getItem("adminId");

    const fetchAdmin = async () => {

      try {

        const res = await fetch(`http://localhost:5000/api/admin/${adminId}`);

        const data = await res.json();

        setAdmin(data);

      } catch (err) {

        console.error(err);

      }

    };

    if (adminId) fetchAdmin();

  }, []);

  return (

    <div className="flex h-screen bg-background">

      {/* ================= MOBILE OVERLAY ================= */}

      {mobileOpen && (

        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />

      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
        fixed z-40 inset-y-0 left-0
        ${collapsed ? "w-16" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        bg-card border-r transition-all duration-300
        lg:translate-x-0 lg:static lg:flex lg:flex-col
      `}
      >

        {/* LOGO */}

        <div className="flex h-16 items-center justify-between border-b px-4">

          {!collapsed && (

            <Link to="/home" className="flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">

                <Heart className="h-4 w-4 text-primary-foreground" />

              </div>

              <span className="font-display text-lg font-bold text-foreground">

                Geeth HealthCare

              </span>

            </Link>

          )}

          {/* COLLAPSE BUTTON */}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-1.5 hover:bg-secondary"
          >

            <ChevronLeft
              className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
            />

          </button>

        </div>

        {/* ================= MENU ================= */}

        <nav className="flex-1 p-3 space-y-1">

          {sidebarLinks.map((link) => {

            const isActive = location.pathname === link.href;

            return (

              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`
                flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                ${isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }
              `}
              >

                <link.icon className="h-4.5 w-4.5 shrink-0" />

                {!collapsed && <span>{link.name}</span>}

              </Link>

            );

          })}

        </nav>

        {/* FOOTER */}

        <div className="border-t p-3">

          <Link
            to="/home"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
          >

            <LogOut className="h-4.5 w-4.5" />

            {!collapsed && <span>Back to Website</span>}

          </Link>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* ================= HEADER ================= */}

        <header className="flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">

          {/* HAMBURGER */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 hover:bg-secondary lg:hidden"
          >

            <Menu className="h-5 w-5" />

          </button>

          {/* ADMIN INFO */}

          <div className="flex items-center gap-3 ml-auto">

            {/* Avatar */}

            <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-hero text-xs font-bold text-primary-foreground">

              {admin?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}

            </div>

            {/* Name + Email */}

            <div className="hidden sm:block">

              <p className="text-sm font-medium text-foreground">

                {admin?.name || "Admin"}

              </p>

              <p className="text-xs text-muted-foreground">

                {admin?.email}

              </p>

            </div>
            
        <div className="lg:hidden">

          <Link
            to="/home"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
          >

            <LogOut className="h-4.5 w-4.5" />

            {!collapsed }

          </Link>

        </div>

          </div>

        </header>

        {/* ================= PAGE CONTENT ================= */}

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">

          {children}

        </main>

      </div>

    </div>

  );

}