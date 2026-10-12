import { ExtractedLabResult, ExtractedMedicine, ExtractedCondition, UserProfile, ExtractedMetadata } from "./types";

export interface FHIRResource {
  resourceType: string;
  id: string;
  [key: string]: unknown;
}

export interface FHIRBundle {
  resourceType: "Bundle";
  type: "collection";
  timestamp: string;
  entry: Array<{
    fullUrl: string;
    resource: FHIRResource;
  }>;
}

/**
 * Generates an ABDM-compliant HL7 FHIR R4 Collection Bundle
 */
export function generateFHIRBundle(params: {
  patient: UserProfile;
  metadata?: ExtractedMetadata;
  labs?: ExtractedLabResult[];
  medications?: ExtractedMedicine[];
  conditions?: ExtractedCondition[];
}): FHIRBundle {
  const { patient, metadata, labs = [], medications = [], conditions = [] } = params;
  const timestamp = new Date().toISOString();
  const patientId = `patient-${patient.id || "carelens-user"}`;

  // 1. FHIR Patient
  const patientResource: FHIRResource = {
    resourceType: "Patient",
    id: patientId,
    identifier: [
      {
        system: "https://healthid.ndhm.gov.in",
        value: patient.abha_id || "91-1234-5678-9012@abdm",
      },
    ],
    name: [
      {
        use: "official",
        text: patient.full_name || "CareLens User",
      },
    ],
    gender: patient.gender === "female" ? "female" : patient.gender === "male" ? "male" : "other",
    birthDate: patient.date_of_birth || "1985-01-01",
  };

  const entries: FHIRBundle["entry"] = [
    {
      fullUrl: `urn:uuid:${patientId}`,
      resource: patientResource,
    },
  ];

  // 2. Observations for each Lab Result
  const observationIds: string[] = [];
  labs.forEach((lab, idx) => {
    const obsId = `obs-${idx + 1}-${Date.now()}`;
    observationIds.push(obsId);

    const obs: FHIRResource = {
      resourceType: "Observation",
      id: obsId,
      status: "final",
      category: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "laboratory",
              display: "Laboratory",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: lab.loinc_code || "UNKNOWN",
            display: lab.test,
          },
        ],
        text: lab.test,
      },
      subject: {
        reference: `urn:uuid:${patientId}`,
      },
      effectiveDateTime: metadata?.report_date || timestamp.split("T")[0],
      valueQuantity: {
        value: lab.value,
        unit: lab.unit,
        system: "http://unitsofmeasure.org",
      },
      referenceRange: lab.reference_range
        ? [
            {
              text: lab.reference_range,
            },
          ]
        : undefined,
    };

    entries.push({
      fullUrl: `urn:uuid:${obsId}`,
      resource: obs,
    });
  });

  // 3. Diagnostic Report
  if (labs.length > 0) {
    const reportId = `report-${Date.now()}`;
    const reportResource: FHIRResource = {
      resourceType: "DiagnosticReport",
      id: reportId,
      status: "final",
      category: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0074",
              code: "LAB",
              display: "Laboratory",
            },
          ],
        },
      ],
      code: {
        text: metadata?.doc_type === "lab_report" ? "Laboratory Examination Report" : "Clinical Report",
      },
      subject: {
        reference: `urn:uuid:${patientId}`,
      },
      effectiveDateTime: metadata?.report_date || timestamp.split("T")[0],
      issued: timestamp,
      performer: metadata?.doctor_name
        ? [
            {
              display: metadata.doctor_name,
            },
          ]
        : undefined,
      result: observationIds.map(id => ({ reference: `urn:uuid:${id}` })),
    };

    entries.push({
      fullUrl: `urn:uuid:${reportId}`,
      resource: reportResource,
    });
  }

  // 4. MedicationRequests for Prescriptions
  medications.forEach((med, idx) => {
    const medId = `med-req-${idx + 1}-${Date.now()}`;
    const medReq: FHIRResource = {
      resourceType: "MedicationRequest",
      id: medId,
      status: "active",
      intent: "order",
      medicationCodeableConcept: {
        text: med.name,
      },
      subject: {
        reference: `urn:uuid:${patientId}`,
      },
      authoredOn: metadata?.report_date || timestamp.split("T")[0],
      requester: metadata?.doctor_name
        ? {
            display: metadata.doctor_name,
          }
        : undefined,
      dosageInstruction: [
        {
          text: `${med.frequency || "daily"} ${med.timing || ""} (${med.duration || ""})`.trim(),
          timing: {
            code: {
              text: med.frequency || "As directed",
            },
          },
          additionalInstruction: med.instructions ? [{ text: med.instructions }] : undefined,
        },
      ],
    };

    entries.push({
      fullUrl: `urn:uuid:${medId}`,
      resource: medReq,
    });
  });

  // 5. Conditions for Diagnoses
  conditions.forEach((cond, idx) => {
    const condId = `condition-${idx + 1}-${Date.now()}`;
    const condResource: FHIRResource = {
      resourceType: "Condition",
      id: condId,
      clinicalStatus: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: cond.status || "active",
          },
        ],
      },
      code: {
        text: cond.condition,
      },
      subject: {
        reference: `urn:uuid:${patientId}`,
      },
      recordedDate: metadata?.report_date || timestamp.split("T")[0],
    };

    entries.push({
      fullUrl: `urn:uuid:${condId}`,
      resource: condResource,
    });
  });

  return {
    resourceType: "Bundle",
    type: "collection",
    timestamp,
    entry: entries,
  };
}
