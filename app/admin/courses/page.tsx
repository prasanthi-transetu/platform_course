export default function CoursesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Courses</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add New Course
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700">
            No courses found. Create your first course to get started.
          </p>
        </div>
      </div>
    </div>
  );
}

