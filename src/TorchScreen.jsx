import React, { useEffect, useState, useRef } from "react";

const PARTICLE_COUNT = 8;
const PARTICLE_SIZE = 6;
const MAGNET_RADIUS = 80;
const MAGNET_STRENGTH = 0.25;
const TORCH_RADIUS = 150;

const getRandomDirection = () => {
  const angle = Math.random() * 2 * Math.PI;
  const radius = 20 + Math.random() * 10;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
};

const CustomCursor = ({ color = "#FFD700", size = 14 }) => {
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
      setParticles((p) => [...p, ...newParticles]);
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("click", clickHandler);
    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("click", clickHandler);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

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

  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((p) =>
        p
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

const DarkRoom = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isRevealed, setIsRevealed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const hiddenTexts = [
    {
      id: 1,
      text: "Oh, look who's exploring! How delightfully curious of you.",
      x: "20%",
      y: "25%",
    },
    {
      id: 2,
      text: "Finding things in the dark, are we? How charmingly persistent!",
      x: "70%",
      y: "35%",
    },
    {
      id: 3,
      text: "Ah, another hidden gem discovered. You're quite the detective!",
      x: "15%",
      y: "60%",
    },
    {
      id: 4,
      text: "My, my! Still searching? Your dedication is almost admirable.",
      x: "65%",
      y: "70%",
    },
    {
      id: 5,
      text: "Well done! You've found another secret. How wonderfully thorough!",
      x: "40%",
      y: "45%",
    },
    {
      id: 6,
      text: "Impressive! Your torch-wielding skills are quite remarkable.",
      x: "25%",
      y: "80%",
    },
  ];

  useEffect(() => {
    const moveHandler = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const dblClickHandler = () => {
      if (!isRevealed && !isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsRevealed(true);
          setIsTransitioning(false);
        }, 800);
      }
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("dblclick", dblClickHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("dblclick", dblClickHandler);
    };
  }, [isRevealed, isTransitioning]);

  const isTextVisible = (textElement) => {
    if (isRevealed) return true;

    const rect = document
      .getElementById(`text-${textElement.id}`)
      ?.getBoundingClientRect();
    if (!rect) return false;

    const textCenterX = rect.left + rect.width / 2;
    const textCenterY = rect.top + rect.height / 2;
    const distance = Math.sqrt(
      Math.pow(mousePos.x - textCenterX, 2) +
        Math.pow(mousePos.y - textCenterY, 2)
    );

    return distance < TORCH_RADIUS;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <CustomCursor color="#FFD700" size={16} />

      {/* Show original app content when revealed */}
      {isRevealed ? (
        <div className="relative z-30 animate-fade-in">{children}</div>
      ) : (
        <>
          {/* Welcome text - only visible when not revealed */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <h1 className="text-6xl font-bold mb-8 text-yellow-300 animate-pulse">
              Welcome to the Dark Room
            </h1>
            <p className="text-2xl text-yellow-200 opacity-80">
              {isTransitioning
                ? "Revealing hidden content..."
                : "Double-click to reveal the hidden content, or explore with your torch..."}
            </p>
          </div>

          {/* Hidden texts scattered around */}
          {hiddenTexts.map((textItem) => (
            <div
              key={textItem.id}
              id={`text-${textItem.id}`}
              className="absolute transition-opacity duration-300 pointer-events-none"
              style={{
                left: textItem.x,
                top: textItem.y,
                transform: "translate(-50%, -50%)",
                opacity: isTextVisible(textItem) ? 1 : 0,
              }}
            >
              <p className="text-3xl font-semibold text-yellow-100 text-center max-w-md leading-relaxed shadow-lg">
                {textItem.text}
              </p>
            </div>
          ))}

          {/* Instructions */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10">
            <p className="text-lg text-yellow-300 opacity-70">
              Move your torch to discover hidden messages • Double-click to
              reveal the main content
            </p>
          </div>

          {/* Dark overlay to create the room effect */}
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
    </div>
  );
};

export default DarkRoom;
