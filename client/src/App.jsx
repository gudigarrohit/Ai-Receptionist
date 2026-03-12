import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DoctorsPage from "./pages/DoctorsPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import AboutPage from "./pages/AboutPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import AppointmentPage from "./pages/AppointmentPage";
import VoiceAssistantPage from "./pages/VoiceAssistantPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAppointments from "./pages/AdminAppointments";
import ReceptionistLoginPage from "./pages/ReceptionistLoginPage";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import DoctorLoginPage from "./pages/DoctorLoginPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDoctors from "./pages/AdminDoctors";
import AdminPatients from "./pages/AdminPatients";
 import AdminSettings from "./pages/AdminSetting";
import DoctorRegisterPage from "./pages/DoctorRegisterPage";
import ReceptionistRegisterPage from "./pages/ReceptionistRegisterPage";
 
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/voice-assistant" element={<VoiceAssistantPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/appointments" element={<AdminAppointments />} />
            <Route path="/receptionist-login" element={<ReceptionistLoginPage />} />
            <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
            <Route path="/doctor-login" element={<DoctorLoginPage />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/admin/doctors" element={<AdminDoctors />} />
            <Route path="/admin/patients" element={<AdminPatients />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/doctor-register" element={<DoctorRegisterPage />} />
            <Route path="/receptionist-register" element={<ReceptionistRegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;