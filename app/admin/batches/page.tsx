"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical, Users, Layers, CheckCircle, XCircle } from "lucide-react";

export default function BatchesPage() {

  const batches = [
    { id: 1, name: "Full Stack Development", instructor: "Sai", students: 25, status: "Active" },
    { id: 2, name: "React Advanced", instructor: "Prasanthi", students: 18, status: "Active" },
    { id: 3, name: "NodeJS Bootcamp", instructor: "Anil", students: 22, status: "Active" },
    { id: 4, name: "Angular Training", instructor: "Ravi", students: 15, status: "Inactive" },
    { id: 5, name: "Python Data Science", instructor: "Kiran", students: 28, status: "Active" },
    { id: 6, name: "Java Backend", instructor: "Mahesh", students: 20, status: "Active" },
    { id: 7, name: "NextJS Bootcamp", instructor: "Suresh", students: 12, status: "Inactive" },
    { id: 8, name: "Spring Boot", instructor: "Rahul", students: 19, status: "Active" },
    { id: 9, name: "UI UX Design", instructor: "Anusha", students: 30, status: "Active" },
    { id: 10, name: "Machine Learning", instructor: "Ajay", students: 16, status: "Active" },
  ];

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const totalPages = Math.ceil(batches.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const visibleData = batches.slice(start, start + rowsPerPage);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Batches Dashboard
        </h1>

        <Link href="/admin/batches/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
            + Add Batch
          </button>
        </Link>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Batches</p>
            <h2 className="text-3xl font-bold text-gray-800">
              {batches.length}
            </h2>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <Layers className="text-blue-600" size={28}/>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Active Batches</p>
            <h2 className="text-3xl font-bold text-green-600">7</h2>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <CheckCircle className="text-green-600" size={28}/>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Inactive Batches</p>
            <h2 className="text-3xl font-bold text-red-600">3</h2>
          </div>
          <div className="bg-red-100 p-3 rounded-lg">
            <XCircle className="text-red-600" size={28}/>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Students</p>
            <h2 className="text-3xl font-bold text-gray-800">205</h2>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <Users className="text-purple-600" size={28}/>
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md border overflow-hidden">

        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-700 text-sm">
              <th className="p-4 text-left font-semibold">Batch Name</th>
              <th className="p-4 text-left font-semibold">Instructor</th>
              <th className="p-4 text-left font-semibold">Students</th>
              <th className="p-4 text-left font-semibold">Status</th>
              <th className="p-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleData.map((batch) => (
              <tr key={batch.id} className="border-b hover:bg-gray-50 transition">

                <td className="p-4 text-gray-800 font-medium">{batch.name}</td>
                <td className="p-4 text-gray-700">{batch.instructor}</td>
                <td className="p-4 text-gray-700">{batch.students}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      batch.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {batch.status}
                  </span>
                </td>

                <td className="p-4 relative">

                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === batch.id ? null : batch.id)
                    }
                    className="text-gray-700 hover:text-black"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenu === batch.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">

                      {/* EDIT */}
                      <Link href={`/admin/batches/edit/${batch.id}`}>
                        <button
                          onClick={() => setOpenMenu(null)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                        >
                          Edit
                        </button>
                      </Link>

                      {/* DELETE ✅ */}
                      <Link href={`/admin/batches/delete/${batch.id}`}>
                        <button
                          onClick={() => setOpenMenu(null)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </Link>

                    </div>
                  )}

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">

        <div className="flex items-center gap-2 text-gray-800">
          <span>Rows per page</span>

          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1 text-gray-800"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div className="flex gap-2">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-3 py-1 border rounded ${
                  page === pageNumber
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}