import {db} from "../database/connection";

interface CreateAnswerInput {
    leadId: string;
    questionKey: string;
    questionOrder: number;
    answer: string;
    extractedValue?: string | null;
}

class AnswerRepository {

    async create(data: CreateAnswerInput) {

        const result = await db.query(
            `
            INSERT INTO lead_answers (
                lead_id,
                question_key,
                question_order,
                answer,
                extracted_value
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [
                data.leadId,
                data.questionKey,
                data.questionOrder,
                data.answer,
                data.extractedValue || null
            ]
        );

        return result.rows[0];
    }
}

export default new AnswerRepository();