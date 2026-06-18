import { Volume2, VolumeX } from 'lucide-react';
import { audio } from '../utils/audio';
import { useState, useEffect } from 'react';

export default function CabinetFrame({ children, score, muteState, toggleMute, credits, addCredit }) {

  // Periodic insert coin blinking
  useEffect(() => {
    // Start hum in background once audio starts (simulates arcade machine fan/hum)
    if (!muteState) {
      // Custom ambient hum if desired
    }
  }, [muteState]);



  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#080315] text-[#00F5FF] relative overflow-hidden select-none">
      
      {/* Decorative Bezel top header */}
      <header className="bg-[#12082b] border-b-4 border-electric-purple px-4 py-3 flex items-center justify-between z-40 relative shadow-[0_4px_15px_rgba(138,43,226,0.3)]">
        {/* Left Side: Score Board */}
        <div className="flex items-center space-x-4">
          <div className="font-arcade text-[10px] md:text-xs">
            <div className="text-arcade-pink glow-pink mb-1">1UP SCORE</div>
            <div className="text-white glow-white tracking-widest">
              {String(score).padStart(6, '0')}
            </div>
          </div>
          <div className="hidden md:flex flex-col font-arcade text-[10px]">
            <div className="text-retro-yellow glow-yellow mb-1">HIGH SCORE</div>
            <div className="text-white opacity-80">999990</div>
          </div>
        </div>

        {/* Center: Cabinet Name Logo */}
        <div className="font-arcade text-xs md:text-lg text-center tracking-widest text-[#00F5FF] glow-cyan animate-pulse">
          ★ ADITHYA-CABINET-8.12 ★
        </div>

        {/* Right Side: Sound Control & Stats */}
        <div className="flex items-center space-x-4">
          {/* Audio toggle button */}
          <button
            onClick={() => {
              toggleMute();
              audio.playBeep();
            }}
            className="interactive p-2 border-2 border-neon-cyan hover:border-arcade-pink hover:bg-neon-cyan/10 bg-transparent text-neon-cyan hover:text-arcade-pink flex items-center justify-center transition-all cursor-none"
            title={muteState ? "Unmute Sound" : "Mute Sound"}
          >
            {muteState ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Credits */}
          <div 
            onClick={addCredit}
            className="interactive font-arcade text-[10px] md:text-xs cursor-none bg-black px-2 py-1 border-2 border-retro-yellow flex items-center space-x-2 select-none hover:bg-retro-yellow/10"
          >
            <span className="text-retro-yellow">CREDIT</span>
            <span className="text-white">{String(credits).padStart(2, '0')}</span>
          </div>
        </div>
      </header>

      {/* Main CRT Screen content wrapper */}
      <main className="flex-1 w-full relative overflow-hidden bg-black flex justify-center items-center">
        {/* Curved CRT reflection scanlines */}
        <div className="absolute inset-0 z-40 pointer-events-none scanlines-overlay" />
        
        {/* Scanline scroll reflection */}
        <div className="scanline-roll-effect" />
        
        {/* Actual inner viewport screen */}
        <div className="crt-screen w-full h-full bg-[#050816] z-10 flex flex-col justify-between relative">
          {children}
        </div>
      </main>

      {/* Decorative Bezel bottom control deck or cabinet base */}
      <footer className="bg-[#12082b] border-t-4 border-electric-purple py-3 px-6 flex flex-wrap justify-between items-center z-40 relative shadow-[0_-4px_15px_rgba(138,43,226,0.3)]">
        {/* Controls label */}
        <div className="flex items-center space-x-3 text-[10px] font-arcade text-slate-400">
          <div className="flex items-center space-x-1">
            <span className="border border-slate-500 rounded px-1 text-white">▲</span>
            <span className="border border-slate-500 rounded px-1 text-white">▼</span>
            <span>NAVIGATE</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="border border-slate-500 rounded px-1.5 py-0.5 text-white">ENTER</span>
            <span>SELECT</span>
          </div>
        </div>

        {/* Coin Door Simulator */}
        <div className="flex items-center space-x-4">
          <div className="text-[10px] font-arcade text-slate-400 hidden sm:block">
            INSERT COIN FOR EXTRA LIVES
          </div>
          <div 
            onClick={addCredit}
            className="interactive cursor-none w-12 h-8 bg-zinc-800 border-2 border-zinc-600 rounded flex flex-col justify-center items-center shadow-inner hover:border-retro-yellow transition-all relative overflow-hidden group"
          >
            <div className="w-1 h-5 bg-black rounded shadow group-hover:bg-retro-yellow transition-all" />
            <div className="absolute bottom-0 text-[6px] font-arcade text-retro-yellow animate-pulse">
              25¢
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
