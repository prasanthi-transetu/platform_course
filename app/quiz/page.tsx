"use client";

export default function QuizPage() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Quiz Management
        </h1>

        <p className="text-gray-600">
          Manage and track quiz performance across your batches.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card 1 */}

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600 text-xl">
            👥
          </div>

          <div>
            <p className="text-gray-700 text-sm">Total Batches</p>
            <h2 className="text-3xl font-bold text-gray-900">12</h2>
          </div>
        </div>

        {/* Card 2 */}

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg text-purple-600 text-xl">
            📄
          </div>

          <div>
            <p className="text-gray-700 text-sm">Total Submissions</p>
            <h2 className="text-3xl font-bold text-gray-900">1,240</h2>
          </div>
        </div>

        {/* Card 3 */}

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-600 text-xl">
            ✔
          </div>

          <div>
            <p className="text-gray-700 text-sm">Completion Rate</p>
            <h2 className="text-3xl font-bold text-gray-900">94%</h2>
          </div>
        </div>

        {/* Card 4 */}

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-lg text-orange-600 text-xl">
            📝
          </div>

          <div>
            <p className="text-gray-700 text-sm">Total Quizzes</p>
            <h2 className="text-3xl font-bold text-gray-900">36</h2>
          </div>
        </div>

      </div>

    </div>
  );
}
