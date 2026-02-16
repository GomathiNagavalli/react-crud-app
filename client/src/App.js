import React, { useState, useEffect } from 'react';
import userService from './services/api';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
// Bootstrap CSS is imported in index.js or via CDN in index.html, handled in setup

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState('list'); // 'list' | 'form'
    const [editingUser, setEditingUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch Users on Load
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getAll();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch users. Please make sure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handler for Edit Button
    const handleEdit = (user) => {
        setEditingUser(user);
        setView('form');
    };

    // Handler for Delete Button
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await userService.delete(id);
                setUsers(users.filter(u => u.id !== id));
            } catch (err) {
                alert('Failed to delete user.');
            }
        }
    };

    // Switch to Create Mode
    const handleAddNew = () => {
        setEditingUser(null);
        setView('form');
    };

    // Form Submission
    const handleFormSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            if (editingUser) {
                // Update Mode
                const updated = await userService.update(editingUser.id, formData);
                setUsers(users.map(u => (u.id === editingUser.id ? updated : u)));
            } else {
                // Create Mode
                const created = await userService.create(formData);
                setUsers([...users, created]);
            }
            setView('list'); // Go back to list
        } catch (err) {
            alert('Operation failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Cancel Form
    const handleCancel = () => {
        setView('list');
        setEditingUser(null);
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">User Management</h1>
                {view === 'list' && (
                    <button className="btn btn-primary" onClick={handleAddNew}>
                        <i className="bi bi-plus-lg"></i> Add User
                    </button>
                )}
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {view === 'list' ? (
                        <UserTable
                            users={users}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ) : (
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6">
                                <UserForm
                                    initialData={editingUser}
                                    onSubmit={handleFormSubmit}
                                    onCancel={handleCancel}
                                    isSubmitting={isSubmitting}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
