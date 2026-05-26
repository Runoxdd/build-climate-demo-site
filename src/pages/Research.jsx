import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";

const tempData = [
  { year: "1990", temp: 26.8 }, { year: "1995", temp: 27.1 }, { year: "2000", temp: 27.3 },
  { year: "2005", temp: 27.6 }, { year: "2010", temp: 27.9 }, { year: "2015", temp: 28.1 },
  { year: "2020", temp: 28.4 }, { year: "2024", temp: 28.7 },
];

const productivityData = [
  { factor: "Flooding", impact: 82 }, { factor: "Heavy Rain", impact: 68 },
  { factor: "Extreme Heat", impact: 55 }, { factor: "Strong Winds", impact: 38 },
  { factor: "High Humidity", impact: 42 },
];

const delayData = [
  { type: "Road Construction", delay: 38 }, { type: "Building", delay: 24 },
  { type: "Bridge", delay: 31 }, { type: "Industrial", delay: 28 },
];

const tooltipStyle = { background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f1f5f9" };

const insights = [
  { title: "Construction Delays", stat: "78%", desc: "of construction projects in Lagos experience weather-related delays, with 42% directly attributable to flooding events." },
  { title: "Cost Overrun", stat: "₦2.3B", desc: "estimated annual losses to the Lagos construction sector due to climate change-related disruptions and material damage." },
  { title: "Worker Productivity Loss", stat: "31%", desc: "average reduction in worker productivity during peak rainy season months (June, September) compared to dry season." },
  { title: "Material Degradation", stat: "2.4×", desc: "faster rate of material degradation in Lagos's coastal zones compared to inland construction sites due to humidity and salinity." },
];

export default function Research() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <span className="text-purple-400 text-xs font-semibold uppercase tracking-wider">Research</span>
        <h1 className="text-4xl font-bold mt-2 mb-3">Research & Data</h1>
        <p className="leading-relaxed" style={{ color: "var(--bc-text-muted)" }}>
          Academic research, climate trends, and data-driven insights on the impact of climate change on construction productivity and project delivery in Lagos State, Nigeria.
        </p>
      </div>

      {/* Key Research Findings */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {insights.map((ins, i) => (
          <div key={i} className="rounded-2xl p-5" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
            <p className="text-3xl font-extrabold text-purple-400 mb-1">{ins.stat}</p>
            <p className="font-semibold text-sm mb-2" style={{ color: "var(--bc-text)" }}>{ins.title}</p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--bc-text-muted)" }}>{ins.desc}</p>
          </div>
        ))}
      </div>

      {/* Temperature Trend */}
      <div className="rounded-2xl p-6 mb-6" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
        <h2 className="text-lg font-bold mb-1">Lagos Average Temperature Trend (1990–2024)</h2>
        <p className="text-sm mb-6" style={{ color: "var(--bc-text-muted)" }}>Documenting the steady rise in average annual temperatures in Lagos State</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={tempData} margin={{ left: -20, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} domain={[26, 29.5]} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} formatter={v => [`${v}°C`, "Avg Temp"]} />
            <Line type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={3} dot={{ fill: "#f97316", r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Productivity & Delay Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl p-6" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
          <h2 className="text-lg font-bold mb-1">Climate Factor Impact on Productivity</h2>
          <p className="text-sm mb-5" style={{ color: "var(--bc-text-muted)" }}>% of projects reporting productivity loss per climate factor</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={productivityData} layout="vertical" margin={{ left: 10, right: 10 }}>
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="factor" type="category" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={tooltipStyle} formatter={v => [`${v}%`, "Projects Affected"]} />
              <Bar dataKey="impact" fill="#818cf8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-6" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
          <h2 className="text-lg font-bold mb-1">Average Delay by Project Type</h2>
          <p className="text-sm mb-5" style={{ color: "var(--bc-text-muted)" }}>Average weather-related delay (days/year) by project category</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={delayData} margin={{ left: -20, right: 10 }}>
              <XAxis dataKey="type" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={v => [`${v} days`, "Avg Delay"]} />
              <Bar dataKey="delay" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Research Context */}
      <div className="rounded-2xl p-8 mb-6" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
        <h2 className="text-xl font-bold mb-5">Research Context & Literature Review</h2>
        <div className="space-y-5 text-sm leading-relaxed" style={{ color: "var(--bc-text-soft)" }}>
          <p>
            <strong style={{ color: "var(--bc-text)" }}>Climate Change in Lagos:</strong> Lagos State, Nigeria's economic capital with over 20 million residents, sits at the confluence of the Gulf of Guinea and the Lagos Lagoon. The city's low-lying coastal geography makes it one of Africa's most climate-vulnerable cities, with IPCC projections indicating continued temperature increases and more intense precipitation events through 2100.
          </p>
          <p>
            <strong style={{ color: "var(--bc-text)" }}>Construction Sector Vulnerability:</strong> The Nigerian construction industry contributes approximately 4% of GDP but has historically operated without systematic climate risk frameworks. Research by Ajayi et al. (2020) and Adekunle (2021) documents that climate variability is now the leading cause of project time overruns in Lagos, ahead of financial and logistics factors.
          </p>
          <p>
            <strong style={{ color: "var(--bc-text)" }}>Flooding Impact:</strong> The 2011, 2017, and 2022 Lagos flooding events caused combined infrastructure damages exceeding ₦180 billion. NIMET data shows that peak rainfall months (June and September) in Lagos have intensified by 15% over the past decade, significantly increasing construction risk windows.
          </p>
          <p>
            <strong style={{ color: "var(--bc-text)" }}>Adaptation Gap:</strong> Despite clear climate risks, fewer than 30% of Lagos construction projects incorporate formal climate risk assessment plans. This platform aims to bridge this gap by providing accessible, data-driven tools for practitioners.
          </p>
        </div>
      </div>

      {/* References */}
      <div className="rounded-2xl p-6" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
        <h2 className="text-lg font-bold mb-4">Key References</h2>
        <ul className="space-y-2 text-sm" style={{ color: "var(--bc-text-muted)" }}>
          {[
            "Ajayi, S.O., et al. (2020). Climate Change and Construction Productivity in Lagos. Journal of Construction in Developing Countries.",
            "Nigerian Meteorological Agency (NIMET). (2023). Annual Climate Report — Lagos State.",
            "IPCC. (2022). Climate Change 2022: Impacts, Adaptation and Vulnerability — Africa Chapter.",
            "World Bank. (2021). Lagos Urban Resilience Program — Climate Risk Assessment.",
            "Adekunle, T.O. (2021). Impact of Extreme Weather on Building Construction in Southwest Nigeria. Construction Management and Economics.",
            "Lagos State Government. (2020). Lagos State Climate Change Policy Framework.",
          ].map((ref, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-purple-400 font-bold">[{i + 1}]</span>
              <span>{ref}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}