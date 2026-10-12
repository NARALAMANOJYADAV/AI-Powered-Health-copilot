import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  ThemeMode,
  AccessibilityMode,
  SupportedLanguage,
  UserProfile,
  FamilyMember,
  HealthCondition,
  DocumentRecord,
} from "./types";

export const DEFAULT_USER: UserProfile = {
  id: "usr_rajesh_demo",
  email: "rajesh.kumar@example.com",
  full_name: "Rajesh Kumar",
  phone: "+91 98490 12345",
  date_of_birth: "1974-06-15",
  gender: "male",
  blood_group: "B+",
  abha_id: "91-4521-8923-1045@abdm",
  theme: "daylight",
  language: "en",
  accessibility_mode: "standard",
  role: "admin",
  conditions: [
    {
      id: "cond-self-1",
      name: "Type 2 Diabetes Mellitus",
      type: "chronic",
      diagnosed_date: "2022-06-15",
      severity: "moderate",
      status: "active",
      notes: "Recent HbA1c elevated at 8.1%. Prescribed Glycomet 500mg.",
    },
    {
      id: "cond-self-2",
      name: "Hyperlipidemia",
      type: "chronic",
      diagnosed_date: "2025-10-14",
      severity: "mild",
      status: "under_treatment",
      notes: "Storvas 10mg started at bedtime.",
    },
  ],
};

export const DEFAULT_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: "fam-mother",
    user_id: "demo-user",
    name: "Sunita Devi",
    relationship: "Mother",
    date_of_birth: "1952-04-12",
    gender: "female",
    blood_group: "B+",
    abha_id: "91-8842-1923-4411@abdm",
    notes: "History of hypertension and early-stage knee osteoarthritis.",
    conditions: [
      {
        id: "cond-m-1",
        name: "Hypertension",
        type: "chronic",
        diagnosed_date: "2018-05-10",
        severity: "moderate",
        status: "under_treatment",
        notes: "Taking Telmisartan 40mg daily morning.",
      },
      {
        id: "cond-m-2",
        name: "Osteoarthritis (Knee)",
        type: "chronic",
        diagnosed_date: "2021-09-15",
        severity: "mild",
        status: "active",
        notes: "Daily gentle walks and calcium supplements.",
      },
    ],
    created_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "fam-spouse",
    user_id: "demo-user",
    name: "Meena Kumar",
    relationship: "Spouse",
    date_of_birth: "1977-08-25",
    gender: "female",
    blood_group: "O+",
    abha_id: "91-3321-4921-9988@abdm",
    notes: "Hypothyroidism under Thyronorm management.",
    conditions: [
      {
        id: "cond-s-1",
        name: "Hypothyroidism",
        type: "chronic",
        diagnosed_date: "2019-11-20",
        severity: "mild",
        status: "managed",
        notes: "Thyronorm 50mcg empty stomach daily.",
      },
    ],
    created_at: "2026-02-14T00:00:00Z",
  },
  {
    id: "fam-child",
    user_id: "demo-user",
    name: "Aarav Kumar",
    relationship: "Child",
    date_of_birth: "2008-10-05",
    gender: "male",
    blood_group: "A+",
    abha_id: "91-1123-5599-2341@abdm",
    notes: "Seasonal allergic rhinitis / dust allergy.",
    conditions: [
      {
        id: "cond-c-1",
        name: "Seasonal Allergic Rhinitis",
        type: "allergy",
        diagnosed_date: "2024-03-01",
        severity: "mild",
        status: "active",
        notes: "Avoid sudden cold beverages; Levocetirizine SOS.",
      },
    ],
    created_at: "2026-03-01T00:00:00Z",
  },
];

interface CareLensState {
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  familyMembers: FamilyMember[];
  activeFamilyMemberId: string | null; // null represents 'Self'
  theme: ThemeMode;
  language: SupportedLanguage;
  accessibility: AccessibilityMode;
  cachedDocuments: DocumentRecord[];
  activeDocument: DocumentRecord | null;
  selectedSentenceSource: {
    sentenceId?: string;
    sourceField?: string;
    sourceWordIds?: string[];
  } | null;

  // Actions
  setUser: (user: UserProfile | null) => void;
  setAuthModalOpen: (open: boolean) => void;
  setFamilyMembers: (members: FamilyMember[]) => void;
  addFamilyMember: (member: FamilyMember) => void;
  updateFamilyMember: (id: string, updates: Partial<FamilyMember>) => void;
  deleteFamilyMember: (id: string) => void;
  addConditionToMember: (memberId: string | null, condition: HealthCondition) => void;
  removeConditionFromMember: (memberId: string | null, conditionId: string) => void;
  updateConditionForMember: (
    memberId: string | null,
    conditionId: string,
    updates: Partial<HealthCondition>
  ) => void;
  setActiveFamilyMemberId: (id: string | null) => void;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (lang: SupportedLanguage) => void;
  setAccessibility: (mode: AccessibilityMode) => void;
  setCachedDocuments: (docs: DocumentRecord[]) => void;
  addCachedDocument: (doc: DocumentRecord) => void;
  setActiveDocument: (doc: DocumentRecord | null) => void;
  setSelectedSentenceSource: (source: CareLensState["selectedSentenceSource"]) => void;
}

export const useCareLensStore = create<CareLensState>()(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      isAuthModalOpen: false,
      familyMembers: DEFAULT_FAMILY_MEMBERS,
      activeFamilyMemberId: null,
      theme: "daylight",
      language: "en",
      accessibility: "standard",
      cachedDocuments: [],
      activeDocument: null,
      selectedSentenceSource: null,

      setUser: (user) => set({ user }),
      setAuthModalOpen: (isAuthModalOpen) => set({ isAuthModalOpen }),
      setFamilyMembers: (familyMembers) => set({ familyMembers }),
      addFamilyMember: (member) =>
        set((state) => ({ familyMembers: [...state.familyMembers, member] })),
      updateFamilyMember: (id, updates) =>
        set((state) => ({
          familyMembers: state.familyMembers.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        })),
      deleteFamilyMember: (id) =>
        set((state) => ({
          familyMembers: state.familyMembers.filter((m) => m.id !== id),
          activeFamilyMemberId:
            state.activeFamilyMemberId === id ? null : state.activeFamilyMemberId,
        })),

      addConditionToMember: (memberId, condition) =>
        set((state) => {
          if (memberId === null) {
            // Add to User
            if (!state.user) return state;
            const existing = state.user.conditions || [];
            return {
              user: {
                ...state.user,
                conditions: [condition, ...existing.filter((c) => c.id !== condition.id)],
              },
            };
          }
          // Add to Family Member
          return {
            familyMembers: state.familyMembers.map((m) => {
              if (m.id !== memberId) return m;
              const existing = m.conditions || [];
              return {
                ...m,
                conditions: [condition, ...existing.filter((c) => c.id !== condition.id)],
              };
            }),
          };
        }),

      removeConditionFromMember: (memberId, conditionId) =>
        set((state) => {
          if (memberId === null) {
            if (!state.user) return state;
            return {
              user: {
                ...state.user,
                conditions: (state.user.conditions || []).filter((c) => c.id !== conditionId),
              },
            };
          }
          return {
            familyMembers: state.familyMembers.map((m) => {
              if (m.id !== memberId) return m;
              return {
                ...m,
                conditions: (m.conditions || []).filter((c) => c.id !== conditionId),
              };
            }),
          };
        }),

      updateConditionForMember: (memberId, conditionId, updates) =>
        set((state) => {
          if (memberId === null) {
            if (!state.user) return state;
            return {
              user: {
                ...state.user,
                conditions: (state.user.conditions || []).map((c) =>
                  c.id === conditionId ? { ...c, ...updates } : c
                ),
              },
            };
          }
          return {
            familyMembers: state.familyMembers.map((m) => {
              if (m.id !== memberId) return m;
              return {
                ...m,
                conditions: (m.conditions || []).map((c) =>
                  c.id === conditionId ? { ...c, ...updates } : c
                ),
              };
            }),
          };
        }),

      setActiveFamilyMemberId: (activeFamilyMemberId) =>
        set({ activeFamilyMemberId }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setAccessibility: (accessibility) => set({ accessibility }),
      setCachedDocuments: (cachedDocuments) => set({ cachedDocuments }),
      addCachedDocument: (doc) =>
        set((state) => ({
          cachedDocuments: [doc, ...state.cachedDocuments.filter((d) => d.id !== doc.id)],
        })),
      setActiveDocument: (activeDocument) => set({ activeDocument }),
      setSelectedSentenceSource: (selectedSentenceSource) =>
        set({ selectedSentenceSource }),
    }),
    {
      name: "carelens-storage-v2",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      partialize: (state) => ({
        user: state.user,
        theme: state.theme,
        language: state.language,
        accessibility: state.accessibility,
        familyMembers: state.familyMembers,
        activeFamilyMemberId: state.activeFamilyMemberId,
        cachedDocuments: state.cachedDocuments.slice(0, 10),
      }),
    }
  )
);
