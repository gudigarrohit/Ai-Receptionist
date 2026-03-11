import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import {
  ClipboardList,
  CalendarDays,
  Users,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Search,Clock,
  Plus,Phone
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";

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

import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 }
  })
};

export default function ReceptionistDashboard() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [aptList, setAptList] = useState([]);

  const [doctors, setDoctors] = useState([]);

  const [departments, setDepartments] = useState([]);

  const [newApt, setNewApt] = useState({
    patientName: "",
    age: "",
    phone: "",
    doctor: "",
    department: "",
    date: "",
    time: "",
    problem: ""
  });

  /* ===============================
  FETCH DATA
  =============================== */

  useEffect(() => {

    fetchAppointments();
    fetchDoctors();

  }, []);

  const fetchAppointments = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/ui/appointments");

      const data = await res.json();

      const formatted = data.map((a) => {

        const d = new Date(a.date);

        return {
          id: a._id,
          patientName: a.name,
          age: a.age,
          phone: a.phone,
          doctor: a.doctor,
          department: a.specialization,
          date: d.toLocaleDateString(),
          time: d.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),
          problem: a.problem,
          status: "confirmed"
        };

      });

      setAptList(formatted);

    } catch (err) {

      console.error(err);

    }

  };

  const fetchDoctors = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/ui/doctors");

      const data = await res.json();

      setDoctors(data);
      const specs = [...new Set(data.map(d => d.specialization))];

      setDepartments(specs);

    } catch (err) {

      console.error(err);

    }

  };


  /* ===============================
  SEARCH FILTER
  =============================== */

  const filtered = aptList.filter(a =>

    a.patientName?.toLowerCase().includes(search.toLowerCase()) ||
    a.doctor?.toLowerCase().includes(search.toLowerCase())

  );

  /* ===============================
  UPDATE STATUS
  =============================== */

  const updateStatus = (id, status) => {

    setAptList(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status } : a
      )
    );

    toast.success(`Appointment ${status}`);

  };

  /* ===============================
  CREATE APPOINTMENT
  =============================== */

  const handleNewAppointment = async () => {

    if (!newApt.patientName || !newApt.doctor || !newApt.date) {

      toast.error("Please fill required fields");

      return;

    }

    try {

      const res = await fetch("http://localhost:5000/api/appointments/book", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          name: newApt.patientName,
          age: newApt.age,
          phone: newApt.phone,
          doctor: newApt.doctor,
          problem: newApt.problem,
          date: new Date(`${newApt.date}T${newApt.time}`)

        })

      });

      const data = await res.json();

      if (!res.ok) {

        toast.error(data.message || "Booking failed");

        return;

      }

      toast.success("Appointment created successfully");

      fetchAppointments();

      setNewApt({
        patientName: "",
        age: "",
        phone: "",
        doctor: "",
        department: "",
        date: "",
        time: "",
        problem: ""
      });

    } catch (err) {

      toast.error("Server error");

    }

  };

  /* ===============================
  UI
  =============================== */

  return (

    <div className="flex h-screen bg-background">

      {/* Sidebar */}

      <aside className="hidden w-64 border-r bg-card lg:flex lg:flex-col">

        <Link to="/">

          <div className="flex h-16 items-center gap-2 border-b px-4">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(250,60%,55%)]">

              <ClipboardList className="h-4 w-4 text-primary-foreground" />

            </div>

            <span className="font-display text-lg font-bold">
              Reception
            </span>

          </div>

        </Link>

        <nav className="flex-1 p-3 space-y-1">

          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium bg-primary text-primary-foreground">

            <CalendarDays className="h-4 w-4" />

            <span>Appointments</span>

          </div>

          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary cursor-pointer">

            <Users className="h-4 w-4" />

            <span>Patients</span>

          </div>

            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary cursor-pointer">

            <Users className="h-4 w-4" />

            <span>Doctors</span>

          </div>

            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary cursor-pointer">

            <Phone className="h-4 w-4" />

            <span>Phone No</span>

          </div>
            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary cursor-pointer">

            <CalendarDays className="h-4 w-4" />

            <span>Date</span>

          </div>
            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary cursor-pointer">

            <Clock className="h-4 w-4" />

            <span>Time</span>

          </div>

        </nav>

        <div className="border-t p-3">

          <button

            onClick={() => {

              toast.info("Logged out");

              navigate("/receptionist-login");

            }}

            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"

          >

            <LogOut className="h-4 w-4" />

            Logout

          </button>

        </div>

      </aside>

      {/* Main */}

      <div className="flex flex-1 flex-col overflow-hidden">

        <header className="flex h-16 items-center justify-between border-b bg-card px-6">

          <h1 className="text-xl font-bold">
            Receptionist Dashboard
          </h1>

        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Stats */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {[

              {
                label: "Total Appointments",
                value: aptList.length,
                icon: ClipboardList
              },

              {
                label: "Confirmed",
                value: aptList.filter(a => a.status === "confirmed").length,
                icon: CheckCircle2
              },

              {
                label: "Pending",
                value: aptList.filter(a => a.status === "pending").length,
                icon: AlertCircle
              }

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

                <p className="text-2xl font-bold">
                  {stat.value}
                </p>

                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>

              </motion.div>

            ))}

          </div>

          {/* Search + New Appointment */}

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

            <Dialog>

              <DialogTrigger asChild>

                <Button className="gap-2">

                  <Plus className="h-4 w-4" />

                  New Appointment

                </Button>

              </DialogTrigger>

              <DialogContent>

                <DialogHeader>

                  <DialogTitle>
                    New Appointment
                  </DialogTitle>

                </DialogHeader>

                <div className="space-y-3 mt-2">

                  <Input

                    placeholder="Patient Name"

                    value={newApt.patientName}

                    onChange={(e) => setNewApt({ ...newApt, patientName: e.target.value })}

                  />

                  <div className="grid grid-cols-2 gap-3">

                    <Input

                      placeholder="Age"

                      type="number"

                      value={newApt.age}

                      onChange={(e) => setNewApt({ ...newApt, age: e.target.value })}

                    />

                    <Input

                      placeholder="Phone"

                      value={newApt.phone}

                      onChange={(e) => setNewApt({ ...newApt, phone: e.target.value })}

                    />

                  </div>

                  <Select
                    value={newApt.doctor}
                    onValueChange={(value) => {

                      const selectedDoctor = doctors.find(d => d.name === value);

                      setNewApt({
                        ...newApt,
                        doctor: value,
                        department: selectedDoctor?.specialization || ""
                      });

                    }}
                  >

                    <SelectTrigger>
                      <SelectValue placeholder="Select Doctor" />
                    </SelectTrigger>

                    <SelectContent>

                      {doctors.map((d) => (
                        <SelectItem key={d._id} value={d.name}>
                          {d.name}
                        </SelectItem>
                      ))}

                    </SelectContent>

                  </Select>

                  <Input
                    value={newApt.department}
                    placeholder="Department"
                    readOnly
                  />
                  <div className="grid grid-cols-2 gap-3">

                    <Input

                      type="date"

                      value={newApt.date}

                      onChange={(e) => setNewApt({ ...newApt, date: e.target.value })}

                    />

                    <Input

                      type="time"

                      value={newApt.time}

                      onChange={(e) => setNewApt({ ...newApt, time: e.target.value })}

                    />

                  </div>

                  <Input

                    placeholder="Problem"

                    value={newApt.problem}

                    onChange={(e) => setNewApt({ ...newApt, problem: e.target.value })}

                  />

                  <Button

                    onClick={handleNewAppointment}

                    className="w-full"

                  >

                    Create Appointment

                  </Button>

                </div>

              </DialogContent>

            </Dialog>

          </div>

          {/* Appointments Table */}

          <div className="rounded-xl border overflow-hidden">

            <table className="w-full text-sm">

              <thead>

                <tr className="border-b bg-muted/50">

                  <th className="px-4 py-3 text-left">Patient</th>

                  <th className="px-4 py-3 text-left">Doctor</th>

                  <th className="px-4 py-3 text-left">Phone</th>

                  <th className="px-4 py-3 text-left">Date</th>

                  <th className="px-4 py-3 text-left">Time</th>

                  <th className="px-4 py-3 text-left">Status</th>

                </tr>

              </thead>

              <tbody>

                {filtered.map((apt, i) => (

                  <tr key={apt.id}>

                    <td className="px-4 py-3">

                      <p className="font-medium">{apt.patientName}</p>

                      <p className="text-xs text-muted-foreground">
                        Age: {apt.age}
                      </p>

                    </td>

                    <td className="px-4 py-3">
                      {apt.doctor}
                    </td>

                    <td className="px-4 py-3">
                      {apt.phone}
                    </td>

                    <td className="px-4 py-3">
                      {apt.date}
                    </td>

                    <td className="px-4 py-3">
                      {apt.time}
                    </td>

                    <td className="px-4 py-3">

                      <Badge>

                        {apt.status}

                      </Badge>

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
