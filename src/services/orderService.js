import api from "./api";

export const orderService = {
  createOrder: (data) => api.post("/orders", data),
  getMyOrders: () => api.get("/orders/my-orders"),
  getFarmerOrders: () => api.get("/orders/farmer"),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status })
};
