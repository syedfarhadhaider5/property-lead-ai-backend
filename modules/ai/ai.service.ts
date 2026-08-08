import { GeminiService } from "../../services/gemini.service";
import {
  IntentDetectionResult,
  LeadIntent,
} from "../../types/ai.types";
import { INTENT_DETECTION_PROMPT } from "./ai.prompt";

const geminiService = new GeminiService();

export class AIService {

  private normalizeIntent(intent: string): LeadIntent {
    const normalized = intent
      .trim()
      .toLowerCase()
      .replace(/_/g, " ");

    const intentMap: Record<string, LeadIntent> = {
      greeting: "Greeting",
      "property inquiry": "Property Inquiry",
      buy: "Buy",
      sell: "Sell",
      rent: "Rent",
      invest: "Invest",
      "price inquiry": "Price Inquiry",
      availability: "Availability",
      "resume conversation": "Resume Conversation",
      "out of context": "Out of Context",
      spam: "Spam",
      abuse: "Abuse",
      unknown: "Unknown",
    };

    return intentMap[normalized] || "Unknown";
  }

  async detectIntent(
    message: string
  ): Promise<IntentDetectionResult> {

    const prompt =
      `${INTENT_DETECTION_PROMPT}\n${message}`;

    const response =
      await geminiService.generate(prompt);

    console.log("Gemini raw response:", response);

    try {
      // Remove Markdown code fences
      const cleanedResponse = response
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      const parsed = JSON.parse(cleanedResponse);

      return {
        intent: this.normalizeIntent(parsed.intent),
        confidence: Number(parsed.confidence),
      };

    } catch (error) {

      console.error(
        "Failed to parse Gemini intent response:",
        response
      );

      throw new Error(
        "AI returned invalid intent JSON"
      );
    }
  }
}