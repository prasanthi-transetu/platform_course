"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DeleteInstitutionPage() {

  const params = useParams();
  const router = useRouter();

  const [institution, setInstitution] = useState<any>(null);
  const [checked, setChecked] = useState(false);
  const [hasActiveBatches, setHasActiveBatches] = useState(false);

  useEffect(() => {

    const storedInstitutions =
      JSON.parse(localStorage.getItem("institutions") || "[]");

    const inst = storedInstitutions.find(
      (i: any) => i.id === params?.id
    );

    setInstitution(inst);

  }, [params]);


  const handleCheck = () => {

    setChecked(true);

    const batches =
      JSON.parse(localStorage.getItem("batches") || "[]");

    const activeBatchExists = batches.some(
      (b: any) =>
        b.institutionId === params?.id &&
        b.status === "Active"
    );

    setHasActiveBatches(activeBatchExists);

  };


  const handleDelete = () => {

    const storedInstitutions =
      JSON.parse(localStorage.getItem("institutions") || "[]");

    const updatedInstitutions = storedInstitutions.filter(
      (i: any) => i.id !== params?.id
    );

    localStorage.setItem(
      "institutions",
      JSON.stringify(updatedInstitutions)
    );

    router.push("/admin/institutions");

  };


  if (!institution) {
    return (
      <div className="p-10 text-center text-gray-800">
        Institution not found
      </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow-lg w-[450px]">

        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Delete Institution
        </h2>

        <p className="text-sm text-gray-700 mb-4">
          You are about to delete
          <span className="font-semibold">
            {" "} {institution.name}
          </span>
        </p>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            onChange={handleCheck}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700">
            Check if institution has active batches
          </span>
        </div>

        {checked && hasActiveBatches && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            Deletion is not possible because this institution has
            active batches. Remove those batches first.
          </div>
        )}

        {checked && !hasActiveBatches && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
            No active batches found. You can delete this institution.
          </div>
        )}

        <div className="flex justify-end gap-4">

          <Link
            href="/admin/institutions"
            className="text-gray-600"
          >
            Cancel
          </Link>

          <button
            onClick={handleDelete}
            disabled={!checked || hasActiveBatches}
            className={`px-4 py-2 rounded text-white ${
              !checked || hasActiveBatches
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Delete Institution
          </button>

        </div>

      </div>

    </div>
  );
}