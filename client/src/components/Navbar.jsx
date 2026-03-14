import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Phone, Heart, Clock, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "sonner";


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
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const storedPatient = localStorage.getItem("patient");

    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("patient");
    setPatient(null);
    navigate("/geeth-login");

  };

const handleEmergencyBooking = async () => {

  try {

    const patientData = JSON.parse(localStorage.getItem("patient"));
    const email = patientData?.email || "Emergency Patient";

    const res = await fetch(
      "http://localhost:5000/api/ui/emergency/emergency-appointment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: email,
          problem: "It's an emergency situation, please assist immediately.",
          doctor: "Dr. Deepak Gowda",
          department: "Emergency Medicine Specialist",
          date: new Date().toISOString()
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Emergency booking failed");
      return;
    }

    toast.success("🚨 Emergency appointment booked successfully");

  } catch (err) {

    console.error(err);
    toast.error("Server error while booking emergency appointment");

  }

};


  return (
    <>
      {/* Top Bar */}
      <div className="gradient-hero">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm text-primary-foreground">
          <div className="flex items-center gap-4 px-1 ">
            <button
              onClick={handleEmergencyBooking}
              className="p-2.5 rounded-[5rem] gradient-hero transition cursor-pointer hover:bg-muted/80 flex items-center gap-2 text-xs font-medium"
              title="Emergency Appointment"
            >
              <Phone className="h-3.5 w-3.5 text-white stroke-mist-700bold" />
            </button>

            <div className="flex items-center gap-3">
              <div >
                <span>Emergency: +91 98765 43210</span>
              </div>

              <div className="hidden items-center gap-1 sm:flex">
                <Clock className="h-3 w-3" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
          {/* Right Side Buttons */}
          <div className="flex items-center gap-2">

            {/* Staff Login FIRST */}
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="h-7 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 text-xs"
              >
                Staff Login
              </Button>
            </Link>

            {patient ? (
              <>
                {/* Patient Dashboard */}
                <Link to="/patient-dashboard">

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 text-xs"
                  >
                    {patient.name.split(" ")[0]}
                  </Button>

                </Link>

                {/* Logout Icon */}
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center gradient-hero gap-2 rounded-[1.5rem]   border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 border-0 size-8 "
                >
                  <LogOut className="h-2 w-2" />
                </Button>

              </>
            ) : (

              <Link to="/patient-info">

                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 text-xs"
                >
                  Patient Login
                </Button>

              </Link>

            )}

          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-md shadow-card">

        <div className="container mx-auto flex items-center justify-between px-4 py-3">

          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2.5">

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