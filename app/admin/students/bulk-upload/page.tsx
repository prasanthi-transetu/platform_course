"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Upload, Download, X } from "lucide-react"
import { createStudent } from "@/features/students/api"

export default function BulkUploadPage() {

  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileName, setFileName] = useState("")
  const [studentsPreview, setStudentsPreview] = useState<any[]>([])
  const [error, setError] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 })

  /* DOWNLOAD TEMPLATE */

  const downloadTemplate = () => {

    const csv =
`id,name,email,institution,course,status
STU-101,John Doe,john@email.com,Oxford Institute,Computer Science,Active
STU-102,Emma Smith,emma@email.com,Stanford Hub,AI,Active`

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "students_template.csv"
    a.click()
  }

  /* OPEN FILE PICKER */

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  /* HANDLE FILE UPLOAD */

  const handleFileUpload = (event:any) => {

    const file = event.target.files[0]

    if (!file) return

    if (!file.name.endsWith(".csv")) {

      setError("Please upload only CSV files.")
      return

    }

    setFileName(file.name)

    const reader = new FileReader()

    reader.onload = (e:any) => {

      const csvText = e.target.result

      const rows = csvText.split("\n").map((row:string)=>row.trim())

      if (rows.length < 2) {

        setError("CSV file is empty.")
        return

      }

      const headers = rows[0].split(",")

      if (
        headers[0] !== "id" ||
        headers[1] !== "name" ||
        headers[2] !== "email"
      ) {

        setError("Invalid CSV format. Please use the template.")
        return

      }

      const students:any[] = []

      for (let i = 1; i < rows.length; i++) {

        const cols = rows[i].split(",")

        if (cols.length < 6) continue

        students.push({
          id: cols[0],
          name: cols[1],
          email: cols[2],
          institution: cols[3],
          course: cols[4],
          status: cols[5]
        })

      }

      setStudentsPreview(students)
      setError("")

    }

    reader.readAsText(file)

  }

  /* UPLOAD STUDENTS */

  const uploadStudents = async () => {
    if (studentsPreview.length === 0) {
      alert("Please upload CSV file first.")
      return
    }

    try {
      setIsUploading(true)
      setError("")
      setUploadProgress({ current: 0, total: studentsPreview.length })

      let successCount = 0
      let failCount = 0

      for (let i = 0; i < studentsPreview.length; i++) {
        const student = studentsPreview[i]
        try {
          await createStudent(student)
          successCount++
        } catch (err) {
          console.error(`Failed to upload student ${student.email}:`, err)
          failCount++
        }
        setUploadProgress(prev => ({ ...prev, current: i + 1 }))
      }

      if (failCount === 0) {
        alert(`Successfully uploaded all ${successCount} students!`)
        router.push("/admin/students")
      } else {
        alert(`Upload complete. Success: ${successCount}, Failed: ${failCount}`)
        router.push("/admin/students")
      }
    } catch (err: any) {
      console.error("Bulk upload error:", err)
      setError("An unexpected error occurred during upload.")
    } finally {
      setIsUploading(false)
    }
  }

  return (

    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* BLUR BACKGROUND */}

      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* MODAL */}

      <div className="relative bg-white w-full max-w-3xl rounded-xl shadow-lg p-8">

        {/* CLOSE BUTTON */}

        <button
          onClick={()=>router.push("/admin/students")}
          className="absolute right-5 top-5 text-gray-700 hover:text-black"
        >
          <X size={20}/>
        </button>

        {/* TITLE */}

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Bulk Upload Students
        </h2>

        {/* TEMPLATE DOWNLOAD */}

        <div className="flex justify-between items-center border p-4 rounded-lg bg-gray-50 mb-6">

          <p className="text-sm text-gray-800">
            Download template and fill student details before uploading.
          </p>

          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-100"
          >
            <Download size={16}/>
            Download Template
          </button>

        </div>

        {/* UPLOAD AREA */}

        <div
          onClick={openFilePicker}
          className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50"
        >

          <Upload className="mx-auto text-gray-400 mb-3" size={32}/>

          <p className="text-gray-800 font-medium">
            Click here to Upload CSV File
          </p>

          <p className="text-sm text-gray-700 mt-1">
            Only CSV format supported
          </p>

          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />

          {fileName && (

            <p className="text-green-600 text-sm mt-3">
              Selected: {fileName}
            </p>

          )}

        </div>

        {/* ERROR MESSAGE */}

        {error && (

          <p className="text-red-500 mt-3">{error}</p>

        )}

        {/* PREVIEW TABLE */}

        {studentsPreview.length > 0 && (

          <div className="mt-6">

            <h3 className="font-semibold text-gray-900 mb-2">
              Preview ({studentsPreview.length} students)
            </h3>

            <div className="max-h-48 overflow-auto border rounded-lg">

              <table className="w-full text-sm">

                <thead className="bg-gray-100 text-gray-900">

                  <tr>
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Institution</th>
                  </tr>

                </thead>

                <tbody>

                  {studentsPreview.map((s,i)=>(

                    <tr key={i} className="border-t">

                      <td className="p-2 text-gray-900">{s.id}</td>
                      <td className="p-2 text-gray-900">{s.name}</td>
                      <td className="p-2 text-gray-800">{s.email}</td>
                      <td className="p-2 text-gray-800">{s.institution}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

        {/* BUTTONS */}

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={()=>router.push("/admin/students")}
            disabled={isUploading}
            className="border px-5 py-2 rounded-lg text-gray-800 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={uploadStudents}
            disabled={studentsPreview.length === 0 || isUploading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2 min-w-[140px] justify-center"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {uploadProgress.current}/{uploadProgress.total}...
              </>
            ) : (
              "Upload Students"
            )}
          </button>

        </div>

      </div>

    </div>

  )

}
