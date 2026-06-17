import api from "./api";

export const adminService = {
  getStats: () => api.get("/admin/stats"),
  getUsers: () => api.get("/admin/users"),
  getProducts: () => api.get("/admin/products"),
  getOrders: () => api.get("/admin/orders"),
  updateUserStatus: (id, status) => api.put(`/admin/users/${id}/status`, { status }),
  getCategories: () => api.get("/categories"),
  createCategory: (data) => api.post("/categories", data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data)
};
