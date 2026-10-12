"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useCareLensStore } from "@/lib/store";
import {
  FileBadge2,
  QrCode,
  Share2,
  Printer,
  Copy,
  Check,
  ShieldAlert,
  AlertTriangle,
  Pill,
  Activity,
  Calendar,
  User,
  HeartPulse,
  HelpCircle,
  Clock,
  ExternalLink,
} from "lucide-react";

export function DoctorVisitBrief() {
  const { familyMembers, activeFamilyMemberId } = useCareLensStore();
  const activeMember = familyMembers.find((m) => m.id === activeFamilyMemberId);
  const patientName = activeMember ? activeMember.name : "Rajesh Kumar";
  const patientRelation = activeMember ? activeMember.relationship : "Self";

  const [shareToken, setShareToken] = useState<string>("tok_carelens_9f82a17b3");
  const [isCopied, setIsCopied] = useState(false);
  const [isRevoked, setIsRevoked] = useState(false);

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/share/${shareToken}` : `https://carelens.health/share/${shareToken}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleRevoke = () => {
    setIsRevoked(true);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-10 print:p-0">
      {/* Action Header (Hidden in Print) */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <FileBadge2 className="w-6 h-6 text-primary" /> Doctor Visit Brief
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            One-page clinical summary optimized for consultation. Share via QR or expiring 24h link.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-muted border border-border text-foreground text-xs font-bold hover:bg-muted/80 transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-primary" /> Print / Save PDF
          </button>
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {isCopied ? "Link Copied!" : "Copy 24h Share Link"}
          </button>
        </div>
      </div>

      {/* Share & QR Code Card (Hidden in Print) */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card print:hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="p-3 bg-white rounded-2xl border border-border shadow-md flex-shrink-0">
            <QRCodeSVG value={shareUrl} size={130} />
          </div>

          <div className="space-y-2 flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Expires in 24 Hours
              </span>
              {isRevoked ? (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">Revoked</span>
              ) : (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Active &amp; Secure
                </span>
              )}
            </div>

            <h3 className="text-base font-bold text-foreground">Secure Doctor Access Code</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Show this QR code during your clinic visit. Your physician can scan it on their mobile or tablet to instantly review this structured brief without downloading any app.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-lg border border-border max-w-[280px] truncate">
                {shareUrl}
              </span>
              {!isRevoked && (
                <button
                  onClick={handleRevoke}
                  className="text-xs font-bold text-destructive hover:underline"
                >
                  Revoke Link Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* The Printable One-Page Doctor Brief Document */}
      <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card print:border-none print:shadow-none space-y-6">
        {/* Document Header */}
        <div className="border-b-2 border-primary/20 pb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-base">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">CareLens Health Brief</h1>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Confidential Patient Health Summary for Clinical Consultation
            </p>
          </div>

          <div className="text-right text-xs text-muted-foreground">
            <div className="font-bold text-foreground">Generated: 12-Oct-2026</div>
            <div>ABHA: 91-4521-8923-1045@abdm</div>
            <div>Ref Token: {shareToken}</div>
          </div>
        </div>

        {/* Patient Demographics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-muted/40 border border-border text-xs">
          <div>
            <span className="text-muted-foreground font-semibold">Patient Name:</span>
            <div className="font-extrabold text-foreground text-sm mt-0.5">{patientName}</div>
          </div>
          <div>
            <span className="text-muted-foreground font-semibold">Age / Gender:</span>
            <div className="font-extrabold text-foreground text-sm mt-0.5">52 Y / Male</div>
          </div>
          <div>
            <span className="text-muted-foreground font-semibold">Blood Group:</span>
            <div className="font-extrabold text-foreground text-sm mt-0.5">O Positive (O+)</div>
          </div>
          <div>
            <span className="text-muted-foreground font-semibold">Known Allergies:</span>
            <div className="font-extrabold text-emerald-700 text-sm mt-0.5">NKDA (None Known)</div>
          </div>
        </div>

        {/* Section 1: Abnormal Biomarkers & Key Shifts */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-border">
            <Activity className="w-4 h-4 text-primary" /> 1. Abnormal Findings &amp; Recent Biomarker Trajectory
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/30">
              <div className="flex items-center justify-between font-bold">
                <span className="text-red-950 font-extrabold">HbA1c (Glycated Hemoglobin)</span>
                <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded">High (8.1%)</span>
              </div>
              <div className="text-muted-foreground mt-1 text-[11px]">
                Standard Target: 4.0 - 5.6% | Measured 10-Oct-2026
              </div>
              <div className="text-red-900 font-semibold mt-1">
                Trend: Increased from 7.2% on 15-Jul-2026 (+0.9% delta).
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/30">
              <div className="flex items-center justify-between font-bold">
                <span className="text-red-950 font-extrabold">Fasting Blood Glucose (FBS)</span>
                <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded">High (165 mg/dL)</span>
              </div>
              <div className="text-muted-foreground mt-1 text-[11px]">
                Standard Target: 70 - 99 mg/dL | Measured 10-Oct-2026
              </div>
              <div className="text-red-900 font-semibold mt-1">
                Trend: Increased from 142 mg/dL (+23 mg/dL delta).
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Active Prescription Regimen */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-border">
            <Pill className="w-4 h-4 text-primary" /> 2. Current Active Medications &amp; Dosages
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-semibold">
                  <th className="py-2 px-2">Brand Name</th>
                  <th className="py-2 px-2">Generic Equivalent</th>
                  <th className="py-2 px-2">Dosage &amp; Timing</th>
                  <th className="py-2 px-2">Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-2.5 px-2 font-bold text-foreground">Glycomet 500mg</td>
                  <td className="py-2.5 px-2 text-muted-foreground">Metformin HCl</td>
                  <td className="py-2.5 px-2 font-semibold text-primary">1-0-1 (BID)</td>
                  <td className="py-2.5 px-2 text-muted-foreground">After breakfast and dinner</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-2 font-bold text-foreground">Telma 40mg</td>
                  <td className="py-2.5 px-2 text-muted-foreground">Telmisartan</td>
                  <td className="py-2.5 px-2 font-semibold text-primary">1-0-0 (OD)</td>
                  <td className="py-2.5 px-2 text-muted-foreground">Morning with water</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-2 font-bold text-foreground">Storvas 10mg</td>
                  <td className="py-2.5 px-2 text-muted-foreground">Atorvastatin</td>
                  <td className="py-2.5 px-2 font-semibold text-primary">0-0-1 (HS)</td>
                  <td className="py-2.5 px-2 text-muted-foreground">Bedtime (Started 02-Oct)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-2 font-bold text-foreground">Pan 40</td>
                  <td className="py-2.5 px-2 text-muted-foreground">Pantoprazole</td>
                  <td className="py-2.5 px-2 font-semibold text-primary">1-0-0 (OD)</td>
                  <td className="py-2.5 px-2 text-muted-foreground">30 min before morning meal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Smart Questions to Ask Doctor */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-border">
            <HelpCircle className="w-4 h-4 text-primary" /> 3. Suggested Questions for This Consultation
          </h3>

          <div className="space-y-2 text-xs">
            {[
              "My HbA1c rose from 7.2% to 8.1% over 3 months despite regular Glycomet 500mg. Would a dose adjustment or combination therapy (e.g. SGLT2 or DPP-4) be appropriate?",
              "My total cholesterol dropped favorably to 188 mg/dL after starting Storvas 10mg. How long should I continue this dose before repeating my lipid profile?",
              "Are there any specific dietary or exercise goals I should target alongside my blood pressure regimen (Telma 40mg)?",
              "When should I schedule my next fasting blood sugar check?",
            ].map((q, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-muted/40 border border-border flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                  {idx + 1}
                </span>
                <span className="text-foreground leading-relaxed font-medium">{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="pt-4 border-t border-border text-[11px] text-muted-foreground text-center">
          CareLens Personal Health Copilot &bull; Verified via InsForge Medical BaaS &bull; Non-diagnostic clinical summary compiled from patient records.
        </div>
      </div>
    </div>
  );
}
