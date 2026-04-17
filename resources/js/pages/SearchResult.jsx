import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropertyCard from "../pages/PropertyCard";
import AppLayout from "../layouts/AppLayout";

function SearchResult() {

  const navigate = useNavigate();
  const location = useLocation();
  const properties = location.state?.properties || [];

  const [showContact, setShowContact] = useState(false);
  const [contactPost, setContactPost] = useState(null);


  const token = localStorage.getItem("token");

  const handleContact = (post) => {
    
    if (!token) {
      navigate("/login");
      return;
    }

    setContactPost(post);
    setShowContact(true);
  };

  const maskPhone = (phone) => {
    return phone?.slice(0, 5) + "*****";
  };

  return (
    <AppLayout>
      {/* <pre>{JSON.stringify(request, null, 2)}</pre> */}
      <div className="container mt-4" style={{ maxWidth: "720px" }}>
        <h4 className="mb-3">🔍 Search Results</h4>

        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          properties.map((post) => (
            <PropertyCard
              key={post.id}
              post={post}
              handleContact={handleContact}
            />
          ))
        )}

        {/* 🔥 Contact Modal */}
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

                  <h6 className="text-muted">
                    📞 {maskPhone(contactPost?.contact_phone)}
                  </h6>

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
}

export default SearchResult;