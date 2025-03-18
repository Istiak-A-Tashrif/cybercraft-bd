import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      deleteCookie("token");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    if (response.data.data.token) {
      setCookie("token", response.data.data.token);
      setCookie("userRole", response.data.data.role);
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    if (response.data.data.token) {
      setCookie("token", response.data.data.token);
      setCookie("userRole", response.data.data.role);
    }
    return response.data;
  },

  googleAuth: async (tokenId) => {
    const response = await api.post("/auth/google", { tokenId });
    if (response.data.data.token) {
      setCookie("token", response.data.data.token);
      setCookie("userRole", response.data.data.role);
    }
    return response.data;
  },

  facebookAuth: async (accessToken, userID) => {
    const response = await api.post("/auth/facebook", { accessToken, userID });
    if (response.data.data.token) {
      setCookie("token", response.data.data.token);
      setCookie("userRole", response.data.data.role);
    }
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  logout: async () => {
    deleteCookie("token");
    deleteCookie("userRole");
  },
};

export const contactService = {
  getCurrentUserContact: async () => {
    const response = await api.get("/contacts/me");
    return response.data;
  },

  createOrUpdateContact: async (contactData) => {
    const response = await api.post("/contacts", contactData);
    return response.data;
  },

  getAllContacts: async (
    page = 1,
    limit = 10,
    sort = "-createdAt",
    status = null
  ) => {
    const params = { page, limit, sort };
    if (status) params.status = status;

    const response = await api.get("/contacts", { params });
    return response.data;
  },

  getContact: async (id) => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },

  updateContact: async (id, updateData) => {
    const response = await api.put(`/contacts/${id}`, updateData);
    return response.data;
  },

  deleteContact: async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },

  deleteMultipleContacts: async (ids) => {
    const response = await api.delete("/contacts", { data: { ids } });
    return response.data;
  },

  downloadPDF: async (id) => {
    const response = await api.get(`/contacts/${id}/pdf`, {
      responseType: "blob",
    });
    return response.data;
  },

  downloadMultiplePDF: async (ids) => {
    const response = await api.post(
      "/contacts/pdf",
      { ids },
      {
        responseType: "blob",
      }
    );
    return response.data;
  },

  downloadExcel: async (ids = null) => {
    let url = "/contacts/excel";

    if (ids && ids.length > 0) {
      const idString = ids.join(",");
      url = `${url}?ids=${idString}`;
    }

    const response = await api.get(url, {
      responseType: "blob",
    });
    return response.data;
  },
};
