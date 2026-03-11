import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";

import { CalendarPlus, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function AppointmentPage() {

  const [submitted, setSubmitted] = useState(false);

  /* doctors from database */
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    department: "",
    doctor: "",
    problem: "",
    date: "",
    time: ""
  });

  /* ===============================
  FETCH DOCTORS FROM MONGODB
  =============================== */
  useEffect(() => {

    const fetchDoctors = async () => {

      try {

        const res = await fetch("http://localhost:5000/api/ui/doctors");

        const data = await res.json();

        setDoctors(data);

        /* extract specialization as departments */

        const specs = [...new Set(data.map(d => d.specialization))];

        setDepartments(specs);

      } catch (err) {

        console.error(err);

        toast.error("Failed to load doctors");

      }

    };

    fetchDoctors();

  }, []);

  /* ===============================
  FORM CHANGE
  =============================== */

  const handleChange = (field, value) => {

    setForm({
      ...form,
      [field]: value
    });

  };

  /* ===============================
  SUBMIT APPOINTMENT
  =============================== */

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const res = await fetch("http://localhost:5000/api/ui/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: form.name,
        age: form.age,
        phone: form.phone,
        doctor: form.doctor,
        department: form.department,
        problem: form.problem,
        date: new Date(`${form.date}T${form.time}`)
      })
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Booking failed");
      return;
    }

    /* clear form */
    setForm({
      name: "",
      age: "",
      phone: "",
      doctor: "",
      department: "",
      problem: "",
      date: "",
      time: ""
    });

    setSubmitted(true);

    toast.success("Appointment booked successfully!");

  } catch (err) {

    toast.error("Server error");

  }

};
  /* ===============================
  SUCCESS SCREEN
  =============================== */

  if (submitted) {

    return (

      <div className="min-h-screen bg-background">

        <Navbar />

        <div className="flex items-center justify-center py-32">

          <div className="text-center max-w-md">

            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-medical-green-light mb-6">
              <CheckCircle className="h-8 w-8 text-medical-green" />
            </div>

            <h2 className="font-display text-2xl font-bold">
              Appointment Booked!
            </h2>

            <p className="mt-3 text-muted-foreground">
              Your appointment has been scheduled.
            </p>

            <Button
              onClick={() => setSubmitted(false)}
              className="mt-6 gradient-hero border-0 text-primary-foreground"

            >

              Book Another

            </Button>

          </div>

        </div>

        <Footer />

      </div>

    );

  }

  /* ===============================
  FORM UI
  =============================== */

  return (

    <div className="min-h-screen bg-background">

      <Navbar />

      <section className="gradient-hero py-16 text-center text-primary-foreground">

        <h1 className="font-display text-4xl font-bold">
          Book an Appointment
        </h1>

        <p className="mt-3 text-primary-foreground/70">
          Schedule your visit with our doctors
        </p>

      </section>

      <section className="py-16">

        <div className="container mx-auto px-4 max-w-2xl">

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border bg-card p-6 shadow-card space-y-5"
          >

            <div className="grid gap-5 sm:grid-cols-2">

              <Input
                placeholder="Patient Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />

              <Input
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={(e) => handleChange("age", e.target.value)}
                required
              />

            </div>

            <Input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />

            <Select
              onValueChange={(value) => {

                const selectedDoctor = doctors.find(d => d.name === value);

                setForm({
                  ...form,
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
              value={form.department}
              placeholder="Department"
              readOnly
            />
         

            <div className="grid gap-5 sm:grid-cols-2">

              <Input
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />

              <Input
                type="time"
                value={form.time}
                onChange={(e) => handleChange("time", e.target.value)}
                required
              />

            </div>

            <Textarea
              placeholder="Describe problem"
              value={form.problem}
              onChange={(e) => handleChange("problem", e.target.value)}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full gradient-hero border-0 text-primary-foreground"
            >

              <CalendarPlus className="h-5 w-5 mr-2" />

              Book Appointment

            </Button>

          </form>

        </div>

      </section>

      <Footer />

    </div>

  );

}
