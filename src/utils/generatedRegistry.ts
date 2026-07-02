// Runtime registry for generated activity texts.
// Kept separate from the generator to avoid circular imports:
// - activityGenerator.ts writes here
// - kingdomActivities.ts reads here (getActivityText fallback)

export type Lang = 'es' | 'pt' | 'en';

const generatedTexts: Record<string, Record<Lang, string>> = {};

export function registerGeneratedText(id: string, texts: Record<Lang, string>): void {
  generatedTexts[id] = texts;
}

export function getGeneratedText(id: string, language: Lang): string | undefined {
  return generatedTexts[id]?.[language];
}
