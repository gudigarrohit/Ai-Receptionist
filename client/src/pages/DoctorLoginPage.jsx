import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stethoscope, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

export default function DoctorLoginPage() {

const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

const handleSubmit = async (e) => {


e.preventDefault();

if (loading) return;

if (!email || !password) {
  toast.error("Please enter email and password");
  return;
}

try {

  setLoading(true);

  const res = await fetch("http://localhost:5000/api/doctors/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.message || "Login failed");
    setLoading(false);
    return;
  }

  // store doctor id for dashboard
  localStorage.setItem("doctorId", data.doctor._id);

  toast.success("Login successful");

  navigate("/doctor/dashboard");

} catch (error) {

  console.error("Login error:", error);
  toast.error("Server error");

} finally {

  setLoading(false);

}


};

return (


<div className="flex min-h-screen">

  {/* Left Panel */}
  <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[hsl(175,60%,42%)] to-[hsl(210,90%,45%)] items-center justify-center p-12">

    <div className="text-center text-primary-foreground max-w-md">

      <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur-sm mb-6">
        <Stethoscope className="h-8 w-8" />
      </div>

      <h2 className="font-display text-3xl font-bold">
        Doctor Portal
      </h2>

      <p className="mt-4 text-primary-foreground/70 leading-relaxed">
        Access your schedule, manage appointments, and update your profile.
      </p>

    </div>

  </div>


  {/* Login Form */}
  <div className="flex flex-1 items-center justify-center p-6">

    <div className="w-full max-w-sm space-y-4">

      <div className="text-center lg:text-left">

        <Link to="/" className="inline-flex items-center gap-2 mb-6">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-accent">
            <Stethoscope className="h-4 w-4 text-primary-foreground" />
          </div>

          <span className="font-display text-lg font-bold text-foreground">
            Geeth HealthCare
          </span>

        </Link>

        <h1 className="font-display text-2xl font-bold text-foreground">
          Doctor Sign In
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Sign in to your doctor portal
        </p>

      </div>


      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <div>

          <label className="text-sm font-medium text-foreground">
            Email Address
          </label>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1"
          />

        </div>


        {/* Password */}
        <div>

          <label className="text-sm font-medium text-foreground">
            Password
          </label>

          <div className="relative mt-1">

            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10"
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

        </div>


        {/* Login Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full gradient-accent border-0 text-primary-foreground font-semibold"
        >
          {loading ? "Logging in..." : "Login Doctor"}
        </Button>

      </form>


      {/* Register */}
      <div className="text-center space-y-2">

         
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/doctor-register"
                className="text-primary hover:underline"
              >
                Register here
              </Link>
            </p>

      </div>


      {/* Other Login Links */}
      <div className="text-center space-y-1">

        <p className="text-xs font-semibold text-muted-foreground">

          <Link to="/login" className="text-primary hover:underline">
            Admin Login
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
