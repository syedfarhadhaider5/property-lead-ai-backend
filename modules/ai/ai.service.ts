import { GeminiService } from "../../services/gemini.service";

const geminiService = new GeminiService();

export class AIService {
  async chat(message: string) {
    return await geminiService.generate(message);
  }
}