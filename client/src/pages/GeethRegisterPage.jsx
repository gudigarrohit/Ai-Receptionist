import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export default function GeethRegisterPage() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/patient/register",
        form
      );

      toast.success(res.data.message);

      navigate("/geeth-login");

    } catch (err) {

      toast.error(err.response?.data?.message || "Registration failed");

    }

  };

  return (

    <div className="flex min-h-screen">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[hsl(250,60%,55%)] to-[hsl(210,90%,45%)] items-center justify-center p-12">

        <div className="text-center text-primary-foreground max-w-md">

          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur-sm mb-6">
            <Heart className="h-8 w-8" />
          </div>

          <h2 className="font-display text-3xl font-bold">
            Patient Registration
          </h2>

          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            Create your account to book appointments, consult doctors,
            and manage your healthcare services easily.
          </p>

        </div>

      </div>


      {/* RIGHT PANEL */}

      <div className="flex flex-1 items-center justify-center p-6">

        <div className="w-full max-w-sm space-y-6">

          {/* Logo */}

          <div className="text-center lg:text-left">

            <Link to="/" className="inline-flex items-center gap-2 mb-6">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(250,60%,55%)]">
                <Heart className="h-4 w-4 text-white" />
              </div>

              <span className="font-display text-lg font-bold text-foreground">
                Geeth HealthCare
              </span>

            </Link>

            <h1 className="font-display text-2xl font-bold text-foreground">
              Create Account
            </h1>

            <p className="text-sm text-muted-foreground mt-1">
              Register as a new patient
            </p>

          </div>


          {/* FORM */}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}

            <div className="flex items-center border rounded-lg px-3 py-2">
              <User size={18} className="text-gray-400 mr-2" />

              <input
                type="text"
                name="name"
                placeholder="Full name"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />

            </div>


            {/* Email */}

            <div className="flex items-center border rounded-lg px-3 py-2">
              <Mail size={18} className="text-gray-400 mr-2" />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />

            </div>


            {/* Password */}

            <div className="flex items-center border rounded-lg px-3 py-2">

              <Lock size={18} className="text-gray-400 mr-2" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />

              {showPassword ? (

                <EyeOff
                  size={18}
                  className="cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(false)}
                />

              ) : (

                <Eye
                  size={18}
                  className="cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(true)}
                />

              )}

            </div>


            {/* Confirm Password */}

            <div className="flex items-center border rounded-lg px-3 py-2">

              <Lock size={18} className="text-gray-400 mr-2" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />

              {showConfirmPassword ? (

                <EyeOff
                  size={18}
                  className="cursor-pointer text-gray-400"
                  onClick={() => setShowConfirmPassword(false)}
                />

              ) : (

                <Eye
                  size={18}
                  className="cursor-pointer text-gray-400"
                  onClick={() => setShowConfirmPassword(true)}
                />

              )}

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-[hsl(250,60%,55%)] hover:bg-[hsl(250,60%,48%)] text-white py-3 rounded-lg font-semibold"
            >
              Create Account
            </button>

          </form>


          {/* LOGIN LINK */}

          <p className="text-center text-xs text-muted-foreground">

            Already have an account?{" "}

            <Link
              to="/geeth-login"
              className="text-primary hover:underline"
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}