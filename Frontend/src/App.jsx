import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './App.css';
import HomePage from './Components/HomePage.jsx';
import AuthPage from './Components/Register.jsx';
import MainPage from './Components/MainPage.jsx';
import MainLayout from './Components/MainLayout.jsx';
import DoctorAppointment from './Components/DoctorAppointment.jsx';
import AppointmentBooking from './Components/Appointmentbooking.jsx';
import FitnessDashboard from './Components/FitnessDashboard.jsx';
import ChatBot from './Components/ChatBot.jsx';
import UserReportUpload from './Components/UserReportUpload.jsx';
import Assessment from './Components/Assessment.jsx';
import Appointmentbooking from './Components/Appointmentbooking.jsx';
import SmartCarePlanGenerator from './Components/SmartCarePlanGenerator.jsx';
import SkinDetection from './Components/SkinDetection.jsx';
import NutritionPlanner from './Components/NutritionPlanner.jsx';
import HealthRiskDashboard from './Components/HealthRiskDashboard.jsx';

import DailyCheckIn from './Components/DailyCheckIn.jsx';
import MedicationAdherenceAssistant from './Components/MedicationAdherenceAssistant.jsx';
import DigitalTwinDashboard from './Components/DigitalTwinDashboard.jsx';
import ProfilePage from './Components/ProfilePage.jsx';
import { getCurrentUser } from './store/authSlice.js';

// Generic auth guard — redirects to login if not logged in
function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  const savedUser = localStorage.getItem('user');

  if (!user && !savedUser) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return children;
}

// Protected route with sidebar layout
function ProtectedRouteWithLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  const savedUser = localStorage.getItem('user');

  if (!user && !savedUser) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return <MainLayout>{children}</MainLayout>;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route path="/main" element={<ProtectedRouteWithLayout><MainPage /></ProtectedRouteWithLayout>} />
      <Route path="/fitness-dashboard" element={<ProtectedRouteWithLayout><FitnessDashboard /></ProtectedRouteWithLayout>} />
      <Route path="/assessment" element={<ProtectedRouteWithLayout><Assessment /></ProtectedRouteWithLayout>} />
      <Route path="/skin-detection" element={<ProtectedRouteWithLayout><SkinDetection /></ProtectedRouteWithLayout>} />
      <Route path="/nutrition-planner" element={<ProtectedRouteWithLayout><NutritionPlanner /></ProtectedRouteWithLayout>} />
      <Route path="/chat" element={<ProtectedRouteWithLayout><ChatBot /></ProtectedRouteWithLayout>} />
      <Route path="/upload-report" element={<ProtectedRouteWithLayout><UserReportUpload /></ProtectedRouteWithLayout>} />
      <Route path="/appointments" element={<ProtectedRouteWithLayout><Appointmentbooking /></ProtectedRouteWithLayout>} />
      <Route path="/care-plan" element={<ProtectedRouteWithLayout><SmartCarePlanGenerator /></ProtectedRouteWithLayout>} />
      <Route path="/doctor/appointments" element={<ProtectedRouteWithLayout><DoctorAppointment /></ProtectedRouteWithLayout>} />
      <Route path="/daily-checkin" element={<ProtectedRouteWithLayout><DailyCheckIn /></ProtectedRouteWithLayout>} />
      <Route path="/appointment-booking" element={<ProtectedRouteWithLayout><AppointmentBooking /></ProtectedRouteWithLayout>} />
      <Route path="/medication-adherence" element={<ProtectedRouteWithLayout><MedicationAdherenceAssistant /></ProtectedRouteWithLayout>} />
      <Route path="/digital-twin" element={<ProtectedRouteWithLayout><DigitalTwinDashboard /></ProtectedRouteWithLayout>} />
      <Route path="/health-risk" element={<ProtectedRouteWithLayout><HealthRiskDashboard /></ProtectedRouteWithLayout>} />
      <Route path="/profile" element={<ProtectedRouteWithLayout><ProfilePage /></ProtectedRouteWithLayout>} />

      <Route path="*" element={<Navigate to="/main" replace />} />
    </Routes>
  );
}

export default App;
