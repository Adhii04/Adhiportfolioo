import { motion } from 'framer-motion';
import { audio } from '../utils/audio';
import { Mail, Save } from 'lucide-react';

export default function FinalBoss() {
  const handleContactClick = (url, isResume = false) => {
    if (isResume) {
      audio.playLevelUp(); // Level complete chime for saving game!
    } else {
      audio.playSelect();
    }
    
    // Open in new tab after sound has time to trigger
    setTimeout(() => {
      window.open(url, '_blank');
    }, 200);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-stretch p-3 md:p-5 select-none z-20 relative overflow-y-auto">
      
      {/* Title */}
      <h3 className="font-arcade text-center text-xs md:text-sm text-retro-yellow mb-1 glow-yellow tracking-widest">
        :: FINAL BOSS FIGHT ::
      </h3>
      <div className="font-arcade text-center text-[8px] text-slate-500 mb-3">
        STAGE 99: RECRUITMENT DECISION
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Boss Info Board */}
        <div className="md:col-span-5 bg-black border-4 border-arcade-pink pixel-border-pink p-4 shadow-[0_0_15px_rgba(255,79,216,0.2)] flex flex-col justify-between items-center text-center">
          
          <div className="w-full">
            <span className="font-arcade text-[10px] text-slate-400 block mb-2">TARGET DETECTED</span>
            
            {/* Custom Pixel Alien Boss SVG */}
            <div className="w-24 h-24 bg-[#11052C] p-2 border-2 border-arcade-pink border-glow-pink mb-4 flex items-center justify-center mx-auto">
              <svg viewBox="0 0 16 16" className="w-full h-full fill-arcade-pink animate-bounce">
                <rect x="5" y="1" width="6" height="2" />
                <rect x="4" y="3" width="8" height="2" />
                <rect x="3" y="5" width="10" height="2" />
                <rect x="2" y="7" width="12" height="2" />
                <rect x="1" y="9" width="3" height="2" />
                <rect x="6" y="9" width="4" height="2" />
                <rect x="12" y="9" width="3" height="2" />
                <rect x="1" y="11" width="14" height="2" />
                <rect x="3" y="13" width="2" height="2" />
                <rect x="11" y="13" width="2" height="2" />
              </svg>
            </div>

            <h4 className="font-arcade text-xs text-white tracking-widest mb-2">
              HR RECRUITER
            </h4>
            
            {/* Boss Health Bar */}
            <div className="w-full px-4 mb-4">
              <div className="flex justify-between font-arcade text-[8px] text-neon-green glow-green mb-1">
                <span>RECRUITER SATISFACTION</span>
                <span>100%</span>
              </div>
              <div className="w-full bg-slate-900 h-4 border-2 border-slate-700 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="bg-neon-green h-full"
                />
              </div>
            </div>
          </div>

          <div className="font-arcade text-[9px] text-[#00FF7F] glow-green animate-pulse leading-normal max-w-xs">
            &gt;&gt; CHOOSE ACTIONS TO ENGAGE PLAYER &lt;&lt;
          </div>

        </div>

        {/* Right: Giant Console Buttons panel */}
        <div className="md:col-span-7 bg-black border-4 border-neon-cyan pixel-border p-4 shadow-[0_0_15px_rgba(0,245,255,0.2)] flex flex-col justify-center">
          
          <h4 className="font-arcade text-[10px] text-neon-cyan tracking-widest mb-4 border-b border-slate-800 pb-2 text-center md:text-left">
            RECRUIT THIS PLAYER?
          </h4>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Email Button */}
            <button
              onClick={() => handleContactClick('mailto:adhiishere04@gmail.com')}
              className="interactive cursor-none h-20 bg-[#12082b] border-4 border-[#8A2BE2] hover:border-neon-cyan text-[#8A2BE2] hover:text-neon-cyan flex flex-col items-center justify-center relative active:translate-y-1 rounded shadow-[0_6px_0_#8A2BE2] active:shadow-none transition-all group"
            >
              <Mail className="w-5 h-5 mb-1 group-hover:animate-bounce" />
              <span className="font-arcade text-[9px] tracking-wider">SEND EMAIL</span>
            </button>

            {/* LinkedIn Button */}
            <button
              onClick={() => handleContactClick('https://linkedin.com/in/adithya-balasubramani')}
              className="interactive cursor-none h-20 bg-[#12082b] border-4 border-[#00F5FF] hover:border-arcade-pink text-[#00F5FF] hover:text-arcade-pink flex flex-col items-center justify-center relative active:translate-y-1 rounded shadow-[0_6px_0_#00F5FF] active:shadow-none transition-all group"
            >
              <svg 
                className="w-5 h-5 mb-1 group-hover:animate-bounce" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="font-arcade text-[9px] tracking-wider">LINKEDIN</span>
            </button>

            {/* GitHub Button */}
            <button
              onClick={() => handleContactClick('https://github.com/Adhii04')}
              className="interactive cursor-none h-20 bg-[#12082b] border-4 border-[#FF4FD8] hover:border-retro-yellow text-[#FF4FD8] hover:text-retro-yellow flex flex-col items-center justify-center relative active:translate-y-1 rounded shadow-[0_6px_0_#FF4FD8] active:shadow-none transition-all group"
            >
              <svg 
                className="w-5 h-5 mb-1 group-hover:animate-bounce" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span className="font-arcade text-[9px] tracking-wider">GITHUB PROFILE</span>
            </button>

            {/* Save Game (Resume Download) */}
            <button
              onClick={() => handleContactClick('/AdithyaB_Resume_220526.pdf', true)}
              className="interactive cursor-none h-20 bg-[#12082b] border-4 border-[#FFD700] hover:border-neon-green text-[#FFD700] hover:text-neon-green flex flex-col items-center justify-center relative active:translate-y-1 rounded shadow-[0_6px_0_#FFD700] active:shadow-none transition-all group"
            >
              <Save className="w-5 h-5 mb-1 group-hover:animate-bounce" />
              <span className="font-arcade text-[9px] tracking-wider flex items-center space-x-1">
                <span>SAVE GAME (PDF)</span>
              </span>
            </button>

          </div>

          <div className="mt-6 text-[8px] font-arcade text-slate-500 text-center">
            * Warning: Recruiting Adithya adds +99 attack to your dev team *
          </div>

        </div>

      </div>

    </div>
  );
}
