"use client"

import {
  Building2,
  Layers,
  BookOpen,
  Users,
  Plus,
  School,
  UserPlus,
  GraduationCap,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Admin Hub</h1>
          <p className="text-gray-700 text-sm">
            Manage institutions, learning paths, and users.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search anything..."
          className="border rounded-lg px-4 py-2 w-72 bg-gray-50 text-gray-900"
        />

      </div>

      {/* Quick Navigation */}

      <h2 className="font-semibold mb-4 text-gray-900">Quick Navigation</h2>

      <div className="grid grid-cols-4 gap-6 mb-10">

        {/* Institutions */}

        <Link href="/admin/institutions">

          <div className="bg-white rounded-xl p-6 border hover:shadow-md transition cursor-pointer">

            <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg mb-3">
              <Building2 size={18}/>
            </div>

            <p className="font-semibold text-gray-900">Institutions</p>
            <span className="text-gray-700 text-sm">42 Units</span>

          </div>

        </Link>

        {/* Batches */}

        <div className="bg-white rounded-xl p-6 border hover:shadow-md transition">
          <Layers className="mb-3 text-purple-600"/>
          <p className="font-semibold text-gray-900">Batches</p>
          <span className="text-gray-700 text-sm">156 Active</span>
        </div>

        {/* Courses */}

        <div className="bg-white rounded-xl p-6 border hover:shadow-md transition">
          <BookOpen className="mb-3 text-orange-600"/>
          <p className="font-semibold text-gray-900">Courses</p>
          <span className="text-gray-700 text-sm">84 Courses</span>
        </div>

        {/* Tutors */}

        <div className="bg-white rounded-xl p-6 border hover:shadow-md transition">
          <Users className="mb-3 text-red-500"/>
          <p className="font-semibold text-gray-900">Tutors</p>
          <span className="text-gray-700 text-sm">892 Staff</span>
        </div>

      </div>

      {/* Creation Hub */}

      <h2 className="font-semibold mb-4 text-gray-900">⚡ Creation Hub</h2>

      <div className="grid grid-cols-3 gap-6">

        {/* Create Batch */}

        <div className="bg-blue-600 text-white rounded-xl p-6 flex justify-between items-center shadow-md">

          <div className="flex gap-3 items-center">

            <div className="bg-blue-500 p-2 rounded-md">
              <Plus size={18}/>
            </div>

            <div>
              <p className="font-semibold">Create New Batch</p>
              <p className="text-xs opacity-80">
                Configure schedules & tutors
              </p>
            </div>

          </div>

          <ArrowRight size={18}/>

        </div>

        {/* Add Institution */}

        <Link href="/admin/institutions/new">

          <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 flex justify-between items-center cursor-pointer">

            <div className="flex gap-3 items-center">

              <School size={18} className="text-blue-500"/>

              <div>
                <p className="font-semibold text-gray-900">Add Institution</p>
                <p className="text-xs text-gray-700">
                  Onboard a new institution
                </p>
              </div>

            </div>

            <ArrowRight size={18} className="text-gray-600"/>

          </div>

        </Link>

        {/* Build Course */}

        <div className="bg-white rounded-xl p-6 border-l-4 border-yellow-500 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <BookOpen size={18} className="text-yellow-500"/>
            <div>
              <p className="font-semibold text-gray-900">Build Course</p>
              <p className="text-xs text-gray-700">
                Author curriculum content
              </p>
            </div>
          </div>
          <ArrowRight size={18} className="text-gray-600"/>
        </div>

      </div>

    </div>
  )
}
