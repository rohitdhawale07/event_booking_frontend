import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { Eye, EyeOff } from "lucide-react";

// Add props type
interface LoginProps {
  onLogin?: (token: string) => void; // optional callback
}

const Login: React.FC<LoginProps> = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register", { state: { showLoading: true } });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      // use res.token instead of res.data.token
      if (res.data && res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));

        // Notify App about the new token
        if (onLogin) onLogin(res.data.token);

        navigate("/dashboard");
      } else {
        setError("Login failed. No token received.");
      }
    } catch (err: any) {
      console.error("Login failed", err.message);
      setError(err.response?.error || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-blue-100"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600 tracking-tight drop-shadow-md">
          Login
        </h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded-lg font-semibold text-lg shadow-sm transition-all duration-200 
            ${loading
              ? "bg-blue-200 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:scale-95"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-red-500 mt-3 text-center text-sm font-medium animate-pulse">
            {error}
          </p>
        )}

        <div className="mt-6 text-sm text-center">
          <span className="text-gray-600">Don’t have an account? </span>
          <button
            type="button"
            onClick={goToRegister}
            className="text-green-600 font-semibold underline underline-offset-2 hover:text-green-700 transition"
          >
            Register
          </button>
        </div>
        {/* Admin Credentials */}
    <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm shadow-inner">
      <h3 className="text-center font-semibold text-gray-700 mb-3">
        Demo Credentials
      </h3>
      <div className="bg-white rounded-md p-3 border border-gray-200">
        <p className="font-medium text-green-600">Admin</p>
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> admin@gmail.com
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Password:</span> admin123
        </p>
      </div>
    </div>
      </form>
    </div>
  );
};

export default Login;