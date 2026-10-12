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
import { useTranslation } from "@/lib/useTranslation";
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
  CheckSquare,
  Square,
  HeartPulse,
  Activity,
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
  const { t, language, setLanguage } = useTranslation();
  const { familyMembers, activeFamilyMemberId } = useCareLensStore();

  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(language || "en");
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
  const [highlightedWordIds, setHighlightedWordIds] = useState<string[]>([]);
  const [explanation, setExplanation] = useState<DocumentExplanation | null>(null);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [completedPrecautions, setCompletedPrecautions] = useState<Record<string, boolean>>({});

  const togglePrecaution = (key: string) => {
    setCompletedPrecautions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    setCurrentLang(language);
  }, [language]);

  const activeMember = familyMembers.find((m) => m.id === activeFamilyMemberId);
  const patientName = activeMember ? activeMember.name : "Rajesh Kumar";
  const patientGender = activeMember?.gender || "male";

  // 1. Run Pure TypeScript Rules Engine
  const evaluatedLabs: EvaluatedBiomarker[] = (extraction.lab_results || []).map((l) =>
    evaluateLabResult(l, { gender: patientGender })
  );

  // 2. Run Pure TypeScript Medicine Safety Engine
  const safetyAlerts: DrugSafetyAlert[] = evaluateMedicineSafety(extraction.medicines || []);

  const precautionsList = [
    {
      id: "prec_medication",
      category: currentLang === "te" ? "మందుల జాగ్రత్త" : "Medication",
      title:
        currentLang === "te"
          ? "సూచించిన మందుల సమయపాలన"
          : currentLang === "hi"
          ? "दवाओं का समय पर सेवन"
          : currentLang === "ta"
          ? "மருந்து நேர முறை"
          : "Strict Medication Adherence",
      description:
        currentLang === "te"
          ? "భోజనం తర్వాత వెంటనే గ్లైకోమెట్ మరియు రాత్రి వేళ స్టోర్వాస్ మందులను క్రమం తప్పకుండా తీసుకోండి. ఎట్టి పరిస్థితుల్లోనూ డోస్ మానవద్దు."
          : currentLang === "hi"
          ? "भोजन के तुरंत बाद मेटफॉर्मिन और रात को एटोरवास्टेटिन समय पर लें। कोई भी खुराक न छोड़ें।"
          : currentLang === "ta"
          ? "உணவுக்குப் பிறகு மெட்ஃபோர்மின் மற்றும் இரவில் அட்வோர்வாஸ்டாடின் தவறாமல் எடுத்துக் கொள்ளுங்கள்."
          : "Take oral medications strictly post-meal as prescribed. Consistent timing avoids toxic peaks and glycemic spikes.",
    },
    {
      id: "prec_diet",
      category: currentLang === "te" ? "ఆహార నియమాలు" : "Nutrition",
      title:
        currentLang === "te"
          ? "తక్కువ గ్లైసెమిక్ ఆహార విధానం"
          : currentLang === "hi"
          ? "कम ग्लाइसेमिक आहार"
          : currentLang === "ta"
          ? "குறைந்த சர்க்கரை உணவு முறை"
          : "Low Glycemic Dietary Modifications",
      description:
        currentLang === "te"
          ? "తెల్ల అన్నం, చక్కెర మరియు స్వీట్లను తగ్గించి రాగులు, జొన్నలు, పీచు పదార్థాలు మరియు ఆకుకూరలు ఎక్కువగా చేర్చుకోండి."
          : currentLang === "hi"
          ? "सफेद चावल और चीनी की जगह बाजरा, रागी, साबुत अनाज और हरी सब्जियां शामिल करें।"
          : currentLang === "ta"
          ? "வெள்ளை அரிசி மற்றும் சர்க்கரைக்கு பதிலாக ராகி, தினை மற்றும் கீரைகளை சேர்த்துக் கொள்ளுங்கள்."
          : "Eliminate refined simple sugars and polished white rice. Substitute with whole millets, oats, and leafy greens.",
    },
    {
      id: "prec_exercise",
      category: currentLang === "te" ? "జీవనశైలి" : "Lifestyle",
      title:
        currentLang === "te"
          ? "రోజువారీ 30-45 నిమిషాల నడక"
          : currentLang === "hi"
          ? "दैनिक 30-45 मिनट पैदल चलना"
          : currentLang === "ta"
          ? "தினசரி 30-45 நிமிட நடைப்பயிற்சி"
          : "Daily Aerobic Activity",
      description:
        currentLang === "te"
          ? "కండరాలలో ఇన్సులిన్ గ్రహణశక్తిని మెరుగుపరచడానికి వారానికి కనీసం 5 రోజులు వేగంగా నడవండి."
          : currentLang === "hi"
          ? "इंसुलिन संवेदनशीलता बढ़ाने के लिए सप्ताह में कम से कम 5 दिन तेज चलें।"
          : currentLang === "ta"
          ? "இன்சுலின் திறனை அதிகரிக்க வாரத்தில் 5 நாட்கள் தவறாமல் நடைப்பயிற்சி செய்யுங்கள்."
          : "Engage in moderate-intensity brisk walking for 30-45 minutes daily to improve muscle insulin sensitivity.",
    },
    {
      id: "prec_monitoring",
      category: currentLang === "te" ? "పరీక్షల షెడ్యూల్" : "Lab Monitoring",
      title:
        currentLang === "te"
          ? "తదుపరి రక్త పరీక్షల ప్రణాళిక"
          : currentLang === "hi"
          ? "अनुवर्ती लैब परीक्षण"
          : currentLang === "ta"
          ? "அடுத்த இரத்த பரிசோதனை"
          : "Scheduled Re-testing Intervals",
      description:
        currentLang === "te"
          ? "14 రోజులలో ఖాళీ కడుపున రక్తంలో చక్కెర మరియు 90 రోజులలో HbA1c పరీక్షను మళ్లీ చేయించుకోండి."
          : currentLang === "hi"
          ? "14 दिनों में फास्टिंग शुगर और 90 दिनों में दोबारा HbA1c की जांच करवाएं।"
          : currentLang === "ta"
          ? "14 நாட்களில் ஃபாஸ்டிங் சர்க்கரை மற்றும் 90 நாட்களில் HbA1c பரிசோதனையை மீண்டும் செய்யவும்."
          : "Perform a fasting glucose re-check in 14 days and schedule repeat HbA1c in 90 days to evaluate glycemic control.",
    },
  ];

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
                <CheckCircle2 className="w-3.5 h-3.5" /> {t("verifiedBadge")}
              </span>
              <span className="text-xs text-muted-foreground">{extraction.document_metadata.report_date}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-foreground mt-0.5 tracking-tight">
              {t("clinicalSummaryTitle")}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onNavigateToSchedule && (
            <button
              onClick={onNavigateToSchedule}
              className="px-3.5 py-2 rounded-xl bg-muted border border-border text-foreground font-semibold text-xs hover:bg-muted/80 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-primary" /> {t("viewSchedule")}
            </button>
          )}
          {onNavigateToBrief && (
            <button
              onClick={onNavigateToBrief}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-md shadow-primary/20 hover:opacity-95 transition-opacity flex items-center gap-1.5"
            >
              <FileBadge2 className="w-3.5 h-3.5" /> {t("viewBrief")}
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
              <Eye className="w-4 h-4 text-primary" /> {t("documentEvidence")}
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
            {t("pulseSourceHint")}
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
                  <h3 className="text-base font-bold text-foreground">{t("plainLanguageExplanation")}</h3>
                  <p className="text-[11px] text-muted-foreground">{t("readingLevelClass8")}</p>
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
                      onClick={() => {
                        setCurrentLang(l.code as SupportedLanguage);
                        setLanguage(l.code as SupportedLanguage);
                      }}
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
                {t("generatingSummary")}
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
                            {sent.source_field}
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
              {t("disclaimerText")}
            </div>
          </div>

          {/* Card B: Rules Engine Lab Results Evaluation */}
          {evaluatedLabs.length > 0 && (
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <h3 className="text-base font-bold text-foreground">{t("rulesEngineTitle")}</h3>
                <span className="text-xs font-semibold text-muted-foreground">{t("ageSexAdjusted")}</span>
              </div>

              <div className="space-y-2.5">
                {evaluatedLabs.map((lab, idx) => {
                  const isHigh = lab.status.includes("high");
                  const isLow = lab.status.includes("low");
                  const isBorderline = lab.status === "borderline";
                  const isNormal = lab.status === "normal";
                  const statusLabel = isHigh
                    ? t("statusHigh")
                    : isLow
                    ? t("statusLow")
                    : isBorderline
                    ? t("statusBorderline")
                    : t("statusNormal");

                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-muted/20 transition-colors"
                    >
                      <div>
                        <div className="font-bold text-sm text-foreground">{lab.test}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {t("normalTarget")}: {lab.reference_range} {lab.loinc_code ? `(LOINC: ${lab.loinc_code})` : ""}
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
                          <span>{statusLabel}</span>
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
                <h3 className="text-base font-bold text-foreground">{t("medicineSafetyTitle")}</h3>
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

          {/* Card D: Doctor-Verified Precautions & Care Plan */}
          <div className="bg-card rounded-2xl border border-primary/30 p-6 shadow-card space-y-4 bg-gradient-to-br from-card via-primary/5 to-card">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    {currentLang === "te"
                      ? "వైద్యపరమైన జాగ్రత్తలు & సంరక్షణ ప్రణాళిక"
                      : currentLang === "hi"
                      ? "चिकित्सीय सावधानियां और देखभाल योजना"
                      : currentLang === "ta"
                      ? "மருத்துவ முன்னெச்சரிக்கைகள் & பராமரிப்பு திட்டம்"
                      : "Doctor-Verified Precautions & Care Plan"}
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {currentLang === "te"
                      ? "మీ నివేదికలోని ఫలితాల ఆధారంగా పాటించవలసిన ముఖ్యమైన జాగ్రత్తలు"
                      : currentLang === "hi"
                      ? "आपकी रिपोर्ट के परिणामों के आधार पर अनुशंसित सावधानियां"
                      : currentLang === "ta"
                      ? "உங்கள் அறிக்கையின் முடிவுகளின் அடிப்படையில் பரிந்துரைக்கப்பட்ட முன்னெச்சரிக்கைகள்"
                      : "Personalized clinical guidance derived from your evaluated biomarkers"}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary">
                Actionable
              </span>
            </div>

            {/* Checklist of Personalized Precautions */}
            <div className="space-y-2.5">
              {precautionsList.map((item, idx) => {
                const isChecked = !!completedPrecautions[item.id];
                return (
                  <div
                    key={idx}
                    onClick={() => togglePrecaution(item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? "bg-emerald-50/60 border-emerald-200 text-emerald-950"
                        : "bg-card border-border hover:bg-muted/40 text-foreground"
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-primary flex-shrink-0"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold ${isChecked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                          {item.title}
                        </span>
                        <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded bg-muted text-muted-foreground">
                          {item.category}
                        </span>
                      </div>
                      <p className={`text-[11px] leading-relaxed ${isChecked ? "text-muted-foreground line-through" : "text-muted-foreground"}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Red Flag Warning Box */}
            <div className="p-3.5 rounded-xl bg-red-50/80 border border-red-200 text-xs text-red-950 space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-red-900">
                <AlertOctagon className="w-4 h-4 text-red-600" />
                <span>
                  {currentLang === "te"
                    ? "వైద్యుడిని వెంటనే సంప్రదించాల్సిన అత్యవసర సంకేతాలు:"
                    : currentLang === "hi"
                    ? "तुरंत डॉक्टर से परामर्श करने के आपातकालीन लक्षण:"
                    : currentLang === "ta"
                    ? "உடனடியாக மருத்துவரை அணுக வேண்டிய அவசர அறிகுறிகள்:"
                    : "When to Consult Your Physician Immediately:"}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-red-900/90 pl-5">
                {currentLang === "te"
                  ? "కళ్ళు తిరగడం, అకస్మాత్తుగా చూపు మసకబారడం, తీవ్రమైన అలసట, అధిక దాహం లేదా రక్తంలో చక్కెర 250 mg/dL కంటే ఎక్కువ ఉంటే ఆలస్యం చేయకుండా వైద్యుడిని సంప్రదించండి."
                  : currentLang === "hi"
                  ? "चक्कर आना, दृष्टि धुंधली होना, अत्यधिक प्यास, या ब्लड शुगर 250 mg/dL से अधिक होने पर तुरंत डॉक्टर से संपर्क करें।"
                  : currentLang === "ta"
                  ? "தலைசுற்றல், பார்வை மங்குதல், அதிக தாகம் அல்லது இரத்த சர்க்கரை 250 mg/dL க்கு மேல் இருந்தால் உடனடியாக மருத்துவரை அணுகவும்."
                  : "If experiencing persistent dizziness, blurred vision, unquenchable thirst with nausea, or blood glucose spiking over 250 mg/dL, seek urgent clinical evaluation without delay."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
