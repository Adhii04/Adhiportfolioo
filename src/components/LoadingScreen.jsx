import { useEffect, useState } from 'react';
import { audio } from '../utils/audio';

const LOADING_STEPS = [
  { progress: 0, text: "Initializing Python environment..." },
  { progress: 15, text: "Mounting TensorFlow & PyTorch libraries..." },
  { progress: 30, text: "Compiling LangChain/LangGraph agentic nodes..." },
  { progress: 50, text: "Training deep learning CNN model on VIT-Data..." },
  { progress: 70, text: "Calibrating real-time FastAPI endpoints..." },
  { progress: 85, text: "Retrieving Adithya's personal game profile..." },
  { progress: 95, text: "Finalizing pixel rendering..." },
  { progress: 100, text: "SYSTEM READY. LET'S PLAY." }
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let currentStepIndex = 0;
    
    // Timer to increment progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + 1;
        
        // Find corresponding step text
        const step = LOADING_STEPS.find((s) => s.progress === nextProgress);
        if (step) {
          setCurrentText(step.text);
          // Play a small blip sound when status changes
          audio.playTone(400, 'triangle', 0.05, 0.05);
        } else if (nextProgress % 10 === 0) {
          // Normal loading tick sound
          audio.playTone(800, 'square', 0.01, 0.02);
        }

        if (nextProgress >= 100) {
          clearInterval(interval);
          audio.playLevelUp(); // Level up sound at the end of loading!
          setTimeout(() => {
            onComplete();
          }, 1000);
          return 100;
        }
        return nextProgress;
      });
    }, 45); // Takes about 4.5 seconds to load

    // Initialize text
    setCurrentText(LOADING_STEPS[0].text);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Construct pixel progress bar
  // Each block is 5% (20 blocks total)
  const totalBlocks = 20;
  const filledBlocks = Math.floor(progress / (100 / totalBlocks));
  const emptyBlocks = totalBlocks - filledBlocks;
  const barString = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#050816] font-arcade p-6 select-none relative">
      
      {/* Box design */}
      <div className="w-full max-w-md p-6 bg-black border-4 border-electric-purple pixel-border-purple shadow-[0_0_15px_rgba(138,43,226,0.3)] flex flex-col items-center">
        <h2 className="text-[#00F5FF] text-xs md:text-sm tracking-widest mb-6 glow-cyan">
          LOADING PORTFOLIO
        </h2>

        {/* Dynamic task logs */}
        <div className="w-full h-12 text-[10px] md:text-xs text-[#00FF7F] text-center mb-6 leading-relaxed flex items-center justify-center">
          {currentText}
        </div>

        {/* Pixel Loading Bar */}
        <div className="text-sm md:text-lg text-retro-yellow font-mono tracking-widest mb-4">
          {barString}
        </div>

        {/* Progress Percentage */}
        <div className="text-white text-xs md:text-sm">
          PERCENT COMPLETED: <span className="text-retro-yellow font-mono">{progress}%</span>
        </div>
      </div>
      
      {/* Decorative corners */}
      <div className="absolute bottom-8 text-[8px] text-slate-500 tracking-wider font-mono">
        SYSTEM: NEXROVA_SDE_NODE // VIT_AI_ML
      </div>
    </div>
  );
}
