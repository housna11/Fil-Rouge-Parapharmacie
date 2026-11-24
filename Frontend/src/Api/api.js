const API_URL = "http://127.0.0.1:8000/api";

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) throw new Error("Erreur API");
    return response.json();
  },

  post: async (endpoint, data, token = null) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Erreur API");
    return response.json();
  },
};