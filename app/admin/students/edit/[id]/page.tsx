"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { X } from "lucide-react"
import { isEmpty, isValidEmail, inputErrorClass, errorTextClass } from "@/lib/validation"
import { fetchStudent, updateStudent as updateStudentApi } from "@/features/students/api"

export default function EditStudentPage() {

  const router = useRouter()
  const params = useParams()

  const studentId = params.id as string

  const [student, setStudent] = useState({
    id: "",
    name: "",
    email: "",
    institution: "",
    course: "",
    status: "Active"
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /* LOAD STUDENT DATA */

  useEffect(() => {
    const loadStudent = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchStudent(studentId)
        
        // Map backend fields to frontend state
        setStudent({
          id: String(data.id || ""),
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email || "",
          institution: (data as any).institution || "",
          course: String(data.course_id || (data as any).course || ""),
          status: data.status ? data.status.charAt(0).toUpperCase() + data.status.slice(1) : "Active"
        })
      } catch (err: any) {
        console.error("Error fetching student:", err)
        setError(err.message || "Failed to load student data")
      } finally {
        setIsLoading(false)
      }
    }

    if (studentId) {
      loadStudent()
    }
  }, [studentId])

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  /* HANDLE INPUT */

  const handleChange = (e:any) => {
    const { name, value } = e.target
    setStudent(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => { const n = {...prev}; delete n[name]; return n; })
    }
  }

  const handleBlur = (e:any) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    validateField(name, student[name as keyof typeof student])
  }

  const validateField = (name: string, value: string): string => {
    let error = ""
    switch (name) {
      case "name":
        if (isEmpty(value)) error = "Student name is required"
        break
      case "email":
        if (isEmpty(value)) error = "Email is required"
        else if (!isValidEmail(value)) error = "Invalid email format"
        break
      case "institution":
        if (isEmpty(value)) error = "Institution is required"
        break
      case "course":
        if (isEmpty(value)) error = "Course is required"
        break
    }
    setErrors(prev => {
      if (error) return { ...prev, [name]: error }
      const n = { ...prev }; delete n[name]; return n
    })
    return error
  }

  const validateAll = (): boolean => {
    const fields = ["name", "email", "institution", "course"]
    const allTouched: Record<string, boolean> = {}
    let hasError = false
    for (const field of fields) {
      allTouched[field] = true
      if (validateField(field, student[field as keyof typeof student])) hasError = true
    }
    setTouched(prev => ({ ...prev, ...allTouched }))
    return !hasError
  }

  const getInputClass = (field: string) => {
    const base = "border rounded-lg w-full px-3 py-2 text-gray-900 transition-all duration-200"
    return touched[field] && errors[field] ? `${base} ${inputErrorClass}` : base
  }

  const ErrorMsg = ({ field }: { field: string }) => {
    if (!touched[field] || !errors[field]) return null
    return (
      <p className={errorTextClass}>
        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
        {errors[field]}
      </p>
    )
  }

  /* UPDATE STUDENT */

  const handleUpdate = async () => {
    if (!validateAll()) return

    try {
      setIsUpdating(true)
      setError(null)
      await updateStudentApi(studentId, student)
      router.push("/admin/students")
    } catch (err: any) {
      console.error("Error updating student:", err)
      setError(err.message || "Failed to update student. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  return (

    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* BLUR BACKGROUND */}

      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* MODAL */}

      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl p-8">

        {/* CLOSE BUTTON */}

        <button
          onClick={()=>router.push("/admin/students")}
          className="absolute right-4 top-4 text-gray-600 hover:text-black"
        >
          <X size={20}/>
        </button>

        {/* TITLE */}

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Edit Student
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-500">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p>Loading student details...</p>
          </div>
        ) : (
          <>
            {/* FORM */}
            <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-700">Student ID</label>
            <input
              type="text"
              name="id"
              value={student.id}
              disabled
              className="border rounded-lg w-full px-3 py-2 bg-gray-100 text-gray-800"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Full Name <span className="text-red-400">*</span></label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("name")}
            />
            <ErrorMsg field="name" />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email <span className="text-red-400">*</span></label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("email")}
            />
            <ErrorMsg field="email" />
          </div>

          <div>
            <label className="text-sm text-gray-700">Institution <span className="text-red-400">*</span></label>
            <input
              type="text"
              name="institution"
              value={student.institution}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("institution")}
            />
            <ErrorMsg field="institution" />
          </div>

          <div>
            <label className="text-sm text-gray-700">Course <span className="text-red-400">*</span></label>
            <input
              type="text"
              name="course"
              value={student.course}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("course")}
            />
            <ErrorMsg field="course" />
          </div>

          <div>
            <label className="text-sm text-gray-700">Status</label>
            <select
              name="status"
              value={student.status}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 text-gray-900"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        </div>

        {/* BUTTONS */}

          <div className="flex justify-end gap-3 mt-6">

            <button
              onClick={()=>router.push("/admin/students")}
              disabled={isUpdating}
              className="border px-5 py-2 rounded-lg text-gray-800 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUpdating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                "Update Student"
              )}
            </button>

          </div>

          </>
        )}

      </div>

    </div>

  )

}