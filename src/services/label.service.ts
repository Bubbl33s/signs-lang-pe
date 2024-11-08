import { Label, Content } from "../models";

export class LabelService {
  static async getLabels() {
    return Label.find();
  }

  static async getLabelById(labelId: string) {
    return Label.findById(labelId);
  }

  static async getLabelByName(name: string) {
    return Label.findOne({ name });
  }

  static async createLabel(name: string) {
    const labelWithSameName = await Label.findOne({ name });

    if (labelWithSameName) {
      throw new Error("Etiqueta ya existe");
    }

    return Label.create({ name });
  }

  static async updateLabel(labelId: string, name: string) {
    const labelExists = await this.getLabelById(labelId);

    if (!labelExists) {
      throw new Error("Etiqueta no encontrada");
    }

    const labelWithSameName = await Label.findOne({ name });

    if (labelWithSameName) {
      throw new Error("Etiqueta ya existe");
    }

    return Label.findByIdAndUpdate(labelId, { name }, { new: true });
  }

  static async verifyLabel(labelId: string) {
    const labelExists = await this.getLabelById(labelId);

    if (!labelExists) {
      throw new Error("Etiqueta no encontrada");
    }

    return Label.findByIdAndUpdate(labelId, { verified: true }, { new: true });
  }

  static async deleteLabel(labelId: string) {
    const labelExists = await this.getLabelById(labelId);

    if (!labelExists) {
      throw new Error("Etiqueta no encontrada");
    }

    // await Content.deleteMany({ labels: labelId });
    await Content.updateMany(
      { labels: labelId },
      { $pull: { labels: labelId } },
    );

    return Label.findByIdAndDelete(labelId);
  }
}
