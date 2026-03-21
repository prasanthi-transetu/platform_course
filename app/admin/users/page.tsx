"use client";

import { useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const batches = [
    {
      id: "CS-2024-B1",
      course: "Advanced Web Architecture",
      instructor: "Dr. Robert Fox",
      students: 42,
      module: "React Hooks",
      progress: 65,
      dept: "Computer Science",
    },
    {
      id: "MECH-2024-A",
      course: "Fluid Mechanics",
      instructor: "Prof. Anita Kumar",
      students: 38,
      module: "Viscosity",
      progress: 28,
      dept: "Mechanical",
    },
    {
      id: "EC-2023-C2",
      course: "Digital Signal Processing",
      instructor: "James Lee",
      students: 45,
      module: "FFT Analysis",
      progress: 82,
      dept: "Electronics",
    },
    {
      id: "AI-2024-S1",
      course: "Neural Networks",
      instructor: "Sarah Watson",
      students: 35,
      module: "Perceptrons",
      progress: 15,
      dept: "AI",
    },
    {
      id: "CIV-2024-A",
      course: "Structural Analysis",
      instructor: "Thomas H",
      students: 50,
      module: "Bridge Design",
      progress: 90,
      dept: "Civil",
    },
    {
      id: "EEE-2024-B",
      course: "Power Systems",
      instructor: "Michael Scott",
      students: 41,
      module: "Transformers",
      progress: 48,
      dept: "Electrical",
    },
  ];

  const departments = [
    "All Departments",
    "Computer Science",
    "Mechanical",
    "Electronics",
    "AI",
    "Civil",
    "Electrical",
  ];

  const [department, setDepartment] = useState("All Departments");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 3;

  const filtered =
    department === "All Departments"
      ? batches
      : batches.filter((b) => b.dept === department);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const start = (currentPage - 1) * rowsPerPage;
  const data = filtered.slice(start, start + rowsPerPage);

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-900">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Batch Management</h1>

          <p className="text-gray-700">
            Overview of active batches and academic progression
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow">
          + Add New Batch
        </button>
      </div>

      {/* SEARCH + FILTER */}

      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search batch name or tutor..."
          className="border border-gray-400 px-4 py-2 rounded-lg w-80"
        />

        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-400 px-4 py-2 rounded-lg"
        >
          {departments.map((d, i) => (
            <option key={i}>{d}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 font-semibold">
            <tr>
              <th className="p-4 text-left">Batch</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Instructor</th>
              <th className="p-4 text-left">Students</th>
              <th className="p-4 text-left">Module</th>
              <th className="p-4 text-left">Progress</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((b) => (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-semibold">{b.id}</td>

                <td className="p-4">{b.course}</td>

                <td className="p-4">{b.instructor}</td>

                <td className="p-4">{b.students} Students</td>

                <td className="p-4">{b.module}</td>

                <td className="p-4 w-56">
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-gray-300 h-2 rounded-full">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${b.progress}%` }}
                      />
                    </div>

                    <span className="text-sm font-semibold">
                      {b.progress}%
                    </span>
                  </div>
                </td>

                {/* ACTION */}

                <td className="p-4 text-center relative">
                  <button
                    className="text-xl"
                    onClick={() =>
                      setOpenMenu(openMenu === b.id ? null : b.id)
                    }
                  >
                    ⋮
                  </button>

                  {openMenu === b.id && (
                    <div className="absolute right-6 mt-2 bg-white border rounded shadow w-28">
                      <Link
                        href={`/admin/batches/edit/${encodeURIComponent(b.id)}`}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpenMenu(null)}
                      >
                        Edit
                      </Link>

                      <Link
                        href={`/admin/batches/delete/${encodeURIComponent(b.id)}`}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                        onClick={() => setOpenMenu(null)}
                      >
                        Delete
                      </Link>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}

        <div className="flex justify-between items-center p-4">
          <span>
            Showing {start + 1} to{" "}
            {Math.min(start + rowsPerPage, filtered.length)} of{" "}
            {filtered.length}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="border px-3 py-1 rounded"
            >
              Previous
            </button>

            {[1, 2].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1 rounded ${
                  currentPage === p
                    ? "bg-blue-600 text-white"
                    : "border"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(totalPages, p + 1)
                )
              }
              className="border px-3 py-1 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
