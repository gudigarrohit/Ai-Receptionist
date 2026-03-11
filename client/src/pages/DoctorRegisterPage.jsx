import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stethoscope, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

export default function DoctorRegisterPage() {

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [name, setName] = useState("");
const [email, setEmail] = useState("");
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

        const res = await fetch("http://localhost:5000/api/doctors/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.message || "Registration failed");
            return;
        }

        toast.success("Doctor account created successfully");

        navigate("/doctor-login");

    } catch (error) {

        toast.error("Server error");

    }

};

return (

    <div className="flex min-h-screen">

        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[hsl(175,60%,42%)] to-[hsl(210,90%,45%)] items-center justify-center p-12">

            <div className="text-center text-primary-foreground max-w-md">

                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur-sm mb-6">
                    <Stethoscope className="h-8 w-8" />
                </div>

                <h2 className="font-display text-3xl font-bold">
                    Doctor Portal
                </h2>

                <p className="mt-4 text-primary-foreground/70 leading-relaxed">
                    Create your Doctor account and manage appointments, schedules and patient bookings.
                </p>

            </div>

        </div>


        <div className="flex flex-1 items-center justify-center p-6">

            <div className="w-full max-w-sm space-y-6">

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
                        Doctor Register
                    </h1>

                    <p className="text-sm text-muted-foreground mt-1">
                        Create your doctor account
                    </p>

                </div>


                <form onSubmit={handleSubmit} className="space-y-4">

                    <label className="text-sm font-medium text-foreground">
                        Full Name
                    </label>
                    <Input
                        type="text"
                        placeholder="Doctor name"
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

              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}

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

                            {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}

                        </button>

                    </div>


                    <Button
                        type="submit"
                        className="w-full gradient-accent border-0 text-primary-foreground font-semibold"
                    >
                        Create Doctor Account
                    </Button>

                </form>


                <p className="text-center text-xs text-muted-foreground">

                    Already have an account?

                    <Link to="/doctor-login" className="text-primary hover:underline ml-1">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    </div>
);


}
