import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && (window.location?.hostname === "localhost" || window.location?.hostname === "127.0.0.1") && window.location?.port === "5173"
    ? "http://localhost:8000/api"
    : "https://nevermind-api.onrender.com/api");

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login with JWT
        const res = await fetch(`${BASE_URL}/auth/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || data.error || "Login failed");
        
        // Get user profile
        const profileRes = await fetch(`${BASE_URL}/auth/profile/`, {
          headers: { Authorization: `Bearer ${data.access}` },
        });
        const profile = await profileRes.json();
        login(profile, { access: data.access, refresh: data.refresh });
      } else {
        // Signup
        const res = await fetch(`${BASE_URL}/auth/signup/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Signup failed");
        login(data.user, data.tokens);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-bold tracking-tight text-text">
            never<span className="text-white/40">mind</span>
          </h1>
          <p className="text-muted text-sm mt-2">
            {isLogin ? "Welcome back" : "Create your account"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-surface border border-border rounded-[16px] p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-muted uppercase tracking-wider mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-bg border border-border rounded-[10px] px-3.5 py-2.5 text-text text-sm focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Enter username"
                required
                autoComplete="username"
              />
            </div>

            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-xs text-muted uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-bg border border-border rounded-[10px] px-3.5 py-2.5 text-text text-sm focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs text-muted uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg border border-border rounded-[10px] px-3.5 py-2.5 text-text text-sm focus:outline-none focus:border-white/30 transition-colors"
                placeholder={isLogin ? "Enter password" : "Min 6 characters"}
                required
                minLength={isLogin ? 1 : 6}
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-[12px] bg-white text-black font-semibold text-sm hover:bg-white/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="8" />
                  </svg>
                  {isLogin ? "Signing in..." : "Creating account..."}
                </span>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-border text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="text-muted text-sm hover:text-text transition-colors"
            >
              {isLogin ? (
                <>Don't have an account? <span className="text-white font-medium">Sign up</span></>
              ) : (
                <>Already have an account? <span className="text-white font-medium">Sign in</span></>
              )}
            </button>
          </div>
        </div>

        {/* Skip */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="text-muted text-xs hover:text-text transition-colors"
          >
            Skip for now →
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
