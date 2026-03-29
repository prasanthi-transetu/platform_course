"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  X, Info, LayoutGrid, Plus, Bold, Italic, List, 
  Link as LinkIcon, Code, ChevronLeft
} from "lucide-react";

export default function EditAssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.id;

  const [title, setTitle] = useState("Introduction to Web Ethics");
  const [description, setDescription] = useState("The objective of this assignment is to explore the ethical considerations of web development and software engineering. Students will analyze case studies related to data privacy, accessibility, algorithmic bias, and the environmental impact of large-scale digital infrastructure.");
  const [domain, setDomain] = useState("Web Development");
  const [tags, setTags] = useState("FRONTEND, ETHICS");
  const [criteria, setCriteria] = useState([
    { name: "Code Quality and Best Practices", marks: "80" },
    { name: "Documentation and Readability", marks: "20" }
  ]);

  const handleAddCriteria = () => {
    setCriteria([...criteria, { name: "", marks: "0" }]);
  };

  const handleUpdateCriteria = (index: number, field: string, value: string) => {
    const updated = [...criteria];
    updated[index] = { ...updated[index], [field]: value };
    setCriteria(updated);
  };

  const handleSave = () => {
    // Mock save logic
    router.push("/admin/assignments");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-100 rounded-lg transition text-gray-400"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-900">
              Edit Assignment
            </h2>
          </div>
          <button 
            onClick={() => router.push("/admin/assignments")}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-8">
          
          {/* SECTION 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Info size={16} className="text-blue-500" />
              <h3 className="text-xs font-bold text-blue-500 tracking-widest uppercase">
                Assignment Information
              </h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Assignment Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Domains</label>
                  <select 
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-gray-700"
                  >
                    <option>Web Development</option>
                    <option>Data Science</option>
                    <option>Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition">
                  <div className="bg-gray-50/50 border-b border-gray-200 px-3 py-2 flex items-center gap-1">
                    <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition"><Bold size={14} /></button>
                    <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition"><Italic size={14} /></button>
                    <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition"><List size={14} /></button>
                    <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition"><LinkIcon size={14} /></button>
                    <div className="flex-1"></div>
                    <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition"><Code size={14} /></button>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 text-sm outline-none min-h-[160px] resize-y leading-relaxed text-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* SECTION 2 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <LayoutGrid size={16} className="text-blue-500" />
              <h3 className="text-xs font-bold text-blue-500 tracking-widest uppercase">
                Evaluation Matrix
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 px-1">
                <div className="col-span-10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Criteria Name</div>
                <div className="col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Marks</div>
              </div>

              {criteria.map((c, i) => (
                <div key={i} className="grid grid-cols-12 gap-4">
                  <div className="col-span-10">
                    <input
                      type="text"
                      value={c.name}
                      onChange={(e) => handleUpdateCriteria(i, "name", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={c.marks}
                      onChange={(e) => handleUpdateCriteria(i, "marks", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 text-center font-bold"
                    />
                  </div>
                </div>
              ))}

              <button 
                onClick={handleAddCriteria}
                className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition mt-2"
              >
                <Plus size={16} /> ADD CRITERIA
              </button>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={() => router.push("/admin/assignments")}
            className="px-8 py-2.5 border border-gray-200 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-100 transition shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-200"
          >
            Update Assignment
          </button>
        </div>

      </div>
    </div>
  );
}
