import { useState, useEffect } from 'react';
import CabinetFrame from './components/CabinetFrame';
import CustomCursor from './components/CustomCursor';
import BootScreen from './components/BootScreen';
import StartScreen from './components/StartScreen';
import LoadingScreen from './components/LoadingScreen';
import MainMenu from './components/MainMenu';
import PlayerProfile from './components/PlayerProfile';
import Inventory from './components/Inventory';
import Missions from './components/Missions';
import HighScores from './components/HighScores';
import FinalBoss from './components/FinalBoss';
import DevTerminal from './components/DevTerminal';
import AlienFlyby from './components/AlienFlyby';
import { useKonami } from './hooks/useKonami';
import { audio } from './utils/audio';
import { Terminal } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState('boot'); // boot, start, loading, gameplay
  const [activeTab, setActiveTab] = useState('profile'); // profile, inventory, missions, scores, boss
  const [score, setScore] = useState(0);
  const [muted, setMuted] = useState(audio.isMuted());
  const [cheatMode, setCheatMode] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [alienTrigger, setAlienTrigger] = useState(0);
  const [isPowerTransition, setIsPowerTransition] = useState(false);

  // Mobile routing states
  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState('menu'); // menu, content

  // Track window resizing for mobile compatibility
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileView('menu'); // reset state if resizing to desktop
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync mute state on initial mount
  useEffect(() => {
    audio.setMute(muted);
  }, [muted]);

  // Activate cheat mode via Konami Code custom hook
  useKonami(() => {
    activateCheatMode();
  });

  const activateCheatMode = () => {
    setCheatMode(true);
    setScore((s) => s + 99999);
    audio.playLevelUp();
  };

  const toggleMute = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    audio.setMute(nextMute);
  };

  const handleSpawnAlien = () => {
    setAlienTrigger((prev) => prev + 1);
  };

  const handleScoreIncrease = (pts) => {
    setScore((s) => s + pts);
  };

  const handleTabChange = (tabId) => {
    setIsPowerTransition(true);
    // Short delay for CRT power out/in effect
    setTimeout(() => {
      setActiveTab(tabId);
      setIsPowerTransition(false);
      audio.playTone(300, 'triangle', 0.1, 0.05); // low transient click
    }, 400);
  };

  // Setup keyboard listener for terminal "help" trigger or general keystroke detection
  useEffect(() => {
    let keysPressed = '';
    const handleGlobalKeys = (e) => {
      keysPressed += e.key.toLowerCase();
      if (keysPressed.slice(-4) === 'help') {
        setTerminalOpen(true);
        audio.playSelect();
        keysPressed = '';
      }
      if (keysPressed.length > 20) {
        keysPressed = keysPressed.slice(-10);
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, []);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'profile':
        return <PlayerProfile cheatMode={cheatMode} />;
      case 'inventory':
        return <Inventory />;
      case 'missions':
        return <Missions />;
      case 'scores':
        return <HighScores />;
      case 'boss':
        return <FinalBoss />;
      default:
        return <PlayerProfile cheatMode={cheatMode} />;
    }
  };

  return (
    <div className="w-screen h-screen bg-[#050816] overflow-hidden relative">
      {/* Hidden standard mouse cursor is simulated inside this boundary */}
      <CustomCursor />

      {/* Main Arcade Cabinet - Expanded to occupy full screen */}
      <div className="w-full h-full flex flex-col overflow-hidden relative crt-cabinet">
          
          <CabinetFrame score={score} muteState={muted} toggleMute={toggleMute}>
            
            {/* Conditional screens according to state machine */}
            {gameState === 'boot' && (
              <BootScreen onComplete={() => setGameState('start')} />
            )}

            {gameState === 'start' && (
              <StartScreen onStart={() => setGameState('loading')} />
            )}

            {gameState === 'loading' && (
              <LoadingScreen onComplete={() => setGameState('gameplay')} />
            )}

            {gameState === 'gameplay' && (
              <div 
                className={`w-full h-full flex flex-col items-stretch justify-between relative overflow-hidden transition-all duration-300 ${
                  isPowerTransition ? 'crt-power-off' : 'crt-power-on'
                }`}
              >
                
                {/* Gameplay background scrolling lines */}
                <div className="retro-grid-bg">
                  <div className="retro-grid-lines" />
                </div>

                {/* Cheat Code Marquee Display */}
                {cheatMode && (
                  <div className="absolute top-2 w-full text-center z-30 pointer-events-none select-none">
                    <span className="font-arcade text-[8px] bg-red-600 text-white px-2 py-0.5 animate-pulse rounded border border-white">
                      ★ CHEAT MODE ENABLED: ∞ XP UNLOCKED ★
                    </span>
                  </div>
                )}

                {/* Main Content Pane Split */}
                <div className="flex-1 w-full flex flex-col md:grid md:grid-cols-12 overflow-hidden items-stretch relative z-10 p-2 md:p-6 gap-4 md:gap-6 min-h-0">
                  
                  {/* Left Column: Vertical Selection Menu */}
                  {(!isMobile || mobileView === 'menu') && (
                    <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center items-center h-full min-h-0">
                      <MainMenu 
                        activeTab={activeTab} 
                        onSelect={(tabId) => {
                          handleTabChange(tabId);
                          if (isMobile) {
                            setMobileView('content');
                          }
                        }} 
                      />
                    </div>
                  )}

                  {/* Right Column: Interactive Tab Contents */}
                  {(!isMobile || mobileView === 'content') && (
                    <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-start md:justify-center items-stretch overflow-hidden relative md:border-l-4 md:border-slate-900 md:pl-6 h-full min-h-0">
                      
                      {/* Mobile Return to Menu Navigation */}
                      {isMobile && (
                        <button
                          onClick={() => {
                            audio.playBeep();
                            setMobileView('menu');
                          }}
                          className="interactive cursor-none w-full bg-[#12082b] border-2 border-neon-cyan hover:border-arcade-pink text-neon-cyan hover:text-arcade-pink py-1.5 font-arcade text-[8px] tracking-widest mb-3 flex items-center justify-center space-x-2 transition-all shrink-0"
                        >
                          <span>◀ RETURN TO MENU</span>
                        </button>
                      )}

                      <div className="flex-1 min-h-0 overflow-y-auto">
                        {renderActiveScreen()}
                      </div>
                    </div>
                  )}

                </div>

                {/* Space Invader Alien Easter Egg */}
                <AlienFlyby triggerSpawn={alienTrigger} onHit={handleScoreIncrease} />

                {/* Floating Developer Terminal Prompt Button */}
                <button
                  onClick={() => {
                    audio.playSelect();
                    setTerminalOpen(true);
                  }}
                  className="interactive cursor-none absolute bottom-4 right-4 z-40 bg-zinc-950/80 border-2 border-[#00FF7F] text-[#00FF7F] hover:border-retro-yellow hover:text-retro-yellow px-3 py-1.5 font-arcade text-[8px] flex items-center space-x-1.5 shadow-[0_0_8px_rgba(0,255,127,0.3)] transition-all"
                  title="Type 'help' to unlock system console"
                >
                  <Terminal className="w-3 h-3" />
                  <span className="hidden sm:inline">DEV_TERMINAL</span>
                </button>

                {/* Slide-over Developer Console Terminal */}
                <DevTerminal
                  isOpen={terminalOpen}
                  onClose={() => setTerminalOpen(false)}
                  onActivateCheat={onActivateCheat => activateCheatMode()}
                  onSpawnAlien={handleSpawnAlien}
                  currentScore={score}
                />

              </div>
            )}

          </CabinetFrame>
        </div>
    </div>
  );
}
