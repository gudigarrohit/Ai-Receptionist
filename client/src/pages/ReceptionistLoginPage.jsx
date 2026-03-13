import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipboardList, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

export default function ReceptionistLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response = await fetch("http://localhost:5000/api/receptionists/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    toast.success("Logged in as Receptionist");

    // store receptionist id
    localStorage.setItem("receptionistId", data.receptionist._id);

    navigate("/receptionist/dashboard");

  } catch (error) {

    toast.error(error.message || "Something went wrong");

  }

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
            Sign in to manage patient check-ins, appointments, and front-desk operations efficiently.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center lg:text-left">
            <Link to="/home" className="inline-flex items-center gap-2 mb-6">
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
              Sign in to your receptionist account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div>
              <label className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="new-email"
                required
              />
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>

              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground"
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
              Don&apos;t have an account?{" "}
              <Link
                to="/receptionist-register"
                className="text-primary hover:underline"
              >
                Register here
              </Link>
            </p>

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
              <Link to="/home" className="text-primary hover:underline">
                ← Back to website
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}