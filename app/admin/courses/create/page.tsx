"use client";

import { useState } from "react";
import { Plus, LayoutGrid, ChevronDown, MonitorPlay } from "lucide-react";
import Link from "next/link";

export default function CreateCoursePage() {
  const [title, setTitle] = useState("Advanced Full-Stack Development");
  const [domain, setDomain] = useState("Web Development");
  const [tags, setTags] = useState("React, Node.js, API, Tailwind");

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-800">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Create New Course
        </h1>
        <div className="flex gap-3">
          <button className="px-6 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2 text-sm">
            Preview
          </button>
          <button className="px-6 py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold shadow-sm hover:bg-blue-100 transition-all text-sm">
            Save Draft
          </button>
          <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all text-sm">
            Publish Course
          </button>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Course Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400 font-medium"
              placeholder="Enter course title..."
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Domain
            </label>
            <div className="relative">
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium appearance-none cursor-pointer"
              >
                <option>Web Development</option>
                <option>Data Science</option>
                <option>Cybersecurity</option>
                <option>Design</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400 font-medium"
              placeholder="Add tags separated by comma..."
            />
          </div>
        </div>
      </div>

      {/* CURRICULUM SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-200 flex flex-col items-center justify-center p-20 min-h-[400px]">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
          <LayoutGrid className="text-blue-500" size={32} />
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Start your curriculum
        </h2>
        <p className="text-gray-500 text-center max-w-sm mb-10 leading-relaxed font-normal">
          Your course curriculum is currently empty. Start by adding your first module to organize lessons and resources.
        </p>

        <Link href="/admin/courses/create/module">
          <button className="flex items-center gap-3 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <Plus size={20} className="stroke-[3px]" /> Add First Module
          </button>
        </Link>
      </div>
    </div>
  );
}
