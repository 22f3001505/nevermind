# Never Mind — How to Launch the Web Application
## Complete Setup & Deployment Guide

---

## 📋 Prerequisites (What You Need Installed)

Before launching, make sure your computer has these tools:

| Tool | Version | How to Check | How to Install |
|---|---|---|---|
| **Python** | 3.12+ | `python3 --version` | [python.org/downloads](https://python.org/downloads) |
| **Node.js** | 18+ | `node --version` | [nodejs.org](https://nodejs.org) |
| **npm** | 9+ | `npm --version` | Comes with Node.js |
| **Git** | Any | `git --version` | [git-scm.com](https://git-scm.com) |
| **Android Studio** | Latest | Only needed for APK build | [developer.android.com](https://developer.android.com/studio) |

---

## 🚀 Method 1: Run Locally (Development Mode)

This runs the app on your own computer. Best for testing and development.

### Step 1: Clone the Project

```bash
# If you have the zip file
unzip NeverMind-Project.zip -d NeverMind
cd NeverMind

# OR if cloning from GitHub
git clone https://github.com/22f3001505/nevermind.git
cd nevermind
```

### Step 2: Start the Backend (Django Server)

Open **Terminal 1** and run:

```bash
# Navigate to backend folder
cd Prediction

# Create a virtual environment (one-time setup)
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate          # Mac/Linux
# venv\Scripts\activate           # Windows

# Install Python dependencies (one-time setup)
pip install -r requirements.txt

# Run database migrations (one-time setup)
python manage.py migrate

# Start the Django server
python manage.py runserver 8000
```

You should see:
```
Starting development server at http://127.0.0.1:8000/
```

✅ **Backend is now running at** `http://localhost:8000`

### Step 3: Start the Frontend (React App)

Open **Terminal 2** (keep Terminal 1 running) and run:

```bash
# Navigate to frontend folder
cd Frontend

# Install Node dependencies (one-time setup)
npm install

# Start the Vite dev server
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in 500ms
  ➜  Local:   http://localhost:5173/
```

✅ **Frontend is now running at** `http://localhost:5173`

### Step 4: Open the App

Open your browser and go to:

```
http://localhost:5173
```

You'll see the **login page**. Create an account and start using the app!

### Quick Reference (Copy-Paste Commands):

```bash
# Terminal 1 — Backend
cd Prediction && source venv/bin/activate && python manage.py runserver 8000

# Terminal 2 — Frontend
cd Frontend && npm run dev
```

---

## 🌐 Method 2: Deploy to the Cloud (Production — Render.com)

This makes your app accessible to **anyone on the internet**.

### Step 1: Push Backend to GitHub

```bash
cd Prediction

# Initialize git (if not already)
git init
git remote add origin https://github.com/YOUR_USERNAME/nevermind-api.git

# Push all files
git add -A
git commit -m "Initial backend deployment"
git push -u origin main
```

### Step 2: Create Render.com Service

1. Go to [render.com](https://render.com) and sign up (free)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account
4. Select the `nevermind-api` repository
5. Configure:

| Setting | Value |
|---|---|
| **Name** | `nevermind-api` |
| **Region** | Oregon (US West) |
| **Branch** | `main` |
| **Runtime** | Python |
| **Build Command** | `./build.sh` |
| **Start Command** | `gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120` |
| **Plan** | Free |

6. Add **Environment Variables**:

| Key | Value |
|---|---|
| `DEBUG` | `False` |
| `PYTHON_VERSION` | `3.12.3` |
| `DJANGO_SECRET_KEY` | (click "Generate") |

7. Click **"Create Web Service"**

Wait 3-5 minutes for the build to complete.

✅ **Your API is now live at:** `https://nevermind-api.onrender.com/api`

### Step 3: Update Frontend to Point to Cloud API

Open `Frontend/src/services/api.js` and verify this line:

```javascript
const CLOUD_URL = "https://nevermind-api.onrender.com/api";
```

### Step 4: Deploy Frontend (Option A — Vercel)

1. Push frontend to GitHub:
   ```bash
   cd Frontend
   git init
   git remote add origin https://github.com/YOUR_USERNAME/nevermind.git
   git add -A && git commit -m "Initial frontend" && git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **Import Project** → Select your repo
3. Framework: **Vite** → Deploy

✅ **Your web app is now live at:** `https://nevermind.vercel.app`

### Step 4: Deploy Frontend (Option B — Netlify)

1. Build the frontend:
   ```bash
   cd Frontend && npm run build
   ```

2. Go to [netlify.com](https://netlify.com) → **Sites** → **Drag & drop** the `dist/` folder

✅ **Your web app is now live at:** `https://nevermind.netlify.app`

---

## 📱 Method 3: Build Android APK

### Step 1: Build the Frontend

```bash
cd Frontend

# Build production bundle
npm run build

# Sync with Android project
npx cap sync android
```

### Step 2: Build the APK

```bash
cd android

# Set Android SDK path
export ANDROID_HOME=~/Library/Android/sdk    # Mac
# set ANDROID_HOME=%LOCALAPPDATA%\Android\sdk  # Windows

# Build release APK
./gradlew clean assembleRelease
```

### Step 3: Copy the APK

```bash
cp app/build/outputs/apk/release/app-release.apk ~/Desktop/NeverMind.apk
```

✅ **APK is at** `~/Desktop/NeverMind.apk` (3.3 MB) — install on any Android phone!

### APK Signing Info (for reference)

| Item | Value |
|---|---|
| Keystore | `Frontend/android/nevermind-release.keystore` |
| Alias | `nevermind` |
| Password | `NeverMind2026` |

---

## 🔍 How to Verify Everything Works

### Test 1: Backend Health Check
```bash
curl http://localhost:8000/api/health/
# Expected: {"status": "healthy", ...}
```

### Test 2: Quiz Questions Load
```bash
curl http://localhost:8000/api/quiz/questions/
# Expected: {"questions": [...20 items...]}
```

### Test 3: All 15 Careers Load
```bash
curl http://localhost:8000/api/careers/
# Expected: {"careers": [...15 items...]}
```

### Test 4: Signup Works
```bash
curl -X POST http://localhost:8000/api/auth/signup/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"test123"}'
# Expected: {"message": "Account created successfully", "tokens": {...}}
```

### Test 5: Full System Check (All 15 Careers + YouTube + INR Salary)
```bash
python3 -c "
import urllib.request, json
careers = ['Frontend-Developer','Backend-Developer','Full-Stack-Developer',
           'Mobile-App-Developer','DevOps-Engineer','Cloud-Engineer',
           'Data-Analyst','Data-Scientist','ML-Engineer',
           'UI--UX-Designer','Cybersecurity-Analyst','QA--Test-Engineer',
           'Database-Administrator','System-Administrator','Network-Engineer']
for slug in careers:
    d = json.loads(urllib.request.urlopen(f'http://localhost:8000/api/careers/{slug}/roadmap/').read())
    yt = sum(1 for l in ['beginner','intermediate','advanced'] for t in d.get('roadmap',{}).get(l,[]) if t.get('youtube'))
    inr = '✅' if d.get('salary_inr',{}).get('fresher') else '❌'
    name = slug.replace('--','/').replace('-',' ')
    print(f'  ✅ {name:28s} YT:{yt}/12  INR:{inr}')
"
```

---

## ⚠️ Troubleshooting

### Problem: "Module not found" errors

```bash
# Backend
cd Prediction && source venv/bin/activate && pip install -r requirements.txt

# Frontend
cd Frontend && npm install
```

### Problem: "Port already in use"

```bash
# Kill processes on port 8000 (backend)
lsof -ti:8000 | xargs kill -9

# Kill processes on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Problem: Database errors

```bash
cd Prediction
source venv/bin/activate
python manage.py makemigrations
python manage.py migrate
```

### Problem: Render.com shows "Build Failed"

Check that your `build.sh` has execute permissions:
```bash
chmod +x build.sh
git add build.sh && git commit -m "fix permissions" && git push
```

### Problem: "Render server takes 30-60 seconds to respond"

This is normal! Render's free tier **sleeps after 15 minutes of inactivity**. The first request "wakes it up". The app has a 60-second timeout with retry logic built in.

### Problem: APK shows "Career not found" for UI/UX or QA

This was fixed with the **dash-slugging system**. Make sure your latest code is built:
```bash
cd Frontend && npm run build && npx cap sync android
cd android && ./gradlew clean assembleRelease
```

---

## 📊 Architecture Summary

```
┌──────────────────────────────────────────────┐
│                 USER'S DEVICE                │
│   📱 Android APK  or  🌐 Web Browser         │
└──────────────────┬───────────────────────────┘
                   │ HTTPS
┌──────────────────▼───────────────────────────┐
│            FRONTEND (React + Vite)            │
│                                               │
│  Auth → Home → Quiz → Results → Careers       │
│              → Roadmap → History              │
│                                               │
│  AuthContext (JWT) ←→ api.js (Fetch+Retry)    │
└──────────────────┬───────────────────────────┘
                   │ REST API (12 endpoints)
┌──────────────────▼───────────────────────────┐
│            BACKEND (Django 5 + DRF)           │
│                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │  Skill   │ │ ML Model │ │   Roadmap    │  │
│  │  Engine  │ │ (RF+GB)  │ │   Engine     │  │
│  └────┬─────┘ └────┬─────┘ └──────┬───────┘  │
│       │             │              │          │
│  ┌────▼─────────────▼──────────────▼───────┐  │
│  │          SQLite Database                │  │
│  │  Users | Quizzes | Skills | Progress    │  │
│  └─────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

---

## 🔗 Important URLs & Credentials

| Resource | Value |
|---|---|
| **Local Frontend** | http://localhost:5173 |
| **Local Backend** | http://localhost:8000 |
| **Cloud API** | https://nevermind-api.onrender.com/api |
| **GitHub (Frontend)** | github.com/22f3001505/nevermind |
| **GitHub (Backend)** | github.com/22f3001505/nevermind-api |
| **APK** | ~/Desktop/NeverMind.apk |
| **Keystore Password** | NeverMind2026 |

---

*Last updated: April 2026 | Never Mind v2.0*
