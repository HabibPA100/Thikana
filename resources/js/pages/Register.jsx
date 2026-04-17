import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    profile_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("password", formData.password);

      // Profile image optional
      if (formData.profile_image) {
        data.append("profile_image", formData.profile_image);
      }

      // Use full URL for API
      await axios.post("https://habibpa.xyz/api/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(
            "🎉 আপনার রেজিস্ট্রেশন সফল হয়েছে!\n\n⚠️ সতর্কতা:\nএই প্ল্যাটফর্মটি শুধুমাত্র তথ্য শেয়ার করার জন্য।\nযেকোনো লেনদেনের আগে নিজ দায়িত্বে তথ্য যাচাই করুন।"
          );
                navigate("/login");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Register</h3>
      <form onSubmit={register}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="profile_image"
          className="form-control mb-3"
          onChange={handleChange}
          accept="image/*"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="terms"
            required
          />
          <label className="form-check-label" htmlFor="terms">
            আমি নিশ্চিত করছি যে আমি সঠিক তথ্য প্রদান করছি এবং প্ল্যাটফর্মের সকল নিয়ম ও শর্ত মেনে চলবো।
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;