# 🎬 Immersive Visual AI Concept

> An immersive, scroll-driven visual experience built with vanilla HTML, CSS, and JavaScript — created entirely with Claude Code.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-blueviolet?style=flat-square)

---

## 🌐 Live Demo

**[👉 View it live here](https://mariusbuciuman.github.io/immersive-visual-AI-concept/)**

---

## ✨ Overview

Immersive Visual AI Concept is a scroll-driven, full-screen presentation experience featuring parallax backgrounds, animated canvas effects, smooth section transitions, and a polished UI — all without any frameworks or build tools.

The project walks you through six cinematic sections:

- **Hero** — animated title reveal with glowing orbs and gradient text
- **Mountain Serenity** — parallax nature imagery with layered overlays
- **Urban Dreams** — city scene with floating geometric shapes
- **Ocean Whispers** — deep-toned slide with parallax depth elements
- **Amazing Features** — animated feature cards grid
- **Ready to Create?** — full-screen CTA with background animation

---

## 🚀 Features

- **Canvas background animation** — dynamic particle layer rendered via `<canvas>`
- **Scroll-snapping sections** — six full-viewport sections navigated by scroll or nav dots
- **Parallax imagery** — background images with depth shift on scroll
- **Animated hero section** — staggered word entrance with gradient text and glowing orbs
- **Floating & parallax decorations** — shapes tied to scroll position
- **Feature cards grid** — animated reveal on scroll enter with SVG icons
- **CTA section** — button with hover state swap and background animation
- **Preloader** — spinner overlay that fades out on load
- **Scroll progress bar** — fixed top indicator showing read progress
- **Navigation dots** — clickable section indicators with active state sync
- **Poppins typography** — loaded from Google Fonts

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

## 🎨 Customization

| What to change | Where |
|---|---|
| Section backgrounds | `style="background-image: url(...)"` on `.slide-bg` divs in `index.html` |
| Text content | Headings and paragraphs inside each `<section>` |
| Color palette | CSS custom properties at the top of `styles.css` |
| Canvas behavior | `js/canvas.js` |
| Scroll animation timing | `js/animations.js` |
| Number of sections | Add/remove `<section>` tags and matching `.nav-dot` elements |

---

## 🤖 Built with Claude Code

This project was generated entirely using [Claude Code](https://claude.ai/code) — Anthropic's agentic coding tool. From the HTML structure and CSS animations to the JavaScript scroll logic and canvas layer, every line was written by Claude Code.

---

## 📄 License

MIT — free to use, modify, and distribute.
