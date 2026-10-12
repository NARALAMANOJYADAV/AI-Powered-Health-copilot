import React, { useState, useEffect, useRef } from "react";
import { useCareLensStore } from "@/lib/store";
import { invokeAskFunction } from "@/lib/insforge";
import { SupportedLanguage } from "@/lib/types";
import { useTranslation } from "@/lib/useTranslation";
import {
  MessageSquareText,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Calendar,
  AlertCircle,
  FileText,
  ArrowRight,
  Bot,
  User,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  sources?: Array<{
    type: string;
    title: string;
    date?: string;
    value?: string;
    frequency?: string;
  }>;
  refusal?: boolean;
  time: string;
}

export function AskMyRecords({ onOpenReport }: { onOpenReport?: () => void }) {
  const { t, language } = useTranslation();
  const { familyMembers, activeFamilyMemberId } = useCareLensStore();
  const activeMember = familyMembers.find((m) => m.id === activeFamilyMemberId);
  const patientName = activeMember ? activeMember.name : "Rajesh Kumar";

  const getWelcomeText = (lang: string) => {
    if (lang === "te") return `నమస్కారం ${patientName}! మీ అప్‌లోడ్ చేసిన రికార్డుల ఆధారంగా మీరు ఏదైనా అడగవచ్చు. ఉదాహరణకు: నా HbA1c ఎంత? లేదా నా మందుల సమయాలు ఏమిటి?`;
    if (lang === "hi") return `नमस्ते ${patientName}! आप अपने मेडिकल रिकॉर्ड के बारे में मुझसे पूछ सकते हैं। जैसे: मेरा HbA1c कितना है? या मेरी दवाएं कब लेनी हैं?`;
    if (lang === "ta") return `வணக்கம் ${patientName}! உங்கள் மருத்துவ பதிவுகள் பற்றி என்னிடம் கேட்கலாம்.`;
    return `Hello ${patientName}! I can answer questions strictly based on your stored health records. Ask me about your lab test values, medication schedule, or trends.`;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: getWelcomeText(language),
      time: "Just now",
    },
  ]);

  useEffect(() => {
    setMessages([
      {
        id: "msg-welcome",
        sender: "bot",
        text: getWelcomeText(language),
        time: "Just now",
      },
    ]);
  }, [language, patientName]);

  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<unknown>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Web Speech API: Speech Recognition
  const toggleListening = () => {
    if (typeof window === "undefined") return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your query.");
      return;
    }

    if (isListening) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (recognitionRef.current as any)?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    const langCodeMap: Record<SupportedLanguage, string> = {
      en: "en-IN",
      te: "te-IN",
      hi: "hi-IN",
      ta: "ta-IN",
    };
    recognition.lang = langCodeMap[language] || "en-IN";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  // Web Speech API: Text-to-Speech
  const handleSpeak = (msgId: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const langCodeMap: Record<SupportedLanguage, string> = {
      en: "en-IN",
      te: "te-IN",
      hi: "hi-IN",
      ta: "ta-IN",
    };
    utterance.lang = langCodeMap[language] || "en-IN";

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    window.speechSynthesis.speak(utterance);
    setSpeakingMsgId(msgId);
  };

  const handleSend = async (queryText?: string) => {
    const q = (queryText || inputQuery).trim();
    if (!q) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: q,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const recordsContext = {
        lab_results: [
          { test_name: "HbA1c", value: 8.1, unit: "%", flag: "high", test_date: "2026-10-10" },
          { test_name: "Fasting Blood Sugar", value: 165, unit: "mg/dL", flag: "high", test_date: "2026-10-10" },
          { test_name: "Serum Creatinine", value: 0.9, unit: "mg/dL", flag: "normal", test_date: "2026-10-10" },
          { test_name: "Total Cholesterol", value: 188, unit: "mg/dL", flag: "normal", test_date: "2026-10-10" },
        ],
        medications: [
          { name: "Glycomet 500mg", generic_name: "Metformin", frequency: "1-0-1", timing: "After meals" },
          { name: "Telma 40mg", generic_name: "Telmisartan", frequency: "1-0-0", timing: "Morning with water" },
          { name: "Storvas 10mg", generic_name: "Atorvastatin", frequency: "0-0-1", timing: "Night bedtime" },
          { name: "Pan 40", generic_name: "Pantoprazole", frequency: "1-0-0", timing: "Empty stomach morning" },
        ],
        documents: [
          { title: "Apollo Diagnostics Comprehensive Metabolic Panel", report_date: "2026-10-10" },
        ],
      };

      const res = await invokeAskFunction({
        question: q,
        user_records: recordsContext,
        language: language,
      });

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: res.answer,
        sources: res.sources || [],
        refusal: res.refusal,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Ask query error:", err);
      const errorMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "I was unable to consult your records due to a network error. Please try again.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    t("sampleQ1"),
    t("sampleQ2"),
    t("sampleQ3"),
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-10">
      {/* Header */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <MessageSquareText className="w-6 h-6 text-primary" /> {t("askTitle")}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("askSubtitle")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Clinical Safety Guardrails Active
            </span>
          </div>
        </div>

        {/* Suggested Queries Chips */}
        <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">{t("suggestedQuestions")}:</span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs font-medium px-3 py-1.5 rounded-xl bg-muted border border-border text-foreground hover:bg-muted/80 whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 shadow-card min-h-[420px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-1">
          {messages.map((m) => {
            const isUser = m.sender === "user";
            return (
              <div key={m.id} className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
                </div>

                <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-sm"
                        : m.refusal
                        ? "bg-amber-50/70 border border-amber-200 text-amber-950 rounded-tl-none"
                        : "bg-muted/50 border border-border text-foreground rounded-tl-none"
                    }`}
                  >
                    <p>{m.text}</p>

                    {/* Sources Cited */}
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-border/60 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                          Verified Sources on File:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {m.sources.map((s, idx) => (
                            <button
                              key={idx}
                              onClick={onOpenReport}
                              className="px-2 py-0.5 rounded-md bg-card border border-border text-[11px] font-semibold text-primary hover:underline flex items-center gap-1 shadow-2xs"
                            >
                              <FileText className="w-3 h-3" />
                              <span>{s.title}</span>
                              {s.value && <span className="font-bold">({s.value})</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions under bot message */}
                  {!isUser && (
                    <div className="flex items-center gap-2 px-1 text-[11px] text-muted-foreground">
                      <span>{m.time}</span>
                      <button
                        onClick={() => handleSpeak(m.id, m.text)}
                        className="hover:text-primary transition-colors flex items-center gap-1"
                      >
                        {speakingMsgId === m.id ? (
                          <>
                            <VolumeX className="w-3 h-3 text-red-600" /> Stop
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" /> Listen
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 border border-border text-xs text-muted-foreground animate-pulse">
                Consulting your verified clinical records...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Query Input Bar */}
        <div className="mt-4 pt-4 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={
                  isListening
                    ? "Listening to voice input..."
                    : t("askPlaceholder")
                }
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                disabled={isLoading}
                className="w-full text-xs sm:text-sm font-semibold rounded-xl bg-muted border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-3 rounded-xl border transition-all ${
                isListening
                  ? "bg-red-500 text-white border-red-600 animate-pulse"
                  : "bg-muted border-border text-foreground hover:bg-muted/80"
              }`}
              title={isListening ? "Stop listening" : "Voice input (Web Speech API)"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-primary" />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-md shadow-primary/20 hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[11px] text-muted-foreground text-center mt-2.5">
            Refuses to diagnose conditions or adjust doses. Consult your doctor for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
