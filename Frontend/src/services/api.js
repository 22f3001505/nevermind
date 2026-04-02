/**
 * Never Mind — API Service Layer (Production)
 * Retry logic, timeout, health check, history, stats.
 */

// Cloud backend URL (Render.com free tier) — works globally
// Change this after deploying to Render
const CLOUD_URL = "https://nevermind-api.onrender.com/api";
const LOCAL_URL = "http://localhost:8000/api";

// Use cloud URL for production (Android + web), localhost for dev
const isLocalDev = typeof window !== "undefined" && (window.location?.hostname === "localhost" || window.location?.hostname === "127.0.0.1");
const BASE_URL = import.meta.env.VITE_API_URL || (isLocalDev ? LOCAL_URL : CLOUD_URL);
const TIMEOUT_MS = 60000; // 60s timeout for Render free-tier cold starts

// Session ID for anonymous tracking
const SESSION_ID = (() => {
  let id = localStorage.getItem("nm_session_id");
  if (!id) {
    id = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("nm_session_id", id);
  }
  return id;
})();

/**
 * Fetch with timeout and retry.
 */
async function fetchWithRetry(url, options = {}, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "X-Session-Id": SESSION_ID,
          ...options.headers,
        },
      });
      clearTimeout(timeout);

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || errBody.detail || `HTTP ${res.status}`);
      }

      return res.json();
    } catch (err) {
      clearTimeout(timeout);

      if (err.name === "AbortError") {
        err.message = "Request timed out. Please check your connection.";
      }

      if (attempt < retries && !err.message.includes("400")) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }

      throw err;
    }
  }
}

/**
 * Health check — verifies backend connectivity.
 */
export const checkHealth = async () => {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/health/`, {}, 1);
    return { connected: true, ...data };
  } catch {
    return { connected: false, status: "offline" };
  }
};

/**
 * Fetch all quiz questions (with offline cache).
 */
export const fetchQuestions = async () => {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/quiz/questions/`);
    // Cache for offline use
    try { localStorage.setItem("nm_cache_questions", JSON.stringify(data.questions)); } catch {}
    return data.questions;
  } catch (err) {
    // Fallback to cached questions
    const cached = localStorage.getItem("nm_cache_questions");
    if (cached) {
      console.log("[NM] Using cached questions (offline)");
      return JSON.parse(cached);
    }
    throw err;
  }
};

/**
 * Submit quiz answers and get career prediction + roadmap.
 */
export const submitQuiz = async (payload) => {
  return fetchWithRetry(`${BASE_URL}/quiz/submit/`, {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      session_id: SESSION_ID,
    }),
  });
};

/**
 * Fetch all career paths with metadata (with offline cache).
 */
export const fetchCareers = async () => {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/careers/`);
    // Cache for offline use
    try { localStorage.setItem("nm_cache_careers", JSON.stringify(data.careers)); } catch {}
    return data.careers;
  } catch (err) {
    // Fallback to cached careers
    const cached = localStorage.getItem("nm_cache_careers");
    if (cached) {
      console.log("[NM] Using cached careers (offline)");
      return JSON.parse(cached);
    }
    throw err;
  }
};

/**
 * Fetch detailed roadmap for a specific career.
 */
export const fetchRoadmap = async (careerName) => {
  const encoded = encodeURIComponent(careerName);
  return fetchWithRetry(`${BASE_URL}/careers/${encoded}/roadmap/`);
};

/**
 * Fetch quiz history for this session.
 */
export const fetchHistory = async (limit = 10) => {
  const data = await fetchWithRetry(`${BASE_URL}/quiz/history/?limit=${limit}`);
  return data.history;
};

/**
 * Fetch platform statistics.
 */
export const fetchStats = async () => {
  return fetchWithRetry(`${BASE_URL}/stats/`);
};

export { SESSION_ID };
