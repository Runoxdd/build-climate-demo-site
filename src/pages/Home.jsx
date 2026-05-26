import { Link } from "react-router-dom";
import { Droplets, Thermometer, Wind, BarChart2, Map, BookOpen, ArrowRight, AlertTriangle, Shield, Clock } from "lucide-react";

const stats = [
  { icon: Droplets, value: "60%+", label: "Increase in flood events since 1990", color: "text-blue-400" },
  { icon: Thermometer, value: "+1.2°C", label: "Temperature rise over 30 years", color: "text-orange-400" },
  { icon: Clock, value: "20–40%", label: "Average project time overrun", color: "text-red-400" },
  { icon: Wind, value: "3×", label: "More extreme storm events recorded", color: "text-purple-400" },
];

const tools = [
  {
    icon: AlertTriangle,
    title: "Climate Risk Assessment",
    desc: "Input your project details and receive a tailored flood, rainfall, and heat stress risk score.",
    link: "/RiskAssessment",
    color: "from-blue-600 to-blue-800",
    badge: "Tool"
  },
  {
    icon: Map,
    title: "Interactive Climate Map",
    desc: "Explore flood-prone and high-risk construction zones across Lagos State.",
    link: "/ClimateMap",
    color: "from-teal-600 to-teal-800",
    badge: "Map"
  },
  {
    icon: Shield,
    title: "Adaptation Strategy Guide",
    desc: "Practical recommendations for climate-resilient construction in Lagos.",
    link: "/AdaptationGuide",
    color: "from-green-600 to-green-800",
    badge: "Guide"
  },
  {
    icon: BarChart2,
    title: "Research & Data",
    desc: "Climate trends, charts, and academic insights on construction productivity.",
    link: "/Research",
    color: "from-purple-600 to-purple-800",
    badge: "Research"
  },
  {
    icon: BookOpen,
    title: "Contact & Feedback",
    desc: "Submit feedback, research contributions, or collaboration requests.",
    link: "/Contact",
    color: "from-slate-600 to-slate-800",
    badge: "Engage"
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504711331083-9c895941bf81?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-24">
          <span className="inline-block bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            Academic Research Platform · Lagos State, Nigeria
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            Build<span className="text-blue-400">Climate</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-4 leading-relaxed">
            Assessing the Impact of Climate Change on Construction Project Delivery in Lagos State
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A professional platform for contractors, engineers, and project managers to understand climate risks, predict delays, and implement adaptation strategies for construction projects in Lagos.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/RiskAssessment" className="bg-blue-600 hover:bg-blue-500 transition-colors px-8 py-3 rounded-xl font-semibold text-lg flex items-center gap-2">
              Start Risk Assessment <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/Research" className="border border-white/30 hover:border-white/60 transition-colors px-8 py-3 rounded-xl font-semibold text-lg text-slate-300 hover:text-white">
              View Research
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y py-12" style={{ background: "var(--bc-surface)", borderColor: "var(--bc-border)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-slate-400 text-sm uppercase tracking-wider mb-8 font-semibold">
            Climate Change in Lagos — Key Figures
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <s.icon className={`w-8 h-8 mx-auto mb-3 ${s.color}`} />
                <div className={`text-3xl md:text-4xl font-extrabold mb-1 ${s.color}`}>{s.value}</div>
                <p className="text-sm leading-snug" style={{ color: "var(--bc-text-muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20" style={{ background: "var(--bc-bg)" }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--bc-text)" }}>Platform Tools & Resources</h2>
          <p className="max-w-xl mx-auto" style={{ color: "var(--bc-text-muted)" }}>
            Everything you need to assess, predict, and adapt to climate change impacts on your construction projects in Lagos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t, i) => (
            <Link
              key={i}
              to={t.link}
              className="group rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}
            >
              <div className={`bg-gradient-to-br ${t.color} p-6`}>
                <div className="flex justify-between items-start">
                  <t.icon className="w-8 h-8 text-white/90" />
                  <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">{t.badge}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">{t.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--bc-text-muted)" }}>{t.desc}</p>
                <span className="text-blue-400 text-sm font-medium flex items-center gap-1">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-blue-900/60 to-blue-800/40 border border-blue-500/30 rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to assess your project's climate risk?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Use our Climate Risk Assessment Tool to get a comprehensive risk score tailored to your Lagos construction project.
          </p>
          <Link to="/RiskAssessment" className="bg-blue-500 hover:bg-blue-400 transition-colors px-10 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-2">
            Get Your Risk Score <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}