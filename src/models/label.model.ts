import mongoose from "mongoose";

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  reliability: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Label = mongoose.model("Label", labelSchema);
export default Label;
