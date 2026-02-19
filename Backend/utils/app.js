import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookeParser from "cookie-parser";
import { urlencoded } from "express";
import fileUpload from "express-fileupload";
import { createTable } from "./createTable.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";
import authRoutes from "../routes/auth.route.js";

const app = express();

config({ path: "config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URI, process.env.DASHBOARD_URI],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  }),
);
app.use(cookeParser());

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./public/temp",
  }),
);

app.use("/api/v1/auth", authRoutes);

createTable();

app.use(errorMiddleware);

export default app;
