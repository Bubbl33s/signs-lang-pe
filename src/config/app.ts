import express from "express";
import setupExpress from "./express";
import { errorHandler } from "../middlewares";
import routes from "../routes";

const app = express();
setupExpress(app);
routes(app);
app.use(errorHandler);

export default app;
