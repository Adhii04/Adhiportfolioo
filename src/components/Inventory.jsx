import { useState } from 'react';
import { audio } from '../utils/audio';

const SKILL_ITEMS = [
  {
    id: 'python',
    name: 'PYTHON BLADE',
    icon: '⚡',
    category: 'Language',
    stats: { attack: 95, speed: 90, mastery: 5 },
    desc: 'Core language for machine learning pipelines, deep learning models, FastAPI backends, and LangChain/LangGraph agent networks. Expert in data structures and object-oriented scripting.'
  },
  {
    id: 'ml',
    name: 'NEURAL FIRE',
    icon: '🔥',
    category: 'AI / ML',
    stats: { attack: 96, speed: 85, mastery: 5 },
    desc: 'Machine Learning & Deep Learning catalog. Proficient with Scikit-learn, TensorFlow, Keras, and PyTorch. Experienced in training Convolutional Neural Networks (CNNs), image augmentation, and SMOTE resampling.'
  },
  {
    id: 'fastapi',
    name: 'SHIELD OF FASTAPI',
    icon: '🛡',
    category: 'API Engine',
    stats: { attack: 92, speed: 98, mastery: 5 },
    desc: 'Backend microservice engine. Builds high-throughput, secure REST APIs with under 200ms latency, OAuth2/JWT authentication, and stateful PostgreSQL-backed memory integrations.'
  },
  {
    id: 'react',
    name: 'REACT GEM',
    icon: '💎',
    category: 'UI Engine',
    stats: { attack: 90, speed: 95, mastery: 5 },
    desc: 'Frontend user interface controls. Builds modular, responsive, and performance-optimized dashboards and game views using React.js, Tailwind CSS, Vite, and Framer Motion.'
  },
  {
    id: 'langchain',
    name: 'AGENTIC CORE',
    icon: '🤖',
    category: 'GenAI / Agentic',
    stats: { attack: 95, speed: 92, mastery: 5 },
    desc: 'Generative AI and Agentic workflow coordinator. Builds multi-agent nodes, stateful conversation graphs (LangGraph), LLM prompts, and voice agent setups for Nexrova automated phone reservation systems.'
  },
  {
    id: 'java',
    name: 'JAVA CLAYMORE',
    icon: '🗡',
    category: 'Language',
    stats: { attack: 80, speed: 85, mastery: 4 },
    desc: 'Enterprise programming support. Used for object-oriented software engineering, algorithms complexity analysis, data structures, and backend data services.'
  },
  {
    id: 'sql',
    name: 'SQL CHEST',
    icon: '📦',
    category: 'Database',
    stats: { attack: 88, speed: 85, mastery: 4 },
    desc: 'Relational & NoSQL database storage. Focuses on data modeling, persistent conversation logs, database index optimization, and stateful data pipelines with PostgreSQL.'
  },
  {
    id: 'aws',
    name: 'CLOUD ORB',
    icon: '☁',
    category: 'DevOps',
    stats: { attack: 88, speed: 90, mastery: 4 },
    desc: 'Summons cloud operations and deployments. Sets up Docker containers on AWS Lambda, hosts React frontends via S3 + CloudFront, provisions infrastructure using Terraform, and automates CI/CD via GitHub Actions.'
  }
];

export default function Inventory() {
  const [hoveredSkill, setHoveredSkill] = useState(SKILL_ITEMS[0]);

  const handleHover = (skill) => {
    if (hoveredSkill.id !== skill.id) {
      setHoveredSkill(skill);
      audio.playBeep();
    }
  };

  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-stretch p-3 md:p-5 select-none z-20 relative overflow-y-auto">
      <h3 className="font-arcade text-center text-xs md:text-sm text-retro-yellow mb-4 glow-yellow tracking-widest">
        :: CHOOSE YOUR POWER UPS ::
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Inventory Grid Slots */}
        <div className="md:col-span-7 bg-black border-4 border-electric-purple pixel-border-purple p-4 shadow-[0_0_15px_rgba(138,43,226,0.2)]">
          <div className="font-arcade text-[10px] text-slate-400 mb-3 uppercase">
            Equipment Inventory Slots
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {SKILL_ITEMS.map((skill) => {
              const isSelected = hoveredSkill.id === skill.id;
              
              return (
                <div
                  key={skill.id}
                  onMouseEnter={() => handleHover(skill)}
                  className={`interactive cursor-none aspect-square bg-[#11052C]/60 border-4 rounded flex flex-col justify-center items-center relative transition-all duration-100 ${
                    isSelected 
                      ? 'border-neon-cyan bg-neon-cyan/20 scale-105 shadow-[0_0_10px_rgba(0,245,255,0.4)]'
                      : 'border-slate-700 hover:border-neon-cyan/50 hover:bg-[#11052C]/90'
                  }`}
                >
                  <span className="text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    {skill.icon}
                  </span>
                  
                  {/* Subtle pixel label */}
                  <span className="absolute bottom-1 font-pixel text-[8px] md:text-[10px] text-white">
                    {skill.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}

            {/* Empty slots to look like RPG inventory grid */}
            {Array.from({ length: 8 }).map((_, idx) => (
              <div 
                key={idx} 
                className="aspect-square bg-slate-900/20 border-4 border-slate-800 opacity-30 flex items-center justify-center"
              >
                <span className="text-slate-700 text-xs font-arcade">?</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: RPG Tooltip Details */}
        <div className="md:col-span-5 bg-black border-4 border-neon-cyan pixel-border p-5 shadow-[0_0_15px_rgba(0,245,255,0.2)] flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
              <span className="font-arcade text-xs text-white uppercase glow-white">
                {hoveredSkill.name}
              </span>
              <span className="text-[20px]">
                {hoveredSkill.icon}
              </span>
            </div>

            {/* Stats list */}
            <div className="font-arcade text-[10px] space-y-2 mb-4">
              <div className="text-slate-400">
                CLASS: <span className="text-neon-cyan">{hoveredSkill.category}</span>
              </div>
              <div className="flex justify-between">
                <span>ATTACK BONUS:</span>
                <span className="text-retro-yellow font-mono">+{hoveredSkill.stats.attack}</span>
              </div>
              <div className="flex justify-between">
                <span>SPEED BOOST:</span>
                <span className="text-neon-green font-mono">+{hoveredSkill.stats.speed}</span>
              </div>
              <div className="flex justify-between">
                <span>MASTERY LEVEL:</span>
                <span className="text-arcade-pink font-mono tracking-wider">{renderStars(hoveredSkill.stats.mastery)}</span>
              </div>
            </div>

            {/* Lore/Description */}
            <div className="border-t border-slate-800 pt-3">
              <span className="font-arcade text-[8px] text-slate-500 block mb-1">
                ITEM DESCRIPTION:
              </span>
              <p className="font-mono text-xs text-slate-300 leading-relaxed">
                {hoveredSkill.desc}
              </p>
            </div>
          </div>

          <div className="mt-4 font-arcade text-[8px] text-center text-slate-500">
            * HOVER ANY SLOT TO EQUIP *
          </div>
        </div>

      </div>

    </div>
  );
}
