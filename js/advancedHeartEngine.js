window.initRealHeart = function(canvasId, bpmTarget){

    let c = document.getElementById(canvasId);
    let ctx = c.getContext("2d");

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    let bpm = 72;

    function drawHeart(bpmRate){

        ctx.clearRect(0,0,c.width,c.height);

        const centerX = c.width / 2;
        const centerY = c.height / 2;

        const time = Date.now() * (bpmRate / 8000);

        const beat = 1 + Math.pow(Math.sin(time), 4) * 0.18;

        const scale = 14 * beat;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(Math.PI);

        ctx.shadowBlur = 60;
        ctx.shadowColor = "rgba(120, 0, 0, 0.8)";

        ctx.beginPath();

        for (let t = 0; t <= Math.PI * 2; t += 0.01) {

            const x = 16 * Math.pow(Math.sin(t), 3);
            const y =
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t);

            ctx.lineTo(x * scale, y * scale);
        }

        ctx.closePath();

        let gradient = ctx.createRadialGradient(-30, -40, 20, 0, 0, 250);

        gradient.addColorStop(0, "#ff2e2e");
        gradient.addColorStop(0.3, "#b30000");
        gradient.addColorStop(0.6, "#8B0000");
        gradient.addColorStop(1, "#330000");

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(-40, -50, 18, 28, Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.18)";
        ctx.fill();

        ctx.restore();

        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("BPM: " + bpmRate, 50, 50);

        requestAnimationFrame(() => drawHeart(bpm));
    }

    window.raiseHeartBeat = function(){

        let interval = setInterval(()=>{

            if(bpm < bpmTarget){
                bpm += 1;
            }else{
                clearInterval(interval);
            }

        }, 200);
    }

    drawHeart(bpm);
}
