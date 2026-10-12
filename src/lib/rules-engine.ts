import {
  ExtractedLabResult,
  EvaluatedBiomarker,
  BiomarkerStatus,
  BiomarkerTrend,
} from "./types";

export interface PatientDemographics {
  age?: number;
  gender?: "male" | "female" | "other";
}

export interface ReferenceRangeRule {
  key: string;
  aliases: string[];
  unit: string;
  loinc?: string;
  getRange: (demo: PatientDemographics) => {
    min: number;
    max: number;
    borderlineMin?: number;
    borderlineMax?: number;
    criticalLow: number;
    criticalHigh: number;
    higherIsBetter?: boolean;
    lowerIsBetter?: boolean;
  };
}

export const CLINICAL_RULES: ReferenceRangeRule[] = [
  {
    key: "hba1c",
    aliases: ["hba1c", "glycated hemoglobin", "glycohemoglobin", "hemoglobin a1c", "a1c"],
    unit: "%",
    loinc: "4548-4",
    getRange: () => ({
      min: 4.0,
      max: 5.6,
      borderlineMin: 5.7,
      borderlineMax: 6.4,
      criticalLow: 3.5,
      criticalHigh: 9.5,
      lowerIsBetter: true,
    }),
  },
  {
    key: "fasting_glucose",
    aliases: ["fasting blood sugar", "fasting glucose", "fbs", "glucose fasting", "blood sugar (f)"],
    unit: "mg/dL",
    loinc: "1558-6",
    getRange: () => ({
      min: 70,
      max: 99,
      borderlineMin: 100,
      borderlineMax: 125,
      criticalLow: 50,
      criticalHigh: 250,
      lowerIsBetter: true,
    }),
  },
  {
    key: "postprandial_glucose",
    aliases: ["post prandial blood sugar", "ppbs", "glucose pp", "post lunch glucose", "blood sugar (pp)"],
    unit: "mg/dL",
    loinc: "1521-4",
    getRange: () => ({
      min: 80,
      max: 139,
      borderlineMin: 140,
      borderlineMax: 199,
      criticalLow: 55,
      criticalHigh: 300,
      lowerIsBetter: true,
    }),
  },
  {
    key: "creatinine",
    aliases: ["serum creatinine", "creatinine", "creat"],
    unit: "mg/dL",
    loinc: "2160-0",
    getRange: (demo) => {
      if (demo.gender === "female") {
        return { min: 0.5, max: 1.1, criticalLow: 0.3, criticalHigh: 3.5, lowerIsBetter: true };
      }
      return { min: 0.7, max: 1.3, criticalLow: 0.4, criticalHigh: 4.0, lowerIsBetter: true };
    },
  },
  {
    key: "blood_urea",
    aliases: ["blood urea", "urea", "blood urea nitrogen", "bun"],
    unit: "mg/dL",
    loinc: "3094-0",
    getRange: () => ({
      min: 15,
      max: 40,
      criticalLow: 8,
      criticalHigh: 100,
      lowerIsBetter: true,
    }),
  },
  {
    key: "hemoglobin",
    aliases: ["hemoglobin", "hb", "hgb"],
    unit: "g/dL",
    loinc: "718-7",
    getRange: (demo) => {
      if (demo.gender === "female") {
        return { min: 12.0, max: 15.5, criticalLow: 7.0, criticalHigh: 19.0, higherIsBetter: true };
      }
      return { min: 13.0, max: 17.5, criticalLow: 7.0, criticalHigh: 20.0, higherIsBetter: true };
    },
  },
  {
    key: "wbc",
    aliases: ["total leukocyte count", "tlc", "wbc", "white blood cells", "total wbc"],
    unit: "/mcL",
    loinc: "6690-2",
    getRange: () => ({
      min: 4000,
      max: 11000,
      criticalLow: 2000,
      criticalHigh: 30000,
    }),
  },
  {
    key: "platelets",
    aliases: ["platelet count", "platelets", "plt"],
    unit: "lakh/mcL",
    loinc: "777-3",
    getRange: () => ({
      min: 1.5,
      max: 4.5,
      criticalLow: 0.5,
      criticalHigh: 8.0,
      higherIsBetter: true,
    }),
  },
  {
    key: "cholesterol_total",
    aliases: ["total cholesterol", "cholesterol total", "serum cholesterol"],
    unit: "mg/dL",
    loinc: "2093-3",
    getRange: () => ({
      min: 125,
      max: 200,
      borderlineMin: 200,
      borderlineMax: 239,
      criticalLow: 80,
      criticalHigh: 300,
      lowerIsBetter: true,
    }),
  },
  {
    key: "triglycerides",
    aliases: ["triglycerides", "tg", "serum triglycerides"],
    unit: "mg/dL",
    loinc: "2571-8",
    getRange: () => ({
      min: 50,
      max: 150,
      borderlineMin: 150,
      borderlineMax: 199,
      criticalLow: 30,
      criticalHigh: 500,
      lowerIsBetter: true,
    }),
  },
  {
    key: "hdl",
    aliases: ["hdl cholesterol", "hdl", "high density lipoprotein"],
    unit: "mg/dL",
    loinc: "2085-9",
    getRange: (demo) => ({
      min: demo.gender === "female" ? 50 : 40,
      max: 70,
      criticalLow: 20,
      criticalHigh: 100,
      higherIsBetter: true,
    }),
  },
  {
    key: "ldl",
    aliases: ["ldl cholesterol", "ldl", "low density lipoprotein"],
    unit: "mg/dL",
    loinc: "13457-7",
    getRange: () => ({
      min: 50,
      max: 100,
      borderlineMin: 100,
      borderlineMax: 129,
      criticalLow: 30,
      criticalHigh: 190,
      lowerIsBetter: true,
    }),
  },
  {
    key: "tsh",
    aliases: ["tsh", "thyroid stimulating hormone", "ultrasensitive tsh"],
    unit: "uIU/mL",
    loinc: "3016-3",
    getRange: () => ({
      min: 0.4,
      max: 4.5,
      criticalLow: 0.05,
      criticalHigh: 15.0,
    }),
  },
  {
    key: "sgpt_alt",
    aliases: ["sgpt", "alt", "alanine aminotransferase", "alanine transaminase"],
    unit: "U/L",
    loinc: "1742-6",
    getRange: () => ({
      min: 7,
      max: 56,
      criticalLow: 5,
      criticalHigh: 200,
      lowerIsBetter: true,
    }),
  },
  {
    key: "sgot_ast",
    aliases: ["sgot", "ast", "aspartate aminotransferase", "aspartate transaminase"],
    unit: "U/L",
    loinc: "1920-8",
    getRange: () => ({
      min: 10,
      max: 40,
      criticalLow: 5,
      criticalHigh: 200,
      lowerIsBetter: true,
    }),
  },
  {
    key: "bilirubin_total",
    aliases: ["total bilirubin", "bilirubin total", "serum bilirubin total"],
    unit: "mg/dL",
    loinc: "1975-2",
    getRange: () => ({
      min: 0.2,
      max: 1.2,
      criticalLow: 0.1,
      criticalHigh: 5.0,
      lowerIsBetter: true,
    }),
  },
  {
    key: "uric_acid",
    aliases: ["uric acid", "serum uric acid"],
    unit: "mg/dL",
    loinc: "3084-1",
    getRange: (demo) => ({
      min: demo.gender === "female" ? 2.6 : 3.5,
      max: demo.gender === "female" ? 6.0 : 7.2,
      criticalLow: 1.5,
      criticalHigh: 10.0,
      lowerIsBetter: true,
    }),
  },
  {
    key: "vitamin_d",
    aliases: ["vitamin d", "25-oh vitamin d", "25-hydroxy vitamin d", "cholecalciferol"],
    unit: "ng/mL",
    loinc: "1653-3",
    getRange: () => ({
      min: 30,
      max: 100,
      borderlineMin: 20,
      borderlineMax: 29.9,
      criticalLow: 10,
      criticalHigh: 150,
      higherIsBetter: true,
    }),
  },
  {
    key: "potassium",
    aliases: ["serum potassium", "potassium", "k+"],
    unit: "mEq/L",
    loinc: "2823-3",
    getRange: () => ({
      min: 3.5,
      max: 5.1,
      criticalLow: 2.8,
      criticalHigh: 6.2,
    }),
  },
  {
    key: "sodium",
    aliases: ["serum sodium", "sodium", "na+"],
    unit: "mEq/L",
    loinc: "2951-2",
    getRange: () => ({
      min: 135,
      max: 145,
      criticalLow: 120,
      criticalHigh: 160,
    }),
  },
];

/**
 * Normalizes a raw test name to matched rule key
 */
export function findMatchingRule(testName: string): ReferenceRangeRule | null {
  const cleanName = testName.toLowerCase().trim();
  for (const rule of CLINICAL_RULES) {
    if (rule.aliases.some(alias => cleanName.includes(alias) || alias.includes(cleanName))) {
      return rule;
    }
  }
  return null;
}

/**
 * Evaluates a single lab result against demographic-adjusted clinical rules.
 */
export function evaluateLabResult(
  lab: ExtractedLabResult,
  demographics: PatientDemographics = { gender: "other" }
): EvaluatedBiomarker {
  const rule = findMatchingRule(lab.test);
  const testKey = rule ? rule.key : lab.test.toLowerCase().replace(/\s+/g, "_");

  // Default fallback if unknown test
  if (!rule) {
    return {
      ...lab,
      test_key: testKey,
      status: "normal",
      statusLabel: "Normal",
      statusIcon: "check",
      requires_verification: lab.confidence < 0.8,
    };
  }

  const range = rule.getRange(demographics);
  const val = lab.value;

  let status: BiomarkerStatus = "normal";
  let statusLabel = "Normal";
  let statusIcon: EvaluatedBiomarker["statusIcon"] = "check";

  if (val <= range.criticalLow) {
    status = "critical_low";
    statusLabel = "Critical Low";
    statusIcon = "alert-octagon";
  } else if (val >= range.criticalHigh) {
    status = "critical_high";
    statusLabel = "Critical High";
    statusIcon = "alert-octagon";
  } else if (range.borderlineMin !== undefined && range.borderlineMax !== undefined && val >= range.borderlineMin && val <= range.borderlineMax) {
    status = "borderline";
    statusLabel = "Borderline";
    statusIcon = "alert-triangle";
  } else if (val < range.min) {
    status = "low";
    statusLabel = "Low";
    statusIcon = "arrow-down";
  } else if (val > range.max) {
    status = "high";
    statusLabel = "High";
    statusIcon = "arrow-up";
  }

  return {
    ...lab,
    test_key: testKey,
    unit: lab.unit || rule.unit,
    loinc_code: lab.loinc_code || rule.loinc,
    reference_range: lab.reference_range || `${range.min} - ${range.max} ${rule.unit}`,
    status,
    statusLabel,
    statusIcon,
    reference_min: range.min,
    reference_max: range.max,
    critical_min: range.criticalLow,
    critical_max: range.criticalHigh,
    requires_verification: lab.confidence < 0.8,
  };
}

/**
 * Computes longitudinal trends between current and previous reports.
 */
export function computeBiomarkerTrends(
  currentLabs: ExtractedLabResult[],
  currentDate: string,
  previousLabs: Array<{ test: string; value: number; unit?: string; date: string }>,
  demographics: PatientDemographics = {}
): BiomarkerTrend[] {
  const trends: BiomarkerTrend[] = [];

  for (const curr of currentLabs) {
    const currRule = findMatchingRule(curr.test);
    const currKey = currRule ? currRule.key : curr.test.toLowerCase().trim();

    // Find latest matching test in previous report
    const prev = previousLabs.find(p => {
      const pRule = findMatchingRule(p.test);
      const pKey = pRule ? pRule.key : p.test.toLowerCase().trim();
      return pKey === currKey;
    });

    if (prev) {
      const delta = parseFloat((curr.value - prev.value).toFixed(2));
      const percentageChange = prev.value !== 0 ? parseFloat(((delta / prev.value) * 100).toFixed(1)) : 0;
      const direction: BiomarkerTrend["direction"] = delta > 0.05 ? "increased" : delta < -0.05 ? "decreased" : "stable";

      let clinical_impact: BiomarkerTrend["clinical_impact"] = "stable";
      if (currRule) {
        const range = currRule.getRange(demographics);
        if (currRule.key === "hba1c" || currRule.key === "fasting_glucose" || currRule.key === "cholesterol_total" || currRule.key === "ldl" || currRule.key === "creatinine") {
          // Lower is improved
          clinical_impact = delta < 0 ? "improved" : delta > 0 ? "worsened" : "stable";
        } else if (currRule.key === "hdl" || currRule.key === "hemoglobin" || currRule.key === "platelets" || currRule.key === "vitamin_d") {
          // Higher is improved
          clinical_impact = delta > 0 ? "improved" : delta < 0 ? "worsened" : "stable";
        }
      }

      trends.push({
        test_key: currKey,
        test_name: curr.test,
        current_value: curr.value,
        current_date: currentDate,
        previous_value: prev.value,
        previous_date: prev.date,
        delta,
        percentage_change: percentageChange,
        direction,
        clinical_impact,
        unit: curr.unit,
      });
    }
  }

  return trends;
}
