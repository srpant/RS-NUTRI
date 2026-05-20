# 🍽️ Chef Santosh — Recipe Manager

A beautiful, offline-capable **Progressive Web App (PWA)** for professional recipe management. Built with vanilla HTML/CSS/JS — no frameworks, no build step.

## ✨ Features

- 📖 **Recipe Management** — Add, edit, delete, and search recipes
- ⚖️ **Smart Scaling** — Scale any recipe up or down instantly
- 🥗 **Nutrition Calculator** — AI-powered nutritional insights per ingredient
- 📊 **Cost Tracking** — Track ingredient costs and recipe margins
- 🌙 **Three Themes** — Dark, Light (Warm), and Purple modes
- 📲 **Installable PWA** — Add to home screen on any device
- 📴 **Works Offline** — Full offline support via Service Worker
- 📤 **Excel Export** — Export recipes to XLSX

## 🚀 Live Demo

👉 **[Open the App](https://YOUR-USERNAME.github.io/chef-santosh/)**

## 📲 Install as App

### On Android / Chrome
1. Open the app in Chrome
2. Tap the **⋮ menu** → **"Add to Home Screen"** or look for the install banner
3. Tap **Install**

### On iPhone / Safari
1. Open the app in Safari
2. Tap the **Share** button (□↑)
3. Tap **"Add to Home Screen"**
4. Tap **Add**

### On Desktop (Chrome / Edge)
1. Open the app
2. Click the **install icon** (⊕) in the address bar
3. Click **Install**

## 🗂️ File Structure

```
chef-santosh/
├── index.html          ← Main app (single file)
├── manifest.json       ← PWA manifest (install + icons)
├── sw.js               ← Service Worker (offline support)
├── favicon.ico         ← Browser favicon
├── icons/
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png    ← Android / PWA standard
│   ├── icon-384.png
│   ├── icon-512.png    ← Splash screen / Store
│   └── apple-touch-icon.png  ← iOS home screen
└── screenshots/        ← (optional) App store screenshots
    └── screen1.png
```

## 🌐 Deploy to GitHub Pages

1. **Fork or push** this repo to your GitHub account
2. Go to **Settings → Pages**
3. Under **Source**, select `main` branch → `/ (root)`
4. Click **Save** — your app will be live at `https://YOUR-USERNAME.github.io/REPO-NAME/`

> **Important:** GitHub Pages serves over HTTPS, which is required for the Service Worker and PWA install prompt to work.

## 🔧 Local Development

No build tools needed. Just serve the files over HTTP:

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve .

# VS Code
# Install "Live Server" extension and click "Go Live"
```

Then open `http://localhost:8080`

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| UI | Vanilla HTML + CSS (CSS variables, dark mode) |
| Logic | Vanilla JavaScript (ES2020) |
| Fonts | Google Fonts (Playfair Display + DM Sans) |
| Excel | SheetJS (xlsx) |
| AI | Anthropic Claude API (nutrition insights) |
| Offline | Service Worker + Cache API |
| Install | Web App Manifest |

## 📄 License

MIT — free to use and modify.
