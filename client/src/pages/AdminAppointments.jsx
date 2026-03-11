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


  /* =========================
  FETCH APPOINTMENTS
  ========================= */

  useEffect(() => {

    fetchAppointments();

  }, []);

  const fetchAppointments = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/ui/appointments");

      const data = await res.json();

      setAptList(data);

    } catch (err) {

      console.error(err);
      toast.error("Failed to load appointments");

    }

  };

  /* =========================
  SEARCH FILTER
  ========================= */

  const filtered = aptList.filter(a =>

    a.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.doctor?.toLowerCase().includes(search.toLowerCase())

  );

  /* =========================
  EXPORT CSV
  ========================= */

  const exportCSV = () => {

    const headers =
      "Patient,Age,Phone,Doctor,Specialization,Date,Time,Problem\n";

    const rows = filtered.map(a => {

      const dateObj = new Date(a.date);

      const date = dateObj.toLocaleDateString();

      const time = dateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

      return `${a.name},${a.age},${a.phone},${a.doctor},${a.specialization || ""},${date},${time},"${a.problem}"`;

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

                {filtered.map((apt, i) => {

                  const dateObj = new Date(apt.date);

                  const date = dateObj.toLocaleDateString();

                  const time = dateObj.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  });

                  return (

                    <motion.tr
                      key={apt._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-muted/30 transition-colors"

                    >

                      <td className="px-4 py-3">

                        <p className="font-medium">
                          {apt.name}
                        </p>

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
