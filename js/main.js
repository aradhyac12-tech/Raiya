// Navigation System
function startJourney() {
    window.location.href = 'pages/page1.html';
}

function goToPage(pageNum) {
    const pages = ['page1.html', 'page2.html', 'page3.html', 'thankyou.html'];
    window.location.href = `pages/${pages[pageNum - 1]}`;
}

function goBack() {
    window.history.back();
}

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Page Load Animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-transition');
});

// Canvas Background Animation (Landing Page)
if (document.getElementById('bg-canvas')) {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.5;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 107, 157, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let particle of particles) {
            particle.update();
            particle.draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Space key listener for page 2
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && document.querySelector('.page-2')) {
        e.preventDefault();
        triggerFireworks();
    }
});