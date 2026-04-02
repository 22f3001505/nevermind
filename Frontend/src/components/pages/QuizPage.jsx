import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "../../hooks/useQuiz";
import { fetchQuestions, submitQuiz } from "../../services/api";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [error, setError] = useState(null);

  const {
    currentStep, answers, progress, canSubmit,
    selectAnswer, nextStep, prevStep,
    getFormattedAnswers, answeredCount,
  } = useQuiz(20);

  useEffect(() => {
    fetchQuestions()
      .then((qs) => { setQuestions(qs); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  // Auto-advance after selection (300ms delay)
  const handleSelect = useCallback((qId, optIdx) => {
    selectAnswer(qId, optIdx);
    if (currentStep < questions.length - 1) {
      setTimeout(() => nextStep(), 350);
    }
  }, [selectAnswer, nextStep, currentStep, questions.length]);

  // Keyboard navigation: A/B/C/D to select, Arrow keys to move
  useEffect(() => {
    if (loading || submitting || questions.length === 0) return;

    const handler = (e) => {
      const key = e.key.toLowerCase();
      const q = questions[currentStep];
      if (!q) return;

      if (["a", "b", "c", "d"].includes(key)) {
        const idx = key.charCodeAt(0) - 97;
        if (idx < q.options.length) {
          handleSelect(q.id, q.options[idx].index);
        }
      } else if (key === "arrowleft") {
        prevStep();
      } else if (key === "arrowright" && answers[q?.id] !== undefined) {
        nextStep();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [loading, submitting, questions, currentStep, answers, handleSelect, prevStep, nextStep]);

  // Update page title with progress
  useEffect(() => {
    document.title = questions.length > 0
      ? `${currentStep + 1}/${questions.length} — Never Mind Quiz`
      : "Never Mind — Quiz";
    return () => { document.title = "Never Mind — Career Intelligence"; };
  }, [currentStep, questions.length]);

  const handleSubmit = async () => {
    setSubmitting(true);
    const steps = [
      "Extracting skill vectors",
      "Running ML inference",
      "Computing confidence scores",
      "Analyzing career matches",
      "Generating personalized roadmap",
    ];
    let i = 0;
    setLoadingText(steps[0]);
    const interval = setInterval(() => {
      i = (i + 1) % steps.length;
      setLoadingText(steps[i]);
    }, 1200);

    try {
      const result = await submitQuiz({
        user_name: "User",
        answers: getFormattedAnswers(),
      });
      clearInterval(interval);
      await new Promise((r) => setTimeout(r, 600));
      navigate("/results", { state: { result } });
    } catch (err) {
      clearInterval(interval);
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <div className="w-5 h-5 border-2 border-border border-t-text rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-muted text-sm">Loading questions...</div>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="w-6 h-6 border-2 border-border border-t-text rounded-full animate-spin mx-auto mb-8"></div>
          <motion.p key={loadingText} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="text-text text-base font-medium">
            {loadingText}
          </motion.p>
          <p className="text-muted text-xs mt-3">{answeredCount} answers analyzed</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center max-w-md px-6">
          <p className="text-text mb-2 font-medium">Connection Error</p>
          <p className="text-muted text-sm mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setError(null); setLoading(true); fetchQuestions().then((qs) => { setQuestions(qs); setLoading(false); }).catch((e) => { setError(e.message); setLoading(false); }); }} className="text-text text-sm border border-border px-5 py-2.5 rounded-[10px] hover:border-muted transition-colors duration-200">
              Retry
            </button>
            <button onClick={() => navigate("/")} className="text-muted text-sm px-5 py-2.5 rounded-[10px] hover:text-text transition-colors duration-200">
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion?.id];

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="text-muted text-xs sm:text-sm hover:text-text transition-colors duration-200">← Never Mind</button>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-muted text-[10px] sm:text-xs">{answeredCount}/{questions.length} answered</span>
            <span className="text-muted text-xs sm:text-sm font-medium">{currentStep + 1} / {questions.length}</span>
          </div>
        </div>
        <div className="h-[2px] bg-border">
          <motion.div className="h-full bg-text" animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16 w-full">
          <motion.p key={`cat-${currentStep}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-5">
            {currentQuestion?.category}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.h2 key={`q-${currentStep}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="text-[20px] sm:text-[28px] font-semibold leading-tight mb-6 sm:mb-10 tracking-tight">
              {currentQuestion?.text}
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div key={`opts-${currentStep}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2.5 sm:space-y-3">
              {currentQuestion?.options.map((option, idx) => {
                const isSelected = currentAnswer === option.index;
                const letter = String.fromCharCode(65 + idx);
                return (
                  <motion.button key={option.index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05, duration: 0.25 }}
                    onClick={() => handleSelect(currentQuestion.id, option.index)}
                    className={`w-full text-left px-4 sm:px-5 py-3.5 sm:py-4 rounded-[12px] sm:rounded-[14px] border transition-all duration-200 active:scale-[0.98] ${
                      isSelected ? "border-text bg-white/[0.06]" : "border-border bg-surface hover:border-muted"
                    }`}>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-7 h-7 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center text-xs font-medium shrink-0 transition-all duration-200 ${
                        isSelected ? "border-text bg-text text-bg" : "border-border text-muted"
                      }`}>
                        {letter}
                      </div>
                      <span className={`text-sm sm:text-base leading-snug ${isSelected ? "text-text" : "text-muted"}`}>{option.label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Keyboard hint — only show on desktop (not mobile/touch) */}
          <p className="hidden sm:block text-center text-muted/40 text-xs mt-8">
            Press A/B/C/D to select • ← → to navigate
          </p>
          {/* Mobile hint */}
          <p className="sm:hidden text-center text-muted/30 text-[10px] mt-5">
            Tap an option to answer
          </p>
        </div>
      </div>

      {/* Footer nav */}
      <div className="border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <button onClick={prevStep} disabled={currentStep === 0} className="text-muted text-xs sm:text-sm hover:text-text transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed px-3 py-2">
            Previous
          </button>
          {currentStep < questions.length - 1 ? (
            <button onClick={nextStep} disabled={currentAnswer === undefined} className="bg-text text-bg px-5 sm:px-6 py-2.5 rounded-[10px] text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={!canSubmit} className="bg-text text-bg px-5 sm:px-6 py-2.5 rounded-[10px] text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed">
              Get Results ({answeredCount}/20)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
