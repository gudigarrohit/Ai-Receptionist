import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { facilities } from "../data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="gradient-hero py-16 text-primary-foreground text-center">
        <h1 className="font-display text-4xl font-bold">Our Facilities</h1>

        <p className="mt-3 text-primary-foreground/70 max-w-md mx-auto">
          World-class infrastructure for comprehensive patient care.
        </p>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {facilities.map((f, i) => (
              <motion.div
                key={f.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-xl border bg-card p-6 shadow-card hover:shadow-card-hover transition-all"
              >

                <span className="text-4xl block mb-4">
                  {f.icon}
                </span>

                <h3 className="font-display text-lg font-semibold text-foreground">
                  {f.name}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {f.description}
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