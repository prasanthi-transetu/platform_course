import Link from "next/link";
import { ChevronRight, Plus, Search, SlidersHorizontal, CircleHelp } from "lucide-react";

const domainTags = ["COMPUTER SCI", "DATA SCI", "MATHS", "ENGINEERING"];
const quizTags = ["ALGORITHMS", "BASICS", "MIDTERM", "FINAL"];

export default function NewQuizPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/admin/quizzes" className="hover:text-slate-700">
          Quizzes
        </Link>
        <ChevronRight size={14} />
        <span className="font-medium text-slate-700">Create New Quiz</span>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-slate-900">Create New Quiz</h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the details below to set up a new student assessment.
        </p>
      </div>

      <div className="space-y-5">
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-3">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Quiz Details
            </h2>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Quiz Title
              </label>
              <input
                type="text"
                defaultValue="e.g. Introduction to Data Structures Midterm"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-blue-200 placeholder:text-slate-400 focus:ring-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Duration (Minutes)
              </label>
              <input
                type="text"
                defaultValue="e.g. 60"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-blue-200 placeholder:text-slate-400 focus:ring-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Total Marks
              </label>
              <input
                type="text"
                defaultValue="e.g. 100"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-blue-200 placeholder:text-slate-400 focus:ring-2"
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-3">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Categorization
            </h2>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Domains
              </label>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {domainTags.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-blue-100 px-2 py-1 text-[10px] font-semibold tracking-wide text-blue-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="relative">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search domains..."
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-3 text-sm text-slate-700 outline-none ring-blue-200 placeholder:text-slate-400 focus:ring-2"
                />
              </div>
              <p className="mt-1 text-xs text-slate-400">Assign your quiz category tags by domain.</p>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tags
              </label>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {quizTags.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-blue-100 px-2 py-1 text-[10px] font-semibold tracking-wide text-blue-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type and press Enter"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-blue-200 placeholder:text-slate-400 focus:ring-2"
              />
              <p className="mt-1 text-xs text-slate-400">Helpful in searching and filtering assessments.</p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quiz Content</h2>
            <button className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              <Plus size={12} />
              Add Question
            </button>
          </div>

          <div className="p-5">
            <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                <CircleHelp size={18} className="text-slate-400" />
              </div>
              <p className="text-sm font-semibold text-slate-700">No questions added yet</p>
              <p className="mt-1 text-xs text-slate-500">
                Start building your quiz by adding multiple choice, true/false, or short answer
                questions.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
                  <SlidersHorizontal size={12} />
                  Multiple Choice
                </button>
                <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
                  <SlidersHorizontal size={12} />
                  True / False
                </button>
                <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
                  <SlidersHorizontal size={12} />
                  Short Answer
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <Link
          href="/admin/quizzes"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </Link>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          Create Quiz
        </button>
      </div>
    </div>
  );
}
