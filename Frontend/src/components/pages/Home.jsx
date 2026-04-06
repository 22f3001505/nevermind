import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { checkHealth, fetchStats } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const [health, setHealth] = useState(null);
  const [stats, setStats] = useState(null);
  const [waking, setWaking] = useState(false);

  useEffect(() => {
    setWaking(true);
    checkHealth()
      .then((h) => { setHealth(h); setWaking(false); })
      .catch(() => {
        setWaking(false);
        setHealth({ connected: false });
      });
    fetchStats().then(setStats).catch(() => {});
  }, []);

  const steps = [
    { num: "01", title: "Take the Quiz", desc: "Answer 20 skill-based questions across programming, design, and systems." },
    { num: "02", title: "ML Analysis", desc: "Our RandomForest + GradientBoosting ensemble maps your skills to 10 dimensions." },
    { num: "03", title: "Career Match", desc: "Get ranked predictions across 15 IT careers with confidence scores." },
    { num: "04", title: "Your Roadmap", desc: "Receive a personalized learning path with skill gap analysis and timelines." },
  ];

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border sticky top-0 bg-bg/80 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/logo.png" alt="Never Mind" className="h-7 sm:h-8 w-auto" />
            <span className="text-base sm:text-lg font-semibold tracking-tight">Never Mind</span>
            {/* Connectivity indicator */}
            {waking && (
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" title="Waking up server..." />
            )}
            {!waking && health && (
              <span className={`w-2 h-2 rounded-full ${health.connected ? "bg-green-400" : "bg-red-400"} animate-pulse`} title={health.connected ? "Engine Connected" : "Engine Offline"} />
            )}
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <button onClick={() => navigate("/history")} className="text-muted text-xs sm:text-sm hover:text-text transition-colors duration-200">History</button>
            <button onClick={() => navigate("/careers")} className="text-muted text-xs sm:text-sm hover:text-text transition-colors duration-200">Careers</button>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted hidden sm:inline">{user?.username}</span>
                <button onClick={logout} className="text-muted text-xs sm:text-sm hover:text-red-400 transition-colors duration-200">Logout</button>
              </div>
            ) : (
              <button onClick={() => navigate("/auth")} className="text-muted text-xs sm:text-sm hover:text-text transition-colors duration-200">Login</button>
            )}
            <button onClick={() => navigate("/quiz")} className="bg-text text-bg px-3 sm:px-5 py-2 rounded-[10px] text-xs sm:text-sm font-medium hover:scale-[1.02] transition-transform duration-200">Start Quiz</button>
          </div>
        </div>
      </nav>

      {/* Server waking banner */}
      {waking && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-[#0A0A0A] border-b border-border"
        >
          <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2">
            <div className="w-3 h-3 border border-yellow-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-yellow-400/80 text-xs">Waking up AI engine... first load takes ~30s</span>
          </div>
        </motion.div>
      )}

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
            <img src="/logo.png" alt="Never Mind" className="h-12 sm:h-16 w-auto mx-auto mb-6 sm:mb-10 opacity-80" />
            <h1 className="text-[32px] sm:text-[48px] font-bold leading-[1.1] tracking-tight mb-4 sm:mb-5">Never Mind build yourself,<br />I will help.</h1>
            <p className="text-muted text-base sm:text-xl leading-relaxed mb-8 sm:mb-12 max-w-lg mx-auto px-2">
              Take a 20-question quiz. Our ML engine analyzes your skills
              across 10 dimensions and maps your ideal career path in IT.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/quiz")} className="bg-text text-bg px-8 py-3.5 rounded-[10px] text-base font-medium transition-transform duration-200">
                Start Career Quiz
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/careers")} className="bg-transparent text-text px-8 py-3.5 rounded-[10px] text-base font-medium border border-border hover:border-muted transition-colors duration-200">
                Explore 15 Careers
              </motion.button>
            </div>
          </motion.div>

          {/* Live Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }} className="mt-12 sm:mt-20 grid grid-cols-2 sm:flex sm:justify-center gap-6 sm:gap-12">
            {[
              { value: "15", label: "Careers" },
              { value: "20", label: "Questions" },
              { value: "10", label: "Dimensions" },
              { value: stats?.total_quizzes || "0", label: "Quizzes Taken" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xl sm:text-2xl font-semibold text-text">{stat.value}</p>
                <p className="text-muted text-[10px] sm:text-xs mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight text-center mb-8 sm:mb-12">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {steps.map((step, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.3 }} className="p-4 sm:p-5 rounded-[14px] bg-surface border border-border hover:border-muted transition-colors duration-200">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="text-muted text-xs font-mono mt-0.5">{step.num}</span>
                    <div>
                      <h3 className="text-text font-medium text-sm sm:text-base mb-1 sm:mb-1.5">{step.title}</h3>
                      <p className="text-muted text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-muted text-[10px] sm:text-xs uppercase tracking-widest">
            {["Django 5", "React 18", "RandomForest", "GradientBoosting", "Scikit-learn", "SQLite", "Cloud AI"].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between">
          <p className="text-muted text-[10px] sm:text-xs">Never Mind — Clarity Engine v2.0</p>
          <p className="text-muted text-[10px] sm:text-xs">{health?.connected ? "🟢 Online" : waking ? "⏳ Waking..." : "🔴 Offline"}</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
