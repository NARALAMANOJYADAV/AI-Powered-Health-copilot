"use client";

import React, { useState } from "react";
import {
  OCRWord,
  DocumentExtraction,
  ExtractedLabResult,
  ExtractedMedicine,
} from "@/lib/types";
import {
  CheckCircle2,
  AlertTriangle,
  Edit2,
  Trash2,
  Plus,
  ShieldCheck,
  Eye,
  FileCheck,
  Calendar,
  User,
  Building,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";

interface VerificationProps {
  imageUrl: string;
  fileKey: string;
  fileName: string;
  words: OCRWord[];
  extraction: DocumentExtraction;
  onSaveConfirmed: (verifiedExtraction: DocumentExtraction) => Promise<void>;
  onCancel: () => void;
}

export function VerificationCanvas({
  imageUrl,
  fileKey,
  fileName,
  words,
  extraction,
  onSaveConfirmed,
  onCancel,
}: VerificationProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"labs" | "meds">("labs");
  const [labs, setLabs] = useState<ExtractedLabResult[]>(extraction.lab_results || []);
  const [meds, setMeds] = useState<ExtractedMedicine[]>(extraction.medicines || []);
  const [docMetadata, setDocMetadata] = useState(extraction.document_metadata);
  const [selectedWordIds, setSelectedWordIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Focus bounding box on click
  const highlightSourceWords = (wordIds: string[] = []) => {
    setSelectedWordIds(wordIds);
  };

  const handleUpdateLab = (index: number, field: keyof ExtractedLabResult, val: unknown) => {
    const updated = [...labs];
    updated[index] = { ...updated[index], [field]: val, confidence: 1.0 }; // marked verified
    setLabs(updated);
  };

  const handleDeleteLab = (index: number) => {
    setLabs(labs.filter((_, i) => i !== index));
  };

  const handleAddLab = () => {
    setLabs([
      ...labs,
      {
        test: "New Test",
        value: 0,
        unit: "mg/dL",
        reference_range: "Normal",
        loinc_code: null,
        confidence: 1.0,
        source_word_ids: [],
      },
    ]);
  };

  const handleUpdateMed = (index: number, field: keyof ExtractedMedicine, val: unknown) => {
    const updated = [...meds];
    updated[index] = { ...updated[index], [field]: val, confidence: 1.0 };
    setMeds(updated);
  };

  const handleDeleteMed = (index: number) => {
    setMeds(meds.filter((_, i) => i !== index));
  };

  const handleAddMed = () => {
    setMeds([
      ...meds,
      {
        name: "New Medicine",
        generic: "",
        strength: "",
        frequency: "1-0-1",
        timing: "After meals",
        duration: "30 days",
        instructions: "",
        confidence: 1.0,
        source_word_ids: [],
      },
    ]);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const verifiedExtraction: DocumentExtraction = {
        unreadable: false,
        document_metadata: docMetadata,
        lab_results: labs,
        medicines: meds,
        diagnoses: extraction.diagnoses || [],
      };
      await onSaveConfirmed(verifiedExtraction);
    } catch (err) {
      console.error("Save confirmed failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Count items with low confidence
  const lowConfidenceCount =
    labs.filter((l) => l.confidence < 0.8).length +
    meds.filter((m) => m.confidence < 0.8).length +
    (docMetadata.confidence < 0.8 ? 1 : 0);

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Top Banner */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              {t("stepVerification")}
            </span>
            {lowConfidenceCount > 0 ? (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> {lowConfidenceCount} {t("fieldsRequireReview")}
              </span>
            ) : (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {t("allFieldsHighConfidence")}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-extrabold text-foreground mt-1 tracking-tight">
            {t("verifyFindingsTitle")}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("verifyFindingsDesc")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-muted border border-border text-foreground text-xs font-bold hover:bg-muted/80 transition-colors"
          >
            {t("cancelBtn")}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 hover:opacity-95 transition-opacity flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              t("savingToInsforge")
            ) : (
              <>
                <FileCheck className="w-4 h-4" /> {t("confirmSaveBtn")}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Split View: Document Canvas + Extracted Fields Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Document Canvas (5 Cols) */}
        <div className="lg:col-span-5 bg-card rounded-2xl border border-border p-4 shadow-card sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-primary" /> {t("originalDoc")}
            </span>
            <span className="text-[11px] text-muted-foreground truncate max-w-[180px]">{fileName}</span>
          </div>

          <div className="relative mt-3 rounded-xl overflow-hidden border border-border bg-muted/20 aspect-[3/4] flex items-center justify-center">
            {/* Document Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Uploaded Report" className="w-full h-full object-contain" />

            {/* Bounding Box Overlays */}
            {words.map((w) => {
              const isSelected = selectedWordIds.includes(w.id);
              // Normalized percentage bbox relative to standard 1200x1600 canvas
              const top = (w.bbox.y0 / 1600) * 100;
              const left = (w.bbox.x0 / 1200) * 100;
              const width = ((w.bbox.x1 - w.bbox.x0) / 1200) * 100;
              const height = ((w.bbox.y1 - w.bbox.y0) / 1600) * 100;

              return (
                <div
                  key={w.id}
                  onClick={() => setSelectedWordIds([w.id])}
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    width: `${Math.max(width, 2)}%`,
                    height: `${Math.max(height, 1.5)}%`,
                  }}
                  className={`absolute rounded transition-all cursor-pointer ${
                    isSelected
                      ? "highlight-pulse bg-blue-500/30 border-2 border-blue-600"
                      : "border border-primary/20 hover:border-primary hover:bg-primary/10"
                  }`}
                  title={`${w.text} (Conf: ${Math.round(w.confidence * 100)}%)`}
                />
              );
            })}
          </div>

          <p className="text-[11px] text-muted-foreground text-center mt-3">
            {t("docEvidenceTapHint")}
          </p>
        </div>

        {/* Right Column: Editable Findings Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Document Header Metadata */}
          <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary" /> {t("docDetails")}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {t("reportDate")}
                </label>
                <input
                  type="date"
                  value={docMetadata.report_date || ""}
                  onChange={(e) => setDocMetadata({ ...docMetadata, report_date: e.target.value })}
                  className="mt-1 w-full text-xs font-semibold rounded-lg bg-muted border border-border p-2 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <User className="w-3 h-3" /> {t("doctorName")}
                </label>
                <input
                  type="text"
                  value={docMetadata.doctor_name || ""}
                  onChange={(e) => setDocMetadata({ ...docMetadata, doctor_name: e.target.value })}
                  className="mt-1 w-full text-xs font-semibold rounded-lg bg-muted border border-border p-2 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <Building className="w-3 h-3" /> {t("clinicLab")}
                </label>
                <input
                  type="text"
                  value={docMetadata.clinic_hospital || ""}
                  onChange={(e) => setDocMetadata({ ...docMetadata, clinic_hospital: e.target.value })}
                  className="mt-1 w-full text-xs font-semibold rounded-lg bg-muted border border-border p-2 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <button
              onClick={() => setActiveTab("labs")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === "labs"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("labResultsCount")} ({labs.length})
            </button>
            <button
              onClick={() => setActiveTab("meds")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === "meds"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("medsCount")} ({meds.length})
            </button>
          </div>

          {/* TAB 1: LAB RESULTS */}
          {activeTab === "labs" && (
            <div className="space-y-3">
              {labs.map((lab, idx) => {
                const isLowConfidence = lab.confidence < 0.8;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => highlightSourceWords(lab.source_word_ids)}
                    className={`bg-card rounded-xl border p-4 shadow-sm transition-all hover:border-primary/50 ${
                      isLowConfidence ? "border-amber-300 bg-amber-50/15" : "border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={lab.test}
                          onChange={(e) => handleUpdateLab(idx, "test", e.target.value)}
                          className="font-bold text-sm text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none flex-1"
                        />
                        {isLowConfidence && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1 whitespace-nowrap">
                            <AlertTriangle className="w-3 h-3" /> {t("pleaseVerify")}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteLab(idx)}
                        className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                        title="Remove result"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] font-semibold text-muted-foreground">{t("testValue")}</label>
                        <input
                          type="number"
                          step="any"
                          value={lab.value}
                          onChange={(e) => handleUpdateLab(idx, "value", parseFloat(e.target.value) || 0)}
                          className="w-full text-xs font-bold rounded-lg bg-muted border border-border p-2 text-foreground focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-muted-foreground">{t("testUnit")}</label>
                        <input
                          type="text"
                          value={lab.unit}
                          onChange={(e) => handleUpdateLab(idx, "unit", e.target.value)}
                          className="w-full text-xs font-semibold rounded-lg bg-muted border border-border p-2 text-foreground focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-muted-foreground">{t("normalTarget")}</label>
                        <input
                          type="text"
                          value={lab.reference_range}
                          onChange={(e) => handleUpdateLab(idx, "reference_range", e.target.value)}
                          className="w-full text-xs font-semibold rounded-lg bg-muted border border-border p-2 text-foreground focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={handleAddLab}
                className="w-full py-3 rounded-xl border border-dashed border-border text-xs font-bold text-muted-foreground hover:text-primary hover:border-primary/50 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" /> {t("addMissingLab")}
              </button>
            </div>
          )}

          {/* TAB 2: MEDICATIONS */}
          {activeTab === "meds" && (
            <div className="space-y-3">
              {meds.map((med, idx) => {
                const isLowConfidence = med.confidence < 0.8;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => highlightSourceWords(med.source_word_ids)}
                    className={`bg-card rounded-xl border p-4 shadow-sm transition-all hover:border-primary/50 ${
                      isLowConfidence ? "border-amber-300 bg-amber-50/15" : "border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={med.name}
                          onChange={(e) => handleUpdateMed(idx, "name", e.target.value)}
                          className="font-bold text-sm text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none flex-1"
                        />
                        {isLowConfidence && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1 whitespace-nowrap">
                            <AlertTriangle className="w-3 h-3" /> {t("pleaseVerify")}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteMed(idx)}
                        className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                        title="Remove medicine"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] font-semibold text-muted-foreground">{t("medFrequency")}</label>
                        <input
                          type="text"
                          value={med.frequency || ""}
                          onChange={(e) => handleUpdateMed(idx, "frequency", e.target.value)}
                          className="w-full text-xs font-semibold rounded-lg bg-muted border border-border p-2 text-foreground focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-muted-foreground">{t("medTiming")}</label>
                        <input
                          type="text"
                          value={med.timing || ""}
                          onChange={(e) => handleUpdateMed(idx, "timing", e.target.value)}
                          className="w-full text-xs font-semibold rounded-lg bg-muted border border-border p-2 text-foreground focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-muted-foreground">{t("medDuration")}</label>
                        <input
                          type="text"
                          value={med.duration || ""}
                          onChange={(e) => handleUpdateMed(idx, "duration", e.target.value)}
                          className="w-full text-xs font-semibold rounded-lg bg-muted border border-border p-2 text-foreground focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={handleAddMed}
                className="w-full py-3 rounded-xl border border-dashed border-border text-xs font-bold text-muted-foreground hover:text-primary hover:border-primary/50 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" /> {t("addMissingMed")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
