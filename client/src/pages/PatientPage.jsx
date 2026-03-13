import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye, EyeOff, Lock } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import axios from "axios";

export default function PatientPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  /* ===============================
     PATIENT LOGIN
  =============================== */

  const handlePatientLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/patient/login",
        { email, password }
      );

      localStorage.setItem("patient", JSON.stringify(res.data.patient));

      toast.success(res.data.message);

      navigate("/home");

    } catch (err) {

      toast.error(err.response?.data?.message || "Login failed");

    }

  };

  /* ===============================
     GOOGLE LOGIN
  =============================== */

  const handleGoogleLogin = async (credentialResponse) => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/patient/google-login",
        {
          token: credentialResponse.credential
        }
      );

      localStorage.setItem("patient", JSON.stringify(res.data.patient));

      toast.success("Google login successful");

      navigate("/home");

    } catch {

      toast.error("Google login failed");

    }

  };

  return (

    <div className="flex min-h-screen">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[hsl(250,60%,55%)] to-[hsl(210,90%,45%)] items-center justify-center p-12">

        <div className="text-center text-primary-foreground max-w-md">

          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur-sm mb-6">
            <Heart className="h-8 w-8" />
          </div>

          <h2 className="font-display text-3xl font-bold">
            Patient Portal
          </h2>

          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            Login to manage your appointments and healthcare services securely.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex flex-1 items-center justify-center p-6">

        <div className="w-full max-w-sm space-y-6">

          {/* HEADER */}

          <div className="text-center lg:text-left">

            <Link to="/" className="inline-flex items-center gap-2 mb-6">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(250,60%,55%)]">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>

              <span className="font-display text-lg font-bold text-foreground">
                Geeth HealthCare
              </span>

            </Link>

            <h1 className="font-display text-2xl font-bold text-foreground">
              Patient Login
            </h1>

            <p className="text-sm text-muted-foreground mt-1">
              Sign in to access your appointments
            </p>

          </div>

          {/* PATIENT LOGIN FORM */}

          <form onSubmit={handlePatientLogin} className="space-y-4">

            <div>

              <label className="text-sm font-medium text-foreground">
                Email Address
              </label>

              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            <div>

              <label className="text-sm font-medium text-foreground">
                Password
              </label>

              <div className="flex items-center border rounded-lg px-3 py-2">

                <Lock size={18} className="text-gray-400 mr-2" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            </div>

            <Button
              type="submit"
              className="w-full bg-[hsl(250,60%,55%)] hover:bg-[hsl(250,60%,48%)] border-0 text-primary-foreground font-semibold"
            >
              Sign In
            </Button>

            {/* GOOGLE LOGIN */}

            <div className="flex justify-center">

              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => toast.error("Google login failed")}
              />

            </div>

            <p className="text-xs text-muted-foreground text-center">

              Don't have an account?{" "}

              <Link
                to="/geeth-register"
                className="text-primary hover:underline"
              >
                Register here
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>

  );

}