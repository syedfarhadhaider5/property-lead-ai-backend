import { AIService } from "../ai/ai.service";
import conversationFlow from "./conversation.flow";

const aiService = new AIService();


import leadRepository from "../../repositories/lead.repository";
import conversationRepository from "../../repositories/conversation.repository";

class ConversationService {

    async handleIncomingMessage(
        phone: string,
        name: string | null,
        text: string
    ) {

        // 1. Find or create lead
        const lead = await this.findOrCreateLead(
            phone,
            name
        );

        console.log("Lead:", lead);

        // 2. Save customer message
        await conversationRepository.create({
            leadId: lead.id,
            sender: "Customer",
            message: text,
            messageType: "text"
        });

        // 3. Detect intent
        const intent =
            await aiService.detectIntent(text);

        console.log("Detected Intent:", intent);

        // 4. Conversation decision
        await conversationFlow.handle(
            lead,
            text,
            intent
        );
    }

    private async findOrCreateLead(
        phone: string,
        name: string | null
    ) {

        const existingLead =
            await leadRepository.findByWhatsappNumber(phone);

        if (existingLead) {

            console.log(
                "Existing lead:",
                existingLead.id
            );

            return existingLead;
        }

        const newLead =
            await leadRepository.create({
                whatsappNumber: phone,
                fullName: name
            });

        console.log(
            "New lead created:",
            newLead.id
        );

        return newLead;
    }
}

export default new ConversationService();