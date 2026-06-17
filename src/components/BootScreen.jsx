import { useEffect, useState } from 'react';
import { audio } from '../utils/audio';

const BOOT_LOGS = [
  "AMIBIOS (C) 1992 American Megatrends, Inc.",
  "ADITHYA-BIOS V8.12 RELEASE DATE: 06/17/2026",
  "CPU: AI-ML Neural Processing Unit @ 4.20GHz",
  "RAM TEST: 8120KB OK (8.12 CGPA DETECTED)",
  " ",
  "DETECTING PRIMARY DRIVES...",
  "  PORT 1: SSD_LANG_PYTHON_95 [ACTIVE]",
  "  PORT 2: SSD_LANG_JAVA_90 [ACTIVE]",
  "  PORT 3: SSD_FRAMEWORK_REACT_92 [ACTIVE]",
  "  PORT 4: SSD_CLOUD_AWS_88 [ACTIVE]",
  " ",
  "LOADING ADITHYA_CORE_SYSTEM...",
  "INITIALIZING GRAPHICS CONTROLLER (CRT_SCANLINES)... OK",
  "MOUNTING SOUND SYNTHESIZER (8BIT_SQUARE_WAVE)... OK",
  "ESTABLISHING COM_PORTS (github/Adhii04)... CONNECTED",
  " ",
  "SYSTEM BOOT SEQUENCE COMPLETED.",
  "READY TO LAUNCH THE INTERACTIVE PORTFOLIO."
];

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Play system boot sound immediately
    audio.playBoot();
  }, []);

  useEffect(() => {
    if (currentIndex < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, BOOT_LOGS[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
        
        // Play soft keyboard tick sound
        if (BOOT_LOGS[currentIndex].trim() !== "") {
          audio.playTone(600, 'triangle', 0.02, 0.05);
        }
      }, Math.random() * 100 + 80); // randomize typing speed slightly

      return () => clearTimeout(timer);
    } else {
      // Finished all lines, wait a bit and complete
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, onComplete]);

  return (
    <div className="w-full h-full bg-black text-[#00FF7F] font-screen p-6 flex flex-col justify-between select-none">
      {/* Top terminal area */}
      <div className="flex-1 overflow-y-auto leading-relaxed text-xs md:text-sm">
        {visibleLines.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        {currentIndex < BOOT_LOGS.length && (
          <span className="inline-block w-2 h-4 bg-[#00FF7F] animate-retro-blink ml-1" />
        )}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#00FF7F]/30 pt-2 text-[10px] md:text-xs flex justify-between text-[#00FF7F]/60">
        <span>BIOS VER 8.12</span>
        <span>PRESS ESC FOR SETUP</span>
      </div>
    </div>
  );
}
