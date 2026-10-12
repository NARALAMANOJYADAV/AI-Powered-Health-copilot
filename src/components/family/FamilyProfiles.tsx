"use client";

import React, { useState } from "react";
import { useCareLensStore } from "@/lib/store";
import { FamilyMember } from "@/lib/types";
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
} from "lucide-react";

export function FamilyProfiles({ onSelectProfile }: { onSelectProfile?: () => void }) {
  const { familyMembers, addFamilyMember, activeFamilyMemberId, setActiveFamilyMemberId } = useCareLensStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relationship: "Parent",
    date_of_birth: "",
    gender: "male",
    blood_group: "O+",
    abha_id: "",
    notes: "",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newMember: FamilyMember = {
      id: `fam-${Date.now()}`,
      user_id: "demo-user",
      name: formData.name,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      relationship: formData.relationship as any,
      date_of_birth: formData.date_of_birth || "1960-01-01",
      gender: formData.gender as "male" | "female" | "other",
      blood_group: formData.blood_group,
      abha_id: formData.abha_id,
      notes: formData.notes,
      created_at: new Date().toISOString(),
    };

    addFamilyMember(newMember);
    setIsAddModalOpen(false);
    setFormData({
      name: "",
      relationship: "Parent",
      date_of_birth: "",
      gender: "male",
      blood_group: "O+",
      abha_id: "",
      notes: "",
    });
  };

  const defaultProfiles = [
    {
      id: null,
      name: "Rajesh Kumar",
      relationship: "Self",
      age: "52 Years",
      gender: "Male",
      blood: "O+",
      abha: "91-4521-8923-1045@abdm",
      reportsCount: 5,
    },
    ...familyMembers.map((m) => ({
      id: m.id,
      name: m.name,
      relationship: m.relationship,
      age: m.date_of_birth ? `${new Date().getFullYear() - new Date(m.date_of_birth).getFullYear()} Years` : "74 Years",
      gender: m.gender || "Female",
      blood: m.blood_group || "B+",
      abha: m.abha_id || "Not Linked",
      reportsCount: 2,
    })),
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-10">
      {/* Header */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" /> Family Profiles
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage separate health records, prescriptions, and lab trends for your family.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 hover:opacity-95 transition-opacity flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Add Family Member
        </button>
      </div>

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {defaultProfiles.map((p, idx) => {
          const isActive = activeFamilyMemberId === p.id;
          return (
            <div
              key={idx}
              onClick={() => {
                setActiveFamilyMemberId(p.id);
                if (onSelectProfile) onSelectProfile();
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-card flex flex-col justify-between ${
                isActive
                  ? "bg-primary/5 border-primary shadow-highlight"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border/80">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        isActive ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-foreground"
                      }`}
                    >
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground flex items-center gap-2">
                        <span>{p.name}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {p.relationship}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {p.age} &bull; {p.gender}
                      </div>
                    </div>
                  </div>

                  {isActive ? (
                    <span className="text-xs font-bold text-primary flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Active
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground font-semibold hover:text-primary">Switch</span>
                  )}
                </div>

                <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-muted/40 border border-border">
                    <span className="text-[10px] text-muted-foreground block">Blood Group</span>
                    <span className="font-bold text-foreground mt-0.5 flex items-center gap-1">
                      <Droplet className="w-3 h-3 text-red-500" /> {p.blood}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-muted/40 border border-border">
                    <span className="text-[10px] text-muted-foreground block">Stored Records</span>
                    <span className="font-bold text-foreground mt-0.5">{p.reportsCount} Documents</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono text-[11px] truncate max-w-[200px]">{p.abha}</span>
                <span className="text-primary font-bold flex items-center gap-1">
                  View Timeline <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-base font-extrabold text-foreground">Add Family Member Profile</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
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
                  <label className="text-xs font-semibold text-muted-foreground">Relationship</label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Blood Group</label>
                  <select
                    value={formData.blood_group}
                    onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                    className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">ABHA Address (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 91-4521-8923-1045@abdm"
                  value={formData.abha_id}
                  onChange={(e) => setFormData({ ...formData, abha_id: e.target.value })}
                  className="mt-1 w-full text-xs font-semibold rounded-xl bg-muted border border-border p-2.5 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-muted text-xs font-bold text-foreground hover:bg-muted/80"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:opacity-95 shadow-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
