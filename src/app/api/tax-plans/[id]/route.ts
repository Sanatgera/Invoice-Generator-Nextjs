// src/app/api/tax-plans/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongoose";
import TaxPlan from "../../../../models/TaxPlan";
import { taxPlanSchema, taxPlanUpdateSchema } from "../../../../validation/taxPlan";
import { z } from "zod";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await dbConnect();
  const doc = await TaxPlan.findById(id).lean();
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: doc }, { status: 200 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const body = await request.json();
    const parsed = taxPlanUpdateSchema.parse(body); // allow partial
    await dbConnect();
    const updated = await TaxPlan.findByIdAndUpdate(id, parsed, { new: true, runValidators: true }).lean();
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
     return NextResponse.json({ error: err.issues }, { status: 422 });
    }
    console.error("TaxPlan PUT error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await dbConnect();
  const deleted = await TaxPlan.findByIdAndDelete(id).lean();
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: deleted }, { status: 200 });
}
