import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/button";

import {
  CalendarPlus,
  Mic,
  ShieldCheck,
  Clock,
  Users,
  Award,
  Star,
  ArrowRight,
  Phone
} from "lucide-react";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

import {
  departments,
  testimonials,
  facilities
} from "../data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

export default function Index() {

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

      {/* HERO */}

      <section className="relative overflow-hidden gradient-hero">

        <div className="container mx-auto px-4 py-20 lg:py-32">

          <div className="max-w-3xl">

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>

              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-medium text-primary-foreground">

                <ShieldCheck className="h-4 w-4" />

                Trusted by 50,000+ Patients

              </span>

            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="mt-6 text-5xl font-bold text-primary-foreground"

            >

              Your Health, Our Priority

            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="mt-4 text-lg text-primary-foreground/80"

            >

              Experience world-class healthcare with advanced technology and AI powered assistance.

            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="mt-8 flex gap-4"

            >

              <Link to="/appointment">

                <Button size="lg" className="gap-2">

                  <CalendarPlus className="h-5 w-5" />

                  Book Appointment

                </Button>

              </Link>

              <Link to="/voice-assistant">

                <Button size="lg" variant="outline" className="gap-2">

                  <Mic className="h-5 w-5" />

                  AI Voice Assistant

                </Button>

              </Link>

            </motion.div>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="py-16">

        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-6">

          {[
            { icon: Users, label: "Doctors", value: doctors.length + "+" },
            { icon: Award, label: "Experience", value: "30 Years" },
            { icon: Clock, label: "Emergency", value: "24/7" },
            { icon: Star, label: "Rating", value: "4.9" }
          ].map((stat, i) => (

            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={i}
              className="p-6 bg-card border rounded-xl flex gap-4 items-center"

            >

              <stat.icon className="h-6 w-6 text-primary" />

              <div>

                <p className="font-bold">{stat.value}</p>

                <p className="text-sm text-muted-foreground">{stat.label}</p>

              </div>

            </motion.div>

          ))}

        </div>

      </section>

      {/* DEPARTMENTS */}

      <section className="py-20">

        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-12">

            Departments

          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {departments.slice(0, 8).map((dept, i) => (

              <motion.div
                key={dept.id}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                custom={i}
                className="p-6 border rounded-xl bg-card"

              >

                <dept.icon className="h-8 w-8 text-primary mb-4" />

                <h3 className="font-semibold">{dept.name}</h3>

                <p className="text-sm text-muted-foreground mt-2">
                  {dept.description}
                </p>

                <p className="text-xs text-primary mt-3">
                  {dept.doctors} Doctors
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* DOCTORS */}

      <section className="py-20 gradient-medical">

        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-12">

            Our Doctors

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {doctors.slice(0, 6).map((doc, i) => (

              <motion.div
                key={doc._id}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                custom={i}
                className="p-6 border rounded-xl bg-card"

              >

                <h3 className="font-bold">

                  {doc.name}

                </h3>

                <p className="text-sm text-primary">

                  {doc.specialization}

                </p>

                <p className="text-xs text-muted-foreground mt-1">

                  Mon to Sat duty: {doc.dutyStart} - {doc.dutyEnd}

                </p>
                <p className="text-xs text-muted-foreground mt-1">

                  Sunday duty: {doc.sundayStart} - {doc.sundayEnd}

                </p>

                <div className="mt-2 text-sm flex gap-3">

                  <span>{doc.experience || 0} yrs</span>

                  <span>₹ {doc.fee || 0}</span>

                </div>

              </motion.div>

            ))}

          </div>

          <div className="text-center mt-10">

            <Link to="/doctors">

              <Button variant="outline" className="gap-2">

                View All Doctors

                <ArrowRight className="h-4 w-4" />

              </Button>

            </Link>

          </div>

        </div>

      </section>

      {/* FACILITIES */}

      <section className="py-20">

        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-12">

            Our Facilities

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {facilities.map((f, i) => (

              <motion.div
                key={f.id}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                custom={i}
                className="flex gap-4 border p-5 rounded-xl bg-card"

              >

                <span className="text-3xl">{f.icon}</span>

                <div>

                  <h3 className="font-semibold">{f.name}</h3>

                  <p className="text-sm text-muted-foreground">
                    {f.description}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}

      <section className="py-20 gradient-medical">

        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-12">

            Testimonials

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {testimonials.map((t, i) => (

              <motion.div
                key={t.id}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                custom={i}
                className="p-6 border rounded-xl bg-card"

              >

                <p className="text-sm italic">

                  "{t.text}"

                </p>

                <div className="mt-4">

                  <p className="font-semibold">{t.name}</p>

                  <p className="text-xs text-primary">{t.department}</p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* EMERGENCY */}

      <section className="py-16">

        <div className="container mx-auto px-4 text-center">

          <div className="gradient-hero p-10 rounded-xl text-primary-foreground">

            <h2 className="text-3xl font-bold">

              Need Emergency Help?

            </h2>

            <p className="mt-3">

              Our emergency department is available 24/7.

            </p>

            <div className="mt-6 flex justify-center gap-4">

              <Button className="gap-2">

                <Phone className="h-5 w-5" />

                Call Emergency

              </Button>

              <Link to="/appointment">

                <Button variant="outline" className="gap-2 text-black">

                  <CalendarPlus className="h-5 w-5" />

                  Book Appointment

                </Button>

              </Link>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </div>

  );

}
