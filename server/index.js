import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { Configuration, OpenAIApi } from "openai";
import openAiRoutes from "./routes/openai.js";
import authRoutes from "./routes/auth.js";
import path from "path";
// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Open AI Configurations
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
export const openai = new OpenAIApi(configuration);

// Routes
app.use("/openai", openAiRoutes);
app.use("/auth", authRoutes);

// Server Setup
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
