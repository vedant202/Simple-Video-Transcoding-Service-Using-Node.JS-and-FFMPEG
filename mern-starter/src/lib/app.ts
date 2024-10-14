import express from "express";
import cors from "cors";
import { TranscodeRoutes } from "../routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/transcode",TranscodeRoutes)
app.disable("x-powered-by");

export default app;

