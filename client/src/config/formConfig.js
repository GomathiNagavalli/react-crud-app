// This file controls the form fields. 
// To add a new field, simply add a new object to this array.
// No changes are needed in the React components.

export const formFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    placeholder: "Enter first name",
    className: "col-md-6" 
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    placeholder: "Enter last name",
    className: "col-md-6"
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "Enter email",
    validationPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    validationMessage: "Please enter a valid email address.",
    className: "col-12"
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
    placeholder: "Enter phone number",
    className: "col-12"
  }
];
