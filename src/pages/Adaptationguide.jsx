import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, Shield, Droplets, Thermometer, Calendar, HardHat, Wrench } from "lucide-react";

const categories = [
  {
    icon: Droplets,
    title: "Improved Drainage Planning",
    color: "border-l-blue-500",
    headerColor: "text-blue-400",
    bg: "bg-blue-500/10",
    strategies: [
      { title: "Site Drainage Surveys", desc: "Conduct comprehensive pre-construction drainage surveys to identify waterlogging and flood-prone zones on site." },
      { title: "Perimeter Drainage Channels", desc: "Install perimeter drainage channels and cut-off drains to divert surface water away from the construction site." },
      { title: "Sump Pumps & Dewatering", desc: "Deploy sump pumps and dewatering systems for immediate removal of accumulated water during and after rainfall events." },
      { title: "Elevated Site Platforms", desc: "Elevate construction platforms and storage areas in high-flood-risk zones such as Lekki, Lagos Island, and Apapa." },
      { title: "Green Infrastructure", desc: "Incorporate permeable paving, bioswales, and rain gardens to manage stormwater runoff sustainably on-site." },
    ]
  },
  {
    icon: Wrench,
    title: "Climate-Resilient Construction Materials",
    color: "border-l-orange-500",
    headerColor: "text-orange-400",
    bg: "bg-orange-500/10",
    strategies: [
      { title: "Corrosion-Resistant Steel", desc: "Use galvanized or stainless steel reinforcement bars to resist accelerated corrosion caused by high humidity and saline environments." },
      { title: "Waterproof Concrete Mixes", desc: "Specify waterproof admixtures and concrete mixes with low water-cement ratios to enhance resistance to flooding and moisture ingress." },
      { title: "Heat-Resistant Roofing", desc: "Use reflective or cool-roof materials to reduce heat absorption, particularly in Ikeja and Alimosho zones with extreme heat exposure." },
      { title: "Composite & Polymer Materials", desc: "Adopt polymer-based composites for non-structural elements that are resistant to moisture, heat, and UV degradation." },
      { title: "Sustainable Timber & Bio-Based Materials", desc: "Use treated, sustainably sourced timber and bio-based materials with low embodied carbon and improved climate resilience." },
    ]
  },
  {
    icon: Calendar,
    title: "Construction Scheduling Adjustments",
    color: "border-l-green-500",
    headerColor: "text-green-400",
    bg: "bg-green-500/10",
    strategies: [
      { title: "Dry Season Scheduling", desc: "Plan and schedule weather-sensitive activities (earthworks, foundation works, concrete pours) during Lagos's dry season (November–March)." },
      { title: "Climate-Contingent Buffer Time", desc: "Add 20–40% contingency time in project schedules to account for expected weather-related delays during the rainy season." },
      { title: "Activity Phasing", desc: "Phase construction activities so critical structural works are completed before the June–September peak rainy season." },
      { title: "Real-Time Weather Monitoring", desc: "Install on-site weather monitoring stations and subscribe to NIMET early warning systems for proactive scheduling decisions." },
      { title: "Night Construction Shifts", desc: "Consider night-time construction shifts during extreme heat periods (April–May) to reduce heat stress and improve worker productivity." },
    ]
  },
  {
    icon: HardHat,
    title: "Worker Heat Safety Measures",
    color: "border-l-red-500",
    headerColor: "text-red-400",
    bg: "bg-red-500/10",
    strategies: [
      { title: "Hydration Stations", desc: "Install dedicated hydration stations providing clean, cool water on all construction sites, particularly in high-heat zones like Ikeja." },
      { title: "Shaded Rest Areas", desc: "Provide shaded, ventilated rest areas and enforce regular rest breaks during peak afternoon heat hours (12pm–3pm)." },
      { title: "Heat Stress Monitoring", desc: "Train site supervisors to recognize and respond to heat exhaustion and heat stroke. Implement a buddy system during extreme heat." },
      { title: "Lightweight PPE", desc: "Provide lightweight, breathable personal protective equipment (PPE) designed for tropical conditions to reduce heat load on workers." },
      { title: "Heat Safety Inductions", desc: "Conduct mandatory heat safety inductions for all construction workers, especially during the dry-hot season (January–April)." },
    ]
  },
  {
    icon: Shield,
    title: "Structural & Foundation Resilience",
    color: "border-l-purple-500",
    headerColor: "text-purple-400",
    bg: "bg-purple-500/10",
    strategies: [
      { title: "Deep Pile Foundations", desc: "Use deep pile foundations in coastal and flood-prone areas to avoid foundation failure due to soil saturation and erosion." },
      { title: "Flood-Proofing Ground Floors", desc: "Elevate ground floors above the 100-year flood level in high-risk areas; use flood barriers and water-resistant construction below flood level." },
      { title: "Wind-Resistant Design", desc: "Design structures to withstand increased wind speeds from tropical storms, using wind-braced frames and aerodynamic roof profiles." },
      { title: "Climate-Resilient Infrastructure Standards", desc: "Apply international climate-resilient infrastructure standards (e.g., ISO 14090) in addition to Nigerian building codes." },
      { title: "Post-Construction Climate Audits", desc: "Conduct annual post-construction climate vulnerability audits to identify deterioration caused by climate factors and implement remediation." },
    ]
  },
];

function CategoryCard({ cat }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-l-4 ${cat.color} rounded-2xl overflow-hidden`} style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 transition-colors hover:opacity-80"
      >
        <div className="flex items-center gap-3">
          <cat.icon className={`w-6 h-6 ${cat.headerColor}`} />
          <span className="font-bold text-lg">{cat.title}</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5" style={{ color: "var(--bc-text-muted)" }} /> : <ChevronDown className="w-5 h-5" style={{ color: "var(--bc-text-muted)" }} />}
      </button>
      {open && (
        <div className={`px-6 pb-6 pt-2 ${cat.bg}`}>
          <div className="space-y-4">
            {cat.strategies.map((s, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${cat.headerColor}`} />
                <div>
                  <p className="font-semibold text-sm mb-0.5" style={{ color: "var(--bc-text)" }}>{s.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--bc-text-muted)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdaptationGuide() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">Resource</span>
        <h1 className="text-4xl font-bold mt-2 mb-3">Adaptation Strategy Guide</h1>
        <p className="leading-relaxed" style={{ color: "var(--bc-text-muted)" }}>
          Practical, evidence-based adaptation strategies for contractors, engineers, and project managers working in climate-affected construction environments in Lagos State.
        </p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 mb-8 text-sm leading-relaxed" style={{ color: "var(--bc-text-soft)" }}>
        <strong className="text-blue-300">How to use this guide:</strong> Click each category to expand the full set of adaptation strategies. These recommendations are based on climate research, Lagos construction case studies, and international best practices.
      </div>

      <div className="space-y-4">
        {categories.map((cat, i) => <CategoryCard key={i} cat={cat} />)}
      </div>
    </div>
  );
}