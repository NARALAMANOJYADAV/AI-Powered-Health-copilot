"use client";

import React, { useState } from "react";
import { useCareLensStore } from "@/lib/store";
import { FamilyMember, HealthCondition } from "@/lib/types";
import { useTranslation } from "@/lib/useTranslation";
import {
  Users,
  UserPlus,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Heart,
  Droplet,
  ChevronRight,
  User,
  Edit2,
  Trash2,
  AlertTriangle,
  Plus,
  Activity,
  Flame,
  Stethoscope,
  X,
  Clock,
  Sparkles,
} from "lucide-react";

export function FamilyProfiles({ onSelectProfile }: { onSelectProfile?: () => void }) {
  const { t } = useTranslation();
  const {
    user,
    setUser,
    familyMembers,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    addConditionToMember,
    removeConditionFromMember,
    activeFamilyMemberId,
    setActiveFamilyMemberId,
  } = useCareLensStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | "self" | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [conditionModalMemberId, setConditionModalMemberId] = useState<string | null | "self">(null);

  // Form state for creating family member
  const [formData, setFormData] = useState({
    name: "",
    relationship: "Mother",
    date_of_birth: "1965-01-01",
    gender: "female",
    blood_group: "B+",
    abha_id: "",
    notes: "",
  });

  // Form state for editing family member
  const [editFormData, setEditFormData] = useState({
    name: "",
    relationship: "Other",
    date_of_birth: "",
    gender: "female",
    blood_group: "O+",
    abha_id: "",
    notes: "",
  });

  // Form state for adding sudden condition / illness
  const [conditionForm, setConditionForm] = useState<{
    name: string;
    type: "chronic" | "acute_sudden" | "allergy" | "other";
    diagnosed_date: string;
    severity: "mild" | "moderate" | "severe";
    status: "active" | "under_treatment" | "managed" | "resolved";
    notes: string;
  }>({
    name: "Viral Fever / Influenza",
    type: "acute_sudden",
    diagnosed_date: new Date().toISOString().split("T")[0],
    severity: "moderate",
    status: "active",
    notes: "",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newMember: FamilyMember = {
      id: `fam-${Date.now()}`,
      user_id: user?.id || "demo-user",
      name: formData.name.trim(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      relationship: formData.relationship as any,
      date_of_birth: formData.date_of_birth || "1975-01-01",
      gender: formData.gender as "male" | "female" | "other",
      blood_group: formData.blood_group,
      abha_id: formData.abha_id,
      notes: formData.notes,
      conditions: [],
      created_at: new Date().toISOString(),
    };

    addFamilyMember(newMember);
    setIsAddModalOpen(false);
    setFormData({
      name: "",
      relationship: "Mother",
      date_of_birth: "1965-01-01",
      gender: "female",
      blood_group: "B+",
      abha_id: "",
      notes: "",
    });
  };

  const handleOpenEdit = (member: FamilyMember | "self") => {
    if (member === "self") {
      setEditingMember("self");
      setEditFormData({
        name: user?.full_name || "Rajesh Kumar",
        relationship: "Self",
        date_of_birth: user?.date_of_birth || "1974-06-15",
        gender: user?.gender || "male",
        blood_group: user?.blood_group || "B+",
        abha_id: user?.abha_id || "",
        notes: "Primary account holder",
      });
    } else {
      setEditingMember(member);
      setEditFormData({
        name: member.name,
        relationship: member.relationship,
        date_of_birth: member.date_of_birth || "",
        gender: member.gender || "female",
        blood_group: member.blood_group || "O+",
        abha_id: member.abha_id || "",
        notes: member.notes || "",
      });
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData.name.trim()) return;

    if (editingMember === "self") {
      if (user) {
        setUser({
          ...user,
          full_name: editFormData.name.trim(),
          date_of_birth: editFormData.date_of_birth,
          gender: editFormData.gender as "male" | "female" | "other",
          blood_group: editFormData.blood_group,
          abha_id: editFormData.abha_id,
        });
      }
    } else if (editingMember) {
      updateFamilyMember(editingMember.id, {
        name: editFormData.name.trim(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        relationship: editFormData.relationship as any,
        date_of_birth: editFormData.date_of_birth,
        gender: editFormData.gender as "male" | "female" | "other",
        blood_group: editFormData.blood_group,
        abha_id: editFormData.abha_id,
        notes: editFormData.notes,
      });
    }
    setEditingMember(null);
  };

  const handleDelete = (id: string) => {
    deleteFamilyMember(id);
    setDeleteConfirmId(null);
  };

  const handleAddCondition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conditionForm.name.trim()) return;

    const newCond: HealthCondition = {
      id: `cond-${Date.now()}`,
      name: conditionForm.name.trim(),
      type: conditionForm.type,
      diagnosed_date: conditionForm.diagnosed_date,
      severity: conditionForm.severity,
      status: conditionForm.status,
      notes: conditionForm.notes.trim(),
    };

    const targetId = conditionModalMemberId === "self" ? null : conditionModalMemberId;
    addConditionToMember(targetId, newCond);
    setConditionModalMemberId(null);
    setConditionForm({
      name: "Viral Fever / Influenza",
      type: "acute_sudden",
      diagnosed_date: new Date().toISOString().split("T")[0],
      severity: "moderate",
      status: "active",
      notes: "",
    });
  };

  const calculateAge = (dob?: string) => {
    if (!dob) return "N/A";
    const birthYear = new Date(dob).getFullYear();
    if (isNaN(birthYear)) return "N/A";
    const age = new Date().getFullYear() - birthYear;
    return `${age} Y`;
  };

  // Compile list of profiles (Self + all family members)
  const allProfiles = [
    {
      id: null,
      name: user?.full_name || "Rajesh Kumar",
      relationship: t("self"),
      age: calculateAge(user?.date_of_birth),
      gender: user?.gender === "female" ? t("female") : t("male"),
      blood: user?.blood_group || "B+",
      abha: user?.abha_id || "91-4521-8923-1045@abdm",
      conditions: user?.conditions || [],
      isSelf: true,
      original: "self" as const,
    },
    ...familyMembers.map((m) => ({
      id: m.id,
      name: m.name,
      relationship: m.relationship,
      age: calculateAge(m.date_of_birth),
      gender: m.gender === "female" ? t("female") : t("male"),
      blood: m.blood_group || "O+",
      abha: m.abha_id || "Not Linked",
      conditions: m.conditions || [],
      isSelf: false,
      original: m,
    })),
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-10">
      {/* Header */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" /> {t("familyTitle")}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("familySubtitle")}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 hover:opacity-95 transition-opacity flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> {t("addFamilyMember")}
        </button>
      </div>

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allProfiles.map((p) => {
          const isActive = activeFamilyMemberId === p.id;
          return (
            <div
              key={p.id || "self"}
              className={`p-5 rounded-2xl border transition-all shadow-card flex flex-col justify-between ${
                isActive
                  ? "bg-primary/5 border-primary shadow-highlight ring-1 ring-primary/40"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div>
                {/* Card Top Strip */}
                <div className="flex items-start justify-between pb-3 border-b border-border/80">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-base shadow-sm ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
                        <span>{p.name}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {p.relationship}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {p.age} &bull; {p.gender} &bull; {p.blood}
                      </div>
                    </div>
                  </div>

                  {/* Actions (Switch, Edit, Delete) */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(p.original)}
                      className="p-1.5 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                      title="Edit Profile"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {!p.isSelf && (
                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Profile"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Identity Badges */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-muted/40 border border-border">
                    <span className="text-[10px] text-muted-foreground block">{t("bloodGroup")}</span>
                    <span className="font-bold text-foreground mt-0.5 flex items-center gap-1">
                      <Droplet className="w-3 h-3 text-red-500" /> {p.blood}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-muted/40 border border-border">
                    <span className="text-[10px] text-muted-foreground block">{t("abhaAddress")}</span>
                    <span className="font-mono text-[11px] font-semibold text-foreground truncate block">
                      {p.abha}
                    </span>
                  </div>
                </div>

                {/* Health Conditions & Sudden Illnesses Tracker */}
                <div className="mt-3.5 pt-3 border-t border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-foreground flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-primary" /> Health Conditions &amp; Illnesses
                    </span>
                    <button
                      onClick={() => setConditionModalMemberId(p.id ?? "self")}
                      className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full"
                    >
                      <Plus className="w-3 h-3" /> Add Disease / Sudden Illness
                    </button>
                  </div>

                  {p.conditions.length === 0 ? (
                    <div className="p-2 rounded-lg bg-muted/20 border border-dashed border-border text-[11px] text-muted-foreground text-center">
                      No sudden illnesses or chronic conditions logged yet.
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.conditions.map((c) => {
                        const isAcute = c.type === "acute_sudden";
                        const isSevere = c.severity === "severe";
                        return (
                          <div
                            key={c.id}
                            className={`px-2 py-1 rounded-lg border text-[11px] flex items-center gap-1.5 ${
                              isAcute
                                ? "bg-amber-50/70 border-amber-300 text-amber-900"
                                : isSevere
                                ? "bg-red-50/70 border-red-300 text-red-900"
                                : "bg-muted/40 border-border text-foreground"
                            }`}
                          >
                            {isAcute ? (
                              <Flame className="w-3 h-3 text-amber-600" />
                            ) : (
                              <Stethoscope className="w-3 h-3 text-primary" />
                            )}
                            <span className="font-bold">{c.name}</span>
                            <span className="text-[9px] uppercase font-semibold px-1 py-0.2 rounded bg-black/5">
                              {c.severity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeConditionFromMember(p.id, c.id);
                              }}
                              className="text-muted-foreground hover:text-red-600 ml-1 font-bold"
                              title="Remove condition"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Switcher Bar */}
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                {isActive ? (
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" /> {t("activeProfile")}
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setActiveFamilyMemberId(p.id);
                      if (onSelectProfile) onSelectProfile();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm hover:opacity-95 transition-opacity flex items-center gap-1"
                  >
                    <span>{t("switchProfile")}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => {
                    setActiveFamilyMemberId(p.id);
                    if (onSelectProfile) onSelectProfile();
                  }}
                  className="text-muted-foreground hover:text-foreground text-[11px] font-semibold"
                >
                  View Clinical Records &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card rounded-2xl border border-border max-w-md w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-base font-extrabold text-foreground">{t("addFamilyMember")}</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">{t("fullName")}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kamala Devi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">{t("relationship")}</label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Spouse">{t("spouse")}</option>
                    <option value="Child">{t("child")}</option>
                    <option value="Other">{t("other")}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">{t("gender")}</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="female">{t("female")}</option>
                    <option value="male">{t("male")}</option>
                    <option value="other">{t("other")}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">{t("dob")}</label>
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">{t("bloodGroup")}</label>
                  <select
                    value={formData.blood_group}
                    onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">{t("abhaAddress")}</label>
                <input
                  type="text"
                  placeholder="e.g. 91-4521-8923-1045@abdm"
                  value={formData.abha_id}
                  onChange={(e) => setFormData({ ...formData, abha_id: e.target.value })}
                  className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">Clinical Notes</label>
                <textarea
                  rows={2}
                  placeholder="Known allergies, existing chronic conditions, ongoing therapies..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-muted text-xs font-bold text-foreground hover:bg-muted/80"
                >
                  {t("cancelBtn")}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:opacity-95 shadow-sm"
                >
                  {t("saveMember")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card rounded-2xl border border-border max-w-md w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-base font-extrabold text-foreground">
                Edit {editingMember === "self" ? "Personal Profile" : "Family Member"}
              </h3>
              <button
                onClick={() => setEditingMember(null)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">{t("fullName")}</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>

              {editingMember !== "self" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">{t("relationship")}</label>
                    <select
                      value={editFormData.relationship}
                      onChange={(e) => setEditFormData({ ...editFormData, relationship: e.target.value })}
                      className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Spouse">{t("spouse")}</option>
                      <option value="Child">{t("child")}</option>
                      <option value="Other">{t("other")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">{t("gender")}</label>
                    <select
                      value={editFormData.gender}
                      onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
                      className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                    >
                      <option value="female">{t("female")}</option>
                      <option value="male">{t("male")}</option>
                      <option value="other">{t("other")}</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">{t("dob")}</label>
                  <input
                    type="date"
                    value={editFormData.date_of_birth}
                    onChange={(e) => setEditFormData({ ...editFormData, date_of_birth: e.target.value })}
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">{t("bloodGroup")}</label>
                  <select
                    value={editFormData.blood_group}
                    onChange={(e) => setEditFormData({ ...editFormData, blood_group: e.target.value })}
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">{t("abhaAddress")}</label>
                <input
                  type="text"
                  value={editFormData.abha_id}
                  onChange={(e) => setEditFormData({ ...editFormData, abha_id: e.target.value })}
                  className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>

              {editingMember !== "self" && (
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Clinical Notes</label>
                  <textarea
                    rows={2}
                    value={editFormData.notes}
                    onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 rounded-xl bg-muted text-xs font-bold text-foreground hover:bg-muted/80"
                >
                  {t("cancelBtn")}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:opacity-95 shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card rounded-2xl border border-red-200 max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-foreground text-base">Remove Family Member?</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                This will delete this family profile and unbind any assigned prescriptions and lab records.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-muted text-xs font-bold text-foreground hover:bg-muted/80"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs font-bold hover:opacity-95"
              >
                Yes, Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Sudden Illness / Health Condition Modal */}
      {conditionModalMemberId !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card rounded-2xl border border-border max-w-md w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div>
                <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" /> Log Sudden Illness / Condition
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Record sudden symptoms, acute attacks, or newly diagnosed diseases.
                </p>
              </div>
              <button
                onClick={() => setConditionModalMemberId(null)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCondition} className="space-y-3.5">
              {/* Quick Select Presets */}
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-1">
                  Quick Select Common Diseases:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Viral Fever / Influenza",
                    "Dengue Fever",
                    "COVID-19",
                    "Acute Gastroenteritis",
                    "Hypertension",
                    "Type 2 Diabetes",
                    "Asthma Attack",
                    "Hypothyroidism",
                    "Kidney Stones",
                    "Migraine",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() =>
                        setConditionForm({
                          ...conditionForm,
                          name: preset,
                          type:
                            preset.includes("Fever") ||
                            preset.includes("Dengue") ||
                            preset.includes("COVID") ||
                            preset.includes("Gastro") ||
                            preset.includes("Attack") ||
                            preset.includes("Stones")
                              ? "acute_sudden"
                              : "chronic",
                        })
                      }
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all ${
                        conditionForm.name === preset
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/50 border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">Condition / Illness Name</label>
                <input
                  type="text"
                  required
                  value={conditionForm.name}
                  onChange={(e) => setConditionForm({ ...conditionForm, name: e.target.value })}
                  placeholder="e.g. Dengue Fever with Platelet Drop"
                  className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Illness Type</label>
                  <select
                    value={conditionForm.type}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      setConditionForm({ ...conditionForm, type: e.target.value as any })
                    }
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="acute_sudden">Sudden / Acute Attack</option>
                    <option value="chronic">Chronic Condition</option>
                    <option value="allergy">Allergy / Reaction</option>
                    <option value="other">Other Encounter</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Severity Level</label>
                  <select
                    value={conditionForm.severity}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      setConditionForm({ ...conditionForm, severity: e.target.value as any })
                    }
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe / Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Onset / Diagnosis Date</label>
                  <input
                    type="date"
                    required
                    value={conditionForm.diagnosed_date}
                    onChange={(e) => setConditionForm({ ...conditionForm, diagnosed_date: e.target.value })}
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Current Status</label>
                  <select
                    value={conditionForm.status}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      setConditionForm({ ...conditionForm, status: e.target.value as any })
                    }
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="active">Active (Current Flare)</option>
                    <option value="under_treatment">Under Treatment</option>
                    <option value="managed">Managed / Controlled</option>
                    <option value="resolved">Resolved / Recovered</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Symptoms, Prescribed Medications &amp; Doctor Advice
                </label>
                <textarea
                  rows={2}
                  value={conditionForm.notes}
                  onChange={(e) => setConditionForm({ ...conditionForm, notes: e.target.value })}
                  placeholder="e.g. High fever 102F, body ache, platelet count monitored, prescribed paracetamol..."
                  className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setConditionModalMemberId(null)}
                  className="px-4 py-2 rounded-xl bg-muted text-xs font-bold text-foreground hover:bg-muted/80"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:opacity-95 shadow-sm"
                >
                  Add to Clinical Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
