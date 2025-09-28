import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Dashboard from "./pages/HomePage";

const App: React.FC = () => {
  const [token, setToken] = useState<string | undefined>(undefined);

  console.log(token)

  // Read token from localStorage on mount
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    setToken(userStr ? JSON.parse(userStr).token : undefined);
  }, []);

  return (
    <Router>
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
    </Router>
  );
};

export default App;
