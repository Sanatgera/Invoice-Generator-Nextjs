// components/DeleteTaxPlanButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function DeleteTaxPlanButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this tax plan?")) return;

    try {
      const res = await fetch(`/api/tax-plans/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      router.refresh(); // Refresh the current route to show updated data
    } catch (err) {
      console.error(err);
      alert("Failed to delete tax plan");
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete
    </button>
  );
}