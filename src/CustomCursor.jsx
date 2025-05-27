import React, { useEffect, useState, useRef } from "react";

const PARTICLE_COUNT = 8;
const PARTICLE_SIZE = 6;
const MAGNET_RADIUS = 80;
const MAGNET_STRENGTH = 0.25;

const getRandomDirection = () => {
  const angle = Math.random() * 2 * Math.PI;
  const radius = 20 + Math.random() * 10;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
};

const CustomCursor = ({ color = "#00FFFF", size = 14 }) => {
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
        const dist = Math.hypot(dx, dy);
        if (dist < MAGNET_RADIUS && dist < closestDist) {
          closestDist = dist;
          const strength =
            ((MAGNET_RADIUS - dist) / MAGNET_RADIUS) * MAGNET_STRENGTH;
          magnetOffset = { x: dx * strength, y: dy * strength };
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

  const orbitRadius = 10;
  const orbitX = cursorPos.x + Math.cos(orbitAngle) * orbitRadius;
  const orbitY = cursorPos.y + Math.sin(orbitAngle) * orbitRadius;

  return (
    <>
      {/* Gradient ring */}
      <div
        style={{
          position: "fixed",
          left: cursorPos.x,
          top: cursorPos.y,
          width: size * 1.5,
          height: size * 1.5,
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(0,255,255,0.4) 20%, transparent 80%)`,
          boxShadow: `0 0 12px 4px ${color}`,
          zIndex: 9998,
        }}
      />

      {/* Main cursor */}
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
          mixBlendMode: "difference",
          boxShadow: `0 0 8px 2px ${color}`,
        }}
      />

      {/* Orbiting dot */}
      <div
        style={{
          position: "fixed",
          left: orbitX,
          top: orbitY,
          width: size / 2,
          height: size / 2,
          borderRadius: "50%",
          backgroundColor: color,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          opacity: 0.8,
          zIndex: 9999,
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
            backgroundColor: color,
            pointerEvents: "none",
            opacity: 0.7,
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            filter: "blur(1px)",
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
