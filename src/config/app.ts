import express from "express";
import setupExpress from "./express";
import { errorHandler } from "../middlewares";

const app = express();
setupExpress(app);
app.use(errorHandler);

export default app;
