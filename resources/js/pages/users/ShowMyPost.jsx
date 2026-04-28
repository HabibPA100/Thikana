import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

const initialFormState = {
  category_id: "",
  sub_category_id: "",
  post_type: "",
  title: "",
  description: "",
  purpose: "",
  rent_amount: "",
  sell_price: "",
  expected_budget: "",
  area: "",
  cover_image: null,
};

const ShowMyPosts = () => {


  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingPost, setEditingPost] = useState(null);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [attributes, setAttributes] = useState([]);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState(initialFormState);

  // ================= FETCH =================
  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/my-properties");
      setPosts(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = async (post) => {
    setEditingPost(post);

    setForm({
      ...initialFormState,
      category_id: String(post.category_id),
      sub_category_id: String(post.sub_category_id),
      post_type: post.post_type || "",
      title: post.title || "",
      description: post.description || "",
      purpose: post.purpose || "",
      rent_amount: post.rent_amount || "",
      sell_price: post.sell_price || "",
      expected_budget: post.expected_budget || "",
      area: post.area || "",
      cover_image: null,
    });

    setPreview(
      post.cover_image
        ? `${import.meta.env.VITE_API_BASE}/storage/${post.cover_image}`
        : null
    );

    try {
      // subcategory শুধু নাম দেখানোর জন্য
      const subRes = await api.get(
        `/categories/${post.category_id}/subcategories`
      );
      setSubCategories(subRes.data || []);

      // attributes with value
      const dynamicAttr = (post.attribute_values || []).map((item) => ({
        id: item.attribute_id,
        label: item.attribute?.label || "Field",
        type: item.attribute?.type || "text",
        value:
          item.value_text ??
          item.value_number ??
          item.value_boolean ??
          "",
      }));

      setAttributes(dynamicAttr);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= CHANGE =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cover_image") {
      const file = files[0];
      if (file) {
        setForm((prev) => ({ ...prev, cover_image: file }));
        const url = URL.createObjectURL(file);
        setPreview(url);

        // cleanup later (optional advanced)
        URL.revokeObjectURL(url);
      }
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ================= ATTRIBUTE =================
  const handleAttrChange = (id, value) => {
    setAttributes((prev) =>
      prev.map((a) => (a.id === id ? { ...a, value } : a))
    );
  };

  // ================= UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== undefined && form[key] !== "") {
          formData.append(key, form[key]);
        }
      });

      formData.append("attributes", JSON.stringify(attributes));

      await api.post(
        `/properties/${editingPost.id}?_method=PUT`,
        formData
      );

      alert("✅ Poperty Post Updated");

      resetForm();
      fetchPosts();
    } catch (err) {
      console.error(err);
      // console.log("DATA:", err.response?.data);
      console.log('DATA', err.response?.data);
      alert("❌ Update failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;

    try {
      await api.delete(`/properties/${id}`);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= RESET =================
  const resetForm = () => {
    setEditingPost(null);
    setForm(initialFormState);
    setAttributes([]);
    setPreview(null);
  };

  if (loading) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <DashboardLayout>
      <div className="container mt-4">
        {/* ================= EDIT FORM ================= */}
        {editingPost && (
          <div className="card mt-4 shadow">
            <div className="card-header bg-warning">Edit Property</div>

            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="row g-3">

                  {/* CATEGORY (READ ONLY) */}
                  <input
                      type="hidden"
                      name="category_id"
                      value={form.category_id}
                    />

                  {/* SUBCATEGORY (READ ONLY) */}
                  <input
                      type="hidden"
                      name="sub_category_id"
                      value={form.sub_category_id}
                    />

                  {/* Post Type */}
                  <input
                    type="hidden"
                    name="post_type"
                    value={form.post_type}
                  />

                  {/* TITLE */}
                  <div className="col-md-6">
                    <label>Title</label>
                    <input
                      className="form-control"
                      name="title"
                      value={form.title || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* PURPOSE */}
                  <div className="col-md-6">
                    <label>Purpose</label>
                    <select
                      className="form-select"
                      name="purpose"
                      value={form.purpose || ""}
                      onChange={handleChange}
                    >
                      <option value="rent">Rent</option>
                      <option value="sell">Sell</option>
                      <option value="wanted">Wanted</option>
                    </select>
                  </div>

                  {/* PRICE */}
                  {form.purpose === "rent" && (
                    <div className="col-md-6">
                      <label>Rent</label>
                      <input
                        type="number"
                        className="form-control"
                        name="rent_amount"
                        value={form.rent_amount || ""}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  {form.purpose === "sell" && (
                    <div className="col-md-6">
                      <label>Sell Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="sell_price"
                        value={form.sell_price || ""}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  {form.purpose === "wanted" && (
                    <div className="col-md-6">
                      <label>Expected Budget</label>
                      <input
                        type="number"
                        className="form-control"
                        name="expected_budget"
                        value={form.expected_budget || ""}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  {/* IMAGE */}
                  <div className="col-12">
                    <label>Image</label>
                    <input
                      type="file"
                      name="cover_image"
                      className="form-control"
                      onChange={handleChange}
                    />

                    {preview && (
                      <img
                        src={preview}
                        alt="preview"
                        width="120"
                        className="mt-2 rounded"
                      />
                    )}
                  </div>

                  <div className="col-12">
                  <textarea
                    name="description"
                    className="form-control w-100"
                    value={form.description || ""}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                  {/* DYNAMIC ATTRIBUTES */}
                  {attributes.map((a) => (
                    <div className="col-md-4" key={a.id}>
                      <label>{a.label}</label>
                      <input
                        type={a.type === "number" ? "number" : "text"}
                        className="form-control"
                        value={a.value || ""}
                        onChange={(e) =>
                          handleAttrChange(a.id, e.target.value)
                        }
                      />
                    </div>
                  ))}

                  <div className="col-12 text-end">
                    <button className="btn btn-success">Update</button>
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        )}

        <div className="container my-4">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-primary mb-0">আমার পোস্ট</h4>
          </div>

          <div className="card border border-primary shadow-sm">
            <div className="card-body p-0">

              <div className="table-responsive">
                <table className="table table-hover table-striped mb-0 align-middle">

                  <thead className="table-primary border-bottom border-2 border-primary">
                    <tr>
                      <th className="ps-3">টাইটেল</th>
                      <th>মূল্য</th>
                      <th>এলাকা</th>
                      <th className="text-center" style={{ width: "180px" }}>
                        অ্যাকশন
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {posts.map((p) => (
                      <tr key={p.id} className="border-bottom border-secondary-subtle">

                        <td className="ps-3 fw-semibold text-dark">
                          {p.title}
                        </td>

                        <td>
                          <span className="badge bg-primary-subtle text-primary border border-primary">
                            {p.purpose === "rent" && p.rent_amount}
                            {p.purpose === "sell" && p.sell_price}
                            {p.purpose === "wanted" && p.expected_budget}
                          </span>
                        </td>

                        <td className="text-muted">
                          {p.area}
                        </td>

                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(p)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(p.id)}
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShowMyPosts;