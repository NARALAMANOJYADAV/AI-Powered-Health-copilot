import { SupportedLanguage } from "./types";

export type TranslationKey =
  // Brand & Nav
  | "brandTitle"
  | "brandTagline"
  | "copilotBadge"
  | "navDashboard"
  | "navUpload"
  | "navTimeline"
  | "navTrends"
  | "navMedications"
  | "navAsk"
  | "navBrief"
  | "navAbdm"
  | "navSettings"
  | "tabHome"
  | "tabScan"
  | "tabTimeline"
  | "tabMeds"
  | "tabAsk"
  | "tabBrief"
  | "tabSettings"
  | "signIn"
  | "self"
  | "activeProfile"
  | "switchUser"
  | "profileSettings"
  | "signOut"
  | "abdmLinked"
  // Dashboard
  | "welcomeBack"
  | "dashboardSubtitle"
  | "scanNewReport"
  | "doctorBriefBtn"
  | "clinicalNoticeTitle"
  | "clinicalNoticeSource"
  | "needsReview"
  | "hba1cAlertTitle"
  | "high"
  | "hba1cAlertDesc"
  | "sourceVerified"
  | "inspectSource"
  | "todayAdherence"
  | "taken"
  | "dailySchedule"
  | "morningAfterBreakfast"
  | "morningWithWater"
  | "nightBedtime"
  | "manageTimings"
  | "askRecordsCardTitle"
  | "askRecordsCardDesc"
  | "startMedicalQuery"
  | "biomarkerTrajectory"
  | "longitudinalComparison"
  | "allTrends"
  | "fastingSugar"
  | "creatinine"
  | "totalCholesterol"
  | "stableNormal"
  | "oneClickTestFlow"
  | "tryOcrExtraction"
  | "seeCareLensAction"
  | "sampleDesc"
  | "testLabReportBtn"
  | "testPrescriptionBtn"
  // Document Scanner
  | "scannerTitle"
  | "scannerSubtitle"
  | "uploadTitle"
  | "dragDropText"
  | "takePhoto"
  | "ocrLangLabel"
  | "orTrySamples"
  | "diabetesSampleTitle"
  | "cardiacSampleTitle"
  | "processingStatus"
  | "privacyNotice"
  // Verification Canvas
  | "verificationTitle"
  | "verificationSubtitle"
  | "confidenceScore"
  | "rawOcrText"
  | "extractedEntities"
  | "biomarkers"
  | "medicines"
  | "approveAndContinue"
  | "reScan"
  | "stepVerification"
  | "fieldsRequireReview"
  | "allFieldsHighConfidence"
  | "verifyFindingsTitle"
  | "verifyFindingsDesc"
  | "cancelBtn"
  | "confirmSaveBtn"
  | "savingToInsforge"
  | "originalDoc"
  | "docEvidenceTapHint"
  | "docDetails"
  | "reportDate"
  | "doctorName"
  | "clinicLab"
  | "labResultsCount"
  | "medsCount"
  | "pleaseVerify"
  | "testValue"
  | "testUnit"
  | "normalTarget"
  | "addMissingLab"
  | "medFrequency"
  | "medTiming"
  | "medDuration"
  | "addMissingMed"
  // Report Detail View
  | "clinicalSummaryTitle"
  | "plainLanguageExplanation"
  | "listenAudio"
  | "stopAudio"
  | "speaking"
  | "drugInteractionsWarning"
  | "saveToTimeline"
  | "viewSchedule"
  | "viewBrief"
  | "documentEvidence"
  | "pulseSourceHint"
  | "readingLevelClass8"
  | "generatingSummary"
  | "rulesEngineTitle"
  | "ageSexAdjusted"
  | "medicineSafetyTitle"
  // Health Timeline
  | "timelineTitle"
  | "timelineSubtitle"
  | "filterAll"
  | "filterLabs"
  | "filterPrescriptions"
  | "filterConsultations"
  | "verifiedBadge"
  | "viewReport"
  | "whatChanged"
  | "searchPlaceholder"
  | "viewEvidence"
  | "hba1cDeltaDesc"
  | "cholesterolDeltaDesc"
  | "medRegimen"
  | "newAddition"
  | "storvasDeltaDesc"
  // Trends
  | "trendsTitle"
  | "trendsSubtitle"
  | "normalRange"
  | "latestValue"
  | "targetGoal"
  | "statusNormal"
  | "statusHigh"
  | "statusLow"
  | "statusCriticalHigh"
  | "statusCriticalLow"
  | "statusBorderline"
  | "selectTest"
  | "currentStatus"
  | "vsPriorTest"
  | "normalBand"
  | "measuredValues"
  | "trendCurve"
  | "trendInfoNote"
  // Medications
  | "medsTitle"
  | "medsSubtitle"
  | "markTaken"
  | "downloadCalendar"
  | "drugInteractions"
  | "foodTiming"
  | "morningSlot"
  | "afternoonSlot"
  | "nightSlot"
  | "sosSlot"
  | "medSafetyAlertsTitle"
  | "dosesTaken"
  | "adherenceNote"
  // Ask My Records
  | "askTitle"
  | "askSubtitle"
  | "askPlaceholder"
  | "sendQuery"
  | "clearChat"
  | "suggestedQuestions"
  | "sampleQ1"
  | "sampleQ2"
  | "sampleQ3"
  // Doctor Visit Brief
  | "briefTitle"
  | "briefSubtitle"
  | "printPdf"
  | "scanQrNotice"
  | "chiefComplaints"
  | "currentMedications"
  | "abnormalLabs"
  | "copyShareLink"
  | "linkCopied"
  | "expiresIn24h"
  | "activeAndSecure"
  | "qrExplainer"
  | "revokeLink"
  | "confidentialSummary"
  | "knownAllergies"
  | "noneKnown"
  | "suggestedQuestionsTitle"
  | "briefDocName"
  | "genericName"
  | "dosageTiming"
  | "instructions"
  | "briefQuestion1"
  | "briefQuestion2"
  | "briefQuestion3"
  | "briefQuestion4"
  // ABDM & FHIR
  | "abdmTitle"
  | "abdmSubtitle"
  | "exportFhirBundle"
  | "abhaLinkedStatus"
  | "consentLedger"
  // Settings
  | "settingsTitle"
  | "settingsSubtitle"
  | "personalIdentity"
  | "fullName"
  | "email"
  | "dob"
  | "gender"
  | "male"
  | "female"
  | "other"
  | "phone"
  | "abhaAddress"
  | "bloodGroup"
  | "saveProfile"
  | "saving"
  | "accessibilityHeading"
  | "defaultLangHeading"
  | "themeHeading"
  | "accountSecurity"
  | "readingAccessibility"
  | "layoutStandard"
  | "layoutLargeText"
  | "layoutSimple"
  | "patientConsentTitle"
  | "patientConsentDesc"
  | "consentEmergencyTitle"
  | "consentEmergencyDesc"
  | "consentAbdmTitle"
  | "consentAbdmDesc"
  | "consentOfflineTitle"
  | "consentOfflineDesc"
  | "consentAiTitle"
  | "consentAiDesc"
  | "auditLogTitle"
  | "auditLogDesc"
  | "thEventAction"
  | "thResourceTarget"
  | "thTimestamp"
  | "thStatus"
  // Family Profiles
  | "familyTitle"
  | "familySubtitle"
  | "addFamilyMember"
  | "switchProfile"
  | "relationship"
  | "age"
  | "parent"
  | "spouse"
  | "child"
  | "reportsCount"
  | "saveMember"
  | "notesOptional"
  // Auth Modal
  | "signInTab"
  | "signUpTab"
  | "password"
  | "dontHaveAccount"
  | "alreadyHaveAccount"
  // Common
  | "disclaimerText"
  | (string & {});

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    brandTitle: "CareLens",
    brandTagline: "AI Personal Health Copilot",
    copilotBadge: "Copilot",
    navDashboard: "Dashboard",
    navUpload: "Upload & Scan",
    navTimeline: "Timeline",
    navTrends: "Trends",
    navMedications: "Medicines",
    navAsk: "Ask Records",
    navBrief: "Visit Brief",
    navAbdm: "ABDM & FHIR",
    navSettings: "Settings",
    tabHome: "Home",
    tabScan: "Scan",
    tabTimeline: "Timeline",
    tabMeds: "Meds",
    tabAsk: "Ask",
    tabBrief: "Brief",
    tabSettings: "Settings",
    signIn: "Sign In",
    self: "Self",
    activeProfile: "Active Profile",
    switchUser: "Switch User / Login",
    profileSettings: "Profile & Settings",
    signOut: "Sign Out",
    abdmLinked: "ABDM Linked",
    welcomeBack: "Welcome back",
    dashboardSubtitle: "Your personal clinical timeline is up to date. 1 report requires review.",
    scanNewReport: "Scan New Report",
    doctorBriefBtn: "Doctor Brief",
    clinicalNoticeTitle: "Clinical Attention Notice",
    clinicalNoticeSource: "From Recent Comprehensive Metabolic Report",
    needsReview: "Needs Review",
    hba1cAlertTitle: "HbA1c Level: 8.1% (Standard Target: < 5.7%)",
    high: "High",
    hba1cAlertDesc: "Your average blood sugar over the last 90 days is elevated above normal. We recommend contacting your doctor soon to discuss your medication schedule.",
    sourceVerified: "Source document verified on Oct 10, 2026",
    inspectSource: "Inspect Source & Evidence",
    todayAdherence: "Today's Adherence",
    taken: "Taken",
    dailySchedule: "Daily Schedule",
    morningAfterBreakfast: "Morning (After Breakfast)",
    morningWithWater: "Morning (With water)",
    nightBedtime: "Night (Bedtime)",
    manageTimings: "Manage Timings & Reminders",
    askRecordsCardTitle: "Ask My Records",
    askRecordsCardDesc: "Query your lab values, medications, or historical trends with voice or text in Telugu, Hindi, Tamil, or English.",
    startMedicalQuery: "Start Medical Query",
    biomarkerTrajectory: "Key Biomarker Trajectory",
    longitudinalComparison: "Longitudinal comparison against previous report",
    allTrends: "All Trends",
    fastingSugar: "Fasting Sugar",
    creatinine: "Creatinine",
    totalCholesterol: "Total Cholesterol",
    stableNormal: "Stable (Normal)",
    oneClickTestFlow: "One-Click Test Flow",
    tryOcrExtraction: "Try full end-to-end OCR and extraction",
    seeCareLensAction: "Want to see CareLens in action immediately?",
    sampleDesc: "Load an authentic lab report image with Telugu/English OCR, automatic PII masking, confidence verification, and multi-language explanation.",
    testLabReportBtn: "Test Comprehensive Lab Report",
    testPrescriptionBtn: "Test Prescription with Interactions",
    scannerTitle: "Secure Document Scanner",
    scannerSubtitle: "Tesseract WASM OCR with instant client-side PII masking and clinical extraction.",
    uploadTitle: "Upload Medical Document",
    dragDropText: "Drag and drop your report (JPG, PNG, PDF) or click to browse",
    takePhoto: "Take Photo / Use Camera",
    ocrLangLabel: "OCR Language",
    orTrySamples: "Or test with pre-loaded authentic samples:",
    diabetesSampleTitle: "Comprehensive Diabetes & Lipid Panel (Telugu & English)",
    cardiacSampleTitle: "Cardiology Prescription with Drug Safety Warning",
    processingStatus: "Processing Document...",
    privacyNotice: "Client-Side Privacy Guarantee: PII (Aadhaar, Phone, ABHA, Address) is automatically detected and masked in your browser before any cloud processing.",
    verificationTitle: "Clinical Verification Canvas",
    verificationSubtitle: "Verify extracted biomarkers and medications against original document text. Low confidence items (<80%) are highlighted.",
    confidenceScore: "Confidence Score",
    rawOcrText: "Raw OCR Text",
    extractedEntities: "Extracted Entities",
    biomarkers: "Biomarkers",
    medicines: "Medicines",
    approveAndContinue: "Approve & Explain Report",
    reScan: "Re-scan Document",
    stepVerification: "Step 2 of 3: Verification",
    fieldsRequireReview: "field(s) require review",
    allFieldsHighConfidence: "All fields high confidence",
    verifyFindingsTitle: "Verify Extracted Medical Findings",
    verifyFindingsDesc: "Compare extracted results against the original document. Click any row to highlight its source token.",
    cancelBtn: "Cancel",
    confirmSaveBtn: "Confirm & Save",
    savingToInsforge: "Saving to InsForge...",
    originalDoc: "Original Document",
    docEvidenceTapHint: "Tapping bounding boxes or row chips highlights the evidence.",
    docDetails: "Document Details",
    reportDate: "Report Date",
    doctorName: "Doctor Name",
    clinicLab: "Clinic / Lab",
    labResultsCount: "Lab Results",
    medsCount: "Prescriptions & Meds",
    pleaseVerify: "Please verify",
    testValue: "Value",
    testUnit: "Unit",
    normalTarget: "Normal Target",
    addMissingLab: "+ Add Missing Lab Result",
    medFrequency: "Frequency (e.g. 1-0-1)",
    medTiming: "Timing / Instructions",
    medDuration: "Duration",
    addMissingMed: "+ Add Missing Prescription",
    clinicalSummaryTitle: "Clinical Explanation & Patient Guidance",
    plainLanguageExplanation: "Plain Language Explanation",
    listenAudio: "Listen to Audio",
    stopAudio: "Stop Audio",
    speaking: "Playing in",
    drugInteractionsWarning: "Potential Drug Interactions Detected",
    saveToTimeline: "Saved to Health Timeline",
    viewSchedule: "View Medication Schedule",
    viewBrief: "Generate Doctor Brief",
    documentEvidence: "Document Evidence",
    pulseSourceHint: "Click any sentence on the right to pulse its exact source token here.",
    readingLevelClass8: "Reading Level: Class 8",
    generatingSummary: "Generating plain language medical summary in chosen language...",
    rulesEngineTitle: "Rules Engine Biomarker Evaluation",
    ageSexAdjusted: "Age & Sex Adjusted",
    medicineSafetyTitle: "Medicine Safety Engine Findings",
    timelineTitle: "Clinical Health Timeline",
    timelineSubtitle: "Chronological medical record of lab reports, prescriptions, and health encounters.",
    filterAll: "All Records",
    filterLabs: "Lab Reports",
    filterPrescriptions: "Prescriptions",
    filterConsultations: "Consultations",
    verifiedBadge: "Verified",
    viewReport: "View Report",
    whatChanged: "What Changed Since Last Report?",
    searchPlaceholder: "Search reports, medicines, doctors...",
    viewEvidence: "View Verified Evidence",
    hba1cDeltaDesc: "Elevated past target threshold of 5.7%. Recommended for doctor review.",
    cholesterolDeltaDesc: "Improved into desirable target range under 200 mg/dL.",
    medRegimen: "Medication Regimen",
    newAddition: "New Add",
    storvasDeltaDesc: "Added Atorvastatin 10mg at bedtime for secondary prevention.",
    trendsTitle: "Biomarker Analytics & Longitudinal Trends",
    trendsSubtitle: "Visualize clinical parameters over time compared against standard Indian clinical reference intervals.",
    normalRange: "Normal Reference Range",
    latestValue: "Latest Value",
    targetGoal: "Target Goal",
    statusNormal: "Normal",
    statusHigh: "High",
    statusLow: "Low",
    statusCriticalHigh: "Critical High",
    statusCriticalLow: "Critical Low",
    statusBorderline: "Borderline",
    selectTest: "Select Test",
    currentStatus: "Current Status",
    vsPriorTest: "vs prior test",
    normalBand: "Normal Reference Band",
    measuredValues: "Measured Values",
    trendCurve: "Longitudinal Curve",
    trendInfoNote: "Values fluctuate based on diet, lifestyle, and adherence to prescribed medications.",
    medsTitle: "Active Medications & Adherence Schedule",
    medsSubtitle: "Dosage timings, food interactions, and adherence tracking for Indian pharmaceutical formulations.",
    markTaken: "Mark as Taken",
    downloadCalendar: "Download Calendar (.ics)",
    drugInteractions: "Drug Interactions",
    foodTiming: "Food Timing",
    morningSlot: "Morning (08:00 AM - 09:30 AM)",
    afternoonSlot: "Afternoon (01:00 PM - 02:00 PM)",
    nightSlot: "Night / Bedtime (08:30 PM - 10:00 PM)",
    sosSlot: "As Needed (SOS)",
    medSafetyAlertsTitle: "Pharmacological Safety Alerts",
    dosesTaken: "Doses Taken",
    adherenceNote: "Consistent timing helps maximize efficacy and avoid drug concentration peaks.",
    askTitle: "Ask My Health Records",
    askSubtitle: "Natural language and voice queries over your lab tests, medicines, and clinical history.",
    askPlaceholder: "Ask a question (e.g., 'What is my latest HbA1c?' or 'Any medicine interactions?')...",
    sendQuery: "Send Query",
    clearChat: "Clear Chat",
    suggestedQuestions: "Suggested Questions",
    sampleQ1: "Is my blood sugar under control?",
    sampleQ2: "What are my morning medicines?",
    sampleQ3: "Are there any food interactions with my medicines?",
    briefTitle: "Doctor Visit Brief",
    briefSubtitle: "1-Page concise summary with cryptographically signed QR code for your physician.",
    printPdf: "Print / Save PDF",
    scanQrNotice: "Scan QR code to access verified clinical ledger",
    chiefComplaints: "Active Health Conditions",
    currentMedications: "Current Prescribed Medications",
    abnormalLabs: "Recent Abnormal Biomarkers",
    copyShareLink: "Copy 24h Share Link",
    linkCopied: "Link Copied!",
    expiresIn24h: "Expires in 24 Hours",
    activeAndSecure: "Active & Secure",
    qrExplainer: "Show this QR code during your clinic visit. Your physician can scan it on their mobile or tablet to instantly review this structured brief without downloading any app.",
    revokeLink: "Revoke Link Now",
    confidentialSummary: "Confidential Patient Health Summary for Clinical Consultation",
    knownAllergies: "Known Allergies",
    noneKnown: "NKDA (None Known)",
    suggestedQuestionsTitle: "Suggested Questions for This Consultation",
    briefDocName: "Brand Name",
    genericName: "Generic Equivalent",
    dosageTiming: "Dosage & Timing",
    instructions: "Instructions",
    briefQuestion1: "My HbA1c rose from 7.2% to 8.1% over 3 months despite regular Glycomet 500mg. Would a dose adjustment or combination therapy be appropriate?",
    briefQuestion2: "My total cholesterol dropped favorably to 188 mg/dL after starting Storvas 10mg. How long should I continue this dose before repeating my lipid profile?",
    briefQuestion3: "Are there any specific dietary or exercise goals I should target alongside my blood pressure regimen (Telma 40mg)?",
    briefQuestion4: "When should I schedule my next fasting blood sugar check?",
    abdmTitle: "Ayushman Bharat Digital Mission (ABDM)",
    abdmSubtitle: "FHIR R4 compliant health data exchange, ABHA linking, and patient consent ledger.",
    exportFhirBundle: "Export FHIR R4 Bundle (JSON)",
    abhaLinkedStatus: "ABHA Health ID Verified",
    consentLedger: "Consent & Audit Ledger",
    settingsTitle: "Settings & Profile Identity",
    settingsSubtitle: "Manage clinical profile, Indian regional languages, themes, and account security.",
    personalIdentity: "Personal Identity & Clinical Demographics",
    fullName: "Full Name",
    email: "Email Address",
    dob: "Date of Birth",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    phone: "Phone Number",
    abhaAddress: "ABHA Address",
    bloodGroup: "Blood Group",
    saveProfile: "Save Profile Changes",
    saving: "Saving...",
    accessibilityHeading: "Accessibility & Regional Language",
    defaultLangHeading: "Default Explanation Language",
    themeHeading: "Display Mode (Strict Light Themes)",
    accountSecurity: "Account Security & Session Management",
    readingAccessibility: "Reading Accessibility Mode",
    layoutStandard: "Standard Layout",
    layoutLargeText: "Large Text Mode (+25% Font Scale)",
    layoutSimple: "Simple Mode (Elderly Friendly)",
    patientConsentTitle: "Patient Consent Ledger",
    patientConsentDesc: "You retain absolute sovereignty over your medical data. Revoke permissions at any time.",
    consentEmergencyTitle: "Emergency Doctor QR Access",
    consentEmergencyDesc: "Allows doctors with the 24-hour token to review active medicines and critical alerts.",
    consentAbdmTitle: "ABDM Health Information Provider (HIP) Sync",
    consentAbdmDesc: "Allows encrypted record discovery in Ayushman Bharat Digital Mission sandbox.",
    consentOfflineTitle: "Offline PWA Record Caching",
    consentOfflineDesc: "Securely stores processed lab reports locally for offline consultation.",
    consentAiTitle: "Edge Function Medical Explanation",
    consentAiDesc: "Enables natural-language summarization using privacy-masked tokens.",
    auditLogTitle: "Security & Access Audit Log",
    auditLogDesc: "Cryptographically stamped ledger tracking every view, generation, and export event.",
    thEventAction: "Event Action",
    thResourceTarget: "Resource Target",
    thTimestamp: "Timestamp",
    thStatus: "Status",
    familyTitle: "Family Profiles",
    familySubtitle: "Manage separate health records, prescriptions, and lab trends for your family.",
    addFamilyMember: "+ Add Family Member",
    switchProfile: "Switch Profile",
    relationship: "Relationship",
    age: "Age",
    parent: "Parent",
    spouse: "Spouse",
    child: "Child",
    reportsCount: "reports on file",
    saveMember: "Save Profile",
    notesOptional: "Clinical Notes (Optional)",
    signInTab: "Sign In",
    signUpTab: "Create Account",
    password: "Password",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    disclaimerText: "Disclaimer: CareLens provides AI-assisted insights for educational purposes only. Never disregard professional medical advice or delay seeking it because of information found here. Always consult your doctor or certified pharmacist.",
  },

  te: {
    brandTitle: "కేర్‌లెన్స్",
    brandTagline: "AI వ్యక్తిగత ఆరోగ్య సహచరుడు",
    copilotBadge: "కోపైలట్",
    navDashboard: "డాష్‌బోర్డ్",
    navUpload: "అప్‌లోడ్ & స్కాన్",
    navTimeline: "టైమ్‌లైన్",
    navTrends: "ట్రెండ్స్ & పోకడలు",
    navMedications: "మందులు",
    navAsk: "రికార్డులను అడగండి",
    navBrief: "డాక్టర్ బ్రీఫ్",
    navAbdm: "ABDM & FHIR",
    navSettings: "సెట్టింగ్స్",
    tabHome: "హోమ్",
    tabScan: "స్కాన్",
    tabTimeline: "టైమ్‌లైన్",
    tabMeds: "మందులు",
    tabAsk: "అడగండి",
    tabBrief: "బ్రీఫ్",
    tabSettings: "సెట్టింగ్స్",
    signIn: "లాగిన్ అవ్వండి",
    self: "స్వయంగా",
    activeProfile: "ప్రస్తుత ప్రొఫైల్",
    switchUser: "ఖాతా మార్చండి / లాగిన్",
    profileSettings: "ప్రొఫైల్ & సెట్టింగ్స్",
    signOut: "లాగ్ అవుట్",
    abdmLinked: "ABDM లింక్ చేయబడింది",
    welcomeBack: "స్వాగతం",
    dashboardSubtitle: "మీ వ్యక్తిగత వైద్య టైమ్‌లైన్ తాజాకరించబడింది. 1 నివేదిక పరిశీలన అవసరం.",
    scanNewReport: "కొత్త నివేదికను స్కాన్ చేయండి",
    doctorBriefBtn: "డాక్టర్ బ్రీఫ్",
    clinicalNoticeTitle: "వైద్య శ్రద్ధ అవసరమైన గమనిక",
    clinicalNoticeSource: "ఇటీవలి సమగ్ర మెటబాలిక్ నివేదిక ఆధారంగా",
    needsReview: "పరిశీలన అవసరం",
    hba1cAlertTitle: "HbA1c స్థాయి: 8.1% (సాధారణ పరిమితి: < 5.7%)",
    high: "అధికం",
    hba1cAlertDesc: "గత 90 రోజులలో మీ సగటు రక్తంలో చక్కెర స్థాయి సాధారణ పరిమితి కంటే ఎక్కువగా ఉంది. మీ మందుల మోతాదును సమీక్షించడానికి వెంటనే మీ వైద్యుడిని సంప్రదించండి.",
    sourceVerified: "అక్టోబర్ 10, 2026 నాటి అసలు పత్రం ద్వారా ధృవీకరించబడింది",
    inspectSource: "మూల పత్రం మరియు ఆధారాలను చూడండి",
    todayAdherence: "నేటి మందుల క్రమశిక్షణ",
    taken: "తీసుకున్నారు",
    dailySchedule: "రోజువారీ షెడ్యూల్",
    morningAfterBreakfast: "ఉదయం (అల్పాహారం తర్వాత)",
    morningWithWater: "ఉదయం (నీటితో)",
    nightBedtime: "రాత్రి (పడుకునే ముందు)",
    manageTimings: "సమయాలు & రిమైండర్‌లను నిర్వహించండి",
    askRecordsCardTitle: "నా రికార్డులను అడగండి",
    askRecordsCardDesc: "తెలుగు, హిందీ, తమిళం లేదా ఇంగ్లీషులో మీ ల్యాబ్ పరీక్షలు, మందులు మరియు చారిత్రక పోకడల గురించి వాయిస్ లేదా టెక్స్ట్ ద్వారా అడగండి.",
    startMedicalQuery: "వైద్య ప్రశ్న అడగండి",
    biomarkerTrajectory: "ముఖ్యమైన బయోమార్కర్ మార్పులు",
    longitudinalComparison: "గత నివేదికతో పోలిక పరిశీలన",
    allTrends: "అన్ని ట్రెండ్స్",
    fastingSugar: "ఫాస్టింగ్ బ్లడ్ షుగర్",
    creatinine: "క్రియాటినిన్",
    totalCholesterol: "మొత్తం కొలెస్ట్రాల్",
    stableNormal: "స్థిరంగా (సాధారణం)",
    oneClickTestFlow: "ఒక్క-క్లిక్ పరీక్షా ప్రవాహం",
    tryOcrExtraction: "పూర్తి OCR మరియు విశ్లేషణను తనిఖీ చేయండి",
    seeCareLensAction: "కేర్‌లెన్స్ పనితీరును వెంటనే చూడాలనుకుంటున్నారా?",
    sampleDesc: "తెలుగు/ఇంగ్లీష్ OCR, ఆటోమేటిక్ గోప్యతా మాస్కింగ్ మరియు బహుభాషా వివరణతో కూడిన ప్రామాణిక ల్యాబ్ నివేదికను పరీక్షించండి.",
    testLabReportBtn: "సమగ్ర ల్యాబ్ రిపోర్ట్ టెస్ట్ చేయండి",
    testPrescriptionBtn: "మందుల చీటీ & పరస్పర చర్యలను టెస్ట్ చేయండి",
    scannerTitle: "సురక్షిత డాక్యుమెంట్ స్కానర్",
    scannerSubtitle: "తక్షణ క్లయింట్-సైడ్ వ్యక్తిగత సమాచార రక్షణ (PII) తో కూడిన WASM OCR మరియు వైద్య విశ్లేషణ.",
    uploadTitle: "వైద్య పత్రాన్ని అప్‌లోడ్ చేయండి",
    dragDropText: "మీ నివేదికను (JPG, PNG, PDF) ఇక్కడ లాగండి లేదా బ్రౌజ్ చేయడానికి క్లిక్ చేయండి",
    takePhoto: "ఫోటో తీయండి / కెమెరా వాడండి",
    ocrLangLabel: "OCR భాష",
    orTrySamples: "లేదా ముందే సిద్ధం చేసిన నమూనాలను పరీక్షించండి:",
    diabetesSampleTitle: "సమగ్ర మధుమేహం & లిపిడ్ ప్యానెల్ (తెలుగు & ఇంగ్లీష్)",
    cardiacSampleTitle: "ఔషధ భద్రతా హెచ్చరికతో కూడిన కార్డియాలజీ చీటీ",
    processingStatus: "పత్రం విశ్లేషించబడుతోంది...",
    privacyNotice: "క్లయింట్-సైడ్ గోప్యతా హామీ: ఆధార్, ఫోన్, ABHA మరియు చిరునామా క్లౌడ్‌కు వెళ్లే ముందే మీ బ్రౌజర్‌లోనే స్వయంచాలకంగా దాచబడతాయి.",
    verificationTitle: "వైద్య ధృవీకరణ కాన్వాస్",
    verificationSubtitle: "అసలు పత్రం నుండి వెలికితీసిన బయోమార్కర్లు మరియు మందులను సరిపోల్చండి. తక్కువ విశ్వసనీయత ఉన్న అంశాలు (<80%) హైలైట్ చేయబడతాయి.",
    confidenceScore: "విశ్వసనీయత స్కోరు",
    rawOcrText: "అసలు OCR టెక్స్ట్",
    extractedEntities: "గుర్తించిన వివరాలు",
    biomarkers: "బయోమార్కర్లు",
    medicines: "మందులు",
    approveAndContinue: "నివేదికను ఆమోదించి వివరణ పొందండి",
    reScan: "పత్రాన్ని మళ్లీ స్కాన్ చేయండి",
    stepVerification: "దశ 2 / 3: ధృవీకరణ",
    fieldsRequireReview: "ఫీల్డులను పరిశీలించాలి",
    allFieldsHighConfidence: "అన్ని వివరాలు నమ్మకంగా గుర్తించబడ్డాయి",
    verifyFindingsTitle: "వెలికితీసిన వైద్య వివరాలను ధృవీకరించండి",
    verifyFindingsDesc: "మూల పత్రంతో వెలికితీసిన ఫలితాలను సరిపోల్చండి. మూలాన్ని చూడటానికి వరుసపై క్లిక్ చేయండి.",
    cancelBtn: "రద్దు చేయండి",
    confirmSaveBtn: "ధృవీకరించి భద్రపరచండి",
    savingToInsforge: "భద్రపరుస్తోంది...",
    originalDoc: "అసలు పత్రం",
    docEvidenceTapHint: "బాక్స్‌లు లేదా వరుసలను తాకడం ద్వారా మూల ఆధారాలు కనిపిస్తాయి.",
    docDetails: "పత్ర వివరాలు",
    reportDate: "నివేదిక తేదీ",
    doctorName: "డాక్టర్ పేరు",
    clinicLab: "క్లినిక్ / ల్యాబ్",
    labResultsCount: "ల్యాబ్ ఫలితాలు",
    medsCount: "మందుల చీటీ & ఔషధాలు",
    pleaseVerify: "దయచేసి సరిచూడండి",
    testValue: "విలువ",
    testUnit: "యూనిట్",
    normalTarget: "సాధారణ పరిమితి",
    addMissingLab: "+ తప్పిపోయిన ల్యాబ్ పరీక్షను జోడించండి",
    medFrequency: "తీసుకోవలసిన సార్లు (ఉదా. 1-0-1)",
    medTiming: "సమయం / సూచనలు",
    medDuration: "వ్యవధి (రోజులు)",
    addMissingMed: "+ తప్పిపోయిన మందును జోడించండి",
    clinicalSummaryTitle: "వైద్య వివరణ & రోగి మార్గదర్శకత్వం",
    plainLanguageExplanation: "సరళమైన భాషా వివరణ",
    listenAudio: "వాయిస్ వినండి",
    stopAudio: "వాయిస్ ఆపండి",
    speaking: "ప్లే అవుతోంది:",
    drugInteractionsWarning: "ఔషధ పరస్పర చర్యల హెచ్చరికలు గుర్తించబడ్డాయి",
    saveToTimeline: "టైమ్‌లైన్‌లో భద్రపరచబడింది",
    viewSchedule: "మందుల పట్టికను చూడండి",
    viewBrief: "డాక్టర్ బ్రీఫ్ రూపొందించండి",
    documentEvidence: "పత్ర సాక్ష్యం",
    pulseSourceHint: "కుడివైపు వాక్యంపై క్లిక్ చేస్తే పత్రంలో దాని మూలం కనిపిస్తుంది.",
    readingLevelClass8: "భాష: 8వ తరగతి స్థాయి సరళమైన వివరణ",
    generatingSummary: "ఎంచుకున్న భాషలో వైద్య సారాంశం రూపొందుతోంది...",
    rulesEngineTitle: "ల్యాబ్ విశ్లేషణ మరియు కొలమానాలు",
    ageSexAdjusted: "వయస్సు & లింగ ఆధారిత సరిపోలిక",
    medicineSafetyTitle: "మందుల భద్రత మరియు పరస్పర చర్యల పరిశీలన",
    timelineTitle: "క్లినికల్ హెల్త్ టైమ్‌లైన్",
    timelineSubtitle: "ల్యాబ్ నివేదికలు, మందుల చీటీలు మరియు వైద్య సంప్రదింపుల చారిత్రక రికార్డు.",
    filterAll: "అన్ని రికార్డులు",
    filterLabs: "ల్యాబ్ నివేదికలు",
    filterPrescriptions: "మందుల చీటీలు",
    filterConsultations: "డాక్టర్ సంప్రదింపులు",
    verifiedBadge: "ధృవీకరించబడింది",
    viewReport: "నివేదిక చూడండి",
    whatChanged: "గత నివేదికతో పోలిస్తే ఏమి మారింది?",
    searchPlaceholder: "నివేదికలు, మందులు లేదా డాక్టర్ల పేర్లను వెతకండి...",
    viewEvidence: "ధృవీకరించిన ఆధారాలను చూడండి",
    hba1cDeltaDesc: "5.7% సాధారణ పరిమితిని మించి పెరిగింది. డాక్టర్ సంప్రదింపు అవసరం.",
    cholesterolDeltaDesc: "200 mg/dL లోపు సాధారణ స్థాయికి మెరుగుపడింది.",
    medRegimen: "మందుల పట్టిక",
    newAddition: "కొత్తగా చేర్చబడింది",
    storvasDeltaDesc: "రాత్రి పడుకునే ముందు అటోర్వాస్టాటిన్ 10mg అదనంగా సూచించబడింది.",
    trendsTitle: "బయోమార్కర్ అనలిటిక్స్ & దీర్ఘకాలిక ట్రెండ్స్",
    trendsSubtitle: "ప్రామాణిక భారతీయ క్లినికల్ సూచికలతో కాలక్రమేణా మీ ఆరోగ్య పారామితులను విశ్లేషించండి.",
    normalRange: "సాధారణ పరిధి",
    latestValue: "తాజా విలువ",
    targetGoal: "లక్ష్య విలువ",
    statusNormal: "సాధారణం",
    statusHigh: "అధికం",
    statusLow: "తక్కువ",
    statusCriticalHigh: "తీవ్రమైన అధికం",
    statusCriticalLow: "తీవ్రమైన తక్కువ",
    statusBorderline: "బోర్డర్‌లైన్ (సరిహద్దు)",
    selectTest: "పరీక్షను ఎంచుకోండి",
    currentStatus: "ప్రస్తుత స్థితి",
    vsPriorTest: "గత పరీక్షతో పోలిస్తే",
    normalBand: "సాధారణ పరిధి",
    measuredValues: "కొలిచిన విలువలు",
    trendCurve: "దీర్ఘకాలిక మార్పుల గ్రాఫ్",
    trendInfoNote: "ఆహారం, జీవనశైలి మరియు మందులు సక్రమంగా వాడటంపై ఈ విలువలు ఆధారపడి ఉంటాయి.",
    medsTitle: "ప్రస్తుత మందులు & సమయపాలన పట్టిక",
    medsSubtitle: "భారతీయ ఔషధాల మోతాదు సమయాలు, ఆహార పరస్పర చర్యలు మరియు పాటించే విధానం.",
    markTaken: "తీసుకున్నట్లు గుర్తించండి",
    downloadCalendar: "క్యాలెండర్ డౌన్‌లోడ్ (.ics)",
    drugInteractions: "ఔషధ పరస్పర చర్యలు",
    foodTiming: "ఆహార సమయం",
    morningSlot: "ఉదయం (08:00 - 09:30)",
    afternoonSlot: "మధ్యాహ్నం (01:00 - 02:00)",
    nightSlot: "రాత్రి / నిద్రపోయే ముందు (08:30 - 10:00)",
    sosSlot: "అవసరమైనప్పుడు మాత్రమే (SOS)",
    medSafetyAlertsTitle: "ఔషధ పరస్పర చర్యల హెచ్చరికలు",
    dosesTaken: "మోతాదులు తీసుకున్నారు",
    adherenceNote: "క్రమం తప్పకుండా సమయానికి మందులు వేసుకోవడం ద్వారా సరైన ఫలితం ఉంటుంది.",
    askTitle: "నా ఆరోగ్య రికార్డులను అడగండి",
    askSubtitle: "మీ ల్యాబ్ పరీక్షలు, మందులు మరియు వైద్య చరిత్రపై సహజ భాషా మరియు వాయిస్ ప్రశ్నలు.",
    askPlaceholder: "ప్రశ్న అడగండి (ఉదా: 'నా తాజా HbA1c ఎంత?' లేదా 'నా మందులకు ఏవైనా సైడ్ ఎఫెక్ట్స్ ఉన్నాయా?')...",
    sendQuery: "ప్రశ్న పంపండి",
    clearChat: "చాట్ క్లియర్ చేయండి",
    suggestedQuestions: "సూచించిన ప్రశ్నలు",
    sampleQ1: "నా రక్తంలో చక్కెర అదుపులో ఉందా?",
    sampleQ2: "ఉదయం పూట నేను వేసుకోవాల్సిన మందులు ఏమిటి?",
    sampleQ3: "నా మందులతో ఆహార పరస్పర చర్యలు ఏమైనా ఉన్నాయా?",
    briefTitle: "డాక్టర్ విజిట్ బ్రీఫ్",
    briefSubtitle: "మీ వైద్యుని కోసం క్రిప్టోగ్రాఫికల్ సంతకం చేసిన QR కోడ్‌తో కూడిన 1-పేజీ సంక్షిప్త నివేదిక.",
    printPdf: "ప్రింట్ / PDF భద్రపరచండి",
    scanQrNotice: "ధృవీకరించబడిన వైద్య వివరాలను చూడటానికి QR కోడ్‌ను స్కాన్ చేయండి",
    chiefComplaints: "ప్రస్తుత ఆరోగ్య పరిస్థితులు",
    currentMedications: "ప్రస్తుతం సూచించిన మందులు",
    abnormalLabs: "ఇటీవలి అసాధారణ బయోమార్కర్లు",
    copyShareLink: "24 గంటల లింక్ కాపీ చేయండి",
    linkCopied: "లింక్ కాపీ చేయబడింది!",
    expiresIn24h: "24 గంటల్లో ముగుస్తుంది",
    activeAndSecure: "సురక్షితంగా అందుబాటులో ఉంది",
    qrExplainer: "డాక్టర్ వద్దకు వెళ్ళినప్పుడు ఈ QR కోడ్‌ను చూపించండి. మీ డాక్టర్ దీన్ని స్కాన్ చేసి యాప్ అవసరం లేకుండానే మీ సంక్షిప్త ఆరోగ్య వివరాలను చూడవచ్చు.",
    revokeLink: "లింక్‌ను వెంటనే రద్దు చేయండి",
    confidentialSummary: "వైద్య సంప్రదింపుల కోసం రహస్య ఆరోగ్య సారాంశం",
    knownAllergies: "అలెర్జీలు",
    noneKnown: "ఏవీ లేవు (NKDA)",
    suggestedQuestionsTitle: "డాక్టర్‌ను అడగవలసిన ముఖ్యమైన ప్రశ్నలు",
    briefDocName: "మందు పేరు",
    genericName: "జనరిక్ ఫార్ములా",
    dosageTiming: "మోతాదు & సమయం",
    instructions: "సూచనలు",
    briefQuestion1: "రోజూ గ్లైకోమెట్ 500mg తీసుకుంటున్నప్పటికీ నా HbA1c 7.2% నుండి 8.1% కి పెరిగింది. మోతాదు మార్చాలా లేదా ఇతర మందులు కలపాలా?",
    briefQuestion2: "స్టోర్వాస్ 10mg వాడిన తర్వాత నా కొలెస్ట్రాల్ 188 mg/dL కు తగ్గింది. తదుపరి పరీక్ష ఎప్పుడు చేయించాలి?",
    briefQuestion3: "టెల్మా 40mg బీపీ మందుతో పాటు నేను పాటించవలసిన ఆహార లేదా వ్యాయామ నియమాలు ఏమిటి?",
    briefQuestion4: "నా తదుపరి ఫాస్టింగ్ షుగర్ పరీక్షను ఎప్పుడు షెడ్యూల్ చేసుకోవాలి?",
    abdmTitle: "ఆయుష్మాన్ భారత్ డిజిటల్ మిషన్ (ABDM)",
    abdmSubtitle: "FHIR R4 ఆధారిత ఆరోగ్య సమాచార మార్పిడి, ABHA లింకింగ్ మరియు రోగి అనుమతుల రికార్డు.",
    exportFhirBundle: "FHIR R4 బండిల్ ఎగుమతి చేయండి (JSON)",
    abhaLinkedStatus: "ABHA హెల్త్ ID ధృవీకరించబడింది",
    consentLedger: "అనుమతి మరియు ఆడిట్ లెడ్జర్",
    settingsTitle: "సెట్టింగ్స్ & ప్రొఫైల్ గుర్తింపు",
    settingsSubtitle: "మీ వైద్య ప్రొఫైల్, భారతీయ ప్రాంతీయ భాషలు, థీమ్‌లు మరియు భద్రతను నిర్వహించండి.",
    personalIdentity: "వ్యక్తిగత గుర్తింపు & డెమోగ్రాఫిక్స్",
    fullName: "పూర్తి పేరు",
    email: "ఇమెయిల్ చిరునామా",
    dob: "పుట్టిన తేదీ",
    gender: "లింగం",
    male: "పురుషుడు",
    female: "స్త్రీ",
    other: "ఇతర",
    phone: "ఫోన్ నంబర్",
    abhaAddress: "ABHA చిరునామా",
    bloodGroup: "రక్త గ్రూపు",
    saveProfile: "ప్రొఫైల్ మార్పులను భద్రపరచండి",
    saving: "భద్రపరుస్తోంది...",
    accessibilityHeading: "యాక్సెసిబిలిటీ & ప్రాంతీయ భాష",
    defaultLangHeading: "డిఫాల్ట్ వివరణ భాష",
    themeHeading: "ప్రదర్శన మోడ్ (లైట్ థీమ్‌లు మాత్రమే)",
    accountSecurity: "ఖాతా భద్రత & సెషన్ నిర్వహణ",
    readingAccessibility: "చదివే సౌలభ్యం / రీడింగ్ మోడ్",
    layoutStandard: "సాధారణ లేఅవుట్",
    layoutLargeText: "పెద్ద అక్షరాల మోడ్ (+25%)",
    layoutSimple: "సరళమైన మోడ్ (పెద్దవారికి అనుకూలం)",
    patientConsentTitle: "రోగి డేటా అనుమతుల రికార్డు",
    patientConsentDesc: "మీ వైద్య సమాచారంపై మీకు పూర్తి హక్కు ఉంటుంది. ఎప్పుడైనా అనుమతులను మార్చవచ్చు.",
    consentEmergencyTitle: "అత్యవసర డాక్టర్ QR యాక్సెస్",
    consentEmergencyDesc: "24 గంటల టోకెన్ ఉన్న డాక్టర్లు మీ ప్రస్తుత మందులు మరియు హెచ్చరికలను చూడటానికి అనుమతిస్తుంది.",
    consentAbdmTitle: "ABDM ఆరోగ్య సమాచార సమకాలీకరణ",
    consentAbdmDesc: "ఆయుష్మాన్ భారత్ డిజిటల్ మిషన్‌లో సురక్షితంగా రికార్డులను అన్వేషించడానికి అనుమతిస్తుంది.",
    consentOfflineTitle: "ఆఫ్‌లైన్ రికార్డుల నిల్వ",
    consentOfflineDesc: "ఇంటర్నెట్ లేకపోయినా నివేదికలు కనిపించేలా ఫోన్‌లో భద్రపరుస్తుంది.",
    consentAiTitle: "AI వైద్య వివరణ",
    consentAiDesc: "గోప్యత కాపాడుతూ మీ భాషలో సులభ వివరణను అందిస్తుంది.",
    auditLogTitle: "భద్రత మరియు యాక్సెస్ లాగ్",
    auditLogDesc: "ప్రతి యాక్సెస్ మరియు డౌన్‌లోడ్ వివరాలు ఇక్కడ సురక్షితంగా నమోదవుతాయి.",
    thEventAction: "కార్యం",
    thResourceTarget: "విభాగం",
    thTimestamp: "సమయం",
    thStatus: "స్థితి",
    familyTitle: "కుటుంబ ప్రొఫైల్స్",
    familySubtitle: "మీ కుటుంబ సభ్యుల కోసం ప్రత్యేక ఆరోగ్య రికార్డులు, మందులు మరియు పరీక్షలను నిర్వహించండి.",
    addFamilyMember: "+ కుటుంబ సభ్యుడిని చేర్చండి",
    switchProfile: "ప్రొఫైల్ మార్చండి",
    relationship: "సంబంధం",
    age: "వయస్సు",
    parent: "తల్లిదండ్రులు",
    spouse: "జీవిత భాగస్వామి",
    child: "పిల్లలు",
    reportsCount: "నివేదికలు నమోదయ్యాయి",
    saveMember: "ప్రొఫైల్ భద్రపరచండి",
    notesOptional: "వైద్య గమనికలు (ఐచ్ఛికం)",
    signInTab: "లాగిన్",
    signUpTab: "ఖాతా తెరవండి",
    password: "పాస్‌వర్డ్",
    dontHaveAccount: "ఖాతా లేదా?",
    alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా?",
    disclaimerText: "గమనిక: కేర్‌లెన్స్ విద్యా మరియు సమాచార ప్రయోజనాల కోసం మాత్రమే AI-సహాయక సమాచారాన్ని అందిస్తుంది. ఇది వైద్య నిర్ధారణ కాదు. చికిత్స కోసం ఎల్లప్పుడూ మీ వైద్యుడిని సంప్రదించండి.",
  },

  hi: {
    brandTitle: "केयरलेंस",
    brandTagline: "AI व्यक्तिगत स्वास्थ्य सहायक",
    copilotBadge: "कोपायलट",
    navDashboard: "डैशबोर्ड",
    navUpload: "अपलोड और स्कैन",
    navTimeline: "समयरेखा",
    navTrends: "ट्रेंड्स",
    navMedications: "दवाएं",
    navAsk: "रिकॉर्ड से पूछें",
    navBrief: "विजिट ब्रीफ",
    navAbdm: "ABDM & FHIR",
    navSettings: "सेटिंग्स",
    tabHome: "होम",
    tabScan: "स्कैन",
    tabTimeline: "टाइमलाइन",
    tabMeds: "दवाएं",
    tabAsk: "पूछें",
    tabBrief: "ब्रीफ",
    tabSettings: "सेटिंग्स",
    signIn: "साइन इन",
    self: "स्वयं",
    activeProfile: "सक्रिय प्रोफ़ाइल",
    switchUser: "उपयोगकर्ता बदलें / लॉगिन",
    profileSettings: "प्रोफ़ाइल और सेटिंग्स",
    signOut: "साइन आउट",
    abdmLinked: "ABDM लिंक है",
    welcomeBack: "वापसी पर स्वागत है",
    dashboardSubtitle: "आपकी स्वास्थ्य समयरेखा अपडेट है। 1 रिपोर्ट की समीक्षा आवश्यक है।",
    scanNewReport: "नई रिपोर्ट स्कैन करें",
    doctorBriefBtn: "डॉक्टर ब्रीफ",
    clinicalNoticeTitle: "चिकित्सीय ध्यान सूचना",
    clinicalNoticeSource: "हालिया मेटाबॉलिक रिपोर्ट से",
    needsReview: "समीक्षा आवश्यक",
    hba1cAlertTitle: "HbA1c स्तर: 8.1% (सामान्य लक्ष्य: < 5.7%)",
    high: "उच्च",
    hba1cAlertDesc: "पिछले 90 दिनों में आपका औसत रक्त शर्करा स्तर सामान्य से अधिक है। अपनी दवा की खुराक पर चर्चा करने के लिए तुरंत अपने डॉक्टर से संपर्क करें।",
    sourceVerified: "10 अक्टूबर 2026 को सत्यापित मूल दस्तावेज़",
    inspectSource: "मूल दस्तावेज़ और साक्ष्य देखें",
    todayAdherence: "आज की दवा अनुपालन",
    taken: "ली गई",
    dailySchedule: "दैनिक अनुसूची",
    morningAfterBreakfast: "सुबह (नाश्ते के बाद)",
    morningWithWater: "सुबह (पानी के साथ)",
    nightBedtime: "रात (सोने से पहले)",
    manageTimings: "समय और अनुस्मारक प्रबंधित करें",
    askRecordsCardTitle: "मेरे रिकॉर्ड से पूछें",
    askRecordsCardDesc: "हिंदी, तेलुगु, तमिल या अंग्रेजी में आवाज या टेक्स्ट के साथ अपने लैब मूल्यों, दवाओं या ऐतिहासिक रुझानों के बारे में पूछें।",
    startMedicalQuery: "चिकित्सा प्रश्न पूछें",
    biomarkerTrajectory: "प्रमुख बायोमार्कर रुझान",
    longitudinalComparison: "पिछली रिपोर्ट से तुलना",
    allTrends: "सभी रुझान",
    fastingSugar: "फास्टिंग शुगर",
    creatinine: "क्रिएटिनिन",
    totalCholesterol: "कुल कोलेस्ट्रॉल",
    stableNormal: "स्थिर (सामान्य)",
    oneClickTestFlow: "एक-क्लिक परीक्षण प्रवाह",
    tryOcrExtraction: "पूर्ण एंड-टू-एंड ओसीआर और निष्कर्षण आज़माएं",
    seeCareLensAction: "क्या आप केयरलेंस को तुरंत काम करते देखना चाहते हैं?",
    sampleDesc: "हिंदी/अंग्रेजी ओसीआर, स्वचालित गोपनीयता मास्किंग और बहुभाषी व्याख्या के साथ वास्तविक रिपोर्ट लोड करें।",
    testLabReportBtn: "व्यापक लैब रिपोर्ट का परीक्षण करें",
    testPrescriptionBtn: "दवा सुरक्षा चेतावनी के साथ प्रिस्क्रिप्शन जांचें",
    scannerTitle: "सुरक्षित दस्तावेज़ स्कैनर",
    scannerSubtitle: "क्लाइंट-साइड गोपनीयता सुरक्षा (PII मास्किंग) के साथ टेसरैक्ट ओसीआर।",
    uploadTitle: "मेडिकल दस्तावेज़ अपलोड करें",
    dragDropText: "अपनी रिपोर्ट (JPG, PNG, PDF) खींचें और छोड़ें या ब्राउज़ करने के लिए क्लिक करें",
    takePhoto: "फोटो लें / कैमरा उपयोग करें",
    ocrLangLabel: "ओसीआर भाषा",
    orTrySamples: "या पहले से लोड किए गए नमूनों का परीक्षण करें:",
    diabetesSampleTitle: "व्यापक मधुमेह और लिपिड पैनल",
    cardiacSampleTitle: "कार्डियोलॉजी प्रिस्क्रिप्शन",
    processingStatus: "दस्तावेज़ संसाधित हो रहा है...",
    privacyNotice: "क्लाइंट-साइड गोपनीयता गारंटी: आधार, फोन, ABHA क्लाउड पर भेजे जाने से पहले आपके ब्राउज़र में ही स्वचालित रूप से सुरक्षित कर दिए जाते हैं।",
    verificationTitle: "नैदानिक सत्यापन कैनवास",
    verificationSubtitle: "मूल दस्तावेज़ से निकाले गए बायोमार्कर और दवाओं का सत्यापन करें।",
    confidenceScore: "विश्वसनीयता स्कोर",
    rawOcrText: "मूल ओसीआर टेक्स्ट",
    extractedEntities: "निकाले गए विवरण",
    biomarkers: "बायोमार्कर",
    medicines: "दवाएं",
    approveAndContinue: "स्वीकृत करें और व्याख्या प्राप्त करें",
    reScan: "दस्तावेज़ को फिर से स्कैन करें",
    stepVerification: "चरण 2 / 3: सत्यापन",
    fieldsRequireReview: "फ़ील्ड की समीक्षा आवश्यक है",
    allFieldsHighConfidence: "सभी विवरण उच्च विश्वसनीयता के साथ पहचाने गए",
    verifyFindingsTitle: "निकाले गए मेडिकल निष्कर्षों को सत्यापित करें",
    verifyFindingsDesc: "मूल दस्तावेज़ से निकाले गए परिणामों की तुलना करें। स्रोत देखने के लिए किसी भी पंक्ति पर क्लिक करें।",
    cancelBtn: "रद्द करें",
    confirmSaveBtn: "पुष्टि करें और सहेजें",
    savingToInsforge: "सहेजा जा रहा है...",
    originalDoc: "मूल दस्तावेज़",
    docEvidenceTapHint: "बॉक्स या पंक्तियों को छूने से मूल स्रोत हाइलाइट होता है।",
    docDetails: "दस्तावेज़ विवरण",
    reportDate: "रिपोर्ट तिथि",
    doctorName: "डॉक्टर का नाम",
    clinicLab: "क्लिनिक / लैब",
    labResultsCount: "लैब परिणाम",
    medsCount: "दवाएं और प्रिस्क्रिप्शन",
    pleaseVerify: "कृपया सत्यापित करें",
    testValue: "मान",
    testUnit: "इकाई",
    normalTarget: "सामान्य सीमा",
    addMissingLab: "+ छूटा हुआ लैब टेस्ट जोड़ें",
    medFrequency: "खुराक (जैसे 1-0-1)",
    medTiming: "समय / निर्देश",
    medDuration: "अवधि",
    addMissingMed: "+ छूटी हुई दवा जोड़ें",
    clinicalSummaryTitle: "चिकित्सीय व्याख्या और रोगी मार्गदर्शन",
    plainLanguageExplanation: "सरल भाषा में व्याख्या",
    listenAudio: "ऑडियो सुनें",
    stopAudio: "ऑडियो रोकें",
    speaking: "ऑडियो चल रहा है:",
    drugInteractionsWarning: "संभावित दवा अंतःक्रियाएं पाई गईं",
    saveToTimeline: "स्वास्थ्य समयरेखा में सहेजा गया",
    viewSchedule: "दवा अनुसूची देखें",
    viewBrief: "डॉक्टर ब्रीफ तैयार करें",
    documentEvidence: "दस्तावेज़ साक्ष्य",
    pulseSourceHint: "स्रोत देखने के लिए दाईं ओर किसी भी वाक्य पर क्लिक करें।",
    readingLevelClass8: "पठन स्तर: कक्षा 8 सरल भाषा",
    generatingSummary: "चुनी गई भाषा में सरल चिकित्सीय सारांश तैयार हो रहा है...",
    rulesEngineTitle: "लैब बायोमार्कर मूल्यांकन",
    ageSexAdjusted: "उम्र और लिंग समायोजित",
    medicineSafetyTitle: "दवा सुरक्षा और परस्पर प्रभाव जांच",
    timelineTitle: "क्लीनिकल हेल्थ टाइमलाइन",
    timelineSubtitle: "लैब रिपोर्ट, नुस्खे और परामर्श का कालानुक्रमिक रिकॉर्ड।",
    filterAll: "सभी रिकॉर्ड",
    filterLabs: "लैब रिपोर्ट",
    filterPrescriptions: "प्रिस्क्रिप्शन",
    filterConsultations: "परामर्श",
    verifiedBadge: "सत्यापित",
    viewReport: "रिपोर्ट देखें",
    whatChanged: "पिछली रिपोर्ट से क्या बदलाव आया?",
    searchPlaceholder: "रिपोर्ट, दवाएं या डॉक्टर खोजें...",
    viewEvidence: "सत्यापित साक्ष्य देखें",
    hba1cDeltaDesc: "5.7% के लक्ष्य से अधिक। डॉक्टर की समीक्षा अनुशंसित है।",
    cholesterolDeltaDesc: "200 mg/dL से नीचे सामान्य सीमा में सुधरा।",
    medRegimen: "दवा अनुसूची",
    newAddition: "नई दवा जोड़ी गई",
    storvasDeltaDesc: "रात को एटोरवास्टेटिन 10mg अतिरिक्त जोड़ी गई।",
    trendsTitle: "बायोमार्कर एनालिटिक्स और रुझान",
    trendsSubtitle: "मानक संदर्भ सीमाओं के साथ समय के साथ अपने स्वास्थ्य मापदंडों की कल्पना करें।",
    normalRange: "सामान्य संदर्भ सीमा",
    latestValue: "नवीनतम मूल्य",
    targetGoal: "लक्ष्य मान",
    statusNormal: "सामान्य",
    statusHigh: "उच्च",
    statusLow: "निम्न",
    statusCriticalHigh: "गंभीर उच्च",
    statusCriticalLow: "गंभीर निम्न",
    statusBorderline: "सीमावर्ती (बॉर्डरलाइन)",
    selectTest: "परीक्षण चुनें",
    currentStatus: "वर्तमान स्थिति",
    vsPriorTest: "पिछली जांच की तुलना में",
    normalBand: "सामान्य संदर्भ सीमा",
    measuredValues: "मापे गए मान",
    trendCurve: "दीर्घकालिक रुझान ग्राफ",
    trendInfoNote: "आहार, जीवनशैली और नियमित दवा के अनुसार इन मूल्यों में उतार-चढ़ाव होता है।",
    medsTitle: "सक्रिय दवाएं और खुराक अनुसूची",
    medsSubtitle: "खुराक के समय, भोजन के साथ अंतःक्रियाएं और दवा ट्रैकिंग।",
    markTaken: "दवा ली गई के रूप में चिह्नित करें",
    downloadCalendar: "कैलेंडर डाउनलोड करें (.ics)",
    drugInteractions: "दवा अंतःक्रियाएं",
    foodTiming: "भोजन का समय",
    morningSlot: "सुबह (08:00 - 09:30)",
    afternoonSlot: "दोपहर (01:00 - 02:00)",
    nightSlot: "रात / सोने से पहले (08:30 - 10:00)",
    sosSlot: "आवश्यकता पड़ने पर (SOS)",
    medSafetyAlertsTitle: "दवा सुरक्षा चेतावनी",
    dosesTaken: "खुराक ली गई",
    adherenceNote: "समय पर दवा लेने से बेहतर प्रभाव पड़ता है।",
    askTitle: "मेरे स्वास्थ्य रिकॉर्ड से पूछें",
    askSubtitle: "अपने परीक्षणों और दवाओं पर प्राकृतिक भाषा और आवाज के साथ प्रश्न पूछें।",
    askPlaceholder: "प्रश्न पूछें (जैसे: 'मेरा नवीनतम HbA1c क्या है?')...",
    sendQuery: "प्रश्न भेजें",
    clearChat: "चैट साफ़ करें",
    suggestedQuestions: "सुझाए गए प्रश्न",
    sampleQ1: "क्या मेरी ब्लड शुगर नियंत्रण में है?",
    sampleQ2: "मेरी सुबह की दवाएं क्या हैं?",
    sampleQ3: "क्या मेरी दवाओं के साथ कोई खाद्य अंतःक्रिया है?",
    briefTitle: "डॉक्टर विजिट ब्रीफ",
    briefSubtitle: "आपके चिकित्सक के लिए क्यूआर कोड के साथ 1-पृष्ठ का संक्षिप्त सारांश।",
    printPdf: "प्रिंट / पीडीएफ सहेजें",
    scanQrNotice: "सत्यापित रिकॉर्ड देखने के लिए क्यूआर कोड स्कैन करें",
    chiefComplaints: "सक्रिय स्वास्थ्य स्थितियां",
    currentMedications: "वर्तमान निर्धारित दवाएं",
    abnormalLabs: "हाल के असामान्य बायोमार्कर",
    copyShareLink: "24 घंटे का लिंक कॉपी करें",
    linkCopied: "लिंक कॉपी हो गया!",
    expiresIn24h: "24 घंटे में समाप्त होगा",
    activeAndSecure: "सक्रिय और सुरक्षित",
    qrExplainer: "क्लीनिक विजिट के दौरान यह क्यूआर कोड दिखाएं। डॉक्टर बिना किसी ऐप के इसे स्कैन कर संक्षिप्त स्वास्थ्य विवरण देख सकते हैं।",
    revokeLink: "लिंक तुरंत रद्द करें",
    confidentialSummary: "चिकित्सीय परामर्श के लिए गोपनीय स्वास्थ्य सारांश",
    knownAllergies: "एलर्जी",
    noneKnown: "कोई ज्ञात नहीं (NKDA)",
    suggestedQuestionsTitle: "डॉक्टर से पूछने योग्य महत्वपूर्ण प्रश्न",
    briefDocName: "दवा का नाम",
    genericName: "जेनेरिक नाम",
    dosageTiming: "खुराक और समय",
    instructions: "निर्देश",
    briefQuestion1: "ग्लाइकोमेट 500mg नियमित लेने के बावजूद HbA1c 7.2% से 8.1% हो गया। क्या खुराक में बदलाव की आवश्यकता है?",
    briefQuestion2: "स्टोरवास 10mg शुरू करने के बाद कोलेस्ट्रॉल 188 mg/dL पर आ गया। यह दवा कब तक जारी रखनी है?",
    briefQuestion3: "रक्तचाप की दवा (टेलमा 40mg) के साथ किन आहार और व्यायाम नियमों का पालन करना चाहिए?",
    briefQuestion4: "अगली फास्टिंग ब्लड शुगर जांच कब करानी चाहिए?",
    abdmTitle: "आयुष्मान भारत डिजिटल मिशन (ABDM)",
    abdmSubtitle: "FHIR R4 स्वास्थ्य डेटा विनिमय, ABHA लिंकिंग और सहमति बहीखाता।",
    exportFhirBundle: "FHIR R4 बंडल निर्यात करें (JSON)",
    abhaLinkedStatus: "ABHA स्वास्थ्य आईडी सत्यापित",
    consentLedger: "सहमति और ऑडिट लेज़र",
    settingsTitle: "सेटिंग्स और प्रोफ़ाइल पहचान",
    settingsSubtitle: "अपनी नैदानिक प्रोफ़ाइल, भाषाएं और सुरक्षा प्रबंधित करें।",
    personalIdentity: "व्यक्तिगत पहचान और विवरण",
    fullName: "पूरा नाम",
    email: "ईमेल पता",
    dob: "जन्म तिथि",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    phone: "फ़ोन नंबर",
    abhaAddress: "ABHA पता",
    bloodGroup: "रक्त समूह",
    saveProfile: "परिवर्तन सहेजें",
    saving: "सहेजा जा रहा है...",
    accessibilityHeading: "अभिगम्यता और भाषा",
    defaultLangHeading: "डिफ़ॉल्ट भाषा",
    themeHeading: "प्रदर्शन मोड (केवल लाइट थीम)",
    accountSecurity: "खाता सुरक्षा",
    readingAccessibility: "अभिगम्यता और पठन मोड",
    layoutStandard: "मानक लेआउट",
    layoutLargeText: "बड़े अक्षरों का मोड (+25%)",
    layoutSimple: "सरल मोड (वरिष्ठ नागरिकों के लिए)",
    patientConsentTitle: "मरीज़ सहमति लेज़र",
    patientConsentDesc: "अपने मेडिकल डेटा पर आपका पूरा नियंत्रण है। कभी भी अनुमति वापस ले सकते हैं।",
    consentEmergencyTitle: "आपातकालीन डॉक्टर क्यूआर एक्सेस",
    consentEmergencyDesc: "24 घंटे के टोकन वाले डॉक्टरों को सक्रिय दवाएं देखने की अनुमति देता है।",
    consentAbdmTitle: "ABDM स्वास्थ्य सूचना प्रदाता (HIP) सिंक",
    consentAbdmDesc: "आयुष्मान भारत डिजिटल मिशन में एन्क्रिप्टेड रिकॉर्ड खोज की अनुमति देता है।",
    consentOfflineTitle: "ऑफ़लाइन रिकॉर्ड कैशिंग",
    consentOfflineDesc: "इंटरनेट के बिना भी देखने के लिए रिपोर्ट को स्थानीय रूप से सहेजता है।",
    consentAiTitle: "AI मेडिकल व्याख्या",
    consentAiDesc: "गोपनीयता बनाए रखते हुए आपकी भाषा में सरल सारांश तैयार करता है।",
    auditLogTitle: "सुरक्षा और एक्सेस ऑडिट लॉग",
    auditLogDesc: "हर व्यू और निर्यात घटना को ट्रैक करने वाला सुरक्षित बहीखाता।",
    thEventAction: "इवेंट एक्शन",
    thResourceTarget: "संसाधन",
    thTimestamp: "समय",
    thStatus: "स्थिति",
    familyTitle: "पारिवारिक प्रोफ़ाइल",
    familySubtitle: "अपने परिवार के लिए अलग स्वास्थ्य रिकॉर्ड, दवाएं और रुझान प्रबंधित करें।",
    addFamilyMember: "+ परिवार का सदस्य जोड़ें",
    switchProfile: "प्रोफ़ाइल बदलें",
    relationship: "संबंध",
    age: "आयु",
    parent: "माता-पिता",
    spouse: "जीवनसाथी",
    child: "बच्चा",
    reportsCount: "रिपोर्ट दर्ज हैं",
    saveMember: "प्रोफ़ाइल सहेजें",
    notesOptional: "चिकित्सीय नोट्स (वैकल्पिक)",
    signInTab: "साइन इन करें",
    signUpTab: "खाता बनाएं",
    password: "पासवर्ड",
    dontHaveAccount: "खाता नहीं है?",
    alreadyHaveAccount: "पहले से खाता है?",
    disclaimerText: "अस्वीकरण: केयरलेंस केवल शैक्षिक उद्देश्यों के लिए एआई-सहायता प्राप्त जानकारी प्रदान करता है। किसी भी इलाज के लिए हमेशा अपने डॉक्टर से परामर्श करें।",
  },

  ta: {
    brandTitle: "கேர்லென்ஸ்",
    brandTagline: "AI தனிப்பட்ட சுகாதார வழிகாட்டி",
    copilotBadge: "கோபைலட்",
    navDashboard: "டாஷ்போர்டு",
    navUpload: "பதிவேற்றம் & ஸ்கேன்",
    navTimeline: "காலவரிசை",
    navTrends: "போக்குகள்",
    navMedications: "மருந்துகள்",
    navAsk: "கேட்கவும்",
    navBrief: "மருத்துவர் சுருக்கம்",
    navAbdm: "ABDM & FHIR",
    navSettings: "அமைப்புகள்",
    tabHome: "முகப்பு",
    tabScan: "ஸ்கேன்",
    tabTimeline: "காலவரிசை",
    tabMeds: "மருந்துகள்",
    tabAsk: "கேட்க",
    tabBrief: "சுருக்கம்",
    tabSettings: "அமைப்புகள்",
    signIn: "உள்நுழைய",
    self: "சுய",
    activeProfile: "செயலில் உள்ள சுயவிவரம்",
    switchUser: "பயனர் மாற்றம் / உள்நுழைவு",
    profileSettings: "சுயவிவரம் & அமைப்புகள்",
    signOut: "வெளியேறு",
    abdmLinked: "ABDM இணைக்கப்பட்டது",
    welcomeBack: "மீண்டும் வருக",
    dashboardSubtitle: "உங்கள் சுகாதார காலவரிசை புதுப்பிக்கப்பட்டுள்ளது. 1 அறிக்கை மதிப்பாய்வு தேவை.",
    scanNewReport: "புதிய அறிக்கையை ஸ்கேன் செய்க",
    doctorBriefBtn: "மருத்துவர் சுருக்கம்",
    clinicalNoticeTitle: "மருத்துவ கவனக் குறிப்பு",
    clinicalNoticeSource: "சமீபத்திய வளர்சிதை மாற்ற அறிக்கையிலிருந்து",
    needsReview: "மதிப்பாய்வு தேவை",
    hba1cAlertTitle: "HbA1c அளவு: 8.1% (இயல்பான இலக்கு: < 5.7%)",
    high: "அதிகம்",
    hba1cAlertDesc: "கடந்த 90 நாட்களில் உங்கள் சராசரி இரத்த சர்க்கரை அளவு இயல்பை விட அதிகமாக உள்ளது. உங்கள் மருத்துவரை அணுகவும்.",
    sourceVerified: "அக்டோபர் 10, 2026 அன்று சரிபார்க்கப்பட்ட அசல் ஆவணம்",
    inspectSource: "ஆவண சான்றுகளைக் காண்க",
    todayAdherence: "இன்றைய மருந்து உட்கொள்ளல்",
    taken: "எடுக்கப்பட்டது",
    dailySchedule: "தினசரி அட்டவணை",
    morningAfterBreakfast: "காலை (காலை உணவுக்குப் பின்)",
    morningWithWater: "காலை (நீருடன்)",
    nightBedtime: "இரவு (தூங்குவதற்கு முன்)",
    manageTimings: "நேரங்களை நிர்வகிக்கவும்",
    askRecordsCardTitle: "பதிவுகளிலிருந்து கேட்கவும்",
    askRecordsCardDesc: "தமிழ், தெலுங்கு, இந்தி அல்லது ஆங்கிலத்தில் உங்கள் அறிக்கைகள் குறித்து கேட்கவும்.",
    startMedicalQuery: "மருத்துவ கேள்வியை தொடங்குங்கள்",
    biomarkerTrajectory: "முக்கிய பயோமார்க்கர் போக்கு",
    longitudinalComparison: "முந்தைய அறிக்கையுடன் ஒப்பீடு",
    allTrends: "அனைத்து போக்குகள்",
    fastingSugar: "வெறும் வயிற்று சர்க்கரை",
    creatinine: "கிரியேட்டினின்",
    totalCholesterol: "மொத்த கொலஸ்ட்ரால்",
    stableNormal: "நிலையானது (இயல்பு)",
    oneClickTestFlow: "ஒரு-கிளிக் சோதனை ஓட்டம்",
    tryOcrExtraction: "முழு OCR மற்றும் பிரித்தெடுத்தலை சோதிக்கவும்",
    seeCareLensAction: "கேர்லென்ஸை உடனடியாக சோதிக்க விரும்புகிறீர்களா?",
    sampleDesc: "தமிழ்/ஆங்கில OCR மற்றும் பாதுகாப்புடன் கூடிய அறிக்கையை சோதிக்கவும்.",
    testLabReportBtn: "ஆய்வக அறிக்கையை சோதிக்கவும்",
    testPrescriptionBtn: "மருந்து சீட்டை சோதிக்கவும்",
    scannerTitle: "பாதுகாப்பான ஆவண ஸ்கேனர்",
    scannerSubtitle: "தகவல் பாதுகாப்புடன் கூடிய WASM OCR.",
    uploadTitle: "மருத்துவ ஆவணத்தைப் பதிவேற்றவும்",
    dragDropText: "அறிக்கையை இழுத்து விடவும் அல்லது தேர்வு செய்ய கிளிக் செய்யவும்",
    takePhoto: "புகைப்படம் எடுக்கவும்",
    ocrLangLabel: "OCR மொழி",
    orTrySamples: "மாதிரிகளை சோதிக்கவும்:",
    diabetesSampleTitle: "நீரிழிவு & கொழுப்பு அறிக்கை",
    cardiacSampleTitle: "இதயவியல் மருந்து சீட்டு",
    processingStatus: "ஆவணம் செயலாக்கப்படுகிறது...",
    privacyNotice: "தனியுரிமை உத்தரவாதம்: உங்கள் தனிப்பட்ட விவரங்கள் உலாவிக்குள்ளேயே பாதுகாக்கப்படுகின்றன.",
    verificationTitle: "சரிபார்ப்பு கேன்வாஸ்",
    verificationSubtitle: "பிரித்தெடுக்கப்பட்ட விவரங்களை சரிபார்க்கவும்.",
    confidenceScore: "நம்பகத்தன்மை மதிப்பீடு",
    rawOcrText: "அசல் OCR உரை",
    extractedEntities: "கண்டறியப்பட்ட விவரங்கள்",
    biomarkers: "பயோமார்க்கர்கள்",
    medicines: "மருந்துகள்",
    approveAndContinue: "ஒப்புதல் அளித்து தொடரவும்",
    reScan: "மீண்டும் ஸ்கேன் செய்க",
    stepVerification: "படி 2 / 3: சரிபார்ப்பு",
    fieldsRequireReview: "புலங்கள் மதிப்பாய்வு செய்யப்பட வேண்டும்",
    allFieldsHighConfidence: "அனைத்து விவரங்களும் துல்லியமாக கண்டறியப்பட்டுள்ளன",
    verifyFindingsTitle: "பிரித்தெடுக்கப்பட்ட மருத்துவ விவரங்களை சரிபார்க்கவும்",
    verifyFindingsDesc: "மூல ஆவணத்துடன் பிரித்தெடுக்கப்பட்ட முடிவுகளை ஒப்பிடவும்.",
    cancelBtn: "ரத்து செய்",
    confirmSaveBtn: "உறுதிசெய்து சேமிக்கவும்",
    savingToInsforge: "சேமிக்கப்படுகிறது...",
    originalDoc: "அசல் ஆவணம்",
    docEvidenceTapHint: "கட்டங்களை தொடுவதன் மூலம் மூல ஆதாரத்தை காணலாம்.",
    docDetails: "ஆவண விவரங்கள்",
    reportDate: "அறிக்கை தேதி",
    doctorName: "மருத்துவர் பெயர்",
    clinicLab: "மருத்துவமனை / ஆய்வகம்",
    labResultsCount: "ஆய்வக முடிவுகள்",
    medsCount: "மருந்துகள் & மருந்துச்சீட்டு",
    pleaseVerify: "தயவுசெய்து சரிபார்க்கவும்",
    testValue: "மதிப்பு",
    testUnit: "அலகு",
    normalTarget: "இயல்பான வரம்பு",
    addMissingLab: "+ விடுபட்ட ஆய்வக பரிசோதனையை சேர்க்கவும்",
    medFrequency: "அளவு (எ.கா. 1-0-1)",
    medTiming: "நேரம் / வழிமுறைகள்",
    medDuration: "கால அளவு",
    addMissingMed: "+ விடுபட்ட மருந்தை சேர்க்கவும்",
    clinicalSummaryTitle: "மருத்துவ விளக்கம் மற்றும் வழிகாட்டுதல்",
    plainLanguageExplanation: "எளிய மொழி விளக்கம்",
    listenAudio: "ஆடியோ கேளுங்கள்",
    stopAudio: "ஆடியோவை நிறுத்துங்கள்",
    speaking: "ஒலிக்கிறது:",
    drugInteractionsWarning: "மருந்து தொடர்பு எச்சரிக்கைகள்",
    saveToTimeline: "காலவரிசையில் சேமிக்கப்பட்டது",
    viewSchedule: "மருந்து அட்டவணையை காண்க",
    viewBrief: "மருத்துவர் சுருக்கம் உருவாக்குக",
    documentEvidence: "ஆவண ஆதாரம்",
    pulseSourceHint: "ஆதாரத்தை பார்க்க வலதுபுற வாக்கியத்தை கிளிக் செய்யவும்.",
    readingLevelClass8: "படிக்கும் நிலை: 8-ம் வகுப்பு எளிய தமிழ்",
    generatingSummary: "தேர்ந்தெடுக்கப்பட்ட மொழியில் விளக்கம் தயாராகிறது...",
    rulesEngineTitle: "ஆய்வக மதிப்பீடு & அளவுருக்கள்",
    ageSexAdjusted: "வயது மற்றும் பாலினம் சரிசெய்யப்பட்டது",
    medicineSafetyTitle: "மருந்து பாதுகாப்பு & தொடர்பு முடிவுகள்",
    timelineTitle: "மருத்துவ காலவரிசை",
    timelineSubtitle: "அறிக்கைகள் மற்றும் மருந்துகளின் வரலாற்று பதிவு.",
    filterAll: "அனைத்து பதிவுகள்",
    filterLabs: "ஆய்வக அறிக்கைகள்",
    filterPrescriptions: "மருந்து சீட்டுகள்",
    filterConsultations: "ஆலோசனைகள்",
    verifiedBadge: "சரிபார்க்கப்பட்டது",
    viewReport: "அறிக்கையைக் காண்க",
    whatChanged: "முந்தைய அறிக்கையிலிருந்து என்ன மாறியுள்ளது?",
    searchPlaceholder: "அறிக்கைகள், மருந்துகள் அல்லது மருத்துவர்களைத் தேடுங்கள்...",
    viewEvidence: "சரிபார்க்கப்பட்ட ஆதாரங்களைக் காண்க",
    hba1cDeltaDesc: "5.7% இலக்கை விட அதிகமாக உள்ளது. மருத்துவர் ஆலோசனை தேவை.",
    cholesterolDeltaDesc: "200 mg/dL க்குள் இயல்பான வரம்பிற்கு மேம்பட்டுள்ளது.",
    medRegimen: "மருந்து அட்டவணை",
    newAddition: "புதிதாக சேர்க்கப்பட்டது",
    storvasDeltaDesc: "இரவில் அடோர்வாஸ்டாடின் 10mg சேர்க்கப்பட்டது.",
    trendsTitle: "பயோமார்க்கர் பகுப்பாய்வு மற்றும் போக்குகள்",
    trendsSubtitle: "காலப்போக்கில் உங்கள் சுகாதார அளவுருக்களை ஒப்பிட்டுப் பாருங்கள்.",
    normalRange: "இயல்பான வரம்பு",
    latestValue: "சமீபத்திய மதிப்பு",
    targetGoal: "இலக்கு மதிப்பு",
    statusNormal: "இயல்பு",
    statusHigh: "அதிகம்",
    statusLow: "குறைவு",
    statusCriticalHigh: "மிக அதிக ஆபத்து",
    statusCriticalLow: "மிகக் குறைந்த ஆபத்து",
    statusBorderline: "எல்லைக்கோடு",
    selectTest: "பரிசோதனையைத் தேர்ந்தெடுக்கவும்",
    currentStatus: "தற்போதைய நிலை",
    vsPriorTest: "முந்தைய பரிசோதனையை விட",
    normalBand: "இயல்பான வரம்பு",
    measuredValues: "அளவிடப்பட்ட மதிப்புகள்",
    trendCurve: "நீண்ட கால போக்கு வரைபடம்",
    trendInfoNote: "உணவு, வாழ்க்கை முறை மற்றும் மருந்துகளைப் பொறுத்து இந்த மதிப்புகள் மாறும்.",
    medsTitle: "மருந்துகள் & அட்டவணை",
    medsSubtitle: "மருந்து உட்கொள்ளும் நேரங்கள் மற்றும் வழிமுறைகள்.",
    markTaken: "எடுக்கப்பட்டதாக குறிக்கவும்",
    downloadCalendar: "நாட்காட்டியைப் பதிவிறக்குக (.ics)",
    drugInteractions: "மருந்து தொடர்புகள்",
    foodTiming: "உணவு நேரம்",
    morningSlot: "காலை (08:00 - 09:30)",
    afternoonSlot: "மதியம் (01:00 - 02:00)",
    nightSlot: "இரவு / படுக்கைக்கு முன் (08:30 - 10:00)",
    sosSlot: "தேவைப்படும் போது மட்டும் (SOS)",
    medSafetyAlertsTitle: "மருந்து பாதுகாப்பு எச்சரிக்கைகள்",
    dosesTaken: "மருந்துகள் எடுக்கப்பட்டன",
    adherenceNote: "சரியான நேரத்தில் மருந்து உட்கொள்வது முழு பலனைத் தரும்.",
    askTitle: "மருத்துவ பதிவுகளிடம் கேளுங்கள்",
    askSubtitle: "உங்கள் அறிக்கைகள் குறித்து கேள்விகளை கேளுங்கள்.",
    askPlaceholder: "கேள்வி கேளுங்கள் (எ.கா: 'எனது HbA1c அளவு என்ன?')...",
    sendQuery: "அனுப்புக",
    clearChat: "அரட்டையை அழிக்கவும்",
    suggestedQuestions: "பரிந்துரைக்கப்பட்ட கேள்விகள்",
    sampleQ1: "எனது இரத்த சர்க்கரை கட்டுப்பாட்டில் உள்ளதா?",
    sampleQ2: "எனது காலை மருந்துகள் என்ன?",
    sampleQ3: "எனது மருந்துகளுடன் உணவு தொடர்புகள் ஏதேனும் உள்ளதா?",
    briefTitle: "மருத்துவர் சந்திப்பு சுருக்கம்",
    briefSubtitle: "QR குறியீட்டுடன் கூடிய 1-பக்க அறிக்கை.",
    printPdf: "அச்சிடுக / PDF சேமி",
    scanQrNotice: "பதிவுகளை அணுக QR குறியீட்டை ஸ்கேன் செய்க",
    chiefComplaints: "தற்போதைய சுகாதார நிலைமைகள்",
    currentMedications: "தற்போதைய மருந்துகள்",
    abnormalLabs: "சமீபத்திய அசாதாரண பயோமார்க்கர்கள்",
    copyShareLink: "24 மணி நேர இணைப்பை நகலெடுக்கவும்",
    linkCopied: "இணைப்பு நகலெடுக்கப்பட்டது!",
    expiresIn24h: "24 மணி நேரத்தில் காலாவதியாகும்",
    activeAndSecure: "செயலில் உள்ளது & பாதுகாப்பானது",
    qrExplainer: "மருத்துவமனை வருகையின் போது இந்த QR குறியீட்டைக் காட்டுங்கள். மருத்துவர் இதை ஸ்கேன் செய்து உங்கள் விவரங்களை பார்க்கலாம்.",
    revokeLink: "இணைப்பை உடனடியாக ரத்து செய்",
    confidentialSummary: "மருத்துவ ஆலோசனைக்கான ரகசிய சுகாதார சுருக்கம்",
    knownAllergies: "ஒவ்வாமைகள்",
    noneKnown: "எதுவும் இல்லை (NKDA)",
    suggestedQuestionsTitle: "மருத்துவரிடம் கேட்க வேண்டிய முக்கிய கேள்விகள்",
    briefDocName: "மருந்தின் பெயர்",
    genericName: "பொதுவான பெயர்",
    dosageTiming: "அளவு & நேரம்",
    instructions: "வழிமுறைகள்",
    briefQuestion1: "கிளைகோமெட் 500mg தொடர்ந்து எடுத்தும் HbA1c 8.1% ஆக உயர்ந்துள்ளது. அளவை மாற்ற வேண்டுமா?",
    briefQuestion2: "ஸ்டோர்வாஸ் 10mg தொடங்கிய பிறகு கொலஸ்ட்ரால் 188 mg/dL ஆக குறைந்தது. அடுத்த பரிசோதனை எப்போது?",
    briefQuestion3: "இரத்த அழுத்த மருந்துடன் நான் பின்பற்ற வேண்டிய உணவு அல்லது உடற்பயிற்சி முறைகள் என்ன?",
    briefQuestion4: "அடுத்த இரத்த சர்க்கரை பரிசோதனையை எப்போது செய்ய வேண்டும்?",
    abdmTitle: "ஆயுஷ்மான் பாரத் டிஜிட்டல் மிஷன் (ABDM)",
    abdmSubtitle: "FHIR R4 சுகாதார தரவு பரிமாற்றம், ABHA இணைப்பு மற்றும் ஒப்புதல் பதிவு.",
    exportFhirBundle: "FHIR R4 தொகுப்பை ஏற்றுமதி செய்க (JSON)",
    abhaLinkedStatus: "ABHA அடையாள அட்டை சரிபார்க்கப்பட்டது",
    consentLedger: "ஒப்புதல் மற்றும் தணிக்கை பதிவு",
    settingsTitle: "அமைப்புகள் & சுயவிவரம்",
    settingsSubtitle: "உங்கள் சுயவிவரம், பிராந்திய மொழிகள் மற்றும் பாதுகாப்பை நிர்வகிக்கவும்.",
    personalIdentity: "தனிப்பட்ட விவரங்கள் & மருத்துவ தகவல்",
    fullName: "முழு பெயர்",
    email: "மின்னஞ்சல் முகவரி",
    dob: "பிறந்த தேதி",
    gender: "பாலினம்",
    male: "ஆண்",
    female: "பெண்",
    other: "மற்றவை",
    phone: "தொலைபேசி எண்",
    abhaAddress: "ABHA முகவரி",
    bloodGroup: "இரத்த வகை",
    saveProfile: "மாற்றங்களை சேமிக்கவும்",
    saving: "சேமிக்கப்படுகிறது...",
    accessibilityHeading: "அணுகல்தன்மை & பிராந்திய மொழி",
    defaultLangHeading: "இயல்புநிலை மொழி",
    themeHeading: "காட்சி பயன்முறை (லைட் தீம்கள்)",
    accountSecurity: "கணக்கு பாதுகாப்பு",
    readingAccessibility: "அணுகல்தன்மை & வாசிப்பு முறை",
    layoutStandard: "நிலையான தளவமைப்பு",
    layoutLargeText: "பெரிய உரை முறை (+25%)",
    layoutSimple: "எளிய முறை (முதியவர்களுக்கு ஏற்றது)",
    patientConsentTitle: "நோயாளி ஒப்புதல் பதிவு",
    patientConsentDesc: "உங்கள் மருத்துவ தரவு மீது உங்களுக்கு முழு கட்டுப்பாடு உள்ளது.",
    consentEmergencyTitle: "அவசர மருத்துவர் QR அணுகல்",
    consentEmergencyDesc: "24 மணி நேர டோக்கன் கொண்ட மருத்துவர்கள் விவரங்களை பார்க்க அனுமதிக்கிறது.",
    consentAbdmTitle: "ABDM சுகாதார தகவல் பகிர்வு",
    consentAbdmDesc: "ஆயுஷ்மான் பாரத் டிஜிட்டல் அமைப்பில் பாதுகாப்பான பகிர்வு.",
    consentOfflineTitle: "ஆஃப்லைன் பதிவுகள் சேமிப்பு",
    consentOfflineDesc: "இணையம் இல்லாதபோதும் அறிக்கைகளை பார்க்க உதவுகிறது.",
    consentAiTitle: "AI மருத்துவ விளக்கம்",
    consentAiDesc: "எளிய மொழியில் மருத்துவ விளக்கத்தை வழங்குகிறது.",
    auditLogTitle: "பாதுகாப்பு மற்றும் அணுகல் பதிவு",
    auditLogDesc: "அனைத்து பயன்பாடுகளையும் கண்காணிக்கும் பாதுகாப்பான பதிவு.",
    thEventAction: "செயல்பாடு",
    thResourceTarget: "பிரிவு",
    thTimestamp: "நேரம்",
    thStatus: "நிலை",
    familyTitle: "குடும்ப விவரக்குறிப்புகள்",
    familySubtitle: "உங்கள் குடும்பத்திற்கான தனி சுகாதார பதிவுகள் மற்றும் மருந்துகளை நிர்வகிக்கவும்.",
    addFamilyMember: "+ குடும்ப உறுப்பினரைச் சேர்க்கவும்",
    switchProfile: "சுயவிவரத்தை மாற்றவும்",
    relationship: "உறவு",
    age: "வயது",
    parent: "பெற்றோர்",
    spouse: "துணைவர்",
    child: "குழந்தை",
    reportsCount: "அறிக்கைகள் உள்ளன",
    saveMember: "சுயவிவரத்தை சேமிக்கவும்",
    notesOptional: "மருத்துவ குறிப்புகள் (விருப்பத்தேர்வு)",
    signInTab: "உள்நுழைக",
    signUpTab: "கணக்கை உருவாக்கவும்",
    password: "கடவுச்சொல்",
    dontHaveAccount: "கணக்கு இல்லையா?",
    alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    disclaimerText: "பொறுப்புத் துறப்பு: CareLens கல்வி நோக்கங்களுக்காக மட்டுமே தகவல்களை வழங்குகிறது. எப்போதும் உங்கள் மருத்துவரை அணுகவும்.",
  },
};

export function getTranslation(lang: SupportedLanguage, key: TranslationKey): string {
  const dict = translations[lang] || translations.en;
  return dict[key] || translations.en[key] || key;
}
