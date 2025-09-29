import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// lazy load pages
const Login = lazy(()=>import("./pages/LoginPage"))
const Register = lazy(()=>import("./pages/RegisterPage"))
const Dashboard = lazy(()=>import("./pages/HomePage"))

const App: React.FC = () => {
  // Initialize from localStorage immediately
  const [token, setToken] = useState<string | undefined>(() => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr).token : undefined;
  });

  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={(t) => setToken(t)} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
