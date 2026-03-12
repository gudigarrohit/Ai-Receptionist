import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipboardList, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

export default function ReceptionistRegisterPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      const res = await fetch("http://localhost:5000/api/receptionists/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Receptionist account created successfully");

      navigate("/receptionist-login");

    } catch (error) {

      toast.error("Server error");

    }

  };


  return (

    <div className="flex min-h-screen">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[hsl(250,60%,55%)] to-[hsl(210,90%,45%)] items-center justify-center p-12">

        <div className="text-center text-primary-foreground max-w-md">

          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur-sm mb-6">
            <ClipboardList className="h-8 w-8" />
          </div>

          <h2 className="font-display text-3xl font-bold">
            Reception Portal
          </h2>

          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            Create a receptionist account to manage patient check-ins and appointments.
          </p>

        </div>
      </div>


      {/* FORM */}

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
              Receptionist Register
            </h1>

            <p className="text-sm text-muted-foreground mt-1">
              Create your receptionist account
            </p>

          </div>


          <form onSubmit={handleSubmit} className="space-y-4">

            <label className="text-sm font-medium text-foreground">
              Full Name
            </label>

            <Input
              type="text"
              placeholder="Receptionist name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />


            <label className="text-sm font-medium text-foreground">
              Email Address
            </label>

            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />


            <label className="text-sm font-medium text-foreground">
              Phone Number
            </label>

            <Input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />


            <div className="relative">

              <label className="text-sm font-medium text-foreground">
                Password
              </label>

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >

                {showPassword ?
                  <EyeOff className="h-4 w-4" /> :
                  <Eye className="h-4 w-4" />}

              </button>

            </div>


            <div className="relative">

              <label className="text-sm font-medium text-foreground">
                Confirm Password
              </label>

              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >

                {showConfirmPassword ?
                  <EyeOff className="h-4 w-4" /> :
                  <Eye className="h-4 w-4" />}

              </button>

            </div>


            <Button
              type="submit"
              className="w-full bg-[hsl(250,60%,55%)] hover:bg-[hsl(250,60%,48%)] border-0 text-primary-foreground font-semibold"
            >
              Create Receptionist Account
            </Button>

          </form>


          <p className="text-center text-xs text-muted-foreground">

            Already have an account?

            <Link to="/receptionist-login" className="text-primary hover:underline ml-1">
              Login
            </Link>

          </p>

        </div>
      </div>

    </div>

  );

}