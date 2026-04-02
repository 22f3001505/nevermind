import { useState, useCallback } from "react";

/**
 * Custom hook for managing quiz state.
 * Tracks current step, answers, and progress.
 */
export const useQuiz = (totalQuestions = 20) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const selectAnswer = useCallback((questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      if (next >= totalQuestions) {
        setIsComplete(true);
      }
      return Math.min(next, totalQuestions - 1);
    });
  }, [totalQuestions]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const resetQuiz = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setIsComplete(false);
  }, []);

  const getFormattedAnswers = useCallback(() => {
    return Object.entries(answers).map(([qId, optIdx]) => ({
      question_id: parseInt(qId),
      selected_option: optIdx,
    }));
  }, [answers]);

  const progress = Math.round(
    (Object.keys(answers).length / totalQuestions) * 100
  );

  const canSubmit = Object.keys(answers).length >= 10;

  return {
    currentStep,
    answers,
    isComplete,
    progress,
    canSubmit,
    selectAnswer,
    nextStep,
    prevStep,
    resetQuiz,
    getFormattedAnswers,
    answeredCount: Object.keys(answers).length,
  };
};
