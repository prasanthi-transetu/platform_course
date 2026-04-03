"use client";

import React, { useState } from "react";
import Link from "next/link";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedDate: string;
  avatar: string;
}

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<"accepted" | "pending">("accepted");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const acceptedUsers: UserData[] = [
    {
      id: "USR-101",
      name: "Robert Fox",
      email: "robert.fox@example.com",
      role: "Admin",
      joinedDate: "Jan 12, 2024",
      avatar: "https://i.pravatar.cc/150?u=robert",
    },
    {
      id: "USR-102",
      name: "Jane Cooper",
      email: "jane.c@lmspost.com",
      role: "Institution Rep",
      joinedDate: "Feb 05, 2024",
      avatar: "https://i.pravatar.cc/150?u=jane",
    },
    {
      id: "USR-103",
      name: "Cody Fisher",
      email: "cody.f@lmspost.com",
      role: "Admin",
      joinedDate: "Mar 15, 2024",
      avatar: "https://i.pravatar.cc/150?u=cody",
    },
    {
      id: "USR-104",
      name: "Kristin Watson",
      email: "kristin.w@lms... ",
      role: "Admin",
      joinedDate: "Apr 10, 2024",
      avatar: "https://i.pravatar.cc/150?u=kristin",
    },
    {
      id: "USR-105",
      name: "Cameron Williamson",
      email: "cameron.w@i...",
      role: "Institution Rep",
      joinedDate: "May 22, 2024",
      avatar: "https://i.pravatar.cc/150?u=cameron",
    },
  ];

  const pendingUsers: UserData[] = [
    {
      id: "REQ-201",
      name: "Eleanor Pena",
      email: "eleanor.p@test.com",
      role: "Admin",
      joinedDate: "Requested: Oct 01, 2024",
      avatar: "https://i.pravatar.cc/150?u=eleanor",
    },
    {
      id: "REQ-202",
      name: "Guy Hawkins",
      email: "guy.h@demo.org",
      role: "Institution Rep",
      joinedDate: "Requested: Oct 02, 2024",
      avatar: "https://i.pravatar.cc/150?u=guy",
    },
  ];

  const roles = ["All Roles", "Admin", "Institution Rep"];

  const currentData = activeTab === "accepted" ? acceptedUsers : pendingUsers;

  const filtered = currentData.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All Roles" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const data = filtered.slice(start, start + rowsPerPage);

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-900 w-full relative">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">
            User Management
          </h1>
          <p className="text-gray-500 text-sm">
            Oversee administrators and institution representatives
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New User
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1 flex items-center gap-1">Total Admins <span className="w-3 h-3 text-gray-300 border border-current rounded-full inline-flex items-center justify-center text-[8px]">i</span></p>
            <h2 className="text-3xl font-bold">24</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1 flex items-center gap-1">Institution Representatives <span className="w-3 h-3 text-gray-300 border border-current rounded-full inline-flex items-center justify-center text-[8px]">i</span></p>
            <h2 className="text-3xl font-bold">38</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1 flex items-center gap-1">Total Institutions <span className="w-3 h-3 text-gray-300 border border-current rounded-full inline-flex items-center justify-center text-[8px]">i</span></p>
            <h2 className="text-3xl font-bold">12</h2>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* TABS & FILTERS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          
          <div className="flex items-center gap-6 border-b border-gray-200">
            <button
              onClick={() => { setActiveTab("accepted"); setCurrentPage(1); }}
              className={`pb-2.5 font-medium text-sm transition-colors border-b-2
                ${activeTab === "accepted" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}
              `}
            >
              Accepted Requests
            </button>
            <button
              onClick={() => { setActiveTab("pending"); setCurrentPage(1); }}
              className={`pb-2.5 font-medium text-sm transition-colors border-b-2
                ${activeTab === "pending" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}
              `}
            >
              Pending
            </button>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full lg:w-80">
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                placeholder="Search by name, email, or User ID..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 whitespace-nowrap">Role:</span>
              <select
                value={roleFilter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setRoleFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent border border-gray-200 text-sm rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
              >
                {roles.map((r, i) => (
                  <option key={i} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="pb-4 px-4 font-semibold text-xs tracking-wider uppercase">USER ID</th>
                <th className="pb-4 px-4 font-semibold text-xs tracking-wider uppercase">USER</th>
                <th className="pb-4 px-4 font-semibold text-xs tracking-wider uppercase">ROLE</th>
                <th className="pb-4 px-4 font-semibold text-xs tracking-wider uppercase">JOINED DATE</th>
                <th className="pb-4 px-4 font-semibold text-xs tracking-wider uppercase text-center w-24">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {data.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-4 text-gray-500 font-medium">{u.id}</td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{u.name}</div>
                        <div className="text-gray-400 text-xs">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-gray-700 font-medium">{u.role}</td>

                  <td className="py-4 px-4 text-gray-500">{u.joinedDate}</td>

                  {/* ACTION */}
                  <td className="py-4 px-4 text-center relative">
                    <button
                      className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
                      onClick={() => setOpenMenu(openMenu === u.id ? null : u.id)}
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>

                    {openMenu === u.id && (
                      <div className="absolute right-6 top-10 mt-1 bg-white border border-gray-100 rounded-lg shadow-lg w-32 py-1 z-10 animate-in fade-in zoom-in-95 duration-100 block">
                         {activeTab === "pending" ? (
                           <>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                                onClick={() => setOpenMenu(null)}
                              >
                                Accept
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                onClick={() => setOpenMenu(null)}
                              >
                                Reject
                              </button>
                           </>
                         ) : (
                           <>
                              <Link
                                href={`/admin/users/edit/${encodeURIComponent(u.id)}`}
                                className="block w-full text-left px-4 py-2 text-sm hover:text-blue-600 hover:bg-blue-50"
                                onClick={() => setOpenMenu(null)}
                              >
                                Edit
                              </Link>
                              <Link
                                href={`/admin/users/delete/${encodeURIComponent(u.id)}`}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                onClick={() => setOpenMenu(null)}
                              >
                                Delete
                              </Link>
                           </>
                         )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                   <td colSpan={5} className="py-8 text-center text-gray-500">
                      No users found.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <select
               value={rowsPerPage}
               onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                 setRowsPerPage(Number(e.target.value));
                 setCurrentPage(1);
               }}
               className="border border-gray-200 rounded px-2 py-1 bg-transparent"
             >
               <option>5</option>
               <option>10</option>
               <option>20</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
               onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
               disabled={currentPage === 1}
               className="text-gray-500 hover:text-gray-800 disabled:opacity-50"
            >
               Previous
            </button>
            <div className="flex items-center gap-1">
               {Array.from({ length: totalPages }).map((_, idx) => {
                 const p = idx + 1;
                 return (
                   <button
                     key={p}
                     onClick={() => setCurrentPage(p)}
                     className={`w-7 h-7 rounded flex items-center justify-center font-medium transition-colors ${
                       currentPage === p
                         ? "bg-blue-600 text-white"
                         : "text-gray-600 hover:bg-gray-100"
                     }`}
                   >
                     {p}
                   </button>
                 );
               })}
            </div>
            <button
               onClick={() => setCurrentPage((p: number) => Math.min(totalPages, p + 1))}
               disabled={currentPage >= totalPages}
               className="text-gray-500 hover:text-gray-800 disabled:opacity-50"
            >
               Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
