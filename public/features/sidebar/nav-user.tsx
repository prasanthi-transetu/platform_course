"use client";

export default function NavUser() {
  return (
    <div className="p-4 border-t border-gray-200 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-blue-500"></div>

      <div>
        <p className="text-sm font-medium text-gray-900">Alex Thompson</p>
        <p className="text-xs text-gray-700">Super Admin</p>
      </div>
    </div>
  );
}

