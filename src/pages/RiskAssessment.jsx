import { useState } from "react";
import { Info, Upload, X } from "lucide-react";

const lagosAreas = [
  "Lagos Island", "Lagos Mainland", "Ikeja", "Lekki", "Victoria Island",
  "Surulere", "Alimosho", "Ikorodu", "Epe", "Badagry",
  "Ajah", "Apapa", "Ojo", "Kosofe", "Mushin"
];

const projectTypes = ["Residential Building", "Commercial Building", "Road Construction", "Bridge", "Industrial Facility", "Mixed-Use Development"];

function RiskMeter({ label, score, color }) {
  const pct = Math.min(100, Math.max(0, score));
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium" style={{ color: "var(--bc-label)" }}>{label}</span>
        <span className={`text-sm font-bold ${color}`}>{pct}%</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--bc-surface2)" }}>
        <div
          className={`h-full rounded-full transition-all duration-700 ${pct >= 70 ? "bg-red-500" : pct >= 40 ? "bg-yellow-500" : "bg-green-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function getRiskLevel(score) {
  if (score >= 70) return { label: "High Risk", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" };
  if (score >= 40) return { label: "Moderate Risk", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30" };
  return { label: "Low Risk", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30" };
}

const floodRiskByArea = {
  "Lagos Island": 80, "Lagos Mainland": 75, "Ikeja": 55, "Lekki": 85, "Victoria Island": 78,
  "Surulere": 65, "Alimosho": 50, "Ikorodu": 70, "Epe": 60, "Badagry": 72,
  "Ajah": 80, "Apapa": 75, "Ojo": 60, "Kosofe": 58, "Mushin": 65
};

const typeHeatRisk = {
  "Residential Building": 50, "Commercial Building": 55, "Road Construction": 80,
  "Bridge": 65, "Industrial Facility": 70, "Mixed-Use Development": 58
};

export default function RiskAssessment() {
  const [form, setForm] = useState({ location: "", type: "", duration: "", startMonth: "" });
  const [result, setResult] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const rainyMonths = [3, 4, 5, 6, 7, 8, 9, 10];

  function calculate() {
    const startIdx = months.indexOf(form.startMonth);
    const dur = parseInt(form.duration) || 6;

    const floodRisk = floodRiskByArea[form.location] || 60;

    let rainyOverlap = 0;
    for (let i = 0; i < dur; i++) {
      if (rainyMonths.includes((startIdx + i) % 12)) rainyOverlap++;
    }
    const rainfallRisk = Math.min(95, Math.round((rainyOverlap / Math.max(dur, 1)) * 100));

    const heatRisk = typeHeatRisk[form.type] || 55;

    const overall = Math.round((floodRisk * 0.4 + rainfallRisk * 0.35 + heatRisk * 0.25));
    const riskLevel = overall >= 70 ? "High Risk" : overall >= 40 ? "Moderate Risk" : "Low Risk";

    const newResult = { floodRisk, rainfallRisk, heatRisk, overall };
    setResult(newResult);
  }

  const canSubmit = form.location && form.type && form.duration && form.startMonth;
  const risk = result ? getRiskLevel(result.overall) : null;

  function handleFileUpload(files) {
    const excelFiles = Array.from(files).filter(file => 
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel' ||
      file.name.endsWith('.xlsx') || 
      file.name.endsWith('.xls')
    );
    
    const newFiles = excelFiles.map(file => ({
      id: Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2)
    }));
    
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  }

  function removeFile(id) {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Tool 1</span>
        <h1 className="text-4xl font-bold mt-2 mb-3">Climate Risk Assessment Tool</h1>
        <p className="leading-relaxed" style={{ color: "var(--bc-text-muted)" }}>
          Enter your project details below to receive a climate risk score covering flood risk, rainfall delay risk, and heat stress risk for your Lagos construction project.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl p-6" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
          <h2 className="text-lg font-bold mb-6">Project Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--bc-label)" }}>Project Location in Lagos</label>
              <select
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              style={{ background: "var(--bc-surface2)", border: "1px solid var(--bc-border)", color: "var(--bc-text)" }}
              >
                <option value="">Select a location</option>
                {lagosAreas.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--bc-label)" }}>Project Type</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              style={{ background: "var(--bc-surface2)", border: "1px solid var(--bc-border)", color: "var(--bc-text)" }}
              >
                <option value="">Select project type</option>
                {projectTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--bc-label)" }}>Project Duration (months)</label>
              <input
                type="number" min="1" max="60"
                value={form.duration}
                onChange={e => setForm({ ...form, duration: e.target.value })}
                placeholder="e.g. 12"
                className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                style={{ background: "var(--bc-surface2)", border: "1px solid var(--bc-border)", color: "var(--bc-text)" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--bc-label)" }}>Project Start Month</label>
              <select
                value={form.startMonth}
                onChange={e => setForm({ ...form, startMonth: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              style={{ background: "var(--bc-surface2)", border: "1px solid var(--bc-border)", color: "var(--bc-text)" }}
              >
                <option value="">Select start month</option>
                {months.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <button
              onClick={calculate}
              className="w-full bg-blue-600 hover:bg-blue-500 transition-colors py-3 rounded-xl font-semibold mt-2"
            >
              Generate Risk Score
            </button>
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
          <h2 className="text-lg font-bold mb-6">Risk Assessment Results</h2>
          {!result ? (
            <div className="flex flex-col items-center justify-center h-48" style={{ color: "var(--bc-text-muted)" }}>
              <Info className="w-10 h-10 mb-3 opacity-50" />
              <p className="text-sm">Fill in the form to generate your climate risk score.</p>
            </div>
          ) : (
            <div>
              <div className={`rounded-xl border p-4 mb-6 text-center ${risk.bg}`}>
                <p className="text-sm mb-1" style={{ color: "var(--bc-text-muted)" }}>Overall Climate Risk Score</p>
                <p className={`text-5xl font-extrabold ${risk.color}`}>{result.overall}%</p>
                <p className={`font-semibold mt-1 ${risk.color}`}>{risk.label}</p>
              </div>
              <RiskMeter label="Flood Risk" score={result.floodRisk} color={getRiskLevel(result.floodRisk).color} />
              <RiskMeter label="Rainfall Delay Risk" score={result.rainfallRisk} color={getRiskLevel(result.rainfallRisk).color} />
              <RiskMeter label="Heat Stress Risk" score={result.heatRisk} color={getRiskLevel(result.heatRisk).color} />

              <div className="mt-4 rounded-xl p-4 text-sm leading-relaxed" style={{ background: "var(--bc-surface2)", color: "var(--bc-text-muted)" }}>
                {result.overall >= 70
                  ? "⚠️ High risk detected. Immediate adaptation strategies are recommended. Review the Adaptation Guide for mitigation measures."
                  : result.overall >= 40
                  ? "⚡ Moderate risk. Climate-resilient planning is advised. Consider adjusting your project schedule around the rainy season."
                  : "✅ Lower risk profile. Standard climate precautions are sufficient. Monitor weather patterns regularly."}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 rounded-2xl p-6" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
        <h2 className="text-lg font-bold mb-4">Upload Project Data (Optional)</h2>
        <p className="text-sm mb-6" style={{ color: "var(--bc-text-muted)" }}>
          Import your project data from Excel spreadsheets to enhance your risk assessment.
        </p>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all ${
            dragActive
              ? "border-blue-500 bg-blue-500/5"
              : "border-slate-400/30 hover:border-blue-400/50"
          }`}
          style={dragActive ? { borderColor: "#3b82f6", backgroundColor: "rgba(59, 130, 246, 0.05)" } : {}}
        >
          <Upload className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p className="font-medium mb-1" style={{ color: "var(--bc-text)" }}>Drag and drop Excel files here</p>
          <p className="text-sm mb-4" style={{ color: "var(--bc-text-muted)" }}>or</p>
          <label className="inline-block">
            <span className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-medium cursor-pointer transition-colors">
              Browse Files
            </span>
            <input
              type="file"
              multiple
              accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
          </label>
          <p className="text-xs mt-4" style={{ color: "var(--bc-text-muted)" }}>Supported formats: .xlsx, .xls</p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium mb-3" style={{ color: "var(--bc-text)" }}>
              Uploaded Files ({uploadedFiles.length})
            </p>
            <div className="space-y-2">
              {uploadedFiles.map(file => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ background: "var(--bc-surface2)", border: "1px solid var(--bc-border)" }}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <Upload className="w-4 h-4 text-blue-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: "var(--bc-text)" }}>{file.name}</p>
                      <p className="text-xs" style={{ color: "var(--bc-text-muted)" }}>{file.size} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 hover:bg-red-500/10 rounded transition-colors"
                    title="Remove file"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}