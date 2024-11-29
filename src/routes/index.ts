import { Application } from "express";
import userRoutes from "./user.routes";
import labelRoutes from "./label.routes";
import contentRoutes from "./content.routes";
import categoryRoutes from "./category.routes";

export default function routes(app: Application) {
  app.get("/", (_, res) => {
    res.redirect("/api/docs");
  });

  const API_PREFIX = "/api";

  app.use(`${API_PREFIX}/users`, userRoutes);
  app.use(`${API_PREFIX}/labels`, labelRoutes);
  app.use(`${API_PREFIX}/contents`, contentRoutes);
  app.use(`${API_PREFIX}/categories`, categoryRoutes);
}
