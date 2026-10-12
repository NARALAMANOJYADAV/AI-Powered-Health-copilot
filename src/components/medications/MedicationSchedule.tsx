"use client";

import React, { useState } from "react";
import { MedicationRecord, DrugSafetyAlert } from "@/lib/types";
import { evaluateMedicineSafety } from "@/lib/safety-engine";
import {
  Pill,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ShieldAlert,
  AlertTriangle,
  Plus,
  Trash2,
  Sun,
  Sunset,
  Moon,
  Coffee,
} from "lucide-react";

export function MedicationSchedule() {
  const [meds, setMeds] = useState<MedicationRecord[]>([
    {
      id: "med-1",
      user_id: "demo",
      name: "Glycomet 500mg",
      generic_name: "Metformin",
      strength: "500mg",
      frequency: "1-0-1",
      timing: "After breakfast & dinner",
      duration: "30 days",
      instructions: "Take with a glass of water after food",
      is_active: true,
      confidence: 1.0,
      created_at: "2026-10-10",
    },
    {
      id: "med-2",
      user_id: "demo",
      name: "Telma 40mg",
      generic_name: "Telmisartan",
      strength: "40mg",
      frequency: "1-0-0",
      timing: "Morning with water",
      duration: "30 days",
      instructions: "Take at the same time each morning",
      is_active: true,
      confidence: 1.0,
      created_at: "2026-10-10",
    },
    {
      id: "med-3",
      user_id: "demo",
      name: "Storvas 10mg",
      generic_name: "Atorvastatin",
      strength: "10mg",
      frequency: "0-0-1",
      timing: "Night (Bedtime)",
      duration: "30 days",
      instructions: "Take once daily before sleep",
      is_active: true,
      confidence: 1.0,
      created_at: "2026-10-10",
    },
    {
      id: "med-4",
      user_id: "demo",
      name: "Pan 40",
      generic_name: "Pantoprazole",
      strength: "40mg",
      frequency: "1-0-0",
      timing: "30 mins before breakfast",
      duration: "15 days",
      instructions: "Empty stomach in morning",
      is_active: true,
      confidence: 1.0,
      created_at: "2026-10-10",
    },
    {
      id: "med-5",
      user_id: "demo",
      name: "Dolo 650",
      generic_name: "Paracetamol",
      strength: "650mg",
      frequency: "SOS",
      timing: "As needed for fever or pain",
      duration: "5 days",
      instructions: "Max 3 tablets in 24 hours",
      is_active: true,
      confidence: 1.0,
      created_at: "2026-10-10",
    },
  ]);

  // Daily intake adherence tracker
  const [takenMap, setTakenMap] = useState<Record<string, boolean>>({
    "med-1_morning": true,
    "med-2_morning": true,
    "med-4_morning": true,
    "med-1_night": false,
    "med-3_night": false,
  });

  const toggleTaken = (key: string) => {
    setTakenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Run Medicine Safety Engine
  const safetyAlerts: DrugSafetyAlert[] = evaluateMedicineSafety(
    meds.map((m) => ({
      name: m.name,
      generic: m.generic_name,
      strength: m.strength,
      frequency: m.frequency,
      timing: m.timing,
      confidence: m.confidence,
      source_word_ids: [],
    }))
  );

  // Group into Time Slots
  const morningMeds = meds.filter(
    (m) =>
      m.frequency?.includes("1-0-") ||
      m.frequency?.includes("1-1-") ||
      m.timing?.toLowerCase().includes("morning") ||
      m.timing?.toLowerCase().includes("breakfast")
  );

  const afternoonMeds = meds.filter(
    (m) =>
      m.frequency?.includes("-1-") ||
      m.timing?.toLowerCase().includes("afternoon") ||
      m.timing?.toLowerCase().includes("lunch")
  );

  const nightMeds = meds.filter(
    (m) =>
      m.frequency?.endsWith("-1") ||
      m.timing?.toLowerCase().includes("night") ||
      m.timing?.toLowerCase().includes("bedtime") ||
      m.timing?.toLowerCase().includes("dinner")
  );

  const sosMeds = meds.filter((m) => m.frequency?.toUpperCase().includes("SOS"));

  // Export as .ics Calendar File
  const handleExportICS = () => {
    let icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//CareLens//Health Copilot Medication Reminders//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
    ].join("\r\n");

    const todayStr = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    meds.forEach((m, idx) => {
      // Create morning alarm at 08:00 AM
      if (m.frequency?.startsWith("1-") || m.timing?.toLowerCase().includes("morning")) {
        icsContent +=
          "\r\n" +
          [
            "BEGIN:VEVENT",
            `UID:med-morning-${idx}-${Date.now()}@carelens.health`,
            `DTSTAMP:${todayStr}`,
            `DTSTART:20261012T080000`,
            "RRULE:FREQ=DAILY;COUNT=30",
            `SUMMARY:Take ${m.name}`,
            `DESCRIPTION:Instructions: ${m.timing || "With water"}. Generic: ${m.generic_name || m.name}`,
            "BEGIN:VALARM",
            "ACTION:DISPLAY",
            `DESCRIPTION:Time to take ${m.name}`,
            "TRIGGER:-PT5M",
            "END:VALARM",
            "END:VEVENT",
          ].join("\r\n");
      }

      // Create night alarm at 09:00 PM
      if (m.frequency?.endsWith("-1") || m.timing?.toLowerCase().includes("night")) {
        icsContent +=
          "\r\n" +
          [
            "BEGIN:VEVENT",
            `UID:med-night-${idx}-${Date.now()}@carelens.health`,
            `DTSTAMP:${todayStr}`,
            `DTSTART:20261012T210000`,
            "RRULE:FREQ=DAILY;COUNT=30",
            `SUMMARY:Take ${m.name}`,
            `DESCRIPTION:Instructions: ${m.timing || "Before sleep"}. Generic: ${m.generic_name || m.name}`,
            "BEGIN:VALARM",
            "ACTION:DISPLAY",
            `DESCRIPTION:Time to take ${m.name}`,
            "TRIGGER:-PT5M",
            "END:VALARM",
            "END:VEVENT",
          ].join("\r\n");
      }
    });

    icsContent += "\r\nEND:VCALENDAR";

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "CareLens_Medication_Reminders.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalTrackedSlots = Object.keys(takenMap).length;
  const takenCount = Object.values(takenMap).filter(Boolean).length;
  const adherenceRate = Math.round((takenCount / (totalTrackedSlots || 1)) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-10">
      {/* Header */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <Pill className="w-6 h-6 text-primary" /> Daily Medication Schedule
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Organized intake plan, daily adherence checklist, and calendar alarms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportICS}
            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 hover:opacity-95 transition-opacity flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export .ics Reminders
          </button>
        </div>
      </div>

      {/* Adherence Summary Strip */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Today&apos;s Adherence</span>
          <div className="text-2xl font-extrabold text-foreground mt-0.5">
            {takenCount} of {totalTrackedSlots} Doses Taken ({adherenceRate}%)
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Consistent timing helps maximize efficacy and avoid drug concentration peaks.
          </p>
        </div>

        <div className="w-full sm:w-48 bg-muted rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${adherenceRate}%` }}
          />
        </div>
      </div>

      {/* Schedule Slots */}
      <div className="space-y-4">
        {/* Morning Slot */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Sun className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-sm text-foreground">Morning (08:00 AM - 09:30 AM)</h3>
            <span className="text-[11px] text-muted-foreground ml-auto">{morningMeds.length} medicines</span>
          </div>

          <div className="space-y-2">
            {morningMeds.map((m) => {
              const key = `${m.id}_morning`;
              const isTaken = !!takenMap[key];
              return (
                <div
                  key={m.id}
                  onClick={() => toggleTaken(key)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    isTaken ? "bg-emerald-50/50 border-emerald-200" : "bg-muted/30 border-border hover:bg-muted/60"
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-foreground flex items-center gap-2">
                      <span>{m.name}</span>
                      <span className="text-[11px] font-normal text-muted-foreground">({m.generic_name})</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" /> {m.timing}
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isTaken ? "bg-emerald-600 text-white" : "border-2 border-muted-foreground/40"
                    }`}
                  >
                    {isTaken && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Afternoon Slot */}
        {afternoonMeds.length > 0 && (
          <div className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Coffee className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-sm text-foreground">Afternoon (01:00 PM - 02:00 PM)</h3>
              <span className="text-[11px] text-muted-foreground ml-auto">{afternoonMeds.length} medicines</span>
            </div>

            <div className="space-y-2">
              {afternoonMeds.map((m) => (
                <div key={m.id} className="p-3 rounded-xl border border-border bg-muted/30 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-foreground">{m.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{m.timing}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Night Slot */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Moon className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-sm text-foreground">Night / Bedtime (08:30 PM - 10:00 PM)</h3>
            <span className="text-[11px] text-muted-foreground ml-auto">{nightMeds.length} medicines</span>
          </div>

          <div className="space-y-2">
            {nightMeds.map((m) => {
              const key = `${m.id}_night`;
              const isTaken = !!takenMap[key];
              return (
                <div
                  key={m.id}
                  onClick={() => toggleTaken(key)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    isTaken ? "bg-emerald-50/50 border-emerald-200" : "bg-muted/30 border-border hover:bg-muted/60"
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-foreground flex items-center gap-2">
                      <span>{m.name}</span>
                      <span className="text-[11px] font-normal text-muted-foreground">({m.generic_name})</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" /> {m.timing}
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isTaken ? "bg-emerald-600 text-white" : "border-2 border-muted-foreground/40"
                    }`}
                  >
                    {isTaken && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SOS / As Needed */}
        {sosMeds.length > 0 && (
          <div className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <AlertTriangle className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-sm text-foreground">As Needed (SOS)</h3>
            </div>

            <div className="space-y-2">
              {sosMeds.map((m) => (
                <div key={m.id} className="p-3 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-foreground">{m.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{m.instructions || m.timing}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Safety & Interaction Alerts */}
      {safetyAlerts.length > 0 && (
        <div className="bg-card rounded-2xl border border-amber-300 p-6 shadow-card space-y-3 bg-gradient-to-br from-card via-amber-50/20 to-card">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
            <h3 className="font-bold text-base text-foreground">Pharmacological Safety Alerts</h3>
          </div>

          <div className="space-y-3">
            {safetyAlerts.map((a, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-sm text-amber-900">{a.title}</span>
                  <span className="uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px]">
                    {a.severity}
                  </span>
                </div>
                <p className="text-amber-900/90 leading-relaxed font-medium">{a.effect}</p>
                <div className="text-[11px] font-bold text-amber-950 pt-1">
                  &bull; {a.action_recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
