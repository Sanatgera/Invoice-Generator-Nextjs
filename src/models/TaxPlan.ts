// src/models/TaxPlan.ts
import mongoose, { Document, Model } from "mongoose";

export interface ITaxPlan extends Document {
  name: string;
  cgst: number;
  sgst: number;
  igst: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaxPlanSchema = new mongoose.Schema<ITaxPlan>(
  {
    name: { type: String, required: true },
    cgst: { type: Number, required: true, min: 0 },
    sgst: { type: Number, required: true, min: 0 },
    igst: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// Avoid recompilation in dev (HMR)
const TaxPlan: Model<ITaxPlan> =
  (mongoose.models.TaxPlan as mongoose.Model<ITaxPlan>) ||
  mongoose.model<ITaxPlan>("TaxPlan", TaxPlanSchema);

export default TaxPlan;
