import React from "react";
import { useNavigate } from "react-router-dom";

function PropertyCard({ post, handleContact }) {

  const navigate = useNavigate();

  const user = post.user || {};
  const userName = user.name || "Unknown User";
  const profileImage = user.profile_image;

  const formatDateBD = (date) => {
    return new Date(date).toLocaleDateString("bn-BD");
  };

  return (
    <div className="card border-0 shadow-sm mb-4 rounded-4">

      {/* Header */}
      <div className="card-body pb-2">
        <div className="d-flex justify-content-between align-items-center">

          <div className="d-flex align-items-center">
            {profileImage ? (
              <img
                src={`${import.meta.env.VITE_API_BASE}/storage/${profileImage}`}
                className="rounded-circle me-2"
                width="45"
                height="45"
                alt={userName}
              />
            ) : (
              <div
                className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2"
                style={{ width: 45, height: 45 }}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h6 className="mb-0 fw-semibold">{userName}</h6>
              <small className="text-muted">
                {formatDateBD(post.created_at)}
              </small>
            </div>
          </div>

          <span className="badge bg-success px-3 py-2 rounded-pill">
            {post.status || "Available"}
          </span>
        </div>

        <h5 className="fw-bold mt-3 mb-0">{post.title}</h5>
      </div>

      {/* Image */}
      <img
        src={
          post.cover_image
            ? `${import.meta.env.VITE_API_BASE}/storage/${post.cover_image}`
            : "https://picsum.photos/600/350"
        }
        className="img-fluid"
        style={{ maxHeight: "320px", objectFit: "cover" }}
        alt={post.title}
      />

      {/* Body */}
      <div className="card-body pt-3">

        <div className="text-muted small mb-2 d-flex justify-content-between">
          <span>বিভাগঃ {post.division}</span>
          <span>জেলাঃ {post.district}</span>
          <span>এলাকাঃ {post.area}</span>
        </div>

        <div className="text-muted small mb-2">
          🏠 ঠিকানাঃ- {post.address}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <h6 className="fw-bold text-success mb-0">
            💰 ৳ {post.sell_price || post.rent_amount}{" "}
            {post.purpose === "sell" ? "/ বিক্রয় মূল্য" : "/ মাসিক ভাড়া"}
          </h6>

          <span
            className="small px-3 py-1 rounded-pill fw-semibold"
            style={{
              backgroundColor: post.purpose === "sell" ? "#ffe5e5" : "#e0f3ff",
              color: post.purpose === "sell" ? "#d11a2a" : "#0077b6",
            }}
          >
            {post.purpose === "sell" ? "For Sale" : "For Rent"}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-top p-2">
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary w-50 rounded-pill"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            🔍 Details
          </button>

          <button
            className="btn btn-success w-50 rounded-pill"
            onClick={() => handleContact(post)}
          >
            📞 Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;