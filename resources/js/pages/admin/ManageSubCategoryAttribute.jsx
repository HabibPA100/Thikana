import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

export default function ManageSubCategoryAttribute() {

    const [subCategoryAttributes, setSubCategoryAttributes] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [form, setForm] = useState({
        sub_category_id: "",
        attribute_id: "",
        label: "",
        placeholder: "",
        order: 0,
        is_required: false,
        show_in_filter: false,
    });

    const [editId, setEditId] = useState(null);
    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const [scaRes, attrRes, subCatRes] = await Promise.all([
                api.get("/admin/sub-category-attributes"),
                api.get("/admin/attributes"),
                api.get("/admin/sub-categories"),
            ]);

            setSubCategoryAttributes(scaRes.data);
            setAttributes(attrRes.data);
            setSubCategories(subCatRes.data);

        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            sub_category_id: Number(form.sub_category_id),
            attribute_id: Number(form.attribute_id),
            label: form.label || null,
            placeholder: form.placeholder || null,
            order: Number(form.order) || 0,
            is_required: !!form.is_required,
            show_in_filter: !!form.show_in_filter,
        };

        try {
            if (editId) {
                await api.put(`/admin/sub-category-attributes/${editId}`, payload);
            } else {
                await api.post("/admin/sub-category-attributes", payload);
            }

            setForm({
                sub_category_id: "",
                attribute_id: "",
                label: "",
                placeholder: "",
                order: 0,
                is_required: false,
                show_in_filter: false,
            });

            setEditId(null);
            fetchAll();

        } catch (err) {
            console.error("Validation Error:", err.response?.data);
        }
    };

    const handleEdit = (item) => {
        setForm({
            sub_category_id: item.sub_category_id,
            attribute_id: item.attribute_id,
            label: item.label || "",
            placeholder: item.placeholder || "",
            order: item.order,
            is_required: item.is_required,
            show_in_filter: item.show_in_filter,
        });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure?")) {
            await api.delete(`/admin/sub-category-attributes/${id}`);
            fetchAll();
        }
    };

    const subCategoryMap = {};
    subCategories.forEach(sc => {
        subCategoryMap[sc.id] = sc.name;
    });

    const attributeMap = {};
    attributes.forEach(attr => {
        attributeMap[attr.id] = attr.label;
    });

    return (
        <AdminDashboardLayout>
            <div className="container mt-5">
                <h2>Manage Sub Category Attributes</h2>

                <form onSubmit={handleSubmit} className="mb-4">

                    {/* Sub Category Dropdown */}
                    <select
                        name="sub_category_id"
                        className="form-select mb-2"
                        value={form.sub_category_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Sub Category</option>
                        {subCategories.map((sc) => (
                            <option key={sc.id} value={sc.id}>
                                {sc.name}
                            </option>
                        ))}
                    </select>

                    {/* Attribute Dropdown */}
                    <select
                        name="attribute_id"
                        className="form-select mb-2"
                        value={form.attribute_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Attribute</option>
                        {attributes.map((attr) => (
                            <option key={attr.id} value={attr.id}>
                                {attr.label}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="label"
                        className="form-control mb-2"
                        placeholder="Label (optional)"
                        value={form.label}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="placeholder"
                        className="form-control mb-2"
                        placeholder="Placeholder"
                        value={form.placeholder}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="order"
                        className="form-control mb-2"
                        value={form.order}
                        onChange={handleChange}
                    />

                    <div className="form-check">
                        <input
                            type="checkbox"
                            name="is_required"
                            className="form-check-input"
                            checked={form.is_required}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Required</label>
                    </div>

                    <div className="form-check mb-2">
                        <input
                            type="checkbox"
                            name="show_in_filter"
                            className="form-check-input"
                            checked={form.show_in_filter}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Show in Filter</label>
                    </div>

                    <button className="btn btn-primary">
                        {editId ? "Update" : "Add"}
                    </button>
                </form>

                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Sub Category</th>
                            <th>Attribute</th>
                            <th>Label</th>
                            <th>Placeholder</th>
                            <th>Order</th>
                            <th>Required</th>
                            <th>In Filter</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subCategoryAttributes.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{subCategoryMap[item.sub_category_id]}</td>
                                <td>{attributeMap[item.attribute_id]}</td>
                                <td>{item.label}</td>
                                <td>{item.placeholder ?? "NO"}</td>
                                <td>{item.order}</td>
                                <td>{item.is_required ? "Yes" : "NO"}</td>
                                <td>{item.show_in_filter ? "Yes" : "NO"}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminDashboardLayout>
    );
}