import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

const Home = () => {

  const [showContact, setShowContact] = useState(false);
  const [contactPost, setContactPost] = useState(null);
  const [request, setRequest] = useState([]);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/show-post");

      setRequest(res.data);
      setPosts(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDateBD = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const token = localStorage.getItem("token");

  const handleCreatePostClick = () => {

    if (!token) {     
      navigate("/login");
    } else {
      navigate("/create/post");
    }
  };

  const handleContact = (post) => {

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


  return (
    <AppLayout>
      <div className="container-fluid bg-light min-vh-100 py-3">
        <div className="row">

          {/* Left Sidebar */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="card shadow-sm border-0 mb-3">
              <div className="card-body">
                <h5 className="fw-bold mb-3">🏠 Rent Categories</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item border-0">Family House</li>
                  <li className="list-group-item border-0">Bachelor Room</li>
                  <li className="list-group-item border-0">Sublet</li>
                  <li className="list-group-item border-0">Office Space</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="col-lg-6">

            {/* <pre>{JSON.stringify(request, null, 2)}</pre> */}
            {/* Create Post */}
            <div 
                className="card shadow-sm border-0 mb-3"
                onClick={handleCreatePostClick}
                style={{ cursor: "pointer" }} 
                 >
              <div className="card-body d-flex align-items-center">
                <img
                  src="https://i.pravatar.cc/50"
                  className="rounded-circle me-2"
                  width="45"
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Post your rental..."
                />
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => {
              const user = post.user || {};
              const userName = user.name || "Unknown User";
              const profileImage = user.profile_image;

              return (
                <div key={post.id} className="card border-0 shadow-sm mb-4 rounded-4">

                  {/* Header */}
                  <div className="card-body pb-2">
                    <div className="d-flex justify-content-between align-items-center">

                      {/* User Info */}
                      <div className="d-flex align-items-center">
                        {profileImage ? (
                          <img
                            src={`http://127.0.0.1:8000/storage/${profileImage}`}
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

                      {/* Status */}
                      <span className="badge bg-success px-3 py-2 rounded-pill">
                        {post.status || "Available"}
                      </span>
                    </div>

                    {/* Title */}
                    <h5 className="fw-bold mt-3 mb-0">{post.title}</h5>
                  </div>

                  {/* Image */}
                  <img
                    src={
                      post.cover_image
                        ? `http://127.0.0.1:8000/storage/${post.cover_image}`
                        : "https://picsum.photos/600/350"
                    }
                    className="img-fluid"
                    style={{ maxHeight: "320px", objectFit: "cover" }}
                    alt={post.title}
                  />

                  {/* Content */}
                  <div className="card-body pt-3">

                    {/* Location */}
                    <div className="text-muted small mb-2 d-flex justify-content-between">
                      <span>বিভাগঃ {post.division}</span>
                      <span>জেলাঃ {post.district}</span>
                      <span>এলাকাঃ {post.area}</span>
                    </div>

                    {/* Address */}
                    <div className="text-muted small mb-2">
                      🏠 ঠিকানাঃ- {post.address}
                    </div>

                    {/* Price */}
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
                          display: "inline-block"
                        }}
                      >
                        {post.purpose === "sell" ? "For Sale" : "For Rent"}
                      </span>
                    </div>

                    {/* Optional attribute (example: rooms) */}
                    {/* {post.attribute_values?.map((attr) => (
                      <div key={attr.id} className="text-muted small mt-2">
                        🏷 {attr.attribute?.label}: {attr.value_text}
                      </div>
                    ))} */}

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

                      <button className="btn btn-success w-50 rounded-pill"  onClick={() => handleContact(post)} >
                        📞 Contact
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}

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

          {/* Right Sidebar */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h6 className="fw-bold">🔥 Featured Listings</h6>

                <div className="mt-3">
                  <h6 className="mb-0">Uttara Flat</h6>
                  <small className="text-muted">৳18,000/month</small>
                </div>

                <div className="mt-3">
                  <h6 className="mb-0">Bashundhara Studio</h6>
                  <small className="text-muted">৳10,000/month</small>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default Home;