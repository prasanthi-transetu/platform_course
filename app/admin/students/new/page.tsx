"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { isEmpty, isValidEmail, hasMinLength, inputErrorClass, errorTextClass } from "@/lib/validation";
import { createStudent } from "@/features/students/api";

export default function AddStudentPage() {

  const router = useRouter();

  const [student, setStudent] = useState({
    id: "",
    name: "",
    email: "",
    institution: "",
    course: "",
    status: "Active",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, student[name as keyof typeof student]);
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "id":
        if (isEmpty(value)) error = "Student ID is required";
        else if (!hasMinLength(value, 3)) error = "Student ID must be at least 3 characters";
        break;
      case "name":
        if (isEmpty(value)) error = "Student name is required";
        else if (!hasMinLength(value, 2)) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (isEmpty(value)) error = "Email is required";
        else if (!isValidEmail(value)) error = "Please enter a valid email address";
        break;
      case "institution":
        if (isEmpty(value)) error = "Institution is required";
        break;
      case "course":
        if (isEmpty(value)) error = "Course is required";
        break;
    }

    setErrors((prev) => {
      if (error) return { ...prev, [name]: error };
      const next = { ...prev };
      delete next[name];
      return next;
    });

    return error;
  };

  const validateAll = (): boolean => {
    const fields = ["id", "name", "email", "institution", "course"];
    const allTouched: Record<string, boolean> = {};
    let hasError = false;

    for (const field of fields) {
      allTouched[field] = true;
      const error = validateField(field, student[field as keyof typeof student]);
      if (error) hasError = true;
    }

    setTouched((prev) => ({ ...prev, ...allTouched }));
    return !hasError;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) return;

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const result = await createStudent(student);
      console.log("Student created:", result.data || result);

      // Redirect to students list — the new student will appear in the table
      router.push("/admin/students");
    } catch (err: any) {
      console.error("Error creating student:", err);
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (field: string) => {
    const base = "w-full border rounded-lg px-3 py-2 text-gray-900 transition-all duration-200";
    return touched[field] && errors[field] ? `${base} ${inputErrorClass}` : base;
  };

  const ErrorMsg = ({ field }: { field: string }) => {
    if (!touched[field] || !errors[field]) return null;
    return (
      <p className={errorTextClass}>
        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
        {errors[field]}
      </p>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Blur Background */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-xl p-8">

        {/* Close Button */}
        <button
          onClick={() => router.push("/admin/students")}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Add New Student
        </h2>

        {submitError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Student ID <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="id"
              value={student.id}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("id")}
              placeholder="STU-006"
            />
            <ErrorMsg field="id" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Student Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("name")}
              placeholder="Enter student name"
            />
            <ErrorMsg field="name" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("email")}
              placeholder="Enter email"
            />
            <ErrorMsg field="email" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Institution <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="institution"
              value={student.institution}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("institution")}
              placeholder="Enter institution"
            />
            <ErrorMsg field="institution" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Course <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="course"
              value={student.course}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("course")}
              placeholder="Enter course"
            />
            <ErrorMsg field="course" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Status
            </label>
            <select
              name="status"
              value={student.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-gray-900"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                "Save Student"
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/students")}
              disabled={isSubmitting}
              className="border px-5 py-2 rounded-lg text-gray-800 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
