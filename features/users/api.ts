// Users API - fetches from internal proxy routes
const BASE_URL = "/api/v1/users";

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

async function handleResponse(response: Response) {
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const message = err.message || err.detail || "API request failed";
    
    if (message.toLowerCase().includes("token expired") || response.status === 401) {
      if (typeof document !== "undefined") {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/login";
      }
    }
    throw new Error(message);
  }
  return response.json();
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
  const response = await fetch(BASE_URL, { headers: getAuthHeaders() });
  const result = await handleResponse(response);
  return result.data || result;
}

/**
 * Create a new user
 */
export async function createUser(userData: { name: string; email: string; password?: string; role: string; institution?: string }) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

/**
 * Update an existing user
 */
export async function updateUser(id: string | number, userData: Partial<User> & { password?: string }) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

/**
 * Delete a user
 */
export async function deleteUser(id: string | number) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok && response.status !== 204) {
    return handleResponse(response);
  }
  return true;
}
