"use client";

import React from "react";
import { useCareLensStore } from "@/lib/store";
import {
  Camera,
  Activity,
  Pill,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
  QrCode,
  ShieldCheck,
  Calendar,
  Clock,
  ExternalLink,
} from "lucide-react";

export function BentoDashboard({
  onNavigate,
  onScanSample,
}: {
  onNavigate: (tab: string) => void;
  onScanSample?: (sampleType: "diabetes_lab" | "cardiac_prescription") => void;
}) {
  const { theme, language, accessibility, familyMembers, activeFamilyMemberId, cachedDocuments } = useCareLensStore();

  const activeMember = familyMembers.find((m) => m.id === activeFamilyMemberId);
  const patientName = activeMember ? activeMember.name : "Rajesh Kumar";
  const patientRelation = activeMember ? activeMember.relationship : "Self";

  // Mock adherence for today
  const [adherenceChecked, setAdherenceChecked] = React.useState<Record<string, boolean>>({
    morning_glycomet: true,
    morning_telma: true,
    night_storvas: false,
  });

  const toggleAdherence = (key: string) => {
    setAdherenceChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const adherencePercentage = Math.round(
    (Object.values(adherenceChecked).filter(Boolean).length / Object.values(adherenceChecked).length) * 100
  );

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Top Banner: Patient Context & Quick Summary */}
      <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              Active Profile: {patientRelation}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> ABDM Linked
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1.5 tracking-tight">
            Welcome back, {patientName}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your personal clinical timeline is up to date. 1 report requires review.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate("upload")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md shadow-primary/20 hover:opacity-95 transition-all"
          >
            <Camera className="w-4 h-4" />
            Scan New Report
          </button>
          <button
            onClick={() => onNavigate("brief")}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-muted border border-border text-foreground font-semibold text-sm hover:bg-muted/80 transition-colors"
          >
            <QrCode className="w-4 h-4 text-primary" />
            Doctor Brief
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Urgent Attention / Clinical Alert Banner (Col Span 2) */}
        <div className="md:col-span-2 bg-card rounded-2xl border border-amber-200/80 p-5 shadow-card relative overflow-hidden bg-gradient-to-br from-card via-amber-50/20 to-card">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">Clinical Attention Notice</h3>
                <p className="text-xs text-muted-foreground">From Recent Comprehensive Metabolic Report</p>
              </div>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              Needs Review
            </span>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-950 space-y-1.5">
            <div className="flex items-center justify-between font-medium">
              <span className="font-semibold text-amber-900">HbA1c Level: 8.1% (Standard Target: &lt; 5.7%)</span>
              <span className="font-bold text-amber-700">High</span>
            </div>
            <p className="text-amber-800/90 leading-relaxed">
              Your average blood sugar over the last 90 days is elevated above normal. We recommend contacting your doctor soon to discuss your medication schedule.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Source document verified on Oct 10, 2026</span>
            <button
              onClick={() => onNavigate("timeline")}
              className="font-bold text-primary flex items-center gap-1 hover:underline"
            >
              Inspect Source &amp; Evidence <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Today's Medication Adherence (Col Span 1) */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Today&apos;s Adherence</span>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {adherencePercentage}% Taken
              </span>
            </div>

            <h3 className="text-lg font-bold text-foreground mt-2 flex items-center gap-2">
              <Pill className="w-4 h-4 text-primary" /> Daily Schedule
            </h3>

            <div className="mt-3 space-y-2">
              <div
                onClick={() => toggleAdherence("morning_glycomet")}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  adherenceChecked.morning_glycomet
                    ? "bg-emerald-50/50 border-emerald-200 text-emerald-900"
                    : "bg-muted/40 border-border text-foreground hover:bg-muted"
                }`}
              >
                <div>
                  <div className="text-xs font-bold">Glycomet 500mg</div>
                  <div className="text-[11px] text-muted-foreground">Morning (After Breakfast)</div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    adherenceChecked.morning_glycomet ? "bg-emerald-600 text-white" : "border-2 border-muted-foreground/40"
                  }`}
                >
                  {adherenceChecked.morning_glycomet && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>

              <div
                onClick={() => toggleAdherence("morning_telma")}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  adherenceChecked.morning_telma
                    ? "bg-emerald-50/50 border-emerald-200 text-emerald-900"
                    : "bg-muted/40 border-border text-foreground hover:bg-muted"
                }`}
              >
                <div>
                  <div className="text-xs font-bold">Telma 40mg</div>
                  <div className="text-[11px] text-muted-foreground">Morning (With water)</div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    adherenceChecked.morning_telma ? "bg-emerald-600 text-white" : "border-2 border-muted-foreground/40"
                  }`}
                >
                  {adherenceChecked.morning_telma && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>

              <div
                onClick={() => toggleAdherence("night_storvas")}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  adherenceChecked.night_storvas
                    ? "bg-emerald-50/50 border-emerald-200 text-emerald-900"
                    : "bg-muted/40 border-border text-foreground hover:bg-muted"
                }`}
              >
                <div>
                  <div className="text-xs font-bold">Storvas 10mg</div>
                  <div className="text-[11px] text-muted-foreground">Night (Bedtime)</div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    adherenceChecked.night_storvas ? "bg-emerald-600 text-white" : "border-2 border-muted-foreground/40"
                  }`}
                >
                  {adherenceChecked.night_storvas && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate("medications")}
            className="mt-3 text-xs font-bold text-primary flex items-center justify-end gap-1 hover:underline pt-2 border-t border-border"
          >
            Manage Timings &amp; Reminders <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Quick Action AI Records Assistant (Col Span 1) */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-card flex flex-col justify-between bg-gradient-to-br from-card via-blue-50/15 to-card">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground mt-3">Ask My Records</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Query your lab values, medications, or historical trends with voice or text in Telugu, Hindi, Tamil, or English.
            </p>
          </div>

          <div className="mt-4">
            <button
              onClick={() => onNavigate("ask")}
              className="w-full py-2.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:opacity-95 transition-opacity"
            >
              Start Medical Query <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 4: Recent Biomarker Trends (Col Span 2) */}
        <div className="md:col-span-2 bg-card rounded-2xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> Key Biomarker Trajectory
              </h3>
              <p className="text-xs text-muted-foreground">Longitudinal comparison against previous report</p>
            </div>
            <button
              onClick={() => onNavigate("trends")}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              All Trends <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <div className="text-[11px] font-semibold text-muted-foreground">HbA1c</div>
              <div className="text-lg font-extrabold text-foreground mt-0.5">8.1%</div>
              <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +0.9% (vs Jul)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <div className="text-[11px] font-semibold text-muted-foreground">Fasting Sugar</div>
              <div className="text-lg font-extrabold text-foreground mt-0.5">142 mg/dL</div>
              <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +18 mg/dL
              </div>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <div className="text-[11px] font-semibold text-muted-foreground">Creatinine</div>
              <div className="text-lg font-extrabold text-foreground mt-0.5">0.9 mg/dL</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Stable (Normal)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <div className="text-[11px] font-semibold text-muted-foreground">Total Cholesterol</div>
              <div className="text-lg font-extrabold text-foreground mt-0.5">188 mg/dL</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
                <TrendingDown className="w-3.5 h-3.5" /> -22 mg/dL
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: Pre-loaded Demo Quick Try (Col Span 2) */}
        <div className="md:col-span-2 bg-gradient-to-r from-primary/10 via-primary/5 to-card rounded-2xl border border-primary/20 p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-primary-foreground">
                One-Click Test Flow
              </span>
              <span className="text-xs text-muted-foreground">Try full end-to-end OCR and extraction</span>
            </div>
            <h3 className="text-base font-bold text-foreground mt-2">
              Want to see CareLens in action immediately?
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Load an authentic lab report image with Telugu/English OCR, automatic PII masking, confidence verification, and multi-language explanation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            <button
              onClick={() => onScanSample && onScanSample("diabetes_lab")}
              className="px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <FileCheck2 className="w-3.5 h-3.5" /> Test Comprehensive Lab Report
            </button>
            <button
              onClick={() => onScanSample && onScanSample("cardiac_prescription")}
              className="px-3 py-2 rounded-xl bg-card border border-border text-foreground text-xs font-bold hover:bg-muted transition-colors flex items-center gap-1.5"
            >
              <Pill className="w-3.5 h-3.5 text-primary" /> Test Prescription with Interactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
