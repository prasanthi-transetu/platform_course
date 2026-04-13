// Students API - calls the Next.js proxy which forwards to the backend

const BASE_URL = "/api/v1/students";

export interface Student {
  id: string | number;
  first_name: string;
  last_name?: string;
  email: string;
  mobile_number?: string;
  status: "active" | "inactive";
  course_id?: number | string;
  created_at?: string;
}

/**
 * Mapping helper: Splits a full name into first and last name
 */
export function splitName(fullName: string) {
  if (!fullName) return { first_name: "", last_name: "" };
  const parts = fullName.trim().split(/\s+/);
  const first_name = parts[0] || "";
  const last_name = parts.slice(1).join(" ") || "";
  return { first_name, last_name };
}

/**
 * Mapping helper: Normalizes student data from backend to frontend format
 */
function mapStudent(s: any): Student {
  const { first_name, last_name } = splitName(s.student_name || "");
  
  return {
    ...s,
    id: s.student_id || s.id,
    first_name: s.first_name || first_name,
    last_name: s.last_name || last_name,
    name: s.student_name || s.name || (s.first_name ? `${s.first_name} ${s.last_name || ""}`.trim() : ""),
    status: s.status ? (s.status.charAt(0).toUpperCase() + s.status.slice(1).toLowerCase()) : "Active",
  };
}

/**
 * Fetch all students
 */
export async function fetchStudents() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch students");
  }
  const result = await response.json();
  const students = result.data || result; // Backend returns { data: [...] }
  return Array.isArray(students) ? students.map(mapStudent) : [];
}

/**
 * Fetch a single student by ID
 */
export async function fetchStudent(id: string | number) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch student details");
  }
  const result = await response.json();
  const student = result.data || result;
  return mapStudent(student);
}
export async function createStudent(data: any) {
  // STRICT mapping to match backend developer's successful test case
  const payload = {
    student_id: data.id, 
    student_name: data.name,
    email: data.email,
    institution: data.institution,
    course: data.course_id || data.course,
    status: data.status || "Active", 
  };

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create student");
  }

  return response.json();
}

/**
 * Update a student with mapping
 */
export async function updateStudent(id: string | number, data: any) {
  const { first_name, last_name } = splitName(data.name || "");

  const payload: any = {
    // Verified fields
    student_name: data.name || (data.first_name ? `${data.first_name} ${data.last_name || ""}`.trim() : undefined),
    email: data.email,
    status: data.status ? (data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase()) : undefined,
    course: data.course_id || data.course,
    institution: data.institution,
    mobile_number: data.mobile_number,

    // Legacy fallbacks
    first_name: data.first_name || first_name,
    last_name: data.last_name || last_name,
    course_id: data.course_id || data.course,
  };

  // Remove undefined fields
  Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update student");
  }

  return response.json();
}

/**
 * Delete a student
 */
export async function deleteStudent(id: string | number) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to delete student");
  }
}
