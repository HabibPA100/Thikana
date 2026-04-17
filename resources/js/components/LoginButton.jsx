import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token) {
      navigate("/login");
    } else {
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  };

  return (
    <button onClick={handleClick} className="btn btn-outline-primary">
      Login
    </button>
  );
};

export default LoginButton;