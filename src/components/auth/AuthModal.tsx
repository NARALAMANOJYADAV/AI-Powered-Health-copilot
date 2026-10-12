"use client";

import React, { useState } from "react";
import { useCareLensStore, DEFAULT_USER } from "@/lib/store";
import { authLogin, authRegister, authLogout, syncUserProfile, authLoginWithGoogle } from "@/lib/insforge";
import { UserProfile } from "@/lib/types";
import { useTranslation } from "@/lib/useTranslation";
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  ShieldCheck,
  HeartPulse,
  LogOut,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

export function AuthModal() {
  const { t } = useTranslation();
  const { user, setUser, isAuthModalOpen, setAuthModalOpen } = useCareLensStore();

  const [mode, setMode] = useState<"signin" | "signup">(user ? "signin" : "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("1985-05-20");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [bloodGroup, setBloodGroup] = useState("B+");
  const [abhaId, setAbhaId] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setAuthModalOpen(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await authLogin(email, password);
      if (!res.success || !res.user) {
        setErrorMsg(res.error || "Invalid email or password");
        setLoading(false);
        return;
      }

      const signedInUser: UserProfile = {
        id: res.user.id,
        email: res.user.email || email,
        full_name: res.user.profile?.name || (res.user as { name?: string }).name || email.split("@")[0],
        phone: "+91 98765 43210",
        date_of_birth: "1985-01-01",
        gender: "male",
        blood_group: "O+",
        abha_id: `${email.split("@")[0]}@abdm`,
        theme: "daylight",
        language: "en",
        accessibility_mode: "standard",
      };

      setUser(signedInUser);
      setSuccessMsg("Successfully signed in!");
      setTimeout(() => {
        handleClose();
      }, 800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (!fullName.trim()) {
        setErrorMsg("Please enter your full name");
        setLoading(false);
        return;
      }

      const res = await authRegister({
        email,
        password,
        name: fullName,
      });

      if (!res.success || !res.user) {
        setErrorMsg(res.error || "Failed to create account");
        setLoading(false);
        return;
      }

      const newProfile: UserProfile = {
        id: res.user.id,
        email: res.user.email || email,
        full_name: fullName,
        phone: phone || "+91 98765 00000",
        date_of_birth: dob,
        gender,
        blood_group: bloodGroup,
        abha_id: abhaId || `${fullName.toLowerCase().replace(/\s+/g, "")}@abdm`,
        theme: "daylight",
        language: "en",
        accessibility_mode: "standard",
      };

      // Sync into profiles table
      await syncUserProfile(newProfile);

      setUser(newProfile);
      setSuccessMsg(
        res.requireEmailVerification
          ? "Account created! A verification email was sent (demo session activated)."
          : "Account created and profile synced successfully!"
      );

      setTimeout(() => {
        handleClose();
      }, 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      const res = await authLoginWithGoogle();
      if (res?.error) {
        setErrorMsg(res.error.message || "Google OAuth authentication failed");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google sign in error";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    await authLogout();
    setUser(null);
    setLoading(false);
    setSuccessMsg("Signed out successfully.");
    setTimeout(() => {
      setSuccessMsg(null);
      setMode("signin");
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-5 border-b border-border flex items-center justify-between bg-muted/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-foreground">CareLens</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                  {t("accountSecurity")}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">{t("settingsSubtitle")}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Bar if logged in */}
        {user && (
          <div className="px-5 py-3 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                {user.full_name?.charAt(0) || "U"}
              </div>
              <div>
                <p className="font-bold text-foreground truncate max-w-[170px]">{user.full_name}</p>
                <p className="text-[11px] text-muted-foreground truncate max-w-[170px]">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t("signOut")}</span>
            </button>
          </div>
        )}

        {/* Mode Switcher Tabs */}
        <div className="flex border-b border-border bg-card">
          <button
            onClick={() => {
              setMode("signin");
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
              mode === "signin"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("signInTab")}
          </button>
          <button
            onClick={() => {
              setMode("signup");
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
              mode === "signup"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("signUpTab")}
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center my-2">
            <div className="flex-1 border-t border-border" />
            <span className="px-2 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">or with email</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {mode === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">{t("email")}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">{t("password")}</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5"
              >
                {loading ? "..." : t("signIn")}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">{t("fullName")}</label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">{t("email")}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ramesh@example.in"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">{t("password")}</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 chars"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-foreground mb-1">{t("dob")}</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-foreground mb-1">{t("gender")}</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as "male" | "female" | "other")}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="male">{t("male")}</option>
                    <option value="female">{t("female")}</option>
                    <option value="other">{t("other")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-foreground mb-1">{t("bloodGroup")}</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-foreground mb-1">{t("phone")}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98490 12345"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-foreground mb-1">{t("abhaAddress")}</label>
                  <input
                    type="text"
                    value={abhaId}
                    onChange={(e) => setAbhaId(e.target.value)}
                    placeholder="user@abdm"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 mt-2"
              >
                {loading ? "..." : t("signUpTab")}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
