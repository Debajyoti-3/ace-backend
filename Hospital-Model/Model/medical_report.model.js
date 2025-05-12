import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    diagonsedWith: [
      {
        type: String,
        required: true,
      },
    ],
    patientData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", reportSchema);
