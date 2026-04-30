# Never Mind — AI Career Intelligence Platform
## Complete Project Explanation (Interview Ready)

---

## 🎯 The Problem (Why I Built This)

Imagine you're a college student or a fresher. You know bits of Python, some HTML, a little SQL — but you have **no idea** which IT career is right for you. Should you become a Data Scientist? A Frontend Developer? A DevOps Engineer? 

There are **15+ different IT career paths**, and most students pick one randomly or just follow the crowd. There's no personalized guidance.

**Never Mind** solves this. It's like a **career counselor powered by AI** — you answer 20 questions about your skills, and the app uses Machine Learning to tell you exactly which career fits you best, how confident it is, and gives you a complete learning roadmap with YouTube tutorials to get started.

---

## 🏗️ The Big Picture (How It Works — The Story)

Think of the app like a **3-floor building**:

```
┌─────────────────────────────────────────┐
│  📱 FLOOR 3: What the user sees         │
│     (The App — React + Android APK)     │
├─────────────────────────────────────────┤
│  ⚡ FLOOR 2: The brain that processes    │
│     (Django API Server)                 │
├─────────────────────────────────────────┤
│  🧠 FLOOR 1: The AI that predicts       │
│     (ML Model — Random Forest + GB)     │
└─────────────────────────────────────────┘
```

### The User's Journey (Step by Step):

**Step 1 — Login** 🔐
> The user opens the app on their Android phone (or web browser). They MUST create an account first. We use **JWT tokens** (like a digital ID card) — once you login, the app remembers you for 7 days.

**Step 2 — Take the Quiz** 📝
> The user answers 20 carefully designed questions. These aren't random — each question tests a specific skill. For example:
> - "How comfortable are you writing Python code?" → Tests **Python skill**
> - "Can you design a responsive webpage?" → Tests **HTML/CSS + Design skill**
> - "How would you optimize a slow database query?" → Tests **SQL + Problem Solving**

**Step 3 — The Magic Happens (Behind the Scenes)** 🧮
> When the user clicks "Submit", their 20 answers travel to our server. Here's what happens in **under 2 seconds**:
>
> 1. **Skill Engine** converts the 20 answers into a **10-number skill score** (like a report card):
>    ```
>    Python: 0.8, JavaScript: 0.3, HTML/CSS: 0.6, SQL: 0.7,
>    Problem Solving: 0.9, ML/AI: 0.75, Design: 0.2,
>    Networking: 0.1, DevOps: 0.15, Communication: 0.5
>    ```
>    Each number is between 0.0 (no skill) and 1.0 (expert level).
>
> 2. **ML Model** takes this 10-number vector and predicts which career matches best. It's like showing your report card to an expert who has seen **2,100+ other students' profiles** and knows exactly which career each skill pattern leads to.
>
> 3. **Rule Engine** generates a human-readable explanation: *"Your strong Python and ML skills, combined with excellent problem-solving, make you an ideal fit for Data Science."*

**Step 4 — See Your Results** 📊
> The user sees:
> - **Top career** with confidence percentage (e.g., "Data Scientist — 78% match")
> - **Radar chart** showing their 10 skill scores visually
> - **AI insight** explaining WHY this career was recommended
> - **Top 3 career matches** ranked by confidence

**Step 5 — Explore the Roadmap** 🗺️
> The user can tap on any career to see a **complete learning roadmap**:
> - **Beginner** (4 topics) → **Intermediate** (4 topics) → **Advanced** (4 topics)
> - Each topic has a **YouTube tutorial link** (180 total across all careers)
> - Each topic has a **checkbox** — the user can mark topics as "done"
> - A **progress bar** shows how far they've come
> - **Salary info in ₹ INR** broken down by experience level (Fresher/Mid/Experienced)

**Step 6 — Track Progress** ☑️
> Every checkbox the user clicks is saved to the server. If they close the app and come back tomorrow, their progress is still there. This works because each checkbox is linked to their user account.

---

## 🔧 Tech Stack (What I Used and Why)

### Frontend (What the User Sees)

| Technology | What It Does | Why I Chose It |
|---|---|---|
| **React 18** | Builds the user interface — pages, buttons, forms | Industry standard, component-based, fast rendering |
| **Vite 5** | Development server + build tool | 10x faster than Webpack, instant hot reload |
| **Tailwind CSS** | Styling — colors, spacing, layouts | Write CSS directly in components, very productive |
| **Framer Motion** | Animations — fade-ins, slide-ups, transitions | Makes the app feel premium and alive |
| **Capacitor 6** | Wraps the web app into an Android APK | One codebase → both web + Android |
| **React Router** | Navigation between pages | Standard for multi-page React apps |

> **In simple terms**: React is like the **paintbrush** — it draws what the user sees. Vite is the **workshop** that helps me build fast. Tailwind is the **color palette**. Framer Motion adds **sparkle**. Capacitor puts it all **inside a phone**.

### Backend (The Server Brain)

| Technology | What It Does | Why I Chose It |
|---|---|---|
| **Django 5** | Python web framework — handles all requests | Batteries-included, secure, built-in admin |
| **Django REST Framework** | Converts Django into an API server | Industry standard for building REST APIs |
| **SimpleJWT** | Handles login/signup with token-based auth | Stateless, secure, works great with mobile apps |
| **SQLite** | Database — stores users, quiz attempts, progress | Zero config, perfect for this scale |
| **Gunicorn** | Production-grade WSGI server | Handles multiple requests simultaneously |
| **WhiteNoise** | Serves static files in production | No need for separate file server (Nginx) |

> **In simple terms**: Django is the **receptionist** — it receives requests and gives responses. JWT is the **ID card system** — it checks if you're allowed in. SQLite is the **filing cabinet** — it stores everything.

### Machine Learning (The AI Brain)

| Technology | What It Does | Why I Chose It |
|---|---|---|
| **Scikit-learn** | ML library — model training and prediction | Best library for classical ML in Python |
| **RandomForest** | Ensemble of 200 decision trees | Great accuracy, handles non-linear patterns |
| **GradientBoosting** | Ensemble of 100 boosted trees | Complements RF, reduces errors |
| **VotingClassifier** | Combines RF + GB (soft voting) | Ensemble = more reliable than single model |
| **NumPy** | Numerical computing | Fast array operations for skill vectors |
| **Pandas** | Data manipulation | Training data processing |
| **Joblib/Pickle** | Model serialization | Save trained model to file (48 MB .pkl) |

> **In simple terms**: The ML model is like a **very experienced career counselor** who has studied 2,100+ student profiles. When you show them YOUR profile, they can immediately say "You should be a Data Scientist" with 78% confidence — because they've seen similar profiles before.

### DevOps & Deployment

| Technology | What It Does |
|---|---|
| **Render.com** | Cloud hosting for the backend API |
| **GitHub** | Version control (2 repos: frontend + backend) |
| **GitHub Actions** | CI/CD pipeline |
| **Android Studio SDK** | Builds and signs the APK |

---

## 📁 Project Structure Explained

```
Never Mind Project/
│
├── 📱 Frontend/                     ← THE APP (React)
│   ├── src/
│   │   ├── App.jsx                  ← "Traffic controller" — decides which page to show
│   │   ├── context/AuthContext.jsx   ← "Security guard" — manages login state
│   │   ├── services/api.js          ← "Messenger" — talks to the backend server
│   │   ├── components/pages/
│   │   │   ├── AuthPage.jsx         ← Login / Signup screen
│   │   │   ├── Home.jsx             ← Landing page with stats
│   │   │   ├── QuizPage.jsx         ← The 20-question quiz
│   │   │   ├── ResultPage.jsx       ← Career results + radar chart
│   │   │   ├── CareersPage.jsx      ← Browse all 15 careers
│   │   │   ├── RoadmapPage.jsx      ← Learning path for a career
│   │   │   └── HistoryPage.jsx      ← Past quiz attempts
│   │   └── components/roadmap/
│   │       └── Timeline.jsx         ← Roadmap with checkboxes + YouTube
│   └── android/                     ← Android APK build files
│
├── 🧠 Prediction/                   ← THE BRAIN (Django + ML)
│   ├── prediction/
│   │   ├── models.py                ← Database table definitions
│   │   ├── views.py                 ← 12 API endpoints (the main logic)
│   │   ├── urls.py                  ← URL routing table
│   │   └── serializers.py           ← Data validation
│   ├── ml_models/
│   │   ├── predict.py               ← ML inference code
│   │   └── career_model.pkl         ← The trained AI model (48 MB)
│   ├── datasets/
│   │   ├── questions.json           ← 20 quiz questions
│   │   ├── roadmaps.json            ← 15 career roadmaps + YouTube links
│   │   └── prediction-data.csv      ← 2,100 training samples
│   └── utils/
│       ├── skill_engine.py          ← Converts answers → skill scores
│       ├── rule_engine.py           ← Generates AI insights
│       └── roadmap_engine.py        ← Career roadmap lookup
│
└── 📄 architecture.md               ← This documentation
```

---

## 🔄 How Data Flows (The Complete Story)

### Flow 1: User Signs Up

```
User types username + password
        ↓
React sends POST to /api/auth/signup/
        ↓
Django creates user in SQLite database
        ↓
Django generates JWT token (like a 7-day ID card)
        ↓
React saves token in browser's localStorage
        ↓
User is now "logged in" — can access all pages
```

### Flow 2: Quiz → Career Prediction

```
User answers 20 questions (clicking A/B/C/D)
        ↓
React collects all 20 answers as a list:
  [{question_id: 1, selected_option: 2}, ...]
        ↓
POST /api/quiz/submit/ → sends answers to Django
        ↓
┌─ SKILL ENGINE ─────────────────────────────┐
│ Looks up each question's "skill_weights"   │
│ from questions.json                        │
│                                            │
│ Example: Question 5, Option B gives:       │
│   python: +0.3, problem_solving: +0.4      │
│                                            │
│ Adds up all 20 questions → normalizes      │
│ to get scores between 0.0 and 1.0          │
│                                            │
│ Output: {python: 0.8, javascript: 0.3, ... }│
└────────────────────────────────────────────┘
        ↓
┌─ ML MODEL ──────────────────────────────────┐
│ Takes the 10 skill scores as input          │
│                                             │
│ VotingClassifier (soft voting):             │
│   ├── RandomForest (200 trees) → 60% weight │
│   └── GradientBoosting (100 trees) → 40%   │
│                                             │
│ Each model outputs probability for all 15   │
│ careers. Soft voting averages them.         │
│                                             │
│ Output: {                                   │
│   "Data Scientist": 0.78,                   │
│   "ML Engineer": 0.12,                      │
│   "Backend Developer": 0.05,                │
│   ... (12 more)                             │
│ }                                           │
└─────────────────────────────────────────────┘
        ↓
┌─ RULE ENGINE ───────────────────────────────┐
│ Looks at top skills + predicted career      │
│ Generates human-readable insight:           │
│                                             │
│ "Your exceptional Python (0.8) and ML/AI    │
│  (0.75) skills, combined with strong        │
│  problem-solving (0.9), make you an ideal   │
│  candidate for Data Science."               │
└─────────────────────────────────────────────┘
        ↓
Django saves everything to database:
  - QuizAttempt (raw answers)
  - UserSkillProfile (10 skill scores)
  - CareerResult (career predictions + insight)
        ↓
Returns JSON response to React
        ↓
React shows Results page with:
  - Top career card
  - Radar chart (10-axis spider web)
  - AI insight text
  - Ranked list of all 15 careers
```

### Flow 3: Checkbox Progress Tracking

```
User opens a career roadmap (e.g., "Frontend Developer")
        ↓
React loads roadmap from /api/careers/Frontend-Developer/roadmap/
  → 12 topics with YouTube links
        ↓
React loads user's progress from /api/progress/Frontend-Developer/
  → Server checks which topics this user has completed before
  → Returns: ["beginner_0", "beginner_1"] (topics already done)
        ↓
User sees 12 topic cards — 2 already checked ✅, 10 unchecked
        ↓
User clicks a checkbox on "React.js" topic
        ↓
React IMMEDIATELY shows green check (optimistic update — feels instant)
        ↓
React sends POST /api/progress/Frontend-Developer/
  → {level: "intermediate", topic_index: 0, completed: true}
        ↓
Django saves to TopicProgress table in database
  → Linked to this user and this career
        ↓
Progress bar updates: "3/12 completed"
```

---

## 🗄️ Database Tables (What We Store)

### Table 1: `auth_user` (Django built-in)
> Stores login credentials. Passwords are **hashed** (never stored as plain text).

| Column | Example |
|---|---|
| id | 1 |
| username | "jayaram" |
| email | "jayaram@email.com" |
| password | "pbkdf2_sha256$..." (hashed) |
| date_joined | 2026-04-06 |

### Table 2: `QuizAttempt`
> Every time someone takes the quiz, one row is created.

| Column | Example |
|---|---|
| id | 42 |
| user_name | "jayaram" |
| session_id | "a1b2c3d4-..." |
| answers | [{q_id: 1, opt: 2}, {q_id: 2, opt: 0}, ...] |
| created_at | 2026-04-06 14:30:00 |

### Table 3: `UserSkillProfile`
> The 10 skill scores computed from quiz answers.

| Column | Example |
|---|---|
| quiz_attempt_id | 42 (links to QuizAttempt) |
| python | 0.80 |
| javascript | 0.35 |
| html_css | 0.60 |
| sql | 0.72 |
| problem_solving | 0.90 |
| ml_ai | 0.75 |
| design | 0.20 |
| networking | 0.10 |
| devops | 0.15 |
| communication | 0.50 |

### Table 4: `CareerResult`
> The AI's prediction output.

| Column | Example |
|---|---|
| quiz_attempt_id | 42 |
| top_career | "Data Scientist" |
| confidence | 0.78 |
| results | [{career: "Data Scientist", confidence: 0.78, rank: 1}, ...] |
| insight_text | "Your strong Python and ML skills..." |

### Table 5: `TopicProgress`
> Tracks which roadmap checkboxes each user has completed.

| Column | Example |
|---|---|
| user_id | 1 (links to auth_user) |
| career | "Frontend Developer" |
| level | "beginner" |
| topic_index | 0 |
| completed | true |
| completed_at | 2026-04-07 10:15:00 |

---

## 🌐 API Endpoints (The Server's Menu)

Think of each endpoint like an item on a **restaurant menu**. The frontend "orders" data by calling these URLs:

| # | Endpoint | What It Does | Who Can Access |
|---|---|---|---|
| 1 | `GET /api/health/` | Check if server is alive | Everyone |
| 2 | `GET /api/stats/` | Platform statistics | Everyone |
| 3 | `GET /api/quiz/questions/` | Get 20 quiz questions | Everyone |
| 4 | `POST /api/quiz/submit/` | Submit answers → get career prediction | Everyone |
| 5 | `GET /api/quiz/history/` | Past quiz attempts | Everyone |
| 6 | `GET /api/careers/` | List all 15 careers | Everyone |
| 7 | `GET /api/careers/<name>/roadmap/` | Get roadmap + YouTube + salary for one career | Everyone |
| 8 | `POST /api/auth/signup/` | Create new account | Everyone |
| 9 | `POST /api/auth/login/` | Login → get JWT token | Everyone |
| 10 | `POST /api/auth/refresh/` | Get new token when old one expires | Everyone |
| 11 | `GET /api/auth/profile/` | Get current user info | 🔒 Logged in only |
| 12 | `GET/POST /api/progress/<career>/` | Get or save checkbox progress | 🔒 Logged in only |

---

## 🤖 The ML Model — Deep Dive

### How Was It Trained?

1. **Generated 2,100+ training samples** using `generate_data.py`
   - Each sample = 10 skill scores + the correct career label
   - Example: `{python: 0.9, ml_ai: 0.8, ...}` → "Data Scientist"

2. **Trained two models**:
   - **RandomForest**: Creates 200 decision trees, each looks at different parts of the data. Final answer = majority vote.
   - **GradientBoosting**: Creates 100 trees sequentially — each tree tries to fix mistakes of the previous one.

3. **Combined into VotingClassifier** (soft voting):
   - Both models output probabilities for all 15 careers
   - Final probability = weighted average of both
   - This is more reliable than using either model alone

### Why Ensemble?

> **Analogy**: Imagine asking ONE doctor for a diagnosis vs. asking TWO doctors and taking their combined opinion. Two doctors are more reliable. That's what ensemble learning does.

### The 15 Careers It Can Predict:

| # | Career | Fresher Salary | Experienced Salary |
|---|---|---|---|
| 1 | Frontend Developer | ₹3–6 LPA | ₹12–25+ LPA |
| 2 | Backend Developer | ₹4–8 LPA | ₹18–40+ LPA |
| 3 | Full Stack Developer | ₹4.5–7 LPA | ₹12–20+ LPA |
| 4 | Mobile App Developer | ₹5–10 LPA | ₹20–40+ LPA |
| 5 | DevOps Engineer | ₹4–8 LPA | ₹25–50+ LPA |
| 6 | Cloud Engineer | ₹6–12 LPA | ₹30–60+ LPA |
| 7 | Data Analyst | ₹3–6 LPA | ₹12–25 LPA |
| 8 | Data Scientist | ₹6–12 LPA | ₹25–60+ LPA |
| 9 | ML Engineer | ₹8–15 LPA | ₹30–70+ LPA |
| 10 | UI/UX Designer | ₹3–6 LPA | ₹15–30 LPA |
| 11 | Cybersecurity Analyst | ₹5–10 LPA | ₹25–50+ LPA |
| 12 | QA / Test Engineer | ₹3–5 LPA | ₹12–25 LPA |
| 13 | Database Administrator | ₹4–8 LPA | ₹18–35+ LPA |
| 14 | System Administrator | ₹3–6 LPA | ₹12–25 LPA |
| 15 | Network Engineer | ₹3–6 LPA | ₹12–20 LPA |

---

## 🔐 Authentication — How Login Works

### The JWT System (Simple Explanation)

> Think of JWT like a **movie ticket**:
> 1. You go to the counter (signup/login endpoint)
> 2. You show your ID (username + password)
> 3. Counter gives you a **ticket** (JWT access token)
> 4. This ticket is valid for **7 days**
> 5. Every time you want to enter (access a page), you show your ticket
> 6. If the ticket expires, you can **refresh** it without re-entering your ID (using the refresh token, valid 30 days)
> 7. Logout = **throwing away the ticket**

### Route Protection

```
Every page in the app is "protected" by a ProtectedRoute component:

User opens /quiz → ProtectedRoute checks: "Do you have a valid JWT?"
  → YES ✅ → Show the quiz page
  → NO  ❌ → Redirect to /auth (login page)

The ONLY page you can see without logging in is /auth itself.
```

---

## 📱 How the Android APK Works

```
┌─────────────────────────────────────┐
│  Android Phone                      │
│  ┌───────────────────────────────┐  │
│  │  Capacitor WebView            │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │  React App (our code)   │  │  │
│  │  │  Running as a webpage   │  │  │
│  │  │  inside the phone       │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
│                  ↕ HTTPS             │
│           Render.com Cloud           │
│           (Django Backend)           │
└─────────────────────────────────────┘
```

> **Analogy**: The APK is like a **custom web browser** that can ONLY open our app. It's not a separate native app — it's our React website wrapped in an Android shell using **Capacitor**. The advantage? We write code ONCE and it works on both web and Android.

---

## ☁️ Deployment (How It Goes Live)

```
Developer pushes code to GitHub
        ↓
Render.com detects the push (auto-deploy)
        ↓
Render runs build.sh:
  1. pip install -r requirements.txt
  2. python manage.py migrate
  3. python manage.py collectstatic
        ↓
Gunicorn starts serving the Django API
        ↓
URL goes live: https://nevermind-api.onrender.com/api
        ↓
Android APK points to this URL
        ↓
Users worldwide can use the app! 🌍
```

---

## 🎤 Interview-Ready Talking Points

### "Tell me about your project"

> "I built **Never Mind**, an AI-powered career recommendation platform. Users take a 20-question skill assessment, and a machine learning ensemble model — combining RandomForest and GradientBoosting through soft voting — analyzes their skills across 10 dimensions and predicts the best IT career from 15 options with confidence scores. The app also provides personalized learning roadmaps with 180 curated YouTube tutorials and progress tracking. I used React with Vite for the frontend, Django REST Framework for the backend API, JWT for authentication, and deployed on Render.com. It's also available as an Android APK via Capacitor."

### "What makes this project unique?"

> 1. **End-to-end ML pipeline** — from quiz to prediction to roadmap, all automated
> 2. **Ensemble model** — combining two algorithms for more reliable predictions
> 3. **Personalized roadmaps** — not generic advice, but topicized learning paths
> 4. **Progress tracking** — checkboxes saved per-user with backend persistence
> 5. **Full-stack production deployment** — not just a Jupyter notebook, it's a real app with auth, mobile APK, and cloud hosting

### "What challenges did you face?"

> 1. **Slash in URL problem** — Career names like "UI/UX Designer" broke URL routing. I solved it with a dash-slugging system and fuzzy matching on the backend.
> 2. **Render cold starts** — The free tier server sleeps after inactivity. I added 60-second timeouts with retry logic on the frontend.
> 3. **Model size** — The trained model is 48 MB. I used lazy-loading (only loads into memory on first request) to keep startup fast.

### "What would you improve?"

> 1. Switch from SQLite to **PostgreSQL** for persistent production data
> 2. Add **real user data** to retrain the model (instead of synthetic data)
> 3. Implement **Google/GitHub OAuth** alongside password login
> 4. Add **push notifications** when new tutorials are added to a roadmap
> 5. Build an **iOS app** using the same Capacitor codebase

---

## 📊 Project Metrics

| Metric | Value |
|---|---|
| Total Files | ~60+ source files |
| Lines of Code | ~5,000+ |
| API Endpoints | 12 |
| React Components | 10 |
| Quiz Questions | 20 |
| Skill Dimensions | 10 |
| Career Predictions | 15 |
| Roadmap Topics | 180 |
| YouTube Tutorials | 180 |
| Training Samples | 2,100+ |
| Model Size | 48 MB |
| APK Size | 3.3 MB |
| Project Zip | 21 MB |

---

*Built by Jayaram Reddy | 2026*
