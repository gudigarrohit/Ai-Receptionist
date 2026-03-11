import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin } from "lucide-react";


export function Footer() {
  return (
    <footer className="border-t bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-accent">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">Geeth HealthCare</span>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Providing world-class healthcare with compassion, innovation, and excellence since 1995.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2.5">
              {["About Us", "Departments", "Doctors", "Facilities", "Contact"].map((link) => (
                <Link key={link} to={`/${link.toLowerCase().replace(" ", "-")}`} className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Departments</h4>
            <div className="space-y-2.5 w-[180px]">
              {[
                "Cardiology",
                "Neurology",
                "Orthopedics",
                "Ophthalmology",
                "Oncology",
                "Dermatology"
              ].map((dept) => (
                <span
                  key={dept}
                  className="block text-sm text-primary-foreground/60 break-words whitespace-normal"
                >
                  {dept}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-primary-foreground/60">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span> Geeth HealthCare Hospital in Navle, Shimoga</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-primary-foreground/60">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-primary-foreground/60">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@geethcare.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/40">
          © 2026 Geeth HealthCare Hospital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
