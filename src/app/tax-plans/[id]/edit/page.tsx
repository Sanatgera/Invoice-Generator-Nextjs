import TaxPlanForm from "@/components/tax-plans/TaxPlanForm";

async function getTaxPlan(id: string) {
  const res = await fetch(`http://localhost:3000/api/tax-plans/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch tax plan");
  return res.json();
}

export default async function EditTaxPlanPage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await getTaxPlan(params.id);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Tax Plan</h1>
      <TaxPlanForm defaultValues={data} id={params.id} />
    </div>
  );
}
