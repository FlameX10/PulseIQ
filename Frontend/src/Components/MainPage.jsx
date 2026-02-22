import {
  FileUp,
  ShieldAlert,
  CalendarCheck,
  Brain,
  BarChart2,
  ClipboardList,
  HeartHandshake,
  Info,
  Sparkles,
  ChevronRight,
  ClipboardListIcon,
  Activity,
  MessageCircle,
  ListChecks,
  ScanFace,
  Apple,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// ─── Data ─────────────────────────────────────────────────────────────────────

const ACTION_CARDS = [
  {
    id: "dailyCheckIn",
    icon: CalendarCheck,
    label: "Daily Check-In",
    desc: "Track your mood, sleep, energy, and get personalized wellness insights.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    border: "border-blue-100",
    tag: "New",
    tagColor: "bg-blue-50 text-blue-600",
  },
  {
    id: "medicationAssistant",
    icon: ClipboardListIcon,
    label: "Medication Adherence Assistant",
    desc: "Track medications, set reminders, and get AI insights on adherence.",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    border: "border-sky-100",
    tag: null,
    tagColor: "",
  },
  {
    id: "chat",
    icon: MessageCircle,
    label: "AI Health Assistant",
    desc: "Chat with our AI to get personalized health insights based on your medical history.",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    border: "border-cyan-100",
    tag: "New",
    tagColor: "bg-cyan-50 text-cyan-600",
  },
  {
    id: "upload",
    icon: FileUp,
    label: "Upload Medical Report",
    desc: "Upload lab results or scans and get a plain-language AI summary in seconds.",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    border: "border-violet-100",
    tag: null,
    tagColor: "",
  },
  {
    id: "digital-twin",
    icon: Activity,
    label: "Digital Twin Dashboard",
    desc: "AI analysis of your health conversations - get personalized health insights and risk alerts.",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    border: "border-cyan-100",
    tag: "NEW",
    tagColor: "bg-cyan-500",
  },
  {
    id: "risk",
    icon: ShieldAlert,
    label: "View Health Risk Summary",
    desc: "See your current risk profile across cardiovascular, metabolic, and other categories.",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    border: "border-amber-100",
    tag: null,
    tagColor: "",
  },
  {
    id: "appointment",
    icon: CalendarCheck,
    label: "Book Doctor Appointment",
    desc: "Connect with a verified specialist matched to your health profile and availability.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
    tag: null,
    tagColor: "",
  },
  {
    id: "fitness",
    icon: Activity,
    label: "Fitness Dashboard",
    desc: "Track your daily fitness metrics, heart rate, steps, calories, and sleep from your Google Fit data.",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    border: "border-orange-100",
    tag: "New",
    tagColor: "bg-orange-50 text-orange-600",
  },
  {
    id: "assessment",
    icon: ListChecks,
    label: "Assessment",
    desc: "CBT, DBT & PHQ-9 based questionnaires to understand your mental wellness and get personalized insights.",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    border: "border-teal-100",
    tag: "New",
    tagColor: "bg-teal-50 text-teal-600",
  },
  {
    id: "skinDetection",
    icon: ScanFace,
    label: "Skin Detection",
    desc: "Upload a skin image for AI-powered analysis and early detection of skin concerns.",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    border: "border-pink-100",
    tag: null,
    tagColor: "",
  },
  {
    id: "nutrition",
    icon: Apple,
    label: "Nutrition Planner",
    desc: "Plan daily meals, track calories and macros, and meet your nutrition goals.",
    iconBg: "bg-lime-100",
    iconColor: "text-lime-600",
    border: "border-lime-100",
    tag: null,
    tagColor: "",
  },
];

const AI_CAPABILITIES = [
  {
    icon: Brain,
    title: "AI Symptom Analysis",
    desc: "Clinical-grade AI evaluates your symptoms against thousands of patterns to surface probable conditions early.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: BarChart2,
    title: "Predictive Risk Assessment",
    desc: "Continuous scoring across cardiovascular, metabolic, and chronic risk domains — updated as your data changes.",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    icon: ClipboardList,
    title: "Smart Care Plans",
    desc: "Adaptive, AI-generated care roadmaps with lifestyle guidance, monitoring schedules, and health goals.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: HeartHandshake,
    title: "Mental Health Support",
    desc: "Mood tracking, stress detection, and curated mental wellness resources — always private, always available.",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ActionCard({ card, onNavigate }) {
  const Icon = card.icon;
  return (
    <button
      onClick={() => onNavigate?.(card.id)}
      className="group relative bg-white rounded-2xl border border-blue-100/60 shadow-sm p-5 text-left flex flex-col gap-4 hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-0.5 hover:border-blue-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      {card.tag && (
        <span className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full ${card.tagColor}`}>
          {card.tag}
        </span>
      )}

      <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105`}>
        <Icon size={20} className={card.iconColor} />
      </div>

      <div className="flex-1">
        <p className="text-slate-800 font-semibold text-sm mb-1">{card.label}</p>
        <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
      </div>

      <div className="flex items-center gap-1 text-blue-600 text-xs font-semibold">
        Get started
        <ChevronRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </button>
  );
}

function CapabilityCard({ cap }) {
  const Icon = cap.icon;
  return (
    <div className="flex gap-4 bg-white rounded-2xl border border-blue-100/60 shadow-sm p-5 hover:border-blue-200/80 transition-colors">
      <div className={`w-10 h-10 rounded-xl ${cap.iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={18} className={cap.iconColor} />
      </div>
      <div>
        <p className="text-slate-800 font-semibold text-sm mb-1">{cap.title}</p>
        <p className="text-slate-500 text-xs leading-relaxed">{cap.desc}</p>
      </div>
    </div>
  );
}

// ─── PatientHome ──────────────────────────────────────────────────────────────

/**
 * Props:
 *   patientName   string               — defaults to "Patient"
 *   onNavigate    (id: string) => void — called when action card is clicked
 *   onStartAnalysis () => void         — CTA button handler
 */
export default function MainPage({
  patientName = "Patient",
  onNavigate: onNavigateProp,
  onStartAnalysis,
}) {
  const navigate = useNavigate();
const { user } = useSelector((state) => state.auth); // Get user from Redux

  // Use user data from DB, fallback to prop
  const displayName = user?.name || user?.username || patientName || "Patient";
  const handleNavigate = (id) => {
    if (onNavigateProp) {
      onNavigateProp(id);
      return;
    }

    const routes = {
      dailyCheckIn: "/daily-checkin",
      medicationAssistant: "/medication-adherence",
      chat: "/chat",
      upload: "/upload-report",
      "digital-twin": "/digital-twin",
      appointment: "/appointment-booking",
      fitness: "/fitness-dashboard",
      assessment: "/assessment",
      skinDetection: "/skin-detection",
      nutrition: "/nutrition-planner",
    };

    if (routes[id]) {
      navigate(routes[id]);
    } else {
      console.log(`Navigate to: ${id}`);
    }
  };

  return (
    <div className="min-h-screen main-page-theme font-sans">

      {/* ── 1. Welcome Hero — Full Width ── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full overflow-hidden"
      >
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&auto=format&fit=crop&q=8"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* White & blue gradient overlay — keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-blue-500/90 to-sky-500/85" />

        {/* Subtle ECG line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 pointer-events-none">
          <svg viewBox="0 0 1200 64" preserveAspectRatio="none" className="w-full h-full">
            <polyline
              points="0,32 100,32 140,32 170,6 200,58 228,14 256,50 284,32 420,32 460,32 490,6 520,58 548,14 576,50 604,32 740,32 780,32 810,6 840,58 868,14 896,50 924,32 1200,32"
              fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-6 py-14 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">

          {/* Left — text */}
          <div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-white text-xs font-semibold tracking-wide">AI Health Assistant Active</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
              className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-sm"
            >
              Welcome back,{" "}
              <span className="text-cyan-200">{displayName}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: "easeOut" }}
              className="text-blue-100 text-base md:text-lg leading-relaxed max-w-lg"
            >
              Your AI health assistant is ready to help. Stay ahead of illness with early risk detection and personalized care.
            </motion.p>
          </div>

          {/* Right — Quick Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.38, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            className="flex-shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-5 text-white space-y-3 w-full md:w-56 transition-transform duration-300 cursor-default"
          >
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Quick Stats</p>

            {[
              { label: "Health Score", value: "78/100", color: "text-cyan-200"    },
              { label: "Risk Level",   value: "Low",    color: "text-emerald-300" },
              { label: "Next Appt",    value: "Mar 2",  color: "text-white"       },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <span className="text-white/75 text-xs">{stat.label}</span>
                <span className={`font-bold text-sm ${stat.color}`}>{stat.value}</span>
              </div>
            ))}

            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                    className="h-full bg-cyan-300 rounded-full"
                  />
                </div>
                <span className="text-white/50 text-[10px]">78%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12 main-content">

        {/* ── 2. Why Early Detection Matters ── */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
            alt="Preventive healthcare"
            className="rounded-2xl shadow-md"
          />
          <div>
            <h2 className="text-slate-900 font-bold text-xl mb-3">
              Why Early Detection Matters
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Many health conditions develop silently before symptoms appear.
              PulseIQ continuously analyzes your health patterns to detect risks early
              and guide you toward preventive care.
            </p>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Detect risks before symptoms appear</li>
              <li>Reduce long-term treatment costs</li>
              <li>Enable timely medical intervention</li>
              <li>Improve quality of life</li>
            </ul>
          </div>
        </section>

        {/* ── 3. Digital Twin Section ── */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-slate-900 font-bold text-xl mb-3">
              Your Digital Twin — A Virtual Model of Your Health
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              PulseIQ creates a Digital Twin — a virtual representation of your
              health that learns from your lifestyle, medical history, and daily
              habits to predict potential risks and provide personalized guidance.
            </p>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Predict future health risks</li>
              <li>Track long-term health trends</li>
              <li>Provide preventive recommendations</li>
              <li>Support doctors with data-driven insights</li>
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80"
            alt="Digital twin health analytics"
            className="rounded-2xl shadow-md"
          />
        </section>

        {/* ── 4. AI Health Assistant Section ── */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
        <img
        src="https://plus.unsplash.com/premium_photo-1677094310919-d0361465d3be?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="AI medical chatbot"
          className="rounded-2xl shadow-md w-full h-auto"
        />
          <div>
            <h2 className="text-slate-900 font-bold text-xl mb-3">
              24/7 AI Health Assistant
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Have a health question? Our AI Health Assistant provides reliable,
              personalized guidance using medical knowledge and your health data —
              anytime, anywhere.
            </p>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Understand medical reports easily</li>
              <li>Get lifestyle & wellness advice</li>
              <li>Ask symptom-related questions</li>
              <li>Receive personalized health insights</li>
            </ul>
          </div>
        </section>

        {/* ── 5. Unified Health Dashboard Section ── */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-slate-900 font-bold text-xl mb-3">
              All Your Health Data in One Place
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              PulseIQ integrates your fitness, medical reports, medication,
              and health risks into one unified dashboard — giving you a complete
              picture of your well-being.
            </p>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Fitness & activity tracking</li>
              <li>Medication adherence monitoring</li>
              <li>Health risk insights</li>
              <li>Secure medical report storage</li>
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
            alt="Health dashboard analytics"
            className="rounded-2xl shadow-md"
          />
        </section>


        {/* ── 4. Info / Alert Section ── */}
        <section>
          <div className="flex gap-4 bg-blue-50/80 border border-blue-200/60 rounded-2xl p-5">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
              <Info size={17} className="text-blue-600" />
            </div>
            <div>
              <p className="text-slate-800 font-semibold text-sm mb-1">Medical Disclaimer</p>
              <p className="text-slate-600 text-xs leading-relaxed">
                PreventAI Health provides AI-generated health information for educational and preventive purposes only.
                It is <strong>not a substitute</strong> for professional medical advice, diagnosis, or treatment.
                Always consult a qualified healthcare provider for personal medical concerns.
                In case of a medical emergency, call your local emergency services immediately.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-blue-100/80 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Sparkles size={9} className="text-white" />
            </div>
            <span className="text-slate-500 text-xs">© 2025 PreventAI Health Technologies</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-slate-400">
            {["Privacy Policy", "Terms of Service", "Support"].map((l) => (
              <a key={l} href="#" className="hover:text-blue-600 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Demo (default export for preview) ───────────────────────────────────────