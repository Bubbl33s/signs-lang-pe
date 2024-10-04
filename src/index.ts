import express, { Request, Response } from "express";
import userRoutes from "./proof";

const app = express();
const port = 3000;

app.use("/api", userRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
