import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Phone, Heart, Clock } from "lucide-react";
import { Button } from "../components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Departments", href: "/departments" },
  { name: "Doctors", href: "/doctors" },
  { name: "Facilities", href: "/facilities" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="gradient-hero">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm text-primary-foreground">
          
          <div className="flex items-center gap-4">

            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              <span>Emergency: +91 98765 43210</span>
            </div>

            <div className="hidden items-center gap-1.5 sm:flex">
              <Clock className="h-3.5 w-3.5" />
              <span>24/7 Available</span>
            </div>

          </div>

          <Link to="/login">
            <Button
              variant="outline"
              size="sm"
              className="h-7 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 text-xs"
            >
              Staff Login
            </Button>
          </Link>

        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-md shadow-card">

        <div className="container mx-auto flex items-center justify-between px-4 py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>

            <div>
              <span className="text-xl font-bold text-foreground">
               Geeth HealthCare
              </span>

              <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                Hospital & Research
              </span>
            </div>

          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 lg:flex">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}

          </div>

          {/* Appointment Button */}
          <div className="hidden items-center gap-3 lg:flex">

            <Link to="/appointment">
              <Button className="gradient-hero border-0 text-primary-foreground shadow-md">
                Book Appointment
              </Button>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 hover:bg-secondary lg:hidden"
          >

            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}

          </button>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="border-t bg-card px-4 py-4 lg:hidden"
          >

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}

            <Link to="/appointment" onClick={() => setIsOpen(false)}>

              <Button className="mt-3 w-full gradient-hero border-0 text-primary-foreground">
                Book Appointment
              </Button>

            </Link>

          </motion.div>
        )}

      </nav>
    </>
  );
}