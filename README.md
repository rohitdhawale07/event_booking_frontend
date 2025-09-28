# 🎉 Event Management System

This project is a **full-stack Event Management system** with:
- A **React.js (TypeScript) frontend** for users and admins.
- A **Node.js + Express + MongoDB backend** with JWT authentication.

Users can **register, log in, book events, and manage their bookings**.  
Admins can **create, edit, delete events, and view all bookings**.

---

# 🖥️ Frontend

## 🚀 Tech Stack
- ⚛️ React.js (with TypeScript)
- 📦 Vite (or CRA depending on setup)
- 🎨 Tailwind CSS
- 🔄 React Router DOM
- 🔑 JWT Authentication
- ⚡ Axios (for API calls)

---

## 📂 Project Structure
```bash
frontend/
│── src/
│ ├── api/ # Axios instance & API helpers
│ ├── components/ # Reusable UI components
│ ├── pages/ # Login, Register, Dashboard, Events
│ ├── App.tsx # Root component with routes
│ └── main.tsx # Entry point
│── public/ # Static assets
│── package.json # Dependencies & scripts
```

---

## ⚙️ Setup & Installation

### Clone the repo
```bash
git clone https://github.com/rohitdhawale07/event_booking_frontend.git
cd event_booking_frontend
```

### Install dependencies
```bash
npm install
```
### Configure environment variables
Create a .env file in the frontend root:
```bash
VITE_API_URL=http://localhost:5000/api
```

### Run the development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```
### Preview production build
```bash
npm run preview
```

### 🔑 Authentication Flow
- User logs in → gets JWT token from backend.
- Token stored in localStorage.
- Protected routes (/dashboard) check token.
- Logout clears token.

### 📸 Demo Credentials
- Admin
Email: admin@gmail.com
Password: admin123

### 📦 Deployment
- Use Vercel / Netlify / Railway for hosting.
- Make sure .env.production has the correct backend API URL.


