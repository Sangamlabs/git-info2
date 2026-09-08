import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, X, ArrowRight, ArrowLeft, Maximize, Play, BookOpen, User, HelpCircle, CornerDownLeft, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  description: string;
  category: 'navigation' | 'tools' | 'interactive';
}

const SHORTCUTS: ShortcutItem[] = [
  // Navigation
  { keys: ['→', 'Space', 'PgDn'], description: 'Advance to next slide', category: 'navigation' },
  { keys: ['←', 'PgUp'], description: 'Return to previous slide', category: 'navigation' },
  { keys: ['Home'], description: 'Jump to Slide 1 (Welcome)', category: 'navigation' },
  { keys: ['End'], description: 'Jump to Slide 17 (Thank You)', category: 'navigation' },

  // Tools & Views
  { keys: ['G'], description: 'Open Slide Gallery / Table of Contents', category: 'tools' },
  { keys: ['N'], description: 'Toggle Presenter Speaker Notes', category: 'tools' },
  { keys: ['F'], description: 'Toggle Fullscreen presentation mode', category: 'tools' },
  { keys: ['A'], description: 'Toggle Autoplay presentation (5s)', category: 'tools' },

  // Interactive
  { keys: ['?'], description: 'Toggle this Keyboard Shortcuts guide', category: 'interactive' },
  { keys: ['P'], description: 'Launch Interactive Profile Tour', category: 'interactive' },
  { keys: ['Esc'], description: 'Close any active modal or clear spotlights', category: 'interactive' },
];

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Listen for Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        try {
          sound.playClick();
        } catch {
          // ignore
        }
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navShortcuts = SHORTCUTS.filter(s => s.category === 'navigation');
  const toolShortcuts = SHORTCUTS.filter(s => s.category === 'tools');
  const interactiveShortcuts = SHORTCUTS.filter(s => s.category === 'interactive');

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-modal-title"
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              try {
                sound.playClick();
              } catch {
                // ignore
              }
              onClose();
            }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#0d1117] border border-[#30363d] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#30363d] flex items-center justify-between bg-[#161b22]/90">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#23863622] text-[#2ea043] border border-[#23863644] flex items-center justify-center">
                  <Keyboard className="w-4 h-4" />
                </div>
                <div>
                  <h2 id="shortcuts-modal-title" className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Keyboard Navigation Controls</span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#21262d] text-[#7d8590] border border-[#30363d]">
                      Quick Guide
                    </span>
                  </h2>
                  <p className="text-xs text-[#7d8590]">Master the presentation using quick hotkeys</p>
                </div>
              </div>

              <button
                onClick={() => {
                  try {
                    sound.playClick();
                  } catch {
                    // ignore
                  }
                  onClose();
                }}
                className="p-1.5 rounded-lg text-[#7d8590] hover:text-white hover:bg-[#21262d] transition-colors cursor-pointer"
                title="Close shortcuts (? or Esc)"
                aria-label="Close shortcuts dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-5 overflow-y-auto space-y-5 text-xs font-mono">
              {/* Category 1: Navigation */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-[#58a6ff] font-bold flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3" />
                  <span>Slide Navigation</span>
                </div>
                <div className="space-y-1.5">
                  {navShortcuts.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#161b22] border border-[#21262d] text-[#c9d1d9]"
                    >
                      <span className="text-[11px] font-sans text-[#8b949e]">{item.description}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        {item.keys.map((k, kIdx) => (
                          <React.Fragment key={kIdx}>
                            <kbd className="px-2 py-1 rounded bg-[#0d1117] border border-[#30363d] text-white text-[11px] font-bold shadow-sm">
                              {k}
                            </kbd>
                            {kIdx < item.keys.length - 1 && (
                              <span className="text-[#484f58] text-[10px]">or</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: Presentation Tools */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-[#2ea043] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Presentation Tools</span>
                </div>
                <div className="space-y-1.5">
                  {toolShortcuts.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#161b22] border border-[#21262d] text-[#c9d1d9]"
                    >
                      <span className="text-[11px] font-sans text-[#8b949e]">{item.description}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        {item.keys.map((k, kIdx) => (
                          <kbd key={kIdx} className="px-2.5 py-1 rounded bg-[#0d1117] border border-[#30363d] text-white text-[11px] font-bold shadow-sm">
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 3: Interactive Controls */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-[#e3b341] font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-3 h-3" />
                  <span>Interaction & Spotlight</span>
                </div>
                <div className="space-y-1.5">
                  {interactiveShortcuts.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#161b22] border border-[#21262d] text-[#c9d1d9]"
                    >
                      <span className="text-[11px] font-sans text-[#8b949e]">{item.description}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        {item.keys.map((k, kIdx) => (
                          <kbd key={kIdx} className="px-2 py-1 rounded bg-[#0d1117] border border-[#30363d] text-white text-[11px] font-bold shadow-sm">
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-[#30363d] bg-[#161b22]/50 flex items-center justify-between text-[11px] text-[#7d8590]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ea043]" />
                <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#0d1117] text-white border border-[#30363d]">?</kbd> at any time to toggle</span>
              </span>
              <button
                onClick={() => {
                  try {
                    sound.playClick();
                  } catch {
                    // ignore
                  }
                  onClose();
                }}
                className="px-3 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] text-white font-sans text-xs transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
