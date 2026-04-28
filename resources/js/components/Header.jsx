import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchModal from "../pages/SearchModal";
import LoginButton from "./LoginButton";

function Header() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">

          <Link to="/" className="text-decoration-none">
            <img
              src="/frontend/favicon/favicon-96x96.png" 
              alt="Home"
              className="rounded-circle"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
          </Link>

          <div className="ms-auto d-flex gap-2">

            {/* 🔍 Search Button */}
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              🔍 Search
            </button>

            <LoginButton />

          </div>
        </div>
      </nav>

      {/* 🔥 Modal Call */}
      <SearchModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default Header;