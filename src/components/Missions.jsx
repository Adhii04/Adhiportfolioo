import { useState } from 'react';
import { audio } from '../utils/audio';
import { Play, X, Star } from 'lucide-react';

const MISSIONS_LIST = [
  {
    id: 'nexrova',
    code: 'MISSION 01',
    title: 'Voice Agentic Reservation AI',
    status: 'ACTIVE PROGRESS',
    difficulty: 5,
    reward: 'Agentic AI, Voice Synthesis, LLMs',
    tech: ['Python', 'LLMs', 'Agentic Workflows', 'Voice APIs', 'Nexrova Core'],
    brief: 'Engineering an automated, call-based hotel reservation framework using stateful, conversational AI agents.',
    objectives: [
      'Architected a voice agent framework to conduct human-like conversations during reservation calls.',
      'Configured low-latency voice synthesizing nodes to ensure real-time conversations without long delays.',
      'Parsed unstructured caller parameters (date, room type, credentials) into structured booking payloads.'
    ],
    class: 'border-glow-pink'
  },
  {
    id: 'ai-assistant',
    code: 'MISSION 02',
    title: 'Personal AI Assistant Engine',
    status: 'COMPLETED',
    difficulty: 5,
    reward: 'LangChain, LangGraph, FastAPI, AWS S3',
    tech: ['Python', 'LangChain', 'LangGraph', 'FastAPI', 'PostgreSQL', 'AWS Lambda', 'Terraform'],
    brief: 'A full-stack, stateful agentic AI companion that maintains persistent memory across chats and automates deployment.',
    objectives: [
      'Built stateful multi-agent nodes using LangChain and LangGraph for flexible, persistent conversations.',
      'Deployed a Dockerized FastAPI backend on AWS Lambda, achieving secure OAuth2 authentication and low latency.',
      'Implemented automated CI/CD pipeline releasing a React frontend through AWS S3 + CloudFront using Terraform.'
    ],
    class: 'border-glow-cyan'
  },
  {
    id: 'fraud-detection',
    code: 'MISSION 03',
    title: 'AI-Powered Fraud Detection System',
    status: 'COMPLETED',
    difficulty: 4,
    reward: 'Machine Learning, FastAPI, SMOTE',
    tech: ['Python', 'Scikit-learn', 'FastAPI', 'SMOTE', 'Data Pipelines'],
    brief: 'A high-throughput fraud screening pipeline filtering over 100K transaction entries with real-time model inference.',
    objectives: [
      'Balanced credit transaction imbalances in 100K+ records using SMOTE resampling to enhance model training.',
      'Developed a FastAPI microservice returning fraud decisions under 200ms for live API transactions.',
      'Optimized hyperparameters to boost fraud detection by 30% while decreasing false negatives by 22%.'
    ],
    class: 'border-glow-purple'
  },
  {
    id: 'breast-cancer',
    code: 'MISSION 04',
    title: 'Breast Cancer Classifier CNN',
    status: 'COMPLETED',
    difficulty: 4,
    reward: 'TensorFlow, CNN, OpenCV, Deep Learning',
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Deep Learning', 'Data Augmentation'],
    brief: 'Convolutional Neural Network classification of histopathology images to screen and detect malignant breast cancer cells.',
    objectives: [
      'Trained a CNN model on 2,373 high-res histopathology samples to perform binary classification.',
      'Reached an 89.6% validation accuracy with a 0.959 Area Under the Curve (AUC) rate.',
      'Applied advanced image augmentation and balancing to guard the model against overfitting.'
    ],
    class: 'border-glow-yellow'
  }
];

export default function Missions() {
  const [selectedMission, setSelectedMission] = useState(null);

  const handleOpenBrief = (mission) => {
    setSelectedMission(mission);
    audio.playSelect();
  };

  const handleCloseBrief = () => {
    setSelectedMission(null);
    audio.playBeep();
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star 
        key={idx} 
        className={`w-3 h-3 ${idx < count ? 'fill-retro-yellow text-retro-yellow' : 'text-slate-700'}`} 
      />
    ));
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-stretch p-3 md:p-5 select-none z-20 relative overflow-y-auto">
      <h3 className="font-arcade text-center text-xs md:text-sm text-retro-yellow mb-4 glow-yellow tracking-widest">
        :: SELECT LEVEL / MISSION ::
      </h3>

      {/* Grid of mission level cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {MISSIONS_LIST.map((mission) => {
          const isCompleted = mission.status === 'COMPLETED';
          
          return (
            <div
              key={mission.id}
              className={`bg-black border-4 p-5 flex flex-col justify-between transition-all duration-200 relative ${
                isCompleted 
                  ? 'border-electric-purple/60 hover:border-neon-cyan shadow-[0_0_10px_rgba(138,43,226,0.1)] hover:shadow-[0_0_15px_rgba(0,245,255,0.2)]' 
                  : 'border-arcade-pink pixel-border-pink shadow-[0_0_10px_rgba(255,79,216,0.1)]'
              }`}
            >
              {/* Mission Header */}
              <div className="flex justify-between items-start mb-3">
                <span className="font-arcade text-[8px] md:text-[10px] text-slate-400">
                  {mission.code}
                </span>
                <span className={`font-arcade text-[8px] px-2 py-0.5 border ${
                  isCompleted 
                    ? 'border-neon-green text-neon-green glow-green' 
                    : 'border-retro-yellow text-retro-yellow glow-yellow animate-pulse'
                }`}>
                  {mission.status}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-arcade text-xs md:text-sm text-white tracking-wide mb-2 leading-relaxed">
                {mission.title}
              </h4>

              {/* Stats */}
              <div className="space-y-2 border-t border-b border-slate-900 py-3 my-2 text-[10px] font-arcade">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">DIFFICULTY:</span>
                  <div className="flex space-x-0.5">{renderStars(mission.difficulty)}</div>
                </div>
                <div className="text-left leading-relaxed">
                  <span className="text-slate-400 block mb-1">REWARD POOL:</span>
                  <span className="text-retro-yellow text-[8px] block leading-normal">{mission.reward}</span>
                </div>
              </div>

              {/* Play Button */}
              <button
                onClick={() => handleOpenBrief(mission)}
                className="interactive cursor-none w-full bg-transparent hover:bg-neon-cyan/15 border-2 border-neon-cyan hover:border-retro-yellow text-neon-cyan hover:text-retro-yellow font-arcade text-[10px] py-2 flex items-center justify-center space-x-2 transition-all"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>LOAD BRIEFING</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Mission Details overlay dialog / Console overlay */}
      {selectedMission && (
        <div className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center p-4">
          <div className="w-full max-w-xl bg-black border-4 border-neon-cyan pixel-border p-6 relative shadow-[0_0_30px_rgba(0,245,255,0.4)]">
            
            {/* Close button */}
            <button
              onClick={handleCloseBrief}
              className="interactive cursor-none absolute top-4 right-4 p-1 border-2 border-slate-700 hover:border-arcade-pink text-slate-500 hover:text-arcade-pink bg-transparent"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Title */}
            <div className="border-b border-slate-800 pb-3 mb-4">
              <span className="font-arcade text-[8px] text-retro-yellow glow-yellow block mb-1">
                CLASSIFIED // {selectedMission.code} BRIEF
              </span>
              <h3 className="font-arcade text-sm md:text-lg text-white tracking-widest glow-white">
                {selectedMission.title}
              </h3>
            </div>

            {/* Brief Description */}
            <p className="font-mono text-slate-300 text-xs md:text-sm leading-relaxed mb-4 italic">
              "{selectedMission.brief}"
            </p>

            {/* Objectives */}
            <div className="mb-4">
              <span className="font-arcade text-[8px] text-neon-cyan block mb-2 tracking-wider">
                COMPLETED OBJECTIVES:
              </span>
              <ul className="space-y-2 font-mono text-xs text-slate-400">
                {selectedMission.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-neon-green font-arcade text-[10px] select-none">✔</span>
                    <span className="leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rewards & Tech Stack */}
            <div className="border-t border-slate-800 pt-3 flex flex-wrap gap-2">
              <span className="font-arcade text-[8px] text-slate-500 block w-full mb-1">
                TECHNOLOGY USED:
              </span>
              {selectedMission.tech.map((t) => (
                <span 
                  key={t}
                  className="font-arcade text-[8px] bg-electric-purple/20 border border-electric-purple text-[#8A2BE2] glow-purple px-2 py-1"
                >
                  {t.toUpperCase()}
                </span>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseBrief}
                className="interactive cursor-none px-4 py-2 border-2 border-arcade-pink text-arcade-pink hover:bg-arcade-pink/10 font-arcade text-[10px] transition-all"
              >
                ABORT MISSION BRIEF
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
