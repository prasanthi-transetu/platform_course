export default function HomePage() {
  return (
    <div className="p-8">
      <div className="max-w-6xl">
        <h1 className="text-4xl font-bold mb-2">Course Platform</h1>
        <p className="text-gray-600 mb-8">Welcome to the admin dashboard</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Dashboard Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-700 text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold mt-2">1,234</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-700 text-sm font-medium">
              Total Students
            </h3>
            <p className="text-3xl font-bold mt-2">856</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-700 text-sm font-medium">Total Tutors</h3>
            <p className="text-3xl font-bold mt-2">42</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-700 text-sm font-medium">
              Total Institutions
            </h3>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>
        </div>
      </div>
    </div>
  );
}

