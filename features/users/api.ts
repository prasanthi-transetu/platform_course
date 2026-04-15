// Users API - fetches directly from backend
const API_HOST = process.env.NEXT_PUBLIC_API_URL || "https://lms-backend-n83k.onrender.com";
const BASE_URL = `${API_HOST}/api/v1/users`;

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    if (match) {
      headers["Authorization"] = `Bearer ${match[2]}`;
    }
  }
  return headers;
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  institution?: string;
  created_at?: string;
  status?: string;
}

/**
 * Fetch all users
 */
export async function fetchUsers() {
  try {
    const response = await fetch(BASE_URL, { headers: getAuthHeaders() });
    if (!response.ok) {
      throw new Error("Backend returned " + response.status);
    }
    const result = await response.json();
    return result.data || result;
  } catch (err: any) {
    console.error("Backend fetch failed:", err);
    throw err;
  }
}

/**
 * Create a new user
 */
export async function createUser(userData: { name: string; email: string; password?: string; role: string; institution?: string }) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create user");
    }

    return await response.json();
  } catch (err: any) {
    console.error("Create user failed:", err);
    throw err;
  }
}
