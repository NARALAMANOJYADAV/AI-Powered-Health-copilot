"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
} from "recharts";
import { CLINICAL_RULES } from "@/lib/rules-engine";
import { useCareLensStore } from "@/lib/store";
import { useTranslation } from "@/lib/useTranslation";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Info,
} from "lucide-react";

interface DataPoint {
  date: string;
  value: number;
  label?: string;
}

export function BiomarkerCharts() {
  const { t } = useTranslation();
  const { familyMembers, activeFamilyMemberId } = useCareLensStore();
  const activeMember = familyMembers.find((m) => m.id === activeFamilyMemberId);
  const patientGender = activeMember?.gender || "male";

  // Pre-populated historical records for longitudinal tracking
  const historicalDataMap: Record<string, DataPoint[]> = {
    hba1c: [
      { date: "2025-10-14", value: 6.8 },
      { date: "2026-01-20", value: 7.0 },
      { date: "2026-04-18", value: 7.4 },
      { date: "2026-07-15", value: 7.2 },
      { date: "2026-10-10", value: 8.1 },
    ],
    fasting_glucose: [
      { date: "2025-10-14", value: 128 },
      { date: "2026-01-20", value: 135 },
      { date: "2026-04-18", value: 150 },
      { date: "2026-07-15", value: 142 },
      { date: "2026-10-10", value: 165 },
    ],
    creatinine: [
      { date: "2025-10-14", value: 0.85 },
      { date: "2026-01-20", value: 0.88 },
      { date: "2026-04-18", value: 0.92 },
      { date: "2026-07-15", value: 0.9 },
      { date: "2026-10-10", value: 0.9 },
    ],
    cholesterol_total: [
      { date: "2025-10-14", value: 230 },
      { date: "2026-01-20", value: 222 },
      { date: "2026-04-18", value: 215 },
      { date: "2026-07-15", value: 210 },
      { date: "2026-10-10", value: 188 },
    ],
    hemoglobin: [
      { date: "2025-10-14", value: 13.8 },
      { date: "2026-01-20", value: 14.1 },
      { date: "2026-04-18", value: 13.9 },
      { date: "2026-07-15", value: 14.0 },
      { date: "2026-10-10", value: 14.2 },
    ],
  };

  const [selectedKey, setSelectedKey] = useState<string>("hba1c");

  const activeRule = CLINICAL_RULES.find((r) => r.key === selectedKey) || CLINICAL_RULES[0];
  const range = activeRule.getRange({ gender: patientGender });
  const points = historicalDataMap[selectedKey] || [];

  const latestVal = points[points.length - 1]?.value || 0;
  const previousVal = points[points.length - 2]?.value || latestVal;
  const delta = parseFloat((latestVal - previousVal).toFixed(2));
  const isElevated = latestVal > range.max;
  const isLow = latestVal < range.min;

  // Calculate suitable Y-axis domain
  const values = points.map((p) => p.value);
  const minVal = Math.min(...values, range.min);
  const maxVal = Math.max(...values, range.max);
  const yMin = Math.floor(minVal * 0.85);
  const yMax = Math.ceil(maxVal * 1.15);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-10">
      {/* Header */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" /> {t("trendsTitle")}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("trendsSubtitle")}
            </p>
          </div>

          {/* Test Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-muted-foreground">{t("selectTest")}:</label>
            <select
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="text-xs font-bold rounded-xl bg-muted border border-border px-3 py-2 text-foreground focus:ring-2 focus:ring-primary"
            >
              <option value="hba1c">HbA1c (%)</option>
              <option value="fasting_glucose">Fasting Blood Glucose (mg/dL)</option>
              <option value="cholesterol_total">Total Cholesterol (mg/dL)</option>
              <option value="creatinine">Serum Creatinine (mg/dL)</option>
              <option value="hemoglobin">Hemoglobin (g/dL)</option>
            </select>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-border">
          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[11px] font-semibold text-muted-foreground">{t("latestValue")}</span>
            <div className="text-xl font-extrabold text-foreground mt-0.5">
              {latestVal} <span className="text-xs font-medium text-muted-foreground">{activeRule.unit}</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {points[points.length - 1]?.date}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[11px] font-semibold text-muted-foreground">{t("biomarkerTrajectory")}</span>
            <div
              className={`text-xl font-extrabold mt-0.5 flex items-center gap-1 ${
                isElevated ? "text-amber-600" : isLow ? "text-blue-600" : "text-emerald-600"
              }`}
            >
              {delta > 0 ? (
                <TrendingUp className="w-5 h-5" />
              ) : delta < 0 ? (
                <TrendingDown className="w-5 h-5" />
              ) : null}
              {delta > 0 ? `+${delta}` : delta} {activeRule.unit}
            </div>
            <span className="text-[11px] text-muted-foreground mt-1 block">{t("vsPriorTest")}</span>
          </div>

          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[11px] font-semibold text-muted-foreground">{t("normalRange")}</span>
            <div className="text-base font-extrabold text-emerald-700 mt-1">
              {range.min} - {range.max} <span className="text-xs font-normal">{activeRule.unit}</span>
            </div>
            <span className="text-[10px] text-muted-foreground mt-1 block">{t("stableNormal")}</span>
          </div>

          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[11px] font-semibold text-muted-foreground">{t("currentStatus")}</span>
            <div className="mt-1">
              {isElevated ? (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 inline-flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {t("statusHigh")}
                </span>
              ) : isLow ? (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 inline-flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {t("statusLow")}
                </span>
              ) : (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {t("statusNormal")}
                </span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground mt-1.5 block">5 {t("reportsCount")}</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Card */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <span>{activeRule.aliases[0].toUpperCase()} {t("trendCurve")}</span>
          </h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/60 inline-block" />
              {t("normalBand")} ({range.min} - {range.max} {activeRule.unit})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /> {t("measuredValues")}
            </span>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="w-full h-72 sm:h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={points} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />

              <XAxis
                dataKey="date"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#cbd5e1" }}
              />

              <YAxis
                domain={[yMin, yMax]}
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#cbd5e1" }}
                unit={` ${activeRule.unit}`}
              />

              {/* Shaded Green Reference Range */}
              <ReferenceArea
                y1={range.min}
                y2={range.max}
                fill="#10b981"
                fillOpacity={0.12}
                stroke="#10b981"
                strokeOpacity={0.4}
                strokeDasharray="4 4"
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as DataPoint;
                    const val = data.value;
                    const status = val > range.max ? "High" : val < range.min ? "Low" : "Normal";
                    const statusText =
                      status === "Normal"
                        ? t("statusNormal")
                        : status === "High"
                        ? t("statusHigh")
                        : t("statusLow");
                    return (
                      <div className="bg-card border border-border p-3 rounded-xl shadow-xl text-xs space-y-1">
                        <div className="font-bold text-foreground">{data.date}</div>
                        <div className="text-primary font-extrabold text-sm">
                          {val} {activeRule.unit}
                        </div>
                        <div
                          className={`font-semibold ${
                            status === "Normal"
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }`}
                        >
                          {t("currentStatus")}: {statusText} ({t("normalRange")}: {range.min} - {range.max})
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "hsl(var(--primary))",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                activeDot={{ r: 8, fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 rounded-xl bg-muted/60 border border-border text-[11px] text-muted-foreground flex items-center gap-2">
          <Info className="w-4 h-4 text-primary flex-shrink-0" />
          <span>
            {t("trendInfoNote")}
          </span>
        </div>
      </div>
    </div>
  );
}
