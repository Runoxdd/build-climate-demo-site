import { useState } from "react";
import { Send, CheckCircle2, Mail, BookOpen, Users } from "lucide-react";
import { base44 } from "@/api/base44Client";

const feedbackTypes = [
  "Research Contribution", "Data Submission", "Tool Feedback",
  "Collaboration Request", "General Enquiry", "Bug Report"
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", organization: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await base44.entities.ContactSubmission.create(form);
    setLoading(false);
    setSubmitted(true);
  }

  const infoCards = [
    { icon: Mail, title: "Submit Feedback", desc: "Share your thoughts on the platform tools and data accuracy to help us improve." },
    { icon: BookOpen, title: "Research Contributions", desc: "Contribute research data, case studies, or academic findings on Lagos climate and construction." },
    { icon: Users, title: "Collaborate", desc: "We welcome collaboration with academic institutions, government agencies, and industry bodies." },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Engage</span>
        <h1 className="text-4xl font-bold mt-2 mb-3">Contact & Feedback</h1>
        <p className="leading-relaxed" style={{ color: "var(--bc-text-muted)" }}>
          Submit feedback, research contributions, or collaboration requests to help improve the BuildClimate platform.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {infoCards.map((c, i) => (
          <div key={i} className="rounded-2xl p-5" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
            <c.icon className="w-6 h-6 text-blue-400 mb-3" />
            <p className="font-semibold mb-1">{c.title}</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--bc-text-muted)" }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-8 max-w-2xl mx-auto" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
        {submitted ? (
          <div className="text-center py-10">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="mb-6" style={{ color: "var(--bc-text-muted)" }}>Your submission has been received. We'll review it and get back to you within 3–5 business days.</p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: "", email: "", organization: "", type: "", message: "" }); }}
              className="bg-blue-600 hover:bg-blue-500 transition px-6 py-2.5 rounded-xl font-semibold text-sm"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-xl font-bold mb-2">Send a Message</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--bc-label)" }}>Full Name *</label>
                <input
                  required value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Dr. John Adeyemi"
                  className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                style={{ background: "var(--bc-surface2)", border: "1px solid var(--bc-border)", color: "var(--bc-text)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--bc-text-muted)" }}>Email Address *</label>
                <input
                  required type="email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="j.adeyemi@unilag.edu.ng"
                  className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  style={{ background: "var(--bc-surface2)", border: "1px solid var(--bc-border)", color: "var(--bc-text)" }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--bc-label)" }}>Organization / Institution</label>
              <input
                value={form.organization}
                onChange={e => setForm({ ...form, organization: e.target.value })}
                placeholder="University of Lagos / XYZ Construction Ltd"
                className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                style={{ background: "var(--bc-surface2)", border: "1px solid var(--bc-border)", color: "var(--bc-text)" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--bc-label)" }}>Submission Type *</label>
              <select
                required value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                style={{ background: "var(--bc-surface2)", border: "1px solid var(--bc-border)", color: "var(--bc-text)" }}
              >
                <option value="">Select a type</option>
                {feedbackTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--bc-label)" }}>Message *</label>
              <textarea
                required value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Please describe your feedback, research contribution, or enquiry..."
                rows={5}
                className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
                style={{ background: "var(--bc-surface2)", border: "1px solid var(--bc-border)", color: "var(--bc-text)" }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            disabled={loading}
            >
              <Send className="w-4 h-4" /> {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}