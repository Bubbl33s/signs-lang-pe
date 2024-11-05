import express from "express";
import setupExpress from "./config/express";
import path from "path";

const app = express();
setupExpress(app);
// Servir la carpeta uploads de forma estática
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

export default app;
