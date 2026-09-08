import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, Sparkles, ArrowRight, GitCommit } from 'lucide-react';
import { sound } from '../utils/sound';

interface GitLogoIntroProps {
  onComplete: () => void;
}

interface CommitEntry {
  hash: string;
  type: string;
  message: string;
  isFinal?: boolean;
}

const FICTIONAL_COMMITS: CommitEntry[] = [
  { hash: 'a7f91c2', type: 'feat', message: 'prepare GitHub presentation' },
  { hash: 'c41e8d9', type: 'docs', message: 'add repository structure' },
  { hash: '8b72a11', type: 'feat', message: 'add collaboration workflow' },
  { hash: '5d92f40', type: 'refactor', message: 'improve slide design' },
  { hash: '2c3e7a1', type: 'chore', message: 'optimize presentation' },
  { hash: '1f9d3c8', type: 'docs', message: 'update README' },
  { hash: 'f7c2026', type: 'feat', message: 'GitHub — From Code to Collaboration', isFinal: true },
];

export const GitLogoIntro: React.FC<GitLogoIntroProps> = ({ onComplete }) => {
  // Phase management
  // 0: Dark atmosphere & initial spark (0 - 800ms)
  // 1: Git Logo materializes (800 - 2000ms)
  // 2: Terminal fades in & command typing (2000 - 3600ms)
  // 3: Commits stream in (3600 - 4800ms)
  // 4: Final commit highlighted (4800 - 5800ms)
  // 5: Transformation to collaboration (5800 - 6800ms)
  // 6: Complete & reveal Welcome (6800ms+)
  const [phase, setPhase] = useState<number>(0);
  const [typedCommand, setTypedCommand] = useState('');
  const [visibleCommitsCount, setVisibleCommitsCount] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Command to type
  const targetCommand = 'git log --oneline';

  // Handle skip action
  const handleSkip = () => {
    try {
      sound.playClick();
    } catch {
      // ignore
    }
    onComplete();
  };

  // Keyboard listener for skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Escape', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main timeline sequencer
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Phase 1: Logo forms
    timers.push(setTimeout(() => setPhase(1), 800));

    // Phase 2: Terminal appears
    timers.push(setTimeout(() => setPhase(2), 2000));

    // Type command character-by-character
    const startTypingTime = 2200;
    for (let i = 0; i <= targetCommand.length; i++) {
      timers.push(
        setTimeout(() => {
          setTypedCommand(targetCommand.slice(0, i));
        }, startTypingTime + i * 50)
      );
    }

    // Phase 3: Stream initial commits (commits 0 to 5)
    const commitsStartTime = startTypingTime + targetCommand.length * 50 + 300; // ~3350ms
    timers.push(setTimeout(() => setPhase(3), commitsStartTime));

    for (let c = 1; c <= 6; c++) {
      timers.push(
        setTimeout(() => {
          setVisibleCommitsCount(c);
        }, commitsStartTime + c * 180)
      );
    }

    // Phase 4: Final commit with special highlight
    const finalCommitTime = commitsStartTime + 6 * 180 + 350; // ~4800ms
    timers.push(
      setTimeout(() => {
        setPhase(4);
        setVisibleCommitsCount(7);
      }, finalCommitTime)
    );

    // Phase 5: Transformation to collaboration
    const transformTime = finalCommitTime + 1100; // ~5900ms
    timers.push(setTimeout(() => setPhase(5), transformTime));

    // Phase 6: Auto complete & transition to Welcome slide
    const completeTime = transformTime + 1100; // ~7000ms
    timers.push(
      setTimeout(() => {
        onComplete();
      }, completeTime)
    );

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [onComplete]);

  // Subtle background particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    const count = 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Color depends on phase: transitions from orange to cyan/green in phase 5
      const isTransformed = phase >= 5;
      const baseR = isTransformed ? 46 : 240;
      const baseG = isTransformed ? 160 : 80;
      const baseB = isTransformed ? 67 : 50;

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles in later phases
        if (phase >= 4) {
          for (let j = i + 1; j < count; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${
                (1 - dist / 90) * 0.15
              })`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [phase]);

  return (
    <div 
      onClick={handleSkip}
      className="fixed inset-0 z-50 bg-[#06090e] flex flex-col items-center justify-center overflow-hidden font-mono select-none cursor-pointer"
      title="Click anywhere to skip intro"
    >
      {/* Background canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none opacity-70" 
      />

      {/* Subtle Developer Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial ambient spotlight */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          phase >= 5
            ? 'bg-[radial-gradient(circle_at_center,rgba(46,160,67,0.12)_0%,transparent_70%)]'
            : 'bg-[radial-gradient(circle_at_center,rgba(240,80,50,0.14)_0%,transparent_70%)]'
        }`}
      />

      {/* Top Subtle Status Tag */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] text-[#7d8590] tracking-widest uppercase pointer-events-none">
        <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${
          phase >= 5 ? 'bg-[#2ea043] shadow-[0_0_8px_#2ea043]' : 'bg-[#F05032] shadow-[0_0_8px_#F05032]'
        }`} />
        <span>{phase >= 5 ? 'Ecosystem Connected' : 'Git Repository Initialized'}</span>
      </div>

      {/* Center Stage Container */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative z-10 w-full max-w-2xl px-4 sm:px-6 flex flex-col items-center"
      >
        {/* ============================================================ */}
        {/* SCENE 2 & 5: GIT LOGO PRESENTATION                           */}
        {/* ============================================================ */}
        <div className="relative mb-6 flex flex-col items-center">
          {/* Subtle glowing halo behind logo */}
          <div 
            className={`absolute -inset-6 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
              phase === 0
                ? 'opacity-0 scale-50'
                : phase >= 5
                  ? 'bg-gradient-to-r from-[#2ea043]/30 via-[#58a6ff]/30 to-[#2ea043]/30 opacity-80 scale-125'
                  : 'bg-[#F05032]/25 opacity-70 scale-100'
            }`}
          />

          {/* Authentic Git Diamond Vector Logo */}
          <div 
            className={`transition-all duration-700 transform ${
              phase === 0
                ? 'opacity-0 scale-50'
                : phase === 1
                  ? 'opacity-100 scale-100 drop-shadow-[0_0_25px_rgba(240,80,50,0.5)]'
                  : phase >= 5
                    ? 'scale-110 drop-shadow-[0_0_35px_rgba(46,160,67,0.6)]'
                    : 'opacity-90 scale-90'
            }`}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative flex items-center justify-center">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="git-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F34F29" />
                    <stop offset="100%" stopColor="#D63A17" />
                  </linearGradient>
                  <linearGradient id="github-collab-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2ea043" />
                    <stop offset="100%" stopColor="#58a6ff" />
                  </linearGradient>
                </defs>

                {/* Git Diamond (Rotated Square) */}
                <rect 
                  x="20" 
                  y="20" 
                  width="60" 
                  height="60" 
                  rx="10" 
                  transform="rotate(45 50 50)" 
                  fill={phase >= 5 ? "url(#github-collab-grad)" : "url(#git-orange-grad)"} 
                  className="transition-all duration-700"
                />

                {/* Git Branch Lines & Commit Circles */}
                <g 
                  stroke="#ffffff" 
                  strokeWidth="4.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  {/* Vertical stem */}
                  <line x1="38" y1="36" x2="38" y2="64" />
                  {/* Branch curve */}
                  <path d="M38 52 C 43 45, 57 45, 62 38" fill="none" />
                </g>

                {/* Commit Nodes */}
                <circle cx="38" cy="36" r="4.5" fill="#ffffff" />
                <circle cx="38" cy="64" r="4.5" fill="#ffffff" />
                <circle cx="62" cy="38" r="4.5" fill="#ffffff" />
              </svg>
            </div>
          </div>

          {/* Subtitle / Transition label beneath logo */}
          <div className="mt-2 text-center h-6">
            <span className={`text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors duration-500 ${
              phase >= 5 ? 'text-[#2ea043]' : 'text-[#F05032]'
            }`}>
              {phase === 0 ? 'Loading...' : phase >= 5 ? 'GitHub • Cloud Collaboration' : 'Git • Distributed Version Control'}
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCENE 3 & 4: SLEEK TERMINAL WINDOW                           */}
        {/* ============================================================ */}
        <div 
          className={`w-full bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ${
            phase >= 2 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6 pointer-events-none'
          } ${phase >= 5 ? 'border-[#2ea043]/50 shadow-[0_0_30px_rgba(46,160,67,0.2)]' : ''}`}
        >
          {/* Terminal Titlebar */}
          <div className="bg-[#161b22] px-3.5 py-2 border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#f85149]/80" />
              <div className="w-3 h-3 rounded-full bg-[#e3b341]/80" />
              <div className="w-3 h-3 rounded-full bg-[#2ea043]/80" />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#7d8590]">
              <TerminalIcon className="w-3 h-3 text-[#58a6ff]" />
              <span>~/workspace/github-presentation (main)</span>
            </div>
            <div className="w-10" />
          </div>

          {/* Terminal Body */}
          <div className="p-3 sm:p-4 text-xs sm:text-sm space-y-2 bg-[#0d1117]/95 min-h-[190px]">
            {/* Command Prompt Line */}
            <div className="flex items-center gap-2 text-white">
              <span className="text-[#2ea043] font-bold">$</span>
              <span className="text-[#58a6ff]">{typedCommand}</span>
              {phase <= 2 && (
                <span className="w-2 h-4 bg-[#58a6ff] animate-pulse inline-block" />
              )}
            </div>

            {/* Commits stream */}
            <div className="space-y-1.5 pt-1">
              {FICTIONAL_COMMITS.slice(0, visibleCommitsCount).map((commit, idx) => {
                const isHighlightedFinal = commit.isFinal;
                return (
                  <div
                    key={commit.hash}
                    className={`flex items-baseline gap-2 sm:gap-3 font-mono transition-all duration-300 ${
                      isHighlightedFinal
                        ? 'p-2 rounded-lg bg-[#23863622] border border-[#2ea043] text-white shadow-[0_0_15px_rgba(46,160,67,0.3)] animate-fadeIn'
                        : 'text-[#8b949e] animate-fadeIn'
                    }`}
                  >
                    <span 
                      className={`text-[11px] shrink-0 font-bold ${
                        isHighlightedFinal ? 'text-[#58a6ff]' : 'text-[#e3b341]'
                      }`}
                    >
                      {commit.hash}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#7d8590] shrink-0">
                      {commit.type}:
                    </span>
                    <span 
                      className={`break-words ${
                        isHighlightedFinal 
                          ? 'text-[#56d364] font-bold text-xs sm:text-sm' 
                          : 'text-[#c9d1d9]'
                      }`}
                    >
                      {commit.message}
                    </span>
                    {isHighlightedFinal && (
                      <span className="ml-auto hidden sm:inline-block text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#2ea043] text-black font-bold tracking-wider shrink-0">
                        Ready
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Phase 5 Transformation Indicator */}
        {phase >= 5 && (
          <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm text-[#58a6ff] animate-pulse">
            <span>LOCAL GIT</span>
            <ArrowRight className="w-4 h-4 text-[#2ea043]" />
            <span className="text-[#2ea043] font-bold">GITHUB COLLABORATION</span>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* SKIP INTRO BUTTON (Bottom-Right)                             */}
      {/* ============================================================ */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        type="button"
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161b22]/90 hover:bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff] text-xs text-[#c9d1d9] hover:text-white transition-all duration-200 backdrop-blur-md shadow-lg cursor-pointer group active:scale-95"
        title="Skip to Slide 1 (Escape, Space, or Enter)"
      >
        <span>Skip Intro</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#58a6ff] group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Subtle Hint on Bottom-Left */}
      <div className="absolute bottom-6 left-6 text-[10px] text-[#484f58] hidden sm:block">
        Press <kbd className="px-1 py-0.5 rounded bg-[#161b22] text-[#8b949e] border border-[#30363d]">ESC</kbd> or <kbd className="px-1 py-0.5 rounded bg-[#161b22] text-[#8b949e] border border-[#30363d]">SPACE</kbd> to skip
      </div>
    </div>
  );
};
