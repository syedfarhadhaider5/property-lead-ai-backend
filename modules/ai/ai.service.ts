
import { GeminiService } from "../../services/gemini.service";

const geminiService = new GeminiService();
import {
    IntentDetectionResult
} from "../../types/ai.types";
import {
    INTENT_DETECTION_PROMPT
} from "./ai.prompt";

export class AIService {

  async detectIntent(
    message: string
): Promise<IntentDetectionResult> {

    const prompt =
        INTENT_DETECTION_PROMPT +
        `\n${message}`;

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

        return JSON.parse(cleanedResponse);

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