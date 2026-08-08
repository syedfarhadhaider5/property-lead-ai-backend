import {db} from "../database/connection";

class RequirementRepository {

    async findByLeadId(leadId: string) {

        const result = await db.query(
            `
            SELECT *
            FROM lead_requirements
            WHERE lead_id = $1
            LIMIT 1
            `,
            [leadId]
        );

        return result.rows[0] || null;
    }

    async create(leadId: string) {

        const result = await db.query(
            `
            INSERT INTO lead_requirements (
                lead_id
            )
            VALUES ($1)
            RETURNING *
            `,
            [leadId]
        );

        return result.rows[0];
    }

    async updateIntent(
        leadId: string,
        intent: string
    ) {

        const result = await db.query(
            `
            UPDATE lead_requirements
            SET
                intent = $2,
                updated_at = NOW()
            WHERE lead_id = $1
            RETURNING *
            `,
            [
                leadId,
                intent
            ]
        );

        return result.rows[0];
    }
}

export default new RequirementRepository();