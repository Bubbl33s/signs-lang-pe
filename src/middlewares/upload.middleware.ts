import { Request } from "express";
import multer from "multer";
import path from "path";

const storageContent = multer.diskStorage({
  destination: function (
    _req: Request,
    _file: Express.Multer.File,
    cb: Function,
  ) {
    cb(null, "uploads/");
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: storageContent,
});
