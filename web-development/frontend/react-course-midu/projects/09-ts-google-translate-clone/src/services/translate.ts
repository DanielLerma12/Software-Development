import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUPPORTED_LANGUAGUES } from "../constants";
import type { FromLanguage, Language } from "../types.d";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function translate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}) {
  const fromLang =
    fromLanguage === "auto"
      ? "auto-detect"
      : SUPPORTED_LANGUAGUES[fromLanguage];

  const toLang = SUPPORTED_LANGUAGUES[toLanguage];

  const prompt = `
Translate the following text.

Source language: ${fromLang}
Target language: ${toLang}

Return ONLY the translation and nothing else.

Text:
${text}
`;

  const result = await model.generateContent(prompt);

  return result.response.text().trim();
}
