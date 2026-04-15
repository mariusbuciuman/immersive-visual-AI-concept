# 🎬 Animated Slideshow

> An immersive, scroll-driven visual experience built with vanilla HTML, CSS, and JavaScript.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-blueviolet?style=flat-square)

---

## ✨ Overview

Animated Slideshow is a scroll-driven, full-screen presentation experience featuring parallax backgrounds, animated canvas effects, smooth section transitions, and a polished UI — all without any frameworks or build tools.

Crafted entirely with **Claude Code**, this project demonstrates what modern vanilla web development can achieve: cinematic motion, layered depth, and fluid interactivity.

---

## 🚀 Features

- **Canvas background animation** — dynamic particle/graphic layer rendered via `<canvas>`
- **Scroll-snapping sections** — six full-viewport sections navigated by scroll or nav dots
- **Parallax imagery** — background images with depth-shift on scroll
- **Animated hero section** — staggered word entrance with gradient text and glowing orbs
- **Floating & parallax elements** — decorative shapes tied to scroll position
- **Feature cards grid** — animated reveal on enter with SVG icons
- **CTA section** — button with hover state swap and background animation
- **Preloader** — spinner overlay that fades out on load
- **Scroll progress bar** — fixed top indicator showing read progress
- **Navigation dots** — clickable section indicators with active state sync
- **Poppins typography** — loaded from Google Fonts for a clean, modern feel

---

## 📁 Project Structure

```
├── index.html          # Main HTML entry point
├── css/
│   └── styles.css      # All styles, animations, and layout
└── js/
    ├── canvas.js       # Canvas animation logic
    ├── animations.js   # Scroll-triggered animation controller
    └── main.js         # App init, nav dots, preloader, scroll progress
```

---

## 🛠 Getting Started

No build tools or dependencies required.

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/animated-slideshow.git
   cd animated-slideshow
   ```

2. **Open in browser**
   ```bash
   # Option A — direct open
   open index.html

   # Option B — local server (recommended to avoid CORS on fonts/images)
   npx serve .
   # or
   python -m http.server 8080
   ```

3. Visit `http://localhost:8080` and scroll away.

---

## 🎨 Customization

| What to change | Where |
|---|---|
| Section backgrounds | `style="background-image: url(...)"` on `.slide-bg` divs in `index.html` |
| Text content | Headings and paragraphs inside each `<section>` |
| Color palette | CSS custom properties at the top of `styles.css` |
| Canvas behavior | `js/canvas.js` |
| Scroll animation timing | `js/animations.js` |
| Number of sections | Add/remove `<section>` tags and matching `<span class="nav-dot">` elements |

---

## 🤖 Built with Claude Code

This project was generated entirely using [Claude Code](https://claude.ai/code) — Anthropic's agentic coding tool. From the HTML structure and CSS animations to the JavaScript scroll logic and canvas layer, every line was written by Claude Code in a single session.

---

## 📄 License

MIT — free to use, modify, and distribute.
