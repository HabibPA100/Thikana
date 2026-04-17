import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

const PostPromotionApproval = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // or wherever you store it

  // ✅ Fetch
  const fetchRequests = async () => {
    try {
      const res = await api.get("/admin/promotion-requests");

      setRequests(res.data);
      
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Approve
  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure to approve?")) return;

    try {
      await api.post(`/admin/promotion-requests/${id}/approve`,{});
      fetchRequests();
    } catch (err) {
      console.error("Approve Error:", err);
    }
  };

  // ✅ Reject
  const handleReject = async (id) => {
    if (!window.confirm("Are you sure to reject?")) return;

    try {
      await api.post(`/admin/promotion-requests/${id}/reject`,{});

      fetchRequests();
    } catch (err) {
      console.error("Reject Error:", err);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="container mt-4">
        <h3 className="mb-4">Pending Promotion Requests</h3>

        {/* <pre>{JSON.stringify(requests, null, 2)}</pre> */}

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="alert alert-info">No pending requests</div>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Post Title</th>
                <th>Plan</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req.id}>
                  <td>{index + 1}</td>
                  <td>{req.user?.name}</td>
                  <td>{req.property?.title}</td>
                  <td>{req.promotion_plan?.name}</td>
                  <td>{req.promotion_plan?.duration_days} days</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleApprove(req.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleReject(req.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default PostPromotionApproval;