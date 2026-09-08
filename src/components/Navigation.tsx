import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, ChevronLeft, ChevronRight, LayoutGrid, MessageSquare, 
  Volume2, VolumeX, Maximize2, Minimize2, Play, Pause, User, Menu,
  Keyboard
} from 'lucide-react';
import { SECTIONS, TOTAL_SLIDES } from '../data/slides';
import { sound } from '../utils/sound';

interface NavigationProps {
  currentSlideIndex: number; // 0-indexed (0 to 16)
  onSlideChange: (index: number) => void;
  onOpenDrawer: () => void;
  onToggleNotes: () => void;
  isNotesOpen: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isAutoplay: boolean;
  onToggleAutoplay: () => void;
  onOpenProfileTour?: () => void;
  onReplayIntro?: () => void;
  onOpenShortcuts?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSlideIndex,
  onSlideChange,
  onOpenDrawer,
  onToggleNotes,
  isNotesOpen,
  soundEnabled,
  onToggleSound,
  isFullscreen,
  onToggleFullscreen,
  isAutoplay,
  onToggleAutoplay,
  onOpenProfileTour,
  onReplayIntro,
  onOpenShortcuts
}) => {
  const currentSlideNumber = currentSlideIndex + 1; // 1 to 17
  const progressPercent = Math.round((currentSlideNumber / TOTAL_SLIDES) * 100);

  const canPrev = currentSlideIndex > 0;
  const canNext = currentSlideIndex < TOTAL_SLIDES - 1;

  const handlePrev = () => {
    if (canPrev) {
      sound.playTransition();
      onSlideChange(currentSlideIndex - 1);
    }
  };

  const handleNext = () => {
    if (canNext) {
      sound.playTransition();
      onSlideChange(currentSlideIndex + 1);
    }
  };

  const handleHome = () => {
    sound.playTransition();
    onSlideChange(0);
  };

  // Find active section
  const currentSection = SECTIONS.find(
    s => currentSlideNumber >= s.startSlide && currentSlideNumber <= s.endSlide
  ) || SECTIONS[0];

  return (
    <>
      {/* TOP PERSISTENT BAR */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#0d1117]/98 backdrop-blur-md border-b border-[#30363d] px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between shadow-lg pt-[env(safe-area-inset-top,0px)]">
        {/* Subtle Top Navigation Progress Bar */}
        <div 
          className="absolute top-0 inset-x-0 h-[3px] bg-[#21262d]/80 cursor-pointer overflow-hidden group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            const targetSlide = Math.min(TOTAL_SLIDES - 1, Math.max(0, Math.floor(clickPos * TOTAL_SLIDES)));
            onSlideChange(targetSlide);
          }}
          title={`Presentation progress: Slide ${currentSlideNumber} of ${TOTAL_SLIDES} (${progressPercent}%) • Click to seek`}
          role="progressbar"
          aria-valuenow={currentSlideNumber}
          aria-valuemin={1}
          aria-valuemax={TOTAL_SLIDES}
          aria-label={`Progress: Slide ${currentSlideNumber} of ${TOTAL_SLIDES}`}
        >
          <div 
            className="h-full bg-gradient-to-r from-[#238636] via-[#2ea043] to-[#56d364] transition-all duration-400 ease-out relative shadow-[0_0_8px_rgba(46,160,67,0.8)]"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white/70 shadow-[0_0_6px_#fff]" />
          </div>
        </div>

        {/* Left: Brand and active section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Hamburger Drawer Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenDrawer();
            }}
            className="sm:hidden min-h-[44px] min-w-[44px] -ml-1 p-2 rounded-lg text-[#c9d1d9] hover:text-white hover:bg-[#21262d] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Open Slide Navigation Drawer"
            title="Open Table of Contents (17 Slides)"
          >
            <Menu className="w-5 h-5 text-[#2ea043]" />
          </button>

          <button 
            onClick={handleHome}
            className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity text-left group cursor-pointer"
            title="Return to Home (Slide 1)"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="#010409" aria-hidden="true" className="sm:w-5 sm:h-5">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-semibold text-xs sm:text-sm tracking-tight text-white leading-tight line-clamp-1">
                  GITHUB: CODE TO COLLAB
                </span>
              </div>
              <div className="text-[10px] text-[#7d8590] hidden sm:block tracking-wide">
                17 Slides • From Code to Collaboration
              </div>
            </div>
          </button>

          {/* Section Breadcrumb Pill */}
          <div className="hidden lg:flex items-center gap-2 ml-1 pl-3 border-l border-[#30363d] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ea043]"></span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#7d8590] font-semibold">Section:</span>
            <span className="px-2.5 py-0.5 rounded-md bg-[#23863622] text-[#2ea043] border border-[#23863644] font-mono font-medium text-[11px]">
              {currentSection.label} ({currentSection.startSlide}–{currentSection.endSlide})
            </span>
          </div>
        </div>

        {/* Center: Section Shortcut Navigation */}
        <div className="hidden 2xl:flex items-center gap-1 bg-[#161b22] px-2 py-1 rounded-md border border-[#30363d] text-xs">
          {SECTIONS.map(sec => {
            const isSecActive = currentSlideNumber >= sec.startSlide && currentSlideNumber <= sec.endSlide;
            return (
              <button
                key={sec.key}
                onClick={() => onSlideChange(sec.startSlide - 1)}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  isSecActive 
                    ? 'bg-[#238636] text-white font-medium' 
                    : 'text-[#7d8590] hover:text-white hover:bg-[#21262d]'
                }`}
                title={`Jump to ${sec.label} (Slide ${sec.startSlide})`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>

        {/* Right: Slide Counter Pill & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Slide Counter Pill with subtle animated number */}
          <button
            onClick={onOpenDrawer}
            className="flex items-center gap-1 sm:gap-1.5 bg-[#21262d] px-2.5 sm:px-3 py-1.5 rounded-md border border-[#30363d] shadow-sm hover:border-[#2ea043] transition-all active:scale-95 cursor-pointer group"
            title="Click to browse all 17 slides (G)"
          >
            <span className="text-[10px] sm:text-xs font-mono text-[#7d8590]">SLIDE</span>
            <span className="text-xs font-mono font-bold text-[#2ea043] inline-flex overflow-hidden h-4 items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlideNumber}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="inline-block"
                >
                  {String(currentSlideNumber).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-[#7d8590]">/ {TOTAL_SLIDES}</span>
          </button>

          <div className="h-4 w-[1px] bg-[#30363d] hidden sm:block"></div>

          {/* Autoplay toggle */}
          <button
            onClick={onToggleAutoplay}
            className={`p-1.5 min-h-[36px] min-w-[36px] sm:min-h-0 sm:min-w-0 rounded-md border text-xs flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
              isAutoplay
                ? 'bg-[#d29922]/20 border-[#d29922] text-[#d29922]'
                : 'bg-[#21262d] border-[#30363d] text-[#7d8590] hover:text-white'
            }`}
            title={isAutoplay ? 'Pause auto-advance' : 'Start auto-advance (A)'}
          >
            {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            className={`p-1.5 min-h-[36px] min-w-[36px] sm:min-h-0 sm:min-w-0 rounded-md border text-xs flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
              soundEnabled
                ? 'bg-[#238636]/20 border-[#238636] text-[#2ea043]'
                : 'bg-[#21262d] border-[#30363d] text-[#7d8590] hover:text-white'
            }`}
            title={soundEnabled ? 'Mute sound effects (S)' : 'Enable subtle audio (S)'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Keyboard Shortcuts Trigger */}
          {onOpenShortcuts && (
            <button
              onClick={onOpenShortcuts}
              className="p-1.5 min-h-[36px] min-w-[36px] sm:min-h-0 sm:min-w-0 rounded-md border border-[#30363d] bg-[#21262d] text-[#7d8590] hover:text-[#58a6ff] hover:border-[#58a6ff]/50 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              title="Keyboard Shortcuts (?)"
              aria-label="View keyboard shortcuts"
            >
              <Keyboard className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Speaker Notes Toggle */}
          <button
            onClick={onToggleNotes}
            className={`px-2 sm:px-2.5 py-1.5 min-h-[36px] rounded-md border text-xs flex items-center gap-1.5 font-medium transition-all active:scale-95 cursor-pointer ${
              isNotesOpen
                ? 'bg-[#23863622] border-[#23863644] text-[#2ea043]'
                : 'bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:text-white'
            }`}
            title="Presenter Notes (N)"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Notes</span>
          </button>

          {/* Table of Contents Drawer Toggle */}
          <button
            onClick={onOpenDrawer}
            className="hidden sm:flex px-2.5 py-1.5 rounded-md bg-[#21262d] border border-[#30363d] text-[#c9d1d9] hover:text-white hover:bg-[#30363d] transition-colors text-xs items-center gap-1.5 font-medium cursor-pointer"
            title="Table of Contents / Jump to Slide (G)"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#2ea043]" />
            <span className="hidden md:inline">17 Slides</span>
          </button>

          {/* Replay Cinematic Intro */}
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="hidden lg:flex px-2.5 py-1.5 rounded-md bg-[#21262d] border border-[#30363d] text-[#c9d1d9] hover:text-[#F05032] hover:border-[#F05032]/50 transition-colors text-xs items-center gap-1.5 font-medium cursor-pointer"
              title="Replay Cinematic Git Opening Animation"
            >
              <Play className="w-3.5 h-3.5 text-[#F05032]" />
              <span className="hidden xl:inline">Git Intro</span>
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            className="hidden sm:flex p-1.5 rounded-md bg-[#21262d] border border-[#30363d] text-[#7d8590] hover:text-white transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit fullscreen (F)' : 'Fullscreen presentation (F)'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* BOTTOM PERSISTENT CONTROLS & STATUS DOCK */}
      <footer className="fixed bottom-0 inset-x-0 z-40 bg-[#0d1117]/98 backdrop-blur-md border-t border-[#30363d] px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between shadow-2xl pb-[env(safe-area-inset-bottom,0px)]">
        {/* Top edge progress bar */}
        <div 
          className="absolute top-0 inset-x-0 h-1 bg-[#21262d] cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            const targetSlide = Math.min(TOTAL_SLIDES - 1, Math.max(0, Math.floor(clickPos * TOTAL_SLIDES)));
            onSlideChange(targetSlide);
          }}
          title="Click to seek slide"
        >
          <div 
            className="h-full bg-gradient-to-r from-[#238636] to-[#56d364] transition-all duration-400 ease-out shadow-[0_0_8px_rgba(46,160,67,0.7)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Left Status dot */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-2 h-2 rounded-full bg-[#2ea043] animate-pulse"></div>
          <span className="text-[10px] font-mono text-[#7d8590] uppercase tracking-widest hidden sm:inline">
            Slide {currentSlideNumber} of {TOTAL_SLIDES}
          </span>
          <span className="text-[10px] font-mono text-[#7d8590] sm:hidden">
            {progressPercent}%
          </span>
        </div>

        {/* Center: Home, Previous, Slide Counter, Next */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Home Button */}
          <button
            onClick={handleHome}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1 px-2.5 py-2 rounded-lg bg-[#21262d] border border-[#30363d] text-xs font-semibold text-[#c9d1d9] hover:text-white hover:bg-[#30363d] hover:scale-[1.02] active:scale-[0.97] transition-all cursor-pointer"
            title="Return to Home (Slide 1) [Home key]"
            aria-label="Return to Home"
          >
            <Home className="w-4 h-4 text-[#58a6ff]" />
            <span className="hidden md:inline text-xs">Home</span>
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={!canPrev}
            className="group min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#21262d] border border-[#30363d] text-xs font-semibold text-[#c9d1d9] hover:text-white hover:bg-[#30363d] hover:scale-[1.02] active:scale-[0.97] disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-[#21262d] transition-all cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Previous</span>
            <kbd className="hidden md:inline px-1 py-0.2 rounded bg-[#010409] text-[9px] text-[#7d8590] font-mono border border-[#30363d]">←</kbd>
          </button>

          {/* Slide Indicator */}
          <button
            onClick={onOpenDrawer}
            className="min-h-[44px] px-3 text-xs font-mono font-bold text-white hover:text-[#2ea043] transition-colors flex items-center justify-center gap-1.5 rounded-lg hover:bg-[#21262d] active:scale-[0.97] cursor-pointer"
            title="Click to open slide drawer (G)"
            aria-label="Current Slide Number and Total Slides"
          >
            <span className="inline-flex items-center gap-1">
              Slide 
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlideNumber}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.18 }}
                  className="text-[#2ea043] inline-block"
                >
                  {currentSlideNumber}
                </motion.span>
              </AnimatePresence>
              / {TOTAL_SLIDES}
            </span>
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!canNext}
            className="group min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#238636] text-xs font-semibold text-white hover:bg-[#2ea043] hover:scale-[1.02] hover:shadow-[0_0_16px_rgba(46,160,67,0.4)] active:scale-[0.97] disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-[#238636] disabled:hover:shadow-none transition-all shadow-sm cursor-pointer"
            aria-label="Next Slide"
          >
            <span>Next</span>
            <kbd className="hidden md:inline px-1 py-0.2 rounded bg-[#1b6528] text-[9px] text-white/80 font-mono">→</kbd>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Right Status Indicator */}
        <div className="hidden sm:flex items-center gap-3">
          {onOpenShortcuts && (
            <button
              onClick={onOpenShortcuts}
              className="text-xs text-[#7d8590] hover:text-[#58a6ff] flex items-center gap-1 py-1 px-1.5 rounded hover:bg-[#161b22] transition-colors cursor-pointer"
              title="View Keyboard Shortcuts (?)"
            >
              <kbd className="px-1 py-0.2 rounded bg-[#161b22] border border-[#30363d] text-[10px] font-mono text-[#7d8590]">?</kbd>
              <span className="text-[11px] font-mono">Keys</span>
            </button>
          )}
          <div className="flex gap-1">
            <div className="w-1 h-3.5 bg-[#2ea043] rounded-full"></div>
            <div className="w-1 h-3.5 bg-[#2ea043] rounded-full"></div>
            <div className="w-1 h-3.5 bg-[#30363d] rounded-full"></div>
          </div>
          <span className="text-[10px] font-mono text-[#7d8590] uppercase tracking-wider">
            17-Slide Deck
          </span>
        </div>
      </footer>
    </>
  );
};
