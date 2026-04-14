"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// This page has been replaced by the inline EditStudentModal on /admin/students.
// Redirect any direct visits to the main students page.
export default function EditStudentRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/students");
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3 text-gray-500">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium">Redirecting...</p>
      </div>
    </div>
  );
}