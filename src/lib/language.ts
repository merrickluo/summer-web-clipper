export interface DetectedLanguage {
  language: string;
  percentage?: number;
}

export const normalizeLanguage = (tag: string | null | undefined): string => {
  const base = (tag ?? "").trim().toLowerCase().split(/[-_]/)[0];
  return base === "und" ? "" : base;
};

export const pickLanguage = (
  languages: ReadonlyArray<DetectedLanguage>,
  fallback: string,
): string => {
  const detected = languages.find(({ language }) => language.trim() !== "");
  return detected ? detected.language : fallback;
};
