import React from 'react';
import { SpeakerNote } from '../types';
import { MessageSquare, Mic, HelpCircle, ArrowRight, Lightbulb, Server, X } from 'lucide-react';
import { sound } from '../utils/sound';

interface SpeakerNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: SpeakerNote;
  slideNumber: string;
  slideTitle: string;
}

export const SpeakerNotesModal: React.FC<SpeakerNotesModalProps> = ({
  isOpen,
  onClose,
  notes,
  slideNumber,
  slideTitle
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[460px] bg-[#0d1117] border-l border-[#30363d] shadow-2xl z-50 flex flex-col transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#30363d] flex items-center justify-between bg-[#010409]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-[#23863622] text-[#2ea043] border border-[#23863644]">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#7d8590] font-semibold">Presenter Teleprompter</div>
            <div className="text-sm font-bold text-white truncate max-w-[280px]">
              Slide {slideNumber}: {slideTitle}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-[#7d8590] hover:text-white hover:bg-[#21262d] active:scale-95 transition-all cursor-pointer"
          title="Close notes (N)"
          aria-label="Close notes"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content scrollable */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 text-sm bg-[#010409]">
        {/* 1. What to Say */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#58a6ff] mb-2 uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>1. What to Say (Opening Hook)</span>
          </div>
          <p className="text-white leading-relaxed font-normal">
            "{notes.whatToSay}"
          </p>
        </div>

        {/* 2. Simple Explanation */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2ea043] mb-2 uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>2. Simple Explanation (Student Analogy)</span>
          </div>
          <p className="text-[#c9d1d9] leading-relaxed">
            {notes.simpleExplanation}
          </p>
        </div>

        {/* 3. Real-World Example */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#d29922] mb-2 uppercase tracking-wider">
            <Server className="w-3.5 h-3.5" />
            <span>3. Real-World Case (CampusConnect)</span>
          </div>
          <p className="text-[#c9d1d9] leading-relaxed">
            {notes.realWorldExample}
          </p>
        </div>

        {/* 4. Technical Detail */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#bc8cff] mb-2 uppercase tracking-wider">
            <Server className="w-3.5 h-3.5" />
            <span>4. Under the Hood (Technical Spec)</span>
          </div>
          <p className="text-xs text-[#7d8590] font-mono leading-relaxed bg-[#010409] p-2.5 rounded border border-[#30363d]">
            {notes.technicalDetail}
          </p>
        </div>

        {/* 5. Question to Ask Students */}
        <div className="bg-[#58a6ff]/10 border border-[#58a6ff]/30 rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#58a6ff] mb-2 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>5. Question to Ask Students</span>
          </div>
          <p className="text-sm font-semibold text-white italic">
            "{notes.questionForStudents}"
          </p>
        </div>

        {/* 6. Transition */}
        <div className="bg-[#23863622] border border-[#23863644] rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2ea043] mb-2 uppercase tracking-wider">
            <ArrowRight className="w-3.5 h-3.5" />
            <span>6. Verbal Transition to Next Slide</span>
          </div>
          <p className="text-xs text-[#c9d1d9] italic">
            "{notes.transition}"
          </p>
        </div>
      </div>

      {/* Footer shortcut tip */}
      <div className="px-5 py-2.5 bg-[#010409] border-t border-[#30363d] text-xs text-[#7d8590] flex items-center justify-between">
        <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] border border-[#30363d] font-mono text-[10px]">N</kbd> to toggle notes</span>
        <span className="text-[#2ea043] font-medium font-mono text-[11px]">Evaluation Ready</span>
      </div>
    </div>
  );
};
