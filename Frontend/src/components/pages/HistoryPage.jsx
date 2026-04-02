import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchHistory } from "../../services/api";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Quiz History — Never Mind";
    fetchHistory(20)
      .then((data) => { setHistory(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
    return () => { document.title = "Never Mind — Career Intelligence"; };
  }, []);

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
      <nav className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted text-xs sm:text-sm hover:text-text transition-colors duration-200">
            <img src="/logo.png" alt="" className="h-5 sm:h-6 w-auto opacity-60" />
            <span>Never Mind</span>
          </button>
          <button onClick={() => navigate("/quiz")} className="bg-text text-bg px-3 sm:px-5 py-2 rounded-[10px] text-xs sm:text-sm font-medium active:scale-[0.98] transition-transform duration-200">
            New Quiz
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6 sm:mb-10">
          <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-tight mb-2">Quiz History</h1>
          <p className="text-muted text-xs sm:text-sm">Your past quiz attempts and results from this device.</p>
        </motion.div>

        {error && (
          <div className="p-4 rounded-[14px] bg-surface border border-border mb-6">
            <p className="text-muted text-sm">{error}</p>
          </div>
        )}

        {history.length === 0 && !error ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-muted text-sm mb-6">No quiz attempts yet.</p>
            <button onClick={() => navigate("/quiz")} className="bg-text text-bg px-6 py-2.5 rounded-[10px] text-sm font-medium">
              Take Your First Quiz
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {history.map((attempt, idx) => (
              <motion.div
                key={attempt.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.25 }}
                className="p-4 sm:p-5 rounded-[12px] sm:rounded-[14px] bg-surface border border-border hover:border-muted active:scale-[0.99] transition-all duration-200 cursor-pointer"
                onClick={() => {
                  if (attempt.results && attempt.skills) {
                    navigate("/results", {
                      state: {
                        result: {
                          quiz_id: attempt.id,
                          skills: attempt.skills,
                          top_careers: attempt.results,
                          insight: attempt.insight || "",
                          skill_summary: Object.entries(attempt.skills || {}).map(([skill, score]) => ({
                            skill, score,
                            level: score >= 0.75 ? "Advanced" : score >= 0.4 ? "Intermediate" : score >= 0.15 ? "Beginner" : "Novice"
                          })).sort((a, b) => b.score - a.score),
                        },
                      },
                    });
                  }
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-muted text-xs font-mono">#{attempt.id}</span>
                    <span className="text-text font-medium">{attempt.top_career || "—"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {attempt.confidence && (
                      <span className="text-muted text-sm">{(attempt.confidence * 100).toFixed(1)}%</span>
                    )}
                    <span className="text-muted text-sm">→</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted text-xs">
                    {new Date(attempt.created_at).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                  <span className="text-muted text-xs">{attempt.answers_count} questions answered</span>
                </div>

                {/* Mini skill bars */}
                {attempt.skills && (
                  <div className="flex gap-0.5 mt-3">
                    {Object.entries(attempt.skills).sort((a, b) => b[1] - a[1]).map(([skill, score]) => (
                      <div key={skill} className="flex-1 h-1 bg-border/40 rounded-full overflow-hidden" title={`${skill}: ${Math.round(score * 100)}%`}>
                        <div className="h-full rounded-full bg-white/20" style={{ width: `${score * 100}%` }} />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
