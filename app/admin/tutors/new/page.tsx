"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTutorPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    domains: "",
    tags: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Tutor Added:", form);

    // 👉 API call here later

    router.push("/admin/tutors"); // redirect back
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/40 backdrop-blur-sm">

      {/* MODAL */}
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6">

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Register New Tutor
        </h2>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4">

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="border p-2 rounded-lg text-gray-900"
          />

          <input
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="border p-2 rounded-lg text-gray-900"
          />

          <input
            name="phone"
            placeholder="Contact Number"
            onChange={handleChange}
            className="border p-2 rounded-lg text-gray-900"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="border p-2 rounded-lg text-gray-900"
          />

        </div>

        {/* DOMAIN */}
        <div className="mt-4">
          <label className="text-sm text-gray-700">Domains</label>
          <input
            name="domains"
            placeholder="e.g. React, Java"
            onChange={handleChange}
            className="w-full border p-2 rounded-lg mt-1 text-gray-900"
          />
        </div>

        {/* TAGS */}
        <div className="mt-4">
          <label className="text-sm text-gray-700">Tags</label>
          <input
            name="tags"
            placeholder="e.g. Frontend, Backend"
            onChange={handleChange}
            className="w-full border p-2 rounded-lg mt-1 text-gray-900"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => router.push("/admin/tutors")}
            className="px-4 py-2 text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Register Tutor
          </button>

        </div>

      </div>
    </div>
  );
}
