import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  labelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Label",
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  contributorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Content", contentSchema);
