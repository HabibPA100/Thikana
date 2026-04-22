import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

export default function RevenueList() {
    const [request, setRequest] = useState([]);
    const [posts, setPosts] = useState([]);

    const fetchApprovedRevenue = async () => {
        try {
            const res = await api.get("/admin/approved-revenue");
            setRequest(res.data);
            setPosts(res.data.posts);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
        };

        useEffect(() => {
        fetchApprovedRevenue();
        }, []);

  return (
    <AdminDashboardLayout>
        <div className="container mt-4">
        <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
            <h5 className="mb-0">💰 Revenue List (Approved Posts)</h5>
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
                    <th>Payment</th>
                    <th>Start</th>
                    <th>Expire</th>
                    <th>Status</th>
                    <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <tr key={post.id}>
                        <td>{index + 1}</td>
                        <td>{post.user_id}</td>
                        <td>{post.property_id}</td>
                        <td>{post.promotion_plan_id}</td>
                        <td>💸 {post.payment_amount}</td>
                        <td>
                            <div>
                            <strong>{post.payment_chanel}</strong>
                            <br />
                            <small>{post.payment_number}</small>
                            </div>
                        </td>
                        <td>{post.starts_at}</td>
                        <td>{post.expires_at}</td>
                        <td>
                            <span className="badge bg-success">
                            {post.status}
                            </span>
                        </td>
                        <td>
                            {new Date(post.created_at).toLocaleDateString()}
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="10" className="text-center">
                        No Revenue Found
                        </td>
                    </tr>
                    )}
                </tbody>

                </table>
            </div>
            </div>

        </div>
        </div>
    </AdminDashboardLayout>
  );
}