import React from 'react';
import { LearningPattern } from '../types';
import { Terminal, Lightbulb, Compass, Eye, Laptop, CheckCircle2 } from 'lucide-react';

interface LearningPatternCardProps {
  pattern: LearningPattern;
}

export const LearningPatternCard: React.FC<LearningPatternCardProps> = ({ pattern }) => {
  return (
    <div className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl p-4 sm:p-5 shadow-xl github-glow">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#30363d] mb-4">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#7d8590] font-semibold flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#2ea043]" />
          Structured Pedagogical Model
        </span>
        <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#23863622] text-[#2ea043] border border-[#23863644] font-medium font-mono">
          6-Step Concept Mastery
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* 1. Technical Term */}
        <div className="bg-[#010409] border border-[#30363d] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-[#58a6ff] mb-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>1. TECHNICAL TERM</span>
          </div>
          <div className="text-sm font-bold text-white font-mono break-words">
            {pattern.technicalTerm}
          </div>
        </div>

        {/* 2. Simple Meaning */}
        <div className="bg-[#010409] border border-[#30363d] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-[#2ea043] mb-1.5">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>2. SIMPLE MEANING</span>
          </div>
          <div className="text-sm text-[#c9d1d9] leading-relaxed">
            {pattern.simpleMeaning}
          </div>
        </div>

        {/* 3. Analogy */}
        <div className="bg-[#010409] border border-[#30363d] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-[#d29922] mb-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>3. ANALOGY</span>
          </div>
          <div className="text-sm text-white font-medium leading-relaxed">
            ✨ {pattern.analogy}
          </div>
        </div>

        {/* 4. Visual */}
        <div className="bg-[#010409] border border-[#30363d] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-[#bc8cff] mb-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>4. VISUAL MODEL</span>
          </div>
          <div className="text-xs text-[#7d8590] leading-relaxed">
            {pattern.visualDescription}
          </div>
        </div>

        {/* 5. Real Example */}
        <div className="bg-[#010409] border border-[#30363d] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-[#58a6ff] mb-1.5">
            <Laptop className="w-3.5 h-3.5" />
            <span>5. REAL EXAMPLE (CampusConnect)</span>
          </div>
          <div className="text-xs text-[#c9d1d9] leading-relaxed">
            {pattern.realExample}
          </div>
        </div>

        {/* 6. Key Takeaway */}
        <div className="bg-[#23863622] border border-[#23863644] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-[#2ea043] mb-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>6. KEY TAKEAWAY</span>
          </div>
          <div className="text-sm font-bold text-[#2ea043] leading-snug">
            {pattern.keyTakeaway}
          </div>
        </div>
      </div>
    </div>
  );
};
