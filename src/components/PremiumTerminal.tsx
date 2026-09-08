import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal as TerminalIcon, Copy, Check, Play, Pause, RotateCcw, 
  ChevronRight, FastForward, CheckCircle2, RefreshCw, Cpu, Layers, Sparkles 
} from 'lucide-react';
import { sound } from '../utils/sound';

export interface TerminalCommandStep {
  id: string;
  command: string;
  branch?: string;
  directory?: string;
  explanation?: string;
  outputs: Array<{
    text: string;
    type?: 'normal' | 'staged' | 'modified' | 'untracked' | 'success' | 'warning' | 'info' | 'dim';
    delay?: number;
  }>;
}

export interface PremiumTerminalProps {
  title?: string;
  directory?: string;
  branch?: string;
  preset?: 'git-status' | 'github-actions' | 'custom';
  steps?: TerminalCommandStep[];
  autoPlay?: boolean;
  typingSpeedMs?: number; // ms per character
  showControls?: boolean;
  scanlineEffect?: boolean;
  className?: string;
  onStepComplete?: (stepIndex: number) => void;
  onAllComplete?: () => void;
}

// Built-in preset for Slide 11: Git Status & Staging workflow
const GIT_STATUS_PRESET: TerminalCommandStep[] = [
  {
    id: 'status-initial',
    command: 'git status',
    branch: 'main',
    directory: 'CampusConnect/web',
    explanation: 'Inspect working directory before staging. Notice red files indicating unstaged modifications.',
    outputs: [
      { text: 'On branch main', type: 'info' },
      { text: "Your branch is up to date with 'origin/main'.", type: 'dim' },
      { text: '', type: 'normal' },
      { text: 'Changes not staged for commit:', type: 'warning' },
      { text: '  (use "git add <file>..." to update what will be committed)', type: 'dim' },
      { text: '  (use "git restore <file>..." to discard changes in working directory)', type: 'dim' },
      { text: '    modified:   src/App.tsx            [MODIFIED - RED]', type: 'modified' },
      { text: '', type: 'normal' },
      { text: 'Untracked files:', type: 'warning' },
      { text: '  (use "git add <file>..." to include in what will be committed)', type: 'dim' },
      { text: '    src/components/LoginModal.tsx      [UNTRACKED - RED]', type: 'untracked' },
      { text: '', type: 'normal' },
      { text: 'no changes added to commit (use "git add .")', type: 'dim' }
    ]
  },
  {
    id: 'add-files',
    command: 'git add .',
    branch: 'main',
    directory: 'CampusConnect/web',
    explanation: 'Stage all modified and newly created files into the staging index (cart).',
    outputs: [
      { text: '[STAGING] Indexing modified and untracked files into .git/index...', type: 'dim' },
      { text: '  + staged src/App.tsx', type: 'staged' },
      { text: '  + staged src/components/LoginModal.tsx', type: 'staged' },
      { text: '✓ Staging complete: 2 files ready for snapshot.', type: 'success' }
    ]
  },
  {
    id: 'status-staged',
    command: 'git status',
    branch: 'main',
    directory: 'CampusConnect/web',
    explanation: 'Verify that changes are now in the Staging Area, highlighted in green.',
    outputs: [
      { text: 'On branch main', type: 'info' },
      { text: "Your branch is up to date with 'origin/main'.", type: 'dim' },
      { text: '', type: 'normal' },
      { text: 'Changes to be committed:', type: 'success' },
      { text: '  (use "git restore --staged <file>..." to unstage)', type: 'dim' },
      { text: '    new file:   src/components/LoginModal.tsx  [STAGED - GREEN]', type: 'staged' },
      { text: '    modified:   src/App.tsx                   [STAGED - GREEN]', type: 'staged' },
      { text: '', type: 'normal' },
      { text: 'Ready to commit: 2 files staged.', type: 'info' }
    ]
  },
  {
    id: 'commit-files',
    command: 'git commit -m "feat(auth): add student SSO login modal"',
    branch: 'main',
    directory: 'CampusConnect/web',
    explanation: 'Seal changes permanently into the repository snapshot history with a meaningful message.',
    outputs: [
      { text: '[main 8f31a2c] feat(auth): add student SSO login modal', type: 'success' },
      { text: ' 2 files changed, 142 insertions(+), 8 deletions(-)', type: 'info' },
      { text: ' create mode 100644 src/components/LoginModal.tsx', type: 'dim' },
      { text: '✓ Snapshot recorded in .git/objects (HEAD -> main)', type: 'success' }
    ]
  }
];

// Built-in preset for Slide 30/31/32: GitHub Actions Automated Workflow Runner
const GITHUB_ACTIONS_PRESET: TerminalCommandStep[] = [
  {
    id: 'trigger-push',
    command: 'git push origin main',
    branch: 'main',
    directory: 'CampusConnect/web',
    explanation: 'Push commit to GitHub Cloud, automatically triggering .github/workflows/ci.yml.',
    outputs: [
      { text: 'Enumerating objects: 7, done.', type: 'dim' },
      { text: 'Counting objects: 100% (7/7), done.', type: 'dim' },
      { text: 'Compressing objects: 100% (4/4), done.', type: 'dim' },
      { text: 'Writing objects: 100% (4/4), 1.84 KiB | 1.84 MiB/s, done.', type: 'dim' },
      { text: 'To github.com:campusconnect/web.git', type: 'info' },
      { text: '   d4e19a2..8f31a2c  main -> main', type: 'success' },
      { text: '⚡ GitHub Actions webhook received: workflow [CampusConnect CI/CD] triggered.', type: 'warning' }
    ]
  },
  {
    id: 'job-lint',
    command: 'run-job: lint-and-format',
    branch: 'github-actions-vm',
    directory: '/home/runner/work/CampusConnect',
    explanation: 'Step 1: Spin up container, check syntax and TypeScript types.',
    outputs: [
      { text: '==> Setting up Runner (Ubuntu 22.04 LTS)', type: 'dim' },
      { text: '==> actions/checkout@v4 (commit 8f31a2c checked out)', type: 'dim' },
      { text: '==> actions/setup-node@v4 (Node.js v20.12.0 installed)', type: 'dim' },
      { text: '$ eslint . --ext .ts,.tsx', type: 'info' },
      { text: '✓ 0 errors, 0 warnings (Checked 42 source files in 2.1s)', type: 'success' }
    ]
  },
  {
    id: 'job-test',
    command: 'run-job: unit-and-integration-tests',
    branch: 'github-actions-vm',
    directory: '/home/runner/work/CampusConnect',
    explanation: 'Step 2: Execute automated test suite with Jest & React Testing Library.',
    outputs: [
      { text: '$ npm run test -- --ci', type: 'info' },
      { text: ' PASS  src/tests/auth.test.ts (14 tests passed)', type: 'success' },
      { text: ' PASS  src/tests/schedule.test.ts (22 tests passed)', type: 'success' },
      { text: ' PASS  src/tests/components.test.ts (12 tests passed)', type: 'success' },
      { text: 'Test Suites: 3 passed, 3 total', type: 'success' },
      { text: 'Tests:       48 passed, 48 total (coverage 94.2%)', type: 'success' }
    ]
  },
  {
    id: 'job-build-deploy',
    command: 'run-job: production-build-and-deploy',
    branch: 'github-actions-vm',
    directory: '/home/runner/work/CampusConnect',
    explanation: 'Step 3 & 4: Compile production bundle and deploy to global CDN edge.',
    outputs: [
      { text: '$ vite build --mode production', type: 'info' },
      { text: '✓ built in 1.42s', type: 'dim' },
      { text: 'dist/index.html                   0.82 kB │ gzip:  0.44 kB', type: 'dim' },
      { text: 'dist/assets/index-C5Z8qLwX.js   142.18 kB │ gzip: 44.12 kB', type: 'dim' },
      { text: '==> Deploying artifact to Production CDN edge...', type: 'warning' },
      { text: '✓ Deploy SUCCESS! Preview URL: https://campusconnect.edu/releases/latest', type: 'success' },
      { text: '✨ All 4 pipeline jobs completed successfully in 48s.', type: 'success' }
    ]
  }
];

export const PremiumTerminal: React.FC<PremiumTerminalProps> = ({
  title,
  directory,
  branch,
  preset = 'git-status',
  steps: customSteps,
  autoPlay = false,
  typingSpeedMs = 24,
  showControls = true,
  scanlineEffect = true,
  className = '',
  onStepComplete,
  onAllComplete
}) => {
  // Resolve active steps
  const activeSteps = customSteps && customSteps.length > 0 
    ? customSteps 
    : preset === 'github-actions' 
    ? GITHUB_ACTIONS_PRESET 
    : GIT_STATUS_PRESET;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [typedCommand, setTypedCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [revealedOutputCount, setRevealedOutputCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2>(1);
  const [copied, setCopied] = useState(false);
  const terminalLogsRef = useRef<HTMLDivElement>(null);

  const currentStep = activeSteps[currentStepIndex] || activeSteps[0];
  const activeTitle = title || (preset === 'github-actions' ? 'GitHub Actions CI/CD Runner VM' : 'bash — CampusConnect/web');
  const activeDir = directory || currentStep?.directory || 'CampusConnect/web';
  const activeBranch = branch || currentStep?.branch || 'main';

  // Step Reset & Typing Initiation
  useEffect(() => {
    let isCancelled = false;
    setTypedCommand('');
    setIsTyping(true);
    setRevealedOutputCount(0);

    const fullCommand = currentStep.command;
    let charIdx = 0;
    const speed = playbackSpeed === 2 ? Math.max(8, typingSpeedMs / 2) : typingSpeedMs;

    const typingInterval = setInterval(() => {
      if (isCancelled) return;
      if (charIdx < fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, charIdx + 1));
        charIdx++;
        if (charIdx % 3 === 0) {
          sound.playKeypress();
        }
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        sound.playSuccess();
        // Start sequential line reveal
        revealOutputsSequentially();
      }
    }, speed);

    return () => {
      isCancelled = true;
      clearInterval(typingInterval);
    };
  }, [currentStepIndex, playbackSpeed]);

  // Sequential line reveal logic
  const revealOutputsSequentially = () => {
    const totalLines = currentStep.outputs.length;
    let lineIdx = 0;
    const lineIntervalTime = playbackSpeed === 2 ? 80 : 160;

    const lineInterval = setInterval(() => {
      if (lineIdx < totalLines) {
        setRevealedOutputCount((prev) => Math.min(totalLines, prev + 1));
        lineIdx++;
        // Auto-scroll terminal
        if (terminalLogsRef.current) {
          terminalLogsRef.current.scrollTop = terminalLogsRef.current.scrollHeight;
        }
      } else {
        clearInterval(lineInterval);
        if (onStepComplete) {
          onStepComplete(currentStepIndex);
        }
        if (currentStepIndex === activeSteps.length - 1 && onAllComplete) {
          onAllComplete();
        }
      }
    }, lineIntervalTime);
  };

  // Auto-play next step
  useEffect(() => {
    if (!isPlaying) return;
    if (isTyping || revealedOutputCount < currentStep.outputs.length) return;

    const autoTimer = setTimeout(() => {
      if (currentStepIndex < activeSteps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 2000);

    return () => clearTimeout(autoTimer);
  }, [isPlaying, isTyping, revealedOutputCount, currentStepIndex, activeSteps.length]);

  const handleNext = () => {
    if (currentStepIndex < activeSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      sound.playClick();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      sound.playClick();
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setRevealedOutputCount(0);
    setTypedCommand('');
    sound.playClick();
  };

  const handleCopy = () => {
    const fullText = `$ ${currentStep.command}\n` + currentStep.outputs.map(o => o.text).join('\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 1800);
  };

  const renderLineColor = (output: { text: string; type?: string }) => {
    switch (output.type) {
      case 'staged':
        return 'text-[#2ea043] font-semibold';
      case 'modified':
      case 'untracked':
        return 'text-[#f85149] font-medium';
      case 'success':
        return 'text-[#2ea043] font-semibold';
      case 'warning':
        return 'text-[#d29922] font-semibold';
      case 'info':
        return 'text-[#58a6ff]';
      case 'dim':
        return 'text-[#7d8590]';
      default:
        return 'text-[#c9d1d9]';
    }
  };

  return (
    <div className={`w-full max-w-full min-w-0 rounded-xl border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden font-mono text-xs flex flex-col ${className}`}>
      {/* Terminal Window Header */}
      <div className="bg-[#161b22] px-3 sm:px-4 py-2 sm:py-2.5 border-b border-[#30363d] flex flex-wrap items-center justify-between gap-2 select-none">
        {/* Window Dots & Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 max-w-full">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#f85149] opacity-80 hover:opacity-100 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-[#d29922] opacity-80 hover:opacity-100 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-[#2ea043] opacity-80 hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#7d8590] min-w-0">
            <TerminalIcon className="w-3.5 h-3.5 text-[#58a6ff] shrink-0" />
            <span className="text-[#c9d1d9] font-semibold font-sans truncate text-[11px] sm:text-xs">{activeTitle}</span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#21262d] text-[#58a6ff] text-[10px]">
              {activeDir}
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#23863622] text-[#2ea043] text-[10px] border border-[#23863644]">
              git:({activeBranch})
            </span>
          </div>
        </div>

        {/* Step Counter & Interactive Controls */}
        {showControls && (
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs flex-wrap">
            {/* Speed Toggle */}
            <button
              onClick={() => setPlaybackSpeed(s => s === 1 ? 2 : 1)}
              className="px-2 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-[10px] font-sans transition-colors cursor-pointer"
              title="Toggle Typing Speed"
            >
              {playbackSpeed}x Speed
            </button>

            {/* Play / Pause */}
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                sound.playClick();
              }}
              className={`px-2 py-1 rounded text-[10px] font-sans flex items-center gap-1 transition-colors cursor-pointer ${
                isPlaying ? 'bg-[#238636] text-white' : 'bg-[#21262d] text-[#7d8590] hover:text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Auto' : 'Play'}</span>
            </button>

            {/* Restart */}
            <button
              onClick={handleRestart}
              className="p-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[#7d8590] hover:text-white transition-colors cursor-pointer"
              title="Restart Sequence"
            >
              <RotateCcw className="w-3 h-3" />
            </button>

            {/* Copy */}
            <button
              onClick={handleCopy}
              className="px-2 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-[10px] font-sans flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-[#2ea043]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Step Explanation Banner */}
      {currentStep.explanation && (
        <div className="bg-[#090d12] px-3 sm:px-4 py-2 border-b border-[#21262d] flex flex-wrap items-center justify-between gap-2 text-[11px] font-sans">
          <div className="flex items-center gap-2 text-[#c9d1d9] min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff] animate-pulse shrink-0" />
            <span className="font-semibold text-[#58a6ff] shrink-0">
              Step {currentStepIndex + 1} of {activeSteps.length}:
            </span>
            <span className="text-[#8b949e] truncate">{currentStep.explanation}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {activeSteps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentStepIndex(idx);
                  sound.playClick();
                }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentStepIndex
                    ? 'bg-[#2ea043] w-4'
                    : idx < currentStepIndex
                    ? 'bg-[#58a6ff]'
                    : 'bg-[#30363d]'
                }`}
                title={`Jump to step ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Terminal Screen Body */}
      <div 
        ref={terminalLogsRef}
        className="relative p-3 sm:p-4 bg-[#010409] text-[#c9d1d9] min-h-[200px] sm:min-h-[260px] max-h-[380px] overflow-y-auto overflow-x-auto space-y-1.5 select-text"
      >
        {/* Subtle Scanline Overlay */}
        {scanlineEffect && (
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30 z-10" />
        )}

        {/* Active Command Line with Typing Animation */}
        <div className="flex items-center gap-2 text-white font-bold leading-relaxed flex-wrap break-all sm:break-normal">
          <span className="text-[#2ea043] font-mono select-none">
            {activeBranch ? `${activeDir} (${activeBranch}) $` : '$'}
          </span>
          <span className="text-[#58a6ff]">{typedCommand}</span>
          {isTyping ? (
            <span className="inline-block w-2 h-4 bg-[#2ea043] animate-pulse -ml-1 align-middle" />
          ) : (
            <span className="inline-block w-2 h-4 bg-[#7d8590]/50 animate-pulse -ml-1 align-middle" />
          )}
        </div>

        {/* Sequentially Revealed Outputs */}
        <div className="space-y-1 pt-1 font-mono text-xs overflow-x-auto">
          {currentStep.outputs.slice(0, revealedOutputCount).map((output, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`leading-relaxed whitespace-pre font-mono ${renderLineColor(output)}`}
            >
              {output.text === '' ? '\u00A0' : output.text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Terminal Footer Step Navigation */}
      {showControls && (
        <div className="bg-[#161b22] px-3 sm:px-4 py-2 sm:py-2.5 border-t border-[#30363d] flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <span>←</span>
            <span className="hidden sm:inline">Previous Command</span>
            <span className="sm:hidden">Prev</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#7d8590]">
              {currentStepIndex + 1}/{activeSteps.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === activeSteps.length - 1}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer text-xs"
          >
            <span className="hidden sm:inline">Next Command</span>
            <span className="sm:hidden">Next</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
};
