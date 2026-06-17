import { useEffect, useState } from 'react';
import { audio } from '../utils/audio';
import { User, Shield, Target, Award, Skull } from 'lucide-react';

const MENU_ITEMS = [
  { id: 'profile', label: 'PLAYER PROFILE', icon: User, desc: "RPG Character Sheet & Stats" },
  { id: 'inventory', label: 'INVENTORY', icon: Shield, desc: "Collectible Skill Power-ups" },
  { id: 'missions', label: 'MISSIONS', icon: Target, desc: "Completed Engineering Levels" },
  { id: 'scores', label: 'HIGH SCORES', icon: Award, desc: "Leaderboard & Accomplishments" },
  { id: 'boss', label: 'FINAL BOSS', icon: Skull, desc: "Recruit Player (Contact Interface)" }
];

export default function MainMenu({ activeTab, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Set initial selected index based on activeTab
  useEffect(() => {
    const idx = MENU_ITEMS.findIndex((item) => item.id === activeTab);
    if (idx !== -1) {
      setSelectedIndex(idx);
    }
  }, [activeTab]);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = prev === 0 ? MENU_ITEMS.length - 1 : prev - 1;
          audio.playBeep();
          return next;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = prev === MENU_ITEMS.length - 1 ? 0 : prev + 1;
          audio.playBeep();
          return next;
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        audio.playSelect();
        onSelect(MENU_ITEMS[selectedIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onSelect]);

  const handleMouseHover = (index) => {
    if (selectedIndex !== index) {
      setSelectedIndex(index);
      audio.playBeep();
    }
  };

  const handleMouseClick = (id) => {
    audio.playSelect();
    onSelect(id);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center py-2 px-4 select-none relative z-20">
      <h2 className="font-arcade text-retro-yellow text-[10px] md:text-xs tracking-widest mb-4 glow-yellow text-center">
        :: SELECT MAIN SCREEN ::
      </h2>

      <div className="w-full max-w-lg flex flex-col space-y-2.5">
        {MENU_ITEMS.map((item, index) => {
          const isSelected = index === selectedIndex;
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => handleMouseClick(item.id)}
              onMouseEnter={() => handleMouseHover(index)}
              className={`interactive cursor-none flex items-center justify-between p-2 md:p-3 border-2 transition-all duration-150 ${
                isSelected
                  ? 'border-neon-cyan bg-neon-cyan/10 translate-x-2 shadow-[0_0_15px_rgba(0,245,255,0.2)]'
                  : 'border-electric-purple/40 bg-black/40 hover:border-neon-cyan/55'
              }`}
            >
              {/* Left content */}
              <div className="flex items-center space-x-4">
                <span className="font-arcade text-lg text-retro-yellow w-6 text-center">
                  {isSelected ? '▶' : ' '}
                </span>
                
                <Icon className={`w-5 h-5 ${isSelected ? 'text-neon-cyan' : 'text-electric-purple'}`} />
                
                <div className="text-left">
                  <span
                    className={`font-arcade text-xs md:text-sm tracking-widest block ${
                      isSelected ? 'text-white glow-white' : 'text-slate-400'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="font-pixel text-[10px] md:text-xs text-slate-500 mt-1 block">
                    {item.desc}
                  </span>
                </div>
              </div>

              {/* Right side stats badge */}
              <div className={`hidden sm:block font-arcade text-[8px] px-2 py-1 border rounded ${
                isSelected ? 'border-neon-cyan text-neon-cyan' : 'border-electric-purple/40 text-electric-purple/60'
              }`}>
                LV.20
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 font-pixel text-xs text-slate-500 text-center max-w-sm border-t border-slate-800 pt-4">
        Press <span className="text-retro-yellow font-arcade text-[10px]">▲</span> / <span className="text-retro-yellow font-arcade text-[10px]">▼</span> key to navigate, <span className="text-retro-yellow font-arcade text-[10px]">ENTER</span> to select.
      </div>
    </div>
  );
}
