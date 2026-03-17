"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { X } from "lucide-react"

export default function EditTutorPage() {

  const router = useRouter()
  const params = useParams()

  const tutorId = params.id

  const [tutor, setTutor] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    domain: [] as string[],
    batches: [] as string[],
    status: "Active"
  })

  const [domainInput, setDomainInput] = useState("")
  const [batchInput, setBatchInput] = useState("")

  /* LOAD TUTOR DATA */

  useEffect(() => {

    const storedTutors =
      JSON.parse(localStorage.getItem("tutors") || "[]")

    const found =
      storedTutors.find((t:any)=>t.id == tutorId)

    if (found) {

      setTutor(found)

    }

  }, [tutorId])

  /* HANDLE INPUT */

  const handleChange = (e:any) => {

    const { name, value } = e.target

    setTutor(prev => ({
      ...prev,
      [name]: value
    }))

  }

  /* ADD DOMAIN */

  const addDomain = () => {
    if (domainInput.trim() && !tutor.domain.includes(domainInput.trim())) {
      setTutor(prev => ({
        ...prev,
        domain: [...prev.domain, domainInput.trim()]
      }))
      setDomainInput("")
    }
  }

  /* REMOVE DOMAIN */

  const removeDomain = (domainToRemove: string) => {
    setTutor(prev => ({
      ...prev,
      domain: prev.domain.filter(d => d !== domainToRemove)
    }))
  }

  /* ADD BATCH */

  const addBatch = () => {
    if (batchInput.trim() && !tutor.batches.includes(batchInput.trim())) {
      setTutor(prev => ({
        ...prev,
        batches: [...prev.batches, batchInput.trim()]
      }))
      setBatchInput("")
    }
  }

  /* REMOVE BATCH */

  const removeBatch = (batchToRemove: string) => {
    setTutor(prev => ({
      ...prev,
      batches: prev.batches.filter(b => b !== batchToRemove)
    }))
  }

  /* UPDATE TUTOR */

  const updateTutor = () => {

    const storedTutors =
      JSON.parse(localStorage.getItem("tutors") || "[]")

    const updatedTutors =
      storedTutors.map((t:any)=>{

        if (t.id == tutorId) {
          return tutor
        }

        return t
      })

    localStorage.setItem(
      "tutors",
      JSON.stringify(updatedTutors)
    )

    alert("Tutor updated successfully!")

    router.push("/admin/tutors")

  }

  return (

    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* BLUR BACKGROUND */}

      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* MODAL */}

      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">

        {/* CLOSE BUTTON */}

        <button
          onClick={()=>router.push("/admin/tutors")}
          className="absolute right-4 top-4 text-gray-600 hover:text-black"
        >
          <X size={20}/>
        </button>

        {/* TITLE */}

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Edit Tutor
        </h2>

        {/* FORM */}

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-700">Tutor ID</label>
            <input
              type="text"
              name="id"
              value={tutor.id}
              disabled
              className="border rounded-lg w-full px-3 py-2 bg-gray-100 text-gray-800"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={tutor.name}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 text-gray-900"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={tutor.email}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 text-gray-900"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={tutor.phone}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 text-gray-900"
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm text-gray-700">Domain</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="Add domain"
                className="border rounded-lg flex-1 px-3 py-2 text-gray-900"
                onKeyPress={(e) => e.key === 'Enter' && addDomain()}
              />
              <button
                onClick={addDomain}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tutor.domain.map((d, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm flex items-center gap-1"
                >
                  {d}
                  <button
                    onClick={() => removeDomain(d)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <label className="text-sm text-gray-700">Batches</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={batchInput}
                onChange={(e) => setBatchInput(e.target.value)}
                placeholder="Add batch"
                className="border rounded-lg flex-1 px-3 py-2 text-gray-900"
                onKeyPress={(e) => e.key === 'Enter' && addBatch()}
              />
              <button
                onClick={addBatch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tutor.batches.map((b, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm flex items-center gap-1"
                >
                  {b}
                  <button
                    onClick={() => removeBatch(b)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">Status</label>
            <select
              name="status"
              value={tutor.status}
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
            onClick={()=>router.push("/admin/tutors")}
            className="border px-5 py-2 rounded-lg text-gray-800 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={updateTutor}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Update Tutor
          </button>

        </div>

      </div>

    </div>

  )

}