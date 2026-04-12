// Institutions API - calls the Next.js proxy which forwards to the backend

const BASE_URL = "/api/v1/institutions";

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

// Fetch all institutions
export async function fetchInstitutions(): Promise<Institution[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || err.detail || "Failed to fetch institutions");
  }
  return response.json();
}

// Fetch a single institution by ID
export async function fetchInstitutionById(id: string): Promise<Institution> {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || err.detail || "Failed to fetch institution");
  }
  return response.json();
}

// Create a new institution
export async function createInstitution(data: CreateInstitutionPayload): Promise<Institution> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || err.detail || "Failed to create institution");
  }
  return response.json();
}

// Update an institution
export async function updateInstitution(id: string, data: UpdateInstitutionPayload): Promise<Institution> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || err.detail || "Failed to update institution");
  }
  return response.json();
}

// Delete an institution
export async function deleteInstitution(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || err.detail || "Failed to delete institution");
  }
}
