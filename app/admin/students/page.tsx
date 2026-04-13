"use client"

import { useState, useEffect } from "react"
import { Users, UserCheck, BookOpen, MoreVertical, Upload } from "lucide-react"
import { fetchStudents } from "@/features/students/api"
import Link from "next/link"

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [openMenu, setOpenMenu] = useState<number | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true)
        const data = await fetchStudents()
        setStudents(data)
        setError(null)
      } catch (err: any) {
        console.error("Error fetching students:", err)
        setError(err.message || "Failed to load students. Please ensure your backend is running.")
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [])

  // SEARCH + FILTER
  const filteredStudents = students.filter(student => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase()
    const matchSearch =
      fullName.includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || student.status === statusFilter
    return matchSearch && matchStatus
  })

  // PAGINATION
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage)
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1)
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1)

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Student Management</h1>
          <p className="text-sm text-gray-700">Manage all registered students</p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/students/bulk-upload" className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-gray-800 bg-white hover:bg-gray-100">
            <Upload size={16} />
            Bulk Upload
          </Link>
          <Link href="/admin/students/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Add Student
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-6">
          <Users className="text-blue-600 mb-2" />
          <p className="text-gray-700 text-sm">Total Students</p>
          <h2 className="text-2xl font-bold text-gray-900">{students.length}</h2>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <UserCheck className="text-green-600 mb-2" />
          <p className="text-gray-700 text-sm">Active Students</p>
          <h2 className="text-2xl font-bold text-gray-900">{students.filter(s => s.status === "Active").length}</h2>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <BookOpen className="text-purple-600 mb-2" />
          <p className="text-gray-700 text-sm">Enrolled Courses</p>
          <h2 className="text-2xl font-bold text-gray-900">18</h2>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
          className="border rounded-lg px-4 py-2 w-96 text-gray-900 bg-white"
        />
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
          className="border rounded-lg px-4 py-2 text-gray-900 bg-white"
        >
          <option value="All">All Students</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-900">
            <tr>
              <th className="p-4 text-left">Student ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Institution</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    Loading students...
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : paginatedStudents.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            ) : (
              paginatedStudents.map((student, index) => (
                <tr key={student.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 text-gray-900">{student.id}</td>
                  <td className="p-4 text-gray-900">
                    {student.first_name} {student.last_name || ""}
                  </td>
                  <td className="p-4 text-gray-800">{student.email}</td>
                  <td className="p-4 text-gray-800">{student.institution}</td>
                  <td className="p-4 text-gray-800">{student.course}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${student.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4 text-center relative">
                    <button onClick={() => setOpenMenu(openMenu === index ? null : index)}>
                      <MoreVertical className="text-gray-900" />
                    </button>
                    {openMenu === index && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                        <Link href={`/admin/students/edit/${student.id}`} className="block px-4 py-2 text-gray-900 hover:bg-gray-100">
                          Edit
                        </Link>
                        <Link href={`/admin/students/delete/${student.id}`} className="block px-4 py-2 text-red-600 hover:bg-gray-100">
                          Delete
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-800 font-medium">
          Showing {startIndex + 1} – {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of {filteredStudents.length}
        </p>

        <div className="flex gap-2">
          <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 border rounded-lg text-gray-900 bg-white hover:bg-gray-100 disabled:text-gray-400">
            Previous
          </button>
          <span className="px-3 py-1 bg-blue-600 text-white rounded-lg">{currentPage}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-lg text-gray-900 bg-white hover:bg-gray-100 disabled:text-gray-400">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
