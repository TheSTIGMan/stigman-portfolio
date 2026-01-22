# TheSTIGMan | MK-1 Maintenance Unit

> A tactical cyber-avionics portfolio website themed as a military flight-line diagnostic terminal.

![Theme: Tactical Cyber-Avionics](https://img.shields.io/badge/Theme-Tactical%20Cyber%20Avionics-00FF41)
![Built with React](https://img.shields.io/badge/React-18.2-61DAFB)
![Styled with Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC)
![Animated with Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.0-FF0055)

## 🎯 Concept

This portfolio mimics a **military diagnostic terminal** for a System Hardening Expert transitioning from Aircraft Maintenance to Cybersecurity. The UI references DISA STIGs (Security Technical Implementation Guides) and features:

- **CRT Monitor Effects**: Scanlines, phosphor glow, screen curvature
- **Boot Sequence Animation**: Typed loading sequence with progress bar
- **Radar Scope**: Interactive project visualization with CAT I/II severity levels
- **Avionics Gauges**: Skill metrics displayed as RPM-style gauges
- **Artificial Horizon**: Balance indicator between hardware and software expertise
- **AI Auditor**: Simulated continuous monitoring status bar

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/tactical-portfolio.git
cd tactical-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
tactical-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx          # Main application with all components
    └── index.css        # Global styles and CRT effects
```

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Phosphor Green | `#00FF41` | Primary text, borders, active elements |
| Monitor Black | `#0a0f0a` | Background |
| Compliance White | `#FFFFFF` | Verified/Secure indicators |
| Alert Red | `#FF0000` | CAT I critical items |
| Amber | `#FFA500` | CAT II operational items |

### Typography

- **Primary**: VT323 (Google Fonts)
- **Fallback**: Fira Code, monospace

## 🖥️ Features

### [F1] PROFILE - Security Clearance Dossier
Personal bio styled as a classified personnel file with checkmark-style qualifications list and methodology cards.

### [F2] LOGS - Incident Report Archive
Blog-style entries with expandable content and **redacted text** that reveals on hover.

### [F3] AUDITS - Threat Detection Radar
Interactive radar scope where projects appear as blips:
- **CAT I** (Red): Mission-critical projects
- **CAT II** (Amber): Operational tools

### [F4] SYS_DIAGNOSTICS - Capability Metrics
- **RPM Gauges**: Animated skill level indicators
- **Artificial Horizon**: Visual balance between hardware and software expertise

### Recruiter Override
Toggle button (top-right) switches between:
- **CRT Mode**: Full terminal aesthetic with effects
- **Clean Mode**: Professional, readable layout

## 🌐 Deploying to GitHub Pages

### Method 1: Using gh-pages package

```bash
# Update vite.config.js base URL to match your repo name
# base: '/your-repo-name/'

# Deploy
npm run deploy
```

### Method 2: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

Then enable GitHub Pages in your repository settings:
1. Go to Settings → Pages
2. Under "Build and deployment", select "GitHub Actions"

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| F1 | Navigate to Profile |
| F2 | Navigate to Logs |
| F3 | Navigate to Audits |
| F4 | Navigate to Diagnostics |

## 🔧 Customization

### Adding Projects

Edit the `PROJECTS_DATA` array in `App.jsx`:

```javascript
const PROJECTS_DATA = [
  {
    id: 1,
    name: 'PROJECT_NAME',
    cat: 'I',  // or 'II'
    angle: 45,      // Position on radar (degrees)
    distance: 60,   // Distance from center (0-100)
    desc: 'Project description',
    link: 'https://github.com/...'
  },
  // ...
];
```

### Adding Skills

Edit the `SKILLS_DATA` array:

```javascript
const SKILLS_DATA = [
  { name: 'SKILL_NAME', value: 85, category: 'software' }, // or 'hardware'
  // ...
];
```

### Adding Blog Entries

Edit the `LOGS_DATA` array:

```javascript
const LOGS_DATA = [
  {
    id: 'IR-2024-XXX',
    title: 'Entry Title',
    date: '2024.MM.DD',
    redacted: 'Hidden text revealed on hover',
    content: 'Main content text'
  },
  // ...
];
```

## 📄 License

MIT License - Feel free to use this as a template for your own portfolio!

---

**SYSTEM STATUS: OPERATIONAL**  
*Continuous monitoring active. All systems compliant.*
