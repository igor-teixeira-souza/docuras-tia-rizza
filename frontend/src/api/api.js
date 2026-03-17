import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

export const productsAPI = {
  getAll: () => api.get("/products"),
  getById: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post("/products", productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
};

export const ordersAPI = {
  create: (orderData) => api.post("/orders", orderData),
  getStats: () => api.get("/orders/stats"),
  getAll: () => api.get("/orders"),  // se houver endpoint para listar todos
};