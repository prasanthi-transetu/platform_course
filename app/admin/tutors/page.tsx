"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link"; // ✅ IMPORTANT
import {
  Users,
  CheckCircle,
  Star,
  UserPlus,
  MoreVertical,
  Edit,
  Trash,
} from "lucide-react";

export default function TutorsPage() {
  const tutorsData = [
    {
      id: 1,
      name: "Sarah Smith",
      email: "s.smith@example.edu",
      phone: "+1 (234) 567-8901",
      domain: ["Computer Science", "React"],
      batches: ["C1-2024-A", "2024-B"],
      status: "Active",
    },
    {
      id: 2,
      name: "Robert Johnson",
      email: "r.johnson@example.edu",
      phone: "+1 (234) 567-8905",
      domain: ["Data Science", "Python"],
      batches: ["Dr-2024-X"],
      status: "Active",
    },
    {
      id: 3,
      name: "Emily Chen",
      email: "e.chen@example.edu",
      phone: "+1 (234) 567-8912",
      domain: ["UI/UX Design"],
      batches: ["UX-ADV-01"],
      status: "Inactive",
    },
    {
      id: 4,
      name: "David Lee",
      email: "d.lee@example.edu",
      phone: "+1 (234) 567-8920",
      domain: ["Java", "Spring"],
      batches: ["JB-2024"],
      status: "Active",
    },
    {
      id: 5,
      name: "Anusha Reddy",
      email: "anusha@example.edu",
      phone: "+91 9876543210",
      domain: ["Machine Learning"],
      batches: ["ML-2024"],
      status: "Active",
    },
    {
      id: 6,
      name: "Kiran Kumar",
      email: "kiran@example.edu",
      phone: "+91 9123456780",
      domain: ["Angular"],
      batches: ["ANG-01"],
      status: "Inactive",
    },
  ];

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filtered = tutorsData.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const visibleData = filtered.slice(start, start + rowsPerPage);

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-800">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tutor Management</h1>
          <p className="text-gray-600 text-sm">
            Add and manage faculty members and their assignments.
          </p>
        </div>

        {/* ✅ UPDATED BUTTON WITH LINK */}
        <Link href="/admin/tutors/new">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 font-medium">
            + Add New Tutor
          </button>
        </Link>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <Card title="Total Tutors" value={tutorsData.length} icon={<Users />} />
        <Card
          title="Active Tutors"
          value="4"
          icon={<CheckCircle />}
          color="green"
        />
        <Card
          title="Average Rating"
          value="4.8"
          icon={<Star />}
          color="yellow"
        />
        <Card
          title="New Tutors"
          value="42"
          icon={<UserPlus />}
          color="purple"
        />
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-xl shadow mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
        />

        <select className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700">
          <option>All Domain</option>
        </select>

        <select className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700">
          <option>All Status</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
            <tr>
              <th className="p-4 text-left">Tutor Info</th>
              <th className="p-4 text-left">Domain</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">Batches</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleData.map((tutor) => (
              <tr key={tutor.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {tutor.name}
                      </p>
                      <p className="text-xs text-gray-700">ID: #{tutor.id}</p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex gap-2 flex-wrap">
                    {tutor.domain.map((d, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-4 text-sm text-gray-800">
                  <p>{tutor.email}</p>
                  <p className="text-xs text-gray-700">{tutor.phone}</p>
                </td>

                <td className="p-4">
                  {tutor.batches.map((b, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 px-2 py-1 text-xs rounded mr-1"
                    >
                      {b}
                    </span>
                  ))}
                </td>

                <td className="p-4">
                  <span
                    className={`text-xs px-2 py-1 rounded font-medium ${
                      tutor.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    ● {tutor.status}
                  </span>
                </td>

                <td className="p-4 relative">
                  <MoreVertical
                    className="text-gray-600 cursor-pointer"
                    onClick={() =>
                      setOpenMenu(openMenu === tutor.id ? null : tutor.id)
                    }
                  />
                  {openMenu === tutor.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                    >
                      <Link
                        href={`/admin/tutors/edit/${tutor.id}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setOpenMenu(null)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                      <Link
                        href={`/admin/tutors/delete/${tutor.id}`}
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        onClick={() => setOpenMenu(null)}
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
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
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 text-gray-700">
          <span>Rows per page</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 border rounded ${
                  page === p ? "bg-blue-600 text-white" : ""
                }`}
              >
                {p}
              </button>
            );
          })}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/* CARD COMPONENT */
function Card({ title, value, icon, color = "blue" }: any) {
  const colorMap: any = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    yellow: "text-yellow-600 bg-yellow-100",
    purple: "text-purple-600 bg-purple-100",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
      </div>

      <div className={`p-2 rounded-lg ${colorMap[color]}`}>{icon}</div>
    </div>
  );
}

