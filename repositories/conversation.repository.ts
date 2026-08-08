import {db} from "../database/connection";

interface CreateConversationInput {
    leadId: string;
    sender: "Customer" | "AI";
    message: string;
    messageType?: string;
}

class ConversationRepository {

    async create(
        data: CreateConversationInput
    ) {

        const result = await db.query(
            `
            INSERT INTO lead_conversations (
                lead_id,
                sender,
                message,
                message_type
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
            [
                data.leadId,
                data.sender,
                data.message,
                data.messageType || "text"
            ]
        );

        return result.rows[0];
    }
}

export default new ConversationRepository();