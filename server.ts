import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { db } from "./database/connection";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await db.query("SELECT NOW()");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to PostgreSQL");
    console.error(error);
    process.exit(1);
  }
}

startServer();