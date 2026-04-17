import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

function AdminProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const res = await api.get("/admin/properties");
    setProperties(res.data);
  };

  const handleStatusChange = async (id, status) => {
    await api.put(`/admin/properties/${id}/status`, { status });
    fetchProperties();
  };

  const getStatusBadge = (status) => {
    if (status === "Active") return "success";
    if (status === "Rented") return "warning";
    if (status === "Rejected") return "danger";
    return "secondary";
  };

  return (
    <AdminDashboardLayout>
      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">🏠 Property List</h4>
          <span className="badge bg-dark px-3 py-2">
            {/* Total: {properties.length} */}
          </span>
        </div>

        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-0">

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">

                <thead className="table-dark text-center">
                  <tr>
                    <th>#</th>
                    <th>Property</th>
                    <th>User</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {properties.map((p, index) => (
                    <tr key={p.id} className="align-middle">

                      <td className="fw-bold text-muted">
                        {index + 1}
                      </td>

                      {/* Title with highlight */}
                      <td>
                        <div className="fw-semibold">{p.title}</div>
                        <small className="text-muted">ID: {p.id}</small>
                      </td>

                      {/* User */}
                      <td>
                        <span className="badge bg-info-subtle text-dark px-3 py-2">
                          {p.user?.name}
                        </span>
                      </td>

                      {/* Location */}
                      <td>
                        <span className="text-muted small d-block">
                          {p.district}
                        </span>
                        <span className="fw-semibold">
                          {p.area}
                        </span>
                      </td>

                      {/* Price */}
                      <td>
                        <span className="badge bg-success-subtle text-success fs-6 px-3 py-2">
                          ৳ {p.sell_price || p.rent_amount}
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`badge bg-${getStatusBadge(p.status)} px-3 py-2`}>
                          {p.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td style={{ minWidth: "130px" }}>
                        <select
                          className="form-select form-select-sm"
                          value={p.status}
                          onChange={(e) =>
                            handleStatusChange(p.id, e.target.value)
                          }
                        >
                          <option value="Active">Active</option>
                          <option value="Rented">Rented</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}

export default AdminProperties;