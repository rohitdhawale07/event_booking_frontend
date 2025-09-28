const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = {
  post: async (endpoint: string, body: any, token?: string) => {
    const url = `${BASE_URL.replace(/\/$/, "")}${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      let errorMessage = "API Error";
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.message ||
          errorData.error ||
          JSON.stringify(errorData);
      } catch {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  get: async (endpoint: string, token?: string) => {
    const url = `${BASE_URL.replace(/\/$/, "")}${endpoint}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      let errorMessage = "API Error";
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.message ||
          errorData.error ||
          JSON.stringify(errorData);
      } catch {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  put: async (endpoint: string, body: any, token?: string) => {
    const url = `${BASE_URL.replace(/\/$/, "")}${endpoint}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      let errorMessage = "API Error";
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.message ||
          errorData.error ||
          JSON.stringify(errorData);
      } catch {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  delete: async (endpoint: string, token?: string) => {
    const url = `${BASE_URL.replace(/\/$/, "")}${endpoint}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      let errorMessage = "API Error";
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.message ||
          errorData.error ||
          JSON.stringify(errorData);
      } catch {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },
};