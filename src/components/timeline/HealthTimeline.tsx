"use client";

import React, { useState } from "react";
import { TimelineEvent } from "@/lib/types";
import {
  History,
  Search,
  Filter,
  FileText,
  Pill,
  Stethoscope,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowRight,
  Sparkles,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export function HealthTimeline({
  onSelectEvent,
  onNavigateToUpload,
}: {
  onSelectEvent?: (eventId: string) => void;
  onNavigateToUpload: () => void;
}) {
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Curated timeline events
  const defaultEvents: TimelineEvent[] = [
    {
      id: "evt-1",
      event_type: "lab_report",
      title: "Comprehensive Metabolic & Diabetes Panel",
      summary: "HbA1c elevated at 8.1%, FBS 165 mg/dL. Renal profile within normal limits (Creatinine 0.9 mg/dL).",
      event_date: "2026-10-10",
      severity: "attention",
      delta_summary: "HbA1c increased by +0.9% compared to previous test on 2026-07-15.",
      details: {
        facility: "Apollo Diagnostics, Hyderabad",
        doctor: "Dr. V. K. Sharma",
        biomarkers: [
          { name: "HbA1c", val: 8.1, unit: "%", flag: "high" },
          { name: "Fasting Blood Sugar", val: 165, unit: "mg/dL", flag: "high" },
          { name: "Creatinine", val: 0.9, unit: "mg/dL", flag: "normal" },
          { name: "Cholesterol", val: 188, unit: "mg/dL", flag: "normal" },
        ],
      },
    },
    {
      id: "evt-2",
      event_type: "prescription",
      title: "Quarterly Hypertension & Diabetes Rx Refill",
      summary: "Prescribed Glycomet 500mg (1-0-1), Telma 40mg (1-0-0), and added Storvas 10mg (0-0-1) for lipid optimization.",
      event_date: "2026-10-02",
      severity: "normal",
      delta_summary: "Added new lipid therapy (Atorvastatin 10mg bedtime).",
      details: {
        doctor: "Dr. Sunita Rao, Cardiologist",
        medicines: ["Glycomet 500mg", "Telma 40mg", "Storvas 10mg", "Pan 40"],
      },
    },
    {
      id: "evt-3",
      event_type: "doctor_visit",
      title: "Annual Preventive Health Consultation",
      summary: "Physical exam normal. Blood pressure 128/82 mmHg. Advised 30 minutes daily aerobic exercise and dietary salt restriction.",
      event_date: "2026-08-20",
      severity: "normal",
      delta_summary: "BP controlled vs 136/88 in previous visit.",
      details: {
        doctor: "Dr. P. Murthy",
        vitals: "BP: 128/82 mmHg | Weight: 74 kg | BMI: 24.8",
      },
    },
    {
      id: "evt-4",
      event_type: "lab_report",
      title: "Quarterly Glycemic & Lipid Review",
      summary: "HbA1c was 7.2%, Fasting Blood Sugar 142 mg/dL. Total Cholesterol was 210 mg/dL.",
      event_date: "2026-07-15",
      severity: "normal",
      details: {
        facility: "Vijaya Diagnostics",
        biomarkers: [
          { name: "HbA1c", val: 7.2, unit: "%", flag: "borderline" },
          { name: "Fasting Blood Sugar", val: 142, unit: "mg/dL", flag: "borderline" },
          { name: "Total Cholesterol", val: 210, unit: "mg/dL", flag: "borderline" },
        ],
      },
    },
  ];

  const filtered = defaultEvents.filter((evt) => {
    const matchesFilter = filterType === "all" || evt.event_type === filterType;
    const matchesSearch =
      searchQuery === "" ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-10">
      {/* Header */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <History className="w-6 h-6 text-primary" /> Health Timeline
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Unified chronological health profile of reports, prescriptions, and consults.
            </p>
          </div>

          <button
            onClick={onNavigateToUpload}
            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 hover:opacity-95 transition-opacity"
          >
            + Add New Record
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports, medicines, doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-semibold rounded-xl bg-muted border border-border pl-9 pr-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: "All Records" },
              { id: "lab_report", label: "Labs" },
              { id: "prescription", label: "Prescriptions" },
              { id: "doctor_visit", label: "Consultations" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                  filterType === f.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* "What Changed Since Last Report" Comparative Card */}
      <div className="bg-card rounded-2xl border border-primary/30 p-6 shadow-card bg-gradient-to-br from-card via-blue-50/15 to-card">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold text-foreground">What Changed Since Last Report?</h3>
          <span className="text-xs text-muted-foreground ml-auto">10-Oct-2026 vs 15-Jul-2026</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>HbA1c</span>
              <span className="flex items-center gap-0.5 text-red-600">
                <TrendingUp className="w-3.5 h-3.5" /> +0.9%
              </span>
            </div>
            <div className="text-base font-extrabold text-foreground mt-1">8.1% vs 7.2%</div>
            <p className="text-[11px] text-amber-800 mt-1">
              Elevated past target threshold of 5.7%. Recommended for doctor review.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
              <span>Total Cholesterol</span>
              <span className="flex items-center gap-0.5 text-emerald-600">
                <TrendingDown className="w-3.5 h-3.5" /> -22 mg/dL
              </span>
            </div>
            <div className="text-base font-extrabold text-foreground mt-1">188 vs 210 mg/dL</div>
            <p className="text-[11px] text-emerald-800 mt-1">
              Improved into desirable target range under 200 mg/dL.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900">
              <span>Medication Regimen</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                New Add
              </span>
            </div>
            <div className="text-base font-extrabold text-foreground mt-1">Storvas 10mg</div>
            <p className="text-[11px] text-blue-800 mt-1">
              Added Atorvastatin 10mg at bedtime for secondary prevention.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Feed */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-border">
        {filtered.map((item) => {
          const isLab = item.event_type === "lab_report";
          const isPrescription = item.event_type === "prescription";
          const isAttention = item.severity === "attention";

          return (
            <div key={item.id} className="relative pl-12">
              {/* Dot / Icon on timeline rail */}
              <div
                className={`absolute left-2.5 top-5 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-card flex items-center justify-center shadow-sm ${
                  isAttention
                    ? "bg-amber-100 text-amber-700 ring-2 ring-amber-300"
                    : isLab
                    ? "bg-blue-100 text-blue-700"
                    : isPrescription
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {isLab ? (
                  <FileText className="w-4 h-4" />
                ) : isPrescription ? (
                  <Pill className="w-4 h-4" />
                ) : (
                  <Stethoscope className="w-4 h-4" />
                )}
              </div>

              {/* Event Card */}
              <div
                onClick={() => onSelectEvent && onSelectEvent(item.id)}
                className="bg-card rounded-2xl border border-border p-5 shadow-card hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isLab
                          ? "bg-blue-100 text-blue-800"
                          : isPrescription
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {item.event_type.replace("_", " ")}
                    </span>
                    <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.event_date}
                  </span>
                </div>

                <p className="text-xs text-foreground/90 mt-2 leading-relaxed">{item.summary}</p>

                {item.delta_summary && (
                  <div className="mt-3 p-2.5 rounded-xl bg-muted/50 border border-border text-[11px] text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{item.delta_summary}</span>
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-border/60">
                  <span className="text-muted-foreground text-[11px]">
                    {String(item.details?.facility || item.details?.doctor || "Health Record")}
                  </span>
                  <span className="text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Verified Evidence <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
