import React, { useState } from 'react';
import { SlideData } from '../types';
import { SECTIONS } from '../data/slides';
import { SLIDE_VISUALS } from '../assets/slides';
import { X, Search, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { sound } from '../utils/sound';

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideData[];
  currentSlideId: number;
  onSelectSlide: (id: number) => void;
  onReplayIntro?: () => void;
}

export const SlideDrawer: React.FC<SlideDrawerProps> = ({
  isOpen,
  onClose,
  slides,
  currentSlideId,
  onSelectSlide,
  onReplayIntro
}) => {
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState<string>('ALL');

  if (!isOpen) return null;

  const filteredSlides = slides.filter(slide => {
    const matchesSearch = 
      slide.title.toLowerCase().includes(search.toLowerCase()) ||
      (slide.subtitle && slide.subtitle.toLowerCase().includes(search.toLowerCase())) ||
      slide.numberStr.includes(search);
    const matchesSection = activeSection === 'ALL' || slide.section === activeSection;
    return matchesSearch && matchesSection;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl w-full max-w-5xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#30363d] bg-[#010409] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#23863622] text-[#2ea043] border border-[#23863644] shrink-0">
                <span className="font-mono font-bold text-sm">{slides.length}</span>
              </div>
              <div>
                <h2 className="text-sm sm:text-lg font-bold text-white tracking-tight">Slide Navigator & Table of Contents</h2>
                <p className="text-[11px] sm:text-xs text-[#7d8590]">
                  All {slides.length} Slides • From Code to Collaboration
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="sm:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-[#7d8590] hover:text-white hover:bg-[#21262d] active:scale-95 transition-all cursor-pointer"
              aria-label="Close Navigator"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7d8590]" />
              <input
                type="text"
                placeholder={`Search ${slides.length} slides...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-[#7d8590] focus:outline-none focus:border-[#2ea043]"
              />
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="hidden sm:flex min-h-[36px] min-w-[36px] items-center justify-center p-1.5 rounded-md text-[#7d8590] hover:text-white hover:bg-[#21262d] transition-colors cursor-pointer"
              aria-label="Close Navigator"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section filter pills */}
        <div className="px-5 py-2.5 bg-[#0d1117] border-b border-[#30363d] flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveSection('ALL')}
            className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors text-xs ${
              activeSection === 'ALL'
                ? 'bg-[#238636] text-white font-medium'
                : 'bg-[#21262d] text-[#7d8590] hover:text-white'
            }`}
          >
            All {slides.length} Slides
          </button>
          {SECTIONS.map(sec => (
            <button
              key={sec.key}
              onClick={() => setActiveSection(sec.key)}
              className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors text-xs ${
                activeSection === sec.key
                  ? 'bg-[#23863622] text-[#2ea043] border border-[#23863644] font-medium'
                  : 'bg-[#21262d] text-[#7d8590] hover:text-white'
              }`}
            >
              {sec.label} ({sec.startSlide}–{sec.endSlide})
            </button>
          ))}
        </div>

        {/* Slide grid */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-[#010409]">
          {filteredSlides.map(slide => {
            const isCurrent = slide.id === currentSlideId;
            return (
              <button
                key={slide.id}
                onClick={() => {
                  sound.playClick();
                  onSelectSlide(slide.id);
                  onClose();
                }}
                className={`text-left p-3.5 rounded-xl border transition-all relative flex flex-col justify-between group ${
                  isCurrent
                    ? 'border-[#2ea043] bg-[#23863622] shadow-md shadow-[#238636]/10'
                    : 'border-[#30363d] bg-[#0d1117] hover:border-[#2ea043] hover:bg-[#161b22]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                      isCurrent ? 'bg-[#238636] text-white' : 'bg-[#21262d] text-[#2ea043]'
                    }`}>
                      #{slide.numberStr}
                    </span>
                    <span className="text-[10px] text-[#7d8590] uppercase font-semibold">
                      {slide.section}
                    </span>
                  </div>

                  {SLIDE_VISUALS[slide.id]?.imageSrc && (
                    <div className="w-full aspect-video rounded-lg overflow-hidden border border-[#30363d] mb-2 bg-[#010409]">
                      <img 
                        src={SLIDE_VISUALS[slide.id].imageSrc} 
                        alt="" 
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <h4 className="text-xs font-semibold text-white group-hover:text-[#2ea043] line-clamp-2 transition-colors">
                    {slide.title}
                  </h4>

                  {slide.subtitle && (
                    <p className="text-[11px] text-[#7d8590] mt-1 line-clamp-1">
                      {slide.subtitle}
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-[#30363d] flex items-center justify-between text-[10px] text-[#7d8590]">
                  <span>{slide.badge || 'Slide'}</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-[#2ea043]" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0d1117] border-t border-[#30363d] text-xs text-[#7d8590] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span>Showing {filteredSlides.length} of {slides.length} slides</span>
            {onReplayIntro && (
              <button
                onClick={() => {
                  onClose();
                  onReplayIntro();
                }}
                className="flex items-center gap-1 text-[#F05032] hover:underline font-mono text-[11px] cursor-pointer"
              >
                <Play className="w-3 h-3" />
                <span>Replay Git Opening Intro</span>
              </button>
            )}
          </div>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#21262d] text-white font-mono text-[10px] border border-[#30363d]">G</kbd> to toggle gallery</span>
        </div>
      </div>
    </div>
  );
};
