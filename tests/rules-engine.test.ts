import { describe, it, expect } from "vitest";
import { evaluateLabResult, computeBiomarkerTrends } from "../src/lib/rules-engine";
import { evaluateMedicineSafety, normalizeMedicine } from "../src/lib/safety-engine";
import { DocumentExtractionSchema } from "../src/lib/types";

describe("Clinical Rules Engine", () => {
  it("evaluates normal HbA1c correctly", () => {
    const result = evaluateLabResult({
      test: "HbA1c",
      value: 5.2,
      unit: "%",
      reference_range: "4.0-5.6",
      loinc_code: "4548-4",
      confidence: 0.95,
      source_word_ids: ["w-1"],
    });

    expect(result.status).toBe("normal");
    expect(result.statusLabel).toBe("Normal");
    expect(result.requires_verification).toBe(false);
  });

  it("evaluates elevated HbA1c as high", () => {
    const result = evaluateLabResult({
      test: "HbA1c",
      value: 8.1,
      unit: "%",
      reference_range: "4.0-5.6",
      confidence: 0.92,
      source_word_ids: ["w-1"],
    });

    expect(result.status).toBe("high");
    expect(result.statusLabel).toBe("High");
  });

  it("adjusts creatinine normal bounds based on biological sex", () => {
    // 1.2 mg/dL is normal for male (0.7-1.3)
    const maleRes = evaluateLabResult(
      { test: "Serum Creatinine", value: 1.2, unit: "mg/dL", confidence: 0.9, source_word_ids: [] },
      { gender: "male" }
    );
    expect(maleRes.status).toBe("normal");

    // 1.2 mg/dL is high for female (0.5-1.1)
    const femaleRes = evaluateLabResult(
      { test: "Serum Creatinine", value: 1.2, unit: "mg/dL", confidence: 0.9, source_word_ids: [] },
      { gender: "female" }
    );
    expect(femaleRes.status).toBe("high");
  });

  it("identifies critical high values correctly", () => {
    const result = evaluateLabResult({
      test: "Fasting Blood Glucose",
      value: 280, // critical threshold >= 250
      unit: "mg/dL",
      confidence: 0.9,
      source_word_ids: [],
    });

    expect(result.status).toBe("critical_high");
    expect(result.statusIcon).toBe("alert-octagon");
  });

  it("flags low confidence results (< 0.8) for user verification chip", () => {
    const result = evaluateLabResult({
      test: "Total Cholesterol",
      value: 195,
      unit: "mg/dL",
      confidence: 0.65, // Low confidence
      source_word_ids: [],
    });

    expect(result.requires_verification).toBe(true);
  });

  it("computes longitudinal trends correctly", () => {
    const current = [
      { test: "HbA1c", value: 8.1, unit: "%", confidence: 1, source_word_ids: [] },
      { test: "Total Cholesterol", value: 188, unit: "mg/dL", confidence: 1, source_word_ids: [] },
    ];
    const previous = [
      { test: "HbA1c", value: 7.2, unit: "%", date: "2026-07-15" },
      { test: "Total Cholesterol", value: 210, unit: "mg/dL", date: "2026-07-15" },
    ];

    const trends = computeBiomarkerTrends(current, "2026-10-10", previous);
    expect(trends.length).toBe(2);

    const hba1cTrend = trends.find((t) => t.test_name === "HbA1c");
    expect(hba1cTrend?.delta).toBe(0.9);
    expect(hba1cTrend?.direction).toBe("increased");
    expect(hba1cTrend?.clinical_impact).toBe("worsened");

    const cholTrend = trends.find((t) => t.test_name === "Total Cholesterol");
    expect(cholTrend?.delta).toBe(-22);
    expect(cholTrend?.direction).toBe("decreased");
    expect(cholTrend?.clinical_impact).toBe("improved");
  });
});

describe("Medicine Safety Engine", () => {
  it("normalizes Indian brand names to generic active compounds", () => {
    expect(normalizeMedicine("Glycomet 500mg").generic).toBe("Metformin");
    expect(normalizeMedicine("Telma 40mg").generic).toBe("Telmisartan");
    expect(normalizeMedicine("Pan 40").generic).toBe("Pantoprazole");
    expect(normalizeMedicine("Storvas 10mg").generic).toBe("Atorvastatin");
  });

  it("detects duplicate therapy in same therapeutic class", () => {
    const meds = [
      { name: "Combiflam", generic: "Ibuprofen + Paracetamol", confidence: 1, source_word_ids: [] },
      { name: "Voveran 50mg", generic: "Diclofenac", confidence: 1, source_word_ids: [] },
    ];

    const alerts = evaluateMedicineSafety(meds);
    expect(alerts.some((a) => a.type === "duplicate_therapy")).toBe(true);
    expect(alerts[0].action_recommendation).toContain("ask your doctor or pharmacist");
  });

  it("detects known dangerous drug interaction pairs", () => {
    const meds = [
      { name: "Warfarin 5mg", generic: "Warfarin", confidence: 1, source_word_ids: [] },
      { name: "Ecosprin 75mg", generic: "Aspirin", confidence: 1, source_word_ids: [] },
    ];

    const alerts = evaluateMedicineSafety(meds);
    const warfAspAlert = alerts.find((a) => a.type === "interaction");
    expect(warfAspAlert).toBeDefined();
    expect(warfAspAlert?.severity).toBe("major");
    expect(warfAspAlert?.action_recommendation).toContain("ask your doctor or pharmacist");
  });
});

describe("Zod Extraction Validation Schema", () => {
  it("validates well-formed document extractions", () => {
    const validData = {
      unreadable: false,
      document_metadata: {
        doc_type: "lab_report",
        report_date: "2026-10-10",
        doctor_name: "Dr. Sharma",
        confidence: 0.95,
        source_word_ids: ["w-1"],
      },
      lab_results: [
        { test: "HbA1c", value: 8.1, unit: "%", reference_range: "4.0-5.6", confidence: 0.95, source_word_ids: ["w-2"] },
      ],
      medicines: [],
      diagnoses: [],
    };

    const parsed = DocumentExtractionSchema.safeParse(validData);
    expect(parsed.success).toBe(true);
  });
});
