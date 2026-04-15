class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 4 + 2;
        this.baseSize = this.size;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.baseOpacity = this.opacity;
        this.hue = Math.random() * 60 + 240;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.drift = Math.random() * Math.PI * 2;
        this.driftSpeed = Math.random() * 0.01 + 0.005;
    }

    update(mouseX, mouseY) {
        this.drift += this.driftSpeed;
        this.x += this.speedX + Math.sin(this.drift) * 0.3;
        this.y += this.speedY + Math.cos(this.drift) * 0.3;
        
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 3;
            this.y += Math.sin(angle) * force * 3;
            this.size = this.baseSize + force * 3;
            this.opacity = this.baseOpacity + force * 0.3;
        } else {
            this.size = this.baseSize;
            this.opacity = this.baseOpacity;
        }
        
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
    }

    draw(ctx) {
        const time = Date.now() * 0.001;
        const pulse = Math.sin(time * this.pulseSpeed * 100 + this.pulseOffset) * 0.3 + 0.7;
        
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 80%, 60%, ${this.opacity * pulse})`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 80%, 50%, ${this.opacity * pulse * 0.5})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 80%, 40%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

class MouseTrail {
    constructor() {
        this.points = [];
        this.maxPoints = 30;
        this.colors = [
            { h: 260, s: 80, l: 65 },
            { h: 320, s: 80, l: 70 },
            { h: 190, s: 90, l: 60 }
        ];
    }

    addPoint(x, y) {
        this.points.push({
            x, y,
            opacity: 1,
            size: Math.random() * 6 + 4,
            color: this.colors[Math.floor(Math.random() * this.colors.length)]
        });
        
        if (this.points.length > this.maxPoints) {
            this.points.shift();
        }
    }

    update() {
        for (let i = this.points.length - 1; i >= 0; i--) {
            this.points[i].opacity -= 0.03;
            this.points[i].size *= 0.96;
            
            if (this.points[i].opacity <= 0) {
                this.points.splice(i, 1);
            }
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.points.length - 1; i++) {
            const p1 = this.points[i];
            const p2 = this.points[i + 1];
            
            if (p1.opacity <= 0 || p2.opacity <= 0) continue;
            
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `hsla(${p1.color.h}, ${p1.color.s}%, ${p1.color.l}%, ${p1.opacity})`);
            gradient.addColorStop(1, `hsla(${p2.color.h}, ${p2.color.s}%, ${p2.color.l}%, ${p2.opacity})`);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = p1.size;
            ctx.lineCap = 'round';
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
        
        for (const point of this.points) {
            if (point.opacity <= 0) continue;
            
            const gradient = ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, point.size * 2
            );
            gradient.addColorStop(0, `hsla(${point.color.h}, ${point.color.s}%, ${point.color.l}%, ${point.opacity})`);
            gradient.addColorStop(1, `hsla(${point.color.h}, ${point.color.s}%, ${point.color.l}%, 0)`);
            
            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(point.x, point.y, point.size * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

class FloatingOrb {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 150 + 80;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.15 + 0.08;
        this.hue = Math.random() * 40 + 260;
        this.phaseX = Math.random() * Math.PI * 2;
        this.phaseY = Math.random() * Math.PI * 2;
        this.amplitudeX = Math.random() * 100 + 50;
        this.amplitudeY = Math.random() * 80 + 40;
        this.frequencyX = Math.random() * 0.0005 + 0.001;
        this.frequencyY = Math.random() * 0.0008 + 0.0015;
    }

    update(time) {
        this.x = this.baseX + Math.sin(time * this.frequencyX + this.phaseX) * this.amplitudeX;
        this.y = this.baseY + Math.cos(time * this.frequencyY + this.phaseY) * this.amplitudeY;
        
        if (this.x < -this.size) this.baseX += this.canvas.width + this.size * 2;
        if (this.x > this.canvas.width + this.size) this.baseX -= this.canvas.width + this.size * 2;
        if (this.y < -this.size) this.baseY += this.canvas.height + this.size * 2;
        if (this.y > this.canvas.height + this.size) this.baseY -= this.canvas.height + this.size * 2;
    }

    draw(ctx) {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, ${this.opacity})`);
        gradient.addColorStop(0.4, `hsla(${this.hue + 20}, 60%, 50%, ${this.opacity * 0.6})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 50%, 40%, 0)`);
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Star {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.baseOpacity = this.opacity;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
    }

    update(time) {
        this.opacity = this.baseOpacity * (0.5 + 0.5 * Math.sin(time * this.twinkleSpeed * 100 + this.twinklePhase));
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class CanvasAnimation {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.trail = new MouseTrail();
        this.orbs = [];
        this.stars = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.mouseInCanvas = false;
        this.gradientMesh = { x: 0.5, y: 0.5 };
        this.targetGradientMesh = { x: 0.5, y: 0.5 };
        
        this.resize();
        this.init();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        const particleCount = Math.min(150, Math.floor((this.canvas.width * this.canvas.height) / 10000));
        this.particles = [];
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
        
        const orbCount = 6;
        this.orbs = [];
        for (let i = 0; i < orbCount; i++) {
            this.orbs.push(new FloatingOrb(this.canvas));
        }
        
        const starCount = Math.floor((this.canvas.width * this.canvas.height) / 8000);
        this.stars = [];
        for (let i = 0; i < starCount; i++) {
            this.stars.push(new Star(this.canvas));
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.init();
        });
        
        document.addEventListener('mousemove', (e) => {
            this.lastMouseX = this.mouseX;
            this.lastMouseY = this.mouseY;
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.mouseInCanvas = true;
            
            this.targetGradientMesh.x = this.mouseX / this.canvas.width;
            this.targetGradientMesh.y = this.mouseY / this.canvas.height;
            
            if (Math.abs(this.mouseX - this.lastMouseX) > 5 || Math.abs(this.mouseY - this.lastMouseY) > 5) {
                this.trail.addPoint(this.mouseX, this.mouseY);
            }
        });
        
        document.addEventListener('mouseleave', () => {
            this.mouseInCanvas = false;
        });
    }

    drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#0f0f23');
        gradient.addColorStop(0.5, '#1a1a3e');
        gradient.addColorStop(1, '#0f0f23');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGradientMesh(time) {
        this.gradientMesh.x += (this.targetGradientMesh.x - this.gradientMesh.x) * 0.05;
        this.gradientMesh.y += (this.targetGradientMesh.y - this.gradientMesh.y) * 0.05;
        
        const meshX = this.canvas.width * this.gradientMesh.x;
        const meshY = this.canvas.height * this.gradientMesh.y;
        
        const gradient1 = this.ctx.createRadialGradient(
            meshX - 200, meshY - 100, 0,
            meshX - 200, meshY - 100, 400
        );
        gradient1.addColorStop(0, 'rgba(102, 126, 234, 0.15)');
        gradient1.addColorStop(1, 'rgba(102, 126, 234, 0)');
        
        const gradient2 = this.ctx.createRadialGradient(
            meshX + 200, meshY + 100, 0,
            meshX + 200, meshY + 100, 350
        );
        gradient2.addColorStop(0, 'rgba(240, 147, 251, 0.12)');
        gradient2.addColorStop(1, 'rgba(240, 147, 251, 0)');
        
        const gradient3 = this.ctx.createRadialGradient(
            meshX, meshY - 200, 0,
            meshX, meshY - 200, 300
        );
        gradient3.addColorStop(0, 'rgba(79, 172, 254, 0.1)');
        gradient3.addColorStop(1, 'rgba(79, 172, 254, 0)');
        
        this.ctx.fillStyle = gradient1;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = gradient2;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = gradient3;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (1 - distance / 100) * 0.15;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        const time = Date.now();
        
        this.drawBackground();
        this.drawGradientMesh(time);
        
        for (const star of this.stars) {
            star.update(time);
            star.draw(this.ctx);
        }
        
        for (const orb of this.orbs) {
            orb.update(time);
            orb.draw(this.ctx);
        }
        
        this.drawConnections();
        
        for (const particle of this.particles) {
            particle.update(this.mouseX, this.mouseY);
            particle.draw(this.ctx);
        }
        
        this.trail.update();
        this.trail.draw(this.ctx);
        
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CanvasAnimation();
});
