import { Content } from "../models";
import { LabelService } from "./label.service";
import { UserService } from "./user.service";
import { CreateContent } from "../types";
import { promises as fs } from "fs";
import cloudinary from "../config/cloudinary.config";

export class ContentService {
  static async getContents() {
    return Content.find();
  }

  static async getContentById(contentId: string) {
    return Content.findById(contentId);
  }

  static async getContentsByLabel(labelId: string) {
    const labelExists = await LabelService.getLabelById(labelId);

    if (!labelExists) {
      throw new Error("Etiqueta no encontrada");
    }

    return Content.find({ labelId });
  }

  static async createContent({
    fileBuffer,
    labelId,
    contributorId,
    labelName,
  }: CreateContent) {
    // Validate if contributor exists
    const contributor = await UserService.getUserById(contributorId);

    if (!contributor) {
      throw new Error("Contribuyente no encontrado");
    }

    let label;

    // Validate if label exists
    if (labelId) {
      label = await LabelService.getLabelById(labelId);

      if (!label) {
        throw new Error("Etiqueta no encontrada");
      }
    } else {
      if (!labelName) {
        throw new Error("Nombre de etiqueta requerido");
      }

      // If label doesn't exist and labelName is provided, create label
      label = await LabelService.createLabel(labelName);
      labelId = label._id.toString();
    }

    // Upload image to cloudinary
    const uploadStream = cloudinary.uploader.upload_stream;
    const result: any = await new Promise((resolve, reject) => {
      const stream = uploadStream(
        { folder: `signs_lang_app/content/${labelId}` },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(fileBuffer);
    });

    return Content.create({ url: result.secure_url, labelId, contributorId });
  }

  static async verifyContent(contentId: string) {
    const contentExists = await this.getContentById(contentId);

    if (!contentExists) {
      throw new Error("Contenido no encontrado");
    }

    return Content.findByIdAndUpdate(
      contentId,
      { verified: true },
      { new: true },
    );
  }

  static async deleteContent(contentId: string) {
    const contentExists = await this.getContentById(contentId);

    if (!contentExists) {
      throw new Error("Contenido no encontrado");
    }

    return Content.findByIdAndDelete(contentId);
  }
}
