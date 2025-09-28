import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../api";
import { Eye, EyeOff } from "lucide-react";

const Register: React.FC = () => {
  const location = useLocation();
  const { showLoading } = location.state || { showLoading: false };
  const [loadingScreen, setLoadingScreen] = useState(showLoading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loadingScreen) setLoadingScreen(false);
  }, [loadingScreen]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile)) {
      setError("Mobile number must be 10 digits");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await api.post("/auth/register", { name, email, mobile, password });
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (loadingScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-pink-100">
      <form
        onSubmit={handleRegister}
        className="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-green-100"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-green-600 tracking-tight drop-shadow-md">
          Register
        </h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Mobile Number
        </label>
        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          pattern="^\d{10}$"
          maxLength={10}
          required
        />

        {/* Password field */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password (min 6 chars)
        </label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 transition"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm password field */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative mb-5">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 transition"
            tabIndex={-1}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded-lg font-semibold text-lg shadow-sm transition-all duration-200
            ${loading
              ? "bg-green-200 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 active:scale-95"
            }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {error && (
          <p className="text-red-500 mt-3 text-center text-sm font-medium animate-pulse">
            {error}
          </p>
        )}

        <div className="mt-6 text-sm text-center">
          <span className="text-gray-600">Already have an account? </span>
          <a
            href="/login"
            className="text-blue-600 font-semibold underline underline-offset-2 hover:text-blue-700 transition"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;