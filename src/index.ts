import express, { Request, Response } from "express";
import connectDB from "./database";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 9090;

connectDB();

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
