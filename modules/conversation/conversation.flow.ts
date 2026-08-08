import {
    IntentDetectionResult
} from "../../types/ai.types";
import whatsappService from "../../services/whatsapp.service";
import conversationRepository
    from "../../repositories/conversation.repository";
import answerRepository from "../../repositories/answer.repository";
import requirementRepository from "../../repositories/requirement.repository";


class ConversationFlow {

    async handle(
        lead: any,
        text: string,
        intentResult: IntentDetectionResult
    ) {

        switch (intentResult.intent) {

            case "Greeting":
                return this.handleGreeting(lead);

            case "Buy":
            case "Sell":
            case "Rent":
            case "Invest":
                return this.handleTransactionIntent(
                    lead,
                    text,
                    intentResult.intent
                );

            case "Property Inquiry":
                return this.handlePropertyInquiry(
                    lead,
                    text
                );

            case "Price Inquiry":
                return this.handlePriceInquiry(
                    lead,
                    text
                );

            case "Availability":
                return this.handleAvailability(
                    lead,
                    text
                );

            case "Resume Conversation":
                return this.handleResume(lead);

            case "Out of Context":
                return this.handleOutOfContext(lead);

            case "Spam":
                return this.handleSpam();

            case "Abuse":
                return this.handleAbuse();

            case "Unknown":
            default:
                return this.handleUnknown();
        }
    }

    private async handleGreeting(lead: any) {

        console.log(
            "ACTION: Greeting → ask first qualification question"
        );
    }

    private async handleTransactionIntent(
        lead: any,
        text: string,
        intent: string
    ) {

        console.log(
            `ACTION: ${intent} → save intent → ask city`
        );

        // 1. Make sure requirements row exists
        let requirements =
            await requirementRepository.findByLeadId(
                lead.id
            );

        if (!requirements) {
            requirements =
                await requirementRepository.create(
                    lead.id
                );
        }
        // 2. Save structured intent
        await requirementRepository.updateIntent(
            lead.id,
            intent
        );

        // 3. Save raw answer
        await answerRepository.create({
            leadId: lead.id,
            questionKey: "intent",
            questionOrder: 1,
            answer: text,
            extractedValue: intent
        });

        // 4. Generate next question
        let reply = "";

        if (intent === "Buy") {
            reply =
                "Great! Which city are you looking to buy property in?";
        }
        
        if (intent === "Sell") {
            reply =
                "Sure! Which city is the property you want to sell located in?";
        }
        
        if (intent === "Rent") {
            reply =
                "Sure! Which city are you looking to rent property in?";
        }
        
        if (intent === "Invest") {
            reply =
                "Great! Which city are you interested in investing in?";
        }

            // 5. Save AI message
        await conversationRepository.create({
            leadId: lead.id,
            sender: "AI",
            message: reply,
            messageType: "text"
        });

        // 6. Send WhatsApp message
        await whatsappService.sendTextMessage(
            lead.whatsapp_number,
            reply
        );

        console.log(
            "AI reply sent:",
            reply
        );
    }

    private async handlePropertyInquiry(
        lead: any,
        text: string
    ) {

        console.log(
            "ACTION: Property Inquiry → entity extraction next"
        );
    }

    private async handlePriceInquiry(
        lead: any,
        text: string
    ) {

        console.log(
            "ACTION: Price Inquiry"
        );
    }

    private async handleAvailability(
        lead: any,
        text: string
    ) {

        console.log(
            "ACTION: Availability"
        );
    }

    private async handleResume(lead: any) {

        console.log(
            "ACTION: Resume Conversation"
        );
    }

    private async handleOutOfContext(
        lead: any
    ) {
    
        const reply =
            "I can help you with property-related inquiries. Are you looking to buy, sell, rent, or invest in a property?";
    
        await conversationRepository.create({
            leadId: lead.id,
            sender: "AI",
            message: reply,
            messageType: "text"
        });
    
        await whatsappService.sendTextMessage(
            lead.whatsapp_number,
            reply
        );
    
        console.log(
            "ACTION: Out of Context → AI reply saved and sent"
        );
    }

    private async handleSpam() {

        console.log(
            "ACTION: Spam → no qualification update"
        );
    }

    private async handleAbuse() {

        console.log(
            "ACTION: Abuse → professional response, no update"
        );
    }

    private async handleUnknown() {

        console.log(
            "ACTION: Unknown → clarification"
        );
    }
}

export default new ConversationFlow();