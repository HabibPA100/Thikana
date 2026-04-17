import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import axios from "axios";
import { Link, useNavigate  } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

const Dashboard = () => {

  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ token fix
  const token = localStorage.getItem("token");

  // ✅ fetch function
  const fetchProperties = async () => {
    try {
      const res = await api.get("/my-properties");

      console.log("API RESPONSE:", res.data);
      // ✅ flexible data handling
      const data = res.data.data || res.data.properties || [];
      setProperties(data);

    } catch (err) {
      console.error("API ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ dependency fix
  useEffect(() => {
    if (token) {
      fetchProperties();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <DashboardLayout>
      <div className="container-fluid" >
        {/* <pre>{JSON.stringify(requests, null, 2)}</pre> */}
        {/* PAGE TITLE */}
        <div className="mb-4">
          <p className="text-muted">আপনার পোস্ট পরিচালনা করুন</p>
        </div>

        <div className="row g-4">

          {/* LEFT COLUMN */}
          <div className="col-lg-3 left bg-light">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white">
                <h6 className="mb-0">পোস্ট তৈরি করুন</h6>
              </div>

              <div className="card-body p-2">
               <button className="btn btn-outline-primary w-100"
                      onClick={()=> navigate(`/create/post`)} >
                আপনার পোস্ট লিখুন
              </button>
               <button className="btn btn-outline-info w-100 mt-3"
                      onClick={()=> navigate(`/show/my-posts`)} >
                আপনার সকল পোস্ট দেখুন 
              </button>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="col-lg-6 middle">
            <div className="card shadow-sm border-0">

              {/* HEADER */}
              <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0">আপনার সকল পোস্ট</h6>
                <span className="badge bg-light text-dark">
                  {properties.length} টি
                </span>
              </div>

              <div className="card-body">

                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : properties.length === 0 ? (
                  <p className="text-center text-muted">কোন পোস্ট পাওয়া যায়নি</p>
                ) : (

                  <div className="d-flex flex-column gap-4">

                    {properties.map((item) => {

                      const price =
                        item.purpose === "sell"
                          ? item.sell_price
                          : item.rent_amount;

                      return (
                        <div key={item.id} className="card shadow border-0">

                          {/* IMAGE */}
                          {item.cover_image && (
                            <img
                              src={`http://127.0.0.1:8000/storage/${item.cover_image}`}
                              className="card-img-top"
                              style={{ height: "200px", objectFit: "cover" }}
                              alt="property"
                            />
                          )}

                          <div className="card-body">

                            {/* USER + STATUS */}
                            <div className="d-flex justify-content-between">

                              <div className="d-flex align-items-center gap-2">

                                {item.user?.profile_image ? (
                                  <img
                                    src={`http://127.0.0.1:8000/storage/${item.user.profile_image}`}
                                    className="rounded-circle"
                                    width="40"
                                    height="40"
                                    alt=""
                                  />
                                ) : (
                                  <div
                                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                                    style={{ width: 40, height: 40 }}
                                  >
                                    {item.user?.name?.charAt(0)}
                                  </div>
                                )}

                                <div>
                                  <h6 className="mb-0">{item.user?.name}</h6>
                                  <small className="text-muted">{item.district}</small>
                                </div>
                              </div>

                              <div className="text-end">
                                <span className={`badge ${item.is_available ? "bg-success" : "bg-danger"}`}>
                                  {item.is_available ? "Available" : "Not Available"}
                                </span>
                                <br />
                                <span className="badge bg-info mt-1">
                                  {item.purpose}
                                </span>
                              </div>

                            </div>

                            {/* TITLE */}
                            <h5 className="mt-3">{item.title}</h5>

                            {/* CATEGORY */}
                            <p className="text-muted mb-1">
                              {item.sub_category?.name}
                            </p>

                            {/* PRICE */}
                            <h5 className="text-success fw-bold">
                              ৳ {price || 0}
                            </h5>

                            {/* LOCATION */}
                            <p className="text-muted mb-2">
                              📍 {item.area}, {item.district}
                            </p>

                            {/* ATTRIBUTES */}
                            {item.attribute_values?.length > 0 && (
                              <div className="d-flex flex-wrap gap-2 mt-2">

                                {item.attribute_values.map((attrVal, i) => {

                                  const value =
                                    attrVal.value_text ??
                                    attrVal.value_number ??
                                    attrVal.value_date ??
                                    (attrVal.value_boolean ? "Yes" : "No");

                                  return (
                                    <span key={i} className="badge bg-light text-dark border">
                                      {attrVal.attribute?.label}: {value}
                                    </span>
                                  );
                                })}

                              </div>
                            )}

                          </div>

                          {/* ACTIONS */}
                          <div className="card-footer bg-white d-flex">

                            {item.promotion_request?.status === "pending" ? (
                              <button className="btn btn-warning w-100" disabled>
                                You have sent a request, please wait
                              </button>

                            ) : item.promotion_request?.status === "approved" ? (
                              <button className="btn btn-success w-100" disabled>
                                Upgrade Plan Approved, Thank You
                              </button>

                            ) : (
                              <button
                                className="btn btn-outline-danger w-100"
                                onClick={() => navigate(`/upgrade/${item.id}`)}
                              >
                                Upgrade Plan
                              </button>
                            )}

                          </div>

                        </div>
                      );
                    })}

                  </div>
                )}

              </div>
            </div>
          </div>

         {/* RIGHT COLUMN */}
          <div className="col-lg-3 right bg-light">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white">
                <h6 className="mb-0">FAQ</h6>
              </div>

              <div className="card-body p-2">
                <div className="accordion" id="faqAccordion">

                  {/* General Sell */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq18"
                      >
                        আমি কিভাবে Sell পোস্ট দিবো ?
                      </button>
                    </h2>

                    <div id="faq18" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        Category নির্বাচন করুন → Sub Category → Sell নির্বাচন করুন → তথ্য পূরণ করুন → পোস্ট করুন।
                      </div>
                    </div>
                  </div>
                  {/* Residential */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq1"
                      >
                        আমি বাসা / ফ্ল্যাট ভাড়া দিতে চাই
                      </button>
                    </h2>

                    <div id="faq1" className="accordion-collapse collapse show">
                      <div className="accordion-body">
                        Residential (আবাসিক) category নির্বাচন করে আপনার পোস্ট দিন।
                      </div>
                    </div>
                  </div>

                  {/* Commercial */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq2"
                      >
                        দোকান / অফিস ভাড়া দিতে চাই
                      </button>
                    </h2>

                    <div id="faq2" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        Commercial (বাণিজ্যিক) category নির্বাচন করুন।
                      </div>
                    </div>
                  </div>

                  {/* Warehouse */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq3"
                      >
                        গুদাম বা শিল্প প্রতিষ্ঠান ভাড়া দিতে চাই
                      </button>
                    </h2>

                    <div id="faq3" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        Industrial & Warehouse category ব্যবহার করুন।
                      </div>
                    </div>
                  </div>

                  {/* Land */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq4"
                      >
                        জমি ভাড়া / লিজ দিতে চাই
                      </button>
                    </h2>

                    <div id="faq4" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        Land (জমি) category নির্বাচন করুন।
                      </div>
                    </div>
                  </div>

                  {/* Parking */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq5"
                      >
                        গ্যারেজ / পার্কিং ভাড়া দিতে চাই
                      </button>
                    </h2>

                    <div id="faq5" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        Garage & Parking category নির্বাচন করুন।
                      </div>
                    </div>
                  </div>

                  {/* Educational */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq6"
                      >
                        স্কুল / কোচিং / ট্রেনিং সেন্টার দিতে চাই
                      </button>
                    </h2>

                    <div id="faq6" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        Educational Space category নির্বাচন করুন।
                      </div>
                    </div>
                  </div>

                  {/* Event Space */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq7"
                      >
                        অনুষ্ঠান / হল রুম ভাড়া দিতে চাই
                      </button>
                    </h2>

                    <div id="faq7" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        Event Space / Function Hall category ব্যবহার করুন।
                      </div>
                    </div>
                  </div>

                  {/* Coworking */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq8"
                      >
                        শেয়ার্ড অফিস / কো-ওয়ার্কিং স্পেস দিতে চাই
                      </button>
                    </h2>

                    <div id="faq8" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        Co-working Space category নির্বাচন করুন।
                      </div>
                    </div>
                  </div>

                  {/* Studio */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq9"
                      >
                        স্টুডিও / শুটিং স্পেস দিতে চাই
                      </button>
                    </h2>

                    <div id="faq9" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        Studio Space category নির্বাচন করুন।
                      </div>
                    </div>
                  </div>

                  {/* Healthcare */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq10"
                      >
                        ক্লিনিক / হাসপাতাল স্পেস দিতে চাই
                      </button>
                    </h2>

                    <div id="faq10" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        Healthcare Space category নির্বাচন করুন।
                      </div>
                    </div>
                  </div>

                  {/* Mixed */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq11"
                      >
                        একাধিক ব্যবহারের জন্য স্পেস দিতে চাই
                      </button>
                    </h2>

                    <div id="faq11" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        Mixed-Use Property category নির্বাচন করুন।
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;