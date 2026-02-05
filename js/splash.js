initState();

const c = document.getElementById("splash");
const ctx = c.getContext("2d");
function resize(){c.width=innerWidth;c.height=innerHeight}
addEventListener("resize",resize); resize();

function draw(){
  ctx.clearRect(0,0,c.width,c.height);
  const t=Date.now()*0.004;
  const r=120+Math.sin(t)*8;
  const g=ctx.createRadialGradient(c.width/2-30,c.height/2-30,10,c.width/2,c.height/2,220);
  g.addColorStop(0,"#ff6b6b"); g.addColorStop(.5,"#8b0000"); g.addColorStop(1,"#300");
  ctx.fillStyle=g;
  ctx.beginPath(); ctx.arc(c.width/2,c.height/2,r,0,Math.PI*2); ctx.fill();
  requestAnimationFrame(draw);
}
draw();

function enter(){
  if(innerWidth<CONFIG.minWidth){document.body.innerHTML="<h2 style='color:#fff;text-align:center;margin-top:20%'>Laptop only</h2>";return;}
  const p=document.getElementById("pass").value;
  if(p===CONFIG.password){location.href="quiz.html";}
  else if(p===CONFIG.adminPassword){location.href="admin.html";}
  else document.getElementById("err").innerText="Wrong password";
}
