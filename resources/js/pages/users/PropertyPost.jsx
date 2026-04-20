import React, { useEffect, useState, useRef  } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

import DashboardLayout from "../../layouts/DashboardLayout";

const PropertyPost = () => {

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const fileRef = useRef();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const initialForm = {
    category_id: "",
    sub_category_id: "",
    title: "",
    description: "",
    purpose: "rent",
    rent_amount: "",
    sell_price: "",
    division: "",
    district: "",
    area: "",
    address: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    cover_image: null,
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!form.category_id) return;

    const fetchSub = async () => {
      const res = await api.get(`/categories/${form.category_id}/subcategories`);
      setSubCategories(res.data);
    };

    fetchSub();
  }, [form.category_id]);

  useEffect(() => {
    if (!form.sub_category_id) return;

    const fetchAttr = async () => {
      const res = await api.get(`/subcategories/${form.sub_category_id}`);

      setAttributes(
        (res.data.attributes || []).map((attr) => ({
          ...attr,
          value: "",
        }))
      );
    };

    fetchAttr();
  }, [form.sub_category_id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));


    if (name === "cover_image") {
      const file = files[0];
      setForm({ ...form, cover_image: file });
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAttrChange = (id, value) => {
    setAttributes((prev) =>
      prev.map((attr) =>
        attr.id === id ? { ...attr, value } : attr
      )
    );
  };

  const validate = () => {
      let newErrors = {};

      if (!form.category_id) newErrors.category_id = "ক্যাটাগরি নির্বাচন করুন";
      if (!form.sub_category_id) newErrors.sub_category_id = "সাব ক্যাটাগরি নির্বাচন করুন";
      if (!form.title) newErrors.title = "শিরোনাম লিখুন";

      if (form.purpose === "rent" && !form.rent_amount) {
        newErrors.rent_amount = "ভাড়ার পরিমাণ দিন";
      }

      if (form.purpose === "sell" && !form.sell_price) {
        newErrors.sell_price = "বিক্রয় মূল্য দিন";
      }

      if (!form.division) newErrors.division = "বিভাগ লিখুন";
      if (!form.district) newErrors.district = "জেলা লিখুন";
      if (!form.area) newErrors.area = "এলাকা লিখুন";
      if (!form.address) newErrors.address = "ঠিকানা লিখুন";

      if (!form.contact_name) newErrors.contact_name = "নাম দিন";
      if (!form.contact_phone) newErrors.contact_phone = "মোবাইল নাম্বার দিন";

      if (!form.cover_image) {
        newErrors.cover_image = "প্রোপার্টির ছবি দেওয়া বাধ্যতামূলক";
      } else if (!form.cover_image.type.startsWith("image/")) {
        newErrors.cover_image = "শুধু image ফাইল দিন";
      } else if (form.cover_image.size > 2 * 1024 * 1024) {
        newErrors.cover_image = "ছবি 2MB এর কম হতে হবে";
      }

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoadingSubmit(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });

      formData.append("attributes", JSON.stringify(attributes));

      await api.post("/properties", formData);

      // ✅ Reset সব
      setForm(initialForm);
      setAttributes([]);
      setSubCategories([]);
      setPreview(null);

      // 🔥 file input clear
      if (fileRef.current) {
        fileRef.current.value = "";
      }

      alert("✅ পোস্ট সফলভাবে তৈরি হয়েছে!\n\n⚠️ অনুগ্রহ করে একই পোস্ট বারবার তৈরি করবেন না এবং কোনো ভুল বা মিথ্যা তথ্য শেয়ার করা থেকে বিরত থাকুন। এ ধরনের কার্যকলাপের জন্য আপনার অ্যাকাউন্ট সাময়িক বা স্থায়ীভাবে বন্ধ হয়ে যেতে পারে।");

      navigate("/show/my-posts");
      
    } catch (err) {
      console.error(err);
      alert("❌ পোস্ট তৈরি করতে সমস্যা হয়েছে");
    }

    setLoadingSubmit(false);
  };

  return (
    <DashboardLayout>
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            নতুন প্রপার্টি পোস্ট করুন
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">

                <div className="col-md-6">
                  <label>ক্যাটাগরি</label>
                  <select
                    className="form-select"
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                  >
                    <option value="">নির্বাচন করুন</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && <small className="text-danger">{errors.category_id}</small>}
                </div>

                <div className="col-md-6">
                  <label>সাব ক্যাটাগরি</label>
                  <select
                    className="form-select"
                    name="sub_category_id"
                    value={form.sub_category_id}
                    onChange={handleChange}
                  >
                    <option value="">নির্বাচন করুন</option>
                    {subCategories.map((sc) => (
                      <option key={sc.id} value={sc.id}>
                        {sc.name}
                      </option>
                    ))}
                  </select>
                  {errors.sub_category_id && <small className="text-danger">{errors.sub_category_id}</small>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="title"> আপনার শিরোনাম কি হবে ? </label>
                  <input
                    className="form-control"
                    name="title"
                    placeholder="একটি বাসা ভারা/বিক্রি করা হবে"
                    value={form.title}
                    onChange={handleChange}
                  />
                  {errors.title && <small className="text-danger">{errors.title}</small>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="purpose"> আপনি কি ভাড়া না বিক্রি করতে চান ? </label>
                  <select
                    className="form-select"
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                  >
                    <option value="rent">ভাড়া</option>
                    <option value="sell">বিক্রি</option>
                  </select>
                </div>

                {form.purpose === "rent" && (
                  <div className="col-md-6">
                    <label htmlFor="rent_amount"> ভাড়ার পরিমাণ কত ? </label>
                    <input
                      type="number"
                      name="rent_amount"
                      className="form-control"
                      placeholder="12000/Month"
                      value={form.rent_amount}
                      onChange={handleChange}
                    />
                    {errors.rent_amount && <small className="text-danger">{errors.rent_amount}</small>}
                  </div>
                )}

                {form.purpose === "sell" && (
                  <div className="col-md-6">
                    <label htmlFor="sell_price"> বিক্রয় মূল্য কত ? </label>
                    <input
                      type="number"
                      name="sell_price"
                      className="form-control"
                      placeholder="মূল্য"
                      value={form.sell_price}
                      onChange={handleChange}
                    />
                    {errors.sell_price && <small className="text-danger">{errors.sell_price}</small>}
                  </div>
                )}

                <div className="my-2"> 
                  <h5>ঠিকানা লিখুন ?</h5>
                </div>
                <div className="col-md-4">
                  <input name="division" className="form-control" placeholder="বিভাগ" value={form.division} onChange={handleChange} />
                  {errors.division && <small className="text-danger">{errors.division}</small>}
                </div>

                <div className="col-md-4">
                  <input name="district" className="form-control" placeholder="জেলা" value={form.district} onChange={handleChange} />
                  {errors.district && <small className="text-danger">{errors.district}</small>}
                </div>

                <div className="col-md-4">
                  <input name="area" className="form-control" placeholder="এলাকা" value={form.area} onChange={handleChange} />
                  {errors.area && <small className="text-danger">{errors.area}</small>}
                </div>

                <div className="col-12">
                  <input name="address" className="form-control" placeholder="ঠিকানা" value={form.address} onChange={handleChange} />
                  {errors.address && <small className="text-danger">{errors.address}</small>}
                </div>

                <div className="col-md-4">
                  <input name="contact_name" className="form-control" placeholder="নাম" value={form.contact_name} onChange={handleChange} />
                   {errors.contact_name && <small className="text-danger">{errors.contact_name}</small>}
                </div>

                <div className="col-md-4">
                  <input
                      type="tel"
                      name="contact_phone"
                      className="form-control"
                      placeholder="মোবাইল"
                      value={form.contact_phone}
                      onChange={handleChange}
                      pattern="[0-9]{10,15}"
                      maxLength={15}
                      minLength={10}
                      data-bs-toggle="tooltip"
                      title="10 থেকে 15 ডিজিটের নাম্বার দিন 018**"
                    />
                    {errors.contact_phone && <small className="text-danger">{errors.contact_phone}</small>}
                </div>

                <div className="col-md-4">
                  <input name="contact_email" className="form-control" placeholder="ইমেইল" value={form.contact_email} onChange={handleChange} />
                </div>

                <div className="col-12">
                  <label htmlFor="cover_image">আপনার প্রোপার্টির ছবি দিন।</label>
                  <input type="file" name="cover_image" className="form-control" ref={fileRef} onChange={handleChange} />
                  {preview && <img src={preview} width="120" className="mt-2" />}
                   {errors.cover_image && <small className="text-danger">{errors.cover_image}</small>}
                </div>

               <div className="col-12">
                  <label htmlFor="description">আপনার প্রোপার্টি সম্পর্কে বিস্তারিত লিখতে পারেন। ঐচ্ছিক </label>
                  <textarea
                    name="description"
                    className="form-control w-100"
                    placeholder="৩ রুমের একটি সুন্দর ও প্রশস্ত ফ্ল্যাট ভাড়া/বিক্রয় করা হবে, স্থান: ডেমরা স্টাফ কোয়ার্টার, সারুলিয়া, ডেমরা, ঢাকা; ফ্ল্যাটে রয়েছে ৩টি শয়নকক্ষ, ২টি বাথরুম, ৩টি ব্যালকনি, ১টি ড্রইং (হল) রুম, ১টি ডাইনিং রুম ও ১টি কিচেন; মোট আয়তন ২৪০০/৩৪০০ বর্গফুট।
                    "
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                {attributes.map((attr) => (
                  <div className="col-md-4" key={attr.id}>
                    <input
                      className="form-control"
                      placeholder={attr.label}
                      value={attr.value}
                      onChange={(e) =>
                        handleAttrChange(attr.id, e.target.value)
                      }
                    />
                  </div>
                ))}

                <div className="col-12 text-end">
                  <button className="btn btn-success" disabled={loadingSubmit}>
                    {loadingSubmit ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        পোস্ট হচ্ছে...
                      </>
                    ) : (
                      "পোস্ট করুন"
                    )}
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PropertyPost;