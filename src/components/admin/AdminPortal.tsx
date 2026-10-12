"use client";

import React, { useState } from "react";
import { useCareLensStore } from "@/lib/store";
import { CLINICAL_RULES } from "@/lib/rules-engine";
import { useTranslation } from "@/lib/useTranslation";
import {
  ShieldAlert,
  Server,
  Users,
  FileText,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  Lock,
  Unlock,
  Sliders,
  Download,
  Database,
  Cpu,
  Key,
  ShieldCheck,
  Eye,
  Plus,
  Trash2,
  ChevronRight,
  ExternalLink,
  Zap,
} from "lucide-react";

export function AdminPortal() {
  const { t } = useTranslation();
  const { user, familyMembers } = useCareLensStore();

  const [activeAdminTab, setActiveAdminTab] = useState<
    "overview" | "users" | "rules" | "audit" | "flags"
  >("overview");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");

  // System feature flags state
  const [featureFlags, setFeatureFlags] = useState({
    aiSummarization: true,
    abdmSync: true,
    emergencyQrAccess: true,
    privacyDeIdMasking: true,
    multilingualVoiceTTS: true,
    strictLightTheme: true,
  });

  const toggleFlag = (flag: keyof typeof featureFlags) => {
    setFeatureFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  // Mock patient roster combining local store with simulated enterprise accounts
  const [patients, setPatients] = useState([
    {
      id: "usr_rajesh_demo",
      name: user?.full_name || "Rajesh Kumar",
      email: user?.email || "rajesh.kumar@example.com",
      role: "admin",
      blood_group: user?.blood_group || "B+",
      abha_id: user?.abha_id || "91-4521-8923-1045@abdm",
      recordsCount: 5,
      joined: "12-Oct-2025",
      status: "active",
    },
    {
      id: "usr_sunita_mother",
      name: "Sunita Devi",
      email: "sunita.devi@family.care",
      role: "patient",
      blood_group: "B+",
      abha_id: "91-8842-1923-4411@abdm",
      recordsCount: 3,
      joined: "10-Jan-2026",
      status: "active",
    },
    {
      id: "usr_meena_spouse",
      name: "Meena Kumar",
      email: "meena.k@example.com",
      role: "patient",
      blood_group: "O+",
      abha_id: "91-3321-4921-9988@abdm",
      recordsCount: 4,
      joined: "14-Feb-2026",
      status: "active",
    },
    {
      id: "usr_dr_sharma",
      name: "Dr. Alok Sharma, MD",
      email: "alok.sharma@apollo.in",
      role: "caregiver",
      blood_group: "A+",
      abha_id: "dr.sharma@abdm-physician",
      recordsCount: 18,
      joined: "05-Aug-2025",
      status: "active",
    },
    {
      id: "usr_aarav_son",
      name: "Aarav Kumar",
      email: "aarav.k@example.com",
      role: "patient",
      blood_group: "A+",
      abha_id: "91-1123-5599-2341@abdm",
      recordsCount: 2,
      joined: "01-Mar-2026",
      status: "active",
    },
  ]);

  const toggleUserRole = (userId: string) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id !== userId) return p;
        const newRole = p.role === "admin" ? "patient" : "admin";
        return { ...p, role: newRole };
      })
    );
  };

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abha_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      selectedRoleFilter === "all" || p.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 md:pb-10">
      {/* Admin Master Header */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Super Admin Portal
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> InsForge BaaS Connected
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1.5 tracking-tight">
            CareLens Central Control &amp; Governance
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage users, clinical rules engine thresholds, ABDM gateway integration, and system security ledgers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-muted px-3 py-1.5 rounded-xl border border-border text-muted-foreground">
            BaaS: 5i9wrqng.us-east.insforge.app
          </span>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex border-b border-border bg-card rounded-2xl p-1 shadow-card gap-1 overflow-x-auto">
        {[
          { id: "overview", label: "System Health & Metrics", icon: Activity },
          { id: "users", label: "Patient & User Accounts", icon: Users },
          { id: "rules", label: "Clinical Rules Engine (28+ LOINC)", icon: Sliders },
          { id: "audit", label: "Security & Audit Ledger", icon: Database },
          { id: "flags", label: "Global Feature Controls", icon: Cpu },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setActiveAdminTab(tab.id as any)
              }
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: System Health & Metrics */}
      {activeAdminTab === "overview" && (
        <div className="space-y-6">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                Total Registered Users
              </span>
              <div className="text-2xl font-black text-foreground mt-1">142</div>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> +12 this week
              </span>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                Stored Clinical Reports
              </span>
              <div className="text-2xl font-black text-foreground mt-1">1,280</div>
              <span className="text-[11px] text-muted-foreground mt-1 block">
                Verified across 14 lab providers
              </span>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                AI Generative Explanations
              </span>
              <div className="text-2xl font-black text-foreground mt-1">4,892</div>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                Class 8 Reading Level Verified
              </span>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                Rules Safety Checks
              </span>
              <div className="text-2xl font-black text-foreground mt-1">12,410</div>
              <span className="text-[11px] text-muted-foreground mt-1 block">
                Zero missed critical interactions
              </span>
            </div>
          </div>

          {/* Cloud & Edge Microservices Status */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
            <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" /> Edge Functions &amp; BaaS Health Status
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground">carelens-extract</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Live / 200 OK
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  OCR visual bounding box coordinate mapping and entity recognition.
                </p>
                <div className="text-[10px] font-mono text-muted-foreground">
                  Endpoint: /carelens-extract &bull; 99.8% Uptime
                </div>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground">carelens-explain</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Live / 200 OK
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Class-8 plain language medical summarization (TE, HI, TA, EN).
                </p>
                <div className="text-[10px] font-mono text-muted-foreground">
                  Endpoint: /carelens-explain &bull; 99.9% Uptime
                </div>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground">carelens-ask</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Live / 200 OK
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Conversational Q&amp;A grounded against patient records without hallucination.
                </p>
                <div className="text-[10px] font-mono text-muted-foreground">
                  Endpoint: /carelens-ask &bull; 100% Uptime
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: User & Patient Accounts Management */}
      {activeAdminTab === "users" && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                Patient &amp; Clinical Identity Directory
              </h3>
              <p className="text-xs text-muted-foreground">
                Control patient permissions, verify ABHA connections, and manage family accounts.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search user, email, ABHA..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-2 text-xs rounded-xl bg-muted border border-border text-foreground focus:ring-2 focus:ring-primary w-56"
                />
              </div>

              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="text-xs rounded-xl bg-muted border border-border px-3 py-2 text-foreground font-semibold"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admins</option>
                <option value="patient">Patients</option>
                <option value="caregiver">Caregivers</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-semibold">
                  <th className="py-2.5 px-3">User / Patient</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">ABHA Address</th>
                  <th className="py-2.5 px-3">Blood Group</th>
                  <th className="py-2.5 px-3">Records</th>
                  <th className="py-2.5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-foreground">{p.name}</div>
                      <div className="text-[11px] text-muted-foreground">{p.email}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          p.role === "admin"
                            ? "bg-red-100 text-red-800"
                            : p.role === "caregiver"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {p.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-foreground">
                      {p.abha_id}
                    </td>
                    <td className="py-3 px-3 font-bold text-foreground">
                      {p.blood_group}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {p.recordsCount} files
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleUserRole(p.id)}
                        className="px-2.5 py-1 rounded-lg border border-border text-[11px] font-bold text-foreground hover:bg-muted transition-colors"
                      >
                        {p.role === "admin" ? "Demote to Patient" : "Grant Admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Clinical Rules Engine (28+ LOINC) */}
      {activeAdminTab === "rules" && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-5">
          <div>
            <h3 className="text-base font-extrabold text-foreground">
              Clinical Rules Engine Matrix &amp; Diagnostic Thresholds
            </h3>
            <p className="text-xs text-muted-foreground">
              Pre-configured Indian clinical reference intervals based on ICMR, RSSDI, and NCEP ATP III standards.
            </p>
          </div>

          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 bg-card z-10">
                <tr className="border-b border-border text-muted-foreground font-semibold">
                  <th className="py-2.5 px-3">Biomarker</th>
                  <th className="py-2.5 px-3">Standard LOINC</th>
                  <th className="py-2.5 px-3">Normal Interval</th>
                  <th className="py-2.5 px-3">Unit</th>
                  <th className="py-2.5 px-3">Clinical Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {CLINICAL_RULES.map((rule, idx) => {
                  const range = rule.getRange({ gender: "male" });
                  return (
                    <tr key={idx} className="hover:bg-muted/20 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-foreground">{rule.name}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">
                          {rule.key}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-primary font-bold">
                        {rule.loinc_code || "N/A"}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">
                        {range.min} - {range.max}
                      </td>
                      <td className="py-2.5 px-3 text-muted-foreground">{rule.unit}</td>
                      <td className="py-2.5 px-3 text-[11px] text-muted-foreground max-w-[280px]">
                        {rule.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Security & Audit Ledger */}
      {activeAdminTab === "audit" && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                Cryptographic Security &amp; Access Audit Ledger
              </h3>
              <p className="text-xs text-muted-foreground">
                Tamper-evident logs of all record viewings, OCR scans, token shares, and FHIR exports.
              </p>
            </div>
            <button
              onClick={() => {
                const blob = new Blob(
                  [
                    JSON.stringify(
                      [
                        { action: "DOCUMENT_OCR_PROCESSED", status: "VERIFIED", timestamp: "2026-10-12T16:30:00Z" },
                        { action: "QR_TOKEN_GENERATED", status: "ACTIVE_24H", timestamp: "2026-10-12T16:25:00Z" },
                        { action: "FHIR_BUNDLE_EXPORTED", status: "SUCCESS", timestamp: "2026-10-12T16:10:00Z" },
                      ],
                      null,
                      2
                    ),
                  ],
                  { type: "application/json" }
                );
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "carelens_audit_ledger.json";
                a.click();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-muted border border-border text-foreground font-semibold text-xs hover:bg-muted/80 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-primary" /> Export Audit Log
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {[
              {
                action: "OCR_EXTRACTION_SUCCESS",
                target: "CareLens_Diabetes_Panel.jpg",
                user: "Rajesh Kumar (usr_rajesh_demo)",
                time: "12-Oct-2026 16:32:00",
                status: "VERIFIED",
                ip: "103.212.14.88 (Hyderabad, IN)",
              },
              {
                action: "QR_EMERGENCY_LINK_CREATED",
                target: "tok_carelens_9f82a17b3",
                user: "Doctor Consultation Token",
                time: "12-Oct-2026 16:18:22",
                status: "ACTIVE",
                ip: "103.212.14.88 (Hyderabad, IN)",
              },
              {
                action: "FHIR_BUNDLE_DOWNLOADED",
                target: "ABDM-FHIR-R4-DiagnosticReport",
                user: "Rajesh Kumar (usr_rajesh_demo)",
                time: "12-Oct-2026 15:45:10",
                status: "EXPORTED",
                ip: "103.212.14.88 (Hyderabad, IN)",
              },
              {
                action: "USER_AUTHENTICATION_LOGIN",
                target: "rajesh.kumar@example.com",
                user: "Rajesh Kumar",
                time: "12-Oct-2026 15:10:04",
                status: "SUCCESS",
                ip: "103.212.14.88 (Hyderabad, IN)",
              },
            ].map((entry, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-foreground">
                      {entry.action}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {entry.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Target: {entry.target} &bull; User: {entry.user}
                  </div>
                </div>
                <div className="text-right text-[11px] text-muted-foreground">
                  <div>{entry.time}</div>
                  <div className="font-mono text-[10px]">{entry.ip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Global Feature Controls (Feature Flags) */}
      {activeAdminTab === "flags" && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-5">
          <div>
            <h3 className="text-base font-extrabold text-foreground">
              Enterprise Feature Flags &amp; Architectural Toggles
            </h3>
            <p className="text-xs text-muted-foreground">
              Enable or disable specific features dynamically across the CareLens platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground block">
                  AI Edge Function Summarization
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Uses `/carelens-explain` Deno microservice for Class-8 explanations.
                </span>
              </div>
              <button
                onClick={() => toggleFlag("aiSummarization")}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                  featureFlags.aiSummarization
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {featureFlags.aiSummarization ? "ENABLED" : "DISABLED"}
              </button>
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground block">
                  Ayushman Bharat (ABDM) HIP Sync
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Enables FHIR R4 Bundle exchange in ABDM Sandbox environment.
                </span>
              </div>
              <button
                onClick={() => toggleFlag("abdmSync")}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                  featureFlags.abdmSync
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {featureFlags.abdmSync ? "ENABLED" : "DISABLED"}
              </button>
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground block">
                  Emergency 24-Hour Doctor QR Links
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Allows instant scanning without app installation for clinic visits.
                </span>
              </div>
              <button
                onClick={() => toggleFlag("emergencyQrAccess")}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                  featureFlags.emergencyQrAccess
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {featureFlags.emergencyQrAccess ? "ENABLED" : "DISABLED"}
              </button>
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground block">
                  Privacy De-Identification Filter
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Masks Aadhaar/ABHA ID &amp; private phone numbers before edge processing.
                </span>
              </div>
              <button
                onClick={() => toggleFlag("privacyDeIdMasking")}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                  featureFlags.privacyDeIdMasking
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {featureFlags.privacyDeIdMasking ? "ENABLED" : "DISABLED"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
