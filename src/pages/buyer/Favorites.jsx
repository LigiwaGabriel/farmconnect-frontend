import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { favoriteService } from "../../services/favoriteService";
import { formatCurrency } from "../../utils/formatCurrency";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadFavorites() {
    try {
      const res = await favoriteService.getFavorites();
      setFavorites(res.data.favorites);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load favorites.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  async function handleRemove(productId) {
    await favoriteService.removeFavorite(productId);
    setFavorites((current) => current.filter((f) => f.product_id !== productId));
  }

  return (
    <>
      <h1 className="section-title">Favorites</h1>
      <div className="action-panel">
        {loading && <p className="mb-0">Loading...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && favorites.length === 0 && (
          <p className="text-muted mb-0">No favorites saved yet. Tap the heart on a product to save it.</p>
        )}
        {favorites.length > 0 && (
          <ul className="list-group">
            {favorites.map((f) => (
              <li key={f.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <Link to={`/products/${f.product_id}`}>{f.product_name}</Link>
                  <div className="small text-muted">
                    {formatCurrency(f.price_per_unit)} / {f.unit} · {f.district}
                  </div>
                </div>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(f.product_id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Favorites;