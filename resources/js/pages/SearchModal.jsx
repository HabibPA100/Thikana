import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchModal({ show, onClose }) {

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        "api/search",
        { params: filters }
      );

      onClose(); // modal close

      navigate("/search-result", {
        state: { properties: res.data.data },
      });

    } catch (error) {
      console.error(error);
    }
  };

  if (!show) return null;

  return (
   <div
      className="modal d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
    >
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">

        {/* Header */}
        <div className="modal-header border-0 text-white"
          style={{
            background: "linear-gradient(135deg, #4facfe, #00f2fe)"
          }}
        >
          <h5 className="modal-title fw-semibold">
            🔍 Smart Property Search
          </h5>
          <button
            className="btn-close btn-close-white"
            onClick={onClose}
          ></button>
        </div>

        {/* Body */}
        <div className="modal-body p-4">

          {/* Keyword */}
          <div className="mb-4">
            <label className="form-label text-muted small">Keyword</label>
            <input
              name="keyword"
              placeholder="e.g. Apartment, Flat..."
              className="form-control rounded-3 shadow-sm"
              onChange={handleChange}
            />
          </div>

          <div className="row g-3">

            {/* Location */}
            <div className="col-md-6">
              <label className="form-label text-muted small">Division</label>
              <input
                name="division"
                placeholder="🏙️ Division"
                className="form-control rounded-3 shadow-sm"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-muted small">District</label>
              <input
                name="district"
                placeholder="📍 District"
                className="form-control rounded-3 shadow-sm"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-muted small">Area</label>
              <input
                name="area"
                placeholder="📌 Area"
                className="form-control rounded-3 shadow-sm"
                onChange={handleChange}
              />
            </div>

            {/* Price */}
            <div className="col-md-3">
              <label className="form-label text-muted small">Min Price</label>
              <input
                name="min_price"
                placeholder="৳ Min"
                className="form-control rounded-3 shadow-sm"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label text-muted small">Max Price</label>
              <input
                name="max_price"
                placeholder="৳ Max"
                className="form-control rounded-3 shadow-sm"
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer border-0 p-3">

          <button
            className="btn btn-light border rounded-3 px-4"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn text-white rounded-3 px-4 fw-semibold"
            style={{
              background: "linear-gradient(135deg, #4facfe, #00f2fe)",
              border: "none"
            }}
            onClick={handleSearch}
          >
            🔎 Search Now
          </button>

        </div>

      </div>
    </div>
  </div>
  );
}

export default SearchModal;