"use client";

import { useCareLensStore } from "./store";
import { translations, TranslationKey, getTranslation } from "./translations";
import { SupportedLanguage } from "./types";

export function useTranslation() {
  const language = useCareLensStore((state) => state.language);
  const setLanguage = useCareLensStore((state) => state.setLanguage);

  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  return { t, language, setLanguage };
}
