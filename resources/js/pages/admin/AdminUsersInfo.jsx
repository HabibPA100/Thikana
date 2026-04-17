import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

const AdminUsersInfo = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/users/${id}/status`, { status });
      fetchUsers();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="card shadow">
        <div className="card-body">
          <h4 className="mb-3">All Users</h4>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">

              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>

                    <td>{index + 1}</td>

                    <td>
                      <img
                        src={`http://localhost:8000/storage/${user.profile_image}`}
                        alt="profile"
                        width="50"
                        height="50"
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                      />
                    </td>

                    <td>{user.name}</td>
                    <td>{user.user_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          user.status === "active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {user.status}
                      </span>

                      <select
                        className="form-select form-select-sm mt-2"
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

                    <td>
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminUsersInfo;