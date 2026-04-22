import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

export default function UpgradeRequestList() {

  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/admin/upgrade/requests-list");
      setRequests(res.data);
      setRequests(res.data.requests);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <AdminDashboardLayout>
        <div className="container mt-4">
            {/* <pre>{JSON.stringify(requests, null, 2)}</pre> */}
        <div className="card shadow">
            
            <div className="card-header bg-primary text-white">
            <h5>Upgrade Requests</h5>
            </div>

            <div className="card-body">
            <div className="table-responsive">

                <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Property</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    </tr>
                </thead>

                <tbody>
                    {requests.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.user_id}</td>
                        <td>{item.property_id}</td>
                        <td>{item.promotion_plan_id}</td>
                        <td>৳ {item.payment_amount}</td>
                        <td>
                        <span className={`badge 
                            ${item.status === 'approved' 
                            ? 'bg-success' 
                            : 'bg-warning'
                            }`}
                        >
                            {item.status}
                        </span>
                        </td>
                        <td>
                        {new Date(item.starts_at).toLocaleDateString()}
                        </td>
                        <td>
                        {new Date(item.expires_at).toLocaleDateString()}
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