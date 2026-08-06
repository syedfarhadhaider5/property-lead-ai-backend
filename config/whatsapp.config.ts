import dotenv from "dotenv";

dotenv.config();

export default {
  verifyToken: process.env.WHATSAPP_VERIFY_TOKEN!,
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN!,
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID!,
};