class Slideshow {
    constructor() {
        this.slides = document.querySelectorAll('.section-slide');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 6000;
        this.isPaused = false;
        
        this.init();
    }

    init() {
        if (this.slides.length > 0) {
            this.startAutoPlay();
            this.setupHoverPause();
            this.setupVisibilityChange();
        }
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.scrollToSlide(this.currentSlide);
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.scrollToSlide(this.currentSlide);
    }

    scrollToSlide(index) {
        const slide = this.slides[index];
        if (slide) {
            const top = slide.offsetTop;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.scrollToSlide(index);
        this.resetAutoPlay();
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    setupHoverPause() {
        this.slides.forEach(slide => {
            slide.addEventListener('mouseenter', () => {
                this.isPaused = true;
            });
            
            slide.addEventListener('mouseleave', () => {
                this.isPaused = false;
            });
        });
    }

    setupVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.isPaused = true;
            } else {
                this.isPaused = false;
            }
        });
    }
}

class TouchHandler {
    constructor() {
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.minSwipeDistance = 50;
        this.init();
    }

    init() {
        document.addEventListener('touchstart', (e) => {
            this.touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            this.touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const distance = this.touchStartY - this.touchEndY;
        
        if (Math.abs(distance) < this.minSwipeDistance) return;
        
        if (distance > 0) {
        } else {
        }
    }
}

class MouseEffects {
    constructor() {
        this.heroOrbs = document.querySelectorAll('.hero-orb');
        this.init();
    }

    init() {
        if (this.heroOrbs.length === 0) return;
        
        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            this.heroOrbs.forEach((orb, index) => {
                const depth = (index + 1) * 0.3;
                const moveX = mouseX * depth * 0.05;
                const moveY = mouseY * depth * 0.05;
                orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
}

class FeatureCardHover {
    constructor() {
        this.cards = document.querySelectorAll('.feature-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
}

class BackgroundNoise {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.noiseOpacity = 0.03;
        this.frame = 0;
        this.init();
    }

    init() {
        if (window.innerWidth > 768) {
            this.createNoiseCanvas();
            this.animate();
        }
    }

    createNoiseCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: ${this.noiseOpacity};
        `;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.ctx = this.canvas.getContext('2d');
        
        const body = document.querySelector('body');
        body.insertBefore(this.canvas, body.firstChild);
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    generateNoise() {
        const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
            data[i + 3] = 255;
        }
        
        this.ctx.putImageData(imageData, 0, 0);
    }

    animate() {
        if (this.frame % 3 === 0) {
            this.generateNoise();
        }
        this.frame++;
        
        requestAnimationFrame(() => this.animate());
    }
}

class ScrollRotation {
    constructor() {
        this.elements = document.querySelectorAll('.decoration-dot, .floating-shape');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            this.elements.forEach((el, index) => {
                const speed = (index + 1) * 0.5;
                const rotation = scrollTop * speed * 0.05;
                el.style.transform = `rotate(${rotation}deg)`;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Slideshow();
    new TouchHandler();
    new MouseEffects();
    new FeatureCardHover();
    new BackgroundNoise();
    new ScrollRotation();
});
