import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "../components/DashboardLayout";

import {
  Users,
  CalendarDays,
  Stethoscope,
  Clock,
  ArrowUpRight
} from "lucide-react";

import { Badge } from "../components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 }
  })
};

export default function AdminDashboard() {

  const [appointments, setAppointments] = useState([]);
  const [emergencyAppointments, setEmergencyAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    emergencyCount: 0
  });

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
    fetchEmergencyAppointments();
  }, []);

  /* ===========================
  FETCH DOCTORS
  =========================== */

  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/ui/doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ===========================
  FETCH NORMAL APPOINTMENTS
  =========================== */

  const fetchAppointments = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/ui/appointments"
      );

      const data = await res.json();

      const formatted = data.map((a) => ({
        ...a,
        emergency: false
      }));

      setAppointments(formatted);

    } catch (err) {

      console.error(err);

    }

  };

  /* ===========================
  FETCH EMERGENCY APPOINTMENTS
  =========================== */

  const fetchEmergencyAppointments = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/ui/emergency/emergency-appointments-get"
      );

      const data = await res.json();

      const formatted = data.map((a) => ({
        ...a,
        emergency: true
      }));

      setEmergencyAppointments(formatted);

    } catch (err) {

      console.error(err);

    }

  };

  /* ===========================
  UPDATE STATS WHEN DATA CHANGES
  =========================== */

  useEffect(() => {

    const merged = [...appointments, ...emergencyAppointments];

    const today = new Date();
    today.setHours(0,0,0,0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayCount = merged.filter(a => {

      const d = new Date(a.date);

      return d >= today && d < tomorrow;

    }).length;

    setStats({

      totalPatients: merged.length,
      totalDoctors: doctors.length,
      totalAppointments: merged.length,
      todayAppointments: todayCount,
      emergencyCount: emergencyAppointments.length

    });

  }, [appointments, emergencyAppointments, doctors]);

  /* ===========================
  MERGE APPOINTMENTS
  =========================== */

  const mergedAppointments = [
    ...emergencyAppointments,
    ...appointments
  ];

  return (

    <DashboardLayout>

      <div className="space-y-6">

        <div>

          <h1 className="font-display text-2xl font-bold text-foreground">
            Dashboard
          </h1>

          <p className="text-sm text-muted-foreground">
            Welcome back! Here's your hospital overview.
          </p>

        </div>

        {/* ======================
        STAT CARDS
        ====================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          {[
            {
              label: "Total Patients",
              value: stats.totalPatients,
              icon: Users
            },

            {
              label: "Total Doctors",
              value: stats.totalDoctors,
              icon: Stethoscope
            },

            {
              label: "Appointments",
              value: stats.totalAppointments,
              icon: CalendarDays
            },

            {
              label: "Today's Appointments",
              value: stats.todayAppointments,
              icon: Clock
            },

            {
              label: "Emergency Cases",
              value: stats.emergencyCount,
              icon: Clock
            }

          ].map((stat, i) => (

            <motion.div
              key={stat.label}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={i}
              className="rounded-xl border bg-card p-5 shadow-card"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-medical-blue-light text-medical-blue">
                  <stat.icon className="h-5 w-5" />
                </div>

              </div>

              <p className="mt-3 font-display text-2xl font-bold text-foreground">
                {stat.value}
              </p>

              <p className="text-sm text-muted-foreground">
                {stat.label}
              </p>

            </motion.div>

          ))}

        </div>

        {/* ======================
        MAIN GRID
        ====================== */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* ======================
          RECENT APPOINTMENTS
          ====================== */}

          <div className="lg:col-span-2 rounded-xl border bg-card shadow-card">

            <div className="flex items-center justify-between border-b p-5">

              <h2 className="font-display font-semibold text-foreground">
                Recent Appointments
              </h2>

              <Badge variant="secondary" className="text-xs">
                {mergedAppointments.length} total
              </Badge>

            </div>

            <div className="divide-y">

              {mergedAppointments
                .sort((a, b) => (b.emergency ? 1 : 0) - (a.emergency ? 1 : 0))
                .slice(0, 5)
                .map((apt) => (

                <div
                  key={apt._id}
                  className={
                    apt.emergency
                      ? "flex items-center justify-between p-4 bg-red-50 hover:bg-red-100"
                      : "flex items-center justify-between p-4 hover:bg-muted/50"
                  }
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-hero text-sm font-semibold text-white">

                      {apt.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")}

                    </div>

                    <div>

                      <div className="flex items-center gap-2">

                        <p className="text-sm font-medium text-foreground">
                          {apt.name}
                        </p>

                        {apt.emergency && (
                          <Badge className="bg-red-100 text-red-600 text-[10px]">
                            🚨 Emergency
                          </Badge>
                        )}

                      </div>

                      <p className="text-xs text-muted-foreground">
                        {apt.doctor}
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-xs text-muted-foreground">

                      {new Date(apt.date).toLocaleDateString()}
                      {" at "}
                      {new Date(apt.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}

                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* ======================
          TOP DOCTORS
          ====================== */}

          <div className="space-y-6">

            <div className="rounded-xl border bg-card p-5 shadow-card">

              <h3 className="font-display font-semibold text-foreground mb-4">
                Top Doctors
              </h3>

              <div className="space-y-3">

                {doctors.slice(0, 3).map(doc => (

                  <div key={doc._id} className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-hero text-xs font-bold text-primary-foreground">

                      {doc.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")}

                    </div>

                    <div>

                      <p className="text-sm font-medium text-foreground">
                        {doc.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {doc.specialization}
                      </p>

                    </div>

                    <ArrowUpRight className="h-4 w-4 ml-auto text-muted-foreground" />

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}
