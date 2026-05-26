import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-10 mt-16 border-t" style={{ background: "var(--bc-surface)", borderColor: "var(--bc-border)", color: "var(--bc-text-muted)" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg" style={{ color: "var(--bc-text)" }}>Build<span className="text-blue-400">Climate</span></span>
          </div>
          <p className="text-sm max-w-xs leading-relaxed">
            Assessing climate change impacts on construction project delivery in Lagos State, Nigeria.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-semibold mb-3" style={{ color: "var(--bc-text)" }}>Tools</p>
            <div className="space-y-2">
              <Link to="/RiskAssessment" className="block hover:text-white transition-colors">Risk Assessment</Link>
              <Link to="/ClimateMap" className="block hover:text-white transition-colors">Climate Map</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{ color: "var(--bc-text)" }}>Resources</p>
            <div className="space-y-2">
              <Link to="/AdaptationGuide" className="block hover:text-white transition-colors">Adaptation Guide</Link>
              <Link to="/Research" className="block hover:text-white transition-colors">Research & Data</Link>
              <Link to="/Contact" className="block hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{ color: "var(--bc-text)" }}>Contact Info</p>
            <div className="space-y-2">
              <p className="text-xs">Toluwalase Cyril Adebowale</p>
              <a href="mailto:cyladachi@gmail.com" className="block hover:text-white transition-colors">cyladachi@gmail.com</a>
              <a href="tel:+2349167482681" className="block hover:text-white transition-colors">+234 916 748 2681</a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t text-center text-xs" style={{ borderColor: "var(--bc-border)" }}>
        © 2024 BuildClimate. Academic Research Platform — Lagos State, Nigeria.
      </div>
    </footer>
  );
}