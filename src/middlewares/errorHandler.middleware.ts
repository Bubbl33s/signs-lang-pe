import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof Error) {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
}
