"use client"

import NavMain from "./nav-main"
import NavUser from "./nav-user"

export default function AppSidebar() {
  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col justify-between h-screen">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-bold">LMS Admin</h2>
          <p className="text-xs text-gray-400">Primary e ub</p>
        </div>

        {/* Navigation */}
        <NavMain />

      </div>

      {/* Bottom User */}
      <NavUser />

    </aside>
  )
}