# 📝 Task Manager — Full-Stack MERN App

A secure, full-featured task management app built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, log in, and manage their personal tasks in a clean, responsive interface.

> 🔐 Built with authentication, protected routes, and deployed entirely on free-tier infrastructure.

---

## 🌐 Live Demo

- **Frontend**: [task-manager-frontend-dexd.onrender.com](https://task-manager-frontend-dexd.onrender.com)
- **Backend**: [task-manager-backend-kxmy.onrender.com](https://task-manager-backend-kxmy.onrender.com/api/health)

---

## 🚀 Tech Stack

| Layer     | Technology               | Hosting         |
|-----------|--------------------------|------------------|
| Frontend  | React (Vite)             | Render (Static Site) |
| Backend   | Node.js + Express        | Render (Web Service) |
| Database  | MongoDB Atlas            | Free 512MB Cluster |
| Auth      | JWT + httpOnly Cookies   | Built-in         |

---

## 🔐 Features

### ✅ Authentication
- Register, login, logout
- JWT stored in secure, httpOnly cookies
- Protected routes (tasks only accessible when logged in)

### ✅ Task Management (CRUD)
- Create, read, update, delete tasks
- Mark tasks as complete
- Real-time updates after actions

### ✅ UI/UX
- Responsive design (mobile + desktop)
- Error handling and loading states
- Clean, minimal interface

---

## 🧠 Architecture Overview

task-manager/ 
├── task-manager-backend/ 
│ ├── models/ # Mongoose schemas (User, Task) 
│ ├── routes/ # Auth and Task routes 
│ ├── middleware/ # JWT auth middleware 
│ └── server.js # Express app entry point 
└── task-manager-frontend/ 
├── src/ 
│ ├── components/ # Login, Register, TaskList 
│ ├── context/ # AuthContext for global state 
│ ├── api/ # Axios instance with interceptors 
│ └── App.jsx # React Router setup



---

## ⚙️ Environment Variables

### Backend (`task-manager-backend/.env`)
MONGODB_URI=your_mongo_uri JWT_SECRET=your_jwt_secret NODE_ENV=production


### Frontend (`task-manager-frontend/.env`)
VITE_API_URL=https://task-manager-backend-kxmy.onrender.com


---

## 🧪 API Endpoints

### Auth
- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – Log in
- `POST /api/auth/logout` – Log out
- `GET /api/auth/verify` – Verify session

### Tasks (Protected)
- `GET /api/tasks` – Get all tasks
- `POST /api/tasks` – Create task
- `PUT /api/tasks/:id` – Update task
- `DELETE /api/tasks/:id` – Delete task

---

## 🛡 Security Highlights

- `helmet` for secure HTTP headers
- `express-validator` for input validation
- `express-rate-limit` to prevent brute-force attacks
- `cors` configured for cross-origin cookie auth
- JWT stored in `httpOnly`, `Secure`, `SameSite=None` cookies

---

## 📦 Deployment Notes

- MongoDB Atlas IP whitelist includes Render static IPs
- Backend and frontend deployed from a monorepo
- CORS and cookies configured for cross-origin auth

---

## 📌 Future Enhancements

- Task filtering (all, active, completed)
- Due dates and priority levels
- Toast notifications (e.g., task added/deleted)
- Drag-and-drop task reordering
- Dark mode toggle

---

## 👨‍💻 Author

**Irfan Alkan**  
Passionate about building secure, scalable full-stack applications.  
[GitHub](https://github.com/irfanalkan23)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

