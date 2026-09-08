import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Image as ImageIcon, Maximize2, X, AlertCircle } from 'lucide-react';

interface SlideVisualProps {
  src: string;
  alt: string;
  caption?: string;
  topic?: string;
  className?: string;
  priority?: boolean;
  isSpotlighted?: boolean;
  onToggleSpotlight?: () => void;
}

export const SlideVisual: React.FC<SlideVisualProps> = ({
  src,
  alt,
  caption,
  topic,
  className = '',
  priority = false,
  isSpotlighted = false,
  onToggleSpotlight
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full flex flex-col gap-2 group transition-all duration-300 ${className}`}
      >
        {/* Main 16:9 Image Frame */}
        <div 
          onClick={onToggleSpotlight}
          className={`relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300 bg-[#010409] cursor-pointer select-none ${
            isSpotlighted
              ? 'border-[#58a6ff] ring-2 ring-[#58a6ff]/70 shadow-[0_0_24px_rgba(88,166,255,0.4)]'
              : 'border-[#30363d] hover:border-[#58a6ff]/50 hover:shadow-[0_0_20px_rgba(88,166,255,0.15)]'
          }`}
          title="Click to spotlight this visual concept (or click expand button for full view)"
        >
          {/* Loading Skeleton */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0d1117] animate-pulse p-4">
              <div className="w-10 h-10 rounded-xl bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#58a6ff]">
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>
              <div className="mt-3 text-xs font-mono text-[#7d8590]">Rendering concept visual...</div>
            </div>
          )}

          {/* Missing Image Fallback */}
          {hasError ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0d1117] border border-dashed border-[#f85149]/40 p-6 text-center">
              <div className="p-3 rounded-full bg-[#f85149]/10 text-[#f85149] mb-2 border border-[#f85149]/20">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">Concept Visual Placeholder</div>
              <div className="text-[11px] text-[#8b949e] max-w-sm mt-1">{alt}</div>
            </div>
          ) : (
            /* Primary Concept Visual */
            <img
              src={src}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              referrerPolicy="no-referrer"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              className={`w-full h-full object-contain sm:object-cover transition-transform duration-500 group-hover:scale-[1.01] ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
            />
          )}

          {/* Ambient Lighting Gradient Overlay (Slight vignette on dark borders) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#010409]/60 via-transparent to-transparent" />

          {/* Top-Right Expand Button */}
          {!hasError && !isLoading && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
              type="button"
              className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-[#0d1117]/80 backdrop-blur-md border border-[#30363d] text-[#c9d1d9] hover:text-white hover:border-[#58a6ff] hover:bg-[#161b22] opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-lg"
              title="Expand visual in high-resolution view"
              aria-label="Expand image"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Spotlight Active Badge */}
          {isSpotlighted && (
            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#58a6ff] text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow-md animate-pulse">
              Spotlight
            </div>
          )}
        </div>

        {/* Caption Bar / Description */}
        {caption && (
          <div className="flex items-center justify-between gap-2 px-1 text-[11px] text-[#7d8590] font-mono">
            <div className="flex items-center gap-1.5 min-w-0">
              <ImageIcon className="w-3.5 h-3.5 text-[#58a6ff] shrink-0" />
              <span className="truncate text-[#8b949e]">{caption}</span>
            </div>
            {topic && (
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#21262d] text-[#7d8590] shrink-0">
                {topic}
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Expanded Modal View for Large Classroom / Projector inspection */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center animate-fadeIn"
          onClick={() => setIsExpanded(false)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <div className="text-sm font-mono font-semibold text-[#c9d1d9] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2ea043]" />
                <span>{caption || alt}</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                type="button"
                className="p-1.5 rounded-lg bg-[#21262d] border border-[#30363d] text-[#c9d1d9] hover:text-white hover:border-[#f85149] transition-colors cursor-pointer"
                aria-label="Close expanded view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Res View */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#30363d] bg-[#010409] shadow-2xl">
              <img
                src={src}
                alt={alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
