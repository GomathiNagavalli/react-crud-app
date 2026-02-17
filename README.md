# React Vercel CRUD App

A production-ready User Management application configured for Vercel deployment.
This project uses React for the frontend and Vercel Serverless Functions for the API.

## 🚀 Features

- **Real API**: Uses Node.js built on Vercel Functions.
- **Config-Driven UI**: Forms are generated dynamically.
- **Vercel Ready**: Configured for immediate deployment.

## ⚠️ Data Persistence Warning

The "Database" is currently **in-memory** for demonstration purposes.
Because Vercel functions are serverless and ephemeral, **all data will be lost** when the function restarts or redeploys.
To make this persistent, edit `api/users.js` to connect to a real database like **MongoDB Atlas**, **Supabase**, or **Vercel Postgres**.

## 📂 Folder Structure

```
react-crud-app/
├── api/                # Serverless Backend
│   └── users.js        # API Logic
├── client/             # React Frontend
├── vercel.json         # Deployment Config
└── ...
```

## 🛠️ Deployment Steps (Vercel)

1. **Push to GitHub/GitLab/Bitbucket**.
   - Create a repo and push this entire folder.

2. **Import to Vercel**.
   - Go to Vercel Dashboard -> Add New Project.
   - Select your repository.
   - **Framework Preset**: Vercel should detect it automatically or leave default.
   - **Root Directory**: Leave as the project root (where vercel.json is).

3. **Deploy**.
   - Click deploy. Vercel will build the React app and set up the API functions.

4. **Test**.
   - Your app will be live at `https://your-project.vercel.app`.

## 💻 Local Development

To run this locally with the serverless functions, you need the **Vercel CLI**.

```bash
npm install -g vercel
vercel dev
```

Alternatively, you can run the React app alone (but API calls will fail unless you proxy manual server):
```bash
cd client
npm start
```
