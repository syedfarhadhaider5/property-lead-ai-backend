import {db} from "../../database/connection";

interface CreateLeadInput {
    whatsappNumber: string;
    fullName?: string | null;
}

class LeadRepository {

    async findByWhatsappNumber(
        whatsappNumber: string
    ) {

        const result = await db.query(
            `
            SELECT *
            FROM leads
            WHERE whatsapp_number = $1
            LIMIT 1
            `,
            [whatsappNumber]
        );

        return result.rows[0] || null;
    }

    async create(
        data: CreateLeadInput
    ) {

        const result = await db.query(
            `
            INSERT INTO leads (
                whatsapp_number,
                full_name,
                source
            )
            VALUES ($1, $2, 'WhatsApp')
            RETURNING *
            `,
            [
                data.whatsappNumber,
                data.fullName || null
            ]
        );

        return result.rows[0];
    }
}

export default new LeadRepository();