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
