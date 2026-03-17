"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existingStudents =
      JSON.parse(localStorage.getItem("students") || "[]");

    const updatedStudents = [...existingStudents, student];

    localStorage.setItem("students", JSON.stringify(updatedStudents));

    router.push("/admin/students");
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

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Student ID
            </label>
            <input
              type="text"
              name="id"
              value={student.id}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-gray-900"
              placeholder="STU-006"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Student Name
            </label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-gray-900"
              placeholder="Enter student name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-gray-900"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Institution
            </label>
            <input
              type="text"
              name="institution"
              value={student.institution}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-gray-900"
              placeholder="Enter institution"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Course
            </label>
            <input
              type="text"
              name="course"
              value={student.course}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-gray-900"
              placeholder="Enter course"
            />
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
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Student
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/students")}
              className="border px-5 py-2 rounded-lg text-gray-800 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
