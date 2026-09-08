import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitBranch, GitCommit, GitMerge, Check, Play, Pause, RotateCcw, Sparkles, Terminal } from 'lucide-react';
import { sound } from '../utils/sound';

interface BranchVisualizerProps {
  mode?: 'concept' | 'interactive' | 'merge';
}

export const BranchVisualizer: React.FC<BranchVisualizerProps> = ({ mode = 'interactive' }) => {
  const [step, setStep] = useState<number>(3); // 1: main only, 2: feature branched, 3: commits on feature, 4: PR active, 5: merge completed
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-play flow
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep(prev => {
          if (prev >= 5) {
            setIsPlaying(false);
            return 5;
          }
          sound.playClick();
          return prev + 1;
        });
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const setStage = (newStep: number) => {
    setStep(newStep);
    sound.playClick();
  };

  return (
    <div className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl p-5 github-glow">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#30363d] mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#23863622] text-[#2ea043] border border-[#23863644]">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight">Interactive Git Graph Visualizer</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#21262d] text-[#2ea043] border border-[#30363d] font-mono font-semibold">
                CampusConnect/web
              </span>
            </div>
            <p className="text-xs text-[#7d8590]">Watch non-destructive branch isolation and pull request merging in real-time</p>
          </div>
        </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setStage(Math.max(1, step - 1))}
          disabled={step <= 1}
          className="px-2.5 py-1 text-xs rounded-md bg-[#21262d] text-[#c9d1d9] hover:text-white hover:bg-[#30363d] disabled:opacity-40 transition-colors"
        >
          Prev Stage
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-3 py-1 text-xs rounded-md transition-all flex items-center gap-1.5 font-medium shadow-sm ${
            isPlaying 
              ? 'bg-[#d29922] text-black hover:bg-[#e3b341]' 
              : 'bg-[#238636] text-white hover:bg-[#2ea043]'
          }`}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
        </button>

        <button
          onClick={() => setStage(Math.min(5, step + 1))}
          disabled={step >= 5}
          className="px-3 py-1 text-xs rounded-md bg-[#238636] text-white hover:bg-[#2ea043] disabled:opacity-40 transition-colors flex items-center gap-1 font-medium shadow-sm"
        >
          Next Stage
        </button>

        <button
          onClick={() => {
            setIsPlaying(false);
            setStage(1);
          }}
          title="Reset branch animation"
          className="p-1 rounded-md bg-[#21262d] text-[#7d8590] hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    {/* SVG Flow diagram with Framer Motion Elements */}
    <div className="relative w-full h-48 sm:h-56 bg-[#010409] rounded-xl border border-[#30363d] overflow-hidden flex items-center justify-center px-2 sm:px-4 select-none">
      {/* Subtle grid in SVG background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]" />

      <svg className="w-full h-full max-w-2xl relative z-10" viewBox="0 0 740 180">
          <defs>
            <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#238636" />
              <stop offset="100%" stopColor="#2ea043" />
            </linearGradient>
            <linearGradient id="featureGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <linearGradient id="mergeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#2ea043" floodOpacity="0.6" />
            </filter>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.7" />
            </filter>
            <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#a855f7" floodOpacity="0.7" />
            </filter>
          </defs>

          {/* Main branch base path */}
          <line x1="70" y1="120" x2="680" y2="120" stroke="#21262d" strokeWidth="4" strokeLinecap="round" />
          
          {/* Active main line up to current progress */}
          <motion.line 
            x1="70" 
            y1="120" 
            x2={step >= 5 ? 680 : 360} 
            y2="120" 
            stroke="url(#mainGrad)" 
            strokeWidth="4" 
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Branch curve to feature/login (Stage 2+) */}
          {step >= 2 && (
            <motion.path
              d="M 170 120 C 225 120, 215 50, 280 50 L 480 50"
              fill="none"
              stroke="url(#featureGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}

          {/* Merge curve back from feature into main (Stage 5) */}
          {step >= 5 && (
            <motion.path
              d="M 480 50 C 535 50, 530 120, 590 120"
              fill="none"
              stroke="url(#mergeGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}

          {/* Branch Line Indicators (main) */}
          <g transform="translate(60, 120)">
            <rect x="-48" y="-13" width="56" height="26" rx="6" fill="#23863622" stroke="#238636" strokeWidth="1.5" />
            <text x="-20" y="4" fill="#2ea043" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">main</text>
          </g>

          {/* Branch Line Indicators (feature/login) */}
          {step >= 2 && (
            <motion.g 
              transform="translate(260, 50)"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <rect x="-10" y="-13" width="105" height="26" rx="6" fill="#38bdf818" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="42" y="4" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">feature/login</text>
            </motion.g>
          )}

          {/* Commit Nodes */}
          {/* Commit C1 (Scaffold on main) */}
          <g transform="translate(170, 120)">
            <circle r="13" fill="#238636" stroke="#010409" strokeWidth="3" filter="url(#glow-green)" />
            <text x="0" y="28" fill="#7d8590" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">C1: 8f4a1</text>
            <text x="0" y="40" fill="#c9d1d9" fontSize="9" textAnchor="middle">Scaffold</text>
          </g>

          {/* Commit C2 (Login UI on feature) */}
          {step >= 3 && (
            <motion.g 
              transform="translate(350, 50)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <circle r="13" fill="#38bdf8" stroke="#010409" strokeWidth="3" filter="url(#glow-cyan)" />
              <text x="0" y="-22" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">C2: 9c2b4</text>
              <text x="0" y="-10" fill="#c9d1d9" fontSize="9" textAnchor="middle">Login UI</text>
            </motion.g>
          )}

          {/* Commit C3 (Validation on feature) */}
          {step >= 3 && (
            <motion.g 
              transform="translate(460, 50)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
            >
              <circle r="13" fill="#818cf8" stroke="#010409" strokeWidth="3" filter="url(#glow-cyan)" />
              <text x="0" y="-22" fill="#818cf8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">C3: d1e77</text>
              <text x="0" y="-10" fill="#c9d1d9" fontSize="9" textAnchor="middle">Auth Checks</text>
            </motion.g>
          )}

          {/* PR Pulse Beacon (Stage 4) */}
          {step === 4 && (
            <motion.g 
              transform="translate(520, 50)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <circle r="18" fill="none" stroke="#2ea043" strokeWidth="2" strokeDasharray="3 3" className="animate-spin" />
              <text x="0" y="32" fill="#2ea043" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PR #12 Review</text>
            </motion.g>
          )}

          {/* Merge Commit C4 (main) */}
          {step >= 5 && (
            <motion.g 
              transform="translate(590, 120)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <circle r="15" fill="#a855f7" stroke="#ffffff" strokeWidth="2" filter="url(#glow-purple)" />
              <text x="0" y="30" fill="#a855f7" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">C4: Merge PR #12</text>
              <text x="0" y="42" fill="#2ea043" fontSize="9" textAnchor="middle" fontWeight="semibold">✓ Production Live</text>
            </motion.g>
          )}
        </svg>

        {/* Live status badge */}
        <div className="absolute top-3 right-3 text-xs bg-[#0d1117]/95 border border-[#30363d] px-3 py-1.5 rounded-full text-[#c9d1d9] flex items-center gap-2 backdrop-blur-md shadow-lg">
          <span className={`w-2 h-2 rounded-full ${
            step === 5 ? 'bg-[#a855f7] animate-pulse' :
            step === 4 ? 'bg-[#2ea043] animate-ping' :
            step >= 2 ? 'bg-[#38bdf8]' : 'bg-[#238636]'
          }`} />
          <span className="font-medium text-[11px]">
            {step === 1 && "Stage 1: Production baseline on main"}
            {step === 2 && "Stage 2: Branch created (`feature/login`)"}
            {step === 3 && "Stage 3: 2 commits added in safe isolation"}
            {step === 4 && "Stage 4: Pull Request #12 undergoing CI & Peer Review"}
            {step === 5 && "Stage 5: PR merged into main with zero conflict!"}
          </span>
        </div>
      </div>

      {/* Stage Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3 text-xs">
        <button
          onClick={() => setStage(1)}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            step === 1 ? 'border-[#2ea043] bg-[#23863622] text-white shadow-md' : 'border-[#30363d] bg-[#010409] text-[#7d8590] hover:border-[#58a6ff]'
          }`}
        >
          <div className="font-bold text-[#2ea043] flex items-center justify-between">
            <span>1. Mainline</span>
            {step === 1 && <span className="w-1.5 h-1.5 rounded-full bg-[#2ea043]" />}
          </div>
          <div className="text-[10px] text-[#7d8590] mt-0.5 font-mono">git checkout main</div>
        </button>

        <button
          onClick={() => setStage(2)}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            step === 2 ? 'border-[#38bdf8] bg-[#38bdf818] text-white shadow-md' : 'border-[#30363d] bg-[#010409] text-[#7d8590] hover:border-[#58a6ff]'
          }`}
        >
          <div className="font-bold text-[#38bdf8] flex items-center justify-between">
            <span>2. Branch</span>
            {step === 2 && <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />}
          </div>
          <div className="text-[10px] text-[#7d8590] mt-0.5 font-mono">switch -c feature</div>
        </button>

        <button
          onClick={() => setStage(3)}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            step === 3 ? 'border-[#818cf8] bg-[#818cf818] text-white shadow-md' : 'border-[#30363d] bg-[#010409] text-[#7d8590] hover:border-[#58a6ff]'
          }`}
        >
          <div className="font-bold text-[#818cf8] flex items-center justify-between">
            <span>3. Commits</span>
            {step === 3 && <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8]" />}
          </div>
          <div className="text-[10px] text-[#7d8590] mt-0.5 font-mono">git commit (C2, C3)</div>
        </button>

        <button
          onClick={() => setStage(4)}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            step === 4 ? 'border-[#2ea043] bg-[#23863622] text-white shadow-md' : 'border-[#30363d] bg-[#010409] text-[#7d8590] hover:border-[#58a6ff]'
          }`}
        >
          <div className="font-bold text-[#2ea043] flex items-center justify-between">
            <span>4. PR Review</span>
            {step === 4 && <span className="w-1.5 h-1.5 rounded-full bg-[#2ea043]" />}
          </div>
          <div className="text-[10px] text-[#7d8590] mt-0.5 font-mono">gh pr create #12</div>
        </button>

        <button
          onClick={() => setStage(5)}
          className={`p-2.5 rounded-xl border text-left transition-all col-span-2 sm:col-span-1 ${
            step === 5 ? 'border-[#a855f7] bg-[#a855f718] text-white shadow-md' : 'border-[#30363d] bg-[#010409] text-[#7d8590] hover:border-[#58a6ff]'
          }`}
        >
          <div className="font-bold text-[#a855f7] flex items-center justify-between">
            <span>5. Merged</span>
            {step === 5 && <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />}
          </div>
          <div className="text-[10px] text-[#7d8590] mt-0.5 font-mono">git merge / close PR</div>
        </button>
      </div>
    </div>
  );
};
