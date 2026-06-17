import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);
  const particleId = useRef(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth movement springs
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if mouse is hovering over an interactive element
      const target = e.target;
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') || 
        target.closest('.interactive') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovered(!!isInteractive);

      // Spawn a trail particle with a small probability or interval
      if (Math.random() < 0.3) {
        spawnParticle(e.clientX, e.clientY);
      }
    };

    const spawnParticle = (x, y) => {
      const id = particleId.current++;
      const colors = ['#00F5FF', '#FF4FD8', '#8A2BE2', '#FFD700'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Random offsets for particle velocity
      const vx = (Math.random() - 0.5) * 2;
      const vy = (Math.random() * 2) + 1; // Float upwards relative to spaceship pointing up

      const newParticle = {
        id,
        x,
        y: y + 12, // Spawn slightly below the spaceship
        color,
        vx,
        vy,
        size: Math.random() * 4 + 3
      };

      setParticles((prev) => [...prev.slice(-30), newParticle]); // Cap at 30 particles
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Animate particles (decay velocity/opacity)
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) => 
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            size: Math.max(0, p.size - 0.25)
          }))
          .filter((p) => p.size > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [particles]);

  return (
    <>
      {/* Particle Trails */}
      <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 4px ${p.color}`,
              imageRendering: 'pixelated'
            }}
          />
        ))}
      </div>

      {/* Main Spaceship Cursor */}
      <motion.div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          rotate: isHovered ? 45 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: isHovered 
              ? 'drop-shadow(0 0 8px #FF4FD8) drop-shadow(0 0 3px #FF4FD8)'
              : 'drop-shadow(0 0 5px #00F5FF)',
            transition: 'filter 0.2s ease-in-out'
          }}
        >
          {/* Custom 8-bit Spaceship Cursor (pointed upwards/north-west like a pointer) */}
          <path
            d="M12 2H10V4H8V6H6V8H4V12H6V10H8V8H10V6H12V8H14V10H16V12H18V8H16V6H14V4H12V2Z"
            fill={isHovered ? "#FF4FD8" : "#00F5FF"}
          />
          <path
            d="M10 12H12V16H10V12Z"
            fill={isHovered ? "#FFD700" : "#8A2BE2"}
          />
          <path
            d="M8 12H6V14H8V12ZM14 12H16V14H14V12Z"
            fill={isHovered ? "#FFD700" : "#8A2BE2"}
          />
          <path
            d="M10 6H12V10H10V6Z"
            fill="#FFFFFF"
          />
        </svg>
      </motion.div>
    </>
  );
}
