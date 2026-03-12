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

/* Animation */
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
  const receptionistId = localStorage.getItem("receptionistId");

  /* ================= PROFILE ================= */

  const [profile, setProfile] = useState({});
  const [editingProfile, setEditingProfile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {

    // Redirect if user not logged in
    if (!receptionistId) {
      toast.error("Session expired. Please login again.");
      navigate("/receptionist-login");
      return;
    }

    const fetchProfile = async () => {

      try {

        const res = await fetch(
          `http://localhost:5000/api/receptionists/${receptionistId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();

        setProfile(data);

      } catch (error) {

        console.error(error);
        toast.error("Failed to load profile");

      }

    };

    fetchProfile();

  }, [receptionistId, navigate]);

  const saveProfile = async () => {

    try {

      const res = await fetch(
        `http://localhost:5000/api/receptionists/${receptionistId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile)
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      const data = await res.json();

      setProfile(data);

      toast.success("Profile updated");

      setEditingProfile(false);

    } catch (error) {

      console.error(error);

      toast.error("Update failed");

    }

  };

  /* ================= APPOINTMENTS ================= */

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
          problem: a.problem
        };
      });

      setAptList(formatted);
    } catch {
      toast.error("Failed to load appointments");
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/ui/doctors");
      const data = await res.json();
      setDoctors(data);
    } catch {
      toast.error("Failed to load doctors");
    }
  };

  /* ================= SEARCH ================= */

  const filtered = aptList.filter(
    (a) =>
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= CREATE ================= */

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

  /* ================= UPDATE ================= */

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

  /* ================= SAVE ================= */

  const handleSave = async () => {
    if (!form.patientName || !form.phone || !form.doctor || !form.date) {
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

  /* ================= EDIT LOAD ================= */

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

  /* ================= DELETE ================= */

  const cancelAppointment = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/ui/appointments/${id}`, {
        method: "DELETE"
      });

      setCancelCount((prev) => prev + 1);
      toast.success("Appointment cancelled");
      fetchAppointments();
    } catch {
      toast.error("Cancel failed");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="flex h-screen bg-background">
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
        <Link to="/" onClick={() => setMobileOpen(false)}>
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
              setMobileOpen(false);
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

        {/* Navbar */}

        <header className="flex items-center justify-between border-b px-4 py-3 lg:px-6">

          {/* Hamburger */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 hover:bg-secondary lg:hidden"
          >
            <ClipboardList className="h-5 w-5" />
          </button>

          <h1 className="font-bold text-lg">
            Receptionist Dashboard
          </h1>

          {/* Profile */}

          <div className="flex items-center gap-8">

            <div className="flex items-center gap-4">

              <div className="text-right hidden sm:block">
                <p className="font-medium">{profile.name}</p>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(250,60%,55%)] text-white font-bold">
                {profile.name?.split(" ").map(n => n[0]).join("")}
              </div>

            </div>
            {/* Logout */}

            <button
              onClick={() => {
                setMobileOpen(false);
                localStorage.removeItem("receptionistId");
                toast.info("Logged out");
                navigate("/receptionist-login");
              }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>

        </header>

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">

          {/* Profile Card */}

          <div className="rounded-xl border bg-card">

            <div className="flex justify-between border-b p-5">

              <h2 className="font-semibold">Receptionist Profile</h2>

              {editingProfile ? (
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setEditingProfile(false)}>
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>

                  <Button size="sm" onClick={saveProfile}>
                    <Save className="h-4 w-4 mr-1" /> Save
                  </Button>
                </div>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setEditingProfile(true)}>
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
              )}

            </div>

            <div className="p-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {/* Name */}

              <div>
                <label className="text-xs text-muted-foreground">Name</label>

                {editingProfile ? (
                  <Input
                    value={profile.name || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                ) : (
                  <p>{profile.name}</p>
                )}
              </div>


              {/* Phone */}

              <div>
                <label className="text-xs text-muted-foreground">Phone</label>

                {editingProfile ? (
                  <Input
                    value={profile.phone || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                ) : (
                  <p>{profile.phone}</p>
                )}
              </div>


              {/* Address */}

              <div>
                <label className="text-xs text-muted-foreground">Address</label>

                {editingProfile ? (
                  <Input
                    value={profile.address || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                  />
                ) : (
                  <p>{profile.address}</p>
                )}
              </div>


              {/* Gender */}

              <div>
                <label className="text-xs text-muted-foreground">Gender</label>

                {editingProfile ? (

                  <div className="flex gap-4 mt-1">

                    {["Male", "Female", "Other"].map((g) => (

                      <label key={g} className="flex items-center gap-1 text-sm">

                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={profile.gender === g}
                          onChange={(e) =>
                            setProfile({ ...profile, gender: e.target.value })
                          }
                        />

                        {g}

                      </label>

                    ))}

                  </div>

                ) : (
                  <p>{profile.gender}</p>
                )}
              </div>


              {/* Shift */}

              <div>
                <label className="text-xs text-muted-foreground">Shift</label>

                {editingProfile ? (

                  <select
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    value={profile.shift || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, shift: e.target.value })
                    }
                  >

                    <option value="">Select Shift</option>
                    <option value="Morning (8AM - 2PM)">Morning (8AM - 2PM)</option>
                    <option value="Afternoon (2PM - 8PM)">Afternoon (2PM - 8PM)</option>
                    <option value="Night (8PM - 8AM)">Night (8PM - 8AM)</option>

                  </select>

                ) : (
                  <p>{profile.shift}</p>
                )}
              </div>

            </div>

          </div>

          {/* Stats */}

          <div className="grid gap-4 sm:grid-cols-3">

            {[
              { label: "Total Appointments", value: aptList.length, icon: ClipboardList },
              { label: "Confirmed", value: aptList.length, icon: CheckCircle2 },
              { label: "Cancelled", value: cancelCount, icon: AlertCircle }
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

            {/* Dialog */}

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>

              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" /> New Appointment
                </Button>
              </DialogTrigger>

              <DialogContent>

                <DialogHeader>
                  <DialogTitle>
                    {editingId ? "Update Appointment" : "New Appointment"}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-3">

                  <Input
                    placeholder="Patient Name"
                    value={form.patientName}
                    onChange={(e) =>
                      setForm({ ...form, patientName: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Age"
                    type="number"
                    value={form.age}
                    onChange={(e) =>
                      setForm({ ...form, age: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />

                  <Select
                    value={form.doctor}
                    onValueChange={(value) => {
                      const doc = doctors.find((d) => d.name === value);

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

                      {doctors.map((d) => (
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
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                    />

                    <Input
                      type="time"
                      value={form.time}
                      onChange={(e) =>
                        setForm({ ...form, time: e.target.value })
                      }
                    />

                  </div>

                  <Input
                    placeholder="Problem"
                    value={form.problem}
                    onChange={(e) =>
                      setForm({ ...form, problem: e.target.value })
                    }
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

                    <td className="px-4 py-3">{apt.problem || "-"}</td>

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