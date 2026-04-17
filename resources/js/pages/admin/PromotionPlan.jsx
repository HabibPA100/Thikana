import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";
const PromotionPlan = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration_days: "",
    priority: "",
  });
  const [editId, setEditId] = useState(null);

  // ✅ Fetch Plans
  const fetchPlans = async () => {
    try {
      const res = await api.get("/admin/promotion-plans");
      setPlans(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/admin/promotion-plans/${editId}`, form);
      } else {
        await api.post("/admin/promotion-plans", form);
      }

      setForm({ name: "", price: "", duration_days: "", priority: "" });
      setEditId(null);
      fetchPlans();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Unauthorized or error occurred!");
    }
  };

  // ✅ Edit
  const handleEdit = (plan) => {
    setForm({
      name: plan.name,
      price: plan.price,
      duration_days: plan.duration_days,
      priority: plan.priority,
    });
    setEditId(plan.id);
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/admin/promotion-plans/${id}`);
        fetchPlans();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Promotion Plans</h2>

        {/* Form */}
        <div className="card p-4 mb-4 shadow">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-3 mb-3">
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Plan Name"
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price"
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <input
                  type="number"
                  className="form-control"
                  name="duration_days"
                  value={form.duration_days}
                  onChange={handleChange}
                  placeholder="Duration (Days)"
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <input
                  type="number"
                  className="form-control"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  placeholder="Priority"
                  required
                />
              </div>
            </div>

            <button className="btn btn-primary">
              {editId ? "Update Plan" : "Create Plan"}
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="card p-3 shadow">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Days</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {plans.length > 0 ? (
                plans.map((plan) => (
                  <tr key={plan.id}>
                    <td>{plan.name}</td>
                    <td>{plan.price}</td>
                    <td>{plan.duration_days}</td>
                    <td>{plan.priority}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(plan)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(plan.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Plans Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default PromotionPlan;