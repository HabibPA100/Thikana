
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate , Link } from "react-router-dom";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

const Dashboard = () => {

  const navigate = useNavigate();
  const [totalMessage, setTotalMessage] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalInActUsers, setTotalInActUsers] = useState(0);
  const [totalPropertyPost, setTotalPropertyPost] = useState(0);
  const [totalUpgradeRequest, setTotalUpgradeRequest] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [totalPendingRequest, setPendingRequest] = useState(0);
  const [latestUsers, setLatestUsers] = useState([]);

  useEffect(() => {
    fetchMessageCount();
    fetchUserCount();
    fetchInActUserCount();
    fetchPropertyCount();
    fetchUpgradePlanCount();
    fetchPendingReqCount();
    fetchRevenue();
    fetchLatestUsers();
  }, []);

  const fetchMessageCount = async () => {
    try {
      const res = await api.get("/admin/message/count");
      setTotalMessage(res.data.total_message);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchUserCount = async () => {
    try {
      const res = await api.get("/admin/users/count");
      setTotalUsers(res.data.total_users);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchInActUserCount = async () => {
    try {
      const res = await api.get("/admin/inactive-users/count");
      setTotalInActUsers(res.data.inactive_users);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchPropertyCount = async () => {
    try {
      const res = await api.get("/admin/property/count");
      setTotalPropertyPost(res.data.total_property_post);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchUpgradePlanCount = async () => {
    try {
      const res = await api.get("/admin/upgrade-plan/count");
      setTotalUpgradeRequest(res.data.total_upgrade_request);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchPendingReqCount = async () => {
    try {
      const res = await api.get("/admin/pending-req/count");
      setPendingRequest(res.data.pending_request);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchRevenue = async () => {
    try {
      const res = await api.get("/admin/revenue");
      setRevenue(res.data.revenue);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchLatestUsers = async () => {
    try {
      const res = await api.get("/admin/users/latest");
      setLatestUsers(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };
  return (
    <AdminDashboardLayout>
      <div className="container-fluid">

        {/* Topbar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <h3 className="fw-bold mb-0">Dashboard</h3>
            <small className="text-muted">Welcome back, Admin</small>
          </div>

          {/* <div className="w-100 w-md-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div> */}
        </div>

        {/* Stats Cards */}
        <div className="row g-3 g-md-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card text-white bg-danger shadow border-0 h-100">
              <Link to="/admin/messages" className="card-body text-decoration-none">
                <h6>Total Message</h6>
                 <h3>{totalMessage}</h3>
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3"
                  onClick={() => navigate("/admin/users")}
                  style={{ cursor: "pointer" }}>
            <div className="card text-white bg-primary shadow border-0 h-100">
              <div className="card-body">
                <h6>Total Users</h6>
                 <h3>{totalUsers}</h3>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3"
                  onClick={() => navigate("/admin/inactive-users")}
                  style={{ cursor: "pointer" }}>
            <div className="card text-white bg-secondary shadow border-0 h-100">
              <div className="card-body">
                <h6>Total InActive Users</h6>
                 <h3>{totalInActUsers}</h3>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3"
                  onClick={() => navigate("/admin/properties")}
                  style={{ cursor: "pointer" }}>
            <div className="card text-white bg-success shadow border-0 h-100">
              <div className="card-body">
                <h6>Total Property Post</h6>
                <h3>{totalPropertyPost}</h3>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card text-white bg-warning shadow border-0 h-100"
                  onClick={() => navigate("/admin/upgrade-requests")}
                  style={{ cursor: "pointer" }}>
              <div className="card-body">
                <h6> Total Upgrade Request</h6>
                <h3>{totalUpgradeRequest}</h3>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card text-white bg-info shadow border-0 h-100"
                  onClick={() => navigate("/promotion/list")}
                  style={{ cursor: "pointer" }}>
              <div className="card-body">
                <h6> Total Pending Request</h6>
                <h3>{totalPendingRequest}</h3>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card text-white bg-dark shadow border-0 h-100">
              <div className="card-body"
              onClick={() => navigate("/admin/revenue-list")}
              style={{ cursor: "pointer" }}
              >
                <h6>Total Revenue</h6>
                <h3>💸{revenue.toLocaleString()}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card shadow border-0 mt-4 mt-md-5">
          <div className="card-body">
            <h5 className="mb-3 fw-semibold">Quick Actions</h5>

            <div className="d-flex flex-wrap gap-2 gap-md-3">
              <Link to="/create/promotion-plan" className="btn btn-outline-primary">
                ➕ Create Subscription Plan
              </Link>
              <Link to="/manage/category" className="btn btn-outline-dark">
                📦 Manage Category
              </Link>
              <Link to="/manage/attribute" className="btn btn-outline-success">
                🎍 Manage Attribute
              </Link>
              <Link to="/manage/sub-category" className="btn btn-outline-info">
                🌳 Manage Sub Category
              </Link>
              <Link to="/manage/sub-category/attribute" className="btn btn-outline-warning">
                🗺️ Manage Sub Category Attribute
              </Link>
              {/* <Link to="/orders" className="btn btn-outline-warning">
                🛒 Orders
              </Link>
              <Link to="/reports" className="btn btn-outline-info">
                📊 Reports
              </Link>
              <Link to="/settings" className="btn btn-outline-dark">
                ⚙️ Settings
              </Link> */}
            </div>
          </div>
        </div>

        {/* View Actions */}
        <div className="card shadow border-0 mt-4 mt-md-5">
          <div className="card-body">
            <h5 className="mb-3 fw-semibold">View Actions</h5>

            <div className="d-flex flex-wrap gap-2 gap-md-3">
              <Link to="/promotion/list" className="btn btn-outline-info">
                👁️ Promotion List Show
              </Link>
              <Link to="/admin/users" className="btn btn-outline-success">
                👤 Users
              </Link>
              <Link to="/admin/properties" className="btn btn-outline-primary">
                📦 All Properties Post
              </Link>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card shadow border-0 mt-4 mt-md-5">
          <div className="card-body">
            <h5 className="mb-3 fw-semibold">Recent Users</h5>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th className="d-none d-md-table-cell">Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {latestUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    latestUsers.map((user) => (
                      <tr key={user.id}>
                        
                        <td>{user.name}</td>

                        <td
                          className="text-truncate"
                          style={{ maxWidth: "150px" }}
                        >
                          {user.email}
                        </td>

                        <td className="d-none d-md-table-cell">
                          <span
                            className={`badge ${
                              user.status === "active"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        <td>
                          <button className="btn btn-sm btn-outline-primary"
                          onClick={() => navigate(`/admin/users/${user.id}/details`)}
                          >
                            View
                          </button>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>

      </div>
    </AdminDashboardLayout>
  );
};

export default Dashboard;