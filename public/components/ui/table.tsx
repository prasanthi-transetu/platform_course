"use client";

import { useState } from "react";

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="w-full border-collapse border">
      {children}
    </table>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b">{children}</tr>;
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="p-3 text-left font-semibold text-black">
      {children}
    </th>
  );
}

export function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="p-3 text-black">
      {children}
    </td>
  );
}

export function TablePagination({
  totalRows,
  rowsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div className="mt-4 flex justify-center gap-2">

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === i + 1
              ? "bg-black text-white"
              : "bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}

    </div>
  );
}
