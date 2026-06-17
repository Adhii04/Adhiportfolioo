import { motion } from 'framer-motion';
import { audio } from '../utils/audio';

export default function StartScreen({ onStart }) {
  const handleStart = () => {
    audio.playCoin();
    onStart();
  };

  return (
    <div 
      className="w-full h-full flex flex-col justify-between items-center relative overflow-hidden text-center cursor-none"
      onClick={handleStart}
    >
      {/* Background Grid */}
      <div className="retro-grid-bg">
        <div className="retro-grid-lines" />
      </div>

      {/* Retro Pixel Stars (Drifting/Twinkling) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Star 1 */}
        <motion.div 
          className="absolute top-[15%] left-[20%] w-6 h-6"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 8 8" className="fill-retro-yellow w-full h-full">
            <path d="M3 0h2v2H3V0zM3 6h2v2H3V6zM0 3h2v2H0V3zM6 3h2v2H6V3zM2 2h4v4H2V2z" />
          </svg>
        </motion.div>

        {/* Star 2 */}
        <motion.div 
          className="absolute top-[25%] right-[25%] w-4 h-4"
          animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.8, 0.4, 0.8] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        >
          <svg viewBox="0 0 8 8" className="fill-retro-yellow w-full h-full">
            <path d="M3 0h2v2H3V0zM3 6h2v2H3V6zM0 3h2v2H0V3zM6 3h2v2H6V3zM2 2h4v4H2V2z" />
          </svg>
        </motion.div>

        {/* Star 3 */}
        <motion.div 
          className="absolute top-[40%] left-[70%] w-5 h-5"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        >
          <svg viewBox="0 0 8 8" className="fill-retro-yellow w-full h-full">
            <path d="M3 0h2v2H3V0zM3 6h2v2H3V6zM0 3h2v2H0V3zM6 3h2v2H6V3zM2 2h4v4H2V2z" />
          </svg>
        </motion.div>
      </div>

      {/* Retro Pixel Clouds (Drifting horizontally) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Pink/Purple Cloud 1 */}
        <motion.div 
          className="absolute top-[8%] left-[-20%] w-40 opacity-80"
          animate={{ x: ['-20vw', '120vw'] }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        >
          <svg viewBox="0 0 24 16" className="w-full h-auto">
            {/* Draw layered 8-bit cloud shapes in SVG */}
            <path d="M4 8h16v4H4V8zm2-2h12v2H6V6zm4-2h4v2h-4V4zm-8 6h20v2H2v-2zm2 2h16v2H4v-2z" fill="#FF4FD8" />
            <path d="M6 8h12v2H6V8zm2-2h8v2H8V6z" fill="#8A2BE2" />
          </svg>
        </motion.div>

        {/* Pink/Purple Cloud 2 */}
        <motion.div 
          className="absolute top-[18%] right-[-30%] w-48 opacity-75"
          animate={{ x: ['120vw', '-40vw'] }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        >
          <svg viewBox="0 0 24 16" className="w-full h-auto">
            <path d="M4 8h16v4H4V8zm2-2h12v2H6V6zm4-2h4v2h-4V4zm-8 6h20v2H2v-2zm2 2h16v2H4v-2z" fill="#8A2BE2" />
            <path d="M6 8h12v2H6V8zm2-2h8v2H8V6z" fill="#FF4FD8" />
          </svg>
        </motion.div>
      </div>

      {/* Header Info */}
      <div className="mt-12 z-20">
        <div className="font-arcade text-[#00F5FF] text-[10px] tracking-widest glow-cyan mb-2">
          GREETINGS VISITOR
        </div>
        <div className="font-arcade text-retro-yellow text-xs tracking-wider glow-yellow">
          INSERT COIN OR CLICK SCREEN
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="my-auto z-20 flex flex-col items-center">
        {/* Animated Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-arcade text-xs md:text-sm text-arcade-pink glow-pink tracking-wider mb-4"
        >
          WELCOME TO THE MISSION
        </motion.div>

        {/* Glowing Title logo */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          className="font-arcade text-3xl md:text-6xl text-white tracking-widest glow-purple"
          style={{
            textShadow: '0 0 10px #8A2BE2, 0 0 20px #8A2BE2, 0 0 40px #FF4FD8'
          }}
        >
          ADITHYA
        </motion.h1>

        {/* Class Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-arcade text-[10px] md:text-sm text-neon-cyan tracking-widest mt-4 bg-black/60 px-4 py-2 border-2 border-neon-cyan border-glow-cyan"
        >
          AI & ML ENGINEER
        </motion.div>
      </div>

      {/* Blinking START Prompt */}
      <div className="mb-16 z-20 flex flex-col items-center">
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="font-arcade text-sm md:text-xl text-[#00FF7F] tracking-widest cursor-pointer hover:scale-105 active:scale-95 transition-all select-none"
        >
          &gt; PRESS START &lt;
        </motion.div>

        <div className="font-arcade text-[8px] md:text-[10px] text-slate-500 mt-6 tracking-wide">
          © 2026 ADITHYA. ALL RIGHTS RESERVED.
        </div>
      </div>
    </div>
  );
}
