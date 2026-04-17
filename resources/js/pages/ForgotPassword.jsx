import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

   const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); // শুরুতে loading ON

        try {
            await axios.post("api/forgot-password", { email });

            alert("OTP sent to your email");
            navigate("/reset-password");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        } finally {
            setLoading(false); // success বা error যাই হোক loading OFF
        }

};

  return (
    <div className="container mt-5">
      <h3>Forgot Password</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="btn btn-primary" disabled={loading}>
            {loading ? (
                <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Sending...
                </>
            ) : (
                "Send OTP"
            )}
        </button>
      </form>
    </div>
  );
}
