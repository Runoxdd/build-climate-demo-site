import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const strategies = [
  {
    category: "Design & Planning",
    color: "border-l-blue-500",
    headerBg: "bg-blue-500/10",
    items: [
      "Integrate climate risk assessments into the early design stages of projects",
      "Adopt flood-resilient architectural and structural designs for Lagos terrain",
      "Elevate building foundations in flood-prone areas of Lagos",
      "Use climate-adaptive site planning, including proper drainage systems",
      "Incorporate green infrastructure (e.g., permeable pavements, rain gardens)"
    ]
  },
  {
    category: "Construction Methods & Materials",
    color: "border-l-orange-500",
    headerBg: "bg-orange-500/10",
    items: [
      "Use weather-resistant and climate-adaptive construction materials",
      "Adopt modular/prefabricated construction to reduce on-site weather exposure",
      "Schedule weather-sensitive activities during dry season windows",
      "Apply corrosion-resistant coatings for steel elements in humid environments",
      "Use high-strength concrete mixes adapted to Lagos's temperature conditions"
    ]
  },
  {
    category: "Project Management",
    color: "border-l-green-500",
    headerBg: "bg-green-500/10",
    items: [
      "Include climate risk contingency buffers in project schedules and budgets",
      "Develop and implement weather monitoring systems on construction sites",
      "Establish emergency response plans for flood and storm events",
      "Train project teams on climate change impacts and adaptive measures",
      "Include climate change clauses in construction contracts to manage disputes"
    ]
  },
  {
    category: "Policy & Regulatory Framework",
    color: "border-l-purple-500",
    headerBg: "bg-purple-500/10",
    items: [
      "Enforce and update Lagos State building codes to reflect climate realities",
      "Mandate Environmental Impact Assessments that include climate risk analysis",
      "Establish government incentives for climate-resilient construction practices",
      "Develop a Lagos State Climate Change Adaptation Plan for the construction sector",
      "Strengthen inter-agency collaboration between LASEMA, NIMET, and construction regulators"
    ]
  },
  {
    category: "Technology & Innovation",
    color: "border-l-cyan-500",
    headerBg: "bg-cyan-500/10",
    items: [
      "Adopt Building Information Modelling (BIM) to simulate climate scenarios",
      "Use real-time weather data and early warning systems for site management",
      "Leverage drone technology for flood assessment and site monitoring",
      "Implement smart water management systems in construction sites",
      "Use climate modelling software to predict site-specific risks in Lagos"
    ]
  },
  {
    category: "Stakeholder Engagement & Capacity Building",
    color: "border-l-yellow-500",
    headerBg: "bg-yellow-500/10",
    items: [
      "Engage local communities in climate-resilient construction planning",
      "Train construction professionals in climate adaptation techniques",
      "Promote knowledge sharing between government, academia, and industry",
      "Develop partnerships with international climate research bodies",
      "Raise awareness among clients and developers about climate construction risks"
    ]
  }
];

export default function Strategies() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link to="/Effects" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="mb-10">
          <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">Objective 4</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">Management Strategies</h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Strategies to manage and mitigate the effects of climate change on construction projects in Lagos State, Nigeria.
          </p>
        </div>

        <div className="space-y-6 mb-10">
          {strategies.map((s, i) => (
            <div key={i} className={`bg-white/5 border border-white/10 border-l-4 ${s.color} rounded-2xl overflow-hidden`}>
              <div className={`px-6 py-4 ${s.headerBg}`}>
                <h3 className="text-lg font-bold">{s.category}</h3>
              </div>
              <div className="px-6 py-4 space-y-3">
                {s.items.map((item, j) => (
                  <div key={j} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-300">Conclusion</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Climate change poses a significant and growing threat to construction project delivery in Lagos State, Nigeria. The evidence is clear — rising temperatures, increased flooding, erratic rainfall, and extreme weather events are already impacting construction timelines, costs, quality, and worker safety.
          </p>
          <p className="text-slate-300 leading-relaxed">
            However, through proactive planning, climate-resilient design, improved project management, supportive policies, and stakeholder engagement, the construction industry in Lagos can adapt and continue to deliver successful projects despite the evolving climate challenge.
          </p>
        </div>

        <div className="flex justify-between">
          <Link to="/Effects" className="border border-white/20 hover:border-white/40 transition px-6 py-3 rounded-xl font-semibold text-slate-300">
            ← Previous
          </Link>
          <Link to="/" className="bg-green-600 hover:bg-green-500 transition px-6 py-3 rounded-xl font-semibold">
            Back to Home ✓
          </Link>
        </div>
      </div>
    </div>
  );
}