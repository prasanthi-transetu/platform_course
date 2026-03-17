"use client"

import Link from "next/link"

export default function NavMain() {
  return (
    <nav className="p-4">

      <ul className="space-y-3 text-sm">

        <li>
          <Link
            href="/admin/dashboard"
            className="block px-3 py-2 rounded bg-blue-600"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/admin/users"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            User Management
          </Link>
        </li>

        <li>
          <Link
            href="/admin/institutions"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Institutions
          </Link>
        </li>

        <li>
          <Link
            href="/admin/students"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Students
          </Link>
        </li>

        <li>
          <Link
            href="/admin/batches"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Batches
          </Link>
        </li>

        <li>
          <Link
            href="/admin/courses"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Courses
          </Link>
        </li>

        <li>
          <Link
            href="/admin/tutors"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Tutors
          </Link>
        </li>

        <li>
          <Link
            href="/admin/quizzes"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Quizzes
          </Link>
        </li>

        <li>
          <Link
            href="/admin/assignments"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Assignments
          </Link>
        </li>

      </ul>

    </nav>
  )
}