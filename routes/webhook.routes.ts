import { Router } from "express";
import WebhookController from "../modules/webhook/webhook.controller";

const router = Router();

router.get(
    "/whatsapp",
    WebhookController.verifyWebhook
);

router.post(
    "/whatsapp",
    WebhookController.receiveWebhook
);

export default router;