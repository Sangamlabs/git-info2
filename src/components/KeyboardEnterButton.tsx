import React, { useState, useEffect } from 'react';
import { CornerDownLeft, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface KeyboardEnterButtonProps {
  onPress: () => void;
  disabled?: boolean;
  label?: string;
  sublabel?: string;
  isPressed?: boolean;
  accentColor?: 'orange' | 'green' | 'cyan';
}

export const KeyboardEnterButton: React.FC<KeyboardEnterButtonProps> = ({
  onPress,
  disabled = false,
  label = "ENTER",
  sublabel = "PRESS TO LAUNCH",
  isPressed = false,
  accentColor = 'orange'
}) => {
  const [internalPressed, setInternalPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const activePressed = isPressed || internalPressed;

  // Listen to physical keyboard Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !disabled) {
        setInternalPressed(true);
        sound.playKeypress();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !disabled) {
        setInternalPressed(false);
        onPress();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [disabled, onPress]);

  const handleMouseDown = () => {
    if (disabled) return;
    setInternalPressed(true);
    sound.playKeypress();
  };

  const handleMouseUp = () => {
    if (disabled) return;
    setInternalPressed(false);
    onPress();
  };

  const accentGlow = accentColor === 'orange' 
    ? 'rgba(249, 115, 22, 0.45)' 
    : accentColor === 'green' 
    ? 'rgba(46, 160, 67, 0.45)' 
    : 'rgba(56, 189, 248, 0.45)';

  const accentBorder = accentColor === 'orange'
    ? 'border-[#ea580c]'
    : accentColor === 'green'
    ? 'border-[#2ea043]'
    : 'border-[#38bdf8]';

  const accentText = accentColor === 'orange'
    ? 'text-[#fb923c]'
    : accentColor === 'green'
    ? 'text-[#3fb950]'
    : 'text-[#38bdf8]';

  return (
    <div className="flex flex-col items-center select-none group">
      {/* Outer Keycap Housing Base */}
      <div 
        className={`relative p-1.5 rounded-2xl bg-gradient-to-b from-[#1c2128] via-[#161b22] to-[#090d12] border-2 border-[#30363d] shadow-2xl transition-all duration-150 ${
          isHovered ? 'border-[#6e7681]' : ''
        }`}
        style={{
          boxShadow: isHovered 
            ? `0 12px 32px -4px ${accentGlow}, 0 4px 12px rgba(0,0,0,0.8)` 
            : '0 10px 24px -6px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.1)'
        }}
      >
        {/* Switch Stem Backlight Glow */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-40 blur-md pointer-events-none transition-opacity duration-200"
          style={{
            backgroundColor: accentGlow,
            opacity: isHovered || activePressed ? 0.75 : 0.2
          }}
        />

        {/* 3D Physical Keycap Top */}
        <button
          type="button"
          disabled={disabled}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setInternalPressed(false); }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className={`relative z-10 w-44 sm:w-56 h-16 sm:h-20 rounded-xl flex flex-col items-center justify-center transition-all duration-75 cursor-pointer outline-none ${
            activePressed 
              ? 'translate-y-2 bg-[#0d1117] shadow-inner border border-[#21262d]' 
              : 'translate-y-0 bg-gradient-to-b from-[#21262d] via-[#161b22] to-[#0d1117] border-t border-l border-white/20 border-r border-b border-black/80 shadow-[0_6px_0_#010409,0_8px_12px_rgba(0,0,0,0.7)]'
          }`}
        >
          {/* Subtle Keycap Concave Dish Highlight */}
          <div className="absolute inset-x-2 top-1 h-3 rounded-t-lg bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {/* Key Legend / Label */}
          <div className="flex items-center gap-2.5">
            <span className={`font-mono text-base sm:text-xl font-black tracking-widest transition-colors ${
              isHovered || activePressed ? accentText : 'text-white'
            }`}>
              {label}
            </span>
            <CornerDownLeft className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${
              activePressed ? 'scale-90' : 'group-hover:translate-x-0.5'
            } ${isHovered || activePressed ? accentText : 'text-[#7d8590]'}`} />
          </div>

          {/* Sublabel legend */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#7d8590] font-semibold">
              {sublabel}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ea043] animate-pulse" />
          </div>
        </button>
      </div>

      {/* Keyboard Shortcut Hint Below Key */}
      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#7d8590] font-mono">
        <span>Click keycap or press</span>
        <kbd className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-white font-mono text-[10px] font-bold shadow-sm">
          Return ↵
        </kbd>
      </div>
    </div>
  );
};
