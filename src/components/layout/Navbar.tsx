"use client";

import React from "react";
import { useCareLensStore } from "@/lib/store";
import { ThemeMode, AccessibilityMode, SupportedLanguage } from "@/lib/types";
import {
  HeartPulse,
  Sun,
  FileText,
  Leaf,
  Eye,
  Type,
  Users,
  ShieldCheck,
  Languages,
  CheckCircle2,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export function Navbar({ activeTab, onSelectTab }: { activeTab: string; onSelectTab: (tab: string) => void }) {
  const {
    user,
    setAuthModalOpen,
    theme,
    setTheme,
    language,
    setLanguage,
    accessibility,
    setAccessibility,
    familyMembers,
    activeFamilyMemberId,
    setActiveFamilyMemberId,
  } = useCareLensStore();

  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showThemeMenu, setShowThemeMenu] = React.useState(false);
  const [showLangMenu, setShowLangMenu] = React.useState(false);

  const activeMember = familyMembers.find((m) => m.id === activeFamilyMemberId);
  const activeName = activeMember
    ? `${activeMember.name} (${activeMember.relationship})`
    : user
    ? `${user.full_name || user.email.split("@")[0]} (Self)`
    : "Sign In";

  const themes: Array<{ id: ThemeMode; label: string; icon: React.ReactNode; color: string }> = [
    { id: "daylight", label: "Daylight", icon: <Sun className="w-4 h-4 text-blue-600" />, color: "bg-blue-600" },
    { id: "paper", label: "Paper", icon: <FileText className="w-4 h-4 text-amber-700" />, color: "bg-amber-700" },
    { id: "sage", label: "Sage", icon: <Leaf className="w-4 h-4 text-teal-700" />, color: "bg-teal-700" },
    { id: "high-contrast", label: "High Contrast", icon: <Eye className="w-4 h-4 text-black" />, color: "bg-black" },
  ];

  const languages: Array<{ code: SupportedLanguage; label: string; native: string }> = [
    { code: "en", label: "English", native: "English" },
    { code: "te", label: "Telugu", native: "తెలుగు" },
    { code: "hi", label: "Hindi", native: "हिन्दी" },
    { code: "ta", label: "Tamil", native: "தமிழ்" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => onSelectTab("dashboard")}
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md shadow-primary/20">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-foreground">CareLens</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                  Copilot
                </span>
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">AI Personal Health Copilot</p>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "upload", label: "Upload & Scan" },
              { id: "timeline", label: "Timeline" },
              { id: "trends", label: "Trends" },
              { id: "medications", label: "Medicines" },
              { id: "ask", label: "Ask Records" },
              { id: "brief", label: "Visit Brief" },
              { id: "abdm", label: "ABDM & FHIR" },
              { id: "settings", label: "Settings" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Family Profile & User Account Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowThemeMenu(false);
                  setShowLangMenu(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-muted border border-border text-foreground hover:bg-muted/80 transition-colors"
                title="Active Profile & Account"
              >
                <div className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">
                  {user?.full_name?.charAt(0) || "U"}
                </div>
                <span className="max-w-[120px] truncate">{activeName}</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-card border border-border shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  {/* Active Account Identity */}
                  <div className="px-2.5 py-2 bg-muted/50 rounded-lg mb-2 border border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Signed In Account</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">Active</span>
                    </div>
                    <p className="text-xs font-bold text-foreground truncate mt-0.5">{user?.full_name || "Guest User"}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{user?.email || "No email"}</p>
                  </div>

                  <div className="px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Switch Family Member
                  </div>
                  <button
                    onClick={() => {
                      setActiveFamilyMemberId(null);
                      setShowProfileMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${
                      activeFamilyMemberId === null ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
                    }`}
                  >
                    <span>{user?.full_name || "Primary User"} (Self)</span>
                    {activeFamilyMemberId === null && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>

                  {familyMembers.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setActiveFamilyMemberId(m.id);
                        setShowProfileMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${
                        activeFamilyMemberId === m.id ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
                      }`}
                    >
                      <span>
                        {m.name} ({m.relationship})
                      </span>
                      {activeFamilyMemberId === m.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}

                  <div className="border-t border-border mt-2 pt-1.5 space-y-0.5">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSelectTab("family");
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Users className="w-3.5 h-3.5 text-primary" /> Manage Family Profiles
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSelectTab("settings");
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5 text-primary" /> Profile &amp; Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setAuthModalOpen(true);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs font-bold text-primary hover:bg-primary/10 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <User className="w-3.5 h-3.5" /> Switch User / Login
                    </button>
                    {user && (
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          setAuthModalOpen(true);
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLangMenu(!showLangMenu);
                  setShowThemeMenu(false);
                  setShowProfileMenu(false);
                }}
                className="p-2 rounded-lg bg-muted border border-border text-foreground hover:bg-muted/80 transition-colors flex items-center gap-1"
                title="Select Language"
              >
                <Languages className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase">{language}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-card border border-border shadow-xl p-1.5 z-50">
                  <div className="px-2 py-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Select Language
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 text-xs rounded-lg flex items-center justify-between ${
                        language === l.code ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted"
                      }`}
                    >
                      <span>
                        {l.label} <span className="text-muted-foreground font-normal">({l.native})</span>
                      </span>
                      {language === l.code && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowThemeMenu(!showThemeMenu);
                  setShowLangMenu(false);
                  setShowProfileMenu(false);
                }}
                className="p-2 rounded-lg bg-muted border border-border text-foreground hover:bg-muted/80 transition-colors"
                title="Theme: No dark mode (Choice of Daylight, Paper, Sage, High Contrast)"
              >
                {themes.find((t) => t.id === theme)?.icon}
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-card border border-border shadow-xl p-1.5 z-50">
                  <div className="px-2 py-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Theme (Light Only)
                  </div>
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 text-xs rounded-lg flex items-center gap-2 ${
                        theme === t.id ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted"
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                      <span>{t.label}</span>
                      {theme === t.id && <CheckCircle2 className="w-3.5 h-3.5 ml-auto" />}
                    </button>
                  ))}
                  <div className="border-t border-border mt-1 pt-1">
                    <div className="px-2 py-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      Accessibility
                    </div>
                    <button
                      onClick={() => {
                        setAccessibility(accessibility === "large-text" ? "standard" : "large-text");
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                        accessibility === "large-text" ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Type className="w-3.5 h-3.5" /> Large Text (+25%)
                      </span>
                      {accessibility === "large-text" && <CheckCircle2 className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={() => {
                        setAccessibility(accessibility === "simple" ? "standard" : "simple");
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                        accessibility === "simple" ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> Simple Mode (Elderly)
                      </span>
                      {accessibility === "simple" && <CheckCircle2 className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
