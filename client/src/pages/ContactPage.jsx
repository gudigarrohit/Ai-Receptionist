import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="gradient-hero py-16 text-primary-foreground text-center">
        <h1 className="font-display text-4xl font-bold">Contact Us</h1>
        <p className="mt-3 text-primary-foreground/70 max-w-md mx-auto">
          Get in touch with our team for any inquiries.
        </p>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 max-w-5xl mx-auto">

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Get In Touch
              </h2>

              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    value: "Geeth HealthCare Hospital in Navle, Shimoga."
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+91 98765 43210"
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "info@geethcare.com"
                  },
                  {
                    icon: Clock,
                    label: "Hours",
                    value: "24/7 Emergency | OPD: 8AM - 9PM"
                  }
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.value}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

              <div className="rounded-xl overflow-hidden border shadow-card h-64">
                <iframe
                  title="MedCare Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d813.9683902120302!2d75.57701801684793!3d13.96408122597723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbbaf0003b27133%3A0x4aa313cbfa577c57!2sKrishna%20hostel%20Jnnce!5e0!3m2!1sen!2sin!4v1772468754335!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-xl border bg-card p-6 shadow-card space-y-4 h-fit"
            >

              <h3 className="font-display text-lg font-semibold text-foreground">
                Send a Message
              </h3>

              <Input placeholder="Your Name" required />

              <Input type="email" placeholder="Your Email" required />

              <Input placeholder="Subject" required />

              <Textarea placeholder="Your Message" rows={5} required />

              <Button
                type="submit"
                className="w-full gradient-hero border-0 text-primary-foreground"
              >
                Send Message
              </Button>

            </form>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}