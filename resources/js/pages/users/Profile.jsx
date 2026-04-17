import React, { useState, useEffect } from "react";
import api from "../../api/axios";

import DashboardLayout from "../../layouts/DashboardLayout";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    user_name: "",
    phone: "",
    status: "",
    email: "",
    profile_image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // FETCH PROFILE
  // -------------------------
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await api.get("/profile");
      const data = res.data.user;

      const safeUser = {
        name: data?.name || "",
        user_name: data?.user_name || "",
        phone: data?.phone || "",
        status: data?.status || "",
        email: data?.email || "",
        profile_image: data?.profile_image || "",
      };

      setUser(safeUser);

      if (safeUser.profile_image) {
        setImagePreview(
          safeUser.profile_image.startsWith("http")
            ? safeUser.profile_image
            : `https://habibpa.xyz/storage/${safeUser.profile_image}`
        );
      } else {
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Profile fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // -------------------------
  // INPUT CHANGE
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -------------------------
  // IMAGE CHANGE
  // -------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUser((prev) => ({
        ...prev,
        profile_image: file,
      }));

      setImagePreview(URL.createObjectURL(file));
    }
  };

  // -------------------------
  // EDIT BUTTON (FIXED)
  // -------------------------
  const handleEdit = (e) => {
    e.preventDefault(); // 🔥 IMPORTANT: stop form submit
    setIsEditing(true);
  };

  // -------------------------
  // CANCEL
  // -------------------------
  const handleCancel = (e) => {
    e.preventDefault();

    setIsEditing(false);
    fetchProfile();
  };

  // -------------------------
  // SUBMIT UPDATE
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 SAFETY CHECK
    if (!isEditing) return;

    try {
      const formData = new FormData();

      formData.append("name", user.name);
      formData.append("user_name", user.user_name);
      formData.append("phone", user.phone);
      formData.append("status", user.status);
      formData.append("email", user.email);

      if (user.profile_image && typeof user.profile_image !== "string") {
        formData.append("profile_image", user.profile_image);
      }

      const res = await api.post("/update-profile", formData);

      alert("Profile updated successfully!");

      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error("Update failed:", error.response || error);
      alert("Profile update failed!");
    }
  };

  // -------------------------
  // LOADING
  // -------------------------
  if (loading) {
    return <div className="container my-5">Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="container my-5">
        <h2 className="mb-4">User Profile</h2>

        {/* 🔥 IMPORTANT: form safety control */}
        <form onSubmit={handleSubmit} autoComplete="off">

          <div className="row mb-3">

            {/* IMAGE */}
            <div className="col-md-4 text-center">
              <img
                src={imagePreview || "/default-profile.png"}
                alt="Profile"
                className="img-fluid rounded-circle mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />

              {isEditing && (
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              )}
            </div>

            {/* FORM */}
            <div className="col-md-8">

              <div className="mb-3">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={user.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label>Username</label>
                <input
                  type="text"
                  name="user_name"
                  className="form-control"
                  value={user.user_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={user.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={user.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  className="form-control"
                  value={user.status}
                  onChange={handleChange}
                  disabled={!isEditing}
                  readOnly
                />
              </div>

              {/* BUTTONS */}
              <div className="d-flex gap-2">

                {!isEditing ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button type="submit" className="btn btn-success">
                      Save Changes
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                )}

              </div>

            </div>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;