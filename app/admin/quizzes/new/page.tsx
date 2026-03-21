"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Plus, Search, SlidersHorizontal, CircleHelp, X } from "lucide-react";

const QUIZZES_STORAGE_KEY = "admin_quizzes";
const availableDomains = ["COMPUTER SCI", "DATA SCI", "MATHS", "ENGINEERING"];
const defaultTags = ["ALGORITHMS", "BASICS", "MIDTERM", "FINAL"];

type QuestionType = "multiple_choice" | "true_false" | "short_answer";

type Question = {
  id: string;
  type: QuestionType;
  prompt: string;
};

export default function NewQuizPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>(["COMPUTER SCI"]);
  const [domainSearch, setDomainSearch] = useState("");
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [tagInput, setTagInput] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formError, setFormError] = useState("");

  const filteredDomains = useMemo(
    () =>
      availableDomains.filter(
        (item) =>
          item.toLowerCase().includes(domainSearch.toLowerCase()) && !selectedDomains.includes(item),
      ),
    [domainSearch, selectedDomains],
  );

  const addQuestion = (type: QuestionType) => {
    const label =
      type === "multiple_choice"
        ? "Multiple Choice"
        : type === "true_false"
          ? "True / False"
          : "Short Answer";
    setQuestions((prev) => [
      ...prev,
      { id: `${Date.now()}-${prev.length}`, type, prompt: `${label} question` },
    ]);
  };

  const addTag = () => {
    const normalized = tagInput.trim().toUpperCase();
    if (!normalized) return;
    if (!tags.includes(normalized)) {
      setTags((prev) => [...prev, normalized]);
    }
    setTagInput("");
  };

  const handleCreateQuiz = () => {
    if (!title.trim()) {
      setFormError("Quiz title is required.");
      return;
    }

    const payload = {
      id: `quiz-${Date.now()}`,
      title: title.trim(),
      domain: selectedDomains[0] || "GENERAL",
      tags,
      module: "Custom Module",
      duration: `${questions.length || 0} Qs`,
      status: "DRAFT",
      durationMinutes,
      totalMarks,
      questionsCount: questions.length,
    };

    try {
      const existingRaw = localStorage.getItem(QUIZZES_STORAGE_KEY);
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      localStorage.setItem(QUIZZES_STORAGE_KEY, JSON.stringify([payload, ...existing]));
      router.push("/admin/quizzes");
    } catch {
      setFormError("Could not save quiz. Please try again.");
    }
  };

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Introduction to Data Structures Midterm"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-blue-200 placeholder:text-slate-400 focus:ring-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Duration (Minutes)
              </label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                placeholder="e.g. 60"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-blue-200 placeholder:text-slate-400 focus:ring-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Total Marks
              </label>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                placeholder="e.g. 100"
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
                {selectedDomains.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-[10px] font-semibold tracking-wide text-blue-700"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedDomains((prev) => prev.filter((domain) => domain !== item))
                      }
                    >
                      <X size={10} />
                    </button>
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
                  value={domainSearch}
                  onChange={(e) => setDomainSearch(e.target.value)}
                  placeholder="Search domains..."
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-3 text-sm text-slate-700 outline-none ring-blue-200 placeholder:text-slate-400 focus:ring-2"
                />
              </div>
              {filteredDomains.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {filteredDomains.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setSelectedDomains((prev) => [...prev, item]);
                        setDomainSearch("");
                      }}
                      className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-semibold tracking-wide text-slate-600 hover:bg-slate-50"
                    >
                      + {item}
                    </button>
                  ))}
                </div>
              )}
              <p className="mt-1 text-xs text-slate-400">Assign your quiz category tags by domain.</p>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tags
              </label>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {tags.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-[10px] font-semibold tracking-wide text-blue-700"
                  >
                    {item}
                    <button type="button" onClick={() => setTags((prev) => prev.filter((t) => t !== item))}>
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
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
            <button
              type="button"
              onClick={() => addQuestion("multiple_choice")}
              className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700"
            >
              <Plus size={12} />
              Add Question
            </button>
          </div>

          <div className="p-5">
            {questions.length === 0 ? (
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
                  <button
                    type="button"
                    onClick={() => addQuestion("multiple_choice")}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600"
                  >
                    <SlidersHorizontal size={12} />
                    Multiple Choice
                  </button>
                  <button
                    type="button"
                    onClick={() => addQuestion("true_false")}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600"
                  >
                    <SlidersHorizontal size={12} />
                    True / False
                  </button>
                  <button
                    type="button"
                    onClick={() => addQuestion("short_answer")}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600"
                  >
                    <SlidersHorizontal size={12} />
                    Short Answer
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <div key={question.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Question {index + 1} - {question.type.replace("_", " ")}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setQuestions((prev) => prev.filter((item) => item.id !== question.id))
                        }
                        className="text-xs text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      value={question.prompt}
                      onChange={(e) =>
                        setQuestions((prev) =>
                          prev.map((item) =>
                            item.id === question.id ? { ...item, prompt: e.target.value } : item,
                          ),
                        )
                      }
                      className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-blue-200 focus:ring-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {formError && <p className="mt-4 text-sm text-red-500">{formError}</p>}

      <div className="mt-6 flex items-center justify-end gap-3">
        <Link
          href="/admin/quizzes"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </Link>
        <button
          type="button"
          onClick={handleCreateQuiz}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
}
