# Never Mind — AI Career Intelligence Platform

> **"Never Mind build yourself, I will help."**

An ML-powered career prediction and guidance platform that analyzes your skills across 10 dimensions and maps your ideal career path in IT across 15 career roles.

<p align="center">
  <img src="screenshots_home.png" width="220" />
  <img src="screenshots_quiz.png" width="220" />
  <img src="screenshots_results.png" width="220" />
  <img src="screenshots_careers.png" width="220" />
</p>

---

## ✨ Features

- **20-Question Skill Assessment** — Covers programming, design, systems, and soft skills
- **ML Ensemble Engine** — RandomForest + GradientBoosting trained on synthetic career data
- **15 IT Career Predictions** — With confidence scores and ranking
- **AI Analysis** — Personalized insight based on your skill profile
- **Skill Radar Chart** — Visual representation of your 10-dimension skill vector
- **Learning Roadmap** — Step-by-step timeline with phases and resources
- **Skill Gap Analysis** — Shows what you need to improve
- **Quiz History** — Track past attempts and compare results
- **Offline Caching** — Questions and careers cached for network-free browsing
- **Android APK** — Native-feeling mobile app via Capacitor

---

## 🏗️ Architecture

```
┌─────────────────────────┐     ┌──────────────────────────┐
│   Frontend (React 18)   │────▶│   Backend (Django 5)     │
│   Vite + Tailwind       │     │   REST API + ML Engine   │
│   Capacitor (Android)   │     │   Gunicorn (Production)  │
└─────────────────────────┘     └──────────────────────────┘
                                          │
                                    ┌─────┴─────┐
                                    │ ML Models  │
                                    │ RF + GB    │
                                    │ Ensemble   │
                                    └───────────┘
```

---

## 🚀 Quick Start

### Backend (Django + ML)

```bash
cd Prediction
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (React + Vite)

```bash
cd Frontend
npm install
npm run dev
```

### Android APK

```bash
cd Frontend
npm run build
npx cap sync android
cd android
./gradlew assembleRelease
# APK → android/app/build/outputs/apk/release/app-release.apk
```

---

## 🌐 Cloud Deployment

| Service | URL | Status |
|---------|-----|--------|
| **API** | https://nevermind-api.onrender.com | 🟢 Live |
| **Health** | https://nevermind-api.onrender.com/api/health/ | ✅ |
| **GitHub** | https://github.com/22f3001505/nevermind-api | ✅ |

---

## 📱 Android APK

| Property | Value |
|----------|-------|
| Package | `com.nevermind.career` |
| Version | 2.0 (versionCode 2) |
| Min SDK | Android 7.0 (API 24) |
| Size | ~3.3 MB |
| Signed | ✅ RSA 2048-bit |

---

## 🤖 ML Pipeline

- **Algorithm**: Ensemble (RandomForest + GradientBoosting)
- **Features**: 10 skill dimensions (programming, web, database, etc.)
- **Target**: 15 IT career labels
- **Training**: Synthetic dataset with 2000+ samples
- **Confidence**: Calibrated probability scores per career

### 15 Career Paths

Frontend Developer, Backend Developer, Full Stack Developer, Mobile App Developer, Data Scientist, Data Analyst, ML Engineer, DevOps Engineer, Cloud Architect, Cybersecurity Analyst, UI/UX Designer, Database Administrator, QA Engineer, Systems Architect, Technical Project Manager

---

## 🎨 Design

- **Color scheme**: Monochrome dark (#000000 background, #FFFFFF text)
- **Typography**: Inter (Google Fonts)
- **UI**: Glassmorphism cards, subtle borders, micro-animations
- **Mobile**: Responsive with safe area support, 44px touch targets

---

## 📂 Project Structure

```
├── Frontend/
│   ├── src/
│   │   ├── components/pages/   # Home, Quiz, Results, Careers, Roadmap, History
│   │   ├── components/charts/  # SkillRadar (SVG)
│   │   ├── components/roadmap/ # Timeline component
│   │   ├── hooks/              # useQuiz hook
│   │   ├── services/           # API layer with retry + cache
│   │   └── index.css           # Design system
│   ├── android/                # Capacitor Android project
│   └── capacitor.config.ts
├── Prediction/
│   ├── api/                    # Django REST views + ML engine
│   ├── backend/                # Django settings
│   ├── build.sh                # Render deployment script
│   ├── render.yaml             # Render config
│   └── requirements.txt
└── README.md
```

---

## 📄 License

MIT License — Built for career guidance and education.

---

<p align="center">
  <b>Never Mind</b> — Clarity Engine v2.0<br>
  <sub>Django 5 • React 18 • RandomForest • GradientBoosting • Scikit-learn</sub>
</p>
