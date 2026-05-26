import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Risk Assessment", path: "/RiskAssessment" },
  { label: "Climate Map", path: "/ClimateMap" },
  { label: "Real-Time Climate", path: "/LagosRealtimeClimate" },
  { label: "Adaptation Guide", path: "/AdaptationGuide" },
  { label: "Research & Data", path: "/Research" },
  { label: "Contact", path: "/Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();

  const isLight = theme === "light";

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur border-b"
      style={{
        background: "var(--bc-nav-bg)",
        borderColor: "var(--bc-nav-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight" style={{ color: "var(--bc-text)" }}>
            Build<span className="text-blue-400">Climate</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.path
                  ? "bg-blue-600 text-white"
                  : isLight
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className={`ml-2 p-2 rounded-lg transition-colors ${
              isLight
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
            title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="text-slate-300 hover:text-white p-1"
            style={{ color: "var(--bc-text-muted)" }}
          >
            {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            className="hover:text-white"
            style={{ color: "var(--bc-text-muted)" }}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden border-t px-4 py-3 space-y-1"
          style={{ background: "var(--bc-nav-bg)", borderColor: "var(--bc-nav-border)" }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.path
                  ? "bg-blue-600 text-white"
                  : isLight
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}