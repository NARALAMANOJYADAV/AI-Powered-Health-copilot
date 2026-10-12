import { OCRWord } from "./types";

export interface MaskingResult {
  maskedWords: OCRWord[];
  maskedText: string;
  piiDetected: {
    aadhaarCount: number;
    abhaCount: number;
    phoneCount: number;
    emailCount: number;
    nameMasked: boolean;
  };
}

/**
 * Privacy Masking Engine
 * Runs entirely in the client browser before any text or token payload is transmitted.
 * Masking preserves token bounding boxes and IDs while redacting sensitive PII.
 */
export function maskPIITokens(words: OCRWord[], knownPatientName?: string): MaskingResult {
  const piiDetected = {
    aadhaarCount: 0,
    abhaCount: 0,
    phoneCount: 0,
    emailCount: 0,
    nameMasked: false,
  };

  // Clone words to avoid mutating original
  const maskedWords: OCRWord[] = words.map(w => ({ ...w }));
  const fullText = words.map(w => w.text).join(" ");

  // 1. Detect Aadhaar pattern (12 digits, e.g. 1234 5678 9012 or 1234-5678-9012)
  const aadhaarRegex = /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g;
  let match;
  while ((match = aadhaarRegex.exec(fullText)) !== null) {
    piiDetected.aadhaarCount++;
    const matchedStr = match[0].replace(/[-\s]/g, "");
    // Find corresponding words
    for (const w of maskedWords) {
      if (w.text.length >= 4 && matchedStr.includes(w.text.replace(/[-\s]/g, ""))) {
        w.text = "XXXX-XXXX-XXXX";
      }
    }
  }

  // 2. Detect ABHA pattern (14 digits: 12-3456-7890-1234 or @abdm handle)
  const abhaRegex = /\b\d{2}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g;
  while ((match = abhaRegex.exec(fullText)) !== null) {
    piiDetected.abhaCount++;
    const matchedStr = match[0].replace(/[-\s]/g, "");
    for (const w of maskedWords) {
      if (matchedStr.includes(w.text.replace(/[-\s]/g, ""))) {
        w.text = "XX-XXXX-XXXX-XXXX";
      }
    }
  }

  // 3. Detect Phone numbers (+91-9876543210 or 9876543210)
  const phoneRegex = /\b(?:\+91[-\s]?)?[6-9]\d{9}\b/g;
  while ((match = phoneRegex.exec(fullText)) !== null) {
    piiDetected.phoneCount++;
    const matchedDigits = match[0].replace(/\D/g, "").slice(-10);
    for (const w of maskedWords) {
      const cleanW = w.text.replace(/\D/g, "");
      if (cleanW.length >= 5 && matchedDigits.includes(cleanW)) {
        w.text = "+91-XXXXX-XXXXX";
      }
    }
  }

  // 4. Detect Emails
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  while ((match = emailRegex.exec(fullText)) !== null) {
    piiDetected.emailCount++;
    const matchedEmail = match[0];
    for (const w of maskedWords) {
      if (matchedEmail.includes(w.text) && w.text.length > 2) {
        w.text = "[REDACTED_EMAIL]";
      }
    }
  }

  // 5. Detect Name following "Name:", "Patient Name:", "Pt:", etc.
  for (let i = 0; i < maskedWords.length - 1; i++) {
    const textLower = maskedWords[i].text.toLowerCase().replace(/[:.]/g, "");
    if (textLower === "name" || textLower === "patient" || textLower === "pt") {
      // The next 1-3 words are the patient name
      for (let j = i + 1; j < Math.min(maskedWords.length, i + 4); j++) {
        // Stop if hit age/sex/date indicators
        const nextWordLower = maskedWords[j].text.toLowerCase();
        if (nextWordLower.includes("age") || nextWordLower.includes("sex") || nextWordLower.includes("gender") || nextWordLower.includes("date") || nextWordLower.includes("ref")) {
          break;
        }
        if (/^[A-Za-z]{2,20}$/.test(maskedWords[j].text)) {
          maskedWords[j].text = "[PATIENT_NAME]";
          piiDetected.nameMasked = true;
        }
      }
    }
  }

  // 6. If user name is specifically provided, mask occurrences
  if (knownPatientName && knownPatientName.trim().length > 2) {
    const nameParts = knownPatientName.toLowerCase().split(/\s+/);
    for (const w of maskedWords) {
      if (nameParts.some(p => p.length > 2 && w.text.toLowerCase().includes(p))) {
        w.text = "[PATIENT_NAME]";
        piiDetected.nameMasked = true;
      }
    }
  }

  const maskedText = maskedWords.map(w => w.text).join(" ");
  return {
    maskedWords,
    maskedText,
    piiDetected,
  };
}
