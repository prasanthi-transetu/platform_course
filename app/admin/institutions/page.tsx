"use client"

import { useState, useEffect } from "react"
import {
  Building2,
  Settings,
  BookOpen,
  Clock,
  MoreVertical,
  Users
} from "lucide-react"

import Link from "next/link"

export default function InstitutionsPage() {

  const [institutions, setInstitutions] = useState<any[]>([])
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [openContacts, setOpenContacts] = useState<number | null>(null)

  const defaultInstitutions = [

    {
      id: "INST-2024-001",
      name: "Oxford Technical Institute",
      email: "admin@oxford.edu",
      location: "London, UK",
      status: "Active",
      contacts: [
        { name: "Arthur Pendragon", email: "arthur@oxford.edu", phone: "+44 20 7946 0958" },
        { name: "Merlin Ambrosius", email: "merlin@oxford.edu", phone: "+44 20 7946 1234" }
      ]
    },

    {
      id: "INST-2024-002",
      name: "Stanford Research Hub",
      email: "m.chen@stanford.edu",
      location: "California, USA",
      status: "Active",
      contacts: [
        { name: "Ming Chen", email: "m.chen@stanford.edu", phone: "+1 650 555 0198" }
      ]
    },

    {
      id: "INST-2024-003",
      name: "Melbourne IT School",
      email: "s.jenkins@melit.edu.au",
      location: "Melbourne, AU",
      status: "Inactive",
      contacts: []
    },

    {
      id: "INST-2024-004",
      name: "Tokyo Advanced Tech",
      email: "h.tanaka@tokyotech.jp",
      location: "Tokyo, JP",
      status: "Active",
      contacts: [
        { name: "Hiro Tanaka", email: "h.tanaka@tokyotech.jp", phone: "+81 3 1234 5678" },
        { name: "Kenji Sato", email: "k.sato@tokyotech.jp", phone: "+81 3 9876 5432" }
      ]
    },

    {
      id: "INST-2024-005",
      name: "New Era Academy",
      email: "contact@newera.edu",
      location: "Toronto, CA",
      status: "Active",
      contacts: [
        { name: "Sarah Connor", email: "sarah.c@newera.edu", phone: "+1 416 555 0147" }
      ]
    },

  ]

  useEffect(() => {

    const stored =
      JSON.parse(localStorage.getItem("institutions") || "[]")

    if (stored.length === 0) {

      localStorage.setItem(
        "institutions",
        JSON.stringify(defaultInstitutions)
      )

      setInstitutions(defaultInstitutions)

    } else {

      setInstitutions(stored)

    }

  }, [])

  return (

    <div className="space-y-6 bg-gray-50 min-h-screen p-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-semibold text-gray-900">
            Institution Management
          </h1>

          <p className="text-sm text-gray-700">
            Integrated registration and institutional oversight
          </p>

        </div>

        <Link
          href="/admin/institutions/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add New Institution
        </Link>

      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <Building2 className="text-blue-600 mb-3" />

          <p className="text-gray-700 text-sm">
            Total Institutions
          </p>

          <h2 className="text-2xl font-bold text-gray-900">
            {institutions.length}
          </h2>

        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <Settings className="text-green-600 mb-3" />

          <p className="text-gray-700 text-sm">
            Active Institutions
          </p>

          <h2 className="text-2xl font-bold text-gray-900">
            {
              institutions.filter(
                i => i.status === "Active"
              ).length
            }
          </h2>

        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <BookOpen className="text-purple-600 mb-3" />

          <p className="text-gray-700 text-sm">
            Avg. Courses / Institution
          </p>

          <h2 className="text-2xl font-bold text-gray-900">
            12.4
          </h2>

        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <Clock className="text-orange-600 mb-3" />

          <p className="text-gray-700 text-sm">
            Pending Registrations
          </p>

          <h2 className="text-2xl font-bold text-gray-900">
            04
          </h2>

        </div>

      </div>

      {/* Search + Filter */}

      <div className="flex justify-between items-center">

        <input
          type="text"
          placeholder="Search by name, email, or institution ID..."
          className="border rounded-lg px-4 py-2 w-96 text-gray-900 bg-white"
        />

        <select
          className="border rounded-lg px-4 py-2 text-gray-900 bg-white"
        >

          <option>All Institutions</option>
          <option>Active</option>
          <option>Inactive</option>

        </select>

      </div>

      {/* Table */}

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-900">

            <tr>

              <th className="p-4 text-left">
                Institution ID
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Location
              </th>

              <th className="p-4 text-left">
                Contacts
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {institutions.map((inst, index) => (

              <tr
                key={index}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 text-gray-900">
                  {inst.id}
                </td>

                <td className="p-4 font-medium text-gray-900">
                  {inst.name}
                </td>

                <td className="p-4 text-gray-800">
                  {inst.email}
                </td>

                <td className="p-4 text-gray-800">
                  {inst.location}
                </td>

                <td className="p-4 text-gray-800 relative">
                  <button 
                    onClick={() => setOpenContacts(openContacts === index ? null : index)}
                    className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Users size={16} />
                    <span className="text-xs font-semibold">{inst.contacts?.length || 0}</span>
                  </button>

                  {openContacts === index && (
                    <div className="absolute left-0 mt-2 w-72 bg-white border border-gray-100 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95">
                      <div className="bg-gray-50 border-b px-4 py-2 flex justify-between items-center">
                         <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Points of Contact</span>
                         <button onClick={() => setOpenContacts(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                      </div>
                      <div className="max-h-64 overflow-y-auto w-full">
                        {inst.contacts?.length > 0 ? (
                          <div className="divide-y divide-gray-50">
                            {inst.contacts.map((contact: any, i: number) => (
                              <div key={i} className="p-3 hover:bg-gray-50/50 transition-colors">
                                <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{contact.email}</p>
                                <p className="text-xs text-gray-500">{contact.phone}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-xs text-gray-500">No contacts available.</div>
                        )}
                      </div>
                    </div>
                  )}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      inst.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {inst.status}

                  </span>

                </td>

                {/* Actions */}

                <td className="p-4 text-center relative">

                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === index
                          ? null
                          : index
                      )
                    }
                  >

                    <MoreVertical className="text-gray-900 cursor-pointer" />

                  </button>

                  {openMenu === index && (

                    <div className="absolute right-6 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">

                      <Link
                        href={`/admin/institutions/edit/${inst.id}`}
                        className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                      >
                        Edit
                      </Link>

                      <Link
                        href={`/admin/institutions/delete/${inst.id}`}
                        className="block px-4 py-2 text-red-600 hover:bg-gray-100"
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

      </div>

      {/* Pagination */}

      <div className="flex justify-between items-center">

        <p className="text-sm text-gray-900">

          Showing 1–{institutions.length} of {institutions.length} institutions

        </p>

        <div className="flex gap-2">

          <button className="px-3 py-1 border rounded-lg text-gray-900 hover:bg-gray-100">
            Previous
          </button>

          <button className="px-3 py-1 border rounded-lg bg-blue-600 text-white">
            1
          </button>

          <button className="px-3 py-1 border rounded-lg text-gray-900 hover:bg-gray-100">
            Next
          </button>

        </div>

      </div>

    </div>

  )

}
