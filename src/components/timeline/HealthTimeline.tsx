import React, { useState } from "react";
import { TimelineEvent } from "@/lib/types";
import { useTranslation } from "@/lib/useTranslation";
import {
  History,
  Search,
  Filter,
  FileText,
  Pill,
  Stethoscope,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowRight,
  Sparkles,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export function HealthTimeline({
  onSelectEvent,
  onNavigateToUpload,
}: {
  onSelectEvent?: (eventId: string) => void;
  onNavigateToUpload: () => void;
}) {
  const { t, language } = useTranslation();
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getTimelineEvents = (lang: string): TimelineEvent[] => {
    if (lang === "te") {
      return [
        {
          id: "evt-1",
          event_type: "lab_report",
          title: "సమగ్ర డయాబెటిస్ & మెటబాలిక్ ల్యాబ్ ప్యానెల్",
          summary: "HbA1c 8.1% కి పెరిగింది, FBS 165 mg/dL. కిడ్నీ పనితీరు సాధారణంగా ఉంది (క్రియాటినిన్ 0.9 mg/dL).",
          event_date: "2026-10-10",
          severity: "attention",
          delta_summary: "2026-07-15 నాటి గత పరీక్షతో పోలిస్తే HbA1c +0.9% పెరిగింది.",
          details: {
            facility: "అపోలో డయాగ్నస్టిక్స్, హైదరాబాద్",
            doctor: "డాక్టర్ వి. కె. శర్మ",
            biomarkers: [
              { name: "HbA1c", val: 8.1, unit: "%", flag: "high" },
              { name: "ఫాస్టింగ్ బ్లడ్ షుగర్", val: 165, unit: "mg/dL", flag: "high" },
              { name: "క్రియాటినిన్", val: 0.9, unit: "mg/dL", flag: "normal" },
              { name: "కొలెస్ట్రాల్", val: 188, unit: "mg/dL", flag: "normal" },
            ],
          },
        },
        {
          id: "evt-2",
          event_type: "prescription",
          title: "బీపీ & షుగర్ మందుల రెగ్యులర్ ప్రిస్క్రిప్షన్",
          summary: "గ్లైకోమెట్ 500mg (1-0-1), టెల్మా 40mg (1-0-0) మరియు కొలెస్ట్రాల్ నియంత్రణకు స్టోర్వాస్ 10mg (0-0-1) చేర్చబడ్డాయి.",
          event_date: "2026-10-02",
          severity: "normal",
          delta_summary: "కొత్తగా లిపిడ్ థెరపీ (అటోర్వాస్టాటిన్ 10mg) రాత్రి వేళ చేర్చబడింది.",
          details: {
            doctor: "డాక్టర్ సునీతా రావు, కార్డియాలజిస్ట్",
            medicines: ["గ్లైకోమెట్ 500mg", "టెల్మా 40mg", "స్టోర్వాస్ 10mg", "పాన్ 40"],
          },
        },
        {
          id: "evt-3",
          event_type: "doctor_visit",
          title: "వార్షిక ఆరోగ్య పరీక్ష & సంప్రదింపు",
          summary: "శారీరక పరీక్ష సాధారణం. రక్తపోటు 128/82 mmHg. రోజుకు 30 నిమిషాల వ్యాయామం సూచించబడింది.",
          event_date: "2026-08-20",
          severity: "normal",
          delta_summary: "గత విజిట్ (136/88) తో పోలిస్తే బీపీ అదుపులో ఉంది.",
          details: {
            doctor: "డాక్టర్ పి. మూర్తి",
            vitals: "బీపీ: 128/82 mmHg | బరువు: 74 కిలోలు | BMI: 24.8",
          },
        },
        {
          id: "evt-4",
          event_type: "lab_report",
          title: "త్రైమాసిక గ్లైసెమిక్ & లిపిడ్ రివ్యూ",
          summary: "HbA1c 7.2%, ఫాస్టింగ్ బ్లడ్ షుగర్ 142 mg/dL. కొలెస్ట్రాల్ 210 mg/dL గా నమోదయింది.",
          event_date: "2026-07-15",
          severity: "normal",
          details: {
            facility: "విజయ డయాగ్నస్టిక్స్",
            biomarkers: [
              { name: "HbA1c", val: 7.2, unit: "%", flag: "borderline" },
              { name: "ఫాస్టింగ్ బ్లడ్ షుగర్", val: 142, unit: "mg/dL", flag: "borderline" },
              { name: "మొత్తం కొలెస్ట్రాల్", val: 210, unit: "mg/dL", flag: "borderline" },
            ],
          },
        },
      ];
    }
    if (lang === "hi") {
      return [
        {
          id: "evt-1",
          event_type: "lab_report",
          title: "मधुमेह और व्यापक मेटाबॉलिक पैनल",
          summary: "HbA1c 8.1% (अधिक), FBS 165 mg/dL। किडनी फंक्शन सामान्य है (क्रिएटिनिन 0.9 mg/dL)।",
          event_date: "2026-10-10",
          severity: "attention",
          delta_summary: "पिछली 2026-07-15 की जांच की तुलना में HbA1c में +0.9% की वृद्धि।",
          details: {
            facility: "अपोलो डायग्नोस्टिक्स, हैदराबाद",
            doctor: "डॉ. वी. के. शर्मा",
            biomarkers: [
              { name: "HbA1c", val: 8.1, unit: "%", flag: "high" },
              { name: "फास्टिंग ब्लड शुगर", val: 165, unit: "mg/dL", flag: "high" },
              { name: "क्रिएटिनिन", val: 0.9, unit: "mg/dL", flag: "normal" },
              { name: "कोलेस्ट्रॉल", val: 188, unit: "mg/dL", flag: "normal" },
            ],
          },
        },
        {
          id: "evt-2",
          event_type: "prescription",
          title: "तिमाही बीपी और मधुमेह दवा प्रिस्क्रिप्शन",
          summary: "ग्लाइकोमेट 500mg (1-0-1), टेलमा 40mg (1-0-0) और कोलेस्ट्रॉल के लिए स्टोरवास 10mg (0-0-1)।",
          event_date: "2026-10-02",
          severity: "normal",
          delta_summary: "रात के समय एटोरवास्टेटिन 10mg नई दवा जोड़ी गई।",
          details: {
            doctor: "डॉ. सुनीता राव, हृदय रोग विशेषज्ञ",
            medicines: ["ग्लाइकोमेट 500mg", "टेलमा 40mg", "स्टोरवास 10mg", "पैन 40"],
          },
        },
        {
          id: "evt-3",
          event_type: "doctor_visit",
          title: "वार्षिक स्वास्थ्य परामर्श",
          summary: "शारीरिक जांच सामान्य। रक्तचाप 128/82 mmHg। 30 मिनट दैनिक व्यायाम की सलाह दी गई।",
          event_date: "2026-08-20",
          severity: "normal",
          delta_summary: "पिछली बार (136/88) की तुलना में बीपी नियंत्रित है।",
          details: {
            doctor: "डॉ. पी. मूर्ति",
            vitals: "बीपी: 128/82 mmHg | वजन: 74 किग्रा | बीएमआई: 24.8",
          },
        },
        {
          id: "evt-4",
          event_type: "lab_report",
          title: "तिमाही शुगर और लिपिड समीक्षा",
          summary: "HbA1c 7.2% था, फास्टिंग ब्लड शुगर 142 mg/dL। कुल कोलेस्ट्रॉल 210 mg/dL दर्ज किया गया।",
          event_date: "2026-07-15",
          severity: "normal",
          details: {
            facility: "विजया डायग्नोस्टिक्स",
            biomarkers: [
              { name: "HbA1c", val: 7.2, unit: "%", flag: "borderline" },
              { name: "फास्टिंग ब्लड शुगर", val: 142, unit: "mg/dL", flag: "borderline" },
              { name: "कुल कोलेस्ट्रॉल", val: 210, unit: "mg/dL", flag: "borderline" },
            ],
          },
        },
      ];
    }
    if (lang === "ta") {
      return [
        {
          id: "evt-1",
          event_type: "lab_report",
          title: "முழுமையான நீரிழிவு மற்றும் வளர்சிதை மாற்ற அறிக்கை",
          summary: "HbA1c 8.1% ஆக உயர்ந்துள்ளது, FBS 165 mg/dL. சிறுநீரக செயல்பாடு இயல்பாக உள்ளது.",
          event_date: "2026-10-10",
          severity: "attention",
          delta_summary: "முந்தைய பரிசோதனையை விட HbA1c +0.9% அதிகரித்துள்ளது.",
          details: {
            facility: "அப்பல்லோ டயக்னாஸ்டிக்ஸ், ஹைதராபாத்",
            doctor: "டாக்டர் வி. கே. சர்மா",
            biomarkers: [
              { name: "HbA1c", val: 8.1, unit: "%", flag: "high" },
              { name: "இரத்த சர்க்கரை", val: 165, unit: "mg/dL", flag: "high" },
              { name: "கிரியேட்டினின்", val: 0.9, unit: "mg/dL", flag: "normal" },
              { name: "கொலஸ்ட்ரால்", val: 188, unit: "mg/dL", flag: "normal" },
            ],
          },
        },
        {
          id: "evt-2",
          event_type: "prescription",
          title: "இரத்த அழுத்தம் & சர்க்கரை மருந்து பட்டியல்",
          summary: "கிளைகோமெட் 500mg, டெல்மா 40mg மற்றும் கொலஸ்ட்ராலுக்கு ஸ்டோர்வாஸ் 10mg பரிந்துரைக்கப்பட்டது.",
          event_date: "2026-10-02",
          severity: "normal",
          delta_summary: "புதிய கொலஸ்ட்ரால் மருந்து சேர்க்கப்பட்டது.",
          details: {
            doctor: "டாக்டர் சுனிதா ராவ்",
            medicines: ["கிளைகோமெட் 500mg", "டெல்மா 40mg", "ஸ்டோர்வாஸ் 10mg", "பான் 40"],
          },
        },
        {
          id: "evt-3",
          event_type: "doctor_visit",
          title: "ஆண்டு சுகாதார ஆலோசனை",
          summary: "உடல் பரிசோதனை இயல்பு. இரத்த அழுத்தம் 128/82 mmHg. 30 நிமிட உடற்பயிற்சி அறிவுறுத்தப்பட்டது.",
          event_date: "2026-08-20",
          severity: "normal",
          delta_summary: "இரத்த அழுத்தம் கட்டுப்பாட்டில் உள்ளது.",
          details: {
            doctor: "டாக்டர் பி. மூர்த்தி",
            vitals: "பிபி: 128/82 mmHg | எடை: 74 கிலோ | பிஎம்ஐ: 24.8",
          },
        },
        {
          id: "evt-4",
          event_type: "lab_report",
          title: "சர்க்கரை மற்றும் கொழுப்பு மதிப்பாய்வு",
          summary: "HbA1c 7.2%, இரத்த சர்க்கரை 142 mg/dL. கொலஸ்ட்ரால் 210 mg/dL ஆக இருந்தது.",
          event_date: "2026-07-15",
          severity: "normal",
          details: {
            facility: "விஜயா டயக்னாஸ்டிக்ஸ்",
            biomarkers: [
              { name: "HbA1c", val: 7.2, unit: "%", flag: "borderline" },
              { name: "இரத்த சர்க்கரை", val: 142, unit: "mg/dL", flag: "borderline" },
              { name: "மொத்த கொலஸ்ட்ரால்", val: 210, unit: "mg/dL", flag: "borderline" },
            ],
          },
        },
      ];
    }
    return [
      {
        id: "evt-1",
        event_type: "lab_report",
        title: "Comprehensive Metabolic & Diabetes Panel",
        summary: "HbA1c elevated at 8.1%, FBS 165 mg/dL. Renal profile within normal limits (Creatinine 0.9 mg/dL).",
        event_date: "2026-10-10",
        severity: "attention",
        delta_summary: "HbA1c increased by +0.9% compared to previous test on 2026-07-15.",
        details: {
          facility: "Apollo Diagnostics, Hyderabad",
          doctor: "Dr. V. K. Sharma",
          biomarkers: [
            { name: "HbA1c", val: 8.1, unit: "%", flag: "high" },
            { name: "Fasting Blood Sugar", val: 165, unit: "mg/dL", flag: "high" },
            { name: "Creatinine", val: 0.9, unit: "mg/dL", flag: "normal" },
            { name: "Cholesterol", val: 188, unit: "mg/dL", flag: "normal" },
          ],
        },
      },
      {
        id: "evt-2",
        event_type: "prescription",
        title: "Quarterly Hypertension & Diabetes Rx Refill",
        summary: "Prescribed Glycomet 500mg (1-0-1), Telma 40mg (1-0-0), and added Storvas 10mg (0-0-1) for lipid optimization.",
        event_date: "2026-10-02",
        severity: "normal",
        delta_summary: "Added new lipid therapy (Atorvastatin 10mg bedtime).",
        details: {
          doctor: "Dr. Sunita Rao, Cardiologist",
          medicines: ["Glycomet 500mg", "Telma 40mg", "Storvas 10mg", "Pan 40"],
        },
      },
      {
        id: "evt-3",
        event_type: "doctor_visit",
        title: "Annual Preventive Health Consultation",
        summary: "Physical exam normal. Blood pressure 128/82 mmHg. Advised 30 minutes daily aerobic exercise and dietary salt restriction.",
        event_date: "2026-08-20",
        severity: "normal",
        delta_summary: "BP controlled vs 136/88 in previous visit.",
        details: {
          doctor: "Dr. P. Murthy",
          vitals: "BP: 128/82 mmHg | Weight: 74 kg | BMI: 24.8",
        },
      },
      {
        id: "evt-4",
        event_type: "lab_report",
        title: "Quarterly Glycemic & Lipid Review",
        summary: "HbA1c was 7.2%, Fasting Blood Sugar 142 mg/dL. Total Cholesterol was 210 mg/dL.",
        event_date: "2026-07-15",
        severity: "normal",
        details: {
          facility: "Vijaya Diagnostics",
          biomarkers: [
            { name: "HbA1c", val: 7.2, unit: "%", flag: "borderline" },
            { name: "Fasting Blood Sugar", val: 142, unit: "mg/dL", flag: "borderline" },
            { name: "Total Cholesterol", val: 210, unit: "mg/dL", flag: "borderline" },
          ],
        },
      },
    ];
  };

  const defaultEvents = getTimelineEvents(language);

  const filtered = defaultEvents.filter((evt) => {
    const matchesFilter = filterType === "all" || evt.event_type === filterType;
    const matchesSearch =
      searchQuery === "" ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-10">
      {/* Header */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <History className="w-6 h-6 text-primary" /> {t("timelineTitle")}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("timelineSubtitle")}
            </p>
          </div>

          <button
            onClick={onNavigateToUpload}
            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 hover:opacity-95 transition-opacity"
          >
            + {t("scanNewReport")}
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-semibold rounded-xl bg-muted border border-border pl-9 pr-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: t("filterAll") },
              { id: "lab_report", label: t("filterLabs") },
              { id: "prescription", label: t("filterPrescriptions") },
              { id: "doctor_visit", label: t("filterConsultations") },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                  filterType === f.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* "What Changed Since Last Report" Comparative Card */}
      <div className="bg-card rounded-2xl border border-primary/30 p-6 shadow-card bg-gradient-to-br from-card via-blue-50/15 to-card">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold text-foreground">{t("whatChanged")}</h3>
          <span className="text-xs text-muted-foreground ml-auto">10-Oct-2026 vs 15-Jul-2026</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>HbA1c</span>
              <span className="flex items-center gap-0.5 text-red-600">
                <TrendingUp className="w-3.5 h-3.5" /> +0.9%
              </span>
            </div>
            <div className="text-base font-extrabold text-foreground mt-1">8.1% vs 7.2%</div>
            <p className="text-[11px] text-amber-800 mt-1">
              {t("hba1cDeltaDesc")}
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
              <span>{t("totalCholesterol")}</span>
              <span className="flex items-center gap-0.5 text-emerald-600">
                <TrendingDown className="w-3.5 h-3.5" /> -22 mg/dL
              </span>
            </div>
            <div className="text-base font-extrabold text-foreground mt-1">188 vs 210 mg/dL</div>
            <p className="text-[11px] text-emerald-800 mt-1">
              {t("cholesterolDeltaDesc")}
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900">
              <span>{t("medRegimen")}</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                {t("newAddition")}
              </span>
            </div>
            <div className="text-base font-extrabold text-foreground mt-1">Storvas 10mg</div>
            <p className="text-[11px] text-blue-800 mt-1">
              {t("storvasDeltaDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Feed */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-border">
        {filtered.map((item) => {
          const isLab = item.event_type === "lab_report";
          const isPrescription = item.event_type === "prescription";
          const isAttention = item.severity === "attention";

          return (
            <div key={item.id} className="relative pl-12">
              {/* Dot / Icon on timeline rail */}
              <div
                className={`absolute left-2.5 top-5 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-card flex items-center justify-center shadow-sm ${
                  isAttention
                    ? "bg-amber-100 text-amber-700 ring-2 ring-amber-300"
                    : isLab
                    ? "bg-blue-100 text-blue-700"
                    : isPrescription
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {isLab ? (
                  <FileText className="w-4 h-4" />
                ) : isPrescription ? (
                  <Pill className="w-4 h-4" />
                ) : (
                  <Stethoscope className="w-4 h-4" />
                )}
              </div>

              {/* Event Card */}
              <div
                onClick={() => onSelectEvent && onSelectEvent(item.id)}
                className="bg-card rounded-2xl border border-border p-5 shadow-card hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isLab
                          ? "bg-blue-100 text-blue-800"
                          : isPrescription
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {item.event_type.replace("_", " ")}
                    </span>
                    <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.event_date}
                  </span>
                </div>

                <p className="text-xs text-foreground/90 mt-2 leading-relaxed">{item.summary}</p>

                {item.delta_summary && (
                  <div className="mt-3 p-2.5 rounded-xl bg-muted/50 border border-border text-[11px] text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{item.delta_summary}</span>
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-border/60">
                  <span className="text-muted-foreground text-[11px]">
                    {String(item.details?.facility || item.details?.doctor || "Health Record")}
                  </span>
                  <span className="text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {t("viewEvidence")} <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
