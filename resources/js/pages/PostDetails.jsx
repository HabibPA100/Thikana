import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppLayout from "../layouts/AppLayout";

const PostDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState([]);
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
                    ? `http://127.0.0.1:8000/storage/${user.profile_image}`
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
                ? `http://127.0.0.1:8000/storage/${post.cover_image}`
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
          <div className="border-top p-3 d-flex gap-2">

            <button className="btn btn-primary w-50 rounded-pill">
              📞 Contact Owner
            </button>

            <button className="btn btn-outline-secondary w-50 rounded-pill">
              ❤️ Save
            </button>

          </div>

        </div>

      </div>
    </AppLayout>
  );
};

export default PostDetails;