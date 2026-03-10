import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

// Funções auxiliares para produtos
export const productsAPI = {
  getAll: () => api.get("/products"),
  getById: (id) => api.get(`/products/${id}`),
};

// Funções auxiliares para pedidos
export const ordersAPI = {
  create: (orderData) => api.post("/orders", orderData),
  getStats: () => api.get("/orders/stats"),
};