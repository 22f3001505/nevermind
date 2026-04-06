import React from "react";
import { motion } from "framer-motion";

const levelStyles = {
  beginner: { dot: "bg-white/30", label: "Beginner" },
  intermediate: { dot: "bg-white/60", label: "Intermediate" },
  advanced: { dot: "bg-white", label: "Advanced" },
};

const Timeline = ({ roadmap }) => {
  if (!roadmap) return null;
  const levels = ["beginner", "intermediate", "advanced"];

  return (
    <div className="space-y-10">
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
            </div>

            {/* Items */}
            <div className="relative ml-2 pl-7 border-l border-border space-y-5">
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.25 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[1.97rem] top-2 w-3 h-3 rounded-full ${style.dot} ring-[3px] ring-bg`}
                  ></div>

                  {/* Card */}
                  <div className="p-4 rounded-[14px] bg-surface border border-border">
                    <div className="flex items-start justify-between mb-1.5">
                      <h4 className="font-medium text-text text-[15px]">{item.topic}</h4>
                      <span className="text-xs text-muted whitespace-nowrap ml-3">
                        {item.duration}
                      </span>
                    </div>
                    {item.outcome && (
                      <p className="text-muted text-sm leading-relaxed">{item.outcome}</p>
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
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
