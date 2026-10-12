import { createClient } from "@insforge/sdk";

export const INSFORGE_BASE_URL = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || "https://5i9wrqng.us-east.insforge.app";
export const INSFORGE_ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "anon_252c3d2bcc71d10019a7db8017c742ced4fe694b07bcd20cbfc7430837d67064";
export const INSFORGE_FUNCTION_BASE_URL = "https://5i9wrqng.function2.insforge.app";

// Singleton client instance
export const insforge = createClient({
  baseUrl: INSFORGE_BASE_URL,
  anonKey: INSFORGE_ANON_KEY,
});

/**
 * Storage helpers
 */
export async function uploadMedicalDocument(file: File | Blob, fileName?: string): Promise<{ url: string; key: string } | null> {
  try {
    const bucket = insforge.storage.from("carelens-docs");
    let result;
    if (fileName) {
      result = await bucket.upload(fileName, file);
    } else {
      result = await bucket.uploadAuto(file);
    }
    if (result.error || !result.data) {
      console.error("Upload error:", result.error);
      return null;
    }
    return {
      url: result.data.url,
      key: result.data.key,
    };
  } catch (err) {
    console.error("Storage upload exception:", err);
    return null;
  }
}

/**
 * Edge function invocation helpers
 */
export async function invokeExtractFunction(payload: {
  words: Array<{ id: string; text: string; bbox: { x0: number; y0: number; x1: number; y1: number }; confidence: number }>;
  image_url?: string;
  image_base64?: string;
  doc_type_hint?: string;
}) {
  try {
    const res = await fetch(`${INSFORGE_FUNCTION_BASE_URL}/carelens-extract`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    console.error("Extract invocation failed:", err);
    throw err;
  }
}

export async function invokeExplainFunction(payload: {
  rules_output: Record<string, unknown>;
  language: string;
  patient_name?: string;
}) {
  try {
    const res = await fetch(`${INSFORGE_FUNCTION_BASE_URL}/carelens-explain`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    console.error("Explain invocation failed:", err);
    throw err;
  }
}

export async function invokeAskFunction(payload: {
  question: string;
  user_records: Record<string, unknown>;
  language: string;
}) {
  try {
    const res = await fetch(`${INSFORGE_FUNCTION_BASE_URL}/carelens-ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    console.error("Ask invocation failed:", err);
    throw err;
  }
}
