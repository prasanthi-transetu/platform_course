"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, Trash2 } from "lucide-react"

export default function AddInstitutionPage() {

  const router = useRouter()

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [location,setLocation] = useState("")

  const [contacts, setContacts] = useState([
    { name: "", role: "", email: "", phone: "" },
  ])

  const addContact = () => {
    if (contacts.length < 3) {
      setContacts([...contacts, { name: "", role: "", email: "", phone: "" }])
    }
  }

  const removeContact = (index:number) => {
    const updated = contacts.filter((_,i)=>i!==index)
    setContacts(updated)
  }

  const handleChange = (index:number,field:string,value:string)=>{
    const updated=[...contacts]
    updated[index][field as keyof typeof updated[number]] = value
    setContacts(updated)
  }

  const handleSubmit = () => {

    const newInstitution = {
      id:`INST-${Date.now()}`,
      name,
      email,
      location,
      status:"Active"
    }

    const existing =
      JSON.parse(localStorage.getItem("institutions") || "[]")

    localStorage.setItem(
      "institutions",
      JSON.stringify([newInstitution,...existing])
    )

    router.push("/admin/institutions")
  }

  return (

    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="max-w-3xl w-full bg-white border rounded-xl shadow p-8">

        {/* Title */}

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-xl font-semibold text-gray-900">
            Register New Institution
          </h1>

          <Link href="/admin/institutions" className="text-gray-600">
            ✕
          </Link>

        </div>

        {/* Institution Info */}

        <div className="space-y-4">

          <div>
            <label className="text-sm text-gray-800">
              Institution Name
            </label>

            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-gray-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-800">
                Official Email
              </label>

              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-gray-800">
                Location
              </label>

              <input
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-gray-900"
              />
            </div>

          </div>

        </div>

        {/* Contacts */}

        <div className="mt-6">

          <div className="flex justify-between items-center mb-3">

            <h2 className="text-sm font-medium text-gray-900">
              Point of Contacts
            </h2>

            <button
              onClick={addContact}
              className="flex items-center gap-1 text-blue-600 text-sm"
            >
              <Plus size={16}/>
              Add
            </button>

          </div>

          {contacts.map((contact,index)=>(
            <div
              key={index}
              className="border rounded-lg p-4 mb-4 space-y-3"
            >

              <div className="flex justify-between">

                <span className="text-xs text-gray-600">
                  Contact {index+1}
                </span>

                {contacts.length>1 &&(
                  <button onClick={()=>removeContact(index)}>
                    <Trash2 size={16} className="text-red-500"/>
                  </button>
                )}

              </div>

              <div className="grid grid-cols-2 gap-4">

                <input
                  placeholder="Name"
                  className="border rounded-lg px-3 py-2 text-gray-900"
                  value={contact.name}
                  onChange={(e)=>handleChange(index,"name",e.target.value)}
                />

                <input
                  placeholder="Role"
                  className="border rounded-lg px-3 py-2 text-gray-900"
                  value={contact.role}
                  onChange={(e)=>handleChange(index,"role",e.target.value)}
                />

              </div>

              <div className="grid grid-cols-2 gap-4">

                <input
                  placeholder="Email"
                  className="border rounded-lg px-3 py-2 text-gray-900"
                  value={contact.email}
                  onChange={(e)=>handleChange(index,"email",e.target.value)}
                />

                <input
                  placeholder="Phone"
                  className="border rounded-lg px-3 py-2 text-gray-900"
                  value={contact.phone}
                  onChange={(e)=>handleChange(index,"phone",e.target.value)}
                />

              </div>

            </div>
          ))}

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4 mt-6">

          <Link
            href="/admin/institutions"
            className="px-4 py-2 text-gray-800"
          >
            Cancel
          </Link>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Register Institution
          </button>

        </div>

      </div>

    </div>
  )
}
