import { Label, Content } from "../models";
import { CreateLabel, UpdateLabel } from "../types";

export class LabelService {
  static async getLabels() {
    return Label.find().populate("primaryContentId");
  }

  static async getLabelById(labelId: string) {
    return Label.findById(labelId).populate("primaryContentId");
  }

  static async getLabelByName(name: string) {
    return Label.findOne({ name }).populate("primaryContentId");
  }

  static getLabelsByCategory(categoryId: string) {
    return Label.find({ categoryId }).populate("primaryContentId");
  }

  static async createLabel(label: CreateLabel) {
    const labelWithSameName = await Label.findOne({ name: label.name });

    if (labelWithSameName) {
      throw new Error("Etiqueta ya existe");
    }

    return Label.create(label);
  }

  static async updateLabel(labelId: string, label: UpdateLabel) {
    const labelExists = await this.getLabelById(labelId);

    if (!labelExists) {
      throw new Error("Etiqueta no encontrada");
    }

    const labelWithSameName = await Label.findOne({ name: label.name });

    if (labelWithSameName) {
      throw new Error("Etiqueta ya existe");
    }

    return Label.findByIdAndUpdate(labelId, label, { new: true });
  }

  static async verifyLabel(labelId: string) {
    const labelExists = await this.getLabelById(labelId);

    if (!labelExists) {
      throw new Error("Etiqueta no encontrada");
    }

    return Label.findByIdAndUpdate(labelId, { verified: true }, { new: true });
  }

  static async setPrimaryContent(labelId: string, contentId: string) {
    const labelExists = await this.getLabelById(labelId);

    if (!labelExists) {
      throw new Error("Etiqueta no encontrada");
    }

    return Label.findByIdAndUpdate(
      labelId,
      { primaryContentId: contentId },
      { new: true },
    );
  }

  static async deleteLabel(labelId: string) {
    const labelExists = await this.getLabelById(labelId);

    if (!labelExists) {
      throw new Error("Etiqueta no encontrada");
    }

    // await Content.deleteMany({ labelId });
    await Content.updateMany({ labelId }, { $pull: { labelId } });

    return Label.findByIdAndDelete(labelId);
  }
}
