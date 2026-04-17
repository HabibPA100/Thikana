import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

export default function ManageAttribute() {
    const [attributes, setAttributes] = useState([]);
    const [editId, setEditId] = useState(null);

    const initialForm = {
        name: "",
        label: "",
        type: "text",
        group_name: "",
        placeholder: "",
        css_class: "",
        order: 0,
        is_required: false,
        is_filterable: false,
        is_searchable: false,
        options: [],
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        fetchAttributes();
    }, []);

    const fetchAttributes = async () => {
        const res = await api.get("/admin/attributes");
        setAttributes(res.data);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // ✅ FIXED SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                name: form.name,
                label: form.label,
                type: form.type,
                group_name: form.group_name,
                placeholder: form.placeholder,
                css_class: form.css_class,
                order: Number(form.order) || 0,
                is_required: form.is_required,
                is_filterable: form.is_filterable,
                is_searchable: form.is_searchable,
                options: form.options,
            };

            if (editId) {
                // ✅ UPDATE
                await api.put(`/admin/attributes/${editId}`, payload);
            } else {
                // ✅ CREATE
                await api.post("/admin/attributes", payload);
            }

            fetchAttributes();

            // ✅ RESET FORM
            setForm(initialForm);
            setEditId(null);

        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
        }
    };

    const handleEdit = (attr) => {
        setForm({
            name: attr.name,
            label: attr.label,
            type: attr.type,
            group_name: attr.group_name || "",
            placeholder: attr.placeholder || "",
            css_class: attr.css_class || "",
            order: attr.order,
            is_required: attr.is_required,
            is_filterable: attr.is_filterable,
            is_searchable: attr.is_searchable,
            options: attr.options || [],
        });

        setEditId(attr.id);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure to delete?")) {
            await api.delete(`/admin/attributes/${id}`);
            fetchAttributes();
        }
    };

    // ✅ Cancel Edit Button
    const handleCancel = () => {
        setForm(initialForm);
        setEditId(null);
    };

    return (
        <AdminDashboardLayout>
            <div className="container mt-5">
                <h2>Manage Attributes</h2>

                <form className="mb-4" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Internal Name"
                        className="form-control mb-2"
                        value={form.name} onChange={handleChange} required />

                    <input type="text" name="label" placeholder="Label"
                        className="form-control mb-2"
                        value={form.label} onChange={handleChange} required />

                    <select name="type" className="form-select mb-2"
                        value={form.type} onChange={handleChange}>
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="select">Select</option>
                        <option value="checkbox">Checkbox</option>
                    </select>

                    <input type="text" name="group_name" placeholder="Group Name"
                        className="form-control mb-2"
                        value={form.group_name} onChange={handleChange} />

                    <input type="text" name="placeholder" placeholder="Placeholder"
                        className="form-control mb-2"
                        value={form.placeholder} onChange={handleChange} />

                    <input type="text" name="css_class" placeholder="CSS Class"
                        className="form-control mb-2"
                        value={form.css_class} onChange={handleChange} />

                    <input type="number" name="order" placeholder="Order"
                        className="form-control mb-2"
                        value={form.order} onChange={handleChange} />

                    <div className="form-check mb-2">
                        <input type="checkbox" name="is_required"
                            className="form-check-input"
                            checked={form.is_required}
                            onChange={handleChange} />
                        <label className="form-check-label">Is Required</label>
                    </div>

                    <div className="form-check mb-2">
                        <input type="checkbox" name="is_filterable"
                            className="form-check-input"
                            checked={form.is_filterable}
                            onChange={handleChange} />
                        <label className="form-check-label">Is Filterable</label>
                    </div>

                    <div className="form-check mb-2">
                        <input type="checkbox" name="is_searchable"
                            className="form-check-input"
                            checked={form.is_searchable}
                            onChange={handleChange} />
                        <label className="form-check-label">Is Searchable</label>
                    </div>

                    <button className="btn btn-primary me-2" type="submit">
                        {editId ? "Update" : "Add"}
                    </button>

                    {editId && (
                        <button type="button" className="btn btn-secondary"
                            onClick={handleCancel}>
                            Cancel
                        </button>
                    )}
                </form>

                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Label</th>
                            <th>Type</th>
                            <th>Group</th>
                            <th>Order</th>
                            <th>Required</th>
                            <th>Filterable</th>
                            <th>Searchable</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attributes.map((attr) => (
                            <tr key={attr.id}>
                                <td>{attr.id}</td>
                                <td>{attr.name}</td>
                                <td>{attr.label}</td>
                                <td>{attr.type}</td>
                                <td>{attr.group_name}</td>
                                <td>{attr.order}</td>
                                <td>{attr.is_required ? "Yes" : "No"}</td>
                                <td>{attr.is_filterable ? "Yes" : "No"}</td>
                                <td>{attr.is_searchable ? "Yes" : "No"}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(attr)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(attr.id)}>
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