import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import {
    ClipboardList,
    CalendarDays,
    CheckCircle2,
    AlertCircle,
    LogOut,
    Search,
    Plus,
    Users,
    Activity,
    Edit,
    Save,
    X
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../components/ui/select";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../components/ui/dialog";

const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

export default function ReceptionistDashboard() {

    const navigate = useNavigate();

    const receptionistId = localStorage.getItem("receptionistId");

    const [profile, setProfile] = useState({});
    const [editingProfile, setEditingProfile] = useState(false);

    const [aptList, setAptList] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [search, setSearch] = useState("");
    const [cancelCount, setCancelCount] = useState(0);

    const [editingId, setEditingId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [form, setForm] = useState({
        patientName: "",
        age: "",
        phone: "",
        doctor: "",
        department: "",
        date: "",
        time: "",
        problem: ""
    });

    /* =========================
       FETCH PROFILE
    ========================= */

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const res = await fetch(`http://localhost:5000/api/receptionist/${receptionistId}`);

                const data = await res.json();

                setProfile(data);

            } catch {

                toast.error("Failed to load profile");

            }

        };

        if (receptionistId) fetchProfile();

    }, [receptionistId]);

    /* =========================
       FETCH APPOINTMENTS
    ========================= */

    const fetchAppointments = async () => {

        try {

            const res = await fetch("http://localhost:5000/api/ui/appointments");

            const data = await res.json();

            const formatted = data.map(a => {

                const d = new Date(a.date);

                return {
                    id: a._id,
                    patientName: a.name,
                    age: a.age,
                    phone: a.phone,
                    doctor: a.doctor,
                    department: a.department,
                    date: d.toISOString().split("T")[0],
                    time: d.toTimeString().slice(0, 5),
                    problem: a.problem
                };

            });

            setAptList(formatted);

        } catch {

            toast.error("Failed to load appointments");

        }

    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    /* =========================
       FETCH DOCTORS
    ========================= */

    useEffect(() => {

        const fetchDoctors = async () => {

            try {

                const res = await fetch("http://localhost:5000/api/ui/doctors");

                const data = await res.json();

                setDoctors(data);

            } catch {

                toast.error("Failed to load doctors");

            }

        };

        fetchDoctors();

    }, []);

    /* =========================
       PROFILE UPDATE
    ========================= */

    const saveProfile = async () => {

        try {

            const res = await fetch(`http://localhost:5000/api/receptionist/${receptionistId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile)
            });

            const data = await res.json();

            setProfile(data);

            toast.success("Profile updated");

            setEditingProfile(false);

        } catch {

            toast.error("Update failed");

        }

    };

    /* =========================
       SEARCH
    ========================= */

    const filtered = aptList.filter(a =>
        a.patientName.toLowerCase().includes(search.toLowerCase()) ||
        a.doctor.toLowerCase().includes(search.toLowerCase())
    );

    /* =========================
       CREATE APPOINTMENT
    ========================= */

    const createAppointment = async () => {

        try {

            const res = await fetch("http://localhost:5000/api/ui/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.patientName,
                    age: form.age,
                    phone: form.phone,
                    doctor: form.doctor,
                    department: form.department,
                    problem: form.problem,
                    date: new Date(`${form.date}T${form.time}`)
                })
            });

            if (!res.ok) {
                toast.error("Booking failed");
                return;
            }

            toast.success("Appointment created");

            fetchAppointments();

        } catch {

            toast.error("Server error");

        }

    };

    /* =========================
       UPDATE APPOINTMENT
    ========================= */

    const updateAppointment = async () => {

        try {

            const res = await fetch(
                `http://localhost:5000/api/ui/appointments/${editingId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: form.patientName,
                        age: form.age,
                        phone: form.phone,
                        doctor: form.doctor,
                        department: form.department,
                        problem: form.problem,
                        date: new Date(`${form.date}T${form.time}`)
                    })
                }
            );

            if (!res.ok) {
                toast.error("Update failed");
                return;
            }

            toast.success("Appointment updated");

            fetchAppointments();

            setEditingId(null);

        } catch {

            toast.error("Server error");

        }

    };

    /* =========================
       SAVE
    ========================= */

    const handleSave = async () => {

        if (!form.patientName || !form.phone || !form.doctor) {
            toast.error("Fill required fields");
            return;
        }

        if (editingId) {
            await updateAppointment();
        } else {
            await createAppointment();
        }

        setForm({
            patientName: "",
            age: "",
            phone: "",
            doctor: "",
            department: "",
            date: "",
            time: "",
            problem: ""
        });

        setDialogOpen(false);

    };

    /* =========================
       DELETE
    ========================= */

    const cancelAppointment = async (id) => {

        try {

            await fetch(`http://localhost:5000/api/ui/appointments/${id}`, {
                method: "DELETE"
            });

            setCancelCount(prev => prev + 1);

            toast.success("Appointment cancelled");

            fetchAppointments();

        } catch {

            toast.error("Cancel failed");

        }

    };

    /* =========================
       UI
    ========================= */

    return (

        <div className="flex h-screen bg-background">

            {/* Sidebar */}

            <aside className="hidden w-64 border-r bg-card lg:flex lg:flex-col">

                <Link to="/">

                    <div className="flex h-16 items-center gap-2 border-b px-4">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(250,60%,55%)]">

                            <ClipboardList className="h-4 w-4 text-white" />

                        </div>

                        <span className="font-bold">Reception</span>

                    </div>

                </Link>

                <nav className="flex-1 p-3 space-y-1">

                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white">
                        <CalendarDays className="h-4 w-4" />
                        Appointments
                    </div>

                    <div className="flex items-center gap-3 px-3 py-2 hover:bg-secondary rounded-lg">
                        <Users className="h-4 w-4" />
                        Patients
                    </div>

                    <div className="flex items-center gap-3 px-3 py-2 hover:bg-secondary rounded-lg">
                        <Activity className="h-4 w-4" />
                        Doctors
                    </div>

                </nav>

                <div className="border-t p-3">

                    <button
                        onClick={() => {
                            localStorage.removeItem("receptionistId");
                            toast.info("Logged out");
                            navigate("/receptionist-login");
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-secondary"
                    >

                        <LogOut className="h-4 w-4" />
                        Logout

                    </button>

                </div>

            </aside>

            {/* Main */}

            <div className="flex flex-1 flex-col">

                {/* TOP NAVBAR */}

                <header className="flex items-center justify-between border-b px-6 py-3">

                    <h1 className="font-bold text-lg">
                        Receptionist Dashboard
                    </h1>

                    <div className="flex items-center gap-4">

                        <div className="text-right">

                            <p className="font-medium">
                                {profile.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {profile.email}
                            </p>

                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(250,60%,55%)] text-white font-bold">

                            {profile.name?.split(" ").map(n => n[0]).join("")}

                        </div>

                    </div>

                </header>

                <main className="flex-1 p-6 space-y-6 overflow-y-auto">

                    {/* Stats */}

                    <div className="grid gap-4 sm:grid-cols-3">

                        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="p-5 border rounded-xl">

                            <ClipboardList className="h-5 w-5 mb-2" />

                            <p className="text-2xl font-bold">
                                {aptList.length}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Total Appointments
                            </p>

                        </motion.div>

                        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="p-5 border rounded-xl">

                            <CheckCircle2 className="h-5 w-5 mb-2" />

                            <p className="text-2xl font-bold">
                                {aptList.length}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Confirmed
                            </p>

                        </motion.div>

                        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="p-5 border rounded-xl">

                            <AlertCircle className="h-5 w-5 mb-2" />

                            <p className="text-2xl font-bold">
                                {cancelCount}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Cancelled
                            </p>

                        </motion.div>

                    </div>

                    {/* Search */}

                    <div className="flex gap-3">

                        <div className="relative flex-1 max-w-md">

                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                placeholder="Search patients or doctors..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />

                        </div>

                    </div>

                    {/* Table */}

                    <div className="rounded-xl border overflow-hidden">

                        <table className="w-full text-sm">

                            <thead>

                                <tr className="border-b bg-muted/50">

                                    <th className="px-4 py-3 text-left">Patient</th>
                                    <th className="px-4 py-3 text-left">Doctor</th>
                                    <th className="px-4 py-3 text-left">Department</th>
                                    <th className="px-4 py-3 text-left">Phone</th>
                                    <th className="px-4 py-3 text-left">Date</th>
                                    <th className="px-4 py-3 text-left">Problem</th>
                                    <th className="px-4 py-3 text-left">Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filtered.map((apt) => (
                                    <tr key={apt.id}>

                                        <td className="px-4 py-3">{apt.patientName}</td>
                                        <td className="px-4 py-3">{apt.doctor}</td>
                                        <td className="px-4 py-3">{apt.department}</td>
                                        <td className="px-4 py-3">{apt.phone}</td>
                                        <td className="px-4 py-3">{apt.date}</td>
                                        <td className="px-4 py-3">{apt.problem}</td>

                                        <td className="px-4 py-3 flex gap-2">

                                            <Button size="sm" variant="outline">
                                                Update
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-red-600"
                                                onClick={() => cancelAppointment(apt.id)}
                                            >
                                                Cancel
                                            </Button>

                                        </td>

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