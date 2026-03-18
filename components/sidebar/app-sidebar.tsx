"use client";

import NavMain from "./nav-main";
import NavUser from "./nav-user";

export default function AppSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 text-gray-900 flex flex-col justify-between h-screen">
      <div>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-blue-600">LMS Admin</h2>
          <p className="text-xs text-gray-700">Course Platform</p>
        </div>

        <NavMain />
      </div>

      <NavUser />
    </aside>
  );
}

