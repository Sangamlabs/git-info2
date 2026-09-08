import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export interface Interactive3DObjectProps {
  children?: React.ReactNode;
  className?: string;
  maxRotateX?: number; // default ±6 degrees
  maxRotateY?: number; // default ±8 degrees
  maxTranslateZ?: number; // default 24px
  scaleHover?: number; // default 1.025
  glowColor?: string; // default #2ea043 (GitHub green)
  borderColor?: string;
  lighting?: boolean;
  layers?: {
    depth: number; // e.g. 0 to 50
    content: React.ReactNode;
    className?: string;
  }[];
  ariaLabel?: string;
}

export const Interactive3DObject: React.FC<Interactive3DObjectProps> = ({
  children,
  className = '',
  maxRotateX = 6,
  maxRotateY = 8,
  maxTranslateZ = 24,
  scaleHover = 1.025,
  glowColor = 'rgba(46, 160, 67, 0.25)',
  borderColor = 'rgba(48, 54, 61, 0.8)',
  lighting = true,
  layers,
  ariaLabel = 'Interactive 3D Object'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check for reduced motion preferences & touch device
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    checkTouch();

    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Motion values for cursor coordinates normalized from -1 to 1
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics configuration for technical, smooth, non-bouncy movement
  const springConfig = { damping: 26, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map normalized mouse coordinates to 3D rotation & translation
  const rotateX = useTransform(smoothY, [-1, 1], [maxRotateX, -maxRotateX]);
  const rotateY = useTransform(smoothX, [-1, 1], [-maxRotateY, maxRotateY]);
  const translateZ = useTransform(smoothY, [-1, 0, 1], [maxTranslateZ * 0.5, maxTranslateZ, maxTranslateZ * 0.5]);
  const scale = useTransform(smoothY, [-1, 0, 1], [scaleHover * 0.99, scaleHover, scaleHover * 0.99]);

  // Lighting position for dynamic radial highlight
  const lightX = useTransform(smoothX, [-1, 1], ['20%', '80%']);
  const lightY = useTransform(smoothY, [-1, 1], ['20%', '80%']);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Normalize from -1 (left/top) to +1 (right/bottom)
    const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    mouseX.set(Math.max(-1, Math.min(1, normalizedX)));
    mouseY.set(Math.max(-1, Math.min(1, normalizedY)));
  }, [reducedMotion, mouseX, mouseY]);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    // Smoothly return to neutral
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Fallback keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (reducedMotion) return;
    if (e.key === 'ArrowUp') { mouseY.set(-0.6); }
    else if (e.key === 'ArrowDown') { mouseY.set(0.6); }
    else if (e.key === 'ArrowLeft') { mouseX.set(-0.6); }
    else if (e.key === 'ArrowRight') { mouseX.set(0.6); }
  };

  const handleKeyUp = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (reducedMotion || isTouchDevice) {
    return (
      <div 
        ref={containerRef}
        className={`relative w-full rounded-xl border border-[#30363d] bg-[#0d1117] shadow-xl overflow-hidden ${className}`}
        role="region"
        aria-label={ariaLabel}
      >
        {children}
        {layers?.map((layer, idx) => (
          <div key={idx} className={layer.className}>
            {layer.content}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative w-full flex items-center justify-center p-2"
    >
      <motion.div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        tabIndex={0}
        role="region"
        aria-label={ariaLabel}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? scale : 1,
          transformStyle: 'preserve-3d',
        }}
        className={`relative transition-shadow duration-300 outline-none select-none ${className}`}
      >
        {/* Layer 1: Background dynamic pseudo-lighting & atmospheric glow */}
        {lighting && (
          <motion.div
            style={{
              background: `radial-gradient(circle 240px at ${lightX.get()} ${lightY.get()}, ${glowColor}, transparent 70%)`,
              transform: 'translateZ(-15px)',
            }}
            className="pointer-events-none absolute -inset-4 rounded-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {/* Layer 2: Outer 3D depth frame */}
        <div 
          style={{ transform: 'translateZ(0px)', borderColor }}
          className="relative w-full h-full rounded-xl bg-[#0d1117]/95 border shadow-2xl overflow-hidden backdrop-blur-md"
        >
          {/* Subtle metallic corner bevel highlights */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-black/[0.4] rounded-xl" />
          
          {/* Layer 3: Main content */}
          <motion.div 
            style={{ transform: isHovered ? translateZ : 'translateZ(0px)' }}
            className="relative z-10 w-full h-full"
          >
            {children}
          </motion.div>

          {/* Layer 4 & 5: Parallax depth layers if provided */}
          {layers && layers.map((layer, index) => (
            <motion.div
              key={index}
              style={{
                transform: isHovered 
                  ? `translateZ(${layer.depth}px)` 
                  : 'translateZ(0px)',
                transformStyle: 'preserve-3d',
              }}
              className={`pointer-events-none absolute inset-0 z-${20 + index * 5} ${layer.className || ''}`}
            >
              {layer.content}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
