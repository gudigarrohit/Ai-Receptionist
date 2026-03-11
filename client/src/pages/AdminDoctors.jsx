import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "../components/DashboardLayout";

import { Search, Plus, Edit, Trash2, Star, Save } from "lucide-react";

import { Button } from "../components/ui/button";
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
  DialogTitle
} from "../components/ui/dialog";

import { toast } from "sonner";

const emptyDoctor = {
  name: "",
  specialization: "",
  experience: "",
  fee: "",
  availability: ""
};

export default function AdminDoctors() {

  const [doctorList, setDoctorList] = useState([]);

  const [search, setSearch] = useState("");

  const [editingDoctor, setEditingDoctor] = useState(null);

  const [isNew, setIsNew] = useState(false);

  /* =============================
  FETCH DOCTORS FROM MONGODB
  ============================= */

  useEffect(() => {

    fetchDoctors();

  }, []);

  const fetchDoctors = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/ui/doctors");

      const data = await res.json();

      setDoctorList(data);

    } catch (err) {

      console.error(err);

      toast.error("Failed to load doctors");

    }

  };

  /* =============================
  SEARCH FILTER
  ============================= */

  const filtered = doctorList.filter(d =>

    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    (d.specialization || "")
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  /* =============================
  OPEN MODALS
  ============================= */

  const openNew = () => {

    setEditingDoctor({ ...emptyDoctor });

    setIsNew(true);

  };

  const openEdit = (doc) => {

    setEditingDoctor({ ...doc });

    setIsNew(false);

  };

  /* =============================
  SAVE DOCTOR
  ============================= */

  const handleSave = async () => {

    try {

      if (!editingDoctor?.name) {
        toast.error("Doctor name required");
        return;
      }

      if (isNew) {

        const res = await fetch(
          "http://localhost:5000/api/ui/doctors",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(editingDoctor)
          });

        const data = await res.json();

        setDoctorList(prev => [...prev, data]);

        toast.success("Doctor added successfully");

      } else {

        const res = await fetch(
          `http://localhost:5000/api/ui/doctors/${editingDoctor._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(editingDoctor)
          });

        const data = await res.json();

        setDoctorList(prev =>
          prev.map(d =>
            d._id === data._id ? data : d
          )
        );

        toast.success("Doctor updated successfully");

      }

      setEditingDoctor(null);

    } catch (err) {

      console.error(err);

      toast.error("Save failed");

    }

  };

  /* =============================
  DELETE DOCTOR
  ============================= */

  const handleDelete = async (id) => {

    try {

      await fetch(
        `http://localhost:5000/api/ui/doctors/${id}`,
        { method: "DELETE" }
      );

      setDoctorList(prev =>
        prev.filter(d => d._id !== id)
      );

      toast.success("Doctor removed");

    } catch (err) {

      toast.error("Delete failed");

    }

  };

  return (

    <DashboardLayout>

      <div className="space-y-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="font-display text-2xl font-bold">
              Doctors
            </h1>

            <p className="text-sm text-muted-foreground">
              Manage hospital doctors
            </p>

          </div>

          <Dialog
            open={editingDoctor !== null}
            onOpenChange={(open) => {
              if (!open) setEditingDoctor(null);
            }}
          >

            <Button
              onClick={openNew}
              className="gradient-hero border-0 text-primary-foreground gap-2"

            >

              <Plus className="h-4 w-4" /> Add Doctor

            </Button>

            <DialogContent className="max-w-lg">

              <DialogHeader>

                <DialogTitle>
                  {isNew ? "Add New Doctor" : "Edit Doctor"}
                </DialogTitle>

              </DialogHeader>

              {editingDoctor && (

                <div className="space-y-3 mt-2">

                  <Input
                    placeholder="Full Name"
                    value={editingDoctor.name || ""}
                    onChange={(e) =>
                      setEditingDoctor({
                        ...editingDoctor,
                        name: e.target.value
                      })
                    }
                  />

                  <Input
                    placeholder="Specialization"
                    value={editingDoctor.specialization || ""}
                    onChange={(e) =>
                      setEditingDoctor({
                        ...editingDoctor,
                        specialization: e.target.value
                      })
                    }
                  />

                  <div className="grid grid-cols-2 gap-3">

                    <Input
                      placeholder="Experience (years)"
                      type="number"
                      value={editingDoctor.experience || ""}
                      onChange={(e) =>
                        setEditingDoctor({
                          ...editingDoctor,
                          experience: e.target.value
                        })
                      }
                    />

                    <Input
                      placeholder="Fee (Rupees)"
                      type="number"
                      value={editingDoctor.fee || ""}
                      onChange={(e) =>
                        setEditingDoctor({
                          ...editingDoctor,
                          fee: e.target.value
                        })
                      }
                    />

                  </div>

                  <Input
                    placeholder="Availability"
                    value={editingDoctor.availability || ""}
                    onChange={(e) =>
                      setEditingDoctor({
                        ...editingDoctor,
                        availability: e.target.value
                      })
                    }
                  />

                  <Button
                    onClick={handleSave}
                    className="w-full gradient-hero border-0 text-primary-foreground"

                  >

                    <Save className="h-4 w-4 mr-2" />

                    {isNew ? "Add Doctor" : "Update Doctor"}

                  </Button>

                </div>

              )}

            </DialogContent>

          </Dialog>

        </div>

        <div className="relative max-w-md">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />

          <Input
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />

        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {filtered.map((doc, i) => (

            <motion.div
              key={doc._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card p-5 shadow-card"

            >

              <div className="flex items-start gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-hero text-white font-bold">

                  {doc.name
                    .split(" ")
                    .map(n => n[0])
                    .join("")}

                </div>

                <div>

                  <h3 className="font-semibold text-sm">
                    {doc.name}
                  </h3>

                  <p className="text-xs text-primary">
                    {doc.specialization}
                  </p>

                </div>

              </div>

              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">

                <span>{doc.experience} yrs</span>

                <span>{doc.fee} Rupees</span>

              </div>

              <div className="mt-3 flex gap-2">

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEdit(doc)}

                >

                  <Edit className="h-3 w-3 mr-1" /> Edit

                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive"
                  onClick={() => handleDelete(doc._id)}

                >

                  <Trash2 className="h-3 w-3" />

                </Button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </DashboardLayout>

  );

}
