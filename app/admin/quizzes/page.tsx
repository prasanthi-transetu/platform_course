export default function QuizzesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Quizzes</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add New Quiz
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700">
            No quizzes found. Create your first quiz to get started.
          </p>
        </div>
      </div>
    </div>
  );
}

