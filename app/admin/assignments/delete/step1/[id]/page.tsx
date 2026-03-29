"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { X, AlertCircle, Trash2 } from "lucide-react";

export default function DeleteAssignmentStep1Page() {
  const params = useParams();
  const router = useRouter();
  const [isLinked, setIsLinked] = useState(false);

  const handleDelete = () => {
    if (isLinked) {
      router.push(`/admin/assignments/delete/step2/${params.id}`);
    } else {
      // Mock delete and return
      router.push("/admin/assignments");
    }
  };

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

          <div className="bg-slate-50 border border-gray-200 rounded-xl p-4 flex items-center gap-4 group cursor-pointer hover:border-blue-400 transition-colors" onClick={() => setIsLinked(!isLinked)}>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isLinked ? 'bg-blue-600 border-blue-600 shadow-md shadow-blue-200' : 'border-gray-300'}`}>
              {isLinked && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
            </div>
            <span className="text-sm font-semibold text-gray-700 select-none">Is this assignment assigned to any batch?</span>
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
            onClick={handleDelete}
            className="flex-1 px-6 py-3 bg-red-500 text-white font-bold text-sm rounded-xl hover:bg-red-600 transition shadow-lg shadow-red-200 flex items-center justify-center gap-2"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>

      </div>
    </div>
  );
}
