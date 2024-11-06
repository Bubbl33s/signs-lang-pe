import { Application } from "express";
import userRoutes from "./user.routes";

export default function routes(app: Application) {
  app.get("/", (_, res) => {
    res.send("Hello World");
  });

  app.get("/hello", (_, res) => {
    res.send("Hello World!!!!!");
  });

  const API_PREFIX = "/api";

  app.use(`${API_PREFIX}/users`, userRoutes);
}
