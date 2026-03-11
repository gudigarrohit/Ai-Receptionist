import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/DashboardLayout";

import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../components/ui/dialog";

import { Search, Eye, Phone, Calendar, User } from "lucide-react";

export default function AdminPatients() {

  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);

  /* =========================
  FETCH PATIENT DATA
  ========================= */

  useEffect(() => {

    fetchPatients();

  }, []);

  const fetchPatients = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/ui/appointments");

      const data = await res.json();

      setPatients(data);

    } catch (err) {

      console.error(err);

    }

  };

  /* =========================
  SEARCH FILTER
  ========================= */

  const filtered = patients.filter(p =>

    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.phone?.includes(search) ||
    p.department?.toLowerCase().includes(search.toLowerCase())

  );

  return (

    <DashboardLayout>

      <div className="space-y-6">

        <div>

          <h1 className="font-display text-2xl font-bold text-foreground">
            Patients
          </h1>

          <p className="text-sm text-muted-foreground">
            View and manage patient records
          </p>

        </div>

        <div className="flex items-center gap-3">

          <div className="relative flex-1 max-w-sm">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />

          </div>

          <Badge variant="secondary">
            {filtered.length} patients
          </Badge>

        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>Patient</TableHead> <TableHead>Age</TableHead> <TableHead>Phone</TableHead> <TableHead>Department</TableHead> <TableHead>Doctor</TableHead> <TableHead>Actions</TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {filtered.map((patient) => (

                <TableRow key={patient._id}>

                  <TableCell className="font-medium text-foreground">
                    {patient.name}
                  </TableCell>

                  <TableCell>
                    {patient.age}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {patient.phone}
                  </TableCell>

                  <TableCell>

                    <Badge variant="outline">
                      {patient.department || "-"}
                    </Badge>

                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {patient.doctor}
                  </TableCell>

                  <TableCell>

                    <Dialog>

                      <DialogTrigger asChild>

                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>

                      </DialogTrigger>

                      <DialogContent>

                        <DialogHeader>

                          <DialogTitle className="font-display">
                            Patient Details
                          </DialogTitle>

                        </DialogHeader>

                        <div className="space-y-4 pt-2">

                          <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-hero text-primary-foreground font-display font-bold">

                              {patient.name
                                .split(" ")
                                .map(n => n[0])
                                .join("")}

                            </div>

                            <div>

                              <p className="font-display font-bold text-foreground">
                                {patient.name}
                              </p>

                              <p className="text-sm text-muted-foreground">
                                Age: {patient.age}
                              </p>

                            </div>

                          </div>

                          <div className="grid grid-cols-2 gap-3">

                            <InfoItem
                              icon={Phone}
                              label="Phone"
                              value={patient.phone}
                            />

                            <InfoItem
                              icon={Calendar}
                              label="Visit Date"
                              value={new Date(patient.date).toLocaleDateString()}
                            />

                            <InfoItem
                              icon={User}
                              label="Doctor"
                              value={patient.doctor}
                            />

                            <InfoItem
                              icon={User}
                              label="Department"
                              value={patient.department}
                            />

                          </div>

                          <div>

                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              Problem
                            </p>

                            <p className="text-sm text-foreground bg-secondary/50 rounded-lg p-3">
                              {patient.problem}
                            </p>

                          </div>

                        </div>

                      </DialogContent>

                    </Dialog>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </div>

      </div>

    </DashboardLayout>

  );

}

/* =========================
INFO CARD COMPONENT
========================= */

function InfoItem({ icon: Icon, label, value }) {

  return (

    <div className="rounded-lg border bg-secondary/30 p-3">

      <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">

        <Icon className="h-3.5 w-3.5" />

        <span className="text-xs font-medium">
          {label}
        </span>

      </div>

      <p className="text-sm font-medium text-foreground">
        {value}
      </p>

    </div>

  );

}
