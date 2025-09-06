// src/app/api/tax-plans/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import TaxPlan from "../../../models/TaxPlan";
import { taxPlanSchema } from "../../../validation/taxPlan";
import { z } from "zod";

export async function GET() {
  await dbConnect();
  const list = await TaxPlan.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ data: list }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // if values might be strings, consider pre-processing before parsing
    const parsed = taxPlanSchema.parse(body);

    await dbConnect();
    const created = await TaxPlan.create(parsed);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
     return NextResponse.json({ error: err.issues }, { status: 422 });

    }
    console.error("TaxPlan POST error:", err);
    return NextResponse.json({ error: (err && err.message) || "Unknown error" }, { status: 500 });
  }
}
