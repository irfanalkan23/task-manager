# Task Manager (Full-Stack)
- Backend: Node.js + Express + MongoDB
- Frontend: React + Vite





The Personal Task Manager with Authentication is a full-stack project. 
Here's a step-by-step breakdown of how to build it using a MERN stack (MongoDB, Express, React, Node.js) with JWT authentication—all free!

# 🔨 Tech Stack (100% Free)
Layer	Technology	Free Hosting Option
Frontend	React (Vite)	Vercel / Netlify
Backend	Node.js + Express	Railway / Render
Database	MongoDB Atlas	Free 512MB cluster
Auth	JWT (JSON Web Tokens)	Built into backend

📝 Features to Implement
User Authentication
- Sign up, login, logout
- Protected routes (only logged-in users can access tasks)
- JWT token storage (httpOnly cookies or localStorage)

Task Management (CRUD)
- Create, read, update, delete tasks
- Mark tasks as complete
- Filter tasks (all, active, completed)
- Due dates & priority levels (optional)

UI/UX
- Responsive design (works on mobile & desktop)
- Loading & error states
- Toast notifications (e.g., "Task deleted!")

🚀 Step-by-Step Implementation Plan
1️⃣ Set Up the Backend (Node.js + Express + MongoDB)

mkdir task-manager-backend
cd task-manager-backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv

Folder Structure:

/backend
  ├── models/ (Mongoose models: User.js, Task.js)
  ├── controllers/ (authController.js, taskController.js)
  ├── routes/ (authRoutes.js, taskRoutes.js)
  ├── middleware/ (authMiddleware.js for JWT verification)
  ├── .env (store secrets like MongoDB URI, JWT_SECRET)
  └── server.js (main entry point)

Key Endpoints:
# Auth
POST /api/auth/register   # Create a new user
POST /api/auth/login      # Log in & get JWT token
# Tasks (protected routes)
GET    /api/tasks         # Get all tasks for user
POST   /api/tasks         # Create a new task
PUT    /api/tasks/:id     # Update a task
DELETE /api/tasks/:id     # Delete a task

2️⃣ Set Up the Frontend (React + Vite)

npm create vite@latest task-manager-frontend --template react
cd task-manager-frontend
npm install axios react-router-dom @heroicons/react

Folder Structure:

/frontend
  ├── src/
  │   ├── components/ (TaskList.js, TaskForm.js, Navbar.js)
  │   ├── pages/ (Login.js, Register.js, Dashboard.js)
  │   ├── context/ (AuthContext.js for global state)
  │   ├── hooks/ (useAuth.js, useTasks.js)
  │   ├── App.js (routes)
  │   └── main.jsx (entry)
  └── vite.config.js

Key Frontend Logic:
- Use axios to call the backend API.
- Store JWT in localStorage or cookies.
- Protect routes (e.g., redirect to /login if not authenticated).
- Use useContext or Zustand for state management.

3️⃣ Connect Frontend to Backend
In axios, set the base URL:

// src/api/axios.js
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change in production
});

// Add JWT to headers if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

4️⃣ Deploy (Free!)
Database: Set up a free MongoDB Atlas cluster. https://www.mongodb.com/atlas/database
Backend: Deploy to Railway https://railway.app/ or Render https://render.com/.
Frontend: Deploy to Vercel https://vercel.com/ or Netlify https://www.netlify.com/.