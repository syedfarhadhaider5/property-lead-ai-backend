import { Router } from "express";
import webhookRoutes from "./webhook.routes";

const router = Router();

router.use("/webhooks", webhookRoutes);

export default router;