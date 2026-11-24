const API_URL = "http://127.0.0.1:8000/api";

export const api = {
  get: async (endpoint, token = null) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
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

  patch: async (endpoint, data, token) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Erreur API");
  return response.json();
},

delete: async (endpoint, token) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Erreur API");
  return response.json();
},
};
