import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

import {
    CalendarDays,
    ClipboardList,
    AlertCircle,
    Clock,
    LogOut,
    Menu,
    X,
    User
} from "lucide-react";

import { Button } from "../components/ui/button";
import { toast } from "sonner";

const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.4 }
    })
};

export default function PatientDashboard() {

    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("patient");
        toast.info("Logged out");
        navigate("/geeth-login");
    };

    /* ================= LOAD PATIENT ================= */

    useEffect(() => {

        const storedPatient = localStorage.getItem("patient");

        if (!storedPatient) {
            toast.error("Please login first");
            navigate("/geeth-login");
            return;
        }

        const p = JSON.parse(storedPatient);

        setPatient(p);

        fetchAppointments(p._id);

    }, []);

    /* ================= FETCH APPOINTMENTS ================= */

    const fetchAppointments = async (id) => {

        try {

            const res = await fetch(
                `http://localhost:5000/api/appointments/patient/${id}`
            );

            const data = await res.json();

            const formatted = data.map((a) => {

                const d = new Date(a.date);

                return {
                    id: a._id,
                    doctor: a.doctor,
                    department: a.department,
                    problem: a.problem,
                    phone: a.phone,
                    date: d.toISOString().split("T")[0],
                    time: d.toTimeString().slice(0, 5)
                };

            });

            setAppointments(formatted);

        } catch {

            toast.error("Failed to load appointments");

        }

    };

    /* ================= STATS ================= */

    const total = appointments.length;
    const upcoming = appointments.filter(
        (a) => new Date(a.date) >= new Date()
    ).length;

    /* ================= UI ================= */

    return (

        <div className="flex min-h-screen bg-background">

            {/* Overlay */}

            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}

            <aside
                className={`
        fixed z-40 inset-y-0 left-0
        w-64 bg-card border-r transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex lg:flex-col
        `}
            >

                <div className="flex h-16 items-center gap-2 border-b px-4">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(250,60%,55%)]">
                        <ClipboardList className="h-4 w-4 text-white" />
                    </div>

                    <span className="font-bold">Patient</span>

                </div>

                <nav className="flex-1 p-3 space-y-1">

                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white">
                        <CalendarDays className="h-4 w-4" />
                        Appointments
                    </div>

                    <Link to="/appointment">

                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-secondary rounded-lg">
                            <ClipboardList className="h-4 w-4" />
                            Book Appointment
                        </div>

                    </Link>

                    <div className="flex items-center gap-3 px-3 py-2 hover:bg-secondary rounded-lg">
                        <User className="h-4 w-4" />
                        Profile
                    </div>

                </nav>

                <div className="border-t p-3">

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-secondary"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>

                </div>

            </aside>

            {/* Main Content */}

            <div className="flex flex-1 flex-col">

                {/* Navbar */}

                <header className="flex items-center justify-between border-b px-4 py-3 lg:px-6">

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="rounded-lg p-2 hover:bg-secondary lg:hidden"
                    >
                        {mobileOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>

                    <h1 className="font-bold text-lg">
                        Patient Dashboard
                    </h1>
                    <div className="flex items-center gap-0.5">
                        <div className="flex items-center gap-4">

                            <div className="text-right hidden sm:block">
                                <p className="font-medium">{patient?.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {patient?.email}
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(250,60%,55%)] text-white font-bold">
                                {patient?.name?.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div className=" p-2 lg:hidden">

                                <button
                                    onClick={handleLogout}
                                    className=" hover:bg-secondary"
                                >
                                    <LogOut className="h-4 w-4" />

                                </button>

                            </div>
                        </div>

                    </div>

                </header>

                <main className="flex-1 p-6 space-y-6 overflow-y-auto">

                    {/* Stats */}

                    <div className="grid gap-4 sm:grid-cols-3">

                        {[
                            { label: "Total Appointments", value: total, icon: ClipboardList },
                            { label: "Upcoming", value: upcoming, icon: CalendarDays },
                            { label: "Completed", value: total - upcoming, icon: Clock }
                        ].map((stat, i) => (

                            <motion.div
                                key={stat.label}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                custom={i}
                                className="p-5 border rounded-xl"
                            >

                                <stat.icon className="h-5 w-5 mb-2" />

                                <p className="text-2xl font-bold">{stat.value}</p>

                                <p className="text-sm text-muted-foreground">
                                    {stat.label}
                                </p>

                            </motion.div>

                        ))}

                    </div>

                    {/* Appointment Table */}

                    <div className="rounded-xl border overflow-hidden">

                        <table className="w-full text-sm">

                            <thead>

                                <tr className="border-b bg-muted/50">

                                    <th className="px-4 py-3 text-left">Doctor</th>
                                    <th className="px-4 py-3 text-left">Department</th>
                                    <th className="px-4 py-3 text-left">Phone</th>
                                    <th className="px-4 py-3 text-left">Date & Time</th>
                                    <th className="px-4 py-3 text-left">Problem</th>

                                </tr>

                            </thead>

                            <tbody>

                                {appointments.length === 0 && (

                                    <tr>

                                        <td colSpan="5" className="text-center py-8 text-muted-foreground">

                                            <AlertCircle className="mx-auto mb-2" />
                                            No appointments yet

                                        </td>

                                    </tr>

                                )}

                                {appointments.map((apt) => (

                                    <tr key={apt.id} className="border-b">

                                        <td className="px-4 py-3">{apt.doctor}</td>
                                        <td className="px-4 py-3">{apt.department}</td>
                                        <td className="px-4 py-3">{apt.phone}</td>
                                        <td className="px-4 py-3">{apt.date} {apt.time}</td>
                                        <td className="px-4 py-3">{apt.problem || "-"}</td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </main>

            </div>

        </div>

    );

}