import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./components/pages/Home";
import QuizPage from "./components/pages/QuizPage";
import ResultPage from "./components/pages/ResultPage";
import CareersPage from "./components/pages/CareersPage";
import RoadmapPage from "./components/pages/RoadmapPage";
import HistoryPage from "./components/pages/HistoryPage";
import AuthPage from "./components/pages/AuthPage";

// Protected route — redirects to /auth if not logged in
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/auth" replace />;
  return children;
};

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* Auth page — redirect to home if already logged in */}
      <Route path="/auth" element={isLoggedIn ? <Navigate to="/" replace /> : <AuthPage />} />

      {/* All other routes require login */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
      <Route path="/results" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
      <Route path="/careers" element={<ProtectedRoute><CareersPage /></ProtectedRoute>} />
      <Route path="/roadmap/:careerName" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
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
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
