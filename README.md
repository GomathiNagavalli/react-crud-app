# React Configuration-Driven CRUD App

A production-ready User Management application built with React, Bootstrap, and JSON-Server.
This project features a fully configuration-driven form architecture, allowing developers to add new fields by simply modifying a config file.

##  Features

- **CRUD Operations**: Create, Read, Update, Delete users.
- **Config-Driven UI**: Forms are generated dynamically from `client/src/config/formConfig.js`.
- **Validation**: Built-in email and required field validation.
- **Responsive Design**: Mobile-friendly UI using Bootstrap 5.
- **Mock Backend**: RESTful API simulation using JSON-Server.

##  Folder Structure

```
react-crud-app/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── config/         # Form Configuration (EXTENSIBILITY)
│   │   ├── components/     # Reusable Components
│   │   ├── services/       # API Logic (Axios)
│   │   └── App.js          # Main Component
│   └── package.json
└── server/                 # Mock Backend
    ├── db.json             # Database
    └── package.json
```

##  Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm

### 1. Install Dependencies

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd ../client
npm install
```

### 2. Run the Application

**Step 1: Start the Backend (Port 5000)**
Open a terminal in the `server` folder:
```bash
npm start
```
*The API will run at http://localhost:5000/users*

**Step 2: Start the Frontend (Port 3000)**
Open a new terminal in the `client` folder:
```bash
npm start
```
*The app will open at http://localhost:3000*

## 🔧 Extensibility (How to add fields)

To add a new field (e.g., "Date of Birth"):
1. Open `client/src/config/formConfig.js`
2. Add a new object to the array:

```javascript
{
  name: "dob",
  label: "Date of Birth",
  type: "date",
  required: true,
  className: "col-md-6"
}
```
**No other code changes are required!** The form and table will automatically include the new field.

##  Deployment Instructions

### Deploying Frontend (Vercel/Netlify)
Note: Since `json-server` is a local mock database, it won't work on a static host like Vercel unless you deploy the backend separately (e.g., creating a real API or using a service like MockAPI.io).

**For Production Real API**:
1. Update `client/src/services/api.js` with your production API URL.
2. Run `npm run build` in the client folder.
3. Deploy the `build` folder.

**Vercel Steps:**
1. Push code to GitHub.
2. Import project in Vercel.
3. Set Root Directory to `client`.
4. Deploy.

---
**Built with  using React & Bootstrap**
