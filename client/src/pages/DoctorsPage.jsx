import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Star, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

export default function DoctorsPage() {

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {

      const res = await fetch("http://localhost:5000/api/ui/doctors");

      const data = await res.json();

      setDoctors(data);

    } catch (err) {

      console.error("Failed to load doctors", err);

    }
  };

  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      {/* HEADER */}
      <section className="gradient-hero py-16 text-primary-foreground text-center">

        <h1 className="font-display text-4xl font-bold">
          Our Doctors
        </h1>

        <p className="mt-3 text-primary-foreground/70 max-w-md mx-auto">
          Meet our team of experienced medical professionals dedicated to your care.
        </p>

      </section>

      {/* DOCTORS LIST */}
      <section className="py-16">

        <div className="container mx-auto px-4">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {doctors.map((doc, i) => (

              <motion.div
                key={doc._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-xl border bg-card p-6 shadow-card hover:shadow-card-hover transition-all"
              >

                <div className="flex items-start gap-4">

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl gradient-hero text-primary-foreground font-display font-bold text-2xl">

                    {doc.name
                      ?.split(" ")
                      .slice(1)
                      .map((n) => n[0])
                      .join("")}

                  </div>

                  <div>

                    <h3 className="font-display text-lg font-bold text-foreground">
                      {doc.name}
                    </h3>

                    <p className="text-sm font-medium text-primary">
                      {doc.specialization}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {doc.qualification}
                    </p>

                  </div>

                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">



                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {doc.experience || 0} yrs
                  </span>

                  <span>
                    ₹ {doc.fee || 0}
                  </span>

                </div>

                <p className="text-xs text-muted-foreground mt-1">

                  Mon to Sat duty: {doc.dutyStart} - {doc.dutyEnd}

                </p>

                <p className="text-xs text-muted-foreground mt-1">

                  Sunday duty: {doc.sundayStart} - {doc.sundayEnd}

                </p>


                <Link to="/appointment">

                  <Button className="mt-4 w-full gradient-hero border-0 text-primary-foreground">

                    Book Appointment

                  </Button>

                </Link>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}