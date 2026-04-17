import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

const DashboardHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(""); // state for user name
  const navigate = useNavigate();

  // Load user name from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem("user"); // assuming you saved JSON string
    if (user) {
      try {
        const parsedUser = JSON.parse(user); 
        setUserName(parsedUser.name || parsedUser.username || "User"); // adjust based on backend
      } catch (error) {
        console.error("Failed to parse user:", error);
        setUserName("User");
      }
    }
  }, []);

  // Logout handler
  const handleLogout = async (e) => {
    e.preventDefault(); // page reload আটকাবে
    await logoutUser(); // service function call
    navigate("/login"); // redirect
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        {/* Logo / Brand */}
        <Link className="navbar-brand fw-bold" to="/user/dashboard">
          My Dashboard
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dashboardNavbar"
          aria-controls="dashboardNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="dashboardNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/terms">
                Terms & Conditions
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/why/upgrade-plan">
                Why Upgrade Plan ?
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/user/contact">
                Contact US
              </Link>
            </li>
          </ul>

          {/* User Dropdown */}
          <div className="dropdown ms-auto">
            <button
              className="btn btn-outline-light dropdown-toggle"
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {userName || "User"}
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-end ${
                isDropdownOpen ? "show" : ""
              }`}
            >
              <li>
                <Link className="dropdown-item" to="/user/profile">
                  Profile
                </Link>
              </li>
              <li>
                {/* Logout with onClick */}
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;