"use client"

import { useState, useEffect } from "react"
import { Users, UserCheck, BookOpen, MoreVertical } from "lucide-react"
import { fetchStudents, fetchStudentCount } from "@/features/students/api"
import Link from "next/link"
import AddStudentModal from "@/components/AddStudentModal"
import EditStudentModal from "@/components/EditStudentModal"

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [courseFilter, setCourseFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [apiTotalPages, setApiTotalPages] = useState(1)
  const [apiTotalStudents, setApiTotalStudents] = useState(0)
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudentId, setEditingStudentId] = useState<string | number | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const itemsPerPage = 50

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [search])

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true)
        const [studentsData, count] = await Promise.all([
          fetchStudents(currentPage, itemsPerPage, debouncedSearch, statusFilter, courseFilter),
          fetchStudentCount()
        ])
        
        setStudents(studentsData.students)
        setApiTotalPages(studentsData.totalPages)
        setApiTotalStudents(count || studentsData.total) // Use count API if available
        setError(null)
      } catch (err: any) {
        console.error("Error fetching students:", err)
        setError(err.message || "Failed to load students. Please ensure your backend is running.")
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [currentPage, debouncedSearch, statusFilter, courseFilter, isModalOpen])

  // PAGINATION (Backend-driven)
  const totalPages = apiTotalPages;
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStudents = students; 
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1)
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1)

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage enrollments, batches, and student information.</p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/admin/students/bulk-upload"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Bulk upload (CSV)
          </Link>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-bold text-sm transition-all shadow-lg shadow-blue-500/20"
          >
            + ADD STUDENT
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-lg mb-4">
            <Users size={20} className="text-blue-600" />
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Total Students</p>
          <h2 className="text-3xl font-bold text-gray-900">{apiTotalStudents}</h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="w-10 h-10 bg-green-50 flex items-center justify-center rounded-lg mb-4">
            <UserCheck size={20} className="text-green-600" />
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Active Students</p>
          <h2 className="text-3xl font-bold text-gray-900">{students.filter(s => s.status?.toLowerCase() === "active").length}</h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="w-10 h-10 bg-purple-50 flex items-center justify-center rounded-lg mb-4">
            <BookOpen size={20} className="text-purple-600" />
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Students Today</p>
          <h2 className="text-3xl font-bold text-gray-900">0</h2>
        </div>
      </div>

      {/* SEARCH, FILTER & TABLE CONTAINER */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Search Row */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <div className="relative w-[400px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or user ID..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Course ID:</span>
              <input
                type="text"
                placeholder="All"
                value={courseFilter}
                onChange={(e) => { setCourseFilter(e.target.value); setCurrentPage(1) }}
                className="w-16 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
              className="border-none text-sm font-medium text-gray-600 bg-transparent focus:ring-0 cursor-pointer p-0 pr-4"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-white text-xs font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Student ID</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Enrolled Batches</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading students...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors bg-white">
                    <td className="px-6 py-4 text-gray-500 text-sm font-medium">
                      {student.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                          {student.first_name?.[0]?.toUpperCase() || 'S'}{student.last_name?.[0]?.toUpperCase() || ''}
                        </div>
                        <span className="font-semibold text-gray-900">{student.first_name} {student.last_name || ""}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{student.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {student.course_name ? (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-600">
                            {student.course_name}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs italic">No batch</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                        student.status?.toLowerCase() === "active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
                      }`}>
                        {student.status || 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center relative">
                      <button onClick={() => setOpenMenu(openMenu === index ? null : index)} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                      {openMenu === index && (
                        <div className="absolute right-8 top-8 mt-1 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-10 py-1">
                          <button 
                            onClick={() => {
                              setEditingStudentId(student.id);
                              setOpenMenu(null);
                            }}
                            className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                          >
                            Edit
                          </button>
                          <Link href={`/admin/students/delete/${student.id}`} className="block px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50">
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

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Rows per page:</span>
            <select className="border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-700 bg-white outline-none focus:border-blue-500 cursor-pointer">
              <option>10</option>
              <option>50</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1} 
              className="text-sm text-gray-400 hover:text-gray-900 disabled:opacity-50 font-medium px-2"
            >
              Previous
            </button>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-600 text-white text-sm font-semibold">
                {currentPage}
              </button>
              {currentPage < totalPages && (
                <button onClick={nextPage} className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 text-sm font-semibold transition-colors">
                  {currentPage + 1}
                </button>
              )}
              {currentPage + 1 < totalPages && (
                <button onClick={() => setCurrentPage(currentPage + 2)} className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 text-sm font-semibold transition-colors">
                  {currentPage + 2}
                </button>
              )}
            </div>
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages} 
              className="text-sm text-gray-900 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50 disabled:opacity-50 font-medium transition-colors ml-2"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      <AddStudentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => { setIsModalOpen(false); setCurrentPage(1); }} 
      />

      <EditStudentModal
        studentId={editingStudentId}
        isOpen={editingStudentId !== null}
        onClose={() => setEditingStudentId(null)}
        onSuccess={() => { setEditingStudentId(null); setCurrentPage(1); }}
      />
    </div>
  )
}
