import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && (window.location?.hostname === "localhost" || window.location?.hostname === "127.0.0.1") && window.location?.port === "5173"
    ? "http://localhost:8000/api"
    : "https://nevermind-api.onrender.com/api");

const levelStyles = {
  beginner: { dot: "bg-white/30", label: "Beginner" },
  intermediate: { dot: "bg-white/60", label: "Intermediate" },
  advanced: { dot: "bg-white", label: "Advanced" },
};

const Timeline = ({ roadmap, careerSlug }) => {
  const { token, isLoggedIn } = useAuth();
  const [completed, setCompleted] = useState(new Set());
  const [syncing, setSyncing] = useState(null);

  // Load progress from backend
  useEffect(() => {
    if (!isLoggedIn || !careerSlug) return;
    fetch(`${BASE_URL}/progress/${careerSlug}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.completed) setCompleted(new Set(data.completed));
      })
      .catch(() => {});
  }, [isLoggedIn, careerSlug, token]);

  const toggleTopic = async (level, idx) => {
    if (!isLoggedIn) return;
    const key = `${level}_${idx}`;
    const isCompleted = completed.has(key);
    setSyncing(key);

    // Optimistic update
    const newSet = new Set(completed);
    if (isCompleted) newSet.delete(key);
    else newSet.add(key);
    setCompleted(newSet);

    try {
      const res = await fetch(`${BASE_URL}/progress/${careerSlug}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          level,
          topic_index: idx,
          completed: !isCompleted,
        }),
      });
      const data = await res.json();
      if (data.completed) setCompleted(new Set(data.completed));
    } catch {
      // Revert on error
      if (isCompleted) newSet.add(key);
      else newSet.delete(key);
      setCompleted(new Set(newSet));
    } finally {
      setSyncing(null);
    }
  };

  if (!roadmap) return null;
  const levels = ["beginner", "intermediate", "advanced"];
  const totalTopics = levels.reduce((sum, l) => sum + (roadmap[l]?.length || 0), 0);
  const completedCount = completed.size;

  return (
    <div className="space-y-10">
      {/* Progress bar */}
      {isLoggedIn && totalTopics > 0 && (
        <div className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted">Progress</span>
            <span className="text-xs font-medium text-text">
              {completedCount}/{totalTopics} completed
            </span>
          </div>
          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white/70 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / totalTopics) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {levels.map((level) => {
        const items = roadmap[level];
        if (!items || items.length === 0) return null;
        const style = levelStyles[level];

        return (
          <div key={level}>
            {/* Level header */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-muted text-xs uppercase tracking-widest font-medium">
                {style.label}
              </span>
              <div className="flex-1 h-px bg-border"></div>
              {isLoggedIn && (
                <span className="text-xs text-muted">
                  {items.filter((_, i) => completed.has(`${level}_${i}`)).length}/{items.length}
                </span>
              )}
            </div>

            {/* Items */}
            <div className="relative ml-2 pl-7 border-l border-border space-y-5">
              {items.map((item, idx) => {
                const key = `${level}_${idx}`;
                const isDone = completed.has(key);
                const isSyncing = syncing === key;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.25 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute -left-[1.97rem] top-2 w-3 h-3 rounded-full ${
                        isDone ? "bg-green-400" : style.dot
                      } ring-[3px] ring-bg transition-colors duration-300`}
                    ></div>

                    {/* Card */}
                    <div className={`p-4 rounded-[14px] bg-surface border transition-all duration-300 ${
                      isDone ? "border-green-500/30 bg-green-500/5" : "border-border"
                    }`}>
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        {isLoggedIn && (
                          <button
                            onClick={() => toggleTopic(level, idx)}
                            disabled={isSyncing}
                            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                              isDone
                                ? "bg-green-500/20 border-green-500/50 text-green-400"
                                : "border-white/20 hover:border-white/40"
                            } ${isSyncing ? "opacity-50" : ""}`}
                          >
                            {isDone && (
                              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 6l3 3 5-5" />
                              </svg>
                            )}
                          </button>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1.5">
                            <h4 className={`font-medium text-[15px] transition-all duration-300 ${
                              isDone ? "text-white/50 line-through" : "text-text"
                            }`}>{item.topic}</h4>
                            <span className="text-xs text-muted whitespace-nowrap ml-3">
                              {item.duration}
                            </span>
                          </div>
                          {item.outcome && (
                            <p className={`text-sm leading-relaxed transition-all duration-300 ${
                              isDone ? "text-white/30" : "text-muted"
                            }`}>{item.outcome}</p>
                          )}
                          {item.youtube && (
                            <a
                              href={item.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors duration-200"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                              Watch Tutorial
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
