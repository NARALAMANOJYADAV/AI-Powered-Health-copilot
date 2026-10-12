# CareLens — AI Personal Health Copilot

CareLens is a dynamic, production-grade AI Personal Health Copilot web application built for patients and families. It bridges the gap between complex medical reports and everyday understanding by transforming lab results, prescriptions, and discharge summaries into plain-language multilingual insights with clinical rigor and privacy-first architecture.

Live Backend Powered by **[InsForge](https://insforge.dev)**.

---

## 🌟 Key Features

### 1. 📷 Document Scanning & Browser-Local OCR
- Camera and file upload supporting PDF, PNG, JPEG, and WebP formats.
- **Client-Side WASM OCR** powered by Tesseract.js with word-level bounding boxes and multi-language support (English, Telugu, Hindi, Tamil).
- Instant preview and sample presets (e.g. Diabetic Panel, Lipid Profile, Cardiac Follow-up) for immediate zero-config testing.

### 2. 🛡️ Privacy-First Client-Side PII Masking
- **Zero Raw PII to LLMs**: Sensitive patient identifiers are masked in the browser before tokens reach edge inference:
  - 12-digit Indian Aadhaar numbers (`XXXX-XXXX-1234`)
  - 14-digit ABHA numbers (`XX-XXXX-XXXX-XXXX`)
  - 10-digit Indian mobile numbers (`+91 XXXXX-12345`)
  - Patient names with pseudonymized tokens (`[PATIENT-ALPHA]`)

### 3. 🔍 Interactive Verification Canvas
- Visual overlay showing exact word-level bounding boxes extracted from document scans.
- **Confidence Highlighting**: Any clinical token with extraction confidence `< 0.8` is flagged with a prominent amber chip ("Please verify") allowing single-click user correction.

### 4. 🩺 Clinical & Medication Safety Engines
- **Clinical Rules Engine (Pure TypeScript)**:
  - Age- and sex-adjusted reference ranges across 25+ essential biomarkers (HbA1c, Fasting Glucose, Postprandial Glucose, Serum Creatinine, TLC/WBC, Platelets, Lipid Profile, etc.).
  - Longitudinal trend delta computation (e.g., *"+0.6% vs 3 months ago — rising trend"*).
- **Medicine Safety Engine**:
  - Over 100 Indian brand-to-generic drug mappings (`Glycomet` ➔ Metformin, `Telma` ➔ Telmisartan, `Pan 40` ➔ Pantoprazole, `Storvas` ➔ Atorvastatin, `Dolo 650` ➔ Paracetamol).
  - Duplicate therapy detection across active prescriptions.
  - Critical drug-drug interaction alerts with clear rationale and mandatory *"Ask your doctor or pharmacist"* clinical disclaimers.

### 5. 🗣️ Multilingual Plain-Language Explanations & Voice
- Class-8 reading level plain-language explanations in **English, Telugu (తెలుగు), Hindi (हिन्दी), and Tamil (தமிழ்)**.
- **Click-to-Source Highlighting**: Clicking any clinical explanation paragraph triggers an animated pulse effect on the corresponding source document token.
- **Web Speech Integration**: Text-to-Speech (`speechSynthesis`) and Voice Question Answering (`SpeechRecognition`) natively supported across all 4 regional languages.

### 6. 📊 Chronological Health Timeline & Biomarker Trends
- Dynamic timeline filtering by biomarker category, medication change, or clinical note.
- *"What changed since last report"* delta comparison cards.
- Interactive biomarker curves with shaded normal reference bands powered by Recharts.

### 7. 💊 Daily Medication Schedule & Adherence
- Structured daily slots (Morning, Afternoon, Evening, Bedtime) with dose and food instructions (*"Before Food / After Food"*).
- One-click `.ics` calendar export for Apple Calendar, Google Calendar, and Outlook.
- Adherence checkbox logging synced to InsForge PostgreSQL.

### 8. 👨‍⚕️ 1-Page Doctor Visit Brief with 24-Hour QR Share
- Compact, dense clinical summary optimized for 2-minute physician consultations.
- Generate revocable 24-hour read-only sharing link with dynamic QR code.
- Print and PDF export layout.

### 9. 👨‍👩‍👧‍👦 Family Profiles & Multilingual Management
- Switch effortlessly between family members (Self, Spouse, Father, Mother, Child).
- Strict Row-Level Security (RLS) ensures users can only read records belonging to their authorized family profile tree.

### 10. 🏛️ ABDM Sandbox & HL7 FHIR R4 Export
- Indian Ayushman Bharat Digital Mission (ABDM) integration sandbox.
- One-click export of complete records into official **HL7 FHIR R4 Collection Bundles** (`Patient`, `DiagnosticReport`, `Observation`, `MedicationRequest`, `Condition`).

### 11. 📜 Patient Consent Ledger & Audit Trail
- Immutable, tamper-evident consent ledger recording every share event, scope, and revocation.
- Comprehensive audit trail of all access operations.

### 12. 🎨 Strict Light-Mode Design System & Accessibility
- **No Dark Mode**: Fully conforms to clean healthcare readability standards.
- 4 curated light themes: **Daylight**, **Paper**, **Sage**, and **High Contrast Light**.
- Accessibility modes: **Large Text (+25%)** and **Simple Mode** (simplified cards, enlarged touch targets).

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, Recharts.
- **Backend & Database**: [InsForge](https://insforge.dev) BaaS
  - PostgreSQL with Row-Level Security (RLS) on all 16 tables
  - File Storage (`carelens-docs` bucket)
  - Deno Edge Functions for server-side LLM inference:
    - `/carelens-extract` — Structured document tokenization & biomarker extraction
    - `/carelens-explain` — Multilingual Class-8 plain language explanation
    - `/carelens-ask` — Record-grounded QA copilot
- **Testing**: Vitest with unit test suites for Rules Engine, Drug Safety, and Zod schemas.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v22)
- npm or pnpm

### Installation

1. Clone repository:
   ```bash
   git clone https://github.com/NARALAMANOJYADAV/AI-Powered-Health-copilot.git
   cd AI-Powered-Health-copilot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_INSFORGE_BASE_URL=https://5i9wrqng.us-east.insforge.app
   NEXT_PUBLIC_INSFORGE_ANON_KEY=anon_252c3d2bcc71d10019a7db8017c742ced4fe694b07bcd20cbfc7430837d67064
   ```

4. Run unit test suite:
   ```bash
   npm run test
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
MIT License. Built for modern digital healthcare empowerment.
