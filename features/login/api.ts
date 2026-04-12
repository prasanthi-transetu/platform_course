export const loginBaseUrl = "/api/auth/login";

export const loginToApi = async (email: string, password: string) => {
  const response = await fetch(loginBaseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let errorMessage = "Failed to login";
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.detail) {
        errorMessage = errorData.detail;
      }
    } catch (e) {
      // Ignore if response is not JSON
    }
    throw new Error(errorMessage);
  }

  return response.json();
};
