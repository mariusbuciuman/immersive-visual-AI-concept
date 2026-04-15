class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.scrollProgress = document.querySelector('.scroll-progress');
        this.parallaxElements = document.querySelectorAll('.parallax-element');
        this.floatingElements = document.querySelectorAll('.floating-elements');
        
        this.currentSection = 0;
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollProgress();
        this.setupParallax();
        this.setupKeyboardNav();
        this.setupSmoothScroll();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    const sectionIndex = Array.from(this.sections).indexOf(entry.target);
                    this.updateNavDots(sectionIndex);
                    this.currentSection = sectionIndex;
                }
            });
        }, options);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    updateNavDots(index) {
        this.navDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    setupScrollProgress() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            if (this.scrollProgress) {
                this.scrollProgress.style.width = `${scrollPercent}%`;
            }
        });
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            this.parallaxElements.forEach((el, index) => {
                const speed = (index + 1) * 0.3;
                const yPos = scrollTop * speed * 0.1;
                el.style.transform = `translateY(${yPos}px)`;
            });
            
            const floatingShapes = document.querySelectorAll('.floating-shape');
            floatingShapes.forEach((el, index) => {
                const speed = (index + 1) * 0.2;
                const yPos = scrollTop * speed * 0.15;
                const xPos = Math.sin(scrollTop * 0.001 + index) * 20;
                el.style.transform = `translateY(${yPos}px) translateX(${xPos}px)`;
            });
        });
        
        window.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            this.parallaxElements.forEach((el, index) => {
                const depth = (index + 1) * 0.5;
                const moveX = (mouseX * depth) * 0.02;
                const moveY = (mouseY * depth) * 0.02;
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

    setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                this.goToSection(Math.min(this.currentSection + 1, this.sections.length - 1));
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                this.goToSection(Math.max(this.currentSection - 1, 0));
            }
        });
    }

    setupSmoothScroll() {
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSection(index);
            });
            
            dot.addEventListener('mouseenter', () => {
                dot.style.transform = 'scale(1.5)';
            });
            
            dot.addEventListener('mouseleave', () => {
                if (!dot.classList.contains('active')) {
                    dot.style.transform = 'scale(1)';
                }
            });
        });
        
        document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
            this.goToSection(1);
        });
    }

    goToSection(index) {
        if (index >= 0 && index < this.sections.length) {
            const section = this.sections[index];
            const top = section.offsetTop;
            
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    }
}

class Preloader {
    constructor() {
        this.preloader = document.querySelector('.preloader');
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hide();
            }, 1500);
        });
    }

    hide() {
        this.preloader.classList.add('hidden');
    }
}

class CTAButton {
    constructor() {
        this.button = document.querySelector('.cta-button');
        this.init();
    }

    init() {
        if (!this.button) return;
        
        this.button.addEventListener('click', (e) => {
            this.createRipple(e);
            this.createParticles();
        });
    }

    createRipple(e) {
        const rect = this.button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            width: ${size}px;
            height: ${size}px;
            left: ${e.clientX - rect.left - size / 2}px;
            top: ${e.clientY - rect.top - size / 2}px;
            transform: scale(0);
            animation: ripple-effect 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    createParticles() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const rect = this.button.getBoundingClientRect();
        
        canvas.width = rect.width + 40;
        canvas.height = rect.height + 40;
        canvas.style.cssText = `
            position: fixed;
            left: ${rect.left - 20}px;
            top: ${rect.top - 20}px;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(canvas);
        
        const particles = [];
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: rect.width / 2,
                y: rect.height / 2,
                vx: (Math.random() - 0.5) * 15,
                vy: (Math.random() - 0.5) * 15 - 5,
                size: Math.random() * 6 + 2,
                hue: Math.random() * 60 + 260,
                opacity: 1,
                life: 1
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            let alive = false;
            
            for (const p of particles) {
                if (p.life <= 0) continue;
                alive = true;
                
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.3;
                p.life -= 0.02;
                p.opacity = p.life;
                
                ctx.beginPath();
                ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.opacity})`;
                ctx.arc(p.x + 20, p.y + 20, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            if (alive) {
                requestAnimationFrame(animate);
            } else {
                canvas.remove();
            }
        };
        
        animate();
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new Preloader();
    new CTAButton();
});
