"use client";

import { useState } from "react";
import Link from "next/link";
import { UploadCloud } from "lucide-react";

export default function CreateBatchPage() {

  const [batchName, setBatchName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">

      <div className="bg-white w-[850px] rounded-xl shadow-xl p-8">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-semibold text-gray-800">
            Create New Batch
          </h2>

          <Link
            href="/admin/batches"
            className="text-gray-700 hover:text-gray-700 text-xl"
          >
            ✕
          </Link>

        </div>


        {/* FORM */}

        <div className="space-y-5">

          {/* BATCH NAME */}

          <div>
            <label className="text-sm text-gray-600 font-medium">
              Batch Name
            </label>

            <input
              type="text"
              placeholder="e.g. Computer Science - 2024 - Section A"
              value={batchName}
              onChange={(e)=>setBatchName(e.target.value)}
              className="w-full mt-1 border rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          {/* SELECT ROW */}

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Select Institution
              </label>

              <select className="w-full mt-1 border rounded-lg p-3 text-gray-800">
                <option>Select Institution</option>
                <option>ABC University</option>
                <option>XYZ College</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Select Course
              </label>

              <select className="w-full mt-1 border rounded-lg p-3 text-gray-800">
                <option>Select Course</option>
                <option>Computer Science</option>
                <option>Data Science</option>
              </select>
            </div>

          </div>


          {/* INSTRUCTOR + STUDENTS */}

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Instructor
              </label>

              <input
                type="text"
                placeholder="Search and select instructor..."
                className="w-full mt-1 border rounded-lg p-3 text-gray-800"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Enroll Students
              </label>

              <input
                type="text"
                placeholder="Search by name or ID..."
                className="w-full mt-1 border rounded-lg p-3 text-gray-800"
              />
            </div>

          </div>


          {/* DATE ROW */}

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Start Date
              </label>

              <input
                type="date"
                className="w-full mt-1 border rounded-lg p-3 text-gray-800"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                End Date
              </label>

              <input
                type="date"
                className="w-full mt-1 border rounded-lg p-3 text-gray-800"
              />
            </div>

          </div>


          {/* FILE UPLOAD */}

          <div>

            <label className="text-sm text-gray-600 font-medium">
              Bulk Upload
            </label>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed rounded-xl mt-2 p-10 flex flex-col items-center justify-center text-center"
            >

              <UploadCloud size={36} className="text-blue-600 mb-2"/>

              <p className="text-gray-700">
                Drag and drop CSV file here
              </p>

              <p className="text-gray-400 text-sm mb-3">
                Maximum file size 10MB
              </p>

              {/* FILE INPUT */}

              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="fileUpload"
              />

              <label
                htmlFor="fileUpload"
                className="border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Select File
              </label>

              {file && (
                <p className="mt-3 text-sm text-green-600">
                  Selected: {file.name}
                </p>
              )}

            </div>

          </div>


          {/* TEMPLATE DOWNLOAD */}

          <div className="flex justify-between text-sm text-gray-600">

            <span>
              Make sure your file follows the standard template format.
            </span>

            <button className="text-blue-600 hover:underline">
              Download Template
            </button>

          </div>


          {/* FOOTER BUTTONS */}

          <div className="flex justify-end gap-3 pt-4">

            <Link
              href="/admin/batches"
              className="px-5 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Link>

            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create Batch
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}
