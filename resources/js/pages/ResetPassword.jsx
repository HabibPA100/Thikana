import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        otp: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        await axios.post("api/reset-password", form);
        alert("Password reset successful");
        navigate("/login");
        } catch (err) {
        alert(err.response?.data?.message || "Error");
        }
  };

  return (
    <div className="container mt-5">
      <h3>Reset Password</h3>
       
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          onChange={handleChange}
        />
        <label htmlFor="otp"> আপনার email এ একটি ৬ সংখ্যা otp পাঠানো হয়েছে সেটি এখানে বসান </label>
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="New Password"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <button className="btn btn-success">Reset Password</button>
      </form>
    </div>
  );
}