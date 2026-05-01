import React, { useRef , useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

const Home = () => {

   const [filters, setFilters] = useState({
      keyword: "",
      category_id: "",
      sub_category_id: "",
      division: "",
      district: "",
      area: "",
      min_price: "",
      max_price: "",
    });

  const [showContact, setShowContact] = useState(false);
  const [contactPost, setContactPost] = useState(null);
  const [request, setRequest] = useState([]);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null);

  // ✅ initial load = all posts
  useEffect(() => {
    fetchFilteredPosts(1);
  }, []);

  // ✅ auto filter (debounce)
  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchFilteredPosts(1);
    }, 500);

    return () => clearTimeout(delay);
  }, [filters]);

  const fetchFilteredPosts = async (pageNumber = 1, customFilters = filters) => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await axios.get("/api/search", {
        params: {
          ...customFilters,
          page: pageNumber,
        },
      });

      const newPosts = res.data.data;

      if (pageNumber === 1) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }

      setHasMore(res.data.next_page_url !== null);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchFilteredPosts(nextPage);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [page, hasMore, loading]);


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
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              
              {/* Header */}
              <div className="bg-primary text-white p-3 fw-semibold">
                🔍 Filter Properties
              </div>

              <div className="card-body p-4">

                {/* Location Section */}
                <h6 className="text-muted mb-3">Location</h6>

                <input
                  type="text"
                  placeholder="🏙️ Division"
                  className="form-control mb-3 rounded-3 shadow-sm"
                  value={filters.division}
                  onChange={(e) =>
                    setFilters({ ...filters, division: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="📍 District"
                  className="form-control mb-3 rounded-3 shadow-sm"
                  value={filters.district}
                  onChange={(e) =>
                    setFilters({ ...filters, district: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="📌 Area"
                  className="form-control mb-4 rounded-3 shadow-sm"
                  value={filters.area}
                  onChange={(e) =>
                    setFilters({ ...filters, area: e.target.value })
                  }
                />

                {/* Price Section */}
                <h6 className="text-muted mb-3">Price Range</h6>

                <div className="d-flex gap-2 mb-4">
                  <input
                    type="number"
                    placeholder="Min ৳"
                    className="form-control rounded-3 shadow-sm"
                    value={filters.min_price}
                    onChange={(e) =>
                      setFilters({ ...filters, min_price: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Max ৳"
                    className="form-control rounded-3 shadow-sm"
                    value={filters.max_price}
                    onChange={(e) =>
                      setFilters({ ...filters, max_price: e.target.value })
                    }
                  />
                </div>

                {/* Purpose */}
                <h6 className="text-muted mb-3">Purpose</h6>

                <select
                  className="form-select mb-4 rounded-3 shadow-sm"
                  value={filters.purpose}
                  onChange={(e) =>
                    setFilters({ ...filters, purpose: e.target.value })
                  }
                >
                  <option value="">Select Purpose</option>
                  <option value="rent">🏠 For Rent</option>
                  <option value="sell">💰 For Sale</option>
                  <option value="wanted">🔍 Wanted</option>
                </select>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary w-100 rounded-3 fw-semibold"
                    onClick={() => fetchFilteredPosts(filters)}
                  >
                    Apply
                  </button>

                  <button
                    className="btn btn-light border w-100 rounded-3 fw-semibold"
                    onClick={() => {
                      const reset = {
                        keyword: "",
                        category_id: "",
                        sub_category_id: "",
                        division: "",
                        district: "",
                        area: "",
                        min_price: "",
                        max_price: "",
                      };
                      setFilters(reset);
                      fetchFilteredPosts(reset);
                    }}
                  >
                    Reset
                  </button>
                </div>

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
                  src="/frontend/camera.jpg"
                  className="rounded-circle me-2"
                  width="45"
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Post your prope..."
                />
              </div>
            </div>

            {/* Posts */}
            {posts?.map((post) => {
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

                      {/* Status */}
                      <span className="badge bg-success px-3 py-2 rounded-pill">
                        {post.status || "Available"}
                      </span>
                    </div>

                    {/* Title */}
                    <h5 className="fw-bold mt-3 mb-0">{post.title}</h5>
                  </div>

                  {/* Image */}
                 {post?.cover_image && (
                    <img
                      src={`${import.meta.env.VITE_API_BASE}/storage/${post.cover_image}`}
                      className="img-fluid"
                      style={{ maxHeight: "320px", objectFit: "cover" }}
                      alt={post?.title}
                    />
                  )}

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
                        💰 ৳ {
                          post.purpose === "sell"
                            ? post.sell_price
                            : post.purpose === "rent"
                            ? post.rent_amount
                            : post.expected_budget
                        }{" "}
                        {
                          post.purpose === "sell"
                            ? "/ বিক্রয় মূল্য"
                            : post.purpose === "rent"
                            ? "/ মাসিক ভাড়া"
                            : "/ বাজেট"
                        }
                      </h6>

                      <span
                        className="small px-3 py-1 rounded-pill fw-semibold"
                        style={{
                          backgroundColor:
                            post.purpose === "sell"
                              ? "#ffe5e5"
                              : post.purpose === "rent"
                              ? "#e0f3ff"
                              : "#e6ffe6",
                          color:
                            post.purpose === "sell"
                              ? "#d11a2a"
                              : post.purpose === "rent"
                              ? "#0077b6"
                              : "#2d6a4f",
                          display: "inline-block"
                        }}
                      >
                        {
                          post.purpose === "sell"
                            ? "For Sale"
                            : post.purpose === "rent"
                            ? "For Rent"
                            : "Wanted/খুজছেন"
                        }
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
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

              {/* Header */}
              <div
                className="text-white fw-semibold p-3"
                style={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)"
                }}
              >
                📊 Explore
              </div>

              <div className="card-body p-3">

                {/* Featured Listings */}
                <h6 className="fw-bold mb-3">🔥 Featured Listings</h6>

                {posts?.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/post/${item.id}`)}
                    className="d-flex gap-2 mb-3 align-items-center sidebar-item"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={
                        item.cover_image
                          ? `${import.meta.env.VITE_API_BASE}/storage/${item.cover_image}`
                          : "https://picsum.photos/100"
                      }
                      className="rounded-3"
                      style={{
                        width: 70,
                        height: 70,
                        objectFit: "cover"
                      }}
                    />

                    <div className="flex-grow-1">
                      <h6 className="mb-1 small fw-semibold text-dark">
                        {item.title.length > 40
                          ? item.title.slice(0, 40) + "..."
                          : item.title}
                      </h6>
                      <small className="text-primary fw-semibold">
                        ৳ {item.rent_amount || item.sell_price || item.expected_budget}
                      </small>
                    </div>
                  </div>
                ))}

                {/* Divider */}
                <hr className="my-3" />

                {/* Quick Actions */}
                <h6 className="fw-bold mb-3">⚡ Quick Actions</h6>

                <button
                  className="btn w-100 text-white fw-semibold rounded-3 mb-2"
                  style={{
                    background: "linear-gradient(135deg, #43e97b, #38f9d7)",
                    border: "none"
                  }}
                  onClick={handleCreatePostClick}
                >
                  ➕ Post Property
                </button>

                {/* <button
                  className="btn btn-light border w-100 rounded-3 fw-semibold"
                >
                  ❤️ Saved Listings
                </button> */}

                {/* Divider */}
                <hr className="my-3" />

                {/* Popular Areas */}
                <h6 className="fw-bold mb-3">📍 Popular Areas</h6>

                <div className="d-flex flex-wrap gap-2">
                  {["Uttara", "Mirpur", "Dhanmondi", "Bashundhara","Gopalganj"].map((area) => (
                    <span
                      key={area}
                      className="badge rounded-pill bg-light text-dark border px-3 py-2 area-chip"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const updated = { ...filters, area };
                        setFilters(updated);
                        fetchFilteredPosts(updated);
                      }}
                    >
                      📌 {area}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          </div>
  
          {loading && (
            <div className="text-center my-3">
              <span className="spinner-border"></span>
            </div>
          )}
          <div ref={observerRef}></div>

        </div>
      </div>
    </AppLayout>
  );
};

export default Home;