import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Github, MapPin, Link2, Twitter, Users, Star, 
  GitFork, BookOpen, Terminal, Sparkles, Code2, CheckCircle2, 
  Activity, Award, Calendar, FolderGit2, Shield, Heart, ExternalLink,
  Flame, Zap, Laptop, ChevronDown, Check, Copy, Monitor, Cpu,
  Layers, Database, Compass, Eye, Play, Send, MessageSquare, Mail,
  Linkedin, FileText, CheckCircle
} from 'lucide-react';
import { sound } from '../utils/sound';

interface ProfileTourProps {
  onExit: () => void;
}

export const ProfileTour: React.FC<ProfileTourProps> = ({ onExit }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'repositories' | 'projects' | 'packages' | 'stars'>('overview');
  
  // Interactive embedded terminal in README
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ cmd: string; resp: string[] }>>([
    {
      cmd: 'whoami',
      resp: ['sangam — Full Stack Dev • AI Engineer • Tech Architect', 'Location: San Francisco, CA / Global', 'Focus: Modern Web Architectures & CI/CD Pipelines']
    },
    {
      cmd: 'cat stack.json',
      resp: ['{', '  "frontend": ["React", "TypeScript", "Vite", "TailwindCSS"],', '  "backend": ["Node.js", "Express", "PostgreSQL", "GraphQL"],', '  "devops": ["GitHub Actions", "Docker", "Cloud Run"]', '}']
    }
  ]);

  // Mini README preview editable state
  const [previewHeadline, setPreviewHeadline] = useState("Hi there, I'm Alex 👋");
  const [previewRole, setPreviewRole] = useState("Aspiring Full-Stack Software Engineer & CampusConnect Contributor");
  const [previewTech, setPreviewTech] = useState("TypeScript, React, Node.js, Git, Python");

  const copyProfileLink = () => {
    navigator.clipboard.writeText('https://github.com/Sangamlabs');
    setCopiedLink(true);
    sound.playClick();
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    let resp: string[] = [];

    if (cmd === 'help') {
      resp = ['Available commands: whoami, cat stack.json, git status, projects, clear, contact'];
    } else if (cmd === 'git status') {
      resp = ['On branch main', 'Your branch is up to date with \'origin/main\'.', 'nothing to commit, working tree clean'];
    } else if (cmd === 'projects') {
      resp = ['- CampusConnect (Student Portal Platform)', '- GitHub Masterclass Deck (Interactive React Presentation)', '- DevOps Automated Pipeline Kit'];
    } else if (cmd === 'contact') {
      resp = ['Email: sangam@sangamlabs.dev', 'GitHub: https://github.com/Sangamlabs', 'Twitter: @sangam_dev'];
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      sound.playClick();
      return;
    } else {
      resp = [`bash: ${cmd}: command not found. Type 'help' for valid commands.`];
    }

    setTerminalLogs(prev => [...prev, { cmd, resp }]);
    setTerminalInput('');
    sound.playKeypress();
  };

  // Generate 52 weeks x 7 days GitHub green contribution heatmap
  const weeks = 52;
  const days = 7;
  const contributionGrid = Array.from({ length: weeks }, (_, w) => 
    Array.from({ length: days }, (_, d) => {
      const val = (Math.sin(w * 0.42 + d * 0.75) * 12 + Math.cos(w * 0.18) * 6 + 18) % 5;
      const count = Math.floor(Math.max(0, val));
      return {
        count: (w > 46 && d === 0) ? 0 : count,
        level: count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : count === 3 ? 3 : 4
      };
    })
  );

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-[#0e4429]';
      case 2: return 'bg-[#006d32]';
      case 3: return 'bg-[#26a641]';
      case 4: return 'bg-[#39d353]';
      default: return 'bg-[#161b22]';
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans pb-28 selection:bg-[#238636] selection:text-white">
      {/* 1. STICKY GITHUB-STYLE PROFILE HEADER */}
      <header className="sticky top-0 z-50 bg-[#161b22]/95 backdrop-blur-md border-b border-[#30363d] px-4 sm:px-8 py-2.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playTransition();
              onExit();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>EXIT PROFILE TOUR</span>
          </button>
          <span className="text-xs text-[#7d8590] hidden md:inline">
            github.com/Sangamlabs • Simulated Public Profile View
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Sangamlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-xs font-semibold text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>Open Real GitHub Profile ↗</span>
          </a>
          <span className="w-2 h-2 rounded-full bg-[#2ea043] animate-ping" />
        </div>
      </header>

      {/* GitHub Standard Nav Header Tabs */}
      <nav className="bg-[#010409] border-b border-[#30363d] px-4 sm:px-8 pt-3 sticky top-[51px] z-40">
        <div className="max-w-6xl mx-auto flex items-center gap-6 text-sm font-medium overflow-x-auto scrollbar-none">
          <button 
            onClick={() => { setActiveTab('overview'); sound.playClick(); }}
            className={`pb-2.5 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'overview' 
                ? 'border-[#f78166] text-white font-semibold' 
                : 'border-transparent text-[#7d8590] hover:text-[#c9d1d9]'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Overview
          </button>
          <button 
            onClick={() => { setActiveTab('repositories'); sound.playClick(); }}
            className={`pb-2.5 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'repositories' 
                ? 'border-[#f78166] text-white font-semibold' 
                : 'border-transparent text-[#7d8590] hover:text-[#c9d1d9]'
            }`}
          >
            <FolderGit2 className="w-4 h-4" /> Repositories 
            <span className="text-xs px-1.5 py-0.2 rounded-full bg-[#21262d] text-[#c9d1d9] font-mono">42</span>
          </button>
          <button 
            onClick={() => { setActiveTab('projects'); sound.playClick(); }}
            className={`pb-2.5 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'projects' 
                ? 'border-[#f78166] text-white font-semibold' 
                : 'border-transparent text-[#7d8590] hover:text-[#c9d1d9]'
            }`}
          >
            <Laptop className="w-4 h-4" /> Projects 
            <span className="text-xs px-1.5 py-0.2 rounded-full bg-[#21262d] text-[#c9d1d9] font-mono">6</span>
          </button>
          <button 
            onClick={() => { setActiveTab('packages'); sound.playClick(); }}
            className={`pb-2.5 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'packages' 
                ? 'border-[#f78166] text-white font-semibold' 
                : 'border-transparent text-[#7d8590] hover:text-[#c9d1d9]'
            }`}
          >
            <Layers className="w-4 h-4" /> Packages
          </button>
          <button 
            onClick={() => { setActiveTab('stars'); sound.playClick(); }}
            className={`pb-2.5 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'stars' 
                ? 'border-[#f78166] text-white font-semibold' 
                : 'border-transparent text-[#7d8590] hover:text-[#c9d1d9]'
            }`}
          >
            <Star className="w-4 h-4" /> Stars 
            <span className="text-xs px-1.5 py-0.2 rounded-full bg-[#21262d] text-[#c9d1d9] font-mono">312</span>
          </button>
        </div>
      </nav>

      {/* Main Profile Grid Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* 2. LEFT COLUMN: PROFILE IDENTITY */}
        <aside className="md:col-span-4 lg:col-span-3 space-y-4">
          <div className="relative group">
            {/* Avatar with subtle glow */}
            <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border-2 border-[#30363d] overflow-hidden bg-gradient-to-tr from-[#1f6feb] via-[#238636] to-[#d29922] p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-[#0d1117] flex items-center justify-center overflow-hidden">
                <Github className="w-24 h-24 text-white group-hover:scale-105 transition-transform duration-300" />
              </div>
            </div>
            {/* Status pill */}
            <div className="absolute bottom-2 right-4 sm:right-6 bg-[#21262d] border border-[#30363d] rounded-full px-2.5 py-1 text-xs flex items-center gap-1.5 shadow-md">
              <span className="text-sm">🎯</span>
              <span className="text-[11px] font-medium text-[#c9d1d9]">Architecting CampusConnect</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">SANGAM SINGH</h1>
            <h2 className="text-[#7d8590] text-base font-mono">Sangamlabs</h2>
            <div className="mt-1 text-xs font-semibold text-[#58a6ff]">
              Full Stack Dev • AI Engineer • Tech Architect
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#c9d1d9] leading-relaxed">
            Crafting enterprise cloud solutions, full-stack applications, and open-source developer toolkits. Passionate about Git workflows, trunk-based CI/CD, and system architecture.
          </p>

          <div className="flex gap-2">
            <button
              onClick={copyProfileLink}
              className="flex-1 py-1.5 px-3 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#2ea043]" /> : <Copy className="w-3.5 h-3.5 text-[#7d8590]" />}
              <span>{copiedLink ? 'Copied Profile URL' : 'Share Profile'}</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#7d8590] pt-2 border-t border-[#30363d]">
            <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
              <Users className="w-4 h-4" />
              <strong className="text-white">194</strong> followers
            </div>
            <span>•</span>
            <div className="hover:text-[#58a6ff] cursor-pointer">
              <strong className="text-white">112</strong> following
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#7d8590] pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#7d8590]" />
              <span>San Francisco, CA / Remote</span>
            </div>
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-[#7d8590]" />
              <a href="https://campusconnect.dev" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline">
                https://campusconnect.dev
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Twitter className="w-4 h-4 text-[#7d8590]" />
              <span className="text-[#c9d1d9]">@sangam_dev</span>
            </div>
          </div>

          {/* Badges / Achievements */}
          <div className="pt-3 border-t border-[#30363d] space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#7d8590]">Achievements</div>
            <div className="flex flex-wrap gap-1.5">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#238636]/15 border border-[#238636]/30 text-[11px] text-[#2ea043]">
                <Zap className="w-3 h-3" /> Pull Shark
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#d29922]/15 border border-[#d29922]/30 text-[11px] text-[#d29922]">
                <Star className="w-3 h-3" /> Starstruck
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#58a6ff]/15 border border-[#58a6ff]/30 text-[11px] text-[#58a6ff]">
                <Shield className="w-3 h-3" /> Security Champion
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN COLUMN: README + REPOSITORIES + CONTRIBUTIONS + TEACHING SECTION */}
        <main className="md:col-span-8 lg:col-span-9 space-y-8">
          {/* 3. PINNED REPOSITORIES SECTION */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-[#7d8590]" /> Pinned Repositories
              </h3>
              <span className="text-xs text-[#58a6ff] hover:underline cursor-pointer">Customize pins</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Pin 1: CampusConnect */}
              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-2.5 hover:border-[#58a6ff] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#58a6ff] hover:underline cursor-pointer font-mono">
                    campusconnect/web
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#30363d] text-[#7d8590]">
                    Public
                  </span>
                </div>
                <p className="text-xs text-[#7d8590] line-clamp-2">
                  Full-stack university portal platform with SSO auth, course registration, and automated GitHub Actions CI/CD workflows.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#7d8590] font-mono pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3178c6]" /> TypeScript
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#d29922]" /> 184
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" /> 36
                  </span>
                </div>
              </div>

              {/* Pin 2: Git Masterclass */}
              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-2.5 hover:border-[#58a6ff] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#58a6ff] hover:underline cursor-pointer font-mono">
                    github-masterclass-interactive
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#30363d] text-[#7d8590]">
                    Public
                  </span>
                </div>
                <p className="text-xs text-[#7d8590] line-clamp-2">
                  Interactive developer deck teaching Git & GitHub fundamentals, terminal simulations, code reviews, and enterprise best practices.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#7d8590] font-mono pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2ea043]" /> React + Vite
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#d29922]" /> 96
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" /> 22
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. THE COMPLETE README SHOWCASE */}
          <section className="bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden shadow-xl">
            {/* README Header Bar */}
            <div className="bg-[#161b22] px-4 py-2.5 border-b border-[#30363d] flex items-center justify-between text-xs text-[#7d8590]">
              <div className="flex items-center gap-2 font-mono">
                <BookOpen className="w-4 h-4 text-[#7d8590]" />
                <span className="text-white font-bold">Sangamlabs / README.md</span>
              </div>
              <span className="text-[11px] bg-[#21262d] px-2 py-0.5 rounded text-[#7d8590] font-mono">
                Special Profile Repository
              </span>
            </div>

            <div className="p-6 space-y-8">
              {/* README Hero Banner */}
              <div className="border-b border-[#30363d] pb-6 text-center sm:text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-[#23863622] text-[#2ea043] border border-[#23863644] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  PORTFOLIO ARCHITECTURE // SANGAMLABS
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  SANGAM SINGH
                </h2>
                <div className="text-sm font-mono text-[#58a6ff] mt-1 font-semibold">
                  Full Stack Dev • AI Engineer • Tech Architect
                </div>
                <p className="text-xs sm:text-sm text-[#7d8590] mt-2 max-w-2xl leading-relaxed">
                  Building dependable distributed systems, modern web experiences, and developer automation tooling. Committed to transparent open-source code and engineering mentorship.
                </p>
              </div>

              {/* System Status Section */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#7d8590] flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#2ea043]" />
                  <span>System Status</span>
                </div>
                <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#2ea043] animate-pulse" />
                    <div>
                      <div className="font-bold text-white">CORE STATUS: ONLINE &amp; OPERATIONAL</div>
                      <div className="text-[#7d8590]">Active Focus: CampusConnect Release v1.0.0 Architecture</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] bg-[#0d1117] px-3 py-1.5 rounded-lg border border-[#30363d]">
                    <span className="text-[#7d8590]">DEPLOYMENT:</span>
                    <span className="text-[#2ea043] font-bold">100% HEALTHY</span>
                  </div>
                </div>
              </div>

              {/* Dev Analytics & Dev Metrics */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#7d8590] flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-[#58a6ff]" />
                    <span>Dev Analytics &amp; Dev Metrics</span>
                  </div>
                  <span className="text-[10px] text-[#7d8590] italic">
                    *README self-presented metric
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#161b22] border border-[#30363d]">
                    <div className="text-xl sm:text-2xl font-bold text-white font-mono">1,840+</div>
                    <div className="text-[11px] text-[#7d8590] mt-0.5">Commits Across Repos</div>
                    <span className="text-[9px] text-[#2ea043] block mt-1 font-mono">README metric</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#161b22] border border-[#30363d]">
                    <div className="text-xl sm:text-2xl font-bold text-[#58a6ff] font-mono">99.1%</div>
                    <div className="text-[11px] text-[#7d8590] mt-0.5">CI/CD Pass Rate</div>
                    <span className="text-[9px] text-[#58a6ff] block mt-1 font-mono">Actions verified</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#161b22] border border-[#30363d]">
                    <div className="text-xl sm:text-2xl font-bold text-[#2ea043] font-mono">42</div>
                    <div className="text-[11px] text-[#7d8590] mt-0.5">Public Repositories</div>
                    <span className="text-[9px] text-[#2ea043] block mt-1 font-mono">GitHub tracked</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#161b22] border border-[#30363d]">
                    <div className="text-xl sm:text-2xl font-bold text-[#d29922] font-mono">312★</div>
                    <div className="text-[11px] text-[#7d8590] mt-0.5">Stars Earned</div>
                    <span className="text-[9px] text-[#d29922] block mt-1 font-mono">Community stars</span>
                  </div>
                </div>
              </div>

              {/* Tech Stack Analysis */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#7d8590] flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#bc8cff]" />
                  <span>Tech Stack Analysis</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-[#58a6ff]" /> Frontend Systems
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['React 18+', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js', 'Framer Motion'].map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] font-mono text-[11px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-[#2ea043]" /> Backend &amp; Data
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Node.js', 'Express', 'PostgreSQL', 'GraphQL', 'REST API', 'Redis'].map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] font-mono text-[11px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#d29922]" /> Cloud, DevOps &amp; AI
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['GitHub Actions', 'Docker', 'Google Cloud', 'Linux / Bash', 'Gemini AI', 'CI/CD'].map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] font-mono text-[11px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer Profile & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#58a6ff]" /> Developer Profile Highlights
                  </div>
                  <ul className="space-y-1.5 text-[#c9d1d9] leading-relaxed list-disc list-inside">
                    <li>Architecting CampusConnect as open-source student platform</li>
                    <li>Advocate of trunk-based development &amp; zero-defect pipelines</li>
                    <li>Conducts technical workshops on modern Git &amp; GitHub workflows</li>
                    <li>Believes clean code reviews build team empathy &amp; resilience</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-[#2ea043]" /> Development Environment
                  </div>
                  <div className="space-y-1.5 text-[#7d8590] font-mono text-[11px]">
                    <div>OS: <span className="text-white">macOS / Arch Linux</span></div>
                    <div>Editor: <span className="text-white">VS Code (GitHub Dark Theme)</span></div>
                    <div>Terminal: <span className="text-white">Zsh + Starship Prompt</span></div>
                    <div>Hardware: <span className="text-white">Apple Silicon M3 Max • 36GB Unified</span></div>
                  </div>
                </div>
              </div>

              {/* Embedded Interactive Terminal in README */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#7d8590] flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#2ea043]" />
                    <span>Interactive README Terminal</span>
                  </div>
                  <span className="text-[10px] text-[#7d8590]">Try commands: whoami, projects, help, contact</span>
                </div>

                <div className="bg-[#010409] border border-[#30363d] rounded-xl p-4 font-mono text-xs shadow-inner space-y-3">
                  {/* Previous command logs */}
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-2 text-[#7d8590]">
                        <span className="text-[#2ea043] font-bold">sangam@sangamlabs</span>
                        <span>:~$</span>
                        <span className="text-white font-semibold">{log.cmd}</span>
                      </div>
                      {log.resp.map((line, lIdx) => (
                        <div key={lIdx} className="text-[#c9d1d9] pl-4 leading-relaxed">
                          {line}
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Active input line */}
                  <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-1">
                    <span className="text-[#2ea043] font-bold">sangam@sangamlabs</span>
                    <span className="text-[#7d8590]">:~$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={e => setTerminalInput(e.target.value)}
                      placeholder="type 'help' or any command and press Enter..."
                      className="flex-1 bg-transparent text-white outline-none font-mono text-xs placeholder:text-[#484f58]"
                    />
                    <button type="submit" className="text-[#7d8590] hover:text-[#2ea043] transition-colors p-1">
                      <Send className="w-3 h-3" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Connect & Collaborate */}
              <div className="pt-4 border-t border-[#30363d] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Mail className="w-4 h-4 text-[#58a6ff]" /> Connect &amp; Collaborate
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <a
                    href="https://github.com/Sangamlabs"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                  <a
                    href="https://twitter.com/sangam_dev"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5 text-[#38bdf8]" /> Twitter
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#58a6ff]" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 5. CONTRIBUTIONS HEATMAP */}
          <section className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">1,840 contributions in the last year</h3>
                <p className="text-xs text-[#7d8590]">Consistent open-source pull requests, commits, and issue discussions</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-md font-medium bg-[#238636] text-white">
                  52-Week Matrix Heatmap
                </span>
              </div>
            </div>

            {/* Matrix Heatmap */}
            <div className="p-3 bg-[#010409] rounded-lg border border-[#30363d] overflow-x-auto">
              <div className="inline-flex gap-1">
                {contributionGrid.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1">
                    {week.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        title={`Week ${wIdx + 1}, Day ${dIdx + 1}: ${day.count} contributions`}
                        className={`w-3 h-3 rounded-[2px] ${getLevelColor(day.level)} hover:ring-1 hover:ring-white transition-all cursor-pointer`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 text-[11px] text-[#7d8590]">
                <span>Contributions recorded via Git commits &amp; GitHub PRs</span>
                <div className="flex items-center gap-1.5 font-mono">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#161b22]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353]" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </section>

          {/* 6. "BUILD YOUR OWN README" TEACHING SECTION (10 STEPS + INTERACTIVE PREVIEW) */}
          <section className="bg-gradient-to-r from-[#0d1117] via-[#161b22] to-[#0d1117] border border-[#30363d] rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363d] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#d29922]">
                  <Sparkles className="w-4 h-4 text-[#d29922]" />
                  <span>MASTERCLASS WORKSHOP GUIDE</span>
                </div>
                <h3 className="text-xl font-black text-white mt-1">
                  How to Build Your Own GitHub Profile README
                </h3>
                <p className="text-xs text-[#7d8590] mt-0.5">
                  10 proven steps to transform your empty GitHub profile into an exceptional developer portfolio
                </p>
              </div>

              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#21262d] text-[#58a6ff] border border-[#30363d] shrink-0">
                repo: username/username
              </span>
            </div>

            {/* 10 Step Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              {[
                { step: "01", title: "Special Repo", desc: "Create a new repository with the EXACT same name as your GitHub username." },
                { step: "02", title: "Initialize README", desc: "Check the box 'Add a README file' and ensure visibility is set to Public." },
                { step: "03", title: "Personal Headline", desc: "Add a crisp, high-impact greeting, your target role, and what drives you." },
                { step: "04", title: "Elevator Pitch", desc: "Describe what you are currently building and learning in 2-3 concise sentences." },
                { step: "05", title: "Pinned Projects", desc: "Highlight your top 2-4 repositories with clean READMEs, demos, and descriptions." },
                { step: "06", title: "Tech Stack Icons", desc: "Include visual skill badges or shields.io tags categorized by frontend/backend." },
                { step: "07", title: "Real-Time Stats", desc: "Optionally embed dynamic GitHub stats cards or streak visualizers." },
                { step: "08", title: "Contact Reach-Out", desc: "Provide direct links to your LinkedIn, portfolio site, and tech Twitter." },
                { step: "09", title: "Automate with Actions", desc: "Use GitHub Actions cron jobs to update latest blog posts or activity automatically." },
                { step: "10", title: "Audit for Secrets", desc: "NEVER commit personal phone numbers, home addresses, or secret API tokens!" },
              ].map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#010409] border border-[#30363d] flex flex-col justify-between space-y-1.5 hover:border-[#58a6ff] transition-colors">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#2ea043]">{s.step}</span>
                    <h4 className="font-bold text-white text-xs mt-0.5">{s.title}</h4>
                    <p className="text-[11px] text-[#7d8590] mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Live Mini README Preview Playground */}
            <div className="p-4 rounded-xl bg-[#010409] border border-[#30363d] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#58a6ff]" /> Mini README Live Interactive Editor Preview
                </span>
                <span className="text-[11px] text-[#7d8590]">Type below to see live profile preview</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Inputs */}
                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="text-[11px] text-[#7d8590] block mb-1">Headline Greeting:</label>
                    <input
                      type="text"
                      value={previewHeadline}
                      onChange={e => setPreviewHeadline(e.target.value)}
                      className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:border-[#58a6ff] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#7d8590] block mb-1">Target Engineering Role &amp; Focus:</label>
                    <input
                      type="text"
                      value={previewRole}
                      onChange={e => setPreviewRole(e.target.value)}
                      className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:border-[#58a6ff] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#7d8590] block mb-1">Tech Stack (comma separated):</label>
                    <input
                      type="text"
                      value={previewTech}
                      onChange={e => setPreviewTech(e.target.value)}
                      className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:border-[#58a6ff] outline-none"
                    />
                  </div>
                </div>

                {/* Rendered Card */}
                <div className="p-4 rounded-xl bg-[#0d1117] border border-[#23863644] text-xs space-y-2">
                  <div className="text-[10px] font-mono text-[#2ea043] font-bold">PREVIEW // README.md</div>
                  <h3 className="text-base font-bold text-white">{previewHeadline}</h3>
                  <p className="text-xs text-[#58a6ff] font-medium">{previewRole}</p>
                  <div className="pt-2 border-t border-[#30363d] flex flex-wrap gap-1">
                    {previewTech.split(',').map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] font-mono text-[10px]">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 7. BOTTOM FINISHED EXIT BUTTON */}
          <div className="pt-6 pb-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                sound.playTransition();
                onExit();
              }}
              className="flex items-center gap-2.5 px-8 py-3 rounded-xl bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-sm shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO SLIDE PRESENTATION (43 SLIDES)</span>
            </button>

            <a
              href="https://github.com/Sangamlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white font-semibold text-sm transition-all"
            >
              <Github className="w-4 h-4" />
              <span>View github.com/Sangamlabs ↗</span>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};
