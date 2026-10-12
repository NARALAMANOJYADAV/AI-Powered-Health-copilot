import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  ThemeMode,
  AccessibilityMode,
  SupportedLanguage,
  UserProfile,
  FamilyMember,
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
};

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
      familyMembers: [],
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
      name: "carelens-storage",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: (state) => ({
        user: state.user,
        theme: state.theme,
        language: state.language,
        accessibility: state.accessibility,
        activeFamilyMemberId: state.activeFamilyMemberId,
        cachedDocuments: state.cachedDocuments.slice(0, 10), // cache last 10 for offline PWA
      }),
    }
  )
);
