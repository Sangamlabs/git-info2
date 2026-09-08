import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Activity, CheckCircle2, Cpu, RefreshCw, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

export interface JarvisLine {
  text: string;
  status?: 'OK' | 'WAIT' | 'FAIL' | 'READY' | 'INFO';
  color?: string;
  delayMs?: number;
}

interface JarvisTerminalProps {
  lines?: JarvisLine[];
  systemTitle?: string;
  subTitle?: string;
  systemId?: string;
  showProgressBar?: boolean;
  progressPercent?: number;
  onComplete?: () => void;
  accentTheme?: 'orange' | 'green' | 'cyan';
  autoStart?: boolean;
  typingSpeed?: number;
  className?: string;
}

export const JarvisTerminal: React.FC<JarvisTerminalProps> = ({
  lines = [
    { text: "initializing profile interface...", status: "OK" },
    { text: "locating developer profile...", status: "OK" },
    { text: "establishing GitHub connection...", status: "OK" },
    { text: "target: github.com/Sangamlabs", status: "INFO" },
    { text: "loading public profile data...", status: "OK" },
    { text: "SYSTEM READY_", status: "READY" },
  ],
  systemTitle = "J.A.R.V.I.S // OS-CORE",
  subTitle = "DEVELOPER INTERFACE SUBSYSTEM",
  systemId = "SYS_ID: 8492-AX",
  showProgressBar = true,
  progressPercent = 100,
  onComplete,
  accentTheme = 'orange',
  autoStart = true,
  typingSpeed = 30,
  className = ""
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<JarvisLine[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Accent styling mappings
  const themeStyles = {
    orange: {
      border: 'border-[#ea580c]/50',
      glow: 'shadow-[0_0_30px_-5px_rgba(234,88,12,0.25)]',
      accentText: 'text-[#ea580c]',
      headerBadge: 'bg-[#ea580c]/15 text-[#fb923c] border-[#ea580c]/40',
      progressFill: 'bg-gradient-to-r from-[#ea580c] to-[#f97316]',
      bracket: 'text-[#ea580c]',
      statusReady: 'text-[#fb923c] font-black'
    },
    green: {
      border: 'border-[#2ea043]/50',
      glow: 'shadow-[0_0_30px_-5px_rgba(46,160,67,0.25)]',
      accentText: 'text-[#2ea043]',
      headerBadge: 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/40',
      progressFill: 'bg-gradient-to-r from-[#238636] to-[#2ea043]',
      bracket: 'text-[#2ea043]',
      statusReady: 'text-[#3fb950] font-black'
    },
    cyan: {
      border: 'border-[#38bdf8]/50',
      glow: 'shadow-[0_0_30px_-5px_rgba(56,189,248,0.25)]',
      accentText: 'text-[#38bdf8]',
      headerBadge: 'bg-[#38bdf8]/15 text-[#7dd3fc] border-[#38bdf8]/40',
      progressFill: 'bg-gradient-to-r from-[#0284c7] to-[#38bdf8]',
      bracket: 'text-[#38bdf8]',
      statusReady: 'text-[#38bdf8] font-black'
    }
  }[accentTheme];

  // Auto typing state engine
  useEffect(() => {
    if (!autoStart) return;

    if (currentLineIndex >= lines.length) {
      setIsFinished(true);
      setCurrentProgress(100);
      if (onComplete) onComplete();
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex < currentLine.text.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
        sound.playKeypress();
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      // Completed current line typing, pause slightly then push to completed
      const pauseTimer = setTimeout(() => {
        setCompletedLines(prev => [...prev, currentLine]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        setCurrentProgress(Math.round(((currentLineIndex + 1) / lines.length) * 100));
        
        // Auto-scroll
        if (terminalBodyRef.current) {
          terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
      }, 160);
      return () => clearTimeout(pauseTimer);
    }
  }, [currentLineIndex, currentCharIndex, lines, autoStart, typingSpeed, onComplete]);

  const activeTypingText = lines[currentLineIndex] 
    ? lines[currentLineIndex].text.slice(0, currentCharIndex) 
    : '';

  return (
    <div className={`relative w-full rounded-2xl bg-[#030712]/95 backdrop-blur-xl border ${themeStyles.border} ${themeStyles.glow} overflow-hidden font-mono shadow-2xl transition-all duration-300 ${className}`}>
      {/* Corner Technical Crosshairs / HUD Brackets */}
      <div className={`absolute top-2 left-2 text-[10px] font-mono select-none ${themeStyles.bracket}`}>┌ [+]</div>
      <div className={`absolute top-2 right-2 text-[10px] font-mono select-none ${themeStyles.bracket}`}>[+] ┐</div>
      <div className={`absolute bottom-2 left-2 text-[10px] font-mono select-none ${themeStyles.bracket}`}>└ [-]</div>
      <div className={`absolute bottom-2 right-2 text-[10px] font-mono select-none ${themeStyles.bracket}`}>[-] ┘</div>

      {/* Terminal HUD Header Bar */}
      <div className="bg-[#090d16] border-b border-[#1f293d] px-4 py-3 flex flex-wrap items-center justify-between gap-2 select-none relative z-10">
        <div className="flex items-center gap-3">
          {/* Traffic light LEDs */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] shadow-sm shadow-[#ef4444]/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-sm shadow-[#f59e0b]/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-sm shadow-[#10b981]/50 animate-pulse" />
          </div>

          <div className="flex items-center gap-2 pl-2">
            <Terminal className={`w-4 h-4 ${themeStyles.accentText}`} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white tracking-wider">{systemTitle}</span>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${themeStyles.headerBadge}`}>
                  {systemId}
                </span>
              </div>
              <span className="text-[10px] text-[#9ca3af] hidden sm:block tracking-tight font-medium">
                {subTitle}
              </span>
            </div>
          </div>
        </div>

        {/* System telemetry pills */}
        <div className="flex items-center gap-2 text-[10px]">
          <div className="flex items-center gap-1 bg-[#111827] px-2 py-1 rounded border border-[#1f293d] text-[#9ca3af]">
            <Activity className="w-3 h-3 text-[#10b981] animate-pulse" />
            <span className="hidden sm:inline">LINK:</span>
            <span className="text-white font-bold">SECURE_SSL</span>
          </div>

          <div className="flex items-center gap-1 bg-[#111827] px-2 py-1 rounded border border-[#1f293d] text-[#9ca3af]">
            <Cpu className="w-3 h-3 text-[#f97316]" />
            <span className="text-white font-bold">{isFinished ? 'IDLE' : 'SYNCING'}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Indicator */}
      {showProgressBar && (
        <div className="w-full bg-[#0a0f1d] h-1 relative overflow-hidden border-b border-[#1f293d]">
          <div 
            className={`h-full transition-all duration-200 ${themeStyles.progressFill}`}
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      )}

      {/* Terminal Screen Canvas with scanline overlay */}
      <div 
        ref={terminalBodyRef}
        className="p-3 sm:p-5 min-h-[200px] sm:min-h-[220px] max-h-[340px] overflow-y-auto overflow-x-auto space-y-2 text-xs sm:text-sm text-[#e5e7eb] relative select-text"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 24, 38, 0.4) 1px, transparent 1px)',
          backgroundSize: '100% 4px'
        }}
      >
        {/* Completed Lines */}
        {completedLines.map((line, idx) => {
          const isOk = line.status === 'OK';
          const isReady = line.status === 'READY';
          const isInfo = line.status === 'INFO';

          return (
            <div key={idx} className="flex flex-wrap items-center justify-between gap-2 leading-relaxed">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`${themeStyles.accentText} font-bold select-none`}>&gt;</span>
                <span className={isReady ? themeStyles.statusReady : 'text-[#f3f4f6] font-medium'}>
                  {line.text}
                </span>
              </div>

              {line.status && (
                <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded border select-none shrink-0 ${
                  isOk ? 'bg-[#064e3b]/40 text-[#34d399] border-[#059669]/60' :
                  isReady ? 'bg-[#ea580c]/30 text-[#fb923c] border-[#ea580c]/70 animate-pulse' :
                  isInfo ? 'bg-[#1e293b] text-[#93c5fd] border-[#3b82f6]/40' :
                  'bg-[#7f1d1d]/40 text-[#f87171] border-[#ef4444]/60'
                }`}>
                  [{line.status}]
                </span>
              )}
            </div>
          );
        })}

        {/* Current Actively Typing Line */}
        {!isFinished && currentLineIndex < lines.length && (
          <div className="flex items-center gap-2 leading-relaxed flex-wrap">
            <span className={`${themeStyles.accentText} font-bold select-none`}>&gt;</span>
            <span className="text-[#f3f4f6] font-medium tracking-wide">
              {activeTypingText}
            </span>
            <span className={`inline-block w-2.5 h-4 ${accentTheme === 'orange' ? 'bg-[#ea580c]' : accentTheme === 'green' ? 'bg-[#2ea043]' : 'bg-[#38bdf8]'} animate-pulse`} />
          </div>
        )}

        {/* Blinking Idle Prompt when finished */}
        {isFinished && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1f293d]/50 text-xs">
            <span className={`${themeStyles.accentText} font-bold select-none`}>&gt;</span>
            <span className="text-[#9ca3af]">AWAITING OPERATOR INPUT: PRESS KEYBOARD ENTER TO PROCEED</span>
            <span className={`inline-block w-2.5 h-3.5 ${accentTheme === 'orange' ? 'bg-[#ea580c]' : 'bg-[#2ea043]'} animate-pulse`} />
          </div>
        )}
      </div>

      {/* Terminal Footer Telemetry */}
      <div className="bg-[#090d16] border-t border-[#1f293d] px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#6b7280] select-none">
        <div className="flex items-center gap-3">
          <span>STATUS: <strong className="text-white">{isFinished ? 'NOMINAL / READY' : 'PROCESSING'}</strong></span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">BUFFER: <strong className="text-white">64KB OK</strong></span>
        </div>
        <div className="font-mono text-[9px] uppercase tracking-widest text-[#9ca3af]">
          Sangamlabs // Profile Gateway
        </div>
      </div>
    </div>
  );
};
