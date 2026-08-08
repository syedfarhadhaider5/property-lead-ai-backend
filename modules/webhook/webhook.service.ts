import whatsappConfig from "../../config/whatsapp.config";
import { AIService } from "../ai/ai.service";
import conversationService from "../conversation/conversation.service";

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

        const value =
            body?.entry?.[0]
                ?.changes?.[0]
                ?.value;

        const message = value?.messages?.[0];

        if (!message) {
            console.log("No incoming message");
            return;
        }

        const from = message.from;

        const name =
            value?.contacts?.[0]?.profile?.name || null;

        let text = "";

        if (message.type === "text") {
            text = message.text.body;
        }

        if (!text) {
            console.log("Unsupported or empty message");
            return;
        }

        console.log("----------------------");
        console.log("Name    :", name);
        console.log("Phone   :", from);
        console.log("Message :", text);
        console.log("----------------------");

        await conversationService.handleIncomingMessage(
            from,
            name,
            text
        );
    }
}

export default new WebhookService();