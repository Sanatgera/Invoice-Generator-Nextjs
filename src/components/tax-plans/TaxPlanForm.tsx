"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { taxPlanSchema, TaxPlanInput } from "@/validation/taxPlan";
import { useRouter } from "next/navigation";

interface Props {
  defaultValues?: Partial<TaxPlanInput>;
  id?: string; // when editing
}

export default function TaxPlanForm({ defaultValues, id }: Props) {
  const router = useRouter();

  const form = useForm<TaxPlanInput>({
    resolver: zodResolver(taxPlanSchema),
    defaultValues: defaultValues || {
      name: "",
      cgst: 0,
      sgst: 0,
      igst: 0,
    },
  });

  const onSubmit = async (values: TaxPlanInput) => {
    try {
      const res = await fetch(id ? `/api/tax-plans/${id}` : "/api/tax-plans", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push("/tax-plans");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          {...form.register("name")}
          className="border p-2 w-full"
        />
        {form.formState.errors.name && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">CGST (%)</label>
        <input
          type="number"
          step="0.01"
          {...form.register("cgst", { valueAsNumber: true })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">SGST (%)</label>
        <input
          type="number"
          step="0.01"
          {...form.register("sgst", { valueAsNumber: true })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">IGST (%)</label>
        <input
          type="number"
          step="0.01"
          {...form.register("igst", { valueAsNumber: true })}
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {id ? "Update" : "Create"}
      </button>
    </form>
  );
}
