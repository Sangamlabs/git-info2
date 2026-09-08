import React from 'react';
import { MemoryTrick } from '../types';
import { Bookmark, Sparkles } from 'lucide-react';

interface MemoryTrickBannerProps {
  trick: MemoryTrick;
}

export const MemoryTrickBanner: React.FC<MemoryTrickBannerProps> = ({ trick }) => {
  return (
    <div className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-3.5 sm:px-5 py-3 flex items-center justify-between gap-3 sm:gap-4 shadow-sm min-w-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2 rounded-lg bg-[#23863622] text-[#2ea043] border border-[#23863644] shrink-0">
          <Bookmark className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#7d8590] font-semibold truncate">
            Universal Memory Trick
          </div>
          <div className="text-xs sm:text-base font-bold text-white flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5">
            <span className="font-mono text-[#58a6ff] break-words">{trick.term}</span>
            <span className="text-[#7d8590]">=</span>
            <span className="text-[#2ea043] break-words">{trick.analogy}</span>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#2ea043] bg-[#23863622] border border-[#23863644] px-3 py-1.5 rounded-md font-medium">
        <Sparkles className="w-3.5 h-3.5" />
        <span className="text-[11px] tracking-wide">Permanent Mental Anchor</span>
      </div>
    </div>
  );
};
