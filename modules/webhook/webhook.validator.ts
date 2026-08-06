import { Request } from "express";

export const validateWebhookVerification = (req: Request) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (!mode || !token || !challenge) {
    throw new Error("Missing webhook verification parameters.");
  }

  return {
    mode: String(mode),
    token: String(token),
    challenge: String(challenge),
  };
};