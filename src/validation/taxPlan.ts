// src/validation/taxPlan.ts
import { z } from "zod";

/**
 * Input schema for creating a tax plan. We require numeric fields.
 * If the client might send numbers as strings, you can adapt with preprocess.
 */
export const taxPlanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  cgst: z.number().min(0, "CGST must be >= 0"),
  sgst: z.number().min(0, "SGST must be >= 0"),
  igst: z.number().min(0, "IGST must be >= 0"),
});

export const taxPlanUpdateSchema = taxPlanSchema.partial(); // for PUT (allow partial)

export type TaxPlanInput = z.infer<typeof taxPlanSchema>;
export type TaxPlanUpdateInput = z.infer<typeof taxPlanUpdateSchema>;
