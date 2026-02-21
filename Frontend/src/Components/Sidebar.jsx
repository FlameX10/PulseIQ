import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";
import {
  Menu,
  X,
  Home,
  CalendarCheck,
  ClipboardListIcon,
  MessageCircle,
  Activity,
  FileUp,
  ShieldAlert,
  Sparkles,
  ListChecks,
  ScanFace,
  Apple,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    path: "/main",
  },
  {
    id: "dailyCheckIn",
    label: "Daily Check-In",
    icon: CalendarCheck,
    path: "/daily-checkin",
  },
  {
    id: "medicationAssistant",
    label: "Medication Adherence",
    icon: ClipboardListIcon,
    path: "/medication-adherence",
  },
  {
    id: "chat",
    label: "AI Health Assistant",
    icon: MessageCircle,
    path: "/chat",
  },
  {
    id: "upload",
    label: "Upload Report",
    icon: FileUp,
    path: "/upload-report",
  },
  {
    id: "digital-twin",
    label: "Digital Twin Dashboard",
    icon: Activity,
    path: "/digital-twin",
  },
  {
    id: "risk",
    label: "Health Risk Summary",
    icon: ShieldAlert,
    path: "/main", // You may need to adjust this based on your actual implementation
  },
  {
    id: "appointment",
    label: "Book Appointment",
    icon: CalendarCheck,
    path: "/appointment-booking",
  },
  {
    id: "fitness",
    label: "Fitness Dashboard",
    icon: Activity,
    path: "/fitness-dashboard",
  },
  {
    id: "assessment",
    label: "Assessment",
    icon: ListChecks,
    path: "/assessment",
  },
  {
    id: "skinDetection",
    label: "Skin Detection",
    icon: ScanFace,
    path: "/skin-detection",
  },
  {
    id: "nutrition",
    label: "Nutrition Planner",
    icon: Apple,
    path: "/nutrition-planner",
  },
  {
    id: "care-plan",
    label: "Smart Care Plan",
    icon: Sparkles,
    path: "/care-plan",
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleNavigate = (path) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth?mode=login");
  };

  const userName = user?.name || "Patient";
  const userEmail = user?.email || "user@example.com";

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-white shadow-lg border border-blue-100 hover:bg-blue-50 transition-colors"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-xl z-40 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-blue-500/30">
          <button
            onClick={() => handleNavigate("/main")}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity w-full"
          >
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm leading-4">PreventAI</p>
              <p className="text-blue-100 text-xs">Health</p>
            </div>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 space-y-1 px-3">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = window.location.pathname === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 ml-auto flex-shrink-0" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-blue-500/30 px-3 py-3">
          {/* User Profile Section */}
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{userName}</p>
                <p className="text-xs text-blue-100 truncate">{userEmail}</p>
              </div>
            </div>
            <ChevronDown
              size={16}
              className={`flex-shrink-0 transition-transform duration-200 ${
                isUserMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div className="mt-2 pt-2 border-t border-blue-500/30 space-y-1">
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition-colors text-sm"
              >
                <User size={16} />
                <span>My Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-100 hover:bg-red-500/20 hover:text-red-100 transition-colors text-sm font-medium"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
