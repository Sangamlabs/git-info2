import React from 'react';
import { NavigationSection } from '../types';
import { ParticleField } from './ParticleField';

interface AnimatedBackgroundProps {
  section?: NavigationSection;
}

/**
 * Premium Multi-Layered Futuristic Developer Background
 * 
 * Layer 1: Deep black/charcoal base
 * Layer 2: Subtle blurred blue/cyan ambient glows (top-left & top-right)
 * Layer 3: Subtle GitHub-green ambient glow (center/accent)
 * Layer 4: Subtle warm orange/red atmospheric glow (bottom edge)
 * Layer 5: Fine developer grid pattern
 * Layer 6: Subtle, low-opacity theme-synced drifting particle field
 * Layer 7: Soft radial vignette
 * Layer 8: Ultra-slow, GPU-accelerated ambient floating light nodes
 */
export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ section = 'WELCOME' }) => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Base Canvas */}
      <div className="absolute inset-0 bg-[#010409]" />

      {/* Layer 2: Cyan/Blue Atmospheric Glows */}
      <div 
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-40 blur-[130px] bg-gradient-to-br from-[#38bdf8]/20 via-[#1d4ed8]/15 to-transparent transition-opacity duration-1000"
      />
      <div 
        className="absolute top-1/4 -right-48 w-[550px] h-[550px] rounded-full opacity-35 blur-[140px] bg-gradient-to-bl from-[#0284c7]/20 via-[#2563eb]/10 to-transparent"
      />

      {/* Layer 3: GitHub Green Core Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-25 blur-[160px] bg-gradient-to-r from-[#238636]/15 via-[#2ea043]/10 to-transparent"
      />

      {/* Layer 4: Warm Amber / Orange Atmospheric Accent Glow */}
      <div 
        className="absolute -bottom-48 left-1/3 w-[650px] h-[500px] rounded-full opacity-20 blur-[150px] bg-gradient-to-t from-[#f97316]/15 via-[#d29922]/10 to-transparent"
      />

      {/* Layer 5: Fine Developer-Style Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:36px_36px]"
      />

      {/* Layer 6: Subtle Low-Opacity Particle Field */}
      <ParticleField section={section} />

      {/* Layer 7: Soft Radial Vignette */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#010409_100%)] opacity-85"
      />

      {/* Layer 8: Ambient Slow Floating Light Orbs (CSS Keyframe Animated) */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />
    </div>
  );
};
