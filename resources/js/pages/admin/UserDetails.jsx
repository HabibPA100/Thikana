import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const res = await api.get(`/admin/users/${id}/details`);
      setUser(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  return (
    <AdminDashboardLayout>
        <div className="container mt-4 d-flex justify-content-center">
        <div className="card shadow-sm" style={{ width: "500px" }}>
            
            {/* Header */}
            <div className="card-header bg-white d-flex align-items-center">
            <img
                src={
                  user.profile_image && user.profile_image !== "null"
                    ? `${import.meta.env.VITE_API_BASE}/storage/${user.profile_image}`
                    : "https://i.pravatar.cc/150?img=3"
                }
                alt="profile"
                className="rounded-circle me-3"
                width="50"
                height="50"
              />
            <div>
                <h6 className="mb-0">{user.name}</h6>
                <small className="text-muted">{user.user_name}</small>
            </div>
            </div>

            {/* Body */}
            <div className="card-body">
            <p className="mb-2">
                📧 <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-2">
                📱 <strong>Phone:</strong> {user.phone}
            </p>
            <p className="mb-2">
                👤 <strong>Role:</strong> {user.role}
            </p>
            <p className="mb-2">
                ⚡ <strong>Status:</strong>{" "}
                <span
                className={`badge ${
                    user.status === "active"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
                >
                {user.status}
                </span>
            </p>
            </div>

            {/* Footer */}
            <div className="card-footer bg-white text-muted small">
            Joined: {new Date(user.created_at).toLocaleString()}
            </div>
        </div>
        </div>
    </AdminDashboardLayout>
  );
};

export default UserDetails;