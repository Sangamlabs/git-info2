import React, { useState } from 'react';
import { 
  FolderGit2, GitPullRequest, AlertCircle, PlayCircle, Shield, 
  Settings, CheckCircle2, XCircle, Clock, Star, GitFork, Eye,
  Check, MessageSquare, Terminal, Cpu, ArrowRight, User, GitMerge,
  Trash2, Sparkles, AlertTriangle, Key, Lock, RefreshCw, FileCode, CheckCircle
} from 'lucide-react';
import { sound } from '../utils/sound';

/**
 * Security Warning Glass-Panel
 * Pulses with a subtle orange warning glow when API keys are detected in the code simulation,
 * reinforcing the 'NEVER COMMIT CREDENTIALS' lesson.
 */
export const SecurityWarningGlassPanel: React.FC<{
  initialDetected?: boolean;
  className?: string;
  showToggle?: boolean;
}> = ({
  initialDetected = true,
  className = '',
  showToggle = true,
}) => {
  const [isKeyDetected, setIsKeyDetected] = useState(initialDetected);

  const toggleSimulation = () => {
    setIsKeyDetected(prev => !prev);
    if (!isKeyDetected) {
      sound.playClick();
    } else {
      sound.playSuccess();
    }
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden transition-all duration-500 ${
        isKeyDetected
          ? 'bg-[#180e08]/90 border-2 border-amber-500/60 shadow-[0_0_40px_rgba(245,158,11,0.28)] ring-1 ring-amber-500/30'
          : 'bg-[#09150e]/90 border-2 border-[#2ea043]/50 shadow-[0_0_30px_rgba(46,160,67,0.2)]'
      } backdrop-blur-xl ${className}`}
    >
      {/* Subtle pulsing ambient orange aura when key detected */}
      {isKeyDetected && (
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/30 to-amber-500/20 opacity-70 blur-md pointer-events-none animate-pulse" />
      )}

      {/* Header bar */}
      <div
        className={`relative z-10 px-4 py-3 border-b flex items-center justify-between flex-wrap gap-2 ${
          isKeyDetected
            ? 'bg-amber-950/40 border-amber-500/30 text-amber-200'
            : 'bg-emerald-950/30 border-[#2ea043]/30 text-emerald-200'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              isKeyDetected
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                : 'bg-[#2ea043]/20 text-[#2ea043] border border-[#2ea043]/40'
            }`}
          >
            {isKeyDetected ? (
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            ) : (
              <Shield className="w-4 h-4 text-[#2ea043]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm tracking-wide text-white">
                {isKeyDetected
                  ? 'SECURITY ALERT: HARDCODED SECRET DETECTED'
                  : 'SECRET SCANNING: ALL CLEAR'}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                  isKeyDetected
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                    : 'bg-[#2ea043]/20 text-[#2ea043] border border-[#2ea043]/40'
                }`}
              >
                {isKeyDetected ? 'Push Blocked' : 'Protected'}
              </span>
            </div>
            <p className="text-[11px] text-[#8b949e]">
              {isKeyDetected
                ? 'Automated Secret Scanning prevented credential leak to remote Git history'
                : 'No API keys, tokens, or private credentials found in committed files'}
            </p>
          </div>
        </div>

        {showToggle && (
          <button
            onClick={toggleSimulation}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all active:scale-95 ${
              isKeyDetected
                ? 'bg-amber-500 hover:bg-amber-400 text-black font-semibold shadow-md'
                : 'bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d]'
            }`}
          >
            <RefreshCw className="w-3 h-3" />
            <span>{isKeyDetected ? 'Fix & Use .env' : 'Simulate Leaked Key'}</span>
          </button>
        )}
      </div>

      {/* Main Glass Content Body */}
      <div className="relative z-10 p-4 space-y-3.5 text-xs font-sans">
        {isKeyDetected ? (
          <>
            {/* Code Diff Simulation with pulsing orange warning */}
            <div className="bg-[#0b0502]/95 border border-amber-500/40 rounded-xl overflow-hidden font-mono text-xs">
              <div className="bg-[#1a0f07] px-3 py-1.5 border-b border-amber-500/20 flex items-center justify-between text-[#8b949e] text-[11px]">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <FileCode className="w-3.5 h-3.5" /> src/config/paymentService.ts
                </span>
                <span className="text-amber-400 font-bold">Rule: secret-scanning-high-entropy</span>
              </div>
              <div className="p-3 space-y-1 text-[11px] overflow-x-auto">
                <div className="text-[#8b949e] pl-4">12  export const initializeStripe = () =&gt; &#123;</div>
                <div className="bg-amber-500/20 border-l-4 border-amber-500 px-2 py-1 text-amber-200 rounded-r flex items-center justify-between gap-2">
                  <span>+ 13    const stripeKey = "[REDACTED_SECRET]";</span>
                  <span className="bg-amber-500 text-black font-bold font-sans text-[10px] px-1.5 py-0.5 rounded shrink-0">
                    MATCH: Stripe Secret Key
                  </span>
                </div>
                <div className="text-[#8b949e] pl-4">14    return new StripeClient(API_KEY);</div>
                <div className="text-[#8b949e] pl-4">15  &#125;;</div>
              </div>
            </div>

            {/* Warning Callout Box */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <Key className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-amber-300 text-xs">
                  CRITICAL PRINCIPLE: NEVER COMMIT CREDENTIALS TO VERSION CONTROL
                </div>
                <p className="text-[#c9d1d9] text-[11px] leading-relaxed">
                  Git is an append-only cryptographic ledger. Once a secret is committed, it remains stored in the repository commit history forever—even if deleted in the next commit! Public scrapers index GitHub commits in seconds.
                </p>
              </div>
            </div>

            {/* 3-Step Remediation Protocol */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#c9d1d9]">
                <div className="text-amber-400 font-bold font-mono">Step 1: .gitignore</div>
                <p className="text-[#8b949e] mt-1">Keep <code>.env</code> strictly in <code>.gitignore</code> so keys never touch Git.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#c9d1d9]">
                <div className="text-amber-400 font-bold font-mono">Step 2: Local .env</div>
                <p className="text-[#8b949e] mt-1">Access locally with <code>process.env.STRIPE_API_KEY</code> on developer laptop.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#c9d1d9]">
                <div className="text-amber-400 font-bold font-mono">Step 3: GitHub Secrets</div>
                <p className="text-[#8b949e] mt-1">Store in Repo Settings &gt; Secrets for secure injection in GitHub Actions.</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Clean Secure Code Preview */}
            <div className="bg-[#050f08]/95 border border-[#2ea043]/30 rounded-xl overflow-hidden font-mono text-xs">
              <div className="bg-[#081a0e] px-3 py-1.5 border-b border-[#2ea043]/20 flex items-center justify-between text-[#8b949e] text-[11px]">
                <span className="flex items-center gap-1.5 text-[#2ea043]">
                  <CheckCircle className="w-3.5 h-3.5" /> src/config/paymentService.ts (Hardened)
                </span>
                <span className="text-[#2ea043] font-bold">Encrypted via GitHub Secrets</span>
              </div>
              <div className="p-3 space-y-1 text-[11px]">
                <div className="text-[#8b949e] pl-4">12  export const initializeStripe = () =&gt; &#123;</div>
                <div className="bg-[#2ea043]/15 border-l-4 border-[#2ea043] px-2 py-1 text-emerald-200 rounded-r">
                  + 13    const API_KEY = process.env.CAMPUS_STRIPE_SECRET_KEY; // ✅ Safe runtime injection
                </div>
                <div className="text-[#8b949e] pl-4">14    return new StripeClient(API_KEY);</div>
                <div className="text-[#8b949e] pl-4">15  &#125;;</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#2ea043]/10 border border-[#2ea043]/30 flex items-center gap-3">
              <Lock className="w-4 h-4 text-[#2ea043] shrink-0" />
              <div className="text-[11px] text-[#c9d1d9]">
                <strong className="text-white font-semibold">Zero Secrets Exposed:</strong> Secrets are stored encrypted with Libsodium in GitHub Repository Secrets and injected at runtime during CI/CD execution.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const RepoHeaderMockup: React.FC<{ activeTab?: string; onTabChange?: (tab: string) => void }> = ({ 
  activeTab = 'Code', 
  onTabChange 
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const tabs = [
    { name: 'Code', icon: FolderGit2 },
    { name: 'Issues', icon: AlertCircle, count: '3' },
    { name: 'Pull requests', icon: GitPullRequest, count: '1' },
    { name: 'Actions', icon: PlayCircle },
    { name: 'Projects', icon: Cpu, count: '1' },
    { name: 'Security', icon: Shield },
    { name: 'Settings', icon: Settings }
  ];

  const handleTabClick = (tabName: string) => {
    setCurrentTab(tabName);
    sound.playClick();
    if (onTabChange) onTabChange(tabName);
  };

  return (
    <div className="w-full bg-[#0d1117] border-b border-[#30363d] px-4 pt-3 pb-0 rounded-t-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <FolderGit2 className="w-4 h-4 text-[#7d8590]" />
          <span className="text-[#58a6ff] hover:underline cursor-pointer">campusconnect</span>
          <span className="text-[#7d8590]">/</span>
          <span className="text-[#58a6ff] hover:underline cursor-pointer font-bold">web</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full border border-[#30363d] text-[#7d8590] font-normal">
            Public
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button 
            onClick={() => sound.playClick()}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#7d8590]" /> Watch <span className="font-mono text-[10px] bg-[#30363d] px-1 rounded">24</span>
          </button>
          <button 
            onClick={() => sound.playClick()}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] transition-colors"
          >
            <GitFork className="w-3.5 h-3.5 text-[#7d8590]" /> Fork <span className="font-mono text-[10px] bg-[#30363d] px-1 rounded">12</span>
          </button>
          <button 
            onClick={() => sound.playSuccess()}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] transition-colors"
          >
            <Star className="w-3.5 h-3.5 text-[#d29922]" /> Star <span className="font-mono text-[10px] bg-[#30363d] px-1 rounded">158</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto text-xs font-medium scrollbar-none">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = tab.name.toLowerCase() === currentTab.toLowerCase();
          return (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 cursor-pointer transition-colors whitespace-nowrap text-left ${
                isActive
                  ? 'border-[#2ea043] text-white font-semibold'
                  : 'border-transparent text-[#7d8590] hover:text-[#c9d1d9]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.name}</span>
              {tab.count && (
                <span className="text-[10px] bg-[#21262d] px-1.5 py-0.2 rounded-full text-[#c9d1d9] border border-[#30363d]">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const PRDetailsMockup: React.FC = () => {
  const [isMerged, setIsMerged] = useState(false);
  const [branchDeleted, setBranchDeleted] = useState(false);

  const handleMerge = () => {
    setIsMerged(true);
    sound.playSuccess();
  };

  const handleDeleteBranch = () => {
    setBranchDeleted(true);
    sound.playClick();
  };

  return (
    <div className="w-full bg-[#010409] border border-[#30363d] rounded-xl overflow-hidden shadow-xl text-xs github-glow">
      <RepoHeaderMockup activeTab="Pull requests" />

      <div className="p-4 space-y-4">
        {/* Title and branches */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-white">
              feat(auth): add student login modal with university email validation
            </h3>
            <span className="text-sm text-[#7d8590]">#12</span>
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {isMerged ? (
              <span className="px-2.5 py-0.5 rounded-full bg-[#8957e5] text-white font-medium flex items-center gap-1 shadow-sm">
                <GitMerge className="w-3.5 h-3.5" /> Merged
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-[#238636] text-white font-medium flex items-center gap-1 shadow-sm">
                <GitPullRequest className="w-3.5 h-3.5" /> Open
              </span>
            )}
            <span className="text-[#7d8590]">
              <strong className="text-white">alexrivera</strong> wants to merge 3 commits into{' '}
              <code className="bg-[#0d1117] px-1.5 py-0.5 rounded text-[#58a6ff] border border-[#30363d]">main</code> from{' '}
              <code className={`px-1.5 py-0.5 rounded text-[#bc8cff] border border-[#30363d] ${branchDeleted ? 'line-through text-[#7d8590] bg-[#21262d]' : 'bg-[#0d1117]'}`}>
                feature/login
              </code>
            </span>
          </div>
        </div>

        {/* Check summary */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#2ea043] font-semibold">
              <CheckCircle2 className="w-4 h-4" /> All automated checks have passed
            </div>
            <span className="text-[#7d8590]">2 successful checks</span>
          </div>
          <div className="text-[11px] text-[#7d8590] flex items-center gap-3 pl-6">
            <span className="text-[#2ea043]">✓ CI / test-and-build (push)</span>
            <span className="text-[#2ea043]">✓ CodeQL Security Analysis</span>
          </div>
        </div>

        {/* Reviewer status */}
        <div className="flex items-center justify-between p-3 bg-[#0d1117] border border-[#30363d] rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#238636] flex items-center justify-center text-white font-bold text-[10px]">
              BC
            </div>
            <div>
              <span className="text-white font-semibold">Bea Chen (Staff Reviewer)</span>
              <span className="text-[#7d8590] ml-2">approved these changes 15m ago</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#23863622] text-[#2ea043] border border-[#23863644] font-medium font-mono text-[11px]">
            Approved
          </span>
        </div>

        {/* Interactive Merge Box */}
        {!isMerged ? (
          <div className="p-3 bg-[#0d1117] border border-[#23863644] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#238636] flex items-center justify-center text-white shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">This branch has no conflicts with base branch</div>
                <div className="text-[#7d8590] text-[11px]">All required reviews and automated checks succeeded.</div>
              </div>
            </div>

            <button 
              onClick={handleMerge}
              className="px-4 py-2 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-bold flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <GitMerge className="w-4 h-4" />
              <span>Merge pull request</span>
            </button>
          </div>
        ) : (
          <div className="p-3.5 bg-[#8957e5]/10 border border-[#8957e5]/40 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#8957e5] flex items-center justify-center text-white shrink-0">
                <GitMerge className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Pull request successfully merged and closed</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#bc8cff]" />
                </div>
                <div className="text-[#7d8590] text-[11px]">You're all set — the feature/login branch can now be safely deleted.</div>
              </div>
            </div>

            {!branchDeleted ? (
              <button 
                onClick={handleDeleteBranch}
                className="px-3.5 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#f85149] hover:text-white border border-[#30363d] font-medium flex items-center justify-center gap-1.5 transition-colors shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete branch</span>
              </button>
            ) : (
              <span className="text-[#7d8590] text-xs italic">Branch feature/login deleted</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

