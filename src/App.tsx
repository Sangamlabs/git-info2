import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SLIDES, TOTAL_SLIDES, SECTIONS } from './data/slides';
import { Navigation } from './components/Navigation';
import { SlideRenderer } from './components/SlideRenderer';
import { SlideDrawer } from './components/SlideDrawer';
import { SpeakerNotesModal } from './components/SpeakerNotesModal';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ProfileTour } from './components/ProfileTour';
import { GitLogoIntro } from './components/GitLogoIntro';
import { SlideTransition } from './components/SlideTransition';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { sound } from './utils/sound';
import { Compass, Sparkles } from 'lucide-react';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      const seen = sessionStorage.getItem('github_intro_seen');
      return seen !== 'true';
    } catch {
      return true;
    }
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isProfileTourOpen, setIsProfileTourOpen] = useState(false);

  // Smart section transition banner state
  const [sectionNotification, setSectionNotification] = useState<string | null>(null);
  const prevSectionRef = useRef<string>(SLIDES[0].section);

  const currentSlide = SLIDES[currentSlideIndex] || SLIDES[0];

  const handleIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem('github_intro_seen', 'true');
    } catch {
      // ignore
    }
    setShowIntro(false);
    setCurrentSlideIndex(0);
  }, []);

  const handleReplayIntro = useCallback(() => {
    setShowIntro(true);
    setCurrentSlideIndex(0);
  }, []);

  // Sync sound controller state
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  const handleSlideChange = useCallback((index: number, explicitDirection?: number) => {
    if (index >= 0 && index < TOTAL_SLIDES) {
      if (explicitDirection !== undefined) {
        setDirection(explicitDirection);
      } else {
        const distance = Math.abs(index - currentSlideIndex);
        if (distance > 1) {
          // Direct slide jumps use smooth fade + scale transition rather than long horizontal panning
          setDirection(0);
        } else {
          setDirection(index > currentSlideIndex ? 1 : -1);
        }
      }
      
      const targetSlide = SLIDES[index];
      if (targetSlide && targetSlide.section !== prevSectionRef.current) {
        const foundSec = SECTIONS.find(s => s.key === targetSlide.section);
        setSectionNotification(foundSec ? `${foundSec.label}` : targetSlide.section);
        prevSectionRef.current = targetSlide.section;
        
        setTimeout(() => {
          setSectionNotification(null);
        }, 1800);
      }

      setCurrentSlideIndex(index);
      sound.playTransition();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSlideIndex]);

  // Keyboard navigation handler
  useEffect(() => {
    if (showIntro) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          if (currentSlideIndex < TOTAL_SLIDES - 1) {
            handleSlideChange(currentSlideIndex + 1, 1);
          }
          break;

        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          if (currentSlideIndex > 0) {
            handleSlideChange(currentSlideIndex - 1, -1);
          }
          break;

        case 'Home':
        case 'h':
        case 'H':
          e.preventDefault();
          handleSlideChange(0, 0);
          break;

        case 'End':
          e.preventDefault();
          handleSlideChange(TOTAL_SLIDES - 1, 0);
          break;

        case '?':
        case '/':
          e.preventDefault();
          setIsShortcutsOpen(prev => !prev);
          sound.playClick();
          break;

        case 'g':
        case 'G':
          e.preventDefault();
          setIsDrawerOpen(prev => !prev);
          sound.playClick();
          break;

        case 'n':
        case 'N':
          e.preventDefault();
          setIsNotesOpen(prev => !prev);
          sound.playClick();
          break;

        case 's':
        case 'S':
          e.preventDefault();
          setSoundEnabled(prev => !prev);
          break;

        case 'a':
        case 'A':
          e.preventDefault();
          setIsAutoplay(prev => !prev);
          sound.playClick();
          break;

        case 'p':
        case 'P':
          e.preventDefault();
          setIsProfileTourOpen(prev => !prev);
          sound.playClick();
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;

        case 'Escape':
          setIsDrawerOpen(false);
          setIsNotesOpen(false);
          setIsShortcutsOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, handleSlideChange]);

  // Autoplay timer effect
  useEffect(() => {
    let timer: any = null;
    if (isAutoplay) {
      timer = setInterval(() => {
        setCurrentSlideIndex(prev => {
          if (prev < TOTAL_SLIDES - 1) {
            setDirection(1);
            return prev + 1;
          } else {
            setIsAutoplay(false);
            return prev;
          }
        });
      }, 12000); // 12 seconds per slide
    }
    return () => clearInterval(timer);
  }, [isAutoplay]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Mobile Touch Swipe Gesture Recognizer
  const touchStartRef = useRef<{ x: number; y: number; time: number; target: EventTarget | null } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
        target: e.target,
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const start = touchStartRef.current;
    touchStartRef.current = null;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - start.x;
    const diffY = endY - start.y;
    const elapsed = Date.now() - start.time;

    // Check if target is inside an element that handles horizontal scroll (like code blocks, interactive sliders, inputs)
    let el = start.target as HTMLElement | null;
    while (el && el !== document.body) {
      if (
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'BUTTON' ||
        el.tagName === 'PRE' ||
        el.tagName === 'CODE' ||
        el.getAttribute?.('role') === 'slider' ||
        el.classList?.contains('overflow-x-auto')
      ) {
        if (el.scrollWidth > el.clientWidth) return;
      }
      el = el.parentElement;
    }

    // Must be predominantly horizontal gesture: > 50px distance, within 600ms, abs(diffX) > abs(diffY) * 1.3
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.3 && elapsed < 600) {
      if (diffX < 0) {
        // Swipe Left -> Next slide
        if (currentSlideIndex < TOTAL_SLIDES - 1) {
          handleSlideChange(currentSlideIndex + 1);
        }
      } else {
        // Swipe Right -> Prev slide
        if (currentSlideIndex > 0) {
          handleSlideChange(currentSlideIndex - 1);
        }
      }
    }
  };

  if (showIntro) {
    return <GitLogoIntro onComplete={handleIntroComplete} />;
  }

  if (isProfileTourOpen) {
    return <ProfileTour onExit={() => setIsProfileTourOpen(false)} />;
  }

  return (
    <div className="min-h-screen relative bg-[#010409] text-[#c9d1d9] flex flex-col selection:bg-[#238636] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Layered Cinematic Developer Background with Theme-Synced Particle Field */}
      <AnimatedBackground section={currentSlide.section} />

      {/* Top and Bottom Navigation Bars */}
      <Navigation
        currentSlideIndex={currentSlideIndex}
        onSlideChange={handleSlideChange}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onToggleNotes={() => setIsNotesOpen(prev => !prev)}
        isNotesOpen={isNotesOpen}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        isAutoplay={isAutoplay}
        onToggleAutoplay={() => setIsAutoplay(prev => !prev)}
        onOpenProfileTour={() => setIsProfileTourOpen(true)}
        onReplayIntro={handleReplayIntro}
        onOpenShortcuts={() => setIsShortcutsOpen(prev => !prev)}
      />

      {/* Smart Section Transition Toast Notification */}
      <AnimatePresence>
        {sectionNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2.5 text-xs text-white shadow-2xl border border-[#2ea043]/50">
              <span className="w-2 h-2 rounded-full bg-[#2ea043] animate-ping" />
              <Compass className="w-3.5 h-3.5 text-[#2ea043]" />
              <span className="text-[#7d8590] uppercase tracking-wider text-[10px] font-bold">Section Entered:</span>
              <span className="font-semibold text-white tracking-wide">{sectionNotification}</span>
              <Sparkles className="w-3 h-3 text-[#58a6ff]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Slide Canvas with Smooth Morph/Scale/Fade Transitions & Touch Swipe */}
      <main 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 pt-[calc(3.75rem+env(safe-area-inset-top,0px))] sm:pt-20 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] sm:pb-24 flex flex-col justify-center"
      >
        <SlideTransition slideKey={currentSlide.id} direction={direction}>
          <SlideRenderer 
            slide={currentSlide} 
            onNavigate={handleSlideChange} 
            onOpenProfileTour={() => setIsProfileTourOpen(true)} 
          />
        </SlideTransition>
      </main>

      {/* Slide Drawer (All 17 Slides Table of Contents) */}
      <SlideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        slides={SLIDES}
        currentSlideId={currentSlide.id}
        onSelectSlide={id => handleSlideChange(id - 1, 0)}
        onReplayIntro={handleReplayIntro}
      />

      {/* Presenter Speaker Notes Drawer */}
      <SpeakerNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        notes={currentSlide.speakerNotes}
        slideNumber={currentSlide.numberStr}
        slideTitle={currentSlide.title}
      />

      {/* Keyboard Shortcuts Discovery Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
