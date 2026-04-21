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
    let err: unknown = {};
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        err = await response.json();
      } else {
        const text = await response.text();
        // Check if it's an HTML response (likely a 404/500 from Express/Nginx)
        if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
          err = { message: `Backend returned an error page (Status ${response.status})` };
        } else {
          err = { message: text || `Error ${response.status}: ${response.statusText}` };
        }
      }
    } catch (e) {
      err = { message: "Failed to parse error response body" };
    }
    
    // Log detailed error info for debugging
    console.error(`--- API Error ---`);
    console.error(`URL: ${response.url}`);
    console.error("Status:", response.status);
    console.error("Status Text:", response.statusText);
    console.error("Response Body:", err);
    console.error(`-----------------`);
    
    // Extract as much detail as possible for the error message
    let message = "API request failed";
    if (err && typeof err === 'object') {
      const errorObj = err as Record<string, unknown>;
      // Log the error object for debugging
      console.error("Error Object:", errorObj);
      
      // Check for specific 400 Bad Request details
      if (response.status === 400 && typeof errorObj.message === 'string') {
        message = errorObj.message;
      } else if (errorObj.detail) {
        if (typeof errorObj.detail === 'string') message = errorObj.detail;
        else if (Array.isArray(errorObj.detail)) {
          // Extract more info from pydantic errors
          message = (errorObj.detail as unknown[]).map((d) => {
            const detailItem = d as Record<string, unknown>;
            const field = Array.isArray(detailItem.loc) ? detailItem.loc.join('.') : 'error';
            return `${field}: ${detailItem.msg} (${detailItem.type})`;
          }).map(String).join(', ');
        } else if (typeof errorObj.detail === 'object' && errorObj.detail !== null) {
          const detailObj = errorObj.detail as Record<string, unknown>;
          message = String(detailObj.message || detailObj.error || JSON.stringify(detailObj));
        }
      } else if (typeof errorObj.message === 'string') {
        message = errorObj.message;
      } else if (typeof errorObj.error === 'string') {
        message = errorObj.error;
      }
    }
    
    if (message === "API request failed" || !message) {
      if (response.status === 422) {
        message = "Validation error: Check your input data";
      } else if (response.status === 400) {
        message = "Bad request: The server could not process the request";
      } else if (response.status === 401) {
        message = "Unauthorized: Please login again";
      } else if (response.status === 403) {
        message = "Forbidden: You don't have permission for this action";
      } else if (response.status === 404) {
        message = "Not found: The requested resource does not exist";
      } else {
        message = `API Error ${response.status}: ${response.statusText || 'Unknown error'}`;
      }
    }
    
    // Only redirect if it's truly a 401 Unauthorized and explicitly mentions token expiry
    if (response.status === 401 && message.toLowerCase().includes("token expired")) {
      if (typeof document !== "undefined") {
        console.warn("Auth token expired, redirecting to login...");
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
  full_name?: string;
  name?: string;
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
 * Fetch a user by ID
 */
export async function fetchUserById(id: string | number) {
  const response = await fetch(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
  const result = await handleResponse(response);
  return result.data || result;
}

/**
 * Fetch total count of admins
 */
export async function fetchAdminCount(): Promise<number> {
  const response = await fetch(`${BASE_URL}/count/admins`, { headers: getAuthHeaders() });
  const result = await handleResponse(response);
  
  // Log the result to see the structure in the browser console
  console.log("fetchAdminCount result:", result);

  return parseCount(result);
}

/**
 * Fetch total count of representatives
 */
export async function fetchRepresentativeCount(): Promise<number> {
  const response = await fetch(`${BASE_URL}/count/representatives`, { headers: getAuthHeaders() });
  const result = await handleResponse(response);
  
  console.log("fetchRepresentativeCount result:", result);

  return parseCount(result);
}

/**
 * Fetch total count of institutions
 */
export async function fetchInstitutionCount(): Promise<number> {
  const response = await fetch(`${BASE_URL}/count/institutions`, { headers: getAuthHeaders() });
  const result = await handleResponse(response);
  
  console.log("fetchInstitutionCount result:", result);

  return parseCount(result);
}

/**
 * Helper function to parse count from various API response formats
 */
function parseCount(result: unknown): number {
  if (result && typeof result === 'object' && result !== null) {
    const resObj = result as Record<string, unknown>;
    // Check nested data first (common in this backend)
    if (resObj.data !== undefined) {
      if (typeof resObj.data === 'number') return resObj.data;
      if (resObj.data && typeof resObj.data === 'object') {
        const dataObj = resObj.data as Record<string, unknown>;
        if (typeof dataObj.count === 'number') return dataObj.count;
      }
      if (typeof resObj.data === 'string' && !isNaN(Number(resObj.data))) {
        return Number(resObj.data);
      }
    }
    
    // Check direct count/total fields
    if (typeof resObj.count === 'number') return resObj.count as number;
    if (typeof resObj.total === 'number') return resObj.total as number;
    if (typeof resObj.total_admins === 'number') return resObj.total_admins as number;
    if (typeof resObj.total_representatives === 'number') return resObj.total_representatives as number;
  }
  
  // Direct number response
  if (typeof result === 'number') return result;
  if (typeof result === 'string' && !isNaN(Number(result))) return Number(result);

  return 0;
}

/**
 * Create a new user
 */
export async function createUser(userData: Record<string, unknown>) {
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
export async function updateUser(id: string | number, userData: Record<string, unknown>) {
  if (!id || id === "N/A") {
    throw new Error("Invalid user ID for update");
  }
  
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
