import { useEffect, useState } from "react";
import { favoriteService } from "../services/favoriteService";

let favoriteIdsPromise = null;

function loadFavoriteIds() {
  if (!favoriteIdsPromise) {
    favoriteIdsPromise = favoriteService
      .getFavorites()
      .then((res) => new Set(res.data.favorites.map((f) => f.product_id)))
      .catch(() => {
        favoriteIdsPromise = null;
        return new Set();
      });
  }
  return favoriteIdsPromise;
}

function getRole() {
  try {
    return JSON.parse(localStorage.getItem("farmconnect_user") || "null")?.role;
  } catch {
    return null;
  }
}

function FavoriteButton({ productId }) {
  const isBuyer = getRole() === "buyer";
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isBuyer) return;
    loadFavoriteIds().then((ids) => setSaved(ids.has(productId)));
  }, [productId, isBuyer]);

  if (!isBuyer) return null;

  async function toggle() {
    setBusy(true);
    try {
      if (saved) {
        await favoriteService.removeFavorite(productId);
      } else {
        await favoriteService.addFavorite(productId);
      }
      setSaved(!saved);
      favoriteIdsPromise = null;
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      className={`btn ${saved ? "btn-danger" : "btn-outline-danger"}`}
      onClick={toggle}
      disabled={busy}
      title={saved ? "Remove from favorites" : "Save to favorites"}
    >
      {saved ? "♥" : "♡"}
    </button>
  );
}

export default FavoriteButton;