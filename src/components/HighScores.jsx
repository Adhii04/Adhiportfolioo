import { motion } from 'framer-motion';

const LEADERBOARD_ENTRIES = [
  { 
    rank: '1ST', 
    name: 'IBM GEN AI', 
    score: 'WATSONX_CERT', 
    desc: 'IBM Watsonx cloud certification covering LLM pipelines, prompt engineering, and agent applications.',
    color: 'text-[#8A2BE2] glow-purple' 
  },
  { 
    rank: '2ND', 
    name: 'NEXROVA INTERN', 
    score: 'RESERVATION_AI', 
    desc: 'SDE Intern engineering voice conversational agentic AI reservation interfaces during call routines.',
    color: 'text-[#FF4FD8] glow-pink' 
  },
  { 
    rank: '3RD', 
    name: 'VIT CSE CGPA', 
    score: '8.12 / 10.00', 
    desc: 'B.Tech in Computer Science and Engineering (AI & ML) at VIT Chennai. Class of 2027.',
    color: 'text-[#FF2A2A] shadow-red-500' 
  },
  { 
    rank: '4TH', 
    name: 'XII BOARD EXAMS', 
    score: '85.00 PERCENT', 
    desc: 'Completed Higher Secondary Schooling at The Velammal International School, Chennai.',
    color: 'text-[#FF7F00] shadow-orange-500' 
  },
  { 
    rank: '5TH', 
    name: 'LANGCHAIN ENGINE', 
    score: '95 PTS (MAX)', 
    desc: 'Multi-agent frameworks, LangGraph state charts, state memory, and LLM orchestration.',
    color: 'text-[#00FF7F] glow-green' 
  },
  { 
    rank: '6TH', 
    name: 'PYTHON ATTACK', 
    score: '95 PTS (MAX)', 
    desc: 'Scripting pipelines, model training environments, scikit-learn models, and script compilers.',
    color: 'text-[#00CC66] glow-green' 
  },
  { 
    rank: '7TH', 
    name: 'FASTAPI SPEED', 
    score: '92 PTS (MAX)', 
    desc: 'Low-latency backend microservices with under 200ms transaction monitoring triggers.',
    color: 'text-[#00F5FF] glow-cyan' 
  },
  { 
    rank: '8TH', 
    name: 'REACT UI SHIELD', 
    score: '90 PTS (MAX)', 
    desc: 'Frontend rendering loops, responsive web frames, and client-facing retro cabinet interfaces.',
    color: 'text-[#3399FF] shadow-blue-400' 
  },
  { 
    rank: '9TH', 
    name: 'AWS CLOUD DEF', 
    score: '88 PTS (MAX)', 
    desc: 'Docker containers, AWS Lambda serverless functions, S3 assets hosting, and CI/CD pipelines.',
    color: 'text-[#0066FF] shadow-blue-600' 
  },
  { 
    rank: '10TH', 
    name: 'DEEP LEARNING', 
    score: '96 PTS (MAX)', 
    desc: 'Convolutional Neural Networks, OpenCV image manipulation, and dataset balance metrics.',
    color: 'text-[#3c00ff] shadow-blue-800' 
  }
];

export default function HighScores() {
  return (
    <div className="w-full h-full flex flex-col justify-start items-stretch p-3 md:p-5 select-none z-20 relative overflow-y-auto">
      
      {/* Title */}
      <h3 className="font-arcade text-center text-sm md:text-lg text-white mb-1 tracking-widest glow-white">
        HIGH SCORES
      </h3>
      <div className="font-arcade text-center text-[8px] text-slate-500 mb-3 tracking-wider">
        SPACE CHALLENGE HALL OF FAME
      </div>

      {/* Leaderboard Table */}
      <div className="bg-black border-4 border-electric-purple pixel-border-purple p-4 shadow-[0_0_20px_rgba(138,43,226,0.3)]">
        
        {/* Table Head */}
        <div className="font-arcade text-[8px] md:text-xs text-slate-500 flex justify-between border-b-2 border-slate-900 pb-3 mb-4">
          <span className="w-16">RANK</span>
          <span className="flex-1 text-left px-4">ACHIEVEMENT NAME</span>
          <span className="w-32 text-right">VALUE</span>
        </div>

        {/* Table Body */}
        <div className="space-y-4 font-arcade text-[10px] md:text-sm">
          {LEADERBOARD_ENTRIES.map((entry, index) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`flex flex-col py-2 hover:bg-white/5 px-2 transition-all border-b border-slate-900/60 last:border-0 ${entry.color}`}
            >
              {/* Top Row: Rank, Title, Value */}
              <div className="flex justify-between items-center w-full">
                {/* Rank */}
                <span className="w-16 font-semibold tracking-wider shrink-0 text-left">
                  {entry.rank}
                </span>

                {/* Achievement Name */}
                <span className="flex-1 text-left px-4 tracking-widest truncate">
                  {entry.name}
                </span>

                {/* Value */}
                <span className="w-40 text-right tracking-widest truncate font-mono shrink-0">
                  {entry.score}
                </span>
              </div>

              {/* Bottom Row: Monospaced description */}
              <div className="pl-20 text-left text-[9px] font-mono text-slate-400 mt-1 leading-normal shrink-0">
                {entry.desc}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <div className="mt-6 font-pixel text-slate-500 text-xs text-center">
        * Achievements verified by VIT Chennai & IBM watsonx systems *
      </div>

    </div>
  );
}
