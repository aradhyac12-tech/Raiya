import React, { useState, useEffect, useRef } from 'react';
import { Lock, ChevronRight, Volume2, Heart } from 'lucide-react';

const ValentineExperience = () => {
  const [page, setPage] = useState(0);
  const [pageTransition, setPageTransition] = useState(false);
  const [password, setPassword] = useState('');
  const [bpm, setBpm] = useState(72);
  const [heartPhase, setHeartPhase] = useState(0);
  const [shayariText, setShayariText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noButtonText, setNoButtonText] = useState('No');
  const [noMessageIndex, setNoMessageIndex] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  
  // New state for page 5 phasing
  const [adrenalinePhase, setAdrenalinePhase] = useState(0); // 0: normal heart, 1: text, 2: eyes + racing heart
  
  const audioRef = useRef(null);
  const audio2Ref = useRef(null);
  const canvasRef = useRef(null);
  const heartContainerRef = useRef(null);
  const adrenalineTimerRef = useRef(null);
  
  const [metDate, setMetDate] = useState({ day: null, month: null, year: null });
  const [proposeDate, setProposeDate] = useState({ day: null, month: null, year: null });

  const noMessages = ["Are you sure?", "Really sure??", "Pookie please...", "Think about it!", "I'll be sad...", "Very sad...", "Please say yes! ❤️"];
  const shayariLines = ["na dur na karib hai tu", "par mere dil ke pass hai tu", "kabhi ruthna to kabhi manana hai", "kabhi pyar to kabhi gussa hai", "chod ye bato ko tu", "muze toh tuze chahna hai", "bate band mat kara kr muzse", "tere pyar mai he to fida hai hum", "", "wrote by - aradhya"];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const transitionPage = (newPage) => {
    setPageTransition(true);
    setTimeout(() => {
      setPage(newPage);
      setPageTransition(false);
      if (newPage === 5) {
        setAdrenalinePhase(0);
        setBpm(72);
      }
    }, 400);
  };

  // Adrenaline phase controller for page 5
  useEffect(() => {
    if (page === 5) {
      // Phase 0: Normal heartbeat for 2 seconds
      adrenalineTimerRef.current = setTimeout(() => {
        setAdrenalinePhase(1);
        // Phase 1: Show text for 2 seconds
        setTimeout(() => {
          setAdrenalinePhase(2);
        }, 2000);
      }, 2000);

      return () => {
        if (adrenalineTimerRef.current) {
          clearTimeout(adrenalineTimerRef.current);
        }
      };
    }
  }, [page]);

  // Heart rate controller
  useEffect(() => {
    if (page === 5 && adrenalinePhase === 2) {
      // Racing heartbeat when eyes appear
      let currentBpm = 72;
      const targetBpm = 125;
      const interval = setInterval(() => {
        currentBpm = Math.min(currentBpm + 1.5, targetBpm);
        setBpm(currentBpm + Math.random() * 8 - 4);
        setHeartPhase(prev => (prev + 0.15) % 1);
      }, 100);
      return () => clearInterval(interval);
    } else if (page === 4 || (page === 5 && adrenalinePhase < 2)) {
      // Normal heartbeat
      const interval = setInterval(() => {
        setBpm(72 + Math.random() * 6 - 3);
        setHeartPhase(prev => (prev + 0.1) % 1);
      }, 60000 / 72);
      return () => clearInterval(interval);
    }
  }, [page, adrenalinePhase]);

  useEffect(() => {
    if (page === 5 || page === 6) {
      if (audio2Ref.current) {
        audio2Ref.current.currentTime = 0;
        audio2Ref.current.play();
      }
      if (audioRef.current) audioRef.current.pause();
    } else {
      if (audio2Ref.current) audio2Ref.current.pause();
      if (audioRef.current && page > 3) audioRef.current.play();
    }
  }, [page]);

  useEffect(() => {
    if ((page === 4 || page === 5) && heartContainerRef.current && !heartContainerRef.current.hasChildNodes()) {
      initThreeJSHeart(heartContainerRef.current, page === 5 && adrenalinePhase === 2);
    }
  }, [page, adrenalinePhase]);

  useEffect(() => {
    if (page === 10 && currentLine < shayariLines.length) {
      const line = shayariLines[currentLine];
      let charIndex = 0;
      const interval = setInterval(() => {
        if (charIndex <= line.length) {
          setShayariText(prev => {
            const lines = prev.split('\n');
            lines[currentLine] = line.substring(0, charIndex);
            return lines.join('\n');
          });
          charIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentLine(prev => prev + 1);
            setShayariText(prev => prev + '\n');
          }, 500);
        }
      }, 80);
      return () => clearInterval(interval);
    }
  }, [page, currentLine]);

  useEffect(() => {
    if (showFireworks && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const fireworks = [];
      const particles = [];
      
      class Firework {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = canvas.height;
          this.targetY = Math.random() * canvas.height * 0.5;
          this.vy = -8;
          this.exploded = false;
        }
        update() {
          if (!this.exploded) {
            this.y += this.vy;
            if (this.y <= this.targetY) {
              this.exploded = true;
              for (let i = 0; i < 50; i++) particles.push(new Particle(this.x, this.y));
            }
          }
        }
        draw() {
          if (!this.exploded) {
            ctx.fillStyle = '#dc2626';
            ctx.fillRect(this.x, this.y, 3, 3);
          }
        }
      }
      
      class Particle {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.vx = (Math.random() - 0.5) * 8;
          this.vy = (Math.random() - 0.5) * 8;
          this.alpha = 1;
          this.color = `hsl(${Math.random() * 20 + 340}, 70%, 50%)`;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.vy += 0.1;
          this.alpha -= 0.01;
        }
        draw() {
          ctx.globalAlpha = this.alpha;
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, 2, 2);
        }
      }
      
      function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (Math.random() < 0.05) fireworks.push(new Firework());
        fireworks.forEach((fw, i) => { fw.update(); fw.draw(); if (fw.exploded) fireworks.splice(i, 1); });
        particles.forEach((p, i) => { p.update(); p.draw(); if (p.alpha <= 0) particles.splice(i, 1); });
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
      }
      animate();
    }
  }, [showFireworks]);

  const initThreeJSHeart = (container, shouldRamp) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
      import { FBXLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/FBXLoader.js';
      import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

      const stats = { currentBPM: 72, targetBPM: ${shouldRamp ? 125 : 72}, accumulatedPhase: 0 };
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 2000);
      camera.position.set(0, 20, 50);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      const ambient = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambient);
      const topLight = new THREE.SpotLight(0xffffff, 2);
      topLight.position.set(20, 50, 20);
      topLight.castShadow = true;
      scene.add(topLight);
      const redRim = new THREE.PointLight(${shouldRamp ? '0xff0033' : '0xff0000'}, ${shouldRamp ? 3 : 2}, 100);
      redRim.position.set(-30, 0, -20);
      scene.add(redRim);

      let heartGroup, heartShader;
      const loader = new FBXLoader();

      loader.load('/assets/Heart.fbx', (object) => {
        heartGroup = object;
        heartGroup.scale.setScalar(0.1);
        heartGroup.traverse(child => {
          if (child.isMesh) {
            child.material.roughness = 0.1;
            child.material.metalness = 0.1;
            if(child.material.map) child.material.map.anisotropy = 16;
            child.material.onBeforeCompile = (shader) => {
              shader.uniforms.uPhase = { value: 0 };
              shader.vertexShader = 'uniform float uPhase;\\n' + shader.vertexShader;
              shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', \`float beat = pow(sin(uPhase), 10.0) * 1.2 + pow(sin(uPhase - 0.5), 12.0) * 0.7; float mask = smoothstep(20.0, -10.0, position.y); vec3 transformed = vec3(position) + (normal * beat * mask);\`);
              heartShader = shader;
            };
          }
        });
        scene.add(heartGroup);
      });

      const clock = new THREE.Clock();
      let startTime = null;

      function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();
        if (${shouldRamp}) {
          if (!startTime) startTime = elapsed;
          const rampElapsed = elapsed - startTime;
          if (rampElapsed > 0) {
            const rampProgress = Math.min(rampElapsed / 8, 1);
            stats.currentBPM = 72 + (stats.targetBPM - 72) * rampProgress;
          }
        }
        const hz = stats.currentBPM / 60;
        stats.accumulatedPhase += delta * Math.PI * 2 * hz;
        if (heartShader) heartShader.uniforms.uPhase.value = stats.accumulatedPhase;
        if (heartGroup) heartGroup.rotation.y += 0.003;
        controls.update();
        renderer.render(scene, camera);
      }
      animate();
    `;
    document.body.appendChild(script);
  };

  const IOSPicker = ({ value, onChange, max, label, min = 1 }) => {
    const scrollRef = useRef(null);
    const isUserScrolling = useRef(false);
    const scrollTimeout = useRef(null);
    const hasInitialized = useRef(false);
    
    useEffect(() => {
      if (scrollRef.current && value !== null && !isUserScrolling.current && hasInitialized.current) {
        const itemHeight = 56;
        const containerHeight = scrollRef.current.clientHeight;
        const targetScroll = (value - min) * itemHeight - containerHeight / 2 + itemHeight / 2;
        scrollRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
      hasInitialized.current = true;
    }, [value, min]);

    const handleScroll = () => {
      isUserScrolling.current = true;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        if (scrollRef.current) {
          const itemHeight = 56;
          const containerHeight = scrollRef.current.clientHeight;
          const scrollTop = scrollRef.current.scrollTop;
          const centerPosition = scrollTop + containerHeight / 2;
          const newValue = Math.round(centerPosition / itemHeight) + min;
          if (newValue >= min && newValue <= max && newValue !== value) onChange(newValue);
        }
        setTimeout(() => { isUserScrolling.current = false; }, 100);
      }, 150);
    };

    return (
      <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="text-xs text-white/60 mb-3 uppercase tracking-widest font-semibold">{label}</div>
        <div className="relative">
          <div ref={scrollRef} onScroll={handleScroll} onTouchStart={() => { isUserScrolling.current = true; }} onMouseDown={() => { isUserScrolling.current = true; }} className="h-56 w-28 overflow-y-scroll scrollbar-hide relative bg-stone-950/30 rounded-2xl backdrop-blur-xl border border-white/5" style={{ scrollSnapType: 'y mandatory', WebkitOverflowScrolling: 'touch' }}>
            <div className="py-28">
              {Array.from({ length: max - min + 1 }, (_, i) => i + min).map(num => (
                <div key={num} onClick={() => { onChange(num); isUserScrolling.current = false; }} className="h-14 flex items-center justify-center text-5xl font-light cursor-pointer transition-all duration-300" style={{ color: num === value ? '#ffffff' : '#52525b', transform: num === value ? 'scale(1.15)' : 'scale(0.7)', scrollSnapAlign: 'center', opacity: num === value ? 1 : 0.3, fontWeight: num === value ? '400' : '200' }}>
                  {num.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-14 border-y border-white/20 pointer-events-none rounded-lg glow-pulse" />
        </div>
      </div>
    );
  };

  const GlassButton = ({ onClick, children, className = "" }) => (
    <button onClick={onClick} className={`group relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/15 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)]" />
      {children}
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="mb-8 relative">
            <Heart className="w-24 h-24 text-stone-500 mx-auto animate-pulse-scale" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-transparent border-t-stone-600 rounded-full animate-spin-slow" />
            </div>
          </div>
          <div className="text-stone-400 text-2xl font-light mb-6 animate-fade-in">Loading Experience...</div>
          <div className="w-64 h-2 bg-stone-900 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-stone-600 to-stone-400 rounded-full transition-all duration-300" style={{ width: `${loadProgress}%` }} />
          </div>
          <div className="text-stone-500 text-sm mt-4 animate-fade-in">{loadProgress}%</div>
          <div className="flex items-center justify-center gap-2 mt-6">
            <Volume2 className="w-5 h-5 text-stone-500 animate-pulse" />
            <span className="text-stone-600 text-xs">Audio experience enabled</span>
          </div>
        </div>
      </div>
    );
  }

  const PageWrapper = ({ children }) => (
    <div className={`min-h-screen bg-black transition-opacity duration-500 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
      {children}
    </div>
  );

  if (page === 0) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md w-full px-8 animate-fade-in-up">
            <Lock className="w-16 h-16 text-stone-500 mx-auto mb-8 animate-float" />
            <h2 className="text-3xl font-light text-stone-400 mb-12 tracking-wide animate-fade-in" style={{ animationDelay: '0.2s' }}>Enter Passcode</h2>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength="4" className="w-full px-8 py-6 text-3xl text-center bg-black border border-stone-800 rounded-2xl text-stone-300 font-light tracking-[0.5em] focus:outline-none focus:border-stone-500 focus:shadow-lg focus:shadow-stone-500/20 transition-all duration-500 animate-fade-in" style={{ animationDelay: '0.4s' }} placeholder="••••"/>
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <GlassButton onClick={() => password === '0102' && transitionPage(1)} className="mt-8 w-full">
                <span className="text-stone-300 text-lg font-light tracking-wide">Unlock</span>
              </GlassButton>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (page === 1 || page === 2) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <Lock className="w-10 h-10 text-stone-500 mb-8 animate-float" />
          <h2 className="text-3xl font-light text-stone-400 mb-16 tracking-wide animate-fade-in">{page === 1 ? 'When did we meet?' : 'When did I propose?'}</h2>
          <div className="flex gap-6 mb-12">
            <IOSPicker value={page === 1 ? metDate.day : proposeDate.day} onChange={(v) => page === 1 ? setMetDate({...metDate, day: v}) : setProposeDate({...proposeDate, day: v})} max={31} min={1} label="Day" />
            <IOSPicker value={page === 1 ? metDate.month : proposeDate.month} onChange={(v) => page === 1 ? setMetDate({...metDate, month: v}) : setProposeDate({...proposeDate, month: v})} max={12} min={1} label="Month" />
            <IOSPicker value={page === 1 ? metDate.year : proposeDate.year} onChange={(v) => page === 1 ? setMetDate({...metDate, year: v}) : setProposeDate({...proposeDate, year: v})} max={2025} min={2020} label="Year" />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <GlassButton onClick={() => {
              if (page === 1 && metDate.day === 13 && metDate.month === 10 && metDate.year === 2025) transitionPage(2);
              if (page === 2 && proposeDate.day === 20 && proposeDate.month === 12 && proposeDate.year === 2025) transitionPage(3);
            }}>
              <ChevronRight className="w-6 h-6 text-stone-300" />
            </GlassButton>
          </div>
        </div>
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
          @keyframes pulse-scale { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
          @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes slide-in-scale { from { opacity: 0; transform: translateY(30px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
          .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
          .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-pulse-scale { animation: pulse-scale 2s ease-in-out infinite; }
          .animate-spin-slow { animation: spin-slow 3s linear infinite; }
          .animate-slide-in-scale { animation: slide-in-scale 1s ease-out forwards; opacity: 0; }
          .glow-pulse { box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); animation: glow 2s ease-in-out infinite; }
          @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); } 50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.2); } }
        `}</style>
      </PageWrapper>
    );
  }

  if (page === 3) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-7xl font-light text-stone-400 mb-16 tracking-widest animate-fade-in-up">RAIYA</h2>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <GlassButton onClick={() => transitionPage(4)}><ChevronRight className="w-6 h-6 text-stone-300" /></GlassButton>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (page === 4) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
          <div className="absolute top-8 right-8 flex items-center gap-4 z-20 backdrop-blur-xl bg-black/40 px-6 py-3 rounded-2xl border border-white/10 animate-fade-in">
            <div className="text-2xl animate-pulse-scale">🫀</div>
            <div className="text-white text-2xl font-light">{Math.round(bpm)} <span className="text-sm opacity-70">BPM</span></div>
          </div>
          <div className="text-center">
            <div ref={heartContainerRef} className="w-full h-96 mb-8 animate-fade-in"></div>
            <p className="text-stone-400 text-2xl font-light mb-8 tracking-wide animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Normal heartbeat</p>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <GlassButton onClick={() => transitionPage(5)}><ChevronRight className="w-6 h-6 text-stone-300" /></GlassButton>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (page === 5) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
          <div className={`absolute top-8 right-8 flex items-center gap-4 z-20 backdrop-blur-xl px-6 py-3 rounded-2xl border transition-all duration-1000 animate-fade-in ${adrenalinePhase === 2 ? 'bg-rose-950/40 border-rose-500/20' : 'bg-black/40 border-white/10'}`}>
            <div className="text-2xl animate-pulse-scale">🫀</div>
            <div className={`text-2xl font-light transition-all duration-1000 ${adrenalinePhase === 2 ? 'text-rose-300 animate-pulse' : 'text-white'}`}>
              {Math.round(bpm)} <span className="text-sm opacity-70">BPM</span>
            </div>
          </div>
          
          <div className="text-center">
            {/* Phase 0: Just the heart */}
            {adrenalinePhase === 0 && (
              <div ref={heartContainerRef} className="w-full h-96 mb-8 animate-fade-in"></div>
            )}
            
            {/* Phase 1: Text appears */}
            {adrenalinePhase === 1 && (
              <div className="animate-slide-in-scale">
                <p className="text-stone-300 text-3xl font-light mb-12 tracking-wide animate-pulse">
                  when the adrenaline hits me...
                </p>
              </div>
            )}
            
            {/* Phase 2: Eyes appear and heart races */}
            {adrenalinePhase === 2 && (
              <>
                <div className="mb-8 animate-slide-in-scale">
                  <img 
                    src="/assets/eyes.jpg" 
                    alt="Eyes" 
                    className="w-96 h-56 object-cover rounded-3xl border-2 border-rose-900/30 hover:scale-105 transition-transform duration-700 mx-auto" 
                    style={{ 
                      boxShadow: '0 0 80px rgba(220, 50, 50, 0.4), 0 0 40px rgba(220, 50, 50, 0.2)',
                      filter: 'brightness(1.1) contrast(1.1)'
                    }}
                  />
                </div>
                <p className="text-rose-400 text-2xl font-light mb-8 tracking-wide animate-pulse animate-fade-in-up" style={{ animationDelay: '0.2s', textShadow: '0 0 20px rgba(244, 63, 94, 0.3)' }}>
                  When I see your eyes... my heart races
                </p>
                <div ref={heartContainerRef} className="w-full h-96 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}></div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <GlassButton onClick={() => transitionPage(6)}>
                    <ChevronRight className="w-6 h-6 text-stone-300" />
                  </GlassButton>
                </div>
              </>
            )}
          </div>
          <audio ref={audio2Ref} loop><source src="/assets/song2.mp3" type="audio/mpeg" /></audio>
        </div>
      </PageWrapper>
    );
  }

  if (page === 6) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute text-5xl opacity-20 animate-float" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${i * 0.2}s`, animationDuration: `${5 + Math.random() * 3}s` }}>🫀</div>
          ))}
          <div className="text-center z-10">
            <h2 className="text-6xl font-light text-stone-400 mb-16 tracking-widest animate-fade-in-up" style={{ textShadow: '0 0 30px rgba(168, 162, 158, 0.2)' }}>RAIYA</h2>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <GlassButton onClick={() => transitionPage(7)}><ChevronRight className="w-6 h-6 text-stone-300" /></GlassButton>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (page === 7) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="text-center max-w-2xl">
            <h1 className="text-5xl font-light text-stone-400 mb-12 tracking-wide animate-fade-in-up">Will you be my Valentine?</h1>
            <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lenZyZHI5OXM2eW95b3pmMG40cWVrMDhtNjVuM3A4dGNxa2g2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VM1fcpu2bKs1e2Kdbj/giphy.gif" alt="Cute" className="w-64 h-64 mx-auto rounded-2xl opacity-90 hover:scale-105 transition-transform duration-500 border border-stone-800/50" style={{ boxShadow: '0 0 40px rgba(168, 162, 158, 0.15)' }} />
            </div>
            <div className="flex gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <button onClick={() => { transitionPage(8); setShowFireworks(true); }} className="backdrop-blur-xl bg-emerald-950/20 border border-emerald-900/30 rounded-2xl font-light hover:bg-emerald-950/40 hover:scale-110 transition-all duration-700 hover:shadow-2xl hover:shadow-emerald-500/20" style={{ fontSize: `${1 + yesButtonSize * 0.3}rem`, padding: `${0.75 + yesButtonSize * 0.2}rem ${1.5 + yesButtonSize * 0.3}rem` }}>
                <span className="text-emerald-200">Yes ❤️</span>
              </button>
              <GlassButton onClick={() => { setYesButtonSize(prev => prev + 1); setNoButtonText(noMessages[noMessageIndex]); setNoMessageIndex(prev => (prev + 1) % noMessages.length); }} className="px-6 py-3">
                <span className="text-stone-400 font-light">{noButtonText}</span>
              </GlassButton>
            </div>
          </div>
          <audio ref={audioRef} loop><source src="/assets/song.mp3" type="audio/mpeg" /></audio>
        </div>
      </PageWrapper>
    );
  }

  if (page === 8) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen relative">
          <canvas ref={canvasRef} className="absolute inset-0" />
          <div className="text-center z-10">
            <h1 className="text-6xl font-light text-stone-300 mb-8 animate-fade-in-up" style={{ textShadow: '0 0 40px rgba(250, 250, 250, 0.3)' }}>I knew you'd say Yes!</h1>
            <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmo3c3l5ODh3ZGN6NHhhaDE2Mjg1ZjkwOXczdDFxbWM3dTBtaW9zaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9XY4f3FgFTT4QlaYqa/giphy.gif" alt="Happy" className="w-96 mx-auto rounded-2xl mb-8 opacity-90 animate-fade-in hover:scale-105 transition-transform duration-500 border border-stone-800/50" style={{ animationDelay: '0.2s', boxShadow: '0 0 50px rgba(168, 162, 158, 0.2)' }} />
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <GlassButton onClick={() => transitionPage(10)}><ChevronRight className="w-6 h-6 text-stone-300" /></GlassButton>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (page === 10) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="max-w-4xl text-center">
            <pre className="text-2xl text-stone-400 font-serif leading-relaxed whitespace-pre-wrap mb-12 animate-fade-in" style={{ fontFamily: "'Crimson Text', serif" }}>{shayariText}</pre>
            {currentLine >= shayariLines.length && (
              <div className="mt-16 text-stone-400 text-6xl font-light tracking-widest animate-fade-in-up" style={{ textShadow: '0 0 30px rgba(168, 162, 158, 0.2)' }}>🫀 RAIYA 🫀</div>
            )}
          </div>
        </div>
      </PageWrapper>
    );
  }

  return null;
};

export default ValentineExperience;
