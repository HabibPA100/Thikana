// ContactForm.jsx

import React, { useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: "", msg: "" });

    try {
      await api.post("/messages", form);

      setAlert({
        type: "success",
        msg: "🎉 Message sent successfully! আমরা খুব দ্রুত আপনার সাথে যোগাযোগ করবো।",
      });

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setAlert({
        type: "danger",
        msg: "⚠️ Sorry! কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
    }

    setLoading(false);
  };

  return (
    <DashboardLayout>
        <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">

            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4 p-md-5">

                <h2 className="text-center mb-2 fw-bold">📩 Contact Us</h2>
                <p className="text-center text-muted mb-4">
                    আপনার মতামত, প্রশ্ন বা প্রজেক্ট আইডিয়া—সবকিছু আমাদের জানান। আমরা শুনতে প্রস্তুত।
                </p>

                {alert.msg && (
                    <div className={`alert alert-${alert.type} text-center`} role="alert">
                    {alert.msg}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
                        placeholder="e.g. John Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className="mb-3">
                    <label className="form-label">Your Message</label>
                    <textarea
                        name="message"
                        className="form-control"
                        rows="5"
                        placeholder="Write your message clearly... আমরা যত দ্রুত সম্ভব রিপ্লাই দিবো"
                        value={form.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                    </div>

                    <button
                    type="submit"
                    className="btn btn-primary w-100 btn-lg rounded-3"
                    disabled={loading}
                    >
                    {loading ? (
                        <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Sending Message...
                        </>
                    ) : (
                        "Send Message 🚀"
                    )}
                    </button>

                </form>

                <p className="text-center text-muted mt-4 small">
                    💡 Tip: পরিষ্কার ও বিস্তারিত মেসেজ দিলে আমরা দ্রুত এবং ভালোভাবে সাহায্য করতে পারি।
                </p>

                </div>
            </div>

            </div>
        </div>
        </div>
    </DashboardLayout>
  );
}