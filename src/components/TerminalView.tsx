import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, Check, Play, Pause, RotateCcw, Sparkles, ChevronRight } from 'lucide-react';
import { sound } from '../utils/sound';

export type TerminalPreset = 
  | 'git-flow' 
  | 'clone' 
  | 'branch' 
  | 'pull-fetch' 
  | 'conflict' 
  | 'actions' 
  | 'api' 
  | 'custom';

export interface TerminalEntry {
  command: string;
  output: string[];
  branch?: string;
  delayMs?: number;
}

export const TERMINAL_PRESETS: Record<Exclude<TerminalPreset, 'custom'>, { title: string; entries: TerminalEntry[] }> = {
  'git-flow': {
    title: 'campusconnect ~/project (feature/login)',
    entries: [
      {
        command: 'git status',
        branch: 'feature/login',
        output: [
          'On branch feature/login',
          'Your branch is up to date with \'origin/feature/login\'.',
          '',
          'Changes not staged for commit:',
          '  (use "git add <file>..." to update what will be committed)',
          '    [MODIFIED - RED] modified:   src/components/LoginModal.tsx',
          '    [MODIFIED - RED] modified:   src/services/authApi.ts',
          '',
          'Untracked files:',
          '  (use "git add <file>..." to include in what will be committed)',
          '    [UNTRACKED - RED] src/types/userSession.ts',
          '',
          'no changes added to commit (use "git add .")'
        ]
      },
      {
        command: 'git add .',
        branch: 'feature/login',
        output: [
          '[STAGED - GREEN] Changes to be committed:',
          '  [STAGED - GREEN]   modified:   src/components/LoginModal.tsx',
          '  [STAGED - GREEN]   modified:   src/services/authApi.ts',
          '  [STAGED - GREEN]   new file:   src/types/userSession.ts'
        ]
      },
      {
        command: 'git commit -m "feat(auth): add student SSO login modal and session types"',
        branch: 'feature/login',
        output: [
          '[feature/login 8f31a2c] feat(auth): add student SSO login modal and session types',
          ' 3 files changed, 94 insertions(+), 12 deletions(-)',
          ' create mode 100644 src/types/userSession.ts'
        ]
      },
      {
        command: 'git push origin feature/login',
        branch: 'feature/login',
        output: [
          'Enumerating objects: 11, done.',
          'Counting objects: 100% (11/11), done.',
          'Delta compression using up to 8 threads',
          'Compressing objects: 100% (6/6), done.',
          'Writing objects: 100% (6/6), 1.42 KiB | 1.42 MiB/s, done.',
          'Total 6 (delta 4), reused 0 (delta 0), pack-reused 0',
          'remote: Resolving deltas: 100% (4/4), completed with 4 local objects.',
          'To https://github.com/campusconnect/web.git',
          '   4b901fc..8f31a2c  feature/login -> feature/login',
          'Branch \'feature/login\' set up to track remote branch \'feature/login\' from \'origin\'.'
        ]
      }
    ]
  },
  'clone': {
    title: 'laptop ~/developer',
    entries: [
      {
        command: 'git clone https://github.com/campusconnect/web.git',
        branch: 'main',
        output: [
          'Cloning into \'web\'...',
          'remote: Enumerating objects: 284, done.',
          'remote: Counting objects: 100% (284/284), done.',
          'remote: Compressing objects: 100% (148/148), done.',
          'remote: Total 284 (delta 132), reused 260 (delta 118), pack-reused 0',
          'Receiving objects: 100% (284/284), 3.42 MiB | 12.40 MiB/s, done.',
          'Resolving deltas: 100% (132/132), done.'
        ]
      },
      {
        command: 'cd web && ls -la',
        branch: 'main',
        output: [
          'drwxr-xr-x  8 alex staff   256 Feb 28 10:14 .',
          'drwxr-xr-x  8 alex staff   256 Feb 28 10:14 .git',
          '-rw-r--r--  1 alex staff   420 Feb 28 10:14 .gitignore',
          '-rw-r--r--  1 alex staff  2410 Feb 28 10:14 README.md',
          '-rw-r--r--  1 alex staff  1120 Feb 28 10:14 package.json',
          'drwxr-xr-x  4 alex staff   128 Feb 28 10:14 public',
          'drwxr-xr-x 12 alex staff   384 Feb 28 10:14 src'
        ]
      }
    ]
  },
  'branch': {
    title: 'campusconnect ~/web (main)',
    entries: [
      {
        command: 'git branch -a',
        branch: 'main',
        output: [
          '* [STAGED - GREEN] main',
          '  remotes/origin/HEAD -> origin/main',
          '  remotes/origin/main',
          '  remotes/origin/feature/login'
        ]
      },
      {
        command: 'git switch -c feature/student-grades',
        branch: 'feature/student-grades',
        output: [
          'Switched to a new branch \'feature/student-grades\'',
          'Your branch is based on \'main\'.'
        ]
      },
      {
        command: 'git status',
        branch: 'feature/student-grades',
        output: [
          'On branch feature/student-grades',
          'nothing to commit, working tree clean'
        ]
      }
    ]
  },
  'pull-fetch': {
    title: 'campusconnect ~/web (main)',
    entries: [
      {
        command: 'git fetch origin',
        branch: 'main',
        output: [
          'remote: Enumerating objects: 7, done.',
          'remote: Counting objects: 100% (7/7), done.',
          'remote: Compressing objects: 100% (4/4), done.',
          'remote: Total 4 (delta 2), reused 4 (delta 2)',
          'From https://github.com/campusconnect/web',
          '   8f31a2c..31ac910  main       -> origin/main',
          ' * [new branch]      feature/sso -> origin/feature/sso'
        ]
      },
      {
        command: 'git status',
        branch: 'main',
        output: [
          'On branch main',
          'Your branch is behind \'origin/main\' by 2 commits, and can be fast-forwarded.',
          '  (use "git pull" to update your local branch)'
        ]
      },
      {
        command: 'git pull origin main',
        branch: 'main',
        output: [
          'Updating 8f31a2c..31ac910',
          'Fast-forward',
          ' src/App.tsx            | 14 +++++++++++---',
          ' src/config/app.ts      |  2 +- ',
          ' 2 files changed, 12 insertions(+), 4 deletions(-)'
        ]
      }
    ]
  },
  'conflict': {
    title: 'campusconnect ~/web (main)',
    entries: [
      {
        command: 'git merge feature/profile',
        branch: 'main',
        output: [
          'Auto-merging src/App.tsx',
          '[MODIFIED - RED] CONFLICT (content): Merge conflict in src/App.tsx',
          'Automatic merge failed; fix conflicts and then commit the result.',
          '',
          'hint: Fix conflicts in working directory, then "git add <file>"',
          'hint: and commit the result with "git commit"'
        ]
      },
      {
        command: 'git diff --name-only --diff-filter=U',
        branch: 'main|MERGING',
        output: [
          'src/App.tsx (unmerged conflict)'
        ]
      }
    ]
  },
  'actions': {
    title: 'github-runner-ubuntu-latest (CI/CD Pipeline)',
    entries: [
      {
        command: 'npm ci',
        branch: 'main',
        output: [
          'added 342 packages in 2.812s',
          '0 vulnerabilities found'
        ]
      },
      {
        command: 'npm test -- --coverage',
        branch: 'main',
        output: [
          'PASS src/services/authApi.test.ts',
          'PASS src/components/LoginModal.test.ts',
          '',
          'Test Suites: 2 passed, 2 total',
          'Tests:       14 passed, 14 total',
          'Snapshots:   0 total',
          'Time:        1.428 s'
        ]
      },
      {
        command: 'npm run build',
        branch: 'main',
        output: [
          'vite v5.4.0 building for production...',
          '✓ 142 modules transformed.',
          'dist/index.html                   3.14 kB │ gzip: 1.20 kB',
          'dist/assets/index-D91a20b.css    18.42 kB │ gzip: 4.10 kB',
          'dist/assets/index-Bf92c10.js   148.91 kB │ gzip: 48.20 kB',
          '✓ built in 382ms',
          '[STAGED - GREEN] SUCCESS: Artifact ready for production deployment.'
        ]
      }
    ]
  },
  'api': {
    title: 'developer@terminal ~',
    entries: [
      {
        command: 'curl -s https://api.github.com/users/Sangamlabs | jq \'{login, public_repos, followers, bio}\'',
        branch: 'bash',
        output: [
          '{',
          '  "login": "Sangamlabs",',
          '  "public_repos": 42,',
          '  "followers": 158,',
          '  "bio": "Full-Stack Engineer & CampusConnect Lead Maintainer",',
          '  "location": "San Francisco, CA",',
          '  "blog": "https://campusconnect.dev",',
          '  "status": "Ready for Open Source Collaboration"',
          '}'
        ]
      }
    ]
  }
};

interface TerminalViewProps {
  initialCommand?: string;
  outputLines?: string[];
  title?: string;
  preset?: TerminalPreset;
  interactiveSteps?: { cmd: string; note: string; output?: string[] }[];
  autoPlay?: boolean;
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  initialCommand = 'git status',
  outputLines = [],
  title,
  preset,
  interactiveSteps,
  autoPlay = false
}) => {
  const [copied, setCopied] = useState(false);
  const [currentEntryIndex, setCurrentEntryIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [revealedOutputCount, setRevealedOutputCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Normalize entries: preset > interactiveSteps > default props
  let entries: TerminalEntry[] = [];
  let terminalTitle = title;

  if (preset && preset !== 'custom' && TERMINAL_PRESETS[preset]) {
    entries = TERMINAL_PRESETS[preset].entries;
    terminalTitle = terminalTitle || TERMINAL_PRESETS[preset].title;
  } else if (interactiveSteps && interactiveSteps.length > 0) {
    entries = interactiveSteps.map(step => ({
      command: step.cmd,
      output: step.output || [],
      branch: step.cmd.includes('main') ? 'main' : 'feature/login'
    }));
    terminalTitle = terminalTitle || 'bash — CampusConnect/web';
  } else {
    entries = [
      {
        command: initialCommand,
        output: outputLines,
        branch: 'main'
      }
    ];
    terminalTitle = terminalTitle || 'bash — CampusConnect/web';
  }

  const currentEntry = entries[currentEntryIndex] || entries[0];
  const activeCmd = currentEntry.command;
  const activeOutputs = currentEntry.output;
  const activeBranch = currentEntry.branch || 'main';

  // Typing effect
  useEffect(() => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    setDisplayedChars(0);
    setRevealedOutputCount(0);

    let charIdx = 0;
    typingTimerRef.current = setInterval(() => {
      if (charIdx < activeCmd.length) {
        charIdx++;
        setDisplayedChars(charIdx);
        sound.playKeypress();
      } else {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        // Start revealing output lines with small delay
        revealOutputs();
      }
    }, 28);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [currentEntryIndex, activeCmd]);

  const revealOutputs = () => {
    let outIdx = 0;
    const outTimer = setInterval(() => {
      if (outIdx < activeOutputs.length) {
        outIdx++;
        setRevealedOutputCount(outIdx);
      } else {
        clearInterval(outTimer);
      }
    }, 45);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCmd);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    if (currentEntryIndex < entries.length - 1) {
      setCurrentEntryIndex(prev => prev + 1);
      sound.playClick();
    }
  };

  const handlePrev = () => {
    if (currentEntryIndex > 0) {
      setCurrentEntryIndex(prev => prev - 1);
      sound.playClick();
    }
  };

  const handleReset = () => {
    setCurrentEntryIndex(0);
    sound.playClick();
  };

  const isComplete = displayedChars >= activeCmd.length;

  return (
    <div className="w-full max-w-full min-w-0 bg-[#010409]/95 border border-[#30363d] rounded-xl overflow-hidden shadow-2xl font-mono text-sm github-glow transition-all duration-300">
      {/* Terminal Title Bar */}
      <div className="bg-[#0d1117] px-3 sm:px-4 py-2 sm:py-2.5 border-b border-[#30363d] flex flex-wrap items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-2 min-w-0 max-w-full">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#f85149] hover:opacity-80 transition-opacity cursor-pointer shadow-sm" title="Close" />
            <span className="w-3 h-3 rounded-full bg-[#d29922] hover:opacity-80 transition-opacity cursor-pointer shadow-sm" title="Minimize" />
            <span className="w-3 h-3 rounded-full bg-[#2ea043] hover:opacity-80 transition-opacity cursor-pointer shadow-sm" title="Expand" />
          </div>
          <div className="flex items-center gap-2 ml-1.5 sm:ml-3 text-xs text-[#7d8590] min-w-0 truncate">
            <Terminal className="w-3.5 h-3.5 text-[#2ea043] shrink-0" />
            <span className="font-sans font-medium text-[#c9d1d9] truncate text-xs">{terminalTitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {entries.length > 1 && (
            <div className="flex items-center gap-1.5 text-xs text-[#7d8590]">
              <span className="font-mono text-[11px] text-[#2ea043]">
                {currentEntryIndex + 1}/{entries.length}
              </span>
              <button
                onClick={handlePrev}
                disabled={currentEntryIndex === 0}
                className="px-2 py-0.5 rounded bg-[#21262d] text-white hover:bg-[#30363d] disabled:opacity-30 transition-colors text-[11px]"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={currentEntryIndex >= entries.length - 1}
                className="px-2 py-0.5 rounded bg-[#238636] text-white hover:bg-[#2ea043] disabled:opacity-30 transition-colors flex items-center gap-1 text-[11px] font-medium"
              >
                Next <ChevronRight className="w-3 h-3" />
              </button>
              <button
                onClick={handleReset}
                className="p-1 rounded bg-[#21262d] text-[#7d8590] hover:text-white transition-colors"
                title="Reset steps"
              >
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
            </div>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white transition-colors border border-[#30363d]"
            title="Copy current command to clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-[#2ea043]" /> : <Copy className="w-3 h-3 text-[#7d8590]" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-3 sm:p-5 text-[#c9d1d9] space-y-3 min-h-[190px] select-text bg-[#010409] overflow-x-auto">
        {/* Active command line with blinking cursor */}
        <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm font-mono">
          <span className="text-[#2ea043] font-bold">campusconnect</span>
          <span className="text-[#7d8590]">:</span>
          <span className="text-[#58a6ff] font-semibold">~/project</span>
          <span className="text-[#bc8cff] text-xs">
            ({activeBranch})
          </span>
          <span className="text-white font-bold">$</span>
          <span className="text-white font-semibold tracking-wide">
            {activeCmd.slice(0, displayedChars)}
          </span>
          <span 
            className={`inline-block w-2 h-4 bg-[#2ea043] ${isComplete ? 'animate-pulse' : 'opacity-100'}`} 
          />
        </div>

        {/* Step contextual note if available */}
        {interactiveSteps && interactiveSteps[currentEntryIndex]?.note && (
          <div className="text-xs text-[#c9d1d9] bg-[#0d1117] border-l-2 border-[#2ea043] pl-3 py-1.5 my-2.5 rounded-r-md flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#2ea043] shrink-0" />
            <span>{interactiveSteps[currentEntryIndex].note}</span>
          </div>
        )}

        {/* Output lines with color parsing */}
        {activeOutputs.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[#21262d] space-y-1 font-mono text-xs overflow-x-auto">
            {activeOutputs.slice(0, revealedOutputCount).map((line, idx) => {
              const isGreen = line.includes('[STAGED - GREEN]') || line.includes('new file:') || line.includes('Changes to be committed') || line.includes('Fast-forward') || line.includes('PASS') || line.includes('SUCCESS');
              const isRed = line.includes('[MODIFIED - RED]') || line.includes('[UNTRACKED - RED]') || line.includes('modified:') || line.includes('CONFLICT') || line.includes('error:');
              const isBlue = line.includes('On branch') || line.includes('Your branch') || line.includes('Switched to') || line.includes('To https://') || line.includes('Cloning into');
              const isYellow = line.includes('warning:') || line.includes('hint:');
              
              return (
                <div
                  key={idx}
                  className={`leading-relaxed whitespace-pre font-mono ${
                    isGreen ? 'text-[#2ea043]' :
                    isRed ? 'text-[#f85149]' :
                    isBlue ? 'text-[#58a6ff]' :
                    isYellow ? 'text-[#d29922]' :
                    line.trim() === '' ? 'h-2' : 'text-[#7d8590]'
                  }`}
                >
                  {line}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive step selector pills if multiple entries */}
      {entries.length > 1 && (
        <div className="bg-[#0d1117] px-4 py-2 border-t border-[#30363d] flex items-center gap-2 overflow-x-auto scrollbar-none">
          {entries.map((entry, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentEntryIndex(idx);
                sound.playClick();
              }}
              className={`text-xs px-2.5 py-1 rounded-md transition-all whitespace-nowrap font-mono ${
                currentEntryIndex === idx
                  ? 'bg-[#238636] text-white font-medium shadow-sm'
                  : 'bg-[#21262d] text-[#7d8590] hover:text-white hover:bg-[#30363d]'
              }`}
            >
              $ {entry.command.split(' ')[1] ? `${entry.command.split(' ')[0]} ${entry.command.split(' ')[1]}` : entry.command}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
