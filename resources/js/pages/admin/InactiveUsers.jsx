import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

const InactiveUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInactiveUsers();
  }, []);

  const fetchInactiveUsers = async () => {
    try {
      const res = await api.get("/admin/inactive-users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/users/${id}/status`, { status });
      fetchInactiveUsers();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-success",
      inactive: "bg-warning text-dark",
      suspended: "bg-danger",
    };
    return styles[status] || "bg-secondary";
  };

  return (
    <AdminDashboardLayout>
      <div className="container py-4">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold text-primary">
            👤 Inactive Users Management
          </h4>
          <span className="badge bg-dark fs-6">
            Total: {users.length}
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" />
            <p className="mt-2 text-muted">Loading users...</p>
          </div>
        ) : (
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body">

              <div className="table-responsive">
                <table className="table align-middle table-hover">
                  
                  <thead className="table-dark text-center">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Created</th>
                    </tr>
                  </thead>

                  <tbody className="text-center">
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>

                          <td className="fw-semibold">
                            {user.name}
                          </td>

                          <td>@{user.user_name}</td>

                          <td className="text-muted">
                            {user.email}
                          </td>

                          <td>{user.phone}</td>

                          <td>
                            <span className="badge bg-info text-dark px-3 py-2">
                              {user.role}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`badge px-3 py-2 ${getStatusBadge(
                                user.status
                              )}`}
                            >
                              {user.status}
                            </span>

                            <select
                              className="form-select form-select-sm mt-2 shadow-sm"
                              value={user.status}
                              onChange={(e) =>
                                updateStatus(user.id, e.target.value)
                              }
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="suspended">Suspended</option>
                            </select>
                          </td>

                          <td className="text-muted small">
                            {new Date(user.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">
                          <div className="py-5">
                            <h6 className="text-muted">
                              🚫 No inactive users found
                            </h6>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>

            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default InactiveUsers;