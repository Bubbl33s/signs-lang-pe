import mongoose from "mongoose";

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    index: true,
  },
  reliability: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
    index: true,
  },
  verified: {
    type: Boolean,
    default: false,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Label = mongoose.model("Label", labelSchema);

export default Label;
