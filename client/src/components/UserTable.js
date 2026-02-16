import React from 'react';
import { formFields } from '../config/formConfig';

const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <div className="card shadow-sm">
            <div className="card-header bg-white">
                <h5 className="mb-0 text-secondary">User Directory</h5>
            </div>
            <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                    <thead className="table-light">
                        <tr>
                            {/* Dynamically render headers based on config if desired, or hardcode for layout control. 
                  Here filtering config to ensure we show main fields. 
              */}
                            {formFields.map(field => (
                                <th key={field.name}>{field.label}</th>
                            ))}
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={formFields.length + 1} className="text-center py-4 text-muted">
                                    No users found. Click "Add User" to create one.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id}>
                                    {formFields.map(field => (
                                        <td key={`${user.id}-${field.name}`}>
                                            {user[field.name]}
                                        </td>
                                    ))}
                                    <td className="text-end">
                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => onEdit(user)}
                                        >
                                            <i className="bi bi-pencil"></i> Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => onDelete(user.id)}
                                        >
                                            <i className="bi bi-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
