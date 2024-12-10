import { Content, Label } from "../models";
import { LabelService } from "./label.service";
import { UserService } from "./user.service";
import { CategoryService } from "./category.service";
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

  static async getVerifiedContentsByLabel(labelId: string) {
    const labelExists = await LabelService.getLabelById(labelId);

    if (!labelExists) {
      throw new Error("Etiqueta no encontrada");
    }

    return Content.find({ labelId, verified: true });
  }

  static async getUnverifiedContentsByLabel(labelId: string) {
    const labelExists = await LabelService.getLabelById(labelId);

    if (!labelExists) {
      throw new Error("Etiqueta no encontrada");
    }

    return Content.find({ labelId, verified: false });
  }

  static async getContentsByContributor(contributorId: string) {
    const contributorExists = await UserService.getUserById(contributorId);

    if (!contributorExists) {
      throw new Error("Contribuyente no encontrado");
    }

    return Content.find({ contributorId });
  }

  static async createContent({
    fileBuffer,
    labelId,
    contributorId,
    categoryId,
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

      if (!categoryId) {
        throw new Error("Categoría requerida");
      }

      const categoryExists = await CategoryService.getCategoryById(categoryId);

      if (!categoryExists) {
        throw new Error("Categoría no encontrada");
      }

      // If label doesn't exist and labelName is provided, create label
      label = await LabelService.createLabel({ name: labelName, categoryId });

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

    const defaultVerified = contributor.role === "user" ? false : true;

    const content = await Content.create({
      url: result.secure_url,
      labelId,
      contributorId,
      verified: defaultVerified,
    });

    // Set primary content for the label if it doesn't have one
    if (!label.primaryContent) {
      await LabelService.setPrimaryContent(labelId, content._id.toString());
    }

    return content;
  }

  static async verifyContent(contentId: string) {
    const contentExists = await this.getContentById(contentId);

    if (!contentExists) {
      throw new Error("Contenido no encontrado");
    }

    // Verificar el contenido
    const content = await Content.findByIdAndUpdate(
      contentId,
      { verified: true },
      { new: true },
    );

    // Obtain the labelId of the content
    const labelId = contentExists.labelId;

    if (labelId) {
      await this.updateLabelReliability(labelId.toString());
    }

    const label = await LabelService.getLabelById(labelId.toString());

    if (
      label?.primaryContent === null ||
      label?.primaryContent?.toString() === ""
    ) {
      await LabelService.setPrimaryContent(labelId.toString(), contentId);
    }

    return content;
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

    if (!contentExists.labelId) {
      throw new Error("El contenido no tiene un Label asociado.");
    }

    const label = await LabelService.getLabelById(
      contentExists.labelId.toString(),
    );

    if (label?.primaryContent?.toString() === contentId) {
      label.primaryContent = null;
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
