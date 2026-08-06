import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.routes";
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", routes);


app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Property Lead AI API Running"
  });
});

export default app;