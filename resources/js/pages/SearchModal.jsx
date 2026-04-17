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
        "http://localhost:8000/api/search",
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
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">🔍 Search Property</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body">

            <div className="row g-3">

              <div className="col-md-6">
                <input name="keyword" placeholder="Keyword" className="form-control" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <input name="division" placeholder="Division" className="form-control" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <input name="district" placeholder="District" className="form-control" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <input name="area" placeholder="Area" className="form-control" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <input name="min_price" placeholder="Min Price" className="form-control" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <input name="max_price" placeholder="Max Price" className="form-control" onChange={handleChange} />
              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>

            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SearchModal;