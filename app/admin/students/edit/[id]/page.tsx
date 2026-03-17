"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { X } from "lucide-react"

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

  /* HANDLE INPUT */

  const handleChange = (e:any) => {

    const { name, value } = e.target

    setStudent(prev => ({
      ...prev,
      [name]: value
    }))

  }

  /* UPDATE STUDENT */

  const updateStudent = () => {

    const storedStudents =
      JSON.parse(localStorage.getItem("students") || "[]")

    const updatedStudents =
      storedStudents.map((s:any)=>{

        if (s.id === studentId) {
          return student
        }

        return s
      })

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    )

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
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 text-gray-900"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 text-gray-900"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Institution</label>
            <input
              type="text"
              name="institution"
              value={student.institution}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 text-gray-900"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Course</label>
            <input
              type="text"
              name="course"
              value={student.course}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 text-gray-900"
            />
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