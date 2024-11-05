import express from "express";
import setupExpress from "./express";

const app = express();
setupExpress(app);

export default app;
