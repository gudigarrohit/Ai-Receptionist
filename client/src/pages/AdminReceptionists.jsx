import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "../components/DashboardLayout";

import { Search, Plus, Edit, Trash2, Save } from "lucide-react";

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

/* =============================
EMPTY RECEPTIONIST TEMPLATE
============================= */

const emptyReceptionist = {
  name: "",
  email: "",
  phone: "",
  address: "",
  gender: "",
  shift: ""
};

export default function AdminReceptionists() {

  const [receptionists, setReceptionists] = useState([]);

  const [search, setSearch] = useState("");

  const [editingReceptionist, setEditingReceptionist] = useState(null);

  const [isNew, setIsNew] = useState(false);

  /* =============================
FETCH RECEPTIONISTS
============================= */

  useEffect(() => {
    fetchReceptionists();
  }, []);

  const fetchReceptionists = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/receptionists");

      const data = await res.json();

      setReceptionists(data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load receptionists");

    }

  };

  /* =============================
SEARCH FILTER
============================= */

  const filtered = receptionists.filter(r =>

    r.name?.toLowerCase().includes(search.toLowerCase()) ||

    r.email?.toLowerCase().includes(search.toLowerCase())

  );

  /* =============================
OPEN NEW MODAL
============================= */

  const openNew = () => {

    setEditingReceptionist({ ...emptyReceptionist });

    setIsNew(true);

  };

  /* =============================
OPEN EDIT MODAL
============================= */

  const openEdit = (rec) => {

    setEditingReceptionist({ ...rec });

    setIsNew(false);

  };

  /* =============================
SAVE RECEPTIONIST
============================= */

  const handleSave = async () => {

    try {

      if (!editingReceptionist.name) {
        toast.error("Name required");
        return;
      }

      if (isNew) {

        const res = await fetch(
          "http://localhost:5000/api/receptionists",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(editingReceptionist)
          }
        );

        const data = await res.json();

        setReceptionists(prev => [...prev, data]);

        toast.success("Receptionist added");

      } else {

        const res = await fetch(
          `http://localhost:5000/api/receptionists/${editingReceptionist._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(editingReceptionist)
          }
        );

        const data = await res.json();

        setReceptionists(prev =>
          prev.map(r =>
            r._id === data._id ? data : r
          )
        );

        toast.success("Receptionist updated");

      }

      setEditingReceptionist(null);

    } catch (error) {

      console.error(error);

      toast.error("Save failed");

    }

  };

  /* =============================
DELETE RECEPTIONIST
============================= */

  const handleDelete = async (id) => {

    if (!confirm("Delete this receptionist?")) return;

    try {

      await fetch(
        `http://localhost:5000/api/receptionists/${id}`,
        { method: "DELETE" }
      );

      setReceptionists(prev =>
        prev.filter(r => r._id !== id)
      );

      toast.success("Receptionist deleted");

    } catch (error) {

      toast.error("Delete failed");

    }

  };

  return (

    <DashboardLayout>

      <div className="space-y-6">

        {/* HEADER */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="font-display text-2xl font-bold">
              Receptionists
            </h1>

            <p className="text-sm text-muted-foreground">
              Manage hospital reception staff
            </p>

          </div>

          <Dialog
            open={editingReceptionist !== null}
            onOpenChange={(open) => {
              if (!open) setEditingReceptionist(null);
            }}
          >

            <Button
              onClick={openNew}
              className="gradient-hero border-0 text-primary-foreground gap-2"
            >

              <Plus className="h-4 w-4" />

              Add Receptionist

            </Button>

            <DialogContent className="max-w-lg">

              <DialogHeader>

                <DialogTitle>
                  {isNew ? "Add Receptionist" : "Edit Receptionist"}
                </DialogTitle>

              </DialogHeader>

              {editingReceptionist && (

                <div className="space-y-3 mt-2">

                  <Input
                    placeholder="Full Name"
                    value={editingReceptionist.name}
                    onChange={(e) =>
                      setEditingReceptionist({
                        ...editingReceptionist,
                        name: e.target.value
                      })
                    }
                  />

                  <Input
                    placeholder="Email"
                    value={editingReceptionist.email}
                    onChange={(e) =>
                      setEditingReceptionist({
                        ...editingReceptionist,
                        email: e.target.value
                      })
                    }
                  />

                  <Input
                    placeholder="Phone"
                    value={editingReceptionist.phone}
                    onChange={(e) =>
                      setEditingReceptionist({
                        ...editingReceptionist,
                        phone: e.target.value
                      })
                    }
                  />

                  <Input
                    placeholder="Address"
                    value={editingReceptionist.address}
                    onChange={(e) =>
                      setEditingReceptionist({
                        ...editingReceptionist,
                        address: e.target.value
                      })
                    }
                  />

                  {/* Gender */}

                  <Select
                    value={editingReceptionist.gender}
                    onValueChange={(value) =>
                      setEditingReceptionist({
                        ...editingReceptionist,
                        gender: value
                      })
                    }
                  >

                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>

                    <SelectContent>

                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>

                    </SelectContent>

                  </Select>

                  {/* Shift */}

                  <Select
                    value={editingReceptionist.shift}
                    onValueChange={(value) =>
                      setEditingReceptionist({
                        ...editingReceptionist,
                        shift: value
                      })
                    }
                  >

                    <SelectTrigger>
                      <SelectValue placeholder="Select Shift" />
                    </SelectTrigger>

                    <SelectContent>

                      <SelectItem value="Morning (8AM - 2PM)">
                        Morning (8AM - 2PM)
                      </SelectItem>

                      <SelectItem value="Afternoon (2PM - 8PM)">
                        Afternoon (2PM - 8PM)
                      </SelectItem>

                      <SelectItem value="Night (8PM - 8AM)">
                        Night (8PM - 8AM)
                      </SelectItem>

                    </SelectContent>

                  </Select>

                  <Button
                    onClick={handleSave}
                    className="w-full gradient-hero border-0 text-primary-foreground"
                  >

                    <Save className="h-4 w-4 mr-2" />

                    {isNew ? "Add Receptionist" : "Update Receptionist"}

                  </Button>

                </div>

              )}

            </DialogContent>

          </Dialog>

        </div>

        {/* SEARCH */}

        <div className="relative max-w-md">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />

          <Input
            placeholder="Search receptionist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />

        </div>

        {/* RECEPTIONIST CARDS */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {filtered.map((rec, i) => (

            <motion.div
              key={rec._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card p-5 shadow-card"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-hero text-white font-bold">

                  {rec.name?.split(" ").map(n => n[0]).join("")}

                </div>

                <div>

                  <h3 className="font-semibold text-sm">
                    {rec.name}
                  </h3>

                  <p className="text-xs text-primary">
                    {rec.email}
                  </p>

                </div>

              </div>

              <div className="mt-3 text-xs text-muted-foreground">

                <p>📞 {rec.phone}</p>

                <p>{rec.shift}</p>

              </div>

              <div className="mt-3 flex gap-2">

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEdit(rec)}
                >
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600"
                  onClick={() => handleDelete(rec._id)}
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