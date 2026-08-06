import { Request, Response, NextFunction } from "express";
import WebhookService from "./webhook.service";

class WebhookController {

    async verifyWebhook(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            const challenge =
                WebhookService.verifyWebhook(req.query);

            return res.status(200).send(challenge);

        } catch (error) {
            next(error);
        }
    }

    async receiveWebhook(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            await WebhookService.receiveMessage(req.body);

            return res.status(200).json({
                success: true
            });

        } catch (error) {
            next(error);
        }
    }

}

export default new WebhookController();