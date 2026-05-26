import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const variables = [
  {
    name: "Rainfall Variability",
    impact: "High",
    impactColor: "bg-red-500/20 text-red-400 border-red-500/30",
    description: "Unpredictable rainfall patterns disrupt construction schedules, delay earthworks, and cause material damage on site.",
    effects: ["Delayed foundation works", "Erosion of excavated sites", "Damage to freshly laid concrete", "Worker safety risks"]
  },
  {
    name: "Flooding",
    impact: "Very High",
    impactColor: "bg-red-600/20 text-red-300 border-red-600/30",
    description: "Frequent flooding events inundate construction sites, destroy materials, and make sites inaccessible for extended periods.",
    effects: ["Site inaccessibility", "Structural damage to ongoing works", "Loss of construction materials", "Project cost overruns"]
  },
  {
    name: "High Temperature & Heat Waves",
    impact: "High",
    impactColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    description: "Elevated temperatures reduce worker productivity, affect concrete curing, and cause thermal expansion issues in materials.",
    effects: ["Reduced labor productivity", "Premature concrete setting", "Material expansion/cracking", "Heat-related worker illnesses"]
  },
  {
    name: "Strong Winds & Storms",
    impact: "Medium",
    impactColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    description: "Intense windstorms damage scaffolding, blow away lightweight materials, and create unsafe working conditions.",
    effects: ["Scaffolding collapse", "Loss of roofing materials", "Crane operation halts", "Worker injuries"]
  },
  {
    name: "Sea Level Rise & Coastal Erosion",
    impact: "High",
    impactColor: "bg-red-500/20 text-red-400 border-red-500/30",
    description: "Rising sea levels threaten coastal construction projects, undermine foundations, and increase saline water intrusion.",
    effects: ["Foundation undermining", "Saline corrosion of reinforcement", "Loss of buildable land", "Increased foundation costs"]
  },
  {
    name: "Humidity & Moisture",
    impact: "Medium",
    impactColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    description: "High humidity levels accelerate material degradation, promote mold growth, and affect the quality of finishes.",
    effects: ["Material corrosion", "Mold and mildew growth", "Paint and finish failures", "Reduced structural lifespan"]
  }
];

export default function Variables() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link to="/Occurrence" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="mb-10">
          <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">Objective 2</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">Major Climate Change Variables</h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Identifying the key climate change variables affecting construction activities in Lagos State, Nigeria.
          </p>
        </div>

        <div className="space-y-6 mb-10">
          {variables.map((v, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="text-xl font-bold">{v.name}</h3>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${v.impactColor}`}>
                  {v.impact} Impact
                </span>
              </div>
              <p className="text-slate-400 mb-4 leading-relaxed">{v.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {v.effects.map((effect, j) => (
                  <div key={j} className="bg-white/5 rounded-lg px-3 py-2 text-sm text-slate-300">
                    • {effect}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Link to="/Occurrence" className="border border-white/20 hover:border-white/40 transition px-6 py-3 rounded-xl font-semibold text-slate-300">
            ← Previous
          </Link>
          <Link to="/Effects" className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-semibold">
            Next: Effects on Construction →
          </Link>
        </div>
      </div>
    </div>
  );
}