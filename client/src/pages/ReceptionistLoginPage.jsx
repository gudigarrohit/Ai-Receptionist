import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipboardList, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

export default function ReceptionistLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Logged in as Receptionist");
    navigate("/receptionist/dashboard");
  };

  return (
    <div className="flex min-h-screen">

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[hsl(250,60%,55%)] to-[hsl(210,90%,45%)] items-center justify-center p-12">
        <div className="text-center text-primary-foreground max-w-md">

          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur-sm mb-6">
            <ClipboardList className="h-8 w-8" />
          </div>

          <h2 className="font-display text-3xl font-bold">
            Reception Portal
          </h2>

          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            Manage patient check-ins, schedule appointments, and handle front-desk operations.
          </p>

        </div>
      </div>


      <div className="flex flex-1 items-center justify-center p-6">

        <div className="w-full max-w-sm space-y-6">

          <div className="text-center lg:text-left">

            <Link to="/" className="inline-flex items-center gap-2 mb-6">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(250,60%,55%)]">
                <ClipboardList className="h-4 w-4 text-primary-foreground" />
              </div>

              <span className="font-display text-lg font-bold text-foreground">
                Geeth HealthCare
              </span>

            </Link>

            <h1 className="font-display text-2xl font-bold text-foreground">
              Receptionist Login
            </h1>

            <p className="text-sm text-muted-foreground mt-1">
              Sign in to the reception portal
            </p>

          </div>


          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">

            <label className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Email address"
              autoComplete="off"
              defaultValue="reception@geethcare.com"
              required
            />

            <div className="relative">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="off"
                defaultValue="reception123"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >

                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}

              </button>

            </div>


            <Button
              type="submit"
              className="w-full bg-[hsl(250,60%,55%)] hover:bg-[hsl(250,60%,48%)] border-0 text-primary-foreground font-semibold"
            >
              Sign In as Receptionist
            </Button>

          </form>


          <div className="text-center space-y-2">

            <p className="text-xs text-muted-foreground">

              <Link to="/login" className="text-primary hover:underline">
                Admin Login
              </Link>

              {" · "}

              <Link to="/doctor-login" className="text-primary hover:underline">
                Doctor Login
              </Link>

            </p>

            <p className="text-xs text-muted-foreground">

              <Link to="/" className="text-primary hover:underline">
                ← Back to website
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}