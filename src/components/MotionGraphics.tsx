import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, Cloud, GitBranch, GitPullRequest, GitMerge, AlertCircle, 
  CheckCircle2, Shield, Lock, Cpu, Server, FileCode, Check, RefreshCw, 
  Play, Sparkles, AlertTriangle, ArrowRight, CornerDownRight, Zap 
} from 'lucide-react';
import { sound } from '../utils/sound';

// ============================================================================
// 1. ANIMATED BRANCH GRAPH (SVG Path Drawing + Sequential Commits)
// ============================================================================
export const AnimatedBranchGraph: React.FC<{ interactive?: boolean }> = ({ interactive = true }) => {
  const [stage, setStage] = useState<number>(3); // 1: main, 2: split, 3: branch commits, 4: ready
  const [isPlaying, setIsPlaying] = useState(false);

  const startAnimation = () => {
    setIsPlaying(true);
    setStage(1);
    sound.playClick();
    setTimeout(() => { setStage(2); sound.playKeypress(); }, 800);
    setTimeout(() => { setStage(3); sound.playKeypress(); }, 1700);
    setTimeout(() => { setStage(4); sound.playSuccess(); setIsPlaying(false); }, 2600);
  };

  return (
    <div className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl p-4 sm:p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363d] pb-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <GitBranch className="w-4 h-4 text-[#2ea043] shrink-0" />
          <span className="font-bold text-white">Interactive 3D Branch Splitting Engine</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#23863622] text-[#2ea043] font-mono border border-[#23863644]">
            SVG Vector Graph
          </span>
        </div>
        {interactive && (
          <button
            onClick={startAnimation}
            disabled={isPlaying}
            className="px-3 py-1.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Play className="w-3 h-3" />
            <span>{isPlaying ? 'Splitting...' : 'Replay Split Animation'}</span>
          </button>
        )}
      </div>

      <div className="relative w-full h-[180px] bg-[#010409] rounded-lg border border-[#21262d] overflow-hidden flex items-center justify-center p-4 select-none">
        <svg viewBox="0 0 700 160" className="w-full h-full">
          {/* Grid background lines */}
          <line x1="0" y1="40" x2="700" y2="40" stroke="#161b22" strokeDasharray="4 4" />
          <line x1="0" y1="120" x2="700" y2="120" stroke="#161b22" strokeDasharray="4 4" />

          {/* Main branch path */}
          <motion.path
            d="M 50 40 L 650 40"
            stroke="#2ea043"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Branch curve path splitting to feature branch */}
          {stage >= 2 && (
            <motion.path
              d="M 220 40 C 270 40, 270 120, 340 120 L 650 120"
              stroke="#58a6ff"
              strokeWidth="3"
              strokeDasharray="6 6"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          )}

          {/* Main branch commit nodes */}
          <g>
            <circle cx="90" cy="40" r="7" fill="#2ea043" stroke="#0d1117" strokeWidth="2" />
            <text x="90" y="24" fill="#7d8590" fontSize="10" textAnchor="middle" fontFamily="monospace">c1 (init)</text>

            <circle cx="220" cy="40" r="7" fill="#2ea043" stroke="#0d1117" strokeWidth="2" />
            <text x="220" y="24" fill="#2ea043" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">c2 [SPLIT]</text>

            <circle cx="480" cy="40" r="7" fill="#2ea043" stroke="#0d1117" strokeWidth="2" />
            <text x="480" y="24" fill="#7d8590" fontSize="10" textAnchor="middle" fontFamily="monospace">c3 (main)</text>
          </g>

          {/* Feature branch commit nodes */}
          {stage >= 3 && (
            <g>
              <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                <circle cx="380" cy="120" r="8" fill="#58a6ff" stroke="#0d1117" strokeWidth="2" />
                <text x="380" y="145" fill="#58a6ff" fontSize="10" textAnchor="middle" fontFamily="monospace">feat-1</text>
              </motion.g>

              <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.3 }}>
                <circle cx="510" cy="120" r="8" fill="#58a6ff" stroke="#0d1117" strokeWidth="2" />
                <text x="510" y="145" fill="#58a6ff" fontSize="10" textAnchor="middle" fontFamily="monospace">feat-2</text>
              </motion.g>

              {stage >= 4 && (
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }}>
                  <circle cx="620" cy="120" r="9" fill="#bc8cff" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
                  <text x="620" y="145" fill="#bc8cff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">HEAD (PR ready)</text>
                </motion.g>
              )}
            </g>
          )}
        </svg>

        {/* Labels overlay */}
        <div className="absolute left-4 top-3 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#23863622] text-[#2ea043] font-mono text-[10px] border border-[#23863644]">
            main branch (production)
          </span>
        </div>
        <div className="absolute left-4 bottom-3 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#388bfd1a] text-[#58a6ff] font-mono text-[10px] border border-[#388bfd33]">
            feature/campus-map (isolated workspace)
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. GIT PUSH ANIMATION (Data Packets Traveling from Local Machine to Cloud)
// ============================================================================
export const GitPushAnimation: React.FC = () => {
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<'idle' | 'pushing' | 'synced'>('synced');
  const [packetProgress, setPacketProgress] = useState(100);

  const triggerPush = () => {
    setIsPushing(true);
    setPushStatus('pushing');
    setPacketProgress(0);
    sound.playKeypress();

    const t1 = setTimeout(() => { setPacketProgress(45); sound.playKeypress(); }, 400);
    const t2 = setTimeout(() => { setPacketProgress(85); sound.playKeypress(); }, 900);
    const t3 = setTimeout(() => {
      setPacketProgress(100);
      setPushStatus('synced');
      setIsPushing(false);
      sound.playSuccess();
    }, 1500);
  };

  return (
    <div className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl p-4 sm:p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363d] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#23863622] text-[#2ea043] shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white">Git Push: Local to Cloud Transport</span>
            <p className="text-[11px] text-[#7d8590]">Streaming commit packfiles from your local git database to GitHub Cloud</p>
          </div>
        </div>

        <button
          onClick={triggerPush}
          disabled={isPushing}
          className="px-3.5 py-1.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{isPushing ? 'Compressing & Pushing...' : 'Simulate git push origin main'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Local Laptop Source */}
        <div className="p-4 rounded-xl bg-[#010409] border border-[#30363d] text-center space-y-2">
          <Laptop className="w-8 h-8 text-[#58a6ff] mx-auto" />
          <div className="text-xs font-bold text-white">Local Developer Machine</div>
          <div className="text-[10px] text-[#7d8590] font-mono">.git/refs/heads/feature/login</div>
          <div className="inline-block px-2 py-0.5 rounded bg-[#21262d] text-[#58a6ff] text-[10px] font-mono">
            Commit SHA: 8f31a2c
          </div>
        </div>

        {/* Dynamic Transport Pipe with Traveling Data Packets */}
        <div className="p-4 flex flex-col items-center justify-center space-y-3 relative">
          <div className="w-full h-3 bg-[#161b22] rounded-full border border-[#30363d] overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#58a6ff] via-[#2ea043] to-[#2ea043] rounded-full"
              style={{ width: `${packetProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-center gap-2">
            {isPushing ? (
              <span className="text-[11px] font-mono text-[#2ea043] flex items-center gap-1.5 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Writing objects: 100% (4/4)
              </span>
            ) : (
              <span className="text-[11px] font-mono text-[#2ea043] flex items-center gap-1.5 font-bold">
                <Check className="w-3.5 h-3.5" />
                Remote Ref Updated (Up to date)
              </span>
            )}
          </div>
        </div>

        {/* GitHub Cloud Destination */}
        <div className={`p-4 rounded-xl bg-[#010409] border text-center space-y-2 transition-all ${
          pushStatus === 'synced' ? 'border-[#2ea043] shadow-lg shadow-[#2ea043]/10' : 'border-[#30363d]'
        }`}>
          <Cloud className="w-8 h-8 text-[#2ea043] mx-auto" />
          <div className="text-xs font-bold text-white">GitHub Remote Cloud</div>
          <div className="text-[10px] text-[#7d8590] font-mono">github.com/campusconnect/web</div>
          <span className="inline-block text-[10px] px-2.5 py-0.5 rounded bg-[#238636] text-white font-bold">
            origin/feature/login synced
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. GIT PULL ANIMATION (Cloud to Local Download & Merge)
// ============================================================================
export const GitPullAnimation: React.FC = () => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullProgress, setPullProgress] = useState(100);

  const triggerPull = () => {
    setIsPulling(true);
    setPullProgress(0);
    sound.playKeypress();

    setTimeout(() => { setPullProgress(50); sound.playKeypress(); }, 500);
    setTimeout(() => {
      setPullProgress(100);
      setIsPulling(false);
      sound.playSuccess();
    }, 1300);
  };

  return (
    <div className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl p-4 sm:p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363d] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#58a6ff]/20 text-[#58a6ff] shrink-0">
            <Cloud className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white">Git Pull: Cloud to Local Machine</span>
            <p className="text-[11px] text-[#7d8590]">fetch (download remote commits) + merge (integrate into your local working tree)</p>
          </div>
        </div>

        <button
          onClick={triggerPull}
          disabled={isPulling}
          className="px-3.5 py-1.5 rounded-lg bg-[#1f6feb] hover:bg-[#388bfd] text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isPulling ? 'animate-spin' : ''}`} />
          <span>{isPulling ? 'Fetching & Merging...' : 'Simulate git pull origin main'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Remote Cloud Source */}
        <div className="p-4 rounded-xl bg-[#010409] border border-[#30363d] text-center space-y-2">
          <Cloud className="w-8 h-8 text-[#58a6ff] mx-auto" />
          <div className="text-xs font-bold text-white">GitHub Remote Cloud</div>
          <div className="text-[10px] text-[#7d8590] font-mono">origin/main (Bea's commit e4b219)</div>
        </div>

        {/* Reverse Flowing Data Transport */}
        <div className="p-4 flex flex-col items-center justify-center space-y-3">
          <div className="w-full h-3 bg-[#161b22] rounded-full border border-[#30363d] overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#2ea043] via-[#58a6ff] to-[#58a6ff] rounded-full"
              style={{ width: `${pullProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-[11px] font-mono text-[#58a6ff]">
            {isPulling ? 'Fast-forwarding working tree...' : 'Fast-forward: 1 file updated (+18 insertions)'}
          </span>
        </div>

        {/* Local Laptop Destination */}
        <div className="p-4 rounded-xl bg-[#010409] border border-[#2ea043] text-center space-y-2">
          <Laptop className="w-8 h-8 text-[#2ea043] mx-auto" />
          <div className="text-xs font-bold text-white">Local Developer Laptop</div>
          <div className="text-[10px] text-[#2ea043] font-mono">Working Tree Updated (HEAD synced)</div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. PULL REQUEST FLOW ANIMATION (Branch -> PR -> Review -> Approved -> Merge)
// ============================================================================
export const PRFlowAnimation: React.FC = () => {
  const [activeStage, setActiveStage] = useState(4); // 1: branch, 2: open PR, 3: review, 4: approved, 5: merged
  const [isAnimating, setIsAnimating] = useState(false);

  const runFlow = () => {
    setIsAnimating(true);
    setActiveStage(1);
    sound.playClick();

    setTimeout(() => { setActiveStage(2); sound.playKeypress(); }, 700);
    setTimeout(() => { setActiveStage(3); sound.playKeypress(); }, 1500);
    setTimeout(() => { setActiveStage(4); sound.playKeypress(); }, 2300);
    setTimeout(() => { setActiveStage(5); sound.playSuccess(); setIsAnimating(false); }, 3100);
  };

  return (
    <div className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl p-4 sm:p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363d] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <GitPullRequest className="w-4 h-4 text-[#bc8cff] shrink-0" />
          <span className="font-bold text-white">5-Stage Pull Request Life Cycle</span>
        </div>
        <button
          onClick={runFlow}
          disabled={isAnimating}
          className="px-3 py-1.5 rounded-lg bg-[#8957e5] hover:bg-[#a371f7] text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Play className="w-3 h-3" />
          <span>{isAnimating ? 'Running Lifecycle...' : 'Simulate Complete PR Lifecycle'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {[
          { id: 1, name: '1. Feature Branch', desc: 'Code committed on isolated branch', icon: GitBranch, color: '#58a6ff' },
          { id: 2, name: '2. Open PR', desc: 'Request comparison against main', icon: GitPullRequest, color: '#d29922' },
          { id: 3, name: '3. Code Review', desc: 'Teammates audit code & CI runs', icon: FileCode, color: '#bc8cff' },
          { id: 4, name: '4. Approved', desc: 'Peer approval & passing tests', icon: CheckCircle2, color: '#2ea043' },
          { id: 5, name: '5. Merged', desc: 'Branch sealed into main branch', icon: GitMerge, color: '#a371f7' }
        ].map((s) => {
          const isDone = activeStage >= s.id;
          const isCurrent = activeStage === s.id;
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className={`p-3 rounded-xl border text-xs space-y-1.5 transition-all duration-300 ${
                isCurrent
                  ? 'bg-[#161b22] border-[#58a6ff] shadow-lg shadow-[#58a6ff]/10 scale-102'
                  : isDone
                  ? 'bg-[#010409] border-[#2ea043]/50'
                  : 'bg-[#010409] border-[#30363d] opacity-40'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className="w-4 h-4" style={{ color: isDone ? s.color : '#7d8590' }} />
                {isDone ? (
                  <span className="text-[#2ea043] font-bold">✓</span>
                ) : (
                  <span className="text-[10px] text-[#7d8590]">pending</span>
                )}
              </div>
              <div className="font-bold text-white text-[11px]">{s.name}</div>
              <div className="text-[10px] text-[#7d8590] leading-snug">{s.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// 5. MERGE CONFLICT COLLISION & RESOLUTION ANIMATION
// ============================================================================
export const ConflictAnimation: React.FC = () => {
  const [conflictStep, setConflictStep] = useState<'collision' | 'resolving' | 'resolved'>('resolved');

  const simulateConflict = () => {
    setConflictStep('collision');
    sound.playWarning();
    setTimeout(() => {
      setConflictStep('resolving');
      sound.playKeypress();
    }, 1200);
    setTimeout(() => {
      setConflictStep('resolved');
      sound.playSuccess();
    }, 2400);
  };

  return (
    <div className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl p-4 sm:p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363d] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#d29922] shrink-0" />
          <span className="font-bold text-white">Merge Conflict: Collision &amp; Unified Resolution</span>
        </div>
        <button
          onClick={simulateConflict}
          className="px-3 py-1.5 rounded-lg bg-[#d29922] hover:bg-[#e3b341] text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Replay Conflict Simulation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stream Collision Visual */}
        <div className="p-4 rounded-xl bg-[#010409] border border-[#30363d] flex flex-col justify-between space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#58a6ff]">Alex's Change (main)</span>
            <span className="text-[#bc8cff]">Bea's Change (feature)</span>
          </div>

          <div className="flex items-center justify-center py-4 relative">
            {conflictStep === 'collision' ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="px-4 py-2 rounded-xl bg-[#f85149]/20 border border-[#f85149] text-[#f85149] font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#f85149]/20 text-center"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>COLLISION DETECTED AT LINE 12</span>
              </motion.div>
            ) : conflictStep === 'resolving' ? (
              <div className="px-4 py-2 rounded-xl bg-[#d29922]/20 border border-[#d29922] text-[#d29922] font-bold text-xs flex items-center gap-2 text-center">
                <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                <span>DEVELOPER RESOLVING CONFLICT...</span>
              </div>
            ) : (
              <div className="px-4 py-2 rounded-xl bg-[#2ea043]/20 border border-[#2ea043] text-[#2ea043] font-bold text-xs flex items-center gap-2 text-center">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>UNIFIED &amp; CLEANLY RESOLVED</span>
              </div>
            )}
          </div>

          <div className="text-[10px] text-[#7d8590] text-center">
            Both developers edited the same line of <code>App.tsx</code> before pulling.
          </div>
        </div>

        {/* Git Conflict Marker Display */}
        <div className="p-4 rounded-xl bg-[#010409] border border-[#30363d] font-mono text-xs space-y-1.5 overflow-x-auto">
          <div className="text-[#7d8590] text-[10px]">// Visual representation in file:</div>
          <div className="p-1 rounded bg-[#1f6feb]/10 text-[#58a6ff] break-words">
            &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Current Change - Alex)
          </div>
          <div className="text-white pl-3 font-semibold break-words">
            const TITLE = "Welcome to CampusConnect 2026";
          </div>
          <div className="p-1 rounded bg-[#30363d]/50 text-[#7d8590]">
            ======= (Divider)
          </div>
          <div className="text-white pl-3 font-semibold break-words">
            const TITLE = "CampusConnect: Student Portal";
          </div>
          <div className="p-1 rounded bg-[#8957e5]/10 text-[#bc8cff] break-words">
            &gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/banner (Incoming - Bea)
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. SECURITY SCANNER ANIMATION (Laser Sweeping Over Repo Files)
// ============================================================================
export const SecurityScanner: React.FC = () => {
  const [scanStatus, setScanStatus] = useState<'safe' | 'scanning' | 'blocked'>('safe');
  const [laserPos, setLaserPos] = useState(100);

  const startScan = () => {
    setScanStatus('scanning');
    setLaserPos(10);
    sound.playKeypress();

    setTimeout(() => { setLaserPos(50); sound.playWarning(); setScanStatus('blocked'); }, 900);
    setTimeout(() => {
      // Developer removes secret and re-scans
      setLaserPos(100);
      setScanStatus('safe');
      sound.playSuccess();
    }, 2200);
  };

  return (
    <div className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl p-4 sm:p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363d] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#2ea043] shrink-0" />
          <span className="font-bold text-white">GitHub Secret Scanning &amp; Dependabot Engine</span>
        </div>
        <button
          onClick={startScan}
          disabled={scanStatus === 'scanning'}
          className="px-3 py-1.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <RefreshCw className={`w-3 h-3 ${scanStatus === 'scanning' ? 'animate-spin' : ''}`} />
          <span>{scanStatus === 'scanning' ? 'Scanning...' : 'Trigger Push Protection Scan'}</span>
        </button>
      </div>

      <div className="relative p-4 rounded-xl bg-[#010409] border border-[#30363d] overflow-hidden space-y-2 font-mono text-xs">
        {/* Laser scanner line */}
        {scanStatus === 'scanning' && (
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-[#58a6ff] shadow-[0_0_12px_#58a6ff] z-10"
            style={{ top: `${laserPos}%` }}
            transition={{ duration: 0.4 }}
          />
        )}

        <div className="flex items-center justify-between text-[#7d8590] pb-2 border-b border-[#21262d]">
          <span>Repository File Checks</span>
          <span>Status</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-white">
          <span>src/App.tsx</span>
          <span className="text-[#2ea043] flex items-center gap-1 font-bold"><Check className="w-3 h-3" /> Clean</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-white">
          <span>package.json (Dependencies)</span>
          <span className="text-[#2ea043] flex items-center gap-1 font-bold"><Check className="w-3 h-3" /> 0 Vulnerabilities</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-white">
          <span>.env.production</span>
          {scanStatus === 'blocked' ? (
            <span className="text-[#f85149] font-bold flex items-center gap-1 animate-pulse">
              <AlertCircle className="w-3.5 h-3.5" /> BLOCKED: API_KEY=•••••••• (Secret Detected)
            </span>
          ) : (
            <span className="text-[#2ea043] flex items-center gap-1 font-bold"><Check className="w-3 h-3" /> Protected &amp; Ignored (.gitignore)</span>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 7. API DATA FLOW ANIMATION (Client -> Gateway -> GitHub -> Response)
// ============================================================================
export const ApiDataFlow: React.FC = () => {
  const [apiStep, setApiStep] = useState<'idle' | 'request' | 'processing' | 'response'>('response');

  const triggerApi = () => {
    setApiStep('request');
    sound.playKeypress();
    setTimeout(() => { setApiStep('processing'); sound.playKeypress(); }, 600);
    setTimeout(() => { setApiStep('response'); sound.playSuccess(); }, 1400);
  };

  return (
    <div className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl p-4 sm:p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363d] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-[#58a6ff] shrink-0" />
          <span className="font-bold text-white">GitHub REST &amp; GraphQL API Gateway</span>
        </div>
        <button
          onClick={triggerApi}
          className="px-3 py-1.5 rounded-lg bg-[#1f6feb] hover:bg-[#388bfd] text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Play className="w-3 h-3" />
          <span>Execute GET /repos/campusconnect/web</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center text-center">
        <div className="p-3 rounded-xl bg-[#010409] border border-[#30363d] space-y-1">
          <Laptop className="w-6 h-6 text-[#58a6ff] mx-auto" />
          <div className="text-xs font-bold text-white">Client App</div>
          <div className="text-[10px] text-[#7d8590]">CampusConnect Portal</div>
        </div>

        <div className="p-3 rounded-xl bg-[#010409] border border-[#30363d] space-y-1">
          <ArrowRight className={`w-6 h-6 mx-auto ${apiStep === 'request' ? 'text-[#58a6ff] animate-pulse' : 'text-[#7d8590]'}`} />
          <div className="text-xs font-bold text-white">HTTP Request</div>
          <div className="text-[10px] text-[#7d8590] font-mono">Authorization: Bearer</div>
        </div>

        <div className="p-3 rounded-xl bg-[#010409] border border-[#2ea043] space-y-1 shadow-sm">
          <Cloud className="w-6 h-6 text-[#2ea043] mx-auto" />
          <div className="text-xs font-bold text-[#2ea043]">api.github.com</div>
          <div className="text-[10px] text-[#c9d1d9] font-mono">Rate limit: 5000/hr</div>
        </div>

        <div className="p-3 rounded-xl bg-[#010409] border border-[#30363d] space-y-1">
          <ArrowRight className={`w-6 h-6 mx-auto rotate-180 ${apiStep === 'response' ? 'text-[#2ea043]' : 'text-[#7d8590]'}`} />
          <div className="text-xs font-bold text-white">JSON 200 OK</div>
          <div className="text-[10px] text-[#2ea043] font-mono">Payload: 2.4 kB (48ms)</div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 8. CAMPUSCONNECT MASTER COMPLETE JOURNEY (Slide 39 Continuous Technical Story)
// ============================================================================
export const CampusConnectMasterJourney: React.FC = () => {
  const [activeMilestone, setActiveMilestone] = useState(5);
  const [isTouring, setIsTouring] = useState(false);

  const milestones = [
    { id: 1, title: "Repo & README", desc: "Central cloud home created with clear instructions", icon: FileCode, badge: "Slide 8-9" },
    { id: 2, title: "Clone to Laptop", desc: "Team downloads complete packfile history", icon: Laptop, badge: "Slide 17" },
    { id: 3, title: "Feature Branch", desc: "Isolated workspace created for login feature", icon: GitBranch, badge: "Slide 14-16" },
    { id: 4, title: "Add & Commit", desc: "Two-step safe snapshot sealed into vault", icon: CheckCircle2, badge: "Slide 11-12" },
    { id: 5, title: "Push to GitHub", desc: "Local commit packfiles streamed to cloud remote", icon: Cloud, badge: "Slide 18" },
    { id: 6, title: "Pull Request & Review", desc: "Peer code review & line-by-line discussion", icon: GitPullRequest, badge: "Slide 21-23" },
    { id: 7, title: "Conflict Resolution", desc: "Collaborators resolve collision gracefully", icon: AlertTriangle, badge: "Slide 25-26" },
    { id: 8, title: "Automated CI/CD", desc: "Actions robot tests, builds, and deploys", icon: Cpu, badge: "Slide 30-32" }
  ];

  const playEntireJourney = () => {
    setIsTouring(true);
    let step = 1;
    setActiveMilestone(1);
    sound.playClick();

    const interval = setInterval(() => {
      step++;
      if (step <= milestones.length) {
        setActiveMilestone(step);
        sound.playKeypress();
      } else {
        clearInterval(interval);
        setIsTouring(false);
        sound.playSuccess();
      }
    }, 1100);
  };

  return (
    <div className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl p-5 shadow-xl space-y-4 github-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#30363d]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#23863622] text-[#2ea043] border border-[#23863644]">
              FULL LIFECYCLE STORY
            </span>
            <h3 className="text-sm font-bold text-white">CampusConnect: Complete End-to-End Journey</h3>
          </div>
          <p className="text-xs text-[#7d8590]">From local code sandbox to team collaboration, automated tests, and live production</p>
        </div>

        <button
          onClick={playEntireJourney}
          disabled={isTouring}
          className="px-3.5 py-1.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer self-start sm:self-auto"
        >
          <Play className="w-3.5 h-3.5" />
          <span>{isTouring ? 'Touring Journey...' : 'Play Complete Technical Journey'}</span>
        </button>
      </div>

      {/* 8 Connected Milestone Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {milestones.map((m) => {
          const isDone = activeMilestone >= m.id;
          const isCurrent = activeMilestone === m.id;
          const Icon = m.icon;
          return (
            <motion.div
              key={m.id}
              onClick={() => { setActiveMilestone(m.id); sound.playClick(); }}
              className={`p-3.5 rounded-xl border text-xs space-y-2 cursor-pointer transition-all duration-300 ${
                isCurrent
                  ? 'bg-[#161b22] border-[#2ea043] shadow-lg shadow-[#2ea043]/15 scale-102 ring-1 ring-[#2ea043]'
                  : isDone
                  ? 'bg-[#010409] border-[#23863666]'
                  : 'bg-[#010409] border-[#30363d] opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#7d8590]">{m.badge}</span>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isDone ? 'bg-[#2ea043] text-white' : 'bg-[#21262d] text-[#7d8590]'
                }`}>
                  {m.id}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${isDone ? 'text-[#2ea043]' : 'text-[#7d8590]'}`} />
                <span className="font-bold text-white text-xs">{m.title}</span>
              </div>
              <p className="text-[11px] text-[#7d8590] leading-relaxed">{m.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
