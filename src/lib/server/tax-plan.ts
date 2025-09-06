// lib/server/tax-plan.ts
import { ITaxPlan } from '@/models/TaxPlan';

export async function fetchTaxPlans(): Promise<ITaxPlan[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tax-plans`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tax plans");
  const json: { data: ITaxPlan[] } = await res.json();
  return json.data;
}


