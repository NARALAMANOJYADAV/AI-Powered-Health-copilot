"use client";

import React, { useState, useEffect } from "react";
import {
  OCRWord,
  DocumentExtraction,
  SupportedLanguage,
  DocumentExplanation,
  EvaluatedBiomarker,
  DrugSafetyAlert,
} from "@/lib/types";
import { evaluateLabResult } from "@/lib/rules-engine";
import { evaluateMedicineSafety } from "@/lib/safety-engine";
import { invokeExplainFunction } from "@/lib/insforge";
import { useCareLensStore } from "@/lib/store";
import {
  Volume2,
  VolumeX,
  Languages,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ShieldAlert,
  FileBadge2,
  Calendar,
  Share2,
  ArrowLeft,
  Eye,
} from "lucide-react";

interface ReportDetailProps {
  imageUrl: string;
  fileName: string;
  words: OCRWord[];
  extraction: DocumentExtraction;
  onBack: () => void;
  onNavigateToSchedule?: () => void;
  onNavigateToBrief?: () => void;
}

export function ReportDetailView({
  imageUrl,
  fileName,
  words,
  extraction,
  onBack,
  onNavigateToSchedule,
  onNavigateToBrief,
}: ReportDetailProps) {
  const { language: initialLang, familyMembers, activeFamilyMemberId } = useCareLensStore();

  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(initialLang || "en");
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
  const [highlightedWordIds, setHighlightedWordIds] = useState<string[]>([]);
  const [explanation, setExplanation] = useState<DocumentExplanation | null>(null);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const activeMember = familyMembers.find((m) => m.id === activeFamilyMemberId);
  const patientName = activeMember ? activeMember.name : "Rajesh Kumar";
  const patientGender = activeMember?.gender || "male";

  // 1. Run Pure TypeScript Rules Engine
  const evaluatedLabs: EvaluatedBiomarker[] = (extraction.lab_results || []).map((l) =>
    evaluateLabResult(l, { gender: patientGender })
  );

  // 2. Run Pure TypeScript Medicine Safety Engine
  const safetyAlerts: DrugSafetyAlert[] = evaluateMedicineSafety(extraction.medicines || []);

  // Fetch or re-generate explanation when language changes
  useEffect(() => {
    async function fetchExplanation() {
      setIsLoadingExplanation(true);
      try {
        const rulesOutput = {
          flags: evaluatedLabs.map((l) => ({
            test_name: l.test,
            test_key: l.test_key,
            value: l.value,
            unit: l.unit,
            status: l.status,
            reference_range: l.reference_range,
            source_word_ids: l.source_word_ids,
          })),
          interactions: safetyAlerts.map((a) => ({
            drug_a: a.drug_a,
            drug_b: a.drug_b,
            severity: a.severity,
            effect: a.effect,
            clinical_rationale: a.clinical_rationale,
          })),
        };

        const res = await invokeExplainFunction({
          rules_output: rulesOutput,
          language: currentLang,
          patient_name: patientName,
        });

        setExplanation(res);
      } catch (err) {
        console.error("Failed to generate explanation:", err);
      } finally {
        setIsLoadingExplanation(false);
      }
    }

    fetchExplanation();
  }, [currentLang, patientName]);

  // Click-to-source highlight handler
  const handleSentenceClick = (sentenceId: string, sourceWordIds: string[] = []) => {
    setActiveSentenceId(sentenceId);
    setHighlightedWordIds(sourceWordIds);
  };

  // Web Speech API Text-to-Speech
  const handleToggleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!explanation) return;

    const fullText = explanation.sentences.map((s) => s.text).join(" ");
    const utterance = new SpeechSynthesisUtterance(fullText);

    // Set regional voice if available
    const langCodeMap: Record<SupportedLanguage, string> = {
      en: "en-IN",
      te: "te-IN",
      hi: "hi-IN",
      ta: "ta-IN",
    };
    utterance.lang = langCodeMap[currentLang] || "en-IN";
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Top Controls */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-muted border border-border hover:bg-muted/80 text-foreground transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Document
              </span>
              <span className="text-xs text-muted-foreground">{extraction.document_metadata.report_date}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-foreground mt-0.5 tracking-tight">
              Clinical Findings &amp; Plain Summary
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onNavigateToSchedule && (
            <button
              onClick={onNavigateToSchedule}
              className="px-3.5 py-2 rounded-xl bg-muted border border-border text-foreground font-semibold text-xs hover:bg-muted/80 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-primary" /> Daily Schedule
            </button>
          )}
          {onNavigateToBrief && (
            <button
              onClick={onNavigateToBrief}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-md shadow-primary/20 hover:opacity-95 transition-opacity flex items-center gap-1.5"
            >
              <FileBadge2 className="w-3.5 h-3.5" /> Doctor Visit Brief
            </button>
          )}
        </div>
      </div>

      {/* Main Split: Left Document View / Right Plain Explanation & Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Document with Pulse Highlights (5 Cols) */}
        <div className="lg:col-span-5 bg-card rounded-2xl border border-border p-4 shadow-card sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-primary" /> Document Evidence
            </span>
            <span className="text-[11px] text-muted-foreground truncate max-w-[180px]">{fileName}</span>
          </div>

          <div className="relative mt-3 rounded-xl overflow-hidden border border-border bg-muted/20 aspect-[3/4] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Document View" className="w-full h-full object-contain" />

            {/* Visual Word Tokens */}
            {words.map((w) => {
              const isHighlight = highlightedWordIds.includes(w.id);
              const top = (w.bbox.y0 / 1600) * 100;
              const left = (w.bbox.x0 / 1200) * 100;
              const width = ((w.bbox.x1 - w.bbox.x0) / 1200) * 100;
              const height = ((w.bbox.y1 - w.bbox.y0) / 1600) * 100;

              return (
                <div
                  key={w.id}
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    width: `${Math.max(width, 2)}%`,
                    height: `${Math.max(height, 1.5)}%`,
                  }}
                  className={`absolute rounded transition-all ${
                    isHighlight
                      ? "highlight-pulse bg-blue-600/35 border-2 border-blue-600"
                      : "border border-transparent"
                  }`}
                />
              );
            })}
          </div>

          <p className="text-[11px] text-muted-foreground text-center mt-3">
            Click any sentence on the right to pulse its exact source token here.
          </p>
        </div>

        {/* Right: Plain Language Summary + Rules Engine Badges (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card A: Plain Language Summary (Class-8 level) */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Plain-Language Summary</h3>
                  <p className="text-[11px] text-muted-foreground">Reading Level: Class 8 (Easy to Understand)</p>
                </div>
              </div>

              {/* Language Switcher & Voice Audio */}
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-lg bg-muted p-1 border border-border">
                  {[
                    { code: "en", label: "EN" },
                    { code: "te", label: "తెలుగు" },
                    { code: "hi", label: "हिन्दी" },
                    { code: "ta", label: "தமிழ்" },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setCurrentLang(l.code as SupportedLanguage)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                        currentLang === l.code ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleToggleSpeak}
                  className={`p-2 rounded-lg border transition-colors ${
                    isSpeaking
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted border-border text-foreground hover:bg-muted/80"
                  }`}
                  title={isSpeaking ? "Stop Voice" : "Read Aloud (Voice)"}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-primary" />}
                </button>
              </div>
            </div>

            {/* Sentence Blocks (Click-to-Source) */}
            {isLoadingExplanation ? (
              <div className="py-8 text-center text-xs text-muted-foreground animate-pulse">
                Generating plain language medical summary in chosen language...
              </div>
            ) : (
              <div className="space-y-2.5">
                {explanation?.sentences.map((sent) => {
                  const isActive = activeSentenceId === sent.id;
                  return (
                    <div
                      key={sent.id}
                      onClick={() => handleSentenceClick(sent.id, sent.source_word_ids)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer text-sm leading-relaxed ${
                        isActive
                          ? "bg-blue-50/70 border-blue-400 shadow-sm text-blue-950 font-medium"
                          : "bg-muted/30 border-border hover:bg-muted/60 text-foreground"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex-1">{sent.text}</span>
                        {sent.source_field !== "header" && sent.source_field !== "disclaimer" && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-muted border border-border text-primary whitespace-nowrap">
                            Source: {sent.source_field}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Medical Disclaimer */}
            <div className="p-3 rounded-xl bg-muted/60 border border-border text-[11px] text-muted-foreground leading-relaxed">
              <strong>Medical Disclaimer:</strong> CareLens provides clinical explanations for educational literacy only and does not diagnose, prescribe, or adjust medication dosages. Always consult your qualified healthcare provider.
            </div>
          </div>

          {/* Card B: Rules Engine Lab Results Evaluation */}
          {evaluatedLabs.length > 0 && (
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <h3 className="text-base font-bold text-foreground">Rules Engine Biomarker Evaluation</h3>
                <span className="text-xs font-semibold text-muted-foreground">Age &amp; Sex Adjusted</span>
              </div>

              <div className="space-y-2.5">
                {evaluatedLabs.map((lab, idx) => {
                  const isHigh = lab.status.includes("high");
                  const isLow = lab.status.includes("low");
                  const isBorderline = lab.status === "borderline";
                  const isNormal = lab.status === "normal";

                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-muted/20 transition-colors"
                    >
                      <div>
                        <div className="font-bold text-sm text-foreground">{lab.test}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Standard Target: {lab.reference_range} {lab.loinc_code ? `(LOINC: ${lab.loinc_code})` : ""}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-base font-extrabold text-foreground">
                          {lab.value} <span className="text-xs font-semibold text-muted-foreground">{lab.unit}</span>
                        </div>

                        {/* Status Chip always paired with Icon and Label (never color alone) */}
                        <div
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            isHigh
                              ? "bg-red-100 text-red-800"
                              : isLow
                              ? "bg-blue-100 text-blue-800"
                              : isBorderline
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isHigh && <ArrowUp className="w-3.5 h-3.5" />}
                          {isLow && <ArrowDown className="w-3.5 h-3.5" />}
                          {isBorderline && <AlertTriangle className="w-3.5 h-3.5" />}
                          {isNormal && <CheckCircle2 className="w-3.5 h-3.5" />}
                          <span>{lab.statusLabel}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Card C: Medicine Safety & Interactions */}
          {safetyAlerts.length > 0 && (
            <div className="bg-card rounded-2xl border border-amber-300 p-6 shadow-card space-y-4 bg-gradient-to-br from-card via-amber-50/20 to-card">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <ShieldAlert className="w-5 h-5 text-amber-700" />
                <h3 className="text-base font-bold text-foreground">Medicine Safety Engine Findings</h3>
              </div>

              <div className="space-y-3">
                {safetyAlerts.map((alert, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 space-y-2">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-sm text-amber-900">{alert.title}</span>
                      <span className="uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px]">
                        {alert.severity}
                      </span>
                    </div>

                    <p className="leading-relaxed text-amber-900/90 font-medium">{alert.effect}</p>
                    <p className="text-[11px] text-amber-800 leading-relaxed">{alert.clinicalRationale}</p>

                    <div className="pt-2 border-t border-amber-200/80 font-bold text-amber-950 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      <span>{alert.action_recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
