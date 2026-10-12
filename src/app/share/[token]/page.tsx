import React from "react";
import {
  HeartPulse,
  Activity,
  Pill,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  HelpCircle,
  Clock,
  Printer,
} from "lucide-react";

export default async function ShareViewPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">CareLens</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                  Doctor View
                </span>
              </div>
              <p className="text-xs text-slate-500">Verified Patient Consultation Brief &bull; Read-Only</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Active 24h Token
            </span>
          </div>
        </div>

        {/* The Brief Document */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b-2 border-blue-100 pb-4 flex items-start justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Clinical Summary</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Prepared for Clinical Consultation &bull; Confidential
              </p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <div className="font-bold text-slate-900">12-Oct-2026</div>
              <div>Token: {token}</div>
            </div>
          </div>

          {/* Demographics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-semibold">Patient:</span>
              <div className="font-extrabold text-slate-900 text-sm mt-0.5">Rajesh Kumar</div>
            </div>
            <div>
              <span className="text-slate-500 font-semibold">Age / Sex:</span>
              <div className="font-extrabold text-slate-900 text-sm mt-0.5">52 Y / Male</div>
            </div>
            <div>
              <span className="text-slate-500 font-semibold">Blood Group:</span>
              <div className="font-extrabold text-slate-900 text-sm mt-0.5">O Positive (O+)</div>
            </div>
            <div>
              <span className="text-slate-500 font-semibold">ABHA Address:</span>
              <div className="font-mono font-bold text-slate-700 text-xs mt-0.5">91-4521-8923-1045@abdm</div>
            </div>
          </div>

          {/* Abnormal Biomarkers */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-200">
              <Activity className="w-4 h-4 text-blue-600" /> Abnormal Lab Findings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/40">
                <div className="flex items-center justify-between font-bold text-red-950">
                  <span>HbA1c (Glycated Hemoglobin)</span>
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-[11px]">8.1% (High)</span>
                </div>
                <p className="text-slate-600 text-[11px] mt-1">Target: 4.0 - 5.6% &bull; Up +0.9% vs previous 7.2%</p>
              </div>

              <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/40">
                <div className="flex items-center justify-between font-bold text-red-950">
                  <span>Fasting Blood Glucose</span>
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-[11px]">165 mg/dL (High)</span>
                </div>
                <p className="text-slate-600 text-[11px] mt-1">Target: 70 - 99 mg/dL &bull; Up +23 mg/dL vs previous 142</p>
              </div>
            </div>
          </div>

          {/* Active Medications */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-200">
              <Pill className="w-4 h-4 text-blue-600" /> Active Medications
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { name: "Glycomet 500mg", generic: "Metformin HCl", dose: "1-0-1", inst: "After meals" },
                { name: "Telma 40mg", generic: "Telmisartan", dose: "1-0-0", inst: "Morning" },
                { name: "Storvas 10mg", generic: "Atorvastatin", dose: "0-0-1", inst: "Bedtime" },
                { name: "Pan 40", generic: "Pantoprazole", dose: "1-0-0", inst: "Before breakfast" },
              ].map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{m.name}</span>
                    <span className="text-slate-500 text-[11px] ml-1.5">({m.generic})</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-blue-700">{m.dose}</span>
                    <span className="text-slate-500 text-[11px] block">{m.inst}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Questions */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-200">
              <HelpCircle className="w-4 h-4 text-blue-600" /> Patient Questions For This Visit
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                1. HbA1c increased to 8.1% despite regular Glycomet 500mg. Should we adjust dosing or add second-line agent?
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                2. Cholesterol improved favorably to 188 mg/dL on Storvas 10mg. Continue current dose?
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-400">
            Powered by CareLens Personal Health Copilot &bull; Verified via InsForge Medical BaaS
          </div>
        </div>
      </div>
    </main>
  );
}
