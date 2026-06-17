import { useState, useEffect, useRef } from 'react';
import { audio } from '../utils/audio';

const INTRO_TEXT = [
  "ADITHYA CORE SYSTEM TERMINAL // VER 8.12",
  "TYPE 'help' FOR A LIST OF AVAILABLE COMMANDS.",
  " "
];

export default function DevTerminal({ isOpen, onClose, onActivateCheat, onSpawnAlien, currentScore }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState(INTRO_TEXT);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const command = inputVal.trim().toLowerCase();
    if (!command) return;

    audio.playSelect();
    const newHistory = [...history, `> ${inputVal}`];

    switch (command) {
      case 'help':
        newHistory.push(
          "Available Commands:",
          "  about    - Summary details of Player 1",
          "  skills   - Lists active inventory items",
          "  cheat    - Activates Cheat Mode (LV99, Max HP/XP)",
          "  alien    - Commands space invader to fly by",
          "  score    - Returns current score",
          "  clear    - Wipes terminal logs",
          "  close    - Shuts down developer terminal"
        );
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'about':
        newHistory.push(
          "PLAYER: Adithya Balasubramani",
          "CLASS: AI & ML Developer",
          "VIT CHENNAI: B.Tech CSE AI/ML, CGPA 8.12",
          "INTERN: SDE Intern at Nexrova Technologies",
          "LORE: Enjoys creating voice agents and ML models."
        );
        break;
      case 'skills':
        newHistory.push(
          "INVENTORY LOGS:",
          "  * Python [Mastery 5/5] - High Attack",
          "  * Machine Learning [Mastery 5/5] - High Intellect",
          "  * FastAPI [Mastery 5/5] - High Speed",
          "  * React [Mastery 5/5] - High Speed",
          "  * LangChain [Mastery 5/5] - Agentic AI Core"
        );
        break;
      case 'cheat':
        onActivateCheat();
        newHistory.push(">> DETECTING CHEAT CODE ENGINE...", ">> CHEAT MODE UNLOCKED: LEVEL 99 INJECTED, INFINITE XP!");
        break;
      case 'alien':
        onSpawnAlien();
        newHistory.push(">> INTRUDER DETECTED! Spawning Space Invader alien...");
        break;
      case 'score':
        newHistory.push(`CURRENT ARCADE SCORE: ${currentScore} POINTS`);
        break;
      case 'close':
        newHistory.push("Shutting down terminal...");
        setTimeout(onClose, 500);
        break;
      default:
        newHistory.push(`Command not recognized: '${command}'. Type 'help' for instructions.`);
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    // Keyboard key tap sounds
    audio.playTone(600, 'triangle', 0.02, 0.04);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 h-[300px] bg-black border-t-4 border-neon-cyan z-50 flex flex-col font-screen text-xs text-[#00FF7F] select-text">
      
      {/* Top status bar */}
      <div className="bg-[#11052C] px-4 py-2 flex justify-between items-center border-b border-neon-cyan/40">
        <span className="font-arcade text-[8px] text-white">DEVELOPER SYSTEM CONSOLE</span>
        <button
          onClick={() => {
            audio.playBeep();
            onClose();
          }}
          className="interactive cursor-none font-arcade text-[8px] border border-[#00FF7F]/60 px-2 py-0.5 hover:bg-[#00FF7F]/10 text-[#00FF7F] bg-transparent"
        >
          [ESC] CLOSE
        </button>
      </div>

      {/* Terminal History */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-1 font-mono leading-relaxed bg-[#02040c]"
      >
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleCommandSubmit} className="flex border-t border-neon-cyan/30 bg-[#050816] p-2 items-center">
        <span className="font-mono text-[#00FF7F] mr-2">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={handleInputChange}
          className="flex-1 bg-transparent text-[#00FF7F] border-none outline-none font-mono text-xs focus:ring-0 cursor-none"
          placeholder="type command here..."
          autoComplete="off"
        />
      </form>

    </div>
  );
}
