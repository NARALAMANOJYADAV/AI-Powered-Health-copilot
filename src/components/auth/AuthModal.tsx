"use client";

import React, { useState } from "react";
import { useCareLensStore, DEFAULT_USER } from "@/lib/store";
import { authLogin, authRegister, authLogout, syncUserProfile } from "@/lib/insforge";
import { UserProfile } from "@/lib/types";
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

  const handleQuickDemo = (demoType: "rajesh" | "sunita") => {
    if (demoType === "rajesh") {
      setUser(DEFAULT_USER);
    } else {
      setUser({
        id: "usr_sunita_caregiver",
        email: "sunita.devi@caregiver.in",
        full_name: "Sunita Devi",
        phone: "+91 97110 54321",
        date_of_birth: "1980-11-24",
        gender: "female",
        blood_group: "A+",
        abha_id: "91-8842-1923-4411@abdm",
        theme: "daylight",
        language: "hi",
        accessibility_mode: "standard",
      });
    }
    setSuccessMsg(`Switched to demo profile!`);
    setTimeout(() => {
      handleClose();
    }, 600);
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
                  Authentication
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">Secure Health ID &amp; Profile Access</p>
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
              <span>Logout</span>
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
            Sign In to Existing Account
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
            Create New Account
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

          {mode === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Email Address</label>
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
                <label className="block text-xs font-bold text-foreground mb-1">Password</label>
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
                {loading ? "Authenticating..." : "Sign In to CareLens"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra Sharma"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">Email</label>
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
                  <label className="block text-xs font-bold text-foreground mb-1">Password</label>
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
                  <label className="block text-[11px] font-bold text-foreground mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-foreground mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as "male" | "female" | "other")}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-foreground mb-1">Blood Group</label>
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
                  <label className="block text-[11px] font-bold text-foreground mb-1">Mobile (+91)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98490 12345"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-foreground mb-1">ABHA Address (Optional)</label>
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
                {loading ? "Registering & Syncing..." : "Create Account & Profile"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Quick Demo Accounts */}
          <div className="border-t border-border pt-3 mt-3">
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Instant Test Logins (Zero Setup)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("rajesh")}
                className="p-2.5 rounded-xl border border-border bg-card hover:bg-primary/5 hover:border-primary/40 text-left transition-all group"
              >
                <div className="text-xs font-bold text-foreground group-hover:text-primary">Rajesh Kumar</div>
                <div className="text-[10px] text-muted-foreground">Self &bull; Diabetic Profile</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("sunita")}
                className="p-2.5 rounded-xl border border-border bg-card hover:bg-primary/5 hover:border-primary/40 text-left transition-all group"
              >
                <div className="text-xs font-bold text-foreground group-hover:text-primary">Sunita Devi</div>
                <div className="text-[10px] text-muted-foreground">Family &bull; Hindi Interface</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
