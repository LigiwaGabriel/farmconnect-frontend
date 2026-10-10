import { useEffect, useState } from "react";
import AlertMessage from "./AlertMessage";
import { useAuth } from "../context/AuthContext";
import { reviewService } from "../services/reviewService";
import { formatDate } from "../utils/formatDate";

function Stars({ value }) {
  return (
    <span className="text-warning" aria-label={`${value} out of 5`}>
      {"★".repeat(value)}
      <span className="text-muted">{"★".repeat(5 - value)}</span>
    </span>
  );
}

function ProductReviews({ productId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({ count: 0, average: 0 });
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function loadReviews() {
    try {
      const res = await reviewService.getReviews(productId);
      setReviews(res.data.reviews);
      setSummary(res.data.summary);
    } catch {
      setError("Unable to load reviews.");
    }
  }

  useEffect(() => {
    loadReviews();
  }, [productId]);

  async function handleSubmit(event) {
    event.preventDefault();
    setNotice("");
    setError("");

    if (rating === 0) {
      setError("Please choose a star rating.");
      return;
    }

    try {
      await reviewService.saveReview(productId, { rating, comment });
      setNotice("Thanks, your review was saved.");
      setComment("");
      setRating(0);
      loadReviews();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save review.");
    }
  }

  return (
    <div className="action-panel mt-4">
      <h2 className="h4">Ratings and reviews</h2>
      <p className="mb-3">
        {summary.count > 0
          ? <><strong>{summary.average}</strong> / 5 <Stars value={Math.round(summary.average)} /> ({summary.count} {summary.count === 1 ? "review" : "reviews"})</>
          : <span className="text-muted">No reviews yet.</span>}
      </p>

      <AlertMessage type="success" message={notice} />
      <AlertMessage type="danger" message={error} />

      {user?.role === "buyer" && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`btn btn-link fs-3 p-0 me-1 text-decoration-none ${star <= rating ? "text-warning" : "text-muted"}`}
                onClick={() => setRating(star)}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            className="form-control mb-2"
            placeholder="Write a review (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button className="btn btn-success" type="submit">Submit review</button>
        </form>
      )}

      {reviews.map((review) => (
        <div key={review.id} className="border-top pt-2 mt-2">
          <Stars value={review.rating} />
          <span className="ms-2 fw-semibold">{review.buyer_name}</span>
          <span className="ms-2 small text-muted">{formatDate(review.created_at)}</span>
          {review.comment && <p className="mb-1">{review.comment}</p>}
        </div>
      ))}
    </div>
  );
}

export default ProductReviews;