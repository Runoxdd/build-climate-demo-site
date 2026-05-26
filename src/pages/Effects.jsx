import { Link } from "react-router-dom";
import { ArrowLeft, Clock, DollarSign, Users, HardHat, BarChart2, AlertOctagon } from "lucide-react";

const effects = [
  {
    icon: Clock,
    title: "Project Time Delays",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    points: [
      "Flooding and storms halt construction activities for days or weeks",
      "Rescheduling of site activities due to unpredictable weather",
      "Delays in material deliveries caused by flood-damaged roads",
      "Extended project timelines averaging 20–40% beyond planned duration"
    ]
  },
  {
    icon: DollarSign,
    title: "Cost Overruns",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    points: [
      "Additional costs for climate-resilient design and materials",
      "Replacement of weather-damaged materials and equipment",
      "Idle labor costs during weather disruptions",
      "Increased insurance premiums and risk contingencies"
    ]
  },
  {
    icon: HardHat,
    title: "Worker Safety & Health",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    points: [
      "Heat stress and heat stroke among outdoor workers",
      "Increased accident rates during adverse weather",
      "Waterborne diseases due to flooding on construction sites",
      "Reduced workforce availability during extreme weather events"
    ]
  },
  {
    icon: BarChart2,
    title: "Quality & Structural Integrity",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    points: [
      "Compromised concrete quality due to extreme heat or rain",
      "Accelerated corrosion of steel reinforcement in humid conditions",
      "Foundation failures in flood-prone or waterlogged areas",
      "Reduced building lifespan due to material degradation"
    ]
  },
  {
    icon: Users,
    title: "Stakeholder & Supply Chain Disruption",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    points: [
      "Disrupted supply chains for construction materials",
      "Contractor disputes and claims arising from weather-related delays",
      "Client dissatisfaction and contractual penalties",
      "Difficulty attracting skilled labor to climate-risky project sites"
    ]
  },
  {
    icon: AlertOctagon,
    title: "Environmental & Regulatory Challenges",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    points: [
      "Increased regulatory requirements for climate-resilient construction",
      "Environmental impact assessments complicated by climate factors",
      "Stricter building codes increasing project costs",
      "Conflicts with community stakeholders over climate-related site impacts"
    ]
  }
];

export default function Effects() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link to="/Variables" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="mb-10">
          <span className="text-red-400 text-sm font-semibold uppercase tracking-wider">Objective 3</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">Effects on Construction Project Delivery</h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Evaluating how climate change impacts the successful delivery of construction projects in Lagos State across time, cost, quality, and safety dimensions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {effects.map((e, i) => (
            <div key={i} className={`rounded-2xl border p-6 ${e.bg}`}>
              <div className="flex items-center gap-3 mb-4">
                <e.icon className={`w-6 h-6 ${e.color}`} />
                <h3 className="text-lg font-bold">{e.title}</h3>
              </div>
              <ul className="space-y-2">
                {e.points.map((pt, j) => (
                  <li key={j} className="text-sm text-slate-300 flex gap-2">
                    <span className={`mt-1 ${e.color}`}>▸</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Link to="/Variables" className="border border-white/20 hover:border-white/40 transition px-6 py-3 rounded-xl font-semibold text-slate-300">
            ← Previous
          </Link>
          <Link to="/Strategist" className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-semibold">
            Next: Management Strategies →
          </Link>
        </div>
      </div>
    </div>
  );
}