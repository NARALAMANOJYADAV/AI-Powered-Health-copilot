import { z } from "zod";

// --- Theme & Accessibility ---
export type ThemeMode = "daylight" | "paper" | "sage" | "high-contrast";
export type AccessibilityMode = "standard" | "large-text" | "simple";
export type SupportedLanguage = "en" | "te" | "hi" | "ta";

// --- OCR Tokens & Bounding Boxes ---
export interface BoundingBox {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface OCRWord {
  id: string;
  text: string;
  bbox: BoundingBox;
  confidence: number;
}

// --- Zod Validation Schemas for Extracted Clinical Entities ---
export const ExtractedMetadataSchema = z.object({
  doc_type: z.enum(["lab_report", "prescription", "discharge_summary", "other"]).default("lab_report"),
  report_date: z.string().nullable().optional(),
  doctor_name: z.string().nullable().optional(),
  clinic_hospital: z.string().nullable().optional(),
  confidence: z.number().min(0).max(1).default(1),
  source_word_ids: z.array(z.string()).default([]),
});

export const ExtractedLabResultSchema = z.object({
  test: z.string().min(1, "Test name is required"),
  value: z.number(),
  unit: z.string().default(""),
  reference_range: z.string().default(""),
  loinc_code: z.string().nullable().optional(),
  confidence: z.number().min(0).max(1).default(1),
  source_word_ids: z.array(z.string()).default([]),
});

export const ExtractedMedicineSchema = z.object({
  name: z.string().min(1, "Medicine name is required"),
  generic: z.string().nullable().optional(),
  strength: z.string().nullable().optional(),
  frequency: z.string().nullable().optional(),
  timing: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  instructions: z.string().nullable().optional(),
  confidence: z.number().min(0).max(1).default(1),
  source_word_ids: z.array(z.string()).default([]),
});

export const ExtractedConditionSchema = z.object({
  condition: z.string().min(1, "Condition name is required"),
  status: z.enum(["active", "resolved", "suspected"]).default("active"),
  confidence: z.number().min(0).max(1).default(1),
  source_word_ids: z.array(z.string()).default([]),
});

export const DocumentExtractionSchema = z.object({
  unreadable: z.boolean().default(false),
  reason: z.string().optional(),
  document_metadata: ExtractedMetadataSchema,
  lab_results: z.array(ExtractedLabResultSchema).default([]),
  medicines: z.array(ExtractedMedicineSchema).default([]),
  diagnoses: z.array(ExtractedConditionSchema).default([]),
});

export type ExtractedMetadata = z.infer<typeof ExtractedMetadataSchema>;
export type ExtractedLabResult = z.infer<typeof ExtractedLabResultSchema>;
export type ExtractedMedicine = z.infer<typeof ExtractedMedicineSchema>;
export type ExtractedCondition = z.infer<typeof ExtractedConditionSchema>;
export type DocumentExtraction = z.infer<typeof DocumentExtractionSchema>;

// --- Clinical Status Flags ---
export type BiomarkerStatus = "normal" | "borderline" | "low" | "high" | "critical_low" | "critical_high";

export interface EvaluatedBiomarker extends ExtractedLabResult {
  id?: string;
  test_key: string;
  status: BiomarkerStatus;
  statusLabel: string;
  statusIcon: "check" | "alert-triangle" | "alert-octagon" | "arrow-up" | "arrow-down";
  reference_min?: number;
  reference_max?: number;
  critical_min?: number;
  critical_max?: number;
  requires_verification: boolean;
}

// --- Longitudinal Trend ---
export interface BiomarkerTrend {
  test_key: string;
  test_name: string;
  current_value: number;
  current_date: string;
  previous_value: number;
  previous_date: string;
  delta: number;
  percentage_change: number;
  direction: "increased" | "decreased" | "stable";
  clinical_impact: "improved" | "worsened" | "stable";
  unit: string;
}

// --- Drug Safety Check Types ---
export interface DrugSafetyAlert {
  type: "interaction" | "duplicate_therapy" | "high_dose_alert";
  drug_a: string;
  drug_b?: string;
  severity: "contraindicated" | "major" | "moderate" | "minor";
  title: string;
  effect: string;
  clinical_rationale: string;
  action_recommendation: string;
}

// --- Explanation Types ---
export interface ExplanationSentence {
  id: string;
  text: string;
  source_field: string;
  source_word_ids?: string[];
  severity: "normal" | "attention" | "critical";
}

export interface DocumentExplanation {
  language: SupportedLanguage;
  reading_level: string;
  sentences: ExplanationSentence[];
  total_abnormal: number;
  has_critical: boolean;
  disclaimer: string;
}

// --- Health Conditions & Diagnoses ---
export interface HealthCondition {
  id: string;
  name: string;
  type: "chronic" | "acute_sudden" | "allergy" | "other";
  diagnosed_date?: string;
  severity: "mild" | "moderate" | "severe";
  status: "active" | "under_treatment" | "managed" | "resolved";
  notes?: string;
}

// --- Database Entity Models ---
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  date_of_birth?: string;
  gender?: "male" | "female" | "other";
  blood_group?: string;
  abha_id?: string;
  theme?: ThemeMode;
  language?: SupportedLanguage;
  accessibility_mode?: AccessibilityMode;
  role?: "patient" | "admin" | "caregiver";
  conditions?: HealthCondition[];
}

export interface FamilyMember {
  id: string;
  user_id: string;
  name: string;
  relationship: "Self" | "Father" | "Mother" | "Spouse" | "Child" | "Other";
  date_of_birth?: string;
  gender?: "male" | "female" | "other";
  blood_group?: string;
  abha_id?: string;
  notes?: string;
  conditions?: HealthCondition[];
  created_at?: string;
}

export interface DocumentRecord {
  id: string;
  user_id: string;
  family_member_id?: string | null;
  title: string;
  file_url: string;
  file_key: string;
  file_type?: string;
  file_size?: number;
  doc_type: "lab_report" | "prescription" | "discharge_summary" | "other";
  report_date: string;
  doctor_name?: string;
  clinic_hospital?: string;
  ocr_raw_text?: string;
  ocr_words?: OCRWord[];
  ocr_confidence?: number;
  status: "uploaded" | "processing" | "verified" | "archived";
  created_at: string;
}

export interface LabResultRecord {
  id: string;
  document_id?: string;
  user_id: string;
  family_member_id?: string | null;
  test_name: string;
  normalized_test_name?: string;
  test_category?: string;
  value: number;
  unit: string;
  reference_range?: string;
  loinc_code?: string;
  flag: BiomarkerStatus;
  test_date: string;
  confidence: number;
  source_word_ids?: string[];
  fhir_json?: Record<string, unknown>;
  created_at?: string;
}

export interface MedicationRecord {
  id: string;
  document_id?: string;
  user_id: string;
  family_member_id?: string | null;
  name: string;
  generic_name?: string;
  strength?: string;
  frequency?: string;
  timing?: string;
  duration?: string;
  instructions?: string;
  start_date?: string;
  end_date?: string;
  is_active: boolean;
  confidence: number;
  source_word_ids?: string[];
  fhir_json?: Record<string, unknown>;
  created_at?: string;
}

export interface TimelineEvent {
  id: string;
  user_id: string;
  family_member_id?: string | null;
  document_id?: string | null;
  event_type: "lab_report" | "prescription" | "doctor_visit" | "discharge";
  title: string;
  summary: string;
  event_date: string;
  severity: "normal" | "attention" | "critical";
  delta_summary?: string;
  details?: Record<string, unknown>;
  created_at?: string;
}

export interface ShareLink {
  id: string;
  user_id: string;
  token: string;
  title: string;
  content: {
    patient_name: string;
    generated_at: string;
    active_medications: Array<{ name: string; generic?: string; strength?: string; frequency?: string }>;
    abnormal_biomarkers: Array<{ test: string; value: number; unit: string; flag: string }>;
    suggested_questions: string[];
    allergies: string[];
  };
  expires_at: string;
  is_revoked: boolean;
  view_count: number;
}
