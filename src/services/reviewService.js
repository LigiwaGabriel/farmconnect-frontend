import api from "./api";

export const reviewService = {
  getReviews: (productId) => api.get(`/reviews/product/${productId}`),
  saveReview: (productId, data) => api.post(`/reviews/product/${productId}`, data)
};