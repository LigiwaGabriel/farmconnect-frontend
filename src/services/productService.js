import api from "./api";

export const productService = {
  getProducts: (params) => api.get("/products", { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  getMyProducts: () => api.get("/products/farmer/my-products"),
  createProduct: (data) => api.post("/products", data, { headers: { "Content-Type": "multipart/form-data" } }),
  updateProduct: (id, data) => api.put(`/products/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } }),
  deleteProduct: (id) => api.delete(`/products/${id}`)
};
