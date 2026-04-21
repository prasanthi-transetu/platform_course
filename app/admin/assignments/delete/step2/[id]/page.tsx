"use client";

import { useParams, useRouter } from "next/navigation";
import { X, TriangleAlert } from "lucide-react";

export default function DeleteAssignmentStep2Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-900/10 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 scale-100">
        
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-gray-50">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Confirm Delete
          </h2>
          <button 
            onClick={() => router.push("/admin/assignments")}
            className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8">
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Are you sure you want to delete assignment <span className="font-bold text-gray-900">Introduction to Web Ethics</span>?
          </p>

          <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4 text-red-500 font-bold text-sm mb-2">
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span>Is this assignment assigned to any batch?</span>
            </div>
            
            <div className="flex gap-3 text-red-600/80">
              <TriangleAlert size={18} className="shrink-0 mt-0.5" />
              <p className="text-xs font-semibold leading-relaxed">
                Deletion Blocked: This assignment is currently linked to one or more active batches. Please unassign it from all batches before attempting to delete.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-center gap-3 p-6 pt-0">
          <button
            onClick={() => router.push("/admin/assignments")}
            className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-100 transition shadow-sm"
          >
            Cancel
          </button>
          <button 
            disabled
            className="flex-1 px-6 py-3 bg-slate-100 text-slate-400 font-bold text-sm rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
          >
             Delete
          </button>
        </div>

      </div>
    </div>
  );
}
