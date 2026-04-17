import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/admin/messages");
      setMessages(res.data);
    } catch (error) {
      console.log("Failed to load messages", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Loading messages...</p>
      </div>
    );
  }

  return (
    <AdminDashboardLayout>
        <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold">📩 Admin Messages</h2>
            <span className="badge bg-primary">
            Total: {messages.length}
            </span>
        </div>

        <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle shadow-sm">
            <thead className="table-dark">
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Received At</th>
                </tr>
            </thead>

            <tbody>
                {messages.length === 0 ? (
                <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                    No messages found
                    </td>
                </tr>
                ) : (
                messages.map((msg, index) => (
                    <tr key={msg.id}>
                    <td>{index + 1}</td>

                    <td className="fw-semibold">{msg.name}</td>

                    {/* EMAIL LINK SYSTEM */}
                    <td>
                        <a
                        href={`mailto:${msg.email}`}
                        className="text-decoration-none"
                        >
                        {msg.email}
                        </a>
                    </td>

                    <td style={{ maxWidth: "300px" }}>
                        {msg.message.length > 60
                        ? msg.message.substring(0, 60) + "..."
                        : msg.message}
                    </td>

                    <td>
                        <small className="text-muted">
                        {new Date(msg.created_at).toLocaleString()}
                        </small>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    </AdminDashboardLayout>
  );
}