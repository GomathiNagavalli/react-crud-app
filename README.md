# React User Management System

## Project Overview

This project is a modular, scalable React application designed to manage user data through Create, Read, Update, and Delete (CRUD) operations. It features a configuration-driven architecture that allows for rapid UI scaling without modifying core component logic. The application is styled with Bootstrap for a responsive, professional interface and includes a serverless backend implementation for deployment on Vercel.

## Key Features

1.  **Configuration-Driven Form Architecture**
    *   One of the core design patterns used in this project is the abstraction of form structure into a configuration file (`formConfig.js`).
    *   This allows developers to add, remove, or modify form fields (e.g., adding "Date of Birth" or "Job Title") simply by updating a JSON object. The form component dynamically renders inputs based on this configuration, adhering to the Open-Closed Principle (open for extension, closed for modification).

2.  **Serverless Architecture**
    *   The backend is implemented using Node.js serverless functions (Vercel Functions).
    *   This eliminates the need for managing a traditional server process and ensures high availability and scalability.

3.  **Responsive UI**
    *   Built with Bootstrap 5, ensuring the application is fully responsive across desktop, tablet, and mobile devices.
    *   Includes loading states, error handling, and form validation for an optimal user experience.

## Technology Stack

*   **Frontend**: React (Hooks, Functional Components)
*   **Styling**: Bootstrap 5
*   **HTTP Client**: Axios
*   **Backend**: Node.js (Serverless Functions)
*   **Deployment**: Vercel

## Project Structure

*   **/client**: Contains the React frontend application.
    *   **/src/config**: Contains `formConfig.js`, the single source of truth for form definitions.
    *   **/src/components**: Reusable UI components (`UserForm`, `UserTable`).
    *   **/src/services**: API abstraction layer using Axios.
*   **/api**: Contains the backend serverless function logic.

## Setup and Installation

### Prerequisites
*   Node.js (v14 or higher)
*   npm (Node Package Manager)

### Local Development

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd react-crud-app
    ```

2.  **Install Dependencies**
    Navigate to the project root and install dependencies. Note that typically you would install for both client and a server, but for Vercel development:
    ```bash
    npm install -g vercel
    cd client
    npm install
    ```

3.  **Run Locally (Frontend Only)**
    To run the React application in isolation:
    ```bash
    npm start
    ```
    The application will run at `http://localhost:3000`.

4.  **Run with Backend (Vercel CLI)**
    To run the full stack (Frontend + Serverless Functions) locally:
    ```bash
    # From the project root
    vercel dev
    ```

## Functionality Breakdown

### Extensibility Example
To demonstrate the system's extensibility, a new field can be added by modifying `client/src/config/formConfig.js`.

**Current Config:**
```javascript
{
  name: "firstName",
  label: "First Name",
  type: "text",
  required: true
}
```

**Adding a Date of Birth Field:**
Simply append the following object to the array:
```javascript
{
  name: "dob",
  label: "Date of Birth",
  type: "date",
  required: true,
  className: "col-md-6"
}
```
The application will automatically render the new field, handle its state, validation, and submission without any changes to `UserForm.js`.

### API Endpoints
The backend provides a RESTful interface at `/api/users`:
*   **GET** `/api/users`: Retrieve all users.
*   **GET** `/api/users?id={id}`: Retrieve a specific user.
*   **POST** `/api/users`: Create a new user.
*   **PUT** `/api/users?id={id}`: Update an existing user.
*   **DELETE** `/api/users?id={id}`: Delete a user.

## Note on Data Persistence
This project uses an in-memory data store within the serverless function for demonstration purposes. In a production environment, the `api/users.js` file would be updated to connect to a persistent database such as MongoDB or PostgreSQL. The current implementation resets data when the serverless function cold-starts.

## Deployment
This project is configured for seamless deployment on Vercel.
1.  Push the code to a Git repository.
2.  Import the project into Vercel.
3.  Vercel will detect the configuration and deploy both the React frontend and the serverless functions automatically.
