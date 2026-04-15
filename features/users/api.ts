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

/**
 * Update an existing user
 */
export async function updateUser(id: string | number, userData: Partial<User> & { password?: string }) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user");
    }

    return await response.json();
  } catch (err: any) {
    console.error("Update user failed:", err);
    throw err;
  }
}

/**
 * Delete a user
 */
export async function deleteUser(id: string | number) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok && response.status !== 204) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete user");
    }

    return true;
  } catch (err: any) {
    console.error("Delete user failed:", err);
    throw err;
  }
}
