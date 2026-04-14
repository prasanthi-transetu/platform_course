// Students API - fetches directly from backend to avoid server-to-localhost proxy issues on Vercel
const API_HOST = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const BASE_URL = `${API_HOST}/api/v1/students`;
const STORAGE_KEY = "students";

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
  // Handle both backend format (first_name/last_name) and local format (student_name/name)
  const firstName = s.first_name || splitName(s.student_name || s.name || "").first_name;
  const lastName = s.last_name || splitName(s.student_name || s.name || "").last_name;
  
  return {
    ...s,
    id: s.student_id || s.id,
    first_name: firstName,
    last_name: lastName,
    name: s.student_name || s.name || `${firstName} ${lastName}`.trim(),
    course_name: s.course_name || s.course?.name || "",
    email: s.email || "",
    institution: s.institution || (s.course?.institution_id ? `Institution ${s.course.institution_id}` : ""),
    course: s.course_name || s.course?.name || s.course || "",
    status: s.status ? (s.status.charAt(0).toUpperCase() + s.status.slice(1).toLowerCase()) : "Active",
  };
}

/**
 * Fetch all students
 */
export async function fetchStudents(page: number = 1, limit: number = 50, search?: string, statusFilter?: string, courseId?: string) {
  try {
    let url = BASE_URL;
    const query = new URLSearchParams();
    if (page !== undefined && limit !== undefined) {
      query.append("page", page.toString());
      query.append("limit", limit.toString());
    }
    if (search) {
      query.append("search", search);
    }
    if (statusFilter && statusFilter !== "All") {
      query.append("status", statusFilter.toLowerCase()); // Sends 'active' or 'inactive'
    }
    if (courseId && courseId.trim() !== "") {
      query.append("course_id", courseId);
    }
    
    if (query.toString()) {
      url = `${BASE_URL}?${query.toString()}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Backend returned " + response.status);
    }
    const result = await response.json();
    const students = result.data?.students || result.data || result; // Backend returning paginated format or array
    const mapped = Array.isArray(students) ? students.map(mapStudent) : [];

    // Optional pagination metadata
    const total = result.pagination?.total || result.total || result.data?.total || result.total_count || mapped.length;
    const totalPages = result.pagination?.totalPages || result.pagination?.total_pages || result.total_pages || result.data?.total_pages || Math.ceil(total / limit);

    // Merge with any locally-stored students (created while backend was down)
    let local = getLocalStudents();
    
    // Apply local filters before merging
    if (search) {
      const searchLower = search.toLowerCase();
      local = local.filter((student: any) => {
        const fullName = `${student.first_name || ''} ${student.last_name || ''} ${student.name || ''}`.toLowerCase();
        return fullName.includes(searchLower) || String(student.id || "").toLowerCase().includes(searchLower);
      });
    }
    if (statusFilter && statusFilter !== "All") {
      local = local.filter((student: any) => student.status?.toLowerCase() === statusFilter.toLowerCase());
    }
    if (courseId && courseId.trim() !== "") {
      local = local.filter((student: any) => String(student.course_id || student.course || student.course_name) === courseId);
    }

    let finalStudents = mapped;
    if (local.length > 0) {
      const apiIds = new Set(mapped.map((s: any) => String(s.id)));
      const extras = local.filter((s: any) => !apiIds.has(String(s.id)));
      finalStudents = [...extras, ...mapped];
    }
    return {
      students: finalStudents,
      total: total + (finalStudents.length - mapped.length),
      totalPages: Math.max(totalPages, Math.ceil(finalStudents.length / limit))
    };
  } catch (err) {
    console.warn("Backend unavailable, falling back to localStorage:", err);
    // Fallback to localStorage when backend is down
    let localStudents = getLocalStudents();
    
    // Apply local search filtering if a search query was provided
    if (search) {
      const searchLower = search.toLowerCase();
      localStudents = localStudents.filter((student: any) => {
        const fullName = `${student.first_name || ''} ${student.last_name || ''} ${student.name || ''}`.toLowerCase();
        return fullName.includes(searchLower) || String(student.id || "").toLowerCase().includes(searchLower);
      });
    }
    if (statusFilter && statusFilter !== "All") {
      localStudents = localStudents.filter((student: any) => student.status?.toLowerCase() === statusFilter.toLowerCase());
    }
    if (courseId && courseId.trim() !== "") {
      localStudents = localStudents.filter((student: any) => String(student.course_id || student.course || student.course_name) === courseId);
    }
    
    return {
      students: localStudents,
      total: localStudents.length,
      totalPages: Math.ceil(localStudents.length / limit) || 1
    };
  }
}

/** Helper: read students from localStorage */
function getLocalStudents(): any[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

/** Helper: save a student to localStorage */
function saveStudentLocally(student: any) {
  if (typeof window === "undefined") return;
  const existing = getLocalStudents();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([student, ...existing]));
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
  const payload = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    mobile_number: data.mobile_number,
    password: data.password,
    notes: data.notes,
  };

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    if (!response.ok || (result && result.success === false)) {
      // Backend returned an error — still save locally so student appears in the table
      console.warn("Backend rejected student, saving locally:", result.message);
      const localStudent = { ...payload, id: Math.floor(1000 + Math.random() * 9000), first_name: data.first_name, last_name: data.last_name, status: "Active" };
      saveStudentLocally(localStudent);
      return { data: localStudent, savedLocally: true };
    }

    // Also cache in localStorage
    const id = result.data?.id || result.id || Math.floor(1000 + Math.random() * 9000);
    const localStudent = { ...payload, id, first_name: data.first_name, last_name: data.last_name, status: "Active" };
    saveStudentLocally(localStudent);

    return result;
  } catch (err: any) {
    // Backend completely unreachable — save locally
    console.warn("Backend unreachable, saving student locally:", err.message);
    const localStudent = { ...payload, id: Math.floor(1000 + Math.random() * 9000), first_name: data.first_name, last_name: data.last_name, status: "Active" };
    saveStudentLocally(localStudent);
    return { data: localStudent, savedLocally: true };
  }
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
