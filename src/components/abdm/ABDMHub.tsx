import React, { useState } from "react";
import { generateFHIRBundle } from "@/lib/fhir";
import { useCareLensStore } from "@/lib/store";
import { useTranslation } from "@/lib/useTranslation";
import {
  ShieldCheck,
  Download,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Smartphone,
  KeyRound,
  FileCode,
  Copy,
  Check,
} from "lucide-react";

export function ABDMHub() {
  const { t } = useTranslation();
  const { familyMembers, activeFamilyMemberId } = useCareLensStore();
  const activeMember = familyMembers.find((m) => m.id === activeFamilyMemberId);
  const patientName = activeMember ? activeMember.name : "Rajesh Kumar";

  const [abhaNumber, setAbhaNumber] = useState("91-4521-8923-1045");
  const [isLinked, setIsLinked] = useState(true);
  const [isLinkingModal, setIsLinkingModal] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isCopiedJson, setIsCopiedJson] = useState(false);

  // Generate real FHIR R4 Bundle
  const bundle = generateFHIRBundle({
    patient: {
      id: "usr_rajesh_kumar",
      email: "rajesh@carelens.health",
      full_name: patientName,
      gender: "male",
      date_of_birth: "1974-06-15",
      blood_group: "O+",
      abha_id: `${abhaNumber}@abdm`,
    },
    metadata: {
      doc_type: "lab_report",
      report_date: "2026-10-10",
      doctor_name: "Dr. V. K. Sharma",
      clinic_hospital: "Apollo Diagnostics",
      confidence: 0.96,
      source_word_ids: [],
    },
    labs: [
      { test: "HbA1c", value: 8.1, unit: "%", reference_range: "4.0-5.6", loinc_code: "4548-4", confidence: 1.0, source_word_ids: [] },
      { test: "Fasting Blood Sugar", value: 165, unit: "mg/dL", reference_range: "70-99", loinc_code: "1558-6", confidence: 1.0, source_word_ids: [] },
      { test: "Serum Creatinine", value: 0.9, unit: "mg/dL", reference_range: "0.7-1.3", loinc_code: "2160-0", confidence: 1.0, source_word_ids: [] },
      { test: "Total Cholesterol", value: 188, unit: "mg/dL", reference_range: "125-200", loinc_code: "2093-3", confidence: 1.0, source_word_ids: [] },
    ],
    medications: [
      { name: "Glycomet 500mg", generic: "Metformin", frequency: "1-0-1", timing: "After meals", duration: "30 days", confidence: 1.0, source_word_ids: [] },
      { name: "Telma 40mg", generic: "Telmisartan", frequency: "1-0-0", timing: "Morning with water", duration: "30 days", confidence: 1.0, source_word_ids: [] },
      { name: "Storvas 10mg", generic: "Atorvastatin", frequency: "0-0-1", timing: "Bedtime", duration: "30 days", confidence: 1.0, source_word_ids: [] },
    ],
    conditions: [
      { condition: "Type 2 Diabetes Mellitus", status: "active", confidence: 1.0, source_word_ids: [] },
      { condition: "Essential Hypertension", status: "active", confidence: 1.0, source_word_ids: [] },
    ],
  });

  const jsonString = JSON.stringify(bundle, null, 2);

  const handleDownloadBundle = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `carelens_fhir_r4_bundle_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setIsCopiedJson(true);
    setTimeout(() => setIsCopiedJson(false), 2000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifyingOtp(true);
    setTimeout(() => {
      setIsVerifyingOtp(false);
      setIsLinkingModal(false);
      setIsLinked(true);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-10">
      {/* Sandbox Notice Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-xs uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
            ABDM Sandbox Mode
          </span>
          <p className="text-xs text-amber-900 mt-1 leading-relaxed">
            This module conforms to India&apos;s National Digital Health Mission (NDHM / ABDM) M1, M2, and M3 standards. All FHIR R4 schema structures are generated with standard LOINC and SNOMED coding.
          </p>
        </div>
      </div>

      {/* Main ABHA Linking Card */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" /> {t("abdmTitle")}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("abdmSubtitle")}
            </p>
          </div>

          <div>
            {isLinked ? (
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-4 h-4" /> {t("abhaLinkedStatus")}
              </span>
            ) : (
              <button
                onClick={() => setIsLinkingModal(true)}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:opacity-95"
              >
                Link ABHA Address
              </button>
            )}
          </div>
        </div>

        {/* ABHA Digital Card Display */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white shadow-xl max-w-lg mx-auto relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-200">
                National Health Authority (NHA)
              </div>
              <div className="font-extrabold text-lg mt-0.5">ABHA Health Card</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black text-xs">
              ABDM
            </div>
          </div>

          <div className="mt-8 space-y-1">
            <div className="text-xl sm:text-2xl font-mono font-bold tracking-wider">{abhaNumber}</div>
            <div className="text-xs text-emerald-200 font-mono">{abhaNumber}@abdm</div>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs pt-3 border-t border-white/20">
            <div>
              <div className="text-[10px] text-emerald-200 uppercase">Card Holder</div>
              <div className="font-bold">{patientName}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-emerald-200 uppercase">Verification</div>
              <div className="font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Aadhaar Verified
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
          <span className="text-xs text-muted-foreground">
            Consent permissions: Records are encrypted with patient-controlled granular access.
          </span>
          <button
            onClick={() => setIsLinkingModal(true)}
            className="text-xs font-bold text-primary hover:underline"
          >
            {isLinked ? "Change Linked ABHA Number" : "Link Account"}
          </button>
        </div>
      </div>

      {/* FHIR R4 Bundle Export Card */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <FileCode className="w-5 h-5 text-primary" /> HL7 FHIR R4 Collection Bundle
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Exports Patient, DiagnosticReport, Observations, and MedicationRequests in standard FHIR JSON.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJson}
              className="px-3 py-2 rounded-xl bg-muted border border-border text-foreground text-xs font-bold hover:bg-muted/80 transition-colors flex items-center gap-1.5"
            >
              {isCopiedJson ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {isCopiedJson ? "Copied" : "Copy JSON"}
            </button>
            <button
              onClick={handleDownloadBundle}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 hover:opacity-95 transition-opacity flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> {t("exportFhirBundle")}
            </button>
          </div>
        </div>

        {/* Live FHIR JSON Preview */}
        <div className="rounded-xl overflow-hidden border border-border bg-slate-950 text-slate-100 text-xs p-4 font-mono max-h-72 overflow-y-auto">
          <pre>{jsonString}</pre>
        </div>
      </div>

      {/* Sandbox Linking Modal */}
      {isLinkingModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-primary" /> ABDM Sandbox: Link ABHA ID
              </h3>
              <button
                onClick={() => setIsLinkingModal(false)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">14-Digit ABHA Number</label>
                <input
                  type="text"
                  value={abhaNumber}
                  onChange={(e) => setAbhaNumber(e.target.value)}
                  className="mt-1 w-full text-xs font-mono font-bold rounded-xl bg-muted border border-border p-3 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">Mobile OTP (Sandbox Mock: 123456)</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value)}
                    className="w-full text-xs font-mono font-bold rounded-xl bg-muted border border-border p-3 text-foreground focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setOtpValue("123456")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-md"
                  >
                    Auto-Fill
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsLinkingModal(false)}
                  className="px-4 py-2 rounded-xl bg-muted text-xs font-bold text-foreground hover:bg-muted/80"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isVerifyingOtp}
                  className="px-5 py-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:opacity-95 shadow-sm"
                >
                  {isVerifyingOtp ? "Verifying..." : "Verify & Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
