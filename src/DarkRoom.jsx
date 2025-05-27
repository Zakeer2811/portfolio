import React, { useEffect, useState, useRef } from "react";

/** Constants **/
const PARTICLE_COUNT = 8;
const PARTICLE_SIZE = 6;
const MAGNET_RADIUS = 80;
const MAGNET_STRENGTH = 0.25;
const TORCH_RADIUS = 150;

/** Utility to generate random particle direction **/
const getRandomDirection = () => {
  const angle = Math.random() * 2 * Math.PI;
  const radius = 20 + Math.random() * 10;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
};

/** Torch-style cursor for dark room exploration **/
const TorchCursor = ({ color = "#FFD700", size = 14 }) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState([]);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const requestRef = useRef();

  /** Track real mouse position and spawn particles on click **/
  useEffect(() => {
    const moveHandler = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const clickHandler = (e) => {
      const newParticles = Array.from({ length: PARTICLE_COUNT }).map(() => {
        const { x, y } = getRandomDirection();
        return {
          id: Math.random().toString(36).substr(2, 9),
          x: e.clientX,
          y: e.clientY,
          dx: x,
          dy: y,
          life: 300,
          size: PARTICLE_SIZE,
        };
      });
      setParticles((prev) => [...prev, ...newParticles]);
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("click", clickHandler);
    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("click", clickHandler);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  /** Animate cursor position, magnetic attraction to elements with .magnet, and orbiting spark **/
  useEffect(() => {
    const animate = () => {
      // Find all "magnet" elements to compute attraction offset
      const elements = Array.from(
        document.querySelectorAll(
          "button, a, input, textarea, select, [role='button'], [tabindex='0'], .magnet"
        )
      );

      let magnetOffset = { x: 0, y: 0 };
      let closestDist = Infinity;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;

        const dx = elCenterX - mousePos.x;
        const dy = elCenterY - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAGNET_RADIUS && dist < closestDist) {
          closestDist = dist;
          const strength =
            ((MAGNET_RADIUS - dist) / MAGNET_RADIUS) * MAGNET_STRENGTH;
          magnetOffset = {
            x: dx * strength,
            y: dy * strength,
          };
        }
      });

      // Lerp the cursor toward (mousePos + magnetOffset)
      setCursorPos((prev) => {
        const lerp = (start, end, t) => start + (end - start) * t;
        return {
          x: lerp(prev.x, mousePos.x + magnetOffset.x, 0.5),
          y: lerp(prev.y, mousePos.y + magnetOffset.y, 0.15),
        };
      });

      // Update orbit angle
      setOrbitAngle((prev) => (prev + 0.05) % (Math.PI * 2));

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [mousePos]);

  /** Update particles: move them, fade out, shrink, remove when small/life <= 0 **/
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            life: particle.life - 20,
            x: particle.x + particle.dx / 15,
            y: particle.y + particle.dy / 15,
            size: particle.size * 0.85,
          }))
          .filter((p) => p.life > 0 && p.size > 0.5)
      );
    }, 20);
    return () => clearInterval(interval);
  }, [particles]);

  // Orbiting spark position
  const orbitRadius = 15;
  const orbitX = cursorPos.x + Math.cos(orbitAngle) * orbitRadius;
  const orbitY = cursorPos.y + Math.sin(orbitAngle) * orbitRadius;

  return (
    <>
      {/* Torch light effect */}
      <div
        style={{
          position: "fixed",
          left: cursorPos.x,
          top: cursorPos.y,
          width: TORCH_RADIUS * 2,
          height: TORCH_RADIUS * 2,
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.1) 40%, transparent 70%)`,
          zIndex: 9997,
        }}
      />

      {/* Main cursor (torch center) */}
      <div
        style={{
          position: "fixed",
          left: cursorPos.x,
          top: cursorPos.y,
          width: size,
          height: size,
          borderRadius: "50%",
          pointerEvents: "none",
          backgroundColor: color,
          transform: "translate(-50%, -50%)",
          transition: "background-color 0.2s ease",
          zIndex: 9999,
          boxShadow: `0 0 20px 8px ${color}`,
        }}
      />

      {/* Orbiting spark */}
      <div
        style={{
          position: "fixed",
          left: orbitX,
          top: orbitY,
          width: size / 2,
          height: size / 2,
          borderRadius: "50%",
          backgroundColor: "#FFA500",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          opacity: 0.8,
          zIndex: 9999,
          boxShadow: "0 0 8px 2px #FFA500",
        }}
      />

      {/* Particles */}
      {particles.map(({ id, x, y, size }) => (
        <div
          key={id}
          style={{
            position: "fixed",
            left: x,
            top: y,
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: "#FFD700",
            pointerEvents: "none",
            opacity: 0.7,
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            filter: "blur(1px)",
            boxShadow: "0 0 4px 1px #FFD700",
          }}
        />
      ))}
    </>
  );
};

/** Clean cursor for revealed app **/
const AppCursor = ({ color = "#FFD700", size = 14 }) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState([]);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const requestRef = useRef();

  useEffect(() => {
    const moveHandler = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const clickHandler = (e) => {
      const newParticles = Array.from({ length: PARTICLE_COUNT }).map(() => {
        const { x, y } = getRandomDirection();
        return {
          id: Math.random().toString(36).substr(2, 9),
          x: e.clientX,
          y: e.clientY,
          dx: x,
          dy: y,
          life: 300,
          size: PARTICLE_SIZE,
        };
      });
      setParticles((prev) => [...prev, ...newParticles]);
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("click", clickHandler);
    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("click", clickHandler);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Animate cursor lerp + magnetic attraction + orbiting spark
  useEffect(() => {
    const animate = () => {
      const elements = Array.from(
        document.querySelectorAll(
          "button, a, input, textarea, select, [role='button'], [tabindex='0'], .magnet"
        )
      );

      let magnetOffset = { x: 0, y: 0 };
      let closestDist = Infinity;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;

        const dx = elCenterX - mousePos.x;
        const dy = elCenterY - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAGNET_RADIUS && dist < closestDist) {
          closestDist = dist;
          const strength =
            ((MAGNET_RADIUS - dist) / MAGNET_RADIUS) * MAGNET_STRENGTH;
          magnetOffset = {
            x: dx * strength,
            y: dy * strength,
          };
        }
      });

      setCursorPos((prev) => {
        const lerp = (start, end, t) => start + (end - start) * t;
        return {
          x: lerp(prev.x, mousePos.x + magnetOffset.x, 0.5),
          y: lerp(prev.y, mousePos.y + magnetOffset.y, 0.15),
        };
      });

      setOrbitAngle((prev) => (prev + 0.05) % (Math.PI * 2));
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [mousePos]);

  // Update particle positions, shrink/fade them, remove when expired
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            life: particle.life - 20,
            x: particle.x + particle.dx / 15,
            y: particle.y + particle.dy / 15,
            size: particle.size * 0.85,
          }))
          .filter((p) => p.life > 0 && p.size > 0.5)
      );
    }, 20);
    return () => clearInterval(interval);
  }, [particles]);

  const orbitRadius = 15;
  const orbitX = cursorPos.x + Math.cos(orbitAngle) * orbitRadius;
  const orbitY = cursorPos.y + Math.sin(orbitAngle) * orbitRadius;

  return (
    <>
      {/* Torch light effect (follows cursorPos) */}
      <div
        style={{
          position: "fixed",
          left: cursorPos.x,
          top: cursorPos.y,
          width: TORCH_RADIUS * 2,
          height: TORCH_RADIUS * 2,
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.1) 40%, transparent 70%)`,
          zIndex: 30,
        }}
      />

      {/* Main cursor (torch center) */}
      <div
        style={{
          position: "fixed",
          left: cursorPos.x,
          top: cursorPos.y,
          width: size,
          height: size,
          borderRadius: "50%",
          pointerEvents: "none",
          backgroundColor: color,
          transform: "translate(-50%, -50%)",
          transition: "background-color 0.2s ease",
          zIndex: 40,
          boxShadow: `0 0 20px 8px ${color}`,
        }}
      />

      {/* Orbiting spark */}
      <div
        style={{
          position: "fixed",
          left: orbitX,
          top: orbitY,
          width: size / 2,
          height: size / 2,
          borderRadius: "50%",
          backgroundColor: "#FFA500",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          opacity: 0.8,
          zIndex: 40,
          boxShadow: "0 0 8px 2px #FFA500",
        }}
      />

      {/* Particles */}
      {particles.map(({ id, x, y, size }) => (
        <div
          key={id}
          style={{
            position: "fixed",
            left: x,
            top: y,
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: "#FFD700",
            pointerEvents: "none",
            opacity: 0.7,
            transform: "translate(-50%, -50%)",
            zIndex: 40,
            filter: "blur(1px)",
            boxShadow: "0 0 4px 1px #FFD700",
          }}
        />
      ))}
    </>
  );
};

/** Spectacular Reveal Animation Component **/
const RevealAnimation = ({ onComplete, children }) => {
  const [stage, setStage] = useState(0);
  const [explosionParticles, setExplosionParticles] = useState([]);
  const [lightRings, setLightRings] = useState([]);
  const [revealClipRadius, setRevealClipRadius] = useState(0);
  const animationFrameRef = useRef();

  // Stage 0: Initial explosion & rings
  useEffect(() => {
    if (stage === 0) {
      const particles = Array.from({ length: 120 }).map((_, i) => ({
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        dx: (Math.random() - 0.5) * 28,
        dy: (Math.random() - 0.5) * 28,
        size: Math.random() * 8 + 3,
        life: 100,
        color: ["#FFD700", "#FFA500", "#FF8C00", "#FF6B35"][
          Math.floor(Math.random() * 4)
        ],
        angle: Math.random() * 360,
      }));
      setExplosionParticles(particles);

      const rings = Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        delay: i * 140,
        maxRadius: (i + 1) * Math.min(window.innerWidth / 18, 60) + 20,
        color: `rgba(255, ${200 - i * 25}, ${50 + i * 20}, ${0.35 - i * 0.04})`,
      }));
      setLightRings(rings);

      setTimeout(() => setStage(1), 900); // Slightly faster
    }
  }, [stage]);

  // Stage 1: Golden wave
  useEffect(() => {
    if (stage === 1) {
      setTimeout(() => setStage(2), 700); // Faster transition
    }
  }, [stage]);

  // Stage 2: Neon ring reveal
  useEffect(() => {
    if (stage === 2) {
      let startTime;
      const duration = 320; // Faster neon ring expansion
      const maxDim = Math.sqrt(
        window.innerWidth ** 2 + window.innerHeight ** 2
      );

      const animateReveal = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        setRevealClipRadius((progress * maxDim) / 2);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animateReveal);
        } else {
          setTimeout(() => setStage(3), 100); // Shorter delay
        }
      };

      animationFrameRef.current = requestAnimationFrame(animateReveal);
      return () => cancelAnimationFrame(animationFrameRef.current);
    }
  }, [stage]);

  // Stage 3: Fractal dissolve
  useEffect(() => {
    if (stage === 3) {
      setTimeout(() => setStage(4), 1000); // Speed up dissolve
    }
  }, [stage]);

  // Stage 4: Final shimmer
  useEffect(() => {
    if (stage === 4) {
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
    }
  }, [stage, onComplete]);

  // Particle motion loop
  useEffect(() => {
    if (explosionParticles.length === 0 || stage > 0) return;

    const interval = setInterval(() => {
      setExplosionParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.dx,
            y: p.y + p.dy,
            life: p.life - 1.5,
            size: p.size * 0.97,
            dy: p.dy + 0.1,
            angle: p.angle + p.dx * 0.3,
          }))
          .filter((p) => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [explosionParticles, stage]);

  return (
    <>
      <div
        className="fixed inset-0"
        style={{
          backgroundColor: "rgba(10,10,20,1)",
          clipPath:
            stage >= 2
              ? `circle(${revealClipRadius}px at center)`
              : "circle(0px at center)",
          zIndex: 40,
          transition: "clip-path 0.3s ease-out",
          willChange: "clip-path",
        }}
      >
        {children}
      </div>

      <div className="fixed inset-0 z-50 pointer-events-none">
        {stage === 0 &&
          explosionParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                opacity: particle.life / 100,
                transform: `translate(-50%, -50%) rotate(${particle.angle}deg)`,
                boxShadow: `0 0 ${particle.size * 1.5}px ${particle.color}`,
                filter: `blur(${Math.min(particle.size / 10, 2)}px)`,
              }}
            />
          ))}

        {stage === 0 &&
          lightRings.map((ring) => (
            <div
              key={ring.id}
              className="absolute rounded-full border-2 sm:border-4"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 0,
                height: 0,
                opacity: 0,
                borderColor: ring.color,
                animation: `expandRing 1s ease-out ${ring.delay}ms forwards`,
              }}
            />
          ))}

        {stage === 1 && (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, rgba(255,215,0,0.5) 0%, rgba(255,215,0,0) 70%)`,
              opacity: 0,
              animation: "goldenWave 0.7s ease-out forwards",
            }}
          />
        )}

        {stage === 2 && revealClipRadius > 0 && (
          <div
            className="absolute rounded-full border-2 sm:border-4"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderColor: "#FFD700", // Gold Yellow Neon
              boxShadow: `0 0 8px #FFD700, 0 0 16px #FFD700, 0 0 24px #FFC300, 0 0 32px #FFB000, inset 0 0 12px #FFD700`,
              width: revealClipRadius * 2,
              height: revealClipRadius * 2,
              opacity: Math.max(
                0,
                1 -
                  revealClipRadius /
                    (Math.max(window.innerWidth, window.innerHeight) * 0.6)
              ),
              transition: "opacity 0.2s ease-out",
              willChange: "opacity",
            }}
          />
        )}

        {stage === 3 && (
          <div
            className="absolute inset-0"
            style={{
              background: `
                repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(220,180,255,0.03) 4px, rgba(220,180,255,0.03) 8px),
                repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(180,220,255,0.03) 4px, rgba(180,220,255,0.03) 8px),
                radial-gradient(circle, transparent 40%, rgba(10,0,30,0.1) 100%)`,
              maskImage:
                "radial-gradient(circle at center, black 10%, transparent 55%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 10%, transparent 55%)",
              animation:
                "fractalDissolve 1s cubic-bezier(0.7, 0, 0.3, 1) forwards",
            }}
          />
        )}

        {stage === 4 && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200 to-transparent"
            style={{
              opacity: 0,
              animation: "finalShimmer 1s ease-in-out forwards",
              mixBlendMode: "overlay",
            }}
          />
        )}
      </div>
    </>
  );
};

// App Component (Demo)
const App = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const handleRevealComplete = () => {
    console.log("Reveal complete, transitioning to portfolio...");
    setShowPortfolio(true);
    // Optionally, you might want to unmount or hide the RevealAnimation's children here
    // For this demo, they will disappear when showPortfolio becomes true.
  };

  const resetDemo = () => {
    setShowPortfolio(false);
    setStartAnimation(false);
  };

  if (showPortfolio) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white p-4">
        <div className="text-center animate-fadeInBasic">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Portfolio Page
          </h1>
          <p className="text-xl sm:text-2xl mb-8">
            This is where the main portfolio content would be displayed.
          </p>
          <button
            onClick={resetDemo}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg sm:text-xl shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Restart Demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {!startAnimation && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-6 text-center">
            Animation Demo
          </h1>
          <p className="text-lg sm:text-xl text-center mb-8 max-w-md">
            Click the button below to trigger a spectacular reveal animation
            leading to a content page.
          </p>
          <button
            onClick={() => setStartAnimation(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-xl text-xl sm:text-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Start Reveal
          </button>
        </div>
      )}

      {startAnimation && (
        <RevealAnimation onComplete={handleRevealComplete}>
          {/* This is the content that gets revealed */}
          <div className="w-full h-full flex flex-col items-center justify-center text-white p-4 sm:p-8 overflow-y-auto">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center animate-fadeInBasic"
              style={{ animationDelay: "1s" }}
            >
              Welcome to the Show!
            </h1>
            <p
              className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-center max-w-xl animate-fadeInBasic"
              style={{ animationDelay: "1.5s" }}
            >
              This content has been unveiled by the animation. Explore below.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl px-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-md p-5 sm:p-6 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 animate-fadeInUpBasic"
                  style={{ animationDelay: `${1.8 + i * 0.25}s` }}
                >
                  <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-2 sm:mb-3">
                    Feature {i + 1}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    This is a placeholder for some exciting content that appears
                    after the grand reveal.
                  </p>
                </div>
              ))}
            </div>
            <p
              className="mt-8 text-sm text-gray-400 animate-fadeInBasic"
              style={{ animationDelay: "3s" }}
            >
              Scroll down if content overflows.
            </p>
          </div>
        </RevealAnimation>
      )}

      {/* Global styles for animations */}
      <style>{`
        body { margin: 0; font-family: 'Inter', sans-serif; background-color: #111827; /* Tailwind gray-900 */ }
        
        @keyframes expandRing {
          0% { width: 0; height: 0; opacity: 0.8; transform: translate(-50%, -50%) scale(0.5); }
          100% { width: calc(var(--max-radius) * 2); height: calc(var(--max-radius) * 2); opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes goldenWave {
          0% { opacity: 0; transform: scale(0); }
          30% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(2.5); }
        }
        @keyframes fractalDissolve {
          0% {
            opacity: 0.6; 
            mask-size: 80% 80%;
            -webkit-mask-size: 80% 80%;
          }
          100% {
            opacity: 0;
            mask-size: 250% 250%;
            -webkit-mask-size: 250% 250%;
          }
        }
        @keyframes finalShimmer {
          0% { opacity: 0; transform: scaleX(0) translateX(-50%); }
          50% { opacity: 0.3; transform: scaleX(1) translateX(0%); }
          100% { opacity: 0; transform: scaleX(0) translateX(50%); }
        }
        
        /* Basic fade in and up for demo content */
        @keyframes fadeInBasic {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInBasic { animation: fadeInBasic 1s ease-out forwards; }
        
        @keyframes fadeInUpBasic {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUpBasic { animation: fadeInUpBasic 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

/** DarkRoom component: shows welcome text + hidden messages + hidden Reveal button (under torch)
 *  Then, when button is "lit" by torch (cursor within TORCH_RADIUS of button), button fades in.
 *  Clicking that button triggers spectacular reveal animation and displays {children} (the real app).
 **/
const DarkRoom = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const buttonRef = useRef(null);

  // Hidden messages scattered around - better positioned and spaced
  const hiddenTexts = [
    {
      id: 1,
      text: "Oh, look who's exploring!\nHow delightfully curious of you.",
      x: "15%",
      y: "20%",
      xMobile: "10%",
      yMobile: "15%",
    },
    {
      id: 2,
      text: "Finding things in the dark, are we?!",
      x: "75%",
      y: "30%",
      xMobile: "80%",
      yMobile: "25%",
    },
    {
      id: 4,
      text: "My, my! Still searching?\nYour dedication is almost admirable.",
      x: "70%",
      y: "80%",
      xMobile: "75%",
      yMobile: "85%",
    },
  ];

  // Track mouse movement for proximity-based reveals
  useEffect(() => {
    const moveHandler = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  // Determines if a hidden text should be visible (cursor within TORCH_RADIUS)
  const isTextVisible = (textItem) => {
    if (isRevealed || isRevealing) return false; // Once revealed, hide these messages
    const el = document.getElementById(`text-${textItem.id}`);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const textCenterX = rect.left + rect.width / 2;
    const textCenterY = rect.top + rect.height / 2;
    const dx = mousePos.x - textCenterX;
    const dy = mousePos.y - textCenterY;
    return Math.sqrt(dx * dx + dy * dy) < TORCH_RADIUS;
  };

  // Determines if the Reveal button should be visible (cursor near the button area)
  const isButtonVisible = () => {
    if (isRevealed || isRevealing) return false;
    const btn = buttonRef.current;
    if (!btn) return false;
    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const dx = mousePos.x - btnCenterX;
    const dy = mousePos.y - btnCenterY;
    return Math.sqrt(dx * dx + dy * dy) < TORCH_RADIUS;
  };

  const handleRevealClick = () => {
    setIsRevealing(true);
  };

  const handleRevealComplete = () => {
    setIsRevealing(false);
    setIsRevealed(true);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Conditional cursor based on revealed state */}
      {isRevealed ? (
        <AppCursor color="#FFD700" size={16} />
      ) : (
        <TorchCursor color="#FFD700" size={16} />
      )}

      {/* Spectacular reveal animation */}
      {isRevealing && <RevealAnimation onComplete={handleRevealComplete} />}

      {isRevealed ? (
        // Once "revealed," show real app content with clean cursor
        <div
          className="relative z-50"
          style={{
            animation: "fadeInUp 1s ease-out",
          }}
        >
          {children}
        </div>
      ) : (
        <>
          {/* Welcome text – always visible in dark */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-yellow-300 animate-pulse drop-shadow-lg">
              Welcome to the Dark Room
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-yellow-200 opacity-80 leading-relaxed max-w-2xl mx-auto">
              Move your torch to discover hidden messages…
              <br />
              Find the 🔓 button to reveal the portfolio.
            </p>
          </div>

          {/* Hidden messages - improved styling and alignment */}
          {hiddenTexts.map((textItem) => (
            <div
              key={textItem.id}
              id={`text-${textItem.id}`}
              className="absolute transition-all duration-500 pointer-events-none"
              style={{
                left: window.innerWidth < 768 ? textItem.xMobile : textItem.x,
                top: window.innerWidth < 768 ? textItem.yMobile : textItem.y,
                transform: "translate(-50%, -50%)",
                opacity: isTextVisible(textItem) ? 1 : 0,
                filter: isTextVisible(textItem) ? "blur(0px)" : "blur(2px)",
              }}
            >
              <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-yellow-300 border-opacity-30 shadow-2xl">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-yellow-100 text-center max-w-xs leading-5 sm:leading-6 md:leading-7 whitespace-pre-line">
                  {textItem.text}
                </p>
              </div>
            </div>
          ))}

          {/* Hidden "Reveal App" button – enhanced styling */}
          <button
            ref={buttonRef}
            onClick={handleRevealClick}
            className={`
    absolute 
    left-1/2 top-[70%] 
    transform -translate-x-1/2 
    bg-gradient-to-r from-yellow-400 to-yellow-500
    hover:from-yellow-300 hover:to-yellow-400
    active:from-yellow-500 active:to-yellow-600
    text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl 
    font-bold text-lg sm:text-xl md:text-2xl shadow-2xl 
    transition-all duration-300 ease-out
    border-2 border-yellow-300
    hover:scale-105 active:scale-95
    hover:shadow-yellow-400/50
  `}
            style={{
              opacity: isButtonVisible() ? 1 : 0,
              pointerEvents: isButtonVisible() ? "auto" : "none",
              boxShadow: isButtonVisible()
                ? "0 0 40px rgba(255, 215, 0, 0.6), 0 20px 40px rgba(0, 0, 0, 0.3)"
                : "none",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            🔓 Reveal Portfolio
          </button>

          {/* Instructions at bottom - improved styling */}
          <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 text-center z-10 px-4">
            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 border border-yellow-300 border-opacity-20">
              <p className="text-sm sm:text-base md:text-lg text-yellow-300 opacity-80 font-medium">
                Move your torch over items to uncover them
              </p>
            </div>
          </div>

          {/* Dark overlay with "spotlight" at cursor */}
          <div
            className="fixed inset-0 bg-black pointer-events-none z-20"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}px ${
                mousePos.y
              }px, transparent ${TORCH_RADIUS}px, rgba(0,0,0,0.95) ${
                TORCH_RADIUS + 50
              }px)`,
            }}
          />
        </>
      )}

      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DarkRoom;
