"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMain() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="p-4">
      <ul className="space-y-2 text-sm">
        <li>
          <Link
            href="/admin/dashboard"
            className={`block px-3 py-2 rounded ${
              isActive("/admin/dashboard")
                ? "text-blue-600 font-medium bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/admin/users"
            className={`block px-3 py-2 rounded ${
              isActive("/admin/users")
                ? "text-blue-600 font-medium bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            User Management
          </Link>
        </li>

        <li>
          <Link
            href="/admin/institutions"
            className={`block px-3 py-2 rounded ${
              isActive("/admin/institutions")
                ? "text-blue-600 font-medium bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Institutions
          </Link>
        </li>

        <li>
          <Link
            href="/admin/students"
            className={`block px-3 py-2 rounded ${
              isActive("/admin/students")
                ? "text-blue-600 font-medium bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Students
          </Link>
        </li>

        <li>
          <Link
            href="/admin/batches"
            className={`block px-3 py-2 rounded ${
              isActive("/admin/batches")
                ? "text-blue-600 font-medium bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Batches
          </Link>
        </li>

        <li>
          <Link
            href="/admin/courses"
            className={`block px-3 py-2 rounded ${
              isActive("/admin/courses")
                ? "text-blue-600 font-medium bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Courses
          </Link>
        </li>

        <li>
          <Link
            href="/admin/tutors"
            className={`block px-3 py-2 rounded ${
              isActive("/admin/tutors")
                ? "text-blue-600 font-medium bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Tutors
          </Link>
        </li>

        <li>
          <Link
            href="/admin/quizzes"
            className={`block px-3 py-2 rounded ${
              isActive("/admin/quizzes")
                ? "text-blue-600 font-medium bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Quizzes
          </Link>
        </li>

        <li>
          <Link
            href="/admin/assignments"
            className={`block px-3 py-2 rounded ${
              isActive("/admin/assignments")
                ? "text-blue-600 font-medium bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Assignments
          </Link>
        </li>
      </ul>
    </nav>
  );
}

