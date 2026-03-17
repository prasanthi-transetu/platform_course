"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function DeleteStudentPage() {
  const params = useParams()
  const router = useRouter()
  const studentId = params.id

  const [student, setStudent] = useState<any>(null)
  const [associatedBatch, setAssociatedBatch] = useState(false) // controls Delete button
  const [checkboxChecked, setCheckboxChecked] = useState(false) // checkbox state

  useEffect(() => {
    // Get student from localStorage
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    const found = students.find((s: any) => s.id === studentId)
    if (found) setStudent(found)

    // By default checkbox is UNMARKED, admin can choose
    setCheckboxChecked(false)
    setAssociatedBatch(false)
  }, [studentId])

  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked)
    setAssociatedBatch(!checkboxChecked) // Disable delete if checked
  }

  const handleDelete = () => {
    if (!student || associatedBatch) return
    let students = JSON.parse(localStorage.getItem("students") || "[]")
    students = students.filter((s: any) => s.id !== student.id)
    localStorage.setItem("students", JSON.stringify(students))
    router.push("/admin/students")
  }

  if (!student) return <p className="p-6 text-gray-700">Loading student...</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center space-y-6">

        {/* Header */}
        <h1 className="text-xl font-semibold text-gray-900">
          Are you sure you want to delete{" "}
          <span className="text-red-600">{student.name}</span>?
        </h1>

        {/* Batch checkbox */}
        <label className="flex items-center justify-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={checkboxChecked}
            onChange={handleCheckboxChange}
            className="w-4 h-4"
          />
          <span className="text-gray-700 text-sm">
            Student is associated with any batch
          </span>
        </label>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => router.push("/admin/students")}
            className="flex-1 mr-2 px-6 py-2 rounded-lg font-medium border border-gray-300 text-gray-900 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={associatedBatch}
            className={`flex-1 ml-2 px-6 py-2 rounded-lg font-medium text-white ${
              associatedBatch ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}