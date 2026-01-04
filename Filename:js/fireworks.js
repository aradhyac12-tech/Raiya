if (document.getElementById('fireworks-main')) {
    const canvas = document.getElementById('fireworks-main');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let fireworks = [];
    let particles = [];
    
    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 15;
            this.vy = (Math.random() - 0.5) * 15 - 5;
            this.age = 0;
            this.maxAge = 30;
            this.exploded = false;
            this.color = `hsl(${Math.random() * 60 + 330}, 100%, 50%)`; // Red to pink range
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.2; // Gravity
            this.age++;
            
            if (this.age >= this.maxAge && !this.exploded) {
                this.explode();
                this.exploded = true;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        explode() {
            for (let i = 0; i < 80; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
            audioManager.playFirecracker();
        }
    }
    
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.vx = (Math.random() - 0.5) * 15;
            this.vy = (Math.random() - 0.5) * 15;
            this.age = 0;
            this.maxAge = 60;
            this.opacity = 1;
            this.trailLength = 5;
            this.trail = [];
        }
        
        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > this.trailLength) {
                this.trail.shift();
            }
            
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.15; // Gravity
            this.vx *= 0.98; // Air resistance
            this.age++;
            this.opacity = 1 - (this.age / this.maxAge);
        }
        
        draw() {
            // Draw trail
            ctx.strokeStyle = `hsla(${this.color.split('hsl(')[1].split(',')[0]}, 100%, 50%, ${this.opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 0; i < this.trail.length; i++) {
                if (i === 0) ctx.moveTo(this.trail[i].x, this.trail[i].y);
                else ctx.lineTo(this.trail[i].x, this.trail[i].y);
            }
            ctx.stroke();
            
            // Draw particle
            ctx.fillStyle = `hsla(${this.color.split('hsl(')[1].split(',')[0]}, 100%, 50%, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function triggerFireworks() {
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height * 0.6);
            fireworks.push(new Firework(x, y));
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw fireworks
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();
            if (fireworks[i].age > fireworks[i].maxAge + 10) {
                fireworks.splice(i, 1);
            }
        }
        
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].age >= particles[i].maxAge) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Make triggerFireworks globally available
    window.triggerFireworks = triggerFireworks;
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}