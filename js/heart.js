if (document.getElementById('realistic-heart')) {
    const canvas = document.getElementById('realistic-heart');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    let beatPhase = 0;
    const heartColor = '#ff3d47';
    const glowColor = '#ff6b9d';
    
    function drawRealísticHeart(x, y, size, beat) {
        // Left ventricle
        ctx.fillStyle = heartColor;
        ctx.beginPath();
        ctx.ellipse(x - size/3, y, size/2.5, size/2.2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Right ventricle
        ctx.beginPath();
        ctx.ellipse(x + size/3, y, size/2.5, size/2.2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Left atrium (top left)
        ctx.beginPath();
        ctx.ellipse(x - size/3.5, y - size/2, size/3, size/2.5, -0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Right atrium (top right)
        ctx.beginPath();
        ctx.ellipse(x + size/3.5, y - size/2, size/3, size/2.5, 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.ellipse(x, y, size/2, size/1.8, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
    
    function animate() {
        beatPhase = (beatPhase + 0.02) % (Math.PI * 2);
        
        // Heartbeat pattern: quick pump, slight delay, another pump
        let beatIntensity = 0;
        const normalized = beatPhase / (Math.PI * 2);
        
        if (normalized < 0.15) {
            beatIntensity = normalized / 0.15; // First beat
        } else if (normalized < 0.25) {
            beatIntensity = (0.25 - normalized) / 0.1; // Relax
        } else if (normalized < 0.35) {
            beatIntensity = (normalized - 0.25) / 0.1; // Second beat
        } else if (normalized < 0.45) {
            beatIntensity = (0.45 - normalized) / 0.1; // Relax
        }
        
        const sizeBase = canvas.offsetWidth / 4;
        const finalSize = sizeBase + beatIntensity * 40;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw heart
        drawRealísticHeart(canvas.offsetWidth / 2, canvas.offsetHeight / 2, finalSize, beatIntensity);
        
        // Play heartbeat sound at peak
        if (beatIntensity > 0.95 && beatIntensity < 1) {
            audioManager.playHeartbeat();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    });
}