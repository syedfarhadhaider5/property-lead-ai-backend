import axios from "axios";
import whatsappConfig from "../config/whatsapp.config";

class WhatsAppService {

    async sendTextMessage(
        to: string,
        message: string
    ) {

        const url =
            `https://graph.facebook.com/v23.0/${whatsappConfig.phoneNumberId}/messages`;

        const response = await axios.post(
            url,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to,
                type: "text",
                text: {
                    preview_url: false,
                    body: message
                }
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${whatsappConfig.accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log(
            "WhatsApp message sent:",
            response.data
        );

        return response.data;
    }
}

export default new WhatsAppService();