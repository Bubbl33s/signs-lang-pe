import { Label, Content } from "../models";
import { CreateLabel, UpdateLabel } from "../types";

export class LabelService {
  static async getLabels() {
    return Label.find().populate("primaryContent");
  }

  static async getLabelsWithContentCount() {
    const results = await Label.aggregate([
      {
        $lookup: {
          from: "contents",
          localField: "_id",
          foreignField: "labelId",
          as: "contents",
        },
      },
      {
        $lookup: {
          from: "contents",
          localField: "primaryContent",
          foreignField: "_id",
          as: "primaryContent",
        },
      },
      {
        $addFields: {
          unverifiedCount: {
            $size: {
              $filter: {
                input: "$contents",
                as: "content",
                cond: { $eq: ["$$content.verified", false] },
              },
            },
          },
          verifiedCount: {
            $size: {
              $filter: {
                input: "$contents",
                as: "content",
                cond: { $eq: ["$$content.verified", true] },
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          categoryId: 1,
          reliability: 1,
          verified: 1,
          primaryContent: { $first: "$primaryContent" },
          createdAt: 1,
          verifiedCount: 1,
          unverifiedCount: 1,
        },
      },
    ]);

    return results;
  }

  static async getLabelById(labelId: string) {
    return Label.findById(labelId).populate("primaryContent");
  }

  static async getLabelByName(name: string) {
    return Label.findOne({ name }).populate("primaryContent");
  }

  static getLabelsByCategory(categoryId: string) {
    return Label.find({ categoryId }).populate("primaryContent");
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
      { primaryContent: contentId },
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
