import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SlideData } from '../types';
import { SLIDE_VISUALS } from '../assets/slides';
import { SlideVisual } from './SlideVisual';
import { CodeBlock } from './CodeBlock';
import { 
  Terminal, GitBranch, GitCommit, GitPullRequest, Shield, Sparkles, 
  ExternalLink, Lightbulb, Focus, X, MousePointerClick, 
  CheckCircle2, ArrowRight, Layers, Cpu, User, Github, 
  Lock, RefreshCw, Download, Upload, GitFork, BookOpen
} from 'lucide-react';
import { sound } from '../utils/sound';

interface SlideRendererProps {
  slide: SlideData;
  onOpenProfileTour?: () => void;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ 
  slide,
  onOpenProfileTour 
}) => {
  // Presenter Spotlight highlighting state
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());

  // Reset highlights whenever the slide changes
  React.useEffect(() => {
    setHighlightedIds(new Set());
  }, [slide.id]);

  // Keyboard shortcut: Escape clears all spotlights
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && highlightedIds.size > 0) {
        setHighlightedIds(new Set());
        try {
          sound.playClick();
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [highlightedIds.size]);

  const toggleHighlight = (id: string) => {
    try {
      sound.playClick();
    } catch {
      // ignore
    }
    setHighlightedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const clearAllHighlights = () => {
    try {
      sound.playClick();
    } catch {
      // ignore
    }
    setHighlightedIds(new Set());
  };

  const hasAnyHighlight = highlightedIds.size > 0;
  const currentVisual = SLIDE_VISUALS[slide.id] || SLIDE_VISUALS[1];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* MAIN CARD CONTAINER */}
      <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden">
        
        {/* ============================================================ */}
        {/* TOP BAR: Badge, Slide Number, Section & Presenter Controls   */}
        {/* ============================================================ */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-[#21262d] mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            {slide.badge && (
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#23863622] text-[#2ea043] border border-[#23863644] font-medium">
                {slide.badge}
              </span>
            )}
            {slide.tempType && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f59e0b18] text-[#f59e0b] border border-[#f59e0b33]">
                {slide.tempType === 'TEMP_GREETING' ? 'TEMPORARY WELCOME' : 'TEMPORARY THANK YOU'}
              </span>
            )}
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#7d8590]">
              {slide.section}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Presenter Spotlight Quick Clear Button */}
            {hasAnyHighlight ? (
              <button
                onClick={clearAllHighlights}
                className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md bg-[#58a6ff]/20 border border-[#58a6ff]/50 text-[#58a6ff] hover:bg-[#58a6ff]/30 text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm animate-pulse"
                title="Click to clear all spotlights (or press Escape)"
              >
                <Focus className="w-3.5 h-3.5 text-[#58a6ff]" />
                <span>{highlightedIds.size} Spotlighted</span>
                <X className="w-3 h-3 ml-0.5 opacity-80" />
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-1 text-[10px] text-[#484f58] font-mono select-none">
                <MousePointerClick className="w-3 h-3 text-[#7d8590]" />
                <span>Click cards or visual to spotlight</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-xs font-mono text-[#7d8590] pl-1 sm:pl-2 border-l border-[#30363d]">
              <span className="text-white font-bold">{slide.numberStr}</span>
              <span>/</span>
              <span>17</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SLIDE 1: TEMPORARY WELCOME (Clean, cinematic, no clutter)   */}
        {/* ============================================================ */}
        {slide.id === 1 && (
          <div className="space-y-6 sm:space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 text-center max-w-3xl mx-auto"
            >
              <div className="text-xs font-mono uppercase tracking-widest text-[#58a6ff] font-semibold flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#58a6ff]" />
                <span>{slide.topic}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-[#8b949e] max-w-2xl mx-auto leading-relaxed">
                {slide.subtitle}
              </p>
            </motion.div>

            {/* Primary Visual */}
            <div className="max-w-4xl mx-auto">
              <SlideVisual 
                src={currentVisual.imageSrc}
                alt={currentVisual.conceptAlt}
                caption={currentVisual.caption}
                topic="Journey Overview"
                priority
                isSpotlighted={highlightedIds.has('visual-1')}
                onToggleSpotlight={() => toggleHighlight('visual-1')}
              />
            </div>

            {/* Welcome Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
              {slide.points.map((point, index) => {
                const isHl = highlightedIds.has(`welcome-pt-${index}`);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, delay: 0.12 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => toggleHighlight(`welcome-pt-${index}`)}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer select-none ${
                      isHl 
                        ? 'bg-[#1c2128] border-[#58a6ff] text-white ring-2 ring-[#58a6ff]/60 shadow-[0_0_16px_rgba(88,166,255,0.25)]'
                        : hasAnyHighlight 
                          ? 'bg-[#161b22]/50 border-[#21262d] text-[#7d8590]'
                          : 'bg-[#161b22] border-[#30363d] text-[#c9d1d9] hover:border-[#58a6ff]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5 text-[#58a6ff]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Module {index + 1}</span>
                    </div>
                    <div>{point}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Takeaway banner */}
            {slide.takeaway && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => toggleHighlight('welcome-takeaway')}
                className={`p-4 rounded-xl border transition-all cursor-pointer select-none max-w-4xl mx-auto ${
                  highlightedIds.has('welcome-takeaway')
                    ? 'bg-[#23863622] border-[#2ea043] ring-2 ring-[#2ea043]/70'
                    : 'bg-[#161b22] border-[#30363d] hover:border-[#2ea043]/50'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#2ea043] mb-1 font-mono uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" />
                  <span>Session Takeaway</span>
                </div>
                <p className="text-xs sm:text-sm text-white font-medium">
                  {slide.takeaway}
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* SLIDE 17: TEMPORARY THANK YOU (Clean closing visual frame)    */}
        {/* ============================================================ */}
        {slide.id === 17 && (
          <div className="space-y-6 sm:space-y-8 text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <div className="text-xs font-mono uppercase tracking-widest text-[#2ea043] font-semibold flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#2ea043]" />
                <span>Presentation Completed</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {slide.title}
              </h1>
              <p className="text-base sm:text-xl text-[#8b949e] max-w-2xl mx-auto font-light leading-relaxed">
                {slide.subtitle}
              </p>
            </motion.div>

            {/* Primary Visual */}
            <div className="max-w-3xl mx-auto">
              <SlideVisual 
                src={currentVisual.imageSrc}
                alt={currentVisual.conceptAlt}
                caption={currentVisual.caption}
                topic="Collaboration Journey"
                isSpotlighted={highlightedIds.has('visual-17')}
                onToggleSpotlight={() => toggleHighlight('visual-17')}
              />
            </div>

            {/* Question Callout */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => toggleHighlight('closing-callout')}
              className={`p-6 rounded-2xl border transition-all cursor-pointer select-none max-w-2xl mx-auto space-y-2 ${
                highlightedIds.has('closing-callout')
                  ? 'bg-[#1c2128] border-[#58a6ff] ring-2 ring-[#58a6ff]/70 shadow-[0_0_24px_rgba(88,166,255,0.3)]'
                  : 'bg-[#161b22] border-[#30363d] hover:border-[#58a6ff]/40'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#23863622] text-[#2ea043] border border-[#23863644] flex items-center justify-center mx-auto mb-2">
                <Github className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Questions & Discussion</h3>
              <p className="text-xs sm:text-sm text-[#8b949e]">
                {slide.takeaway}
              </p>
            </motion.div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SLIDES 2-16: EDUCATIONAL SLIDES (Text + Large Concept Visual) */}
        {/* ============================================================ */}
        {slide.id >= 2 && slide.id <= 16 && (
          <div className="space-y-6">
            
            {/* Slide Header: Title, Subtitle & Topic */}
            <div className="space-y-1.5">
              {slide.topic && (
                <motion.div 
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[11px] font-mono uppercase tracking-widest text-[#58a6ff] font-semibold"
                >
                  {slide.topic}
                </motion.div>
              )}
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight break-words"
              >
                {slide.title}
              </motion.h1>
              {slide.subtitle && (
                <motion.p 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xs sm:text-sm text-[#8b949e] font-normal leading-relaxed break-words"
                >
                  {slide.subtitle}
                </motion.p>
              )}
            </div>

            {/* Memory Trick Chip (if defined) */}
            {slide.memory && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.08 }}
                onClick={() => toggleHighlight('memory-chip')}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer select-none ${
                  highlightedIds.has('memory-chip')
                    ? 'bg-[#f59e0b20] border-[#f59e0b] text-[#f59e0b] ring-2 ring-[#f59e0b]/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                    : 'bg-[#161b22] border-[#30363d] text-[#e3b341] hover:border-[#e3b341]/60'
                }`}
                title="Click to spotlight memory trick"
              >
                <Lightbulb className="w-3.5 h-3.5 text-[#e3b341] shrink-0" />
                <span className="font-semibold text-white">Memory Trick:</span>
                <span>{slide.memory}</span>
              </motion.div>
            )}

            {/* Responsive Split / Stacked Layout: Desktop (50/50), Mobile/Tablet (Stacked) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: Middle Short Explanation / Key Points (Desktop ~55%) */}
              <div className="lg:col-span-6 xl:col-span-6 space-y-4">
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#7d8590] flex items-center justify-between">
                    <span>Key Concepts</span>
                    <span className="text-[10px] text-[#484f58]">Click to highlight</span>
                  </div>

                  {slide.points.map((point, index) => {
                    const pointId = `point-${index}`;
                    const isHighlighted = highlightedIds.has(pointId);

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.08 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => toggleHighlight(pointId)}
                        className={`p-3 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all duration-200 cursor-pointer select-none flex items-start justify-between gap-3 ${
                          isHighlighted
                            ? 'bg-[#1c2128] border-[#58a6ff] text-white ring-2 ring-[#58a6ff]/70 shadow-[0_0_16px_rgba(88,166,255,0.25)]'
                            : hasAnyHighlight
                              ? 'bg-[#161b22]/50 border-[#21262d] text-[#7d8590]'
                              : 'bg-[#161b22] border-[#30363d] text-[#c9d1d9] hover:border-[#58a6ff]/40 hover:bg-[#161b22]/90'
                        }`}
                        title="Click to spotlight this key detail for the audience"
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold transition-colors ${
                            isHighlighted
                              ? 'bg-[#58a6ff] text-black shadow-sm'
                              : 'bg-[#21262d] text-[#2ea043]'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="break-words">{point}</span>
                        </div>
                        {isHighlighted && (
                          <span className="text-[9px] uppercase tracking-wider font-mono font-bold px-1.5 py-0.5 rounded bg-[#58a6ff] text-black shrink-0 mt-0.5 shadow-sm">
                            Focus
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Optional Slide Code Snippet (e.g. for README, Add & Commit, Clone, API) */}
                {slide.codeSnippet && (
                  <div className="pt-2">
                    <CodeBlock 
                      code={slide.codeSnippet.code}
                      title={slide.codeSnippet.title}
                      language={slide.codeSnippet.language || 'bash'}
                      highlightedLineIds={highlightedIds}
                      onToggleLineHighlight={toggleHighlight}
                    />
                  </div>
                )}

                {/* Live Interactive Profile Tour launcher for Slide 16 */}
                {slide.id === 16 && (
                  <a
                    href="https://github.com/Sangamlabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      try {
                        sound.playClick();
                      } catch {
                        // ignore
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Spacebar') {
                        e.preventDefault();
                        (e.currentTarget as HTMLAnchorElement).click();
                      }
                    }}
                    className="group relative w-full py-3 px-3.5 sm:px-5 rounded-xl bg-[#0e2417]/85 hover:bg-[#123820] border border-[#2ea043]/70 hover:border-[#3fb950] text-[#f0f6fc] hover:text-white text-[11.5px] xs:text-xs sm:text-sm font-mono font-semibold flex items-center justify-between sm:justify-center gap-2 sm:gap-2.5 transition-all duration-250 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117] cta-neon-pulse cursor-pointer shadow-md select-none"
                    title="Open GitHub Profile (@Sangamlabs) in a new tab"
                    aria-label="Launch Live Interactive Profile Tour (Opens Sangamlabs on GitHub in a new tab)"
                  >
                    <Github className="w-4 h-4 text-[#2ea043] group-hover:text-[#56d364] transition-colors duration-250 shrink-0" />
                    <span className="truncate text-center">Launch Live Interactive Profile Tour</span>
                    <ExternalLink className="w-4 h-4 text-[#7ee787] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-250 shrink-0" />
                  </a>
                )}
              </div>

              {/* RIGHT COLUMN: Large Concept Visual (~45-50% Desktop, Stacked Mobile) */}
              <div className="lg:col-span-6 xl:col-span-6 space-y-3">
                <SlideVisual 
                  src={currentVisual.imageSrc}
                  alt={currentVisual.conceptAlt}
                  caption={currentVisual.caption}
                  topic={slide.badge}
                  isSpotlighted={highlightedIds.has(`visual-${slide.id}`)}
                  onToggleSpotlight={() => toggleHighlight(`visual-${slide.id}`)}
                />

                {/* Micro-diagram complement for Git Working Areas (Slide 7) */}
                {slide.id === 7 && (
                  <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[10px] pt-1">
                    <div className="p-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-[#7d8590]">
                      1. Workspace
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#161b22] border border-[#58a6ff]/40 text-[#58a6ff]">
                      2. Staging
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#161b22] border border-[#2ea043]/40 text-[#2ea043]">
                      3. Local Repo
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#161b22] border border-[#a371f7]/40 text-[#a371f7]">
                      4. Remote
                    </div>
                  </div>
                )}

                {/* Micro-diagram complement for Push, Pull & Fetch (Slide 11) */}
                {slide.id === 11 && (
                  <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px] pt-1">
                    <div className="p-1.5 rounded-lg bg-[#161b22] border border-[#2ea043]/40 text-[#2ea043]">
                      Push ➔ Remote
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#161b22] border border-[#58a6ff]/40 text-[#58a6ff]">
                      Pull ➔ Merge
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#161b22] border border-[#e3b341]/40 text-[#e3b341]">
                      Fetch ➔ Inspect
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ============================================================ */}
            {/* BOTTOM: One Concise Takeaway (Full-width card)               */}
            {/* ============================================================ */}
            {slide.takeaway && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => toggleHighlight('slide-takeaway')}
                className={`mt-4 p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                  highlightedIds.has('slide-takeaway')
                    ? 'bg-[#23863622] border-[#2ea043] ring-2 ring-[#2ea043]/70 shadow-[0_0_20px_rgba(46,160,67,0.3)]'
                    : hasAnyHighlight
                      ? 'bg-[#161b22]/50 border-[#21262d] opacity-75'
                      : 'bg-[#161b22] border-[#30363d] hover:border-[#2ea043]/50'
                }`}
                title="Click to spotlight the core takeaway"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2ea043] font-mono uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4 text-[#2ea043] shrink-0" />
                    <span>Key Takeaway</span>
                  </div>
                  {highlightedIds.has('slide-takeaway') && (
                    <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-[#2ea043] text-black">
                      Focused
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                  {slide.takeaway}
                </p>
              </motion.div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
