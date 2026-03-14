import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "../components/DashboardLayout";

import { Search, Download } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { toast } from "sonner";

export default function AdminAppointments() {

  const [search, setSearch] = useState("");
  const [aptList, setAptList] = useState([]);
  const [emergencyList, setEmergencyList] = useState([]);

  /* =========================
  FETCH NORMAL APPOINTMENTS
  ========================= */

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

      setAptList(formatted);

    } catch (err) {

      console.error(err);
      toast.error("Failed to load appointments");

    }

  };

  /* =========================
  FETCH EMERGENCY APPOINTMENTS
  ========================= */

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

      setEmergencyList(formatted);

    } catch (err) {

      console.error(err);
      toast.error("Failed to load emergency appointments");

    }

  };

  /* =========================
  INITIAL LOAD
  ========================= */

  useEffect(() => {

    fetchAppointments();
    fetchEmergencyAppointments();

  }, []);

  /* =========================
  MERGE BOTH
  ========================= */

  const mergedAppointments = [
    ...emergencyList,
    ...aptList
  ];

  /* =========================
  SEARCH FILTER
  ========================= */

  const filtered = mergedAppointments.filter(a =>

    a.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.doctor?.toLowerCase().includes(search.toLowerCase())

  );

  /* =========================
  EXPORT CSV
  ========================= */

  const exportCSV = () => {

    const headers =
      "Patient,Age,Phone,Doctor,Department,Date,Time,Problem,Emergency\n";

    const rows = filtered.map(a => {

      const dateObj = new Date(a.date);

      const date = dateObj.toLocaleDateString();

      const time = dateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

      return `${a.name},${a.age},${a.phone},${a.doctor},${a.department || ""},${date},${time},"${a.problem}",${a.emergency ? "YES" : "NO"}`;

    }).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "appointments.csv";
    link.click();

    toast.success("Appointments exported!");

  };

  return (

    <DashboardLayout>

      <div className="space-y-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="font-display text-2xl font-bold">
              Appointments
            </h1>

            <p className="text-sm text-muted-foreground">
              Manage all patient appointments
            </p>

          </div>

          <Button
            onClick={exportCSV}
            variant="outline"
            className="gap-2"
          >

            <Download className="h-4 w-4" />
            Export CSV

          </Button>

        </div>

        <div className="relative max-w-md">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search patients or doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />

        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>

                <tr className="border-b bg-muted/50">

                  <th className="px-4 py-3 text-left">
                    Patient
                  </th>

                  <th className="px-4 py-3 text-left hidden md:table-cell">
                    Doctor
                  </th>

                  <th className="px-4 py-3 text-left hidden lg:table-cell">
                    Department
                  </th>

                  <th className="px-4 py-3 text-left">
                    Date & Time
                  </th>

                  <th className="px-4 py-3 text-left">
                    Description
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y">

                {filtered
                  .sort((a, b) => (b.emergency ? 1 : 0) - (a.emergency ? 1 : 0))
                  .map((apt, i) => {

                    const dateObj = new Date(apt.date);

                    const date = dateObj.toLocaleDateString();

                    const time = dateObj.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    });

                    return (

                      <motion.tr
                        key={apt._id || i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={
                          apt.emergency
                            ? "bg-red-50 hover:bg-red-100 transition-colors"
                            : "hover:bg-muted/30 transition-colors"
                        }
                      >

                        <td className="px-4 py-3">

                          <div className="flex items-center gap-2">

                            <p className="font-medium">
                              {apt.name}
                            </p>

                            {apt.emergency && (
                              <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                                🚨 EMERGENCY
                              </span>
                            )}

                          </div>

                          <p className="text-xs text-muted-foreground">
                            Age: {apt.age} · Phone: {apt.phone}
                          </p>

                        </td>

                        <td className="px-4 py-3 hidden md:table-cell">
                          {apt.doctor}
                        </td>

                        <td className="px-4 py-3 hidden lg:table-cell">
                          {apt.department || "-"}
                        </td>

                        <td className="px-4 py-3">
                          {date} & {time}
                        </td>

                        <td className="px-4 py-3 w-1/3">
                          {apt.description || apt.problem || "-"}
                        </td>

                      </motion.tr>

                    );

                  })}

                {filtered.length === 0 && (

                  <tr>

                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">

                      No appointments found

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}
