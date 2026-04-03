import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import QuizPage from "./components/pages/QuizPage";
import ResultPage from "./components/pages/ResultPage";
import CareersPage from "./components/pages/CareersPage";
import RoadmapPage from "./components/pages/RoadmapPage";
import HistoryPage from "./components/pages/HistoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/roadmap/:careerName" element={<RoadmapPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-bg text-text">
              <div className="text-center">
                <p className="text-muted text-xs uppercase tracking-widest mb-3">404</p>
                <h1 className="text-[28px] font-semibold tracking-tight mb-4">Page not found</h1>
                <a href="/" className="text-muted text-sm hover:text-text transition-colors duration-200">← Go home</a>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
