import { Content } from "../models";
import { LabelService } from "./label.service";
import { UserService } from "./user.service";
import { CreateContent } from "../types";

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
    url,
    labelId,
    contributorId,
    labelName,
  }: CreateContent) {
    const contributor = await UserService.getUserById(contributorId);

    if (!contributor) {
      throw new Error("Contribuyente no encontrado");
    }

    let label;

    if (labelId) {
      label = await LabelService.getLabelById(labelId);

      if (!label) {
        throw new Error("Etiqueta no encontrada");
      }
    } else {
      if (!labelName) {
        throw new Error("Nombre de etiqueta requerido");
      }

      label = await LabelService.createLabel(labelName);

      labelId = label._id.toString();
    }

    return Content.create({ url, labelId, contributorId });
  }

  static async verifiyContent(contentId: string) {
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
