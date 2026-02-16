import React, { useState, useEffect } from 'react';
import { formFields } from '../config/formConfig';

const UserForm = ({ onSubmit, initialData = null, onCancel, isSubmitting }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    // Initialize form data when initialData changes (for editing) or reset for new
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            // Reset form for create mode
            const initial = {};
            formFields.forEach(field => {
                initial[field.name] = '';
            });
            setFormData(initial);
        }
        setErrors({});
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        formFields.forEach(field => {
            // Required check
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required.`;
                isValid = false;
            }
            // Pattern check (e.g. Email)
            else if (field.validationPattern && formData[field.name]) {
                if (!field.validationPattern.test(formData[field.name])) {
                    newErrors[field.name] = field.validationMessage || `Invalid ${field.label}`;
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{initialData ? 'Edit User' : 'Add New User'}</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        {/* 
              Dynamically render fields based on config
              This makes it Extensible as per requirement #4 
            */}
                        {formFields.map((field) => (
                            <div key={field.name} className={field.className || "col-12"}>
                                <label htmlFor={field.name} className="form-label">
                                    {field.label} {field.required && <span className="text-danger">*</span>}
                                </label>
                                <input
                                    type={field.type}
                                    className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                />
                                {errors[field.name] && (
                                    <div className="invalid-feedback">
                                        {errors[field.name]}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-end mt-4 gap-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : (initialData ? 'Update User' : 'Create User')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
