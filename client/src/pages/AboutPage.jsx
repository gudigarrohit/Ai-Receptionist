import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Shield, Target, Heart, Award } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="gradient-hero py-16 text-primary-foreground text-center">
        <h1 className="font-display text-4xl font-bold">About MedCare</h1>
        <p className="mt-3 text-primary-foreground/70 max-w-md mx-auto">
          Three decades of excellence in healthcare delivery.
        </p>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="prose prose-lg mx-auto text-center"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 1995, Geeth HealthCare Hospital & Research Center has grown
              from a small community clinic into one of the nation's most
              trusted healthcare institutions. With over 87 specialist doctors,
              500+ nursing staff, and state-of-the-art facilities, we serve over
              50,000 patients annually.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 mt-12">
            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "To provide accessible, high-quality healthcare with compassion and innovation, ensuring every patient receives personalized treatment.",
              },
              {
                icon: Shield,
                title: "Our Vision",
                text: "To be the leading healthcare provider recognized for clinical excellence, technological innovation, and patient-centered care.",
              },
              {
                icon: Heart,
                title: "Our Values",
                text: "Compassion, integrity, excellence, and teamwork guide everything we do. Patient safety is our number one priority.",
              },
              {
                icon: Award,
                title: "Accreditations",
                text: "NABH Accredited, ISO 9001:2015 Certified, recognized by WHO for clinical excellence and patient safety standards.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-xl border bg-card p-6 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}