import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { GoogleOAuthProvider } from "@react-oauth/google"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import AdminReceptionists from "./pages/AdminReceptionists";
import GeethRegisterPage from "./pages/geethRegisterPage";
import GeethLoginPage from "./pages/geethLoginPage";
import PatientDashboard from "./pages/PatientDashboard";
import PatientPage from "./pages/PatientPage";

const queryClient = new QueryClient();

function App() {
  return (
    <GoogleOAuthProvider clientId="533451684959-rg5l62bmud2964qqn6177acgnlr79d8c.apps.googleusercontent.com">

      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/geeth-login" />} />
              <Route path="/geeth-login" element={<GeethLoginPage />} />
              <Route path="/geeth-register" element={<GeethRegisterPage />} />
              <Route path="/home" element={<Index />} />
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
              <Route path="/admin/receptionists" element={<AdminReceptionists />} />
              <Route path="/patient-dashboard" element={<PatientDashboard />} />
              <Route path="/patient-info" element={<PatientPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>

        </TooltipProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;