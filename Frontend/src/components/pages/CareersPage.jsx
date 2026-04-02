import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchCareers } from "../../services/api";

const CareersPage = () => {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Careers — Never Mind";
    fetchCareers()
      .then((data) => { setCareers(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
    return () => { document.title = "Never Mind — Career Intelligence"; };
  }, []);

  const filtered = careers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-5 h-5 border-2 border-border border-t-text rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Nav */}
      <nav className="border-b border-border sticky top-0 bg-bg/80 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted text-xs sm:text-sm hover:text-text transition-colors duration-200">
            <img src="/logo.png" alt="" className="h-5 sm:h-6 w-auto opacity-60" />
            <span>Never Mind</span>
          </button>
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={() => navigate("/history")} className="text-muted text-xs sm:text-sm hover:text-text transition-colors duration-200">History</button>
            <button onClick={() => navigate("/quiz")} className="bg-text text-bg px-3 sm:px-5 py-2 rounded-[10px] text-xs sm:text-sm font-medium active:scale-[0.98] transition-transform duration-200">Start Quiz</button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header + Search */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6 sm:mb-8">
          <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-tight mb-2">Careers</h1>
          <p className="text-muted text-sm mb-6">
            {careers.length} IT career paths with salary data, growth outlook, and complete learning roadmaps.
          </p>
          <input
            type="text"
            placeholder="Search careers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-[10px] bg-surface border border-border text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-muted transition-colors duration-200"
          />
        </motion.div>

        {error && (
          <div className="p-4 rounded-[14px] bg-surface border border-border mb-6">
            <p className="text-muted text-sm mb-3">{error}</p>
            <button onClick={() => window.location.reload()} className="text-text text-sm border border-border px-4 py-2 rounded-[10px] hover:border-muted transition-colors duration-200">
              Retry
            </button>
          </div>
        )}

        {/* Career list */}
        <div className="space-y-2">
          {filtered.length === 0 && search && (
            <p className="text-muted text-sm text-center py-10">No careers matching "{search}"</p>
          )}
          {filtered.map((career, idx) => (
            <motion.div key={career.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03, duration: 0.25 }}>
              <button
                onClick={() => navigate(`/roadmap/${encodeURIComponent(career.name)}`)}
                className="w-full text-left p-3.5 sm:p-4 rounded-[12px] sm:rounded-[14px] bg-surface border border-border hover:border-muted active:scale-[0.99] transition-all duration-200 group"
              >
                <div className="flex items-start sm:items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text group-hover:text-text text-sm sm:text-[15px] mb-1">{career.name}</p>
                    <p className="text-muted text-xs sm:text-sm line-clamp-2">{career.description}</p>
                    {career.key_skills?.length > 0 && (
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2">
                        {career.key_skills.slice(0, 3).map((skill) => (
                          <span key={skill} className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-[6px] bg-border/50 text-muted">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 ml-2 sm:ml-4 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-muted text-xs">{career.avg_salary}</p>
                      <p className="text-muted/50 text-[10px]">{career.growth_outlook}</p>
                    </div>
                    <span className="text-muted text-sm group-hover:text-text transition-colors duration-200">→</span>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
