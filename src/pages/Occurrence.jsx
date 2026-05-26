import { Link } from "react-router-dom";
import { ArrowLeft, Thermometer, Droplets, Wind, TrendingUp } from "lucide-react";

const evidenceData = [
  {
    icon: Thermometer,
    title: "Rising Temperatures",
    stat: "+1.2°C",
    desc: "Average temperature increase recorded in Lagos over the past 30 years, consistent with global warming trends.",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20"
  },
  {
    icon: Droplets,
    title: "Increased Flooding",
    stat: "60%+",
    desc: "Increase in annual flood events in Lagos metropolis since 1990, displacing millions of residents and halting construction.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20"
  },
  {
    icon: Wind,
    title: "Extreme Weather Events",
    stat: "3x More",
    desc: "Frequency of intense rainstorms and windstorms has tripled in Lagos State over the last two decades.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20"
  },
  {
    icon: TrendingUp,
    title: "Sea Level Rise",
    stat: "3.4mm/yr",
    desc: "Lagos coastline is experiencing sea level rise, threatening coastal infrastructure and construction projects.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20"
  }
];

const contextPoints = [
  "Lagos State, Nigeria's commercial capital, is one of the fastest-growing mega-cities in Africa with a population exceeding 20 million.",
  "Located in the Gulf of Guinea, Lagos is uniquely vulnerable to climate change due to its coastal geography and low-lying terrain.",
  "The Nigerian Meteorological Agency (NIMET) has documented consistent changes in rainfall patterns, temperature, and extreme weather events.",
  "Lagos has experienced increasingly severe flooding events, including the devastating 2011, 2017, and 2022 floods that caused billions in damages.",
  "Rapid urbanization and informal settlements have exacerbated vulnerability to climate-related hazards in the state."
];

export default function Occurrence() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mb-10">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Objective 1</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">Climate Change Occurrence in Lagos</h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Examining the existence and evidence of climate change in Lagos State, Nigeria, through documented data, trends, and observable phenomena.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {evidenceData.map((item, i) => (
            <div key={i} className={`rounded-2xl border p-6 ${item.bg}`}>
              <div className="flex items-center gap-3 mb-3">
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <span className="font-semibold text-slate-200">{item.title}</span>
              </div>
              <div className={`text-3xl font-bold mb-2 ${item.color}`}>{item.stat}</div>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Context */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Lagos State — Climate Context</h2>
          <ul className="space-y-4">
            {contextPoints.map((point, i) => (
              <li key={i} className="flex gap-3 text-slate-300 leading-relaxed">
                <span className="text-blue-400 font-bold mt-0.5">{i + 1}.</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end">
          <Link to="/Variables" className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-semibold">
            Next: Climate Variables →
          </Link>
        </div>
      </div>
    </div>
  );
}