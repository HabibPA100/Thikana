import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link  } from "react-router-dom";
import axios from "axios";
import AppLayout from "../layouts/AppLayout";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState([]);
  const [showContact, setShowContact] = useState(false);
  const [contactPost, setContactPost] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/post/${id}`);
      // console.log(JSON);
      setRequest(res.data);
      setPost(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleContact = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setContactPost(post);
    setShowContact(true);
  };

  const maskPhone = (phone) => {
    if (!phone) return "";
    
    const visible = phone.slice(0, -4);
    return visible + "****";
  };

  const handleShare = async () => {
    if (!post) return; // 🔥 guard

    const shareUrl = `${window.location.origin}/share/post/${post.id}`;

    const shareData = {
      title: post.title,
      text: post.description || "Check this property",
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied!");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  if (!post) {
    return (
      <AppLayout>
        <div className="container mt-4 text-center text-muted">
          Loading post...
        </div>
      </AppLayout>
    );
  }

  const user = post.user || {};

  return (
    <AppLayout>
      <div className="container mt-4" style={{ maxWidth: "720px" }}>

        {/* <pre> {JSON.stringify(request, null, 2)} </pre> */}

        {/* MAIN CARD */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

          {/* HEADER */}
          <div className="card-body d-flex justify-content-between align-items-center">

            <div className="d-flex align-items-center">
              <img
                src={
                  user.profile_image
                    ? `${import.meta.env.VITE_API_BASE}/storage/${user.profile_image}`
                    : "https://i.pravatar.cc/100"
                }
                className="rounded-circle me-2"
                width="45"
                height="45"
                alt={user.name}
              />

              <div>
                <h6 className="mb-0 fw-semibold">{user.name}</h6>
                <small className="text-muted">
                  {new Date(post.created_at).toLocaleDateString()}
                </small>
              </div>
            </div>

            <span className="badge bg-success px-3 py-2 rounded-pill">
              {post.status || "Active"}
            </span>
          </div>

          {/* TITLE */}
          <div className="px-3 pb-2">
            <h5 className="fw-bold mb-0">{post.title}</h5>
          </div>
          {/* <div className="px-3 pb-2">
            <p className="mb-0"> বাসায় উঠতে পারবেন = {post.available_from ?? "Any Time"}</p>
          </div> */}

          {/* IMAGE */}
          <img
            src={
              post.cover_image
                ? `${import.meta.env.VITE_API_BASE}/storage/${post.cover_image}`
                : "https://picsum.photos/800/500"
            }
            className="img-fluid"
            style={{ maxHeight: "420px", objectFit: "cover" }}
            alt={post.title}
          />

           {/* Description */}
          <div className="px-3 pb-2 my-2">
            <p className="fw-bold mb-0">{post.description ?? ""}</p>
          </div>

          {/* CONTENT */}
          <div className="card-body">

            {/* PRICE + TYPE */}
            <div className="d-flex justify-content-between align-items-center mb-3">

              <h6 className="fw-bold text-success mb-0">
                💰 ৳ {post.sell_price || post.rent_amount}{" "}
                {post.purpose === "sell" ? "বিক্রয় মূল্য" : "মাসিক ভাড়া"}
              </h6>

              <span
                className={`px-3 py-1 rounded-pill small fw-semibold ${
                  post.purpose === "sell"
                    ? "bg-danger text-white"
                    : "bg-primary text-white"
                }`}
              >
                {post.purpose === "sell" ? "For Sale" : "For Rent"}
              </span>

            </div>

            {/* LOCATION */}
            <div className="text-muted small mb-2 d-flex justify-content-between">
              <span>বিভাগঃ {post.division}</span>
              <span>জেলাঃ {post.district}</span>
              <span>এলাকাঃ {post.area}</span>
            </div>

            {/* Address */}
            <div className="text-muted small mb-2">
              🏠 ঠিকানাঃ- {post.address}
            </div>

            {/* DYNAMIC ATTRIBUTES */}
            {post.attribute_values?.length > 0 && (
              <div className="row g-2">

                {post.attribute_values.map((attr) => (
                  <div key={attr.id} className="col-6">

                    <div className="p-2 bg-light rounded-3 small">

                      <div className="text-muted">
                        {attr.attribute?.label || attr.attribute?.name}
                      </div>

                      <div className="fw-semibold text-dark">
                        {attr.value_text ||
                          attr.value_number ||
                          (attr.value_boolean !== null
                            ? attr.value_boolean.toString()
                            : null) ||
                          attr.value_date ||
                          "N/A"}
                      </div>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

          {/* FOOTER */}
          <div className="border-top p-3">
            <div className="d-flex flex-wrap gap-2">

              <button
                className="btn btn-primary flex-fill rounded-pill d-flex align-items-center justify-content-center gap-2"
                onClick={() => handleContact(post)}
              >
                📞 <span>Contact Owner</span>
              </button>

              <button
                className="btn btn-success flex-fill rounded-pill d-flex align-items-center justify-content-center gap-2"
                onClick={handleShare}
                disabled={!post}
              >
                🔗 <span>Share</span>
              </button>

              <Link
                to="/"
                className="btn btn-outline-secondary flex-fill rounded-pill d-flex align-items-center justify-content-center gap-2 shadow-sm"
              >
                ⬅️ <span>Go Back</span>
              </Link>

            </div>
          </div>

        </div>

        {showContact && (
            <div className="modal fade show d-block">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4 border-0 shadow">

                  <div className="modal-header">
                    <h5 className="modal-title">📞 Contact Information</h5>
                    <button 
                      className="btn-close"
                      onClick={() => setShowContact(false)}
                    ></button>
                  </div>

                  <div className="modal-body text-center">

                    <h5 className="fw-bold">
                      {contactPost?.contact_name}
                    </h5>

                   <div className="text-center mb-3">
                      <h6 className="text-muted">
                        📞 {maskPhone(contactPost?.contact_phone)}
                      </h6>
                    </div>

                    <a 
                      href={`tel:${contactPost?.contact_phone}`}
                      className="btn btn-success w-100 mt-3 rounded-pill"
                    >
                      📞 Call Now
                    </a>

                  </div>

                  <div className="modal-footer">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => setShowContact(false)}
                    >
                      Close
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}
      </div>
    </AppLayout>
  );
};

export default PostDetails;