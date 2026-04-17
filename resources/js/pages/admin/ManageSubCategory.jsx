import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

export default function ManageSubCategory() {

    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        category_id: "",
        name: "",
    });

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const [subRes, catRes] = await Promise.all([
                api.get("/admin/sub-categories"),
                api.get("/admin/categories"),
            ]);

            setSubCategories(subRes.data);
            setCategories(catRes.data);

        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            category_id: Number(form.category_id),
            name: form.name,
        };

        try {
            if (editId) {
                await api.put(`/admin/sub-categories/${editId}`, payload);
            } else {
                await api.post("/admin/sub-categories", payload);
            }

            setForm({ category_id: "", name: "" });
            setEditId(null);
            fetchAll();

        } catch (err) {
            console.error("Error:", err.response?.data);
        }
    };

    const handleEdit = (item) => {
        setForm({
            category_id: item.category_id,
            name: item.name,
        });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure?")) {
            await api.delete(`/admin/sub-categories/${id}`);
            fetchAll();
        }
    };

    return (
        <AdminDashboardLayout>
            <div className="container mt-5">
                <h2>Manage Sub Categories</h2>

                <form onSubmit={handleSubmit} className="mb-4">

                    {/* Category Dropdown */}
                    <select
                        name="category_id"
                        className="form-select mb-2"
                        value={form.category_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        className="form-control mb-2"
                        placeholder="Sub Category Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <button className="btn btn-primary">
                        {editId ? "Update" : "Add"}
                    </button>
                </form>

                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subCategories.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.category?.name}</td>
                                <td>{item.name}</td>
                                <td>{item.slug}</td>
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