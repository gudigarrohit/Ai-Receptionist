import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { departments } from "../data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="gradient-hero py-16 text-primary-foreground text-center">
        <h1 className="font-display text-4xl font-bold">Our Departments</h1>

        <p className="mt-3 text-primary-foreground/70 max-w-md mx-auto">
          Comprehensive healthcare across all major medical specializations.
        </p>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {departments.map((dept, i) => (
              <motion.div
                key={dept.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group rounded-xl border bg-card p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all cursor-pointer"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary mb-4">
                  <dept.icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground">
                  {dept.name}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {dept.description}
                </p>

                <p className="mt-3 text-sm font-medium text-primary">
                  {dept.doctors} Specialists
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