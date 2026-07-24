import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "ar";

const dictionaries: Record<Locale, typeof en> = { en, ar };

type NestedKeyOf<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? NestedKeyOf<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & string]
  : never;

export type TranslationKey = NestedKeyOf<typeof en>;

export function getDictionary(lang: Locale) {
  return dictionaries[lang] ?? dictionaries.en;
}

export function getTranslator(lang: Locale) {
  const dict = getDictionary(lang);

  function t(key: string): string {
    const keys = key.split(".");
    let result: unknown = dict;
    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof result === "string" ? result : key;
  }

  return t;
}
