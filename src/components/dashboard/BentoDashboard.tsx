"use client";

import React from "react";
import { useCareLensStore } from "@/lib/store";
import { useTranslation } from "@/lib/useTranslation";
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
  Users,
  UserPlus,
} from "lucide-react";

export function BentoDashboard({
  onNavigate,
  onScanSample,
}: {
  onNavigate: (tab: string) => void;
  onScanSample?: (sampleType: "diabetes_lab" | "cardiac_prescription") => void;
}) {
  const { t } = useTranslation();
  const { familyMembers, activeFamilyMemberId, setActiveFamilyMemberId } = useCareLensStore();

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
              {t("activeProfile")}: {patientRelation === "Self" ? t("self") : patientRelation}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {t("abdmLinked")}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1.5 tracking-tight">
            {t("welcomeBack")}, {patientName}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("dashboardSubtitle")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate("upload")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md shadow-primary/20 hover:opacity-95 transition-all"
          >
            <Camera className="w-4 h-4" />
            {t("scanNewReport")}
          </button>
          <button
            onClick={() => onNavigate("brief")}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-muted border border-border text-foreground font-semibold text-sm hover:bg-muted/80 transition-colors"
          >
            <QrCode className="w-4 h-4 text-primary" />
            {t("doctorBriefBtn")}
          </button>
        </div>
      </div>

      {/* Interactive Family Member Quick Switcher Strip */}
      <div className="bg-card rounded-2xl border border-border p-3.5 shadow-card flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground flex-shrink-0">
          <Users className="w-4 h-4 text-primary" />
          <span>Family Patient:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          {/* Self Button */}
          <button
            onClick={() => setActiveFamilyMemberId(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
              activeFamilyMemberId === null
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-foreground hover:bg-muted/80 border border-border"
            }`}
          >
            <span>Rajesh Kumar ({t("self")})</span>
            {activeFamilyMemberId === null && <CheckCircle2 className="w-3.5 h-3.5" />}
          </button>

          {/* Family Member Buttons */}
          {familyMembers.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveFamilyMemberId(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                activeFamilyMemberId === m.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-foreground hover:bg-muted/80 border border-border"
              }`}
            >
              <span>{m.name} ({m.relationship})</span>
              {activeFamilyMemberId === m.id && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>
          ))}

          <button
            onClick={() => onNavigate("family")}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-primary hover:bg-primary/10 transition-colors flex items-center gap-1 flex-shrink-0 border border-dashed border-primary/40"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Manage Family</span>
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
                <h3 className="font-bold text-foreground text-base">{t("clinicalNoticeTitle")}</h3>
                <p className="text-xs text-muted-foreground">{t("clinicalNoticeSource")}</p>
              </div>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              {t("needsReview")}
            </span>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-950 space-y-1.5">
            <div className="flex items-center justify-between font-medium">
              <span className="font-semibold text-amber-900">{t("hba1cAlertTitle")}</span>
              <span className="font-bold text-amber-700">{t("high")}</span>
            </div>
            <p className="text-amber-800/90 leading-relaxed">
              {t("hba1cAlertDesc")}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{t("sourceVerified")}</span>
            <button
              onClick={() => onNavigate("timeline")}
              className="font-bold text-primary flex items-center gap-1 hover:underline"
            >
              {t("inspectSource")} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Today's Medication Adherence (Col Span 1) */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("todayAdherence")}</span>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {adherencePercentage}% {t("taken")}
              </span>
            </div>

            <h3 className="text-lg font-bold text-foreground mt-2 flex items-center gap-2">
              <Pill className="w-4 h-4 text-primary" /> {t("dailySchedule")}
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
                  <div className="text-[11px] text-muted-foreground">{t("morningAfterBreakfast")}</div>
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
                  <div className="text-[11px] text-muted-foreground">{t("morningWithWater")}</div>
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
                  <div className="text-[11px] text-muted-foreground">{t("nightBedtime")}</div>
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
            {t("manageTimings")} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Quick Action AI Records Assistant (Col Span 1) */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-card flex flex-col justify-between bg-gradient-to-br from-card via-blue-50/15 to-card">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground mt-3">{t("askRecordsCardTitle")}</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {t("askRecordsCardDesc")}
            </p>
          </div>

          <div className="mt-4">
            <button
              onClick={() => onNavigate("ask")}
              className="w-full py-2.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:opacity-95 transition-opacity"
            >
              {t("startMedicalQuery")} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 4: Recent Biomarker Trends (Col Span 2) */}
        <div className="md:col-span-2 bg-card rounded-2xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> {t("biomarkerTrajectory")}
              </h3>
              <p className="text-xs text-muted-foreground">{t("longitudinalComparison")}</p>
            </div>
            <button
              onClick={() => onNavigate("trends")}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              {t("allTrends")} <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <div className="text-[11px] font-semibold text-muted-foreground">HbA1c</div>
              <div className="text-lg font-extrabold text-foreground mt-0.5">8.1%</div>
              <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +0.9%
              </div>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <div className="text-[11px] font-semibold text-muted-foreground">{t("fastingSugar")}</div>
              <div className="text-lg font-extrabold text-foreground mt-0.5">142 mg/dL</div>
              <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +18 mg/dL
              </div>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <div className="text-[11px] font-semibold text-muted-foreground">{t("creatinine")}</div>
              <div className="text-lg font-extrabold text-foreground mt-0.5">0.9 mg/dL</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {t("stableNormal")}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <div className="text-[11px] font-semibold text-muted-foreground">{t("totalCholesterol")}</div>
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
                {t("oneClickTestFlow")}
              </span>
              <span className="text-xs text-muted-foreground">{t("tryOcrExtraction")}</span>
            </div>
            <h3 className="text-base font-bold text-foreground mt-2">
              {t("seeCareLensAction")}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {t("sampleDesc")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            <button
              onClick={() => onScanSample && onScanSample("diabetes_lab")}
              className="px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <FileCheck2 className="w-3.5 h-3.5" /> {t("testLabReportBtn")}
            </button>
            <button
              onClick={() => onScanSample && onScanSample("cardiac_prescription")}
              className="px-3 py-2 rounded-xl bg-card border border-border text-foreground text-xs font-bold hover:bg-muted transition-colors flex items-center gap-1.5"
            >
              <Pill className="w-3.5 h-3.5 text-primary" /> {t("testPrescriptionBtn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
