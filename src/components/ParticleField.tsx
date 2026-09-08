import React, { useEffect, useRef } from 'react';
import { NavigationSection } from '../types';

interface ParticleFieldProps {
  section?: NavigationSection;
  className?: string;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface ThemePalette {
  primary: RGB;
  secondary: RGB;
  accent: RGB;
}

const SECTION_THEMES: Record<NavigationSection, ThemePalette> = {
  WELCOME: {
    primary: { r: 46, g: 160, b: 67 },     // GitHub Green
    secondary: { r: 88, g: 166, b: 255 },   // Electric Blue
    accent: { r: 56, g: 189, b: 248 },      // Sky Cyan
  },
  FOUNDATIONS: {
    primary: { r: 88, g: 166, b: 255 },    // Terminal Blue
    secondary: { r: 46, g: 160, b: 67 },    // GitHub Green
    accent: { r: 139, g: 148, b: 158 },    // Code Gray
  },
  WORKFLOW: {
    primary: { r: 240, g: 81, b: 51 },     // Git Orange
    secondary: { r: 210, g: 153, b: 34 },   // Star Amber
    accent: { r: 247, g: 129, b: 102 },    // Flame Coral
  },
  SYNC: {
    primary: { r: 56, g: 189, b: 248 },    // Sync Cyan
    secondary: { r: 46, g: 160, b: 67 },   // Remote Green
    accent: { r: 88, g: 166, b: 255 },     // Cloud Blue
  },
  COLLABORATION: {
    primary: { r: 163, g: 113, b: 247 },   // PR Branch Purple
    secondary: { r: 46, g: 160, b: 67 },   // Merge Green
    accent: { r: 88, g: 166, b: 255 },     // Review Blue
  },
  SECURITY: {
    primary: { r: 248, g: 81, b: 73 },    // Security Coral
    secondary: { r: 227, g: 179, b: 65 },  // Guard Gold
    accent: { r: 163, g: 113, b: 247 },   // Encrypted Violet
  },
  INTEGRATION: {
    primary: { r: 56, g: 189, b: 248 },   // API Cyan
    secondary: { r: 137, g: 87, b: 229 }, // Webhook Indigo
    accent: { r: 88, g: 166, b: 255 },    // Dev Blue
  },
  PROFILE: {
    primary: { r: 46, g: 160, b: 67 },    // Contribution Green
    secondary: { r: 227, g: 179, b: 65 }, // Trophy Gold
    accent: { r: 88, g: 166, b: 255 },    // Profile Cyan
  },
  CONCLUSION: {
    primary: { r: 46, g: 160, b: 67 },    // GitHub Green
    secondary: { r: 163, g: 113, b: 247 },// Graduation Purple
    accent: { r: 210, g: 153, b: 34 },    // Achievement Gold
  },
};

const DEFAULT_THEME: ThemePalette = SECTION_THEMES.WELCOME;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  role: 'primary' | 'secondary' | 'accent' | 'neutral';
  depth: number; // 0.4 to 1.0 (parallax & scale)
}

function lerpColor(curr: RGB, target: RGB, factor: number): RGB {
  return {
    r: curr.r + (target.r - curr.r) * factor,
    g: curr.g + (target.g - curr.g) * factor,
    b: curr.b + (target.b - curr.b) * factor,
  };
}

/**
 * High-performance, subtle, low-opacity particle field that drifts slowly
 * in the background and smoothly syncs with the active presentation theme/section.
 */
export const ParticleField: React.FC<ParticleFieldProps> = ({
  section = 'WELCOME',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smoothly interpolated active theme colors
  const activeColorsRef = useRef<ThemePalette>({
    primary: { ...DEFAULT_THEME.primary },
    secondary: { ...DEFAULT_THEME.secondary },
    accent: { ...DEFAULT_THEME.accent },
  });

  const targetTheme = SECTION_THEMES[section] || DEFAULT_THEME;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Target particle count based on screen area (clean & uncrowded)
    const getParticleCount = (w: number, h: number) => {
      const area = w * h;
      if (area < 450000) return 28; // Mobile / small tablet
      if (area < 900000) return 42; // Tablet / small laptop
      return 56;                    // Desktop widescreen
    };

    let particles: Particle[] = [];

    const initParticles = (w: number, h: number) => {
      const count = getParticleCount(w, h);
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const depth = 0.35 + Math.random() * 0.65; // depth plane
        const roleRand = Math.random();
        let role: Particle['role'] = 'neutral';
        if (roleRand < 0.42) role = 'primary';
        else if (roleRand < 0.72) role = 'secondary';
        else if (roleRand < 0.90) role = 'accent';

        // Slow, gentle drift
        const speed = prefersReducedMotion ? 0.01 : (0.1 + Math.random() * 0.22) * depth;
        const angle = Math.PI * 1.5 + (Math.random() - 0.5) * 0.9; // Gently drifting upwards/sideways

        newParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: (0.75 + Math.random() * 1.6) * depth,
          baseAlpha: (0.09 + Math.random() * 0.18) * depth,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.016,
          role,
          depth,
        });
      }

      particles = newParticles;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Re-initialize particles to distribute nicely
      initParticles(width, height);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(document.documentElement);

    // Color interpolation rate per frame
    const LERP_SPEED = 0.035;
    let isVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Main animation loop
    const render = () => {
      if (isVisible) {
        // Interpolate theme colors towards target smoothly
        activeColorsRef.current.primary = lerpColor(
          activeColorsRef.current.primary,
          targetTheme.primary,
          LERP_SPEED
        );
        activeColorsRef.current.secondary = lerpColor(
          activeColorsRef.current.secondary,
          targetTheme.secondary,
          LERP_SPEED
        );
        activeColorsRef.current.accent = lerpColor(
          activeColorsRef.current.accent,
          targetTheme.accent,
          LERP_SPEED
        );

        ctx.clearRect(0, 0, width, height);

        const { primary, secondary, accent } = activeColorsRef.current;
        const neutral: RGB = { r: 139, g: 148, b: 158 };

        // 1. Draw subtle node connection links for nearby particles
        const maxDist = 72;
        const maxDistSq = maxDist * maxDist;

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistSq) {
              const distance = Math.sqrt(distSq);
              const linkAlpha = (1 - distance / maxDist) * 0.045 * Math.min(p1.depth, p2.depth);

              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              // Blend towards theme primary
              ctx.strokeStyle = `rgba(${Math.round(primary.r)}, ${Math.round(primary.g)}, ${Math.round(primary.b)}, ${linkAlpha.toFixed(3)})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }

        // 2. Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Move
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges smoothly
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          // Pulse opacity for organic breathing feel
          p.pulsePhase += p.pulseSpeed;
          const pulse = (Math.sin(p.pulsePhase) + 1) * 0.5; // 0 to 1
          const alpha = p.baseAlpha * (0.75 + pulse * 0.5);

          // Get particle color
          let rgb: RGB = neutral;
          if (p.role === 'primary') rgb = primary;
          else if (p.role === 'secondary') rgb = secondary;
          else if (p.role === 'accent') rgb = accent;

          const r = Math.round(rgb.r);
          const g = Math.round(rgb.g);
          const b = Math.round(rgb.b);

          // Draw soft radial glow for prominent foreground particles
          if (p.depth > 0.7 && p.radius > 1.4) {
            const glowRadius = p.radius * 2.8;
            const gradient = ctx.createRadialGradient(
              p.x, p.y, 0,
              p.x, p.y, glowRadius
            );
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${(alpha * 0.45).toFixed(3)})`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

            ctx.beginPath();
            ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }

          // Core particle dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [targetTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[1] select-none ${className}`}
    />
  );
};
