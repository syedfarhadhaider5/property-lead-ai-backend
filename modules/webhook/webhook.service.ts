import whatsappConfig from "../../config/whatsapp.config";
import { AIService } from "../ai/ai.service";

const aiService = new AIService();

class WebhookService {

    verifyWebhook(query: any) {

        const mode = query["hub.mode"];
        const token = query["hub.verify_token"];
        const challenge = query["hub.challenge"];

        if (
            mode === "subscribe" &&
            token === whatsappConfig.verifyToken
        ) {

            console.log("Webhook Verified");

            return challenge;
        }

        throw new Error("Webhook Verification Failed");
    }

    async receiveMessage(body: any) {

        console.log(
            JSON.stringify(body, null, 2)
        );

        const message =
            body?.entry?.[0]
                ?.changes?.[0]
                ?.value
                ?.messages?.[0];

        if (!message) {

            console.log("No incoming message");

            return;
        }

        const from = message.from;

        let text = "";

        if (message.type === "text") {
            text = message.text.body;
        }

        console.log("----------------------");
        console.log("Phone :", from);
        console.log("Message :", text);
        console.log("----------------------");

        const aiResponse = await aiService.chat(text);

        console.log(aiResponse);
        
        /**
         * Later
         *
         * ConversationService.handleIncomingMessage(
         *      from,
         *      text
         * );
         */

    }

}

export default new WebhookService();