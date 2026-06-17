import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../utils/audio';

export default function AlienFlyby({ triggerSpawn, onHit }) {
  const [active, setActive] = useState(false);
  const [yPos, setYPos] = useState(20); // vertical position percentage (10% to 50%)
  const [direction, setDirection] = useState(1); // 1 = Left to Right, -1 = Right to Left
  const [floatingPoints, setFloatingPoints] = useState(null);

  // Periodic random spawner (every 40 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!active) {
        spawnAlien();
      }
    }, 40000);

    return () => clearInterval(interval);
  }, [active]);

  // Listen for manual trigger from dev terminal
  useEffect(() => {
    if (triggerSpawn) {
      spawnAlien();
    }
  }, [triggerSpawn]);

  const spawnAlien = () => {
    setYPos(Math.random() * 40 + 15); // Random Y position between 15% and 55%
    setDirection(Math.random() > 0.5 ? 1 : -1);
    setActive(true);
  };

  const handleHit = (e) => {
    e.stopPropagation();
    if (!active) return;
    
    audio.playHit();
    onHit(500); // Award 500 points

    // Show floating score text at click coordinates
    setFloatingPoints({
      x: e.clientX,
      y: e.clientY
    });

    setActive(false);

    // Fade out floating score after 1 second
    setTimeout(() => {
      setFloatingPoints(null);
    }, 1200);
  };

  const startX = direction === 1 ? '-10vw' : '110vw';
  const endX = direction === 1 ? '110vw' : '-10vw';

  return (
    <>
      {/* Floating score text */}
      <AnimatePresence>
        {floatingPoints && (
          <motion.div
            initial={{ opacity: 1, y: floatingPoints.y - 10, scale: 0.8 }}
            animate={{ opacity: 0, y: floatingPoints.y - 60, scale: 1.3 }}
            exit={{ opacity: 0 }}
            className="fixed font-arcade text-xs text-retro-yellow glow-yellow pointer-events-none z-[9999]"
            style={{ left: floatingPoints.x }}
          >
            +500 PTS
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flying Alien Invader */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ x: startX, y: `${yPos}vh` }}
            animate={{ x: endX }}
            exit={{ opacity: 0 }}
            transition={{ duration: 7, ease: 'linear' }}
            onAnimationComplete={() => setActive(false)}
            onClick={handleHit}
            className="interactive cursor-none fixed w-12 h-8 z-40 bg-transparent flex items-center justify-center filter drop-shadow-[0_0_8px_#00F5FF]"
          >
            {/* 8-bit space invader SVG sprite */}
            <svg viewBox="0 0 12 8" className="w-full h-full fill-neon-cyan animate-pulse hover:fill-arcade-pink transition-colors">
              <path d="M4 0h4v1H4V0zM3 1h6v1H3V1zm0 1h6v1H3V2zm0 1h6v1H3V3zM0 4h12v1H0V4zm0 1h2v1H0V5zm3 0h6v1H3V5zm7 0h2v1h-2V5zm0 1h2v1h-2V6zm-8 0h2v1H2V6zm1 1h1v1H3V7zm5 0h1v1H8V7z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
