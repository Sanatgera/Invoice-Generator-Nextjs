import DeleteTaxPlanButton from "@/components/tax-plans/DeleteTaxPlanButton";
import { ITaxPlan } from "@/models/TaxPlan";
import { use } from 'react';

import Link from "next/link";

interface GetTaxPlanTableProps {
  dataPromise: Promise<ITaxPlan[]>;
}


export default function GetTaxPlanTable({ dataPromise }: GetTaxPlanTableProps) {
  const data = use(dataPromise); 
  console.log(data);
  
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-2 py-1">Name</th>
          <th className="border px-2 py-1">CGST</th>
          <th className="border px-2 py-1">SGST</th>
          <th className="border px-2 py-1">IGST</th>
          <th className="border px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((plan: any) => (
          <tr key={plan._id}>
            <td className="border px-2 py-1">{plan.name}</td>
            <td className="border px-2 py-1">{plan.cgst}</td>
            <td className="border px-2 py-1">{plan.sgst}</td>
            <td className="border px-2 py-1">{plan.igst}</td>
            <td className="space-x-2 border px-2 py-1">
              <Link
                href={`/tax-plans/${plan._id}/edit`}
                className="text-blue-600"
              >
                Edit
              </Link>
              <DeleteTaxPlanButton id={plan._id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
