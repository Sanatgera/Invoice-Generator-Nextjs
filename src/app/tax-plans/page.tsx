import GetTaxPlanTable from "@/components/tax-plans/GetTaxPlanTable";
import { fetchTaxPlans } from "@/lib/server/tax-plan";
import Link from "next/link";
import { Suspense } from "react";

export default async function TaxPlanListPage() {
  const dataPromise = fetchTaxPlans();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Tax Plans</h1>
        <Link
          href="/tax-plans/create"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add Tax Plan
        </Link>
      </div>
      <Suspense   >
        <GetTaxPlanTable dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
}
