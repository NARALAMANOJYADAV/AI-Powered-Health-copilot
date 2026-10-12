import { ExtractedMedicine, DrugSafetyAlert } from "./types";

export interface DrugMapping {
  brand: string;
  generic: string;
  category: string;
  therapeuticClass: string;
}

export const CURATED_INDIAN_DRUG_MAP: DrugMapping[] = [
  // Antidiabetics
  { brand: "Glycomet", generic: "Metformin", category: "Antidiabetic", therapeuticClass: "Biguanide" },
  { brand: "Glycomet-GP", generic: "Metformin + Glimepiride", category: "Antidiabetic", therapeuticClass: "Biguanide + Sulfonylurea" },
  { brand: "Janumet", generic: "Metformin + Sitagliptin", category: "Antidiabetic", therapeuticClass: "Biguanide + DPP-4" },
  { brand: "Galvus", generic: "Vildagliptin", category: "Antidiabetic", therapeuticClass: "DPP-4 Inhibitor" },
  { brand: "Galvus Met", generic: "Vildagliptin + Metformin", category: "Antidiabetic", therapeuticClass: "DPP-4 + Biguanide" },
  { brand: "Jardiance", generic: "Empagliflozin", category: "Antidiabetic", therapeuticClass: "SGLT2 Inhibitor" },
  { brand: "Forxiga", generic: "Dapagliflozin", category: "Antidiabetic", therapeuticClass: "SGLT2 Inhibitor" },
  { brand: "Amaryl", generic: "Glimepiride", category: "Antidiabetic", therapeuticClass: "Sulfonylurea" },
  { brand: "Rybelsus", generic: "Semaglutide", category: "Antidiabetic", therapeuticClass: "GLP-1 Receptor Agonist" },

  // Antihypertensives & Cardiac
  { brand: "Telma", generic: "Telmisartan", category: "Antihypertensive", therapeuticClass: "ARB" },
  { brand: "Telma-H", generic: "Telmisartan + Hydrochlorothiazide", category: "Antihypertensive", therapeuticClass: "ARB + Diuretic" },
  { brand: "Telmikem", generic: "Telmisartan", category: "Antihypertensive", therapeuticClass: "ARB" },
  { brand: "Losar", generic: "Losartan", category: "Antihypertensive", therapeuticClass: "ARB" },
  { brand: "Losar-H", generic: "Losartan + Hydrochlorothiazide", category: "Antihypertensive", therapeuticClass: "ARB + Diuretic" },
  { brand: "Amlopres", generic: "Amlodipine", category: "Antihypertensive", therapeuticClass: "CCB" },
  { brand: "Amlokem", generic: "Amlodipine", category: "Antihypertensive", therapeuticClass: "CCB" },
  { brand: "Cilacar", generic: "Cilnidipine", category: "Antihypertensive", therapeuticClass: "CCB" },
  { brand: "Cardace", generic: "Ramipril", category: "Antihypertensive", therapeuticClass: "ACE Inhibitor" },
  { brand: "Envas", generic: "Enalapril", category: "Antihypertensive", therapeuticClass: "ACE Inhibitor" },
  { brand: "Concor", generic: "Bisoprolol", category: "Cardiovascular", therapeuticClass: "Beta Blocker" },
  { brand: "Betaloc", generic: "Metoprolol", category: "Cardiovascular", therapeuticClass: "Beta Blocker" },
  { brand: "Nebicard", generic: "Nebivolol", category: "Cardiovascular", therapeuticClass: "Beta Blocker" },
  { brand: "Ecosprin", generic: "Aspirin", category: "Antiplatelet", therapeuticClass: "Antiplatelet / Salicylate" },
  { brand: "Clopilet", generic: "Clopidogrel", category: "Antiplatelet", therapeuticClass: "P2Y12 Antiplatelet" },
  { brand: "Deplatt", generic: "Clopidogrel", category: "Antiplatelet", therapeuticClass: "P2Y12 Antiplatelet" },
  { brand: "Warf", generic: "Warfarin", category: "Anticoagulant", therapeuticClass: "Vitamin K Antagonist" },
  { brand: "Eliquis", generic: "Apixaban", category: "Anticoagulant", therapeuticClass: "DOAC" },

  // Lipid Lowering / Statins
  { brand: "Storvas", generic: "Atorvastatin", category: "Lipid Lowering", therapeuticClass: "Statin" },
  { brand: "Atorva", generic: "Atorvastatin", category: "Lipid Lowering", therapeuticClass: "Statin" },
  { brand: "Rosuvas", generic: "Rosuvastatin", category: "Lipid Lowering", therapeuticClass: "Statin" },
  { brand: "Rozavel", generic: "Rosuvastatin", category: "Lipid Lowering", therapeuticClass: "Statin" },

  // Gastrointestinal / PPIs
  { brand: "Pan 40", generic: "Pantoprazole", category: "Gastrointestinal", therapeuticClass: "PPI" },
  { brand: "Pantocid", generic: "Pantoprazole", category: "Gastrointestinal", therapeuticClass: "PPI" },
  { brand: "Pan-D", generic: "Pantoprazole + Domperidone", category: "Gastrointestinal", therapeuticClass: "PPI + Prokinetic" },
  { brand: "Omez", generic: "Omeprazole", category: "Gastrointestinal", therapeuticClass: "PPI" },
  { brand: "Omez-D", generic: "Omeprazole + Domperidone", category: "Gastrointestinal", therapeuticClass: "PPI + Prokinetic" },
  { brand: "Rablet", generic: "Rabeprazole", category: "Gastrointestinal", therapeuticClass: "PPI" },
  { brand: "Razo", generic: "Rabeprazole", category: "Gastrointestinal", therapeuticClass: "PPI" },
  { brand: "Nexpro", generic: "Esomeprazole", category: "Gastrointestinal", therapeuticClass: "PPI" },

  // NSAIDs & Pain
  { brand: "Dolo 650", generic: "Paracetamol", category: "Analgesic", therapeuticClass: "Analgesic / Antipyretic" },
  { brand: "Calpol", generic: "Paracetamol", category: "Analgesic", therapeuticClass: "Analgesic / Antipyretic" },
  { brand: "Crocin", generic: "Paracetamol", category: "Analgesic", therapeuticClass: "Analgesic / Antipyretic" },
  { brand: "Combiflam", generic: "Ibuprofen + Paracetamol", category: "NSAID", therapeuticClass: "NSAID" },
  { brand: "Voveran", generic: "Diclofenac", category: "NSAID", therapeuticClass: "NSAID" },
  { brand: "Zerodol-P", generic: "Aceclofenac + Paracetamol", category: "NSAID", therapeuticClass: "NSAID" },
  { brand: "Zerodol-SP", generic: "Aceclofenac + Paracetamol + Serratiopeptidase", category: "NSAID", therapeuticClass: "NSAID" },
  { brand: "Meftal Spas", generic: "Mefenamic Acid + Dicyclomine", category: "Antispasmodic", therapeuticClass: "NSAID + Antispasmodic" },
  { brand: "Brufen", generic: "Ibuprofen", category: "NSAID", therapeuticClass: "NSAID" },

  // Antibiotics
  { brand: "Augmentin", generic: "Amoxicillin + Clavulanic Acid", category: "Antibiotic", therapeuticClass: "Penicillin" },
  { brand: "Clavam", generic: "Amoxicillin + Clavulanic Acid", category: "Antibiotic", therapeuticClass: "Penicillin" },
  { brand: "Azithral", generic: "Azithromycin", category: "Antibiotic", therapeuticClass: "Macrolide" },
  { brand: "Azee", generic: "Azithromycin", category: "Antibiotic", therapeuticClass: "Macrolide" },
  { brand: "Zifi", generic: "Cefixime", category: "Antibiotic", therapeuticClass: "Cephalosporin" },
  { brand: "Taxim-O", generic: "Cefixime", category: "Antibiotic", therapeuticClass: "Cephalosporin" },
  { brand: "Ciplox", generic: "Ciprofloxacin", category: "Antibiotic", therapeuticClass: "Fluoroquinolone" },

  // Respiratory & Allergy
  { brand: "Allegra", generic: "Fexofenadine", category: "Antihistamine", therapeuticClass: "Antihistamine" },
  { brand: "Montair-LC", generic: "Montelukast + Levocetirizine", category: "Antiallergic", therapeuticClass: "Antileukotriene + Antihistamine" },
  { brand: "Levocet", generic: "Levocetirizine", category: "Antihistamine", therapeuticClass: "Antihistamine" },
  { brand: "Asthalin", generic: "Salbutamol", category: "Bronchodilator", therapeuticClass: "Beta-2 Agonist" },

  // Thyroid & Supplements
  { brand: "Thyronorm", generic: "Levothyroxine", category: "Thyroid", therapeuticClass: "Thyroid Hormone" },
  { brand: "Eltroxin", generic: "Levothyroxine", category: "Thyroid", therapeuticClass: "Thyroid Hormone" },
  { brand: "Shelcal", generic: "Calcium + Vitamin D3", category: "Mineral Supplement", therapeuticClass: "Calcium / Vitamin D" },
  { brand: "Neurobion Forte", generic: "Vitamin B Complex", category: "Vitamin", therapeuticClass: "Vitamin B" },
  { brand: "Liv 52", generic: "Herbal Hepatoprotective", category: "Supportive", therapeuticClass: "Liver Support" },
  { brand: "Nexito", generic: "Escitalopram", category: "Antidepressant", therapeuticClass: "SSRI" },
  { brand: "Lonazep", generic: "Clonazepam", category: "Anxiolytic", therapeuticClass: "Benzodiazepine" },
];

export interface InteractionRule {
  drugA: string;
  drugB: string;
  severity: "contraindicated" | "major" | "moderate" | "minor";
  title: string;
  effect: string;
  clinicalRationale: string;
}

export const CURATED_INTERACTION_RULES: InteractionRule[] = [
  {
    drugA: "Metformin",
    drugB: "Contrast",
    severity: "contraindicated",
    title: "Metformin & Radiographic Contrast",
    effect: "Severe risk of lactic acidosis and kidney strain.",
    clinicalRationale: "Contrast dye temporarily stresses kidney filtration, preventing excretion of metformin and risking toxic buildup. Withhold 48h around procedure.",
  },
  {
    drugA: "Warfarin",
    drugB: "Aspirin",
    severity: "major",
    title: "Warfarin & Aspirin Bleeding Risk",
    effect: "Significantly elevated gastrointestinal and systemic bleeding hazard.",
    clinicalRationale: "Combining antiplatelet action with anticoagulant therapy compounds bleeding vulnerability.",
  },
  {
    drugA: "Clopidogrel",
    drugB: "Omeprazole",
    severity: "major",
    title: "Reduced Clopidogrel Antiplatelet Efficacy",
    effect: "Omeprazole blocks activation of Clopidogrel, reducing cardiovascular protection.",
    clinicalRationale: "Omeprazole strongly inhibits CYP2C19 required to convert clopidogrel to its active metabolite. Pantoprazole or Rabeprazole are preferred.",
  },
  {
    drugA: "Telmisartan",
    drugB: "Ramipril",
    severity: "major",
    title: "Dual RAAS Blockade Risk",
    effect: "Excessive blood pressure drop, hyperkalemia, and kidney dysfunction.",
    clinicalRationale: "Concurrent ACE inhibitor and ARB therapy provides no added benefit and significantly multiplies adverse renal events.",
  },
  {
    drugA: "Diclofenac",
    drugB: "Prednisolone",
    severity: "major",
    title: "Gastrointestinal Ulceration and Bleeding",
    effect: "Synergistic erosion of gastric mucosa leading to ulceration or bleeding.",
    clinicalRationale: "NSAIDs and corticosteroids co-prescribed cause high rates of peptic mucosal injury.",
  },
  {
    drugA: "Atorvastatin",
    drugB: "Clarithromycin",
    severity: "major",
    title: "Statin Toxicity and Rhabdomyolysis",
    effect: "Potentiation of statin levels risking muscle breakdown.",
    clinicalRationale: "Strong CYP3A4 inhibition by macrolide antibiotics causes toxic accumulation of statins.",
  },
  {
    drugA: "Escitalopram",
    drugB: "Tramadol",
    severity: "major",
    title: "Serotonin Syndrome Warning",
    effect: "Hyperreflexia, shivering, agitation, and risk of seizures.",
    clinicalRationale: "Dual serotonergic stimulation risks neurotoxicity.",
  },
  {
    drugA: "Levothyroxine",
    drugB: "Calcium",
    severity: "moderate",
    title: "Decreased Thyroid Hormone Absorption",
    effect: "Calcium chelation lowers levothyroxine effectiveness, causing persistent hypothyroid symptoms.",
    clinicalRationale: "Calcium supplements bind levothyroxine in the gut. Always separate administration by at least 4 hours.",
  },
];

/**
 * Normalizes brand name to generic and therapeutic class
 */
export function normalizeMedicine(brandOrGeneric: string): { generic: string; category: string; therapeuticClass: string } {
  const clean = brandOrGeneric.toLowerCase().trim();
  for (const item of CURATED_INDIAN_DRUG_MAP) {
    if (clean.includes(item.brand.toLowerCase()) || clean.includes(item.generic.toLowerCase())) {
      return {
        generic: item.generic,
        category: item.category,
        therapeuticClass: item.therapeuticClass,
      };
    }
  }
  return {
    generic: brandOrGeneric,
    category: "General",
    therapeuticClass: "Unclassified",
  };
}

/**
 * Analyzes medication list for duplicate therapies and dangerous drug-drug interactions.
 */
export function evaluateMedicineSafety(medications: ExtractedMedicine[]): DrugSafetyAlert[] {
  const alerts: DrugSafetyAlert[] = [];
  const normalizedMeds = medications.map(m => {
    const norm = normalizeMedicine(m.name);
    return {
      original: m.name,
      generic: m.generic || norm.generic,
      category: norm.category,
      therapeuticClass: norm.therapeuticClass,
    };
  });

  // 1. Detect Duplicate Therapy (e.g. 2 NSAIDs, 2 PPIs, 2 Statins)
  const classGroups: Record<string, typeof normalizedMeds> = {};
  for (const med of normalizedMeds) {
    if (med.therapeuticClass !== "Unclassified") {
      if (!classGroups[med.therapeuticClass]) {
        classGroups[med.therapeuticClass] = [];
      }
      classGroups[med.therapeuticClass].push(med);
    }
  }

  for (const [tClass, medsInClass] of Object.entries(classGroups)) {
    if (medsInClass.length > 1) {
      alerts.push({
        type: "duplicate_therapy",
        drug_a: medsInClass[0].original,
        drug_b: medsInClass[1].original,
        severity: "major",
        title: `Duplicate Therapy Detected (${tClass})`,
        effect: `You are taking multiple medications in the same therapeutic class: ${medsInClass.map(m => m.original).join(" and ")}.`,
        clinicalRationale: `Taking two medications with the same mechanism of action (e.g. multiple ${tClass}s) increases side effect risks without therapeutic gain.`,
        action_recommendation: "Please ask your doctor or pharmacist if both medications are intended to be taken concurrently.",
      });
    }
  }

  // 2. Detect Known Interactions
  for (let i = 0; i < normalizedMeds.length; i++) {
    for (let j = i + 1; j < normalizedMeds.length; j++) {
      const medA = normalizedMeds[i];
      const medB = normalizedMeds[j];

      for (const rule of CURATED_INTERACTION_RULES) {
        const matchesA = medA.original.toLowerCase().includes(rule.drugA.toLowerCase()) || medA.generic.toLowerCase().includes(rule.drugA.toLowerCase());
        const matchesB = medB.original.toLowerCase().includes(rule.drugB.toLowerCase()) || medB.generic.toLowerCase().includes(rule.drugB.toLowerCase());

        const revA = medA.original.toLowerCase().includes(rule.drugB.toLowerCase()) || medA.generic.toLowerCase().includes(rule.drugB.toLowerCase());
        const revB = medB.original.toLowerCase().includes(rule.drugA.toLowerCase()) || medB.generic.toLowerCase().includes(rule.drugA.toLowerCase());

        if ((matchesA && matchesB) || (revA && revB)) {
          alerts.push({
            type: "interaction",
            drug_a: medA.original,
            drug_b: medB.original,
            severity: rule.severity,
            title: rule.title,
            effect: rule.effect,
            clinicalRationale: rule.clinicalRationale,
            action_recommendation: "Please ask your doctor or pharmacist about this combination before your next dose.",
          });
        }
      }
    }
  }

  return alerts;
}
