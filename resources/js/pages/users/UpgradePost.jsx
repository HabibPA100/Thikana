import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

const UpgradePost = ({ postId }) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Payment fields
  const [paymentNumber, setPaymentNumber] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentChanel, setPaymentChanel] = useState("");


  // ✅ Fetch Plans
  const fetchPlans = async () => {
    try {
      const res = await api.get("/user/promotion-plans");
      setPlans(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fetch Requests
  const fetchRequests = async () => {
    try {
      const res = await api.get("/user/promote-request");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchRequests();
  }, []);

  // ✅ Upgrade Request
  const handleUpgrade = async () => {
    if (!selectedPlan) return alert("Please select a plan");
    if (!paymentNumber || !paymentAmount || !paymentChanel)
      return alert("Please provide payment number, amount and chanel");

    // ✅ Find the selected plan object
    const plan = plans.find((p) => p.id === selectedPlan);
    if (!plan) return alert("Selected plan not found");

    // ✅ Check if payment amount matches plan price
    if (Number(paymentAmount) !== Number(plan.price)) {
      return alert(
        `Payment amount must be exactly ৳${plan.price} for the selected plan`
      );
    }

    try {
      const res = await api.post(
        '/user/promote-request',
        {
          post_id: postId,
          plan_id: selectedPlan,
          payment_number: paymentNumber,
          payment_amount: paymentAmount,
          payment_chanel: paymentChanel,
        }
      );

      alert(res.data.message);

      // Clear form
      setSelectedPlan(null);
      setPaymentNumber("");
      setPaymentAmount("");
      setPaymentChanel("");

      fetchRequests(); // refresh list
    } catch (err) {
      console.error(err);
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <DashboardLayout>
      <div className="container mt-4">

        {/* 🔥 Upgrade Form */}
        <div className="card shadow-lg border-0 p-4 mb-5">
          <h3 className="text-center mb-4 text-primary">🚀 Upgrade Your Post</h3>

          <div className="row">
            {plans.map((plan) => (
              <div key={plan.id} className="col-md-4 mb-4">
                <div
                  className={`card h-100 shadow-sm border-2 ${
                    selectedPlan === plan.id ? "border-success" : "border-light"
                  }`}
                >
                  <div className="card-body text-center">
                    <h5 className="fw-bold">{plan.name}</h5>

                    <h4 className="text-success my-3">৳ {plan.price}</h4>

                    <p className="mb-1">⏳ {plan.duration_days} days</p>
                    <p className="mb-3">⭐ Priority: {plan.priority}</p>

                    {/* ✅ Toggle */}
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedPlan === plan.id}
                        onChange={() =>
                          setSelectedPlan(selectedPlan === plan.id ? null : plan.id)
                        }
                      />
                    </div>

                    <small className="text-muted">
                      {selectedPlan === plan.id ? "Selected" : "Click to select"}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Payment fields */}
          {selectedPlan && (
            <div className="card shadow-sm p-3 my-4">
              <h5 className="mb-3 text-primary">💰 Payment Info</h5>

              <div className="mb-3">
                <label className="form-label">Payment Number</label>
                <input
                  type="tel"
                  pattern="[0-9]{11,15}"
                  maxLength={15}
                  className="form-control"
                  value={paymentNumber}
                  onChange={(e) => setPaymentNumber(e.target.value)}
                  placeholder="Enter the number you sent money from"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Amount (৳)</label>
                <input
                  type="number"
                  className="form-control"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter the amount you sent"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Chanel </label>
                <input
                  type="text"
                  className="form-control"
                  value={paymentChanel}
                  onChange={(e) => setPaymentChanel(e.target.value)}
                  placeholder="Enter Chanel Like (Bkash, Nagad, Upay, Rocket)"
                />
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              className="btn btn-success btn-lg px-5 mt-3"
              onClick={handleUpgrade}
              disabled={!selectedPlan}
            >
              ✅ Upgrade Now
            </button>
          </div>
        </div>

        {/* 🔥 Promotion Requests List */}
        <div>
          <h4 className="mb-4">📢 Your Promotion Requests</h4>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : requests.length === 0 ? (
            <div className="alert alert-info">No requests yet</div>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="mb-1">🏠 {req.house_rental?.title}</h5>
                      <p className="text-muted mb-2">
                        📅 {new Date(req.created_at).toLocaleString()}
                      </p>
                      <p className="mb-1">
                        📦 Plan: <b>{req.promotion_plan?.name}</b>
                      </p>
                      <p className="mb-0">⏳ {req.promotion_plan?.duration_days} days</p>
                    </div>

                    <div>
                      <span
                        className={`badge px-3 py-2 ${
                          req.status === "approved"
                            ? "bg-success"
                            : req.status === "rejected"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {req.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {req.status === "approved" && (
                    <div className="mt-3 text-success">✅ Promotion Active</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UpgradePost;