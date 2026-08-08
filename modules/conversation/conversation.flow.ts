import {
    IntentDetectionResult
} from "../../types/ai.types";
import whatsappService from "../../services/whatsapp.service";
import conversationRepository
    from "../../repositories/conversation.repository";


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
        intent: string
    ) {

        console.log(
            `ACTION: ${intent} → save intent → ask city`
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