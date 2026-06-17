import { motion } from 'framer-motion';

// Custom 16x16 pixel-art avatar grid based on Adithya's photo (black hair, glasses, stubble, smile)
const PALETTE = {
  '.': 'transparent',
  'H': '#1a110d', // Hair (Dark brown/black)
  'S': '#dfa87a', // Skin (Warm light brown)
  'G': '#00f5ff', // Glasses frame (Cyber neon cyan!)
  'E': '#000000', // Eyes
  'B': '#3d251c', // Beard / stubble shadow
  'M': '#a03030', // Mouth / lip
  'T': '#8A2BE2'  // Shirt (Electric purple)
};

const AVATAR_GRID = [
  '.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.',
  '.','.','.','.','H','H','H','H','H','H','H','.','.','.','.','.',
  '.','.','.','H','H','H','H','H','H','H','H','H','H','.','.','.',
  '.','.','H','H','H','H','H','H','H','H','H','H','H','H','.','.',
  '.','.','H','H','H','H','H','H','H','H','H','H','H','H','.','.',
  '.','.','H','H','S','S','S','S','S','S','S','S','H','H','.','.',
  '.','.','H','S','S','S','S','S','S','S','S','S','S','H','.','.',
  '.','.','H','S','G','G','G','G','S','G','G','G','G','S','.','.',
  '.','.','H','S','G','E','S','G','S','G','E','S','G','S','.','.',
  '.','.','.','S','G','G','G','G','S','G','G','G','G','S','.','.',
  '.','.','.','S','S','S','S','S','S','S','S','S','S','S','.','.',
  '.','.','.','S','S','B','B','B','B','B','B','S','S','.','.','.',
  '.','.','.','S','B','S','S','S','S','S','S','B','S','.','.','.',
  '.','.','.','S','B','B','B','M','M','B','B','B','S','.','.','.',
  '.','.','.','.','.','S','S','S','S','S','S','.','.','.','.','.',
  '.','.','.','T','T','T','T','T','T','T','T','T','T','.','.','.'
];

const SKILL_ATTRIBUTES = [
  { label: 'PYTHON:', value: 95, color: 'bg-neon-cyan', glow: 'shadow-[0_0_8px_#00F5FF]' },
  { label: 'ML / AI:', value: 96, color: 'bg-arcade-pink', glow: 'shadow-[0_0_8px_#FF4FD8]' },
  { label: 'APIs (FASTAPI):', value: 92, color: 'bg-neon-green', glow: 'shadow-[0_0_8px_#00FF7F]' },
  { label: 'AWS / CLOUD:', value: 88, color: 'bg-electric-purple', glow: 'shadow-[0_0_8px_#8A2BE2]' },
  { label: 'DEVOPs / CI-CD:', value: 90, color: 'bg-white', glow: 'shadow-[0_0_8px_#ffffff]' }
];

export default function PlayerProfile({ cheatMode }) {
  const hpString = "██████████";
  const xpString = cheatMode ? "██████████" : "████████░░";

  return (
    <div className="w-full h-full flex flex-col justify-start items-stretch p-3 md:p-5 select-none z-20 relative overflow-y-auto">
      
      {/* Compact two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch flex-1 min-h-0">
        
        {/* Left Column: Avatar & Character Status (Vertically Centered and Grouped) */}
        <div className="md:col-span-5 bg-black border-4 border-electric-purple pixel-border-purple p-4 flex flex-col items-center justify-center shadow-[0_0_10px_rgba(138,43,226,0.2)]">
          <div className="w-full flex flex-col items-center space-y-4">
            
            {/* Avatar Details */}
            <div className="w-full text-center flex flex-col items-center">
              <div className="font-arcade text-[8px] text-arcade-pink glow-pink mb-2">PLAYER 1</div>
              
              {/* Custom SVG Pixel Art Avatar */}
              <div className="w-20 h-20 bg-[#11052C] p-1 border-2 border-neon-cyan border-glow-cyan mb-2 flex items-center justify-center">
                <svg viewBox="0 0 16 16" className="w-full h-full pixel-art">
                  {AVATAR_GRID.map((colorKey, index) => {
                    const x = index % 16;
                    const y = Math.floor(index / 16);
                    const color = PALETTE[colorKey];
                    if (color === 'transparent') return null;
                    return (
                      <rect
                        key={index}
                        x={x}
                        y={y}
                        width="1.05"
                        height="1.05"
                        fill={color}
                      />
                    );
                  })}
                </svg>
              </div>

              <h3 className="font-arcade text-[10px] md:text-xs text-white tracking-wider mb-0.5">
                ADITHYA.B
              </h3>
              <div className="font-arcade text-[8px] text-retro-yellow glow-yellow">
                CLASS: AI ENGINEER
              </div>
            </div>

            {/* Level Stats Sheet (Centered directly below portrait) */}
            <div className="w-full text-left font-arcade text-[8px] space-y-2 border-t border-slate-900 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">LEVEL:</span>
                <span className="text-white">{cheatMode ? '99 (MAX)' : '20'}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between text-neon-green glow-green">
                  <span>HP:</span>
                  <span>100 / 100</span>
                </div>
                <span className="text-neon-green tracking-widest font-mono text-[9px] leading-none">{hpString}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between text-retro-yellow glow-yellow">
                  <span>XP:</span>
                  <span>{cheatMode ? '9999 / 9999' : '8.12 / 10.0'}</span>
                </div>
                <span className="text-retro-yellow tracking-widest font-mono text-[9px] leading-none">{xpString}</span>
              </div>
            </div>

            {/* Equipped Items (fills empty space and matches RPG theme) */}
            <div className="w-full text-left font-arcade text-[8px] space-y-2 border-t border-slate-900 pt-3">
              <div className="text-arcade-pink glow-pink uppercase tracking-widest mb-1 font-semibold">
                EQUIPPED ITEMS
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="text-[10px]">⚔</span>
                <span className="text-slate-400">WEAPON:</span>
                <span className="text-white font-mono">PYTHON_BLADE</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="text-[10px]">🛡</span>
                <span className="text-slate-400">SHIELD:</span>
                <span className="text-white font-mono">FASTAPI_BARRIER</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="text-[10px]">💍</span>
                <span className="text-slate-400">AMULET:</span>
                <span className="text-white font-mono">LANGGRAPH_CORE</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="text-[10px]">👟</span>
                <span className="text-slate-400">BOOTS:</span>
                <span className="text-white font-mono">REACT_THREADS</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Character Specs & Attributes */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3 min-h-0">
          
          {/* Programming Attribute Bars */}
          <div className="bg-black border-4 border-neon-cyan pixel-border p-3 shadow-[0_0_10px_rgba(0,245,255,0.15)] flex-1 flex flex-col justify-center">
            <h4 className="font-arcade text-[8px] text-neon-cyan tracking-widest mb-3 border-b border-slate-900 pb-1">
              SKILL ATTRIBUTES
            </h4>
            
            <div className="font-arcade text-[8px] space-y-2.5">
              {SKILL_ATTRIBUTES.map((attr) => (
                <div key={attr.label} className="flex items-center justify-between w-full">
                  {/* Expanded width (w-32 md:w-36) and shrink-0 to prevent skill labels from wrapping or truncating */}
                  <span className="text-slate-300 w-32 md:w-36 shrink-0 text-left truncate">{attr.label}</span>
                  <div className="flex-1 mx-2 bg-[#11052C] h-3 border border-electric-purple/50 relative overflow-hidden">
                    <div className={`${attr.color} h-full ${attr.glow}`} style={{ width: `${attr.value}%` }} />
                  </div>
                  {/* Expanded width (w-8) and shrink-0 to ensure numbers are fully visible */}
                  <span className="text-retro-yellow font-mono w-8 text-right shrink-0">{cheatMode ? '999' : attr.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Character Biography (monospaced and sharp) */}
          <div className="bg-black border-4 border-arcade-pink pixel-border-pink p-3 shadow-[0_0_10px_rgba(255,79,216,0.15)] flex-1 flex flex-col justify-center">
            <h4 className="font-arcade text-[8px] text-arcade-pink tracking-widest mb-2 border-b border-slate-900 pb-1">
              CHARACTER SPECS / BIO
            </h4>
            
            <div className="font-mono text-[10px] md:text-xs text-slate-300 leading-normal space-y-2 text-left">
              <p>
                Adithya is an AI & ML undergraduate at <span className="text-neon-cyan font-semibold">VIT Chennai</span> (Class of 2027) with a CGPA of <span className="text-retro-yellow font-semibold">8.12</span>.
              </p>
              <p>
                He works as an <span className="text-retro-yellow font-semibold">SDE Intern at Nexrova Technologies</span>, developing stateful voice conversational agentic AI reservation architectures.
              </p>
              <p>
                Specialized in deploying LLM solutions, deep learning CNNs, and low-latency APIs on AWS cloud setups.
              </p>
              
              {/* Added Coursework context */}
              <div className="border-t border-slate-900 pt-1.5 mt-1.5">
                <span className="font-arcade text-[7px] text-slate-400 block mb-1">RELEVANT COURSEWORK:</span>
                <span className="text-slate-400 text-[9px] leading-relaxed block">
                  Machine Learning, Deep Learning, Natural Language Processing, Artificial Intelligence, Cloud Computing, Algorithms, Data Structures, Databases.
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
