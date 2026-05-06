import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("api/login", form);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Login successful!");
    
    const role = res.data.user.role;

    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "tenant") {
      navigate("/tenant/dashboard");
    } else {
      navigate("/user/dashboard");
    }

  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Login failed");
  }
};

 return (
    <div className="container py-5 bg-light">

      {/* Login Section */}
      <div className="d-flex justify-content-center mb-5">
        <div className="col-md-4">

          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">

              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="m-0">Login</h3>

                <Link
                  to="/"
                  className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                >
                  🏠 Home
                </Link>
              </div>

              {/* Form */}
              <form onSubmit={submitForm}>

                <div className="mb-3">
                  <label className="form-label">
                    Email / Username / Phone
                  </label>

                  <input
                    type="text"
                    name="login"
                    className="form-control rounded-3"
                    placeholder="Enter email, username or phone"
                    value={form.login}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control rounded-3"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="text-center mb-3">
                  <small>
                    <Link
                      to="/forgot-password"
                      className="text-decoration-none"
                    >
                      Forgot Password?
                    </Link>
                  </small>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-3 fw-semibold"
                  >
                    Login
                  </button>
                </div>

              </form>

              {/* Footer */}
              <div className="text-center mt-4">
                <small>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-none fw-semibold"
                  >
                    Register
                  </Link>
                </small>
              </div>

            </div>
          </div>

        </div>
      </div>


      {/* 🎥 Tutorial Videos Section */}
      <div>
        <h4 className="text-center mb-4 fw-bold">
          📺 Tutorial Videos
        </h4>

        <div className="row g-4">

          <div className="col-12 col-md-6">
            <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm">
              <iframe
                src="https://www.youtube.com/embed/DK21F2qD_cw"
                title="Registration Tutorial"
                allowFullScreen
              ></iframe>
            </div>

            <p className="text-center mt-2 fw-semibold">
              📝 কিভাবে রেজিস্ট্রেশন করবেন ?
            </p>
          </div>

          <div className="col-12 col-md-6">
            <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm">
              <iframe
                src="https://www.youtube.com/embed/no_Oz6cquMA"
                title="Post Create Tutorial"
                allowFullScreen
              ></iframe>
            </div>

            <p className="text-center mt-2 fw-semibold">
              🏠 কিভাবে পোস্ট তৈরি করবেন ?
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}