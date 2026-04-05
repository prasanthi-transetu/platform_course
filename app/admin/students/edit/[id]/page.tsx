"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { X } from "lucide-react"
import { isEmpty, isValidEmail, inputErrorClass, errorTextClass } from "@/lib/validation"

export default function EditStudentPage() {

  const router = useRouter()
  const params = useParams()

  const studentId = params.id

  const [student, setStudent] = useState({
    id: "",
    name: "",
    email: "",
    institution: "",
    course: "",
    status: "Active"
  })

  /* LOAD STUDENT DATA */

  useEffect(() => {

    const storedStudents =
      JSON.parse(localStorage.getItem("students") || "[]")

    const found =
      storedStudents.find((s:any)=>s.id === studentId)

    if (found) {

      setStudent(found)

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

  const updateStudent = () => {
    if (!validateAll()) return

    const storedStudents = JSON.parse(localStorage.getItem("students") || "[]")
    const updatedStudents = storedStudents.map((s:any)=>{
      if (s.id === studentId) return student
      return s
    })
    localStorage.setItem("students", JSON.stringify(updatedStudents))
    alert("Student updated successfully!")
    router.push("/admin/students")
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
            className="border px-5 py-2 rounded-lg text-gray-800 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={updateStudent}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Update Student
          </button>

        </div>

      </div>

    </div>

  )

}