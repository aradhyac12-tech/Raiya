let bpm=CONFIG.bpmNormal;

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,0.1,1000);
camera.position.z=3;

const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

const geo=new THREE.SphereGeometry(1,128,128);
const mat=new THREE.MeshPhysicalMaterial({
  color:0x8b0000, roughness:.3, metalness:.1, clearcoat:.6, clearcoatRoughness:.2
});
const heart=new THREE.Mesh(geo,mat);
scene.add(heart);

const light=new THREE.PointLight(0xff4444,2,10); light.position.set(2,2,3); scene.add(light);

function animate(){
  requestAnimationFrame(animate);
  const beat=1+Math.pow(Math.sin(Date.now()*0.004),4)*0.18;
  heart.scale.setScalar(beat);
  renderer.render(scene,camera);
}
animate();

eyes.onclick=()=>{
  switchSong();
  const i=setInterval(()=>{ if(bpm<CONFIG.bpmHigh){bpm++; bpmEl();} else clearInterval(i); },120);
};
function bpmEl(){ document.getElementById("bpm").textContent=`${bpm} BPM`; }
