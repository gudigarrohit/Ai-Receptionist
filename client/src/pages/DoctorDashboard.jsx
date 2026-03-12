import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Stethoscope,
    LogOut,
    Edit,
    Save,
    X,
    Trash2,
    CalendarPlus
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

export default function DoctorDashboard() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [editing, setEditing] = useState(false);
    const [newLeave, setNewLeave] = useState("");

    const doctorId = localStorage.getItem("doctorId");

    /* Load doctor profile */

    useEffect(() => {

        const fetchDoctor = async () => {

            try {

                const res = await fetch(`http://localhost:5000/api/doctors/${doctorId}`);

                const data = await res.json();

                setProfile(data);

            } catch (error) {

                console.error(error);
                toast.error("Failed to load doctor data");

            }

        };

        if (doctorId) fetchDoctor();

    }, [doctorId]);

    /* Load appointments */

    useEffect(() => {

        const fetchAppointments = async () => {

            try {

                const res = await fetch(`http://localhost:5000/api/appointments/doctor/${doctorId}`);

                const data = await res.json();

                setAppointments(data);

            } catch (err) {

                console.log(err);

            }

        };

        if (doctorId) fetchAppointments();

    }, [doctorId]);

    useEffect(() => {

        const fetchAppointments = async () => {

            const doctorName = profile.name;

            const res = await fetch(
                `http://localhost:5000/api/ui/appointments/doctor/${doctorName}`
            );

            const data = await res.json();

            const formatted = data.map((a) => ({
                patientName: a.name,
                age: a.age,
                problem: a.problem,
                date: new Date(a.date).toLocaleDateString(),
                time: new Date(a.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            }));

            setAppointments(formatted);

        };

        if (profile?.name) {
            fetchAppointments();
        }

    }, [profile]);

    /* Save doctor profile */

    const handleSave = async () => {

        try {

            const res = await fetch(`http://localhost:5000/api/doctors/${doctorId}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(profile)

            });

            const data = await res.json();

            setProfile(data);

            toast.success("Profile updated");

            setEditing(false);

        } catch (error) {

            toast.error("Update failed");

        }

    };

    /* Add leave */

    const addLeave = () => {

        if (!newLeave) return;

        setProfile({
            ...profile,
            leaves: [...(profile.leaves || []), newLeave]
        });

        setNewLeave("");

    };

    /* Remove leave */

    const removeLeave = (index) => {

        const updated = [...profile.leaves];

        updated.splice(index, 1);

        setProfile({
            ...profile,
            leaves: updated
        });

    };

    if (!profile) {
        return <div className="p-6">Loading...</div>;
    }

    return (

        <div className="flex h-screen bg-background">

            {/* Sidebar */}

            <aside className="hidden w-64 border-r bg-card lg:flex lg:flex-col">

                <Link to="/">

                    <div className="flex h-16 items-center gap-2 border-b px-4">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-accent">
                            <Stethoscope className="h-4 w-4 text-primary-foreground" />
                        </div>

                        <span className="font-display text-lg font-bold">
                            Doctor Portal
                        </span>

                    </div>

                </Link>

                <div className="flex-1 p-4">

                    <div className="flex flex-col items-center text-center py-6">

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl gradient-accent text-white font-bold text-2xl mb-3">

                            {profile.name?.split(" ").map(n => n[0]).join("")}

                        </div>

                        <h3 className="font-semibold">{profile.name}</h3>

                        <p className="text-sm text-primary">
                            {profile.specialization || "Specialization"}
                        </p>

                    </div>

                </div>

                <div className="border-t p-3">

                    <button
                        onClick={() => {
                            localStorage.removeItem("doctorId");
                            toast.info("Logged out");
                            navigate("/doctor-login");
                        }}
                        className="flex w-full items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary"

                    >

                        <LogOut className="h-4 w-4" />
                        Logout

                    </button>

                </div>

            </aside>

            {/* Main */}

            <div className="flex flex-1 flex-col overflow-hidden">

                <header className="flex h-16 items-center justify-between border-b px-6">

                    <h1 className="text-xl font-bold">
                        Doctor Dashboard
                    </h1>

                </header>

                <main className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* Stats */}

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="p-5 border rounded-xl">

                            <p className="text-sm text-muted-foreground">
                                Experience
                            </p>

                            <p className="text-2xl font-bold">
                                {profile.experience || 0} yrs
                            </p>

                        </motion.div>

                        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="p-5 border rounded-xl">

                            <p className="text-sm text-muted-foreground">
                                Consultation Fee
                            </p>

                            <p className="text-2xl font-bold">
                                ₹ {profile.fee || 0}
                            </p>

                        </motion.div>

                    </div>

                    {/* Profile */}

                    <div className="rounded-xl border bg-card">

                        <div className="flex justify-between border-b p-5">

                            <h2 className="font-semibold">
                                Doctor Profile
                            </h2>

                            {editing ? (

                                <div className="flex gap-2">

                                    <Button size="sm" variant="ghost" onClick={() => setEditing(false)}> <X className="h-4 w-4 mr-1" />
                                        Cancel </Button>

                                    <Button size="sm" onClick={handleSave}>
                                        <Save className="h-4 w-4 mr-1" />
                                        Save
                                    </Button>

                                </div>

                            ) : (

                                <Button size="sm" variant="outline" onClick={() => setEditing(true)}> <Edit className="h-4 w-4 mr-1" />
                                    Edit </Button>

                            )}

                        </div>

                        <div className="p-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            <div>

                                <label className="text-xs text-muted-foreground">
                                    Full Name
                                </label>

                                {editing ? (

                                    <Input
                                        value={profile.name || ""}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    />

                                ) : (

                                    <p>{profile.name}</p>

                                )}

                            </div>

                            <div>

                                <label className="text-xs text-muted-foreground">
                                    Specialization
                                </label>

                                {editing ? (

                                    <Input
                                        value={profile.specialization || ""}
                                        onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                                    />

                                ) : (

                                    <p>{profile.specialization}</p>

                                )}

                            </div>

                            <div>

                                <label className="text-xs text-muted-foreground">
                                    Experience
                                </label>

                                {editing ? (

                                    <Input
                                        type="number"
                                        value={profile.experience || ""}
                                        onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                                    />

                                ) : (

                                    <p>{profile.experience} yrs</p>

                                )}

                            </div>

                            <div>

                                <label className="text-xs text-muted-foreground">
                                    Consultation Fee
                                </label>

                                {editing ? (

                                    <Input
                                        type="number"
                                        value={profile.fee || ""}
                                        onChange={(e) => setProfile({ ...profile, fee: e.target.value })}
                                    />

                                ) : (

                                    <p>₹ {profile.fee}</p>

                                )}

                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground">
                                    Duty Start
                                </label> {editing ? (<Input type="time" value={profile.dutyStart || ""}
                                    onChange={(e) => setProfile({ ...profile, dutyStart: e.target.value })} />)
                                    : (<p>{profile.dutyStart}</p>)}
                            </div>
                            {/* Duty End */}

                            <div>
                                <label className="text-xs text-muted-foreground">
                                    Duty End </label>
                                {editing ? (<Input type="time" value={profile.dutyEnd || ""}
                                    onChange={(e) => setProfile({ ...profile, dutyEnd: e.target.value })} />)
                                    : (<p>{profile.dutyEnd}</p>)}
                            </div>

                            <div>
                                <label className="text-xs text-muted-foreground">
                                    Lunch Start
                                </label> {editing ? (<Input type="time" value={profile.lunchStart || ""}
                                    onChange={(e) => setProfile({ ...profile, lunchStart: e.target.value })} />)
                                    : (<p>{profile.lunchStart}</p>)} </div>
                            {/* Duty End */}
                            <div>
                                <label className="text-xs text-muted-foreground">
                                    Lunch End </label>
                                {editing ? (<Input type="time" value={profile.lunchEnd || ""}
                                    onChange={(e) => setProfile({ ...profile, lunchEnd: e.target.value })} />)
                                    : (<p>{profile.lunchEnd}</p>)}
                            </div>
                        </div>

                    </div>

                    {/* Sunday Slot Settings */}

                    <div className="rounded-xl border bg-card">

                        <div className="border-b p-5">

                            <h2 className="font-semibold">
                                Sunday Duty & Slot Settings
                            </h2>

                        </div>

                        <div className="p-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            <div>

                                <label className="text-xs text-muted-foreground">
                                    Sunday Start
                                </label>

                                {editing ? (

                                    <Input
                                        type="time"
                                        value={profile.sundayStart || ""}
                                        onChange={(e) => setProfile({ ...profile, sundayStart: e.target.value })}
                                    />

                                ) : (

                                    <p>{profile.sundayStart}</p>

                                )}

                            </div>

                            <div>

                                <label className="text-xs text-muted-foreground">
                                    Sunday End
                                </label>

                                {editing ? (

                                    <Input
                                        type="time"
                                        value={profile.sundayEnd || ""}
                                        onChange={(e) => setProfile({ ...profile, sundayEnd: e.target.value })}
                                    />

                                ) : (

                                    <p>{profile.sundayEnd}</p>

                                )}

                            </div>

                            <div>

                                <label className="text-xs text-muted-foreground">
                                    Max Patients / Slot
                                </label>

                                {editing ? (

                                    <Input
                                        type="number"
                                        value={profile.maxPatientsPerSlot || ""}
                                        onChange={(e) => setProfile({ ...profile, maxPatientsPerSlot: e.target.value })}
                                    />

                                ) : (

                                    <p>{profile.maxPatientsPerSlot}</p>

                                )}

                            </div>

                            <div>
                                <label className="text-xs text-muted-foreground"> Slot Duration </label>

                                {editing ? (
                                    <Input
                                        type="number"
                                        value={profile.slotDuration || ""}
                                        onChange={(e) =>
                                            setProfile({ ...profile, slotDuration: e.target.value })
                                        }
                                    />
                                ) : (
                                    <p>{profile.slotDuration} minutes</p>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* Appointments */}

                    <div className="rounded-xl border bg-card overflow-hidden">

                        <div className="border-b p-5">

                            <h2 className="font-semibold">
                                My Appointments
                            </h2>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead>

                                    <tr className="border-b bg-muted/50">

                                        <th className="px-4 py-3 text-left text-muted-foreground">
                                            Patient
                                        </th>

                                        <th className="px-4 py-3 text-left text-muted-foreground hidden md:table-cell">
                                            Problem
                                        </th>

                                        <th className="px-4 py-3 text-left text-muted-foreground">
                                            Date
                                        </th>

                                        <th className="px-4 py-3 text-left text-muted-foreground">
                                            Time
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y">

                                    {appointments.map((apt, i) => (

                                        <tr key={i}>

                                            <td className="px-4 py-3">

                                                <p className="font-medium">
                                                    {apt.patientName}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    Age: {apt.age}
                                                </p>

                                            </td>

                                            <td className="px-4 py-3 hidden md:table-cell text-xs text-muted-foreground">
                                                {apt.problem}
                                            </td>

                                            <td className="px-4 py-3">
                                                {apt.date}
                                            </td>

                                            <td className="px-4 py-3">
                                                {apt.time}
                                            </td>

                                        </tr>

                                    ))}

                                    {appointments.length === 0 && (

                                        <tr>

                                            <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                                                No appointments found
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* Leave Section */}

                    <div className="rounded-xl border bg-card">

                        <div className="border-b p-5 flex items-center gap-2">

                            <CalendarPlus className="h-4 w-4" />

                            <h2 className="font-semibold">
                                Doctor Leaves
                            </h2>

                        </div>

                        <div className="p-5 space-y-4">

                            <div className="flex gap-3">

                                <Input
                                    type="date"
                                    value={newLeave}
                                    onChange={(e) => setNewLeave(e.target.value)}
                                />

                                <Button onClick={addLeave}>
                                    Add Leave
                                </Button>

                            </div>

                            {profile.leaves?.map((leave, index) => (

                                <div key={index} className="flex justify-between border p-3 rounded-lg">

                                    <span>
                                        {new Date(leave).toLocaleDateString()}
                                    </span>

                                    <Button size="sm" variant="ghost" onClick={() => removeLeave(index)}> <Trash2 className="h-4 w-4 text-red-500" /> </Button>

                                </div>

                            ))}

                        </div>

                    </div>

                </main>

            </div>

        </div>

    );

}
