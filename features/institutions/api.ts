// Institutions API - calls the Next.js proxy which forwards to the backend

const BASE_URL = "/api/v1/institutions";

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

export interface InstitutionContact {
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface Institution {
  id: string;
  name: string;
  email: string;
  location: string;
  status: string;
  contacts: InstitutionContact[];
}

export interface CreateInstitutionPayload {
  name: string;
  email: string;
  location: string;
  status?: string;
  contacts: InstitutionContact[];
}

export interface UpdateInstitutionPayload {
  name?: string;
  email?: string;
  location?: string;
  status?: string;
  contacts?: InstitutionContact[];
}

// Fetch all institutions or search by query
export async function fetchInstitutions(search?: string): Promise<Institution[]> {
  const url = search 
    ? `${BASE_URL}?search=${encodeURIComponent(search)}` 
    : BASE_URL;
  const response = await fetch(url, { headers: getAuthHeaders() });
  return handleResponse(response);
}

// Fetch a single institution by ID
export async function fetchInstitutionById(id: string): Promise<Institution> {
  const response = await fetch(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
  return handleResponse(response);
}

// Create a new institution
export async function createInstitution(data: CreateInstitutionPayload): Promise<Institution> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// Update an institution
export async function updateInstitution(id: string, data: UpdateInstitutionPayload): Promise<Institution> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// Delete an institution
export async function deleteInstitution(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    return handleResponse(response);
  }
}
