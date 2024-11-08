import { Application } from "express";
import userRoutes from "./user.routes";
import labelRoutes from "./label.routes";

export default function routes(app: Application) {
  app.get("/", (_, res) => {
    res.send("Hello World");
  });

  const API_PREFIX = "/api";

  app.use(`${API_PREFIX}/users`, userRoutes);
  app.use(`${API_PREFIX}/labels`, labelRoutes);
}
