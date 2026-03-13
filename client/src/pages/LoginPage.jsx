import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye, EyeOff } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { toast } from "sonner";

export default function LoginPage() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  /* ===============================
  HANDLE INPUT CHANGE
  =============================== */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  /* ===============================
  HANDLE LOGIN
  =============================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      /* Save admin session */

      localStorage.setItem("adminId", data.admin._id);

      toast.success("Logged in as Admin");

      navigate("/admin");

    } catch (error) {

      toast.error(error.message || "Something went wrong");

    }

  };

  return (

    <div className="flex min-h-screen">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12">

        <div className="text-center text-primary-foreground max-w-md">

          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur-sm mb-6">
            <Heart className="h-8 w-8" />
          </div>

          <h2 className="font-display text-3xl font-bold">
            Geeth HealthCare Portal
          </h2>

          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            Access your dashboard to manage appointments, patients,
            and hospital operations efficiently.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex flex-1 items-center justify-center p-6">

        <div className="w-full max-w-sm space-y-6">

          <div className="text-center lg:text-left">

            <Link to="/" className="inline-flex items-center gap-2 mb-6">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-hero">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>

              <span className="font-display text-lg font-bold text-foreground">
                Geeth HealthCare
              </span>

            </Link>

            <h1 className="font-display text-2xl font-bold text-foreground">
              Welcome Back <span className="text-primary">Admin</span>
            </h1>

            <p className="text-sm text-muted-foreground mt-1">
              Sign in to your account
            </p>

          </div>

          {/* LOGIN FORM */}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}

            <div>

              <label className="text-sm font-medium text-foreground">
                Email Address
              </label>

              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="relative">

              <label className="text-sm font-medium text-foreground">
                Password
              </label>

              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
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

            {/* LOGIN BUTTON */}

            <Button
              type="submit"
              className="w-full gradient-hero border-0 text-primary-foreground font-semibold"
            >
              Sign In
            </Button>

          </form>

          {/* LINKS */}

          <div className="text-center space-y-2">

            <p className="text-xs text-muted-foreground">

              <Link
                to="/doctor-login"
                className="text-primary hover:underline"
              >
                Doctor Login
              </Link>

              {" · "}

              <Link
                to="/receptionist-login"
                className="text-primary hover:underline"
              >
                Receptionist Login
              </Link>

            </p>

            <p className="text-xs text-muted-foreground">

              <Link
                to="/home"
                className="text-primary hover:underline"
              >
                ← Back to website
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}