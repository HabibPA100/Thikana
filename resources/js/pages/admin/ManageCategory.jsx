import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

export default function ManageCategory() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/admin/categories")
            setCategories(res.data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { name, slug };

        try {
            if (editId) {
                await api.put(`/admin/categories/${editId}`, payload);
            } else {
                await api.post("/admin/categories", payload);
            }

            setName("");
            setSlug("");
            setEditId(null);
            fetchCategories();
        } catch (err) {
            console.error("Error saving category:", err);
        }
    };

    const handleEdit = (category) => {
        setName(category.name);
        setSlug(category.slug);
        setEditId(category.id);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure to delete this category?")) {
            try {
                await api.delete(`/admin/categories/${id}`);
                fetchCategories();
            } catch (err) {
                console.error("Error deleting category:", err);
            }
        }
    };

    return (
        <AdminDashboardLayout>
            <div className="container mt-5">
                <h2 className="mb-4">Manage Categories</h2>

                <form className="mb-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        {editId ? "Update" : "Add"}
                    </button>
                </form>

                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.name}</td>
                                <td>{cat.slug}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => handleEdit(cat)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(cat.id)}
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