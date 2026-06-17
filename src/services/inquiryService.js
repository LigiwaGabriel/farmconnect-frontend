import api from "./api";

export const inquiryService = {
  createInquiry: (data) => api.post("/inquiries", data),
  getMyInquiries: () => api.get("/inquiries/my-inquiries"),
  getFarmerInquiries: () => api.get("/inquiries/farmer"),
  updateStatus: (id, status) => api.put(`/inquiries/${id}/status`, { status })
};
