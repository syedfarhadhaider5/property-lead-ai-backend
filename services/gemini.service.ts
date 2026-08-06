import { GoogleGenAI } from "@google/genai";
import { geminiConfig } from "../config/gemini.config";

export class GeminiService {
  private ai = new GoogleGenAI({
    apiKey: geminiConfig.apiKey,
  });

  async generate(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: geminiConfig.model,
      contents: prompt,
    });

    return response.text ?? "";
  }
}