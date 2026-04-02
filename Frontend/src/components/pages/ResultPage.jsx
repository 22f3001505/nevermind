import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SkillRadar from "../charts/SkillRadar";
import Timeline from "../roadmap/Timeline";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const [reveal, setReveal] = useState(0);
  const [showAllCareers, setShowAllCareers] = useState(false);

  useEffect(() => {
    if (!result) return;
    document.title = `${result.top_careers[0]?.career} — Never Mind Results`;
    const timers = [
      setTimeout(() => setReveal(1), 200),
      setTimeout(() => setReveal(2), 700),
      setTimeout(() => setReveal(3), 1200),
      setTimeout(() => setReveal(4), 1700),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.title = "Never Mind — Career Intelligence";
    };
  }, [result]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text">
        <div className="text-center">
          <p className="text-muted mb-4">No results available.</p>
          <button onClick={() => navigate("/quiz")} className="bg-text text-bg px-6 py-2.5 rounded-[10px] text-sm font-medium">
            Take the Quiz
          </button>
        </div>
      </div>
    );
  }

  const topCareer = result.top_careers[0];
  const roadmap = result.roadmap;
  const allCareers = result.all_careers || [];
  const maxConfidence = allCareers.length > 0 ? allCareers[0].confidence : 1;

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Nav */}
      <nav className="border-b border-border sticky top-0 bg-bg/80 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted text-xs sm:text-sm hover:text-text transition-colors duration-200">
            <img src="/logo.png" alt="" className="h-5 sm:h-6 w-auto opacity-60" />
            <span>Never Mind</span>
          </button>
          <div className="flex items-center gap-3 sm:gap-4 no-print">
            <button onClick={() => navigate("/history")} className="text-muted text-xs sm:text-sm hover:text-text transition-colors duration-200">History</button>
            <button onClick={() => window.print()} className="text-muted text-xs sm:text-sm hover:text-text transition-colors duration-200">Export PDF</button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Stage 1: Result hero */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={reveal >= 1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease: "easeOut" }} className="text-center mb-10 sm:mb-14">
          <p className="text-muted text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-4">Your career match</p>
          <h1 className="text-[32px] sm:text-[48px] font-bold tracking-tight mb-3 sm:mb-4">{topCareer.career}</h1>
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className="text-muted text-xs sm:text-sm">{(topCareer.confidence * 100).toFixed(1)}% confidence</span>
            <span className="text-border">•</span>
            <span className="text-muted text-xs sm:text-sm">Quiz #{result.quiz_id}</span>
          </div>
        </motion.div>

        {/* Stage 2: AI Insight */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={reveal >= 2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease: "easeOut" }} className="mb-14">
          <div className="p-5 rounded-[14px] bg-surface border border-border">
            <p className="text-xs text-muted uppercase tracking-widest mb-3">AI Analysis</p>
            <p className="text-text/80 leading-relaxed text-[15px]">{result.insight}</p>
          </div>
        </motion.div>

        {/* Stage 3: Careers + Radar */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={reveal >= 3 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease: "easeOut" }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {/* Top 3 */}
          <div>
            <p className="text-xs text-muted uppercase tracking-widest mb-4">Top matches</p>
            <div className="space-y-3">
              {result.top_careers.map((career, idx) => (
                <div key={career.career} className={`p-4 rounded-[14px] border transition-all ${idx === 0 ? "bg-white/[0.03] border-white/10" : "bg-surface border-border"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-semibold ${idx === 0 ? "text-text" : "text-muted"}`}>{career.rank}</span>
                      <span className={`font-medium ${idx === 0 ? "text-text" : "text-muted"}`}>{career.career}</span>
                    </div>
                    <span className={`text-sm ${idx === 0 ? "text-text" : "text-muted"}`}>{(career.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-[2px] bg-border rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${career.confidence * 100}%` }} transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }} className={`h-full rounded-full ${idx === 0 ? "bg-text" : "bg-muted/40"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Radar */}
          <div>
            <p className="text-xs text-muted uppercase tracking-widest mb-4">Skill profile</p>
            <div className="p-3 rounded-[14px] bg-surface border border-border">
              <SkillRadar skills={result.skills} size={240} />
            </div>
          </div>
        </motion.div>

        {/* All 15 Careers Bar Chart */}
        {reveal >= 3 && allCareers.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-14">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-muted uppercase tracking-widest">All career scores</p>
              <button onClick={() => setShowAllCareers(!showAllCareers)} className="text-muted text-xs hover:text-text transition-colors duration-200">
                {showAllCareers ? "Collapse" : "Expand all 15"}
              </button>
            </div>
            <div className="space-y-1.5">
              {(showAllCareers ? allCareers : allCareers.slice(0, 5)).map((career, idx) => (
                <motion.div key={career.career} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03, duration: 0.2 }} className="flex items-center gap-3 group">
                  <span className={`text-xs w-28 sm:w-40 truncate text-right ${idx < 3 ? "text-text" : "text-muted"}`}>{career.career}</span>
                  <div className="flex-1 h-5 bg-border/30 rounded-[4px] overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(career.confidence / maxConfidence) * 100}%` }} transition={{ duration: 0.6, delay: idx * 0.04 }} className={`h-full rounded-[4px] ${idx === 0 ? "bg-text" : idx < 3 ? "bg-white/30" : "bg-white/10"}`} />
                  </div>
                  <span className="text-xs text-muted w-12 text-right">{(career.confidence * 100).toFixed(1)}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stage 4: Roadmap */}
        {reveal >= 4 && roadmap && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
              <div className="p-4 rounded-[14px] bg-surface border border-border">
                <p className="text-muted text-xs mb-1">Salary</p>
                <p className="text-text font-medium text-sm">{roadmap.avg_salary}</p>
              </div>
              <div className="p-4 rounded-[14px] bg-surface border border-border">
                <p className="text-muted text-xs mb-1">Growth</p>
                <p className="text-text font-medium text-sm">{roadmap.growth_outlook}</p>
              </div>
              <div className="p-4 rounded-[14px] bg-surface border border-border">
                <p className="text-muted text-xs mb-1">Duration</p>
                <p className="text-text font-medium text-sm">{roadmap.total_estimated_weeks} weeks</p>
              </div>
            </div>

            {roadmap.skill_gaps?.length > 0 && (
              <div className="mb-10">
                <p className="text-xs text-muted uppercase tracking-widest mb-4">Skill gaps to close</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {roadmap.skill_gaps.map((gap) => (
                    <div key={gap.skill} className="p-3 rounded-[14px] bg-surface border border-border">
                      <p className="text-text text-sm font-medium capitalize mb-1.5">{gap.skill.replace("_", " ")}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted">
                        <span>{Math.round(gap.current * 100)}%</span>
                        <span className="text-border">→</span>
                        <span className="text-text">{Math.round(gap.required * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-10">
              <p className="text-xs text-muted uppercase tracking-widest mb-2">Learning roadmap</p>
              <p className="text-muted text-sm mb-6">Start level: <span className="text-text capitalize">{roadmap.suggested_start_level}</span></p>
              <Timeline roadmap={roadmap.roadmap} />
            </div>
          </motion.div>
        )}

        {/* Skill Summary Table */}
        {reveal >= 4 && result.skill_summary && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-14">
            <p className="text-xs text-muted uppercase tracking-widest mb-4">Detailed skill breakdown</p>
            <div className="rounded-[14px] bg-surface border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-muted text-xs uppercase tracking-wider px-4 py-3">Skill</th>
                    <th className="text-left text-muted text-xs uppercase tracking-wider px-4 py-3">Score</th>
                    <th className="text-left text-muted text-xs uppercase tracking-wider px-4 py-3">Level</th>
                    <th className="text-left text-muted text-xs uppercase tracking-wider px-4 py-3 w-1/3">Bar</th>
                  </tr>
                </thead>
                <tbody>
                  {result.skill_summary.map((s) => (
                    <tr key={s.skill} className="border-b border-border/50 last:border-0">
                      <td className="px-4 py-2.5 text-text capitalize">{s.skill.replace("_", " ")}</td>
                      <td className="px-4 py-2.5 text-muted">{Math.round(s.score * 100)}%</td>
                      <td className="px-4 py-2.5">
                        <span className={`text-xs px-2 py-0.5 rounded-[6px] ${
                          s.level === "Advanced" ? "bg-white/10 text-text" :
                          s.level === "Intermediate" ? "bg-white/5 text-muted" :
                          "bg-white/[0.02] text-muted/60"
                        }`}>{s.level}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="h-1.5 bg-border/40 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${s.score > 0.6 ? "bg-text" : "bg-muted/40"}`} style={{ width: `${s.score * 100}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div initial={{ opacity: 0 }} animate={reveal >= 4 ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="mt-10 sm:mt-14 flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center no-print">
          <button onClick={() => navigate("/quiz")} className="text-muted text-xs sm:text-sm px-6 py-2.5 rounded-[10px] border border-border hover:border-muted transition-colors duration-200">Retake Quiz</button>
          <button onClick={() => window.print()} className="bg-text text-bg px-6 py-2.5 rounded-[10px] text-xs sm:text-sm font-medium active:scale-[0.98] transition-transform duration-200">Download Report</button>
          <button onClick={() => navigate("/careers")} className="text-muted text-xs sm:text-sm px-6 py-2.5 rounded-[10px] border border-border hover:border-muted transition-colors duration-200">Browse Careers</button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultPage;
