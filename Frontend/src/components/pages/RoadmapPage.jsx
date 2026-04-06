import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchRoadmap } from "../../services/api";
import Timeline from "../roadmap/Timeline";

const RoadmapPage = () => {
  const { careerName } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Decode slug for display: "UI--UX-Designer" → "UI/UX Designer"
  const decodedName = decodeURIComponent(careerName)
    .replace(/--/g, ' / ')
    .replace(/-/g, ' ');

  useEffect(() => {
    // Send the slug (with dashes) to API — NOT the decoded name with slashes
    // Backend fuzzy match handles "UI  UX Designer" → "UI/UX Designer"
    fetchRoadmap(careerName)
      .then((data) => {
        setRoadmap(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [careerName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-5 h-5 border-2 border-border border-t-text rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text">
        <div className="text-center">
          <p className="text-muted mb-4">Career not found</p>
          <button
            onClick={() => navigate("/careers")}
            className="text-muted text-sm border border-border px-4 py-2 rounded-[10px] hover:border-muted transition-colors duration-200"
          >
            ← Back to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Nav */}
      <nav className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/careers")}
            className="text-muted text-xs sm:text-sm hover:text-text transition-colors duration-200"
          >
            ← Careers
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="text-muted text-xs sm:text-sm hover:text-text transition-colors duration-200"
          >
            Take Quiz
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 sm:mb-10"
        >
          <h1 className="text-[22px] sm:text-[28px] font-semibold tracking-tight mb-2 sm:mb-3">
            {decodedName}
          </h1>
          <p className="text-muted text-xs sm:text-sm leading-relaxed">{roadmap.description}</p>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10"
        >
          <div className="p-4 rounded-[14px] bg-surface border border-border">
            <p className="text-muted text-xs mb-1">Salary</p>
            <p className="text-text font-medium text-sm">{roadmap.avg_salary}</p>
          </div>
          <div className="p-4 rounded-[14px] bg-surface border border-border">
            <p className="text-muted text-xs mb-1">Growth</p>
            <p className="text-text font-medium text-sm">{roadmap.growth_outlook}</p>
          </div>
          <div className="p-4 rounded-[14px] bg-surface border border-border">
            <p className="text-muted text-xs mb-1">Companies</p>
            <p className="text-text text-sm">{roadmap.key_companies?.slice(0, 3).join(", ")}</p>
          </div>
        </motion.div>

        {/* Key Skills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <p className="text-xs text-muted uppercase tracking-widest mb-3">Key skills</p>
          <div className="flex flex-wrap gap-2">
            {roadmap.key_skills?.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-[8px] bg-surface border border-border text-text text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <p className="text-xs text-muted uppercase tracking-widest mb-6">Learning roadmap</p>
          <Timeline roadmap={roadmap.roadmap} careerSlug={careerName} />
        </motion.div>

        {/* CTA */}
        <div className="mt-10 sm:mt-14 text-center">
          <button
            onClick={() => navigate("/quiz")}
            className="bg-text text-bg px-6 sm:px-8 py-3 rounded-[10px] text-xs sm:text-sm font-medium active:scale-[0.98] transition-transform duration-200 w-full sm:w-auto"
          >
            Take the Quiz — See if This Fits You
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
