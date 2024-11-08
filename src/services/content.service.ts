import { Content, Label } from "../models";
import { LabelService } from "./label.service";
import { UserService } from "./user.service";
import { CreateContent } from "../types";
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
    if (!contributorId || contributorId === "") {
      throw new Error("Contribuyente requerido");
    }

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

    // Verificar el contenido
    await Content.findByIdAndUpdate(
      contentId,
      { verified: true },
      { new: true },
    );

    // Obtain the labelId of the content
    const labelId = contentExists.labelId;

    if (labelId) {
      await this.updateLabelReliability(labelId.toString());
    }

    return contentExists;
  }

  static async updateLabelReliability(labelId: string) {
    const MIN_CONTENTS_THRESHOLD = 10;

    // Obtain all contents for the label
    const allContents = await this.getContentsByLabel(labelId);
    const totalContents = allContents.length;

    if (totalContents < MIN_CONTENTS_THRESHOLD) {
      // If the label has less than 10 contents, set reliability to 0
      return Label.findByIdAndUpdate(labelId, { reliability: 0 });
    }

    // Calculate the number of verified contents
    const verifiedContents = allContents.filter(
      (content) => content.verified,
    ).length;

    // Calculate the reliability
    const reliability = (verifiedContents / totalContents) * 100;

    // Update the label reliability
    return Label.findByIdAndUpdate(labelId, { reliability });
  }

  static async deleteContent(contentId: string) {
    const contentExists = await this.getContentById(contentId);

    if (!contentExists) {
      throw new Error("Contenido no encontrado");
    }

    // Delete image from cloudinary
    const publicId = this.extractPublicId(contentExists.url);

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    return Content.findByIdAndDelete(contentId);
  }

  private static extractPublicId(url: string): string {
    const pathArray = url.split("/");
    const startIndex = pathArray.findIndex(
      (segment) => segment === "signs_lang_app",
    );
    const publicIdWithExt = pathArray.slice(startIndex).join("/");
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");

    return publicId;
  }
}
