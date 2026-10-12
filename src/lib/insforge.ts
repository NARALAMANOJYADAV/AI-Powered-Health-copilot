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

/**
 * Authentication & Profile helpers
 */
export async function authLogin(email: string, password: string) {
  try {
    const { data, error } = await insforge.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { success: false, error: error.message || "Failed to sign in" };
    }
    return { success: true, user: data?.user };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Authentication error";
    return { success: false, error: message };
  }
}

export async function authRegister(params: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const { data, error } = await insforge.auth.signUp({
      email: params.email,
      password: params.password,
      name: params.name,
    });
    if (error) {
      return { success: false, error: error.message || "Failed to sign up" };
    }
    return {
      success: true,
      user: data?.user,
      requireEmailVerification: data?.requireEmailVerification,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Registration error";
    return { success: false, error: message };
  }
}

export async function authLogout() {
  try {
    const { error } = await insforge.auth.signOut();
    if (error) {
      console.warn("SignOut notice:", error.message);
    }
    return { success: true };
  } catch (err) {
    console.error("SignOut exception:", err);
    return { success: true };
  }
}

export async function fetchCurrentProfile(userId: string) {
  try {
    const { data, error } = await insforge.database
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export async function syncUserProfile(profile: {
  id: string;
  email?: string;
  full_name?: string;
  phone?: string;
  date_of_birth?: string;
  gender?: string;
  blood_group?: string;
  abha_id?: string;
  theme?: string;
  language?: string;
  accessibility_mode?: string;
}) {
  try {
    const { data, error } = await insforge.database
      .from("profiles")
      .upsert([profile]);
    return { success: !error, data, error };
  } catch (err) {
    console.error("syncUserProfile error:", err);
    return { success: false, error: err };
  }
}
