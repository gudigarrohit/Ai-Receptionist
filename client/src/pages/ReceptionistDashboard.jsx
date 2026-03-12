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
  Plus,Phone,Clock,Users,Activity
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

/* animation */
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

  /* =======================================
     FETCH DATA
  ======================================= */

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
          department: a.department,
          date: d.toISOString().split("T")[0],
          time: d.toTimeString().slice(0, 5),
          problem: a.problem,
          status: "confirmed"
        };

      });

      setAptList(formatted);

    } catch (err) {

      console.error(err);
      toast.error("Failed to load appointments");

    }

  };

  const fetchDoctors = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/ui/doctors");

      const data = await res.json();

      setDoctors(data);

    } catch (err) {

      console.error(err);
      toast.error("Failed to load doctors");

    }

  };

  /* =======================================
     SEARCH FILTER
  ======================================= */

  const filtered = aptList.filter(a =>
    a.patientName.toLowerCase().includes(search.toLowerCase()) ||
    a.doctor.toLowerCase().includes(search.toLowerCase())
  );

  /* =======================================
     CREATE APPOINTMENT
  ======================================= */

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

  /* =======================================
     UPDATE APPOINTMENT
  ======================================= */

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

  /* =======================================
     SAVE (CREATE / UPDATE)
  ======================================= */

  const handleSave = async () => {

    if (!form.patientName || !form.phone || !form.doctor || !form.date || !form.time) {
      toast.error("Please fill required fields");
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

  /* =======================================
     EDIT LOAD
  ======================================= */

  const editAppointment = (apt) => {

    setEditingId(apt.id);

    setForm({
      patientName: apt.patientName,
      age: apt.age,
      phone: apt.phone,
      doctor: apt.doctor,
      department: apt.department,
      date: apt.date,
      time: apt.time,
      problem: apt.problem
    });

    setDialogOpen(true);

  };

  /* =======================================
     CANCEL (DELETE)
  ======================================= */

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

  /* =======================================
     UI
  ======================================= */

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

            <Activity className="h-4 w-4" />

            <span>Department</span>

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
               <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary cursor-pointer">

            <Activity className="h-4 w-4" />

            <span>Problem</span>

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

      <div className="flex flex-1 flex-col">

        <header className="border-b px-6 py-4 font-bold">
          Receptionist Dashboard
        </header>

        <main className="flex-1 p-6 space-y-6">

          {/* Stats */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {[
              { label: "Total Appointments", value: aptList.length, icon: ClipboardList },
              { label: "Confirmed", value: aptList.length, icon: CheckCircle2 },
              { label: "Today's Cancelled Appointments", value: cancelCount, icon: AlertCircle }
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

                <p className="text-sm text-muted-foreground">{stat.label}</p>

              </motion.div>

            ))}

          </div>

          {/* Search + Create */}

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

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>

              <DialogTrigger asChild>

                <Button className="gap-2">

                  <Plus className="h-4 w-4" />

                  New Appointment

                </Button>

              </DialogTrigger>

              <DialogContent>

                <DialogHeader>
                  <DialogTitle>{editingId ? "Update Appointment" : "New Appointment"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-3">

                  <Input
                    placeholder="Patient Name"
                    value={form.patientName}
                    onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                  />

                  <Input
                    placeholder="Age"
                    type="number"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                  />

                  <Input
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />

                  <Select
                    value={form.doctor}
                    onValueChange={(value) => {

                      const doc = doctors.find(d => d.name === value);

                      setForm({
                        ...form,
                        doctor: value,
                        department: doc?.specialization || ""
                      });

                    }}
                  >

                    <SelectTrigger>
                      <SelectValue placeholder="Select Doctor" />
                    </SelectTrigger>

                    <SelectContent>

                      {doctors.map(d => (
                        <SelectItem key={d._id} value={d.name}>
                          {d.name}
                        </SelectItem>
                      ))}

                    </SelectContent>

                  </Select>

                  <Input value={form.department} readOnly placeholder="Department" />

                  <div className="grid grid-cols-2 gap-3">

                    <Input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />

                    <Input
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                    />

                  </div>

                  <Input
                    placeholder="Problem"
                    value={form.problem}
                    onChange={(e) => setForm({ ...form, problem: e.target.value })}
                  />

                  <Button onClick={handleSave} className="w-full">

                    {editingId ? "Update Appointment" : "Create Appointment"}

                  </Button>

                </div>

              </DialogContent>

            </Dialog>

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
                  <th className="px-4 py-3 text-left">Date & Time</th>
                  <th className="px-4 py-3 text-left">Problem</th>
                  <th className="px-4 py-3 text-left">Actions</th>

                </tr>

              </thead>

              <tbody>

                {filtered.map((apt) => (
                  <tr key={apt.id}>

                    <td className="px-4 py-3">
                      <p className="font-medium">{apt.patientName}</p>
                      <p className="text-xs">Age: {apt.age}</p>
                    </td>

                    <td className="px-4 py-3">{apt.doctor}</td>

                    <td className="px-4 py-3">{apt.department}</td>

                    <td className="px-4 py-3">{apt.phone}</td>

                    <td className="px-4 py-3">
                      {apt.date} {apt.time}
                    </td>

                    <td className="px-4 py-3">
                      {apt.problem || "-"}
                    </td>

                    <td className="px-4 py-3 flex gap-2">

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => editAppointment(apt)}
                      >
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