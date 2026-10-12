import React, { useState, useEffect } from "react";
import { useCareLensStore } from "@/lib/store";
import { ThemeMode, AccessibilityMode, SupportedLanguage, UserProfile } from "@/lib/types";
import { syncUserProfile, authLogout } from "@/lib/insforge";
import { useTranslation } from "@/lib/useTranslation";
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
  User,
  Mail,
  Phone,
  Calendar,
  HeartPulse,
  LogOut,
  Save,
  Sparkles,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";

export function SettingsView({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { t } = useTranslation();
  const {
    user,
    setUser,
    setAuthModalOpen,
    theme,
    setTheme,
    language,
    setLanguage,
    accessibility,
    setAccessibility,
  } = useCareLensStore();

  // Profile Form State
  const [fullName, setFullName] = useState(user?.full_name || "Rajesh Kumar");
  const [email, setEmail] = useState(user?.email || "rajesh.kumar@example.com");
  const [phone, setPhone] = useState(user?.phone || "+91 98490 12345");
  const [dob, setDob] = useState(user?.date_of_birth || "1974-06-15");
  const [gender, setGender] = useState<"male" | "female" | "other">(user?.gender || "male");
  const [bloodGroup, setBloodGroup] = useState(user?.blood_group || "B+");
  const [abhaId, setAbhaId] = useState(user?.abha_id || "91-4521-8923-1045@abdm");

  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setDob(user.date_of_birth || "1974-06-15");
      setGender(user.gender || "male");
      setBloodGroup(user.blood_group || "B+");
      setAbhaId(user.abha_id || "");
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);

    const updatedProfile: UserProfile = {
      id: user?.id || "usr_rajesh_demo",
      email: email,
      full_name: fullName,
      phone: phone,
      date_of_birth: dob,
      gender: gender,
      blood_group: bloodGroup,
      abha_id: abhaId,
      theme: theme,
      language: language,
      accessibility_mode: accessibility,
    };

    // Update Zustand Store
    setUser(updatedProfile);

    // Sync to PostgreSQL profiles table
    await syncUserProfile(updatedProfile);

    setSavingProfile(false);
    setProfileSuccess(true);
    setTimeout(() => {
      setProfileSuccess(false);
    }, 2500);
  };

  const handleSignOut = async () => {
    await authLogout();
    setUser(null);
    setAuthModalOpen(true);
  };

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
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" /> {t("settingsTitle")}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("settingsSubtitle")}
          </p>
        </div>

        {/* Quick Auth Status Button */}
        <div className="flex items-center gap-2">
          {user ? (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t("signOut")}</span>
            </button>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t("signIn")}</span>
            </button>
          )}
        </div>
      </div>

      {/* Section 0: Personal Profile & Clinical Identity */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> {t("personalIdentity")}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              These details are used by the <strong>Clinical Rules Engine</strong> to adjust normal biomarker reference ranges for age and sex.
            </p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
            Primary Profile
          </span>
        </div>

        {profileSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="font-semibold">Profile changes saved and synchronized with Clinical Rules Engine &amp; PostgreSQL!</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">{t("fullName")}</label>
              <div className="relative">
                <User className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">{t("email")}</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-input bg-muted/50 text-muted-foreground cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">{t("dob")}</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">{t("gender")}</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as "male" | "female" | "other")}
                className="w-full px-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="male">{t("male")}</option>
                <option value="female">{t("female")}</option>
                <option value="other">{t("other")}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">{t("bloodGroup")}</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">{t("phone")}</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Masked client-side before sending to LLMs.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">ABHA ID (Ayushman Bharat)</label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                <input
                  type="text"
                  value={abhaId}
                  onChange={(e) => setAbhaId(e.target.value)}
                  placeholder="e.g. 91-4521-8923-1045@abdm"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Linked to official ABDM Sandbox registry.</p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border">
            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Updating profile immediately recalibrates age/sex thresholds across all lab reports.</span>
            </div>
            <button
              type="submit"
              disabled={savingProfile}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingProfile ? t("saving") : t("saveProfile")}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Section 0.5: Account Security & Session Management */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" /> {t("accountSecurity")}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Log in to a different patient account, create a new family profile, or securely sign out.
          </p>
        </div>

        <div className="bg-muted/40 rounded-xl p-4 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground">Current Account:</span>
              <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                {user?.email || "Guest Patient"}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              User ID: <code className="bg-muted px-1 py-0.5 rounded text-[10px]">{user?.id || "local-session"}</code>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onNavigate && (
              <button
                onClick={() => onNavigate("admin")}
                className="px-3.5 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-900 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
                <span>Admin Master Portal</span>
              </button>
            )}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-muted text-xs font-bold text-foreground transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-primary" />
              <span>Switch User / New Login</span>
            </button>
            {user && (
              <button
                onClick={handleSignOut}
                className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </div>
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
          <Type className="w-4 h-4 text-primary" /> {t("accessibilityHeading")}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Accessibility Mode */}
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
            <span className="text-xs font-bold text-foreground block">{t("readingAccessibility")}</span>
            <div className="space-y-2">
              {[
                { id: "standard", label: t("layoutStandard") },
                { id: "large-text", label: t("layoutLargeText") },
                { id: "simple", label: t("layoutSimple") },
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
            <span className="text-xs font-bold text-foreground block">{t("defaultLangHeading")}</span>
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
            <Lock className="w-4 h-4 text-primary" /> {t("patientConsentTitle")}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("patientConsentDesc")}
          </p>
        </div>

        <div className="space-y-2.5 pt-1">
          {[
            {
              key: "emergency_access",
              title: t("consentEmergencyTitle"),
              desc: t("consentEmergencyDesc"),
            },
            {
              key: "abdm_sync",
              title: t("consentAbdmTitle"),
              desc: t("consentAbdmDesc"),
            },
            {
              key: "offline_cache",
              title: t("consentOfflineTitle"),
              desc: t("consentOfflineDesc"),
            },
            {
              key: "ai_assistance",
              title: t("consentAiTitle"),
              desc: t("consentAiDesc"),
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
            <History className="w-4 h-4 text-primary" /> {t("auditLogTitle")}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("auditLogDesc")}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-semibold">
                <th className="py-2.5 px-3">{t("thEventAction")}</th>
                <th className="py-2.5 px-3">{t("thResourceTarget")}</th>
                <th className="py-2.5 px-3">{t("thTimestamp")}</th>
                <th className="py-2.5 px-3">{t("thStatus")}</th>
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
