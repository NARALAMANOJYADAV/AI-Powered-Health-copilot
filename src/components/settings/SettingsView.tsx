"use client";

import React, { useState } from "react";
import { useCareLensStore } from "@/lib/store";
import { ThemeMode, AccessibilityMode, SupportedLanguage } from "@/lib/types";
import {
  Settings,
  Sun,
  FileText,
  Leaf,
  Eye,
  Type,
  ShieldCheck,
  Languages,
  CheckCircle2,
  Lock,
  History,
  FileCheck2,
  Sliders,
} from "lucide-react";

export function SettingsView() {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    accessibility,
    setAccessibility,
  } = useCareLensStore();

  const [consents, setConsents] = useState<Record<string, boolean>>({
    emergency_access: true,
    abdm_sync: true,
    offline_cache: true,
    ai_assistance: true,
  });

  const toggleConsent = (key: string) => {
    setConsents((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const auditLogs = [
    {
      id: "aud-1",
      action: "Doctor Brief Shared (QR Generated)",
      resource: "Consultation Summary",
      timestamp: "Today at 02:15 PM",
      device: "Web Browser (Chrome Windows)",
      status: "Authorized",
    },
    {
      id: "aud-2",
      action: "Document OCR Extraction",
      resource: "Apollo Diagnostics Metabolic Panel",
      timestamp: "Today at 11:30 AM",
      device: "Local Tesseract WASM + Edge Function",
      status: "Verified",
    },
    {
      id: "aud-3",
      action: "ABDM FHIR R4 Bundle Export",
      resource: "Collection Bundle (Patient, Obs, MedReq)",
      timestamp: "Yesterday at 04:45 PM",
      device: "Encrypted Export",
      status: "Completed",
    },
    {
      id: "aud-4",
      action: "Family Profile Switched",
      resource: "Active Profile: Rajesh Kumar",
      timestamp: "Yesterday at 02:10 PM",
      device: "Session Manager",
      status: "Success",
    },
  ];

  const themes: Array<{ id: ThemeMode; label: string; desc: string; icon: React.ReactNode; bg: string; accent: string }> = [
    {
      id: "daylight",
      label: "Daylight",
      desc: "Clean white surfaces, soft blue accent (#2563EB), slate text. Default crisp modern theme.",
      icon: <Sun className="w-5 h-5 text-blue-600" />,
      bg: "bg-white",
      accent: "bg-blue-600",
    },
    {
      id: "paper",
      label: "Paper",
      desc: "Warm cream background (#FBF6EC), brown-gray text, terracotta accent (#C2410C). Low eye strain.",
      icon: <FileText className="w-5 h-5 text-amber-700" />,
      bg: "bg-[#FBF6EC]",
      accent: "bg-[#C2410C]",
    },
    {
      id: "sage",
      label: "Sage",
      desc: "Pale green-gray background (#F1F6F2), deep teal accent (#0F766E). Soothing calm clinical aesthetic.",
      icon: <Leaf className="w-5 h-5 text-teal-700" />,
      bg: "bg-[#F1F6F2]",
      accent: "bg-[#0F766E]",
    },
    {
      id: "high-contrast",
      label: "High Contrast Light",
      desc: "Pure white surface, deep black text (#000000), 3px focus rings. WCAG AAA accessible.",
      icon: <Eye className="w-5 h-5 text-black" />,
      bg: "bg-white",
      accent: "bg-[#1D4ED8]",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-10">
      {/* Header */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
        <h2 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" /> Application Settings &amp; Governance
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure design theme, elderly accessibility modes, patient consent ledger, and view audit trail.
        </p>
      </div>

      {/* Section 1: Themes (No Dark Mode) */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sliders className="w-4 h-4 text-primary" /> Visual Theme (Light Only)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            CareLens strictly enforces high-legibility light color schemes designed for clinical accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {themes.map((t) => {
            const isSelected = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                  isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/40 bg-card"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${t.bg} border border-border flex items-center justify-center flex-shrink-0 shadow-2xs`}>
                  {t.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">{t.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Accessibility & Language */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-5">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Type className="w-4 h-4 text-primary" /> Accessibility &amp; Regional Language
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Accessibility Mode */}
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
            <span className="text-xs font-bold text-foreground block">Reading Accessibility Mode</span>
            <div className="space-y-2">
              {[
                { id: "standard", label: "Standard Layout" },
                { id: "large-text", label: "Large Text Mode (+25% Font Scale)" },
                { id: "simple", label: "Simple Mode (Elderly Friendly)" },
              ].map((mode) => (
                <label
                  key={mode.id}
                  className="flex items-center gap-2.5 text-xs font-semibold text-foreground cursor-pointer"
                >
                  <input
                    type="radio"
                    name="accessibility"
                    checked={accessibility === mode.id}
                    onChange={() => setAccessibility(mode.id as AccessibilityMode)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span>{mode.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Language Preference */}
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
            <span className="text-xs font-bold text-foreground block">Default Explanation Language</span>
            <div className="space-y-2">
              {[
                { code: "en", label: "English" },
                { code: "te", label: "Telugu (తెలుగు)" },
                { code: "hi", label: "Hindi (हिन्दी)" },
                { code: "ta", label: "Tamil (தமிழ்)" },
              ].map((lang) => (
                <label
                  key={lang.code}
                  className="flex items-center gap-2.5 text-xs font-semibold text-foreground cursor-pointer"
                >
                  <input
                    type="radio"
                    name="language"
                    checked={language === lang.code}
                    onChange={() => setLanguage(lang.code as SupportedLanguage)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span>{lang.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Patient Consent Ledger */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" /> Patient Consent Ledger
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            You retain absolute sovereignty over your medical data. Revoke permissions at any time.
          </p>
        </div>

        <div className="space-y-2.5 pt-1">
          {[
            {
              key: "emergency_access",
              title: "Emergency Doctor QR Access",
              desc: "Allows doctors with the 24-hour token to review active medicines and critical alerts.",
            },
            {
              key: "abdm_sync",
              title: "ABDM Health Information Provider (HIP) Sync",
              desc: "Allows encrypted record discovery in Ayushman Bharat Digital Mission sandbox.",
            },
            {
              key: "offline_cache",
              title: "Offline PWA Record Caching",
              desc: "Securely stores processed lab reports locally for offline consultation.",
            },
            {
              key: "ai_assistance",
              title: "Edge Function Medical Explanation",
              desc: "Enables natural-language summarization using privacy-masked tokens.",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="p-3.5 rounded-xl border border-border bg-card flex items-center justify-between gap-4"
            >
              <div>
                <span className="font-bold text-xs text-foreground block">{item.title}</span>
                <span className="text-[11px] text-muted-foreground mt-0.5 block">{item.desc}</span>
              </div>

              <button
                onClick={() => toggleConsent(item.key)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 flex-shrink-0 ${
                  consents[item.key] ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    consents[item.key] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Immutable Audit Trail */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <History className="w-4 h-4 text-primary" /> Security &amp; Access Audit Log
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Cryptographically stamped ledger tracking every view, generation, and export event.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-semibold">
                <th className="py-2.5 px-3">Event Action</th>
                <th className="py-2.5 px-3">Resource Target</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-muted/20">
                  <td className="py-3 px-3 font-bold text-foreground">{log.action}</td>
                  <td className="py-3 px-3 text-muted-foreground">{log.resource}</td>
                  <td className="py-3 px-3 text-muted-foreground whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
