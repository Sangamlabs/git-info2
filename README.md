# GitHub: From Code to Collaboration
> **From Local Code to Team Collaboration, Automation & Deployment**

An interactive, web-based educational presentation designed for technical classrooms, developer workshops, and academic evaluations. Built with React, TypeScript, Tailwind CSS, and Motion, this presentation provides a structured, 43-slide curriculum explaining Git version control and GitHub's ecosystem—from local commits to CI/CD pipelines, security hardening, open-source governance, and AI-assisted workflows.

---

## Overview

Modern software engineering requires developers to understand not just how to write code, but how to collaborate safely, automate quality checks, and deploy reliable systems. **GitHub: From Code to Collaboration** bridges the gap between theoretical version control and real-world team workflows using a progressive case study: **CampusConnect**, a college community web platform.

### Core Objectives
- **Understand Version Control Fundamentals**: Differentiate between working directory, staging area, local repository, and remote hosting.
- **Master Branching & Collaboration**: Work with feature branches, merge conflicts, pull request reviews, and GitHub Flow.
- **Automate Quality & Delivery**: Design and inspect GitHub Actions workflows for continuous integration and automated testing.
- **Implement Security Best Practices**: Protect main branches, configure branch protection rules, manage secrets, and scan dependencies with Dependabot.
- **Leverage Modern Developer Ecosystems**: Utilize GitHub CLI (`gh`), REST/GraphQL APIs, GitHub Pages, Copilot AI assistance, and professional profile architecture.

---

## Complete 43-Slide Curriculum

The presentation is organized into 9 pedagogical sections containing exactly 43 slides:

### Section 1: Foundation & Mental Model (Slides 01–06)
- **Slide 01: Title & Course Introduction** — Welcome to Git & GitHub: From Code to Collaboration. Course overview, speaker introduction, and technical agenda.
- **Slide 02: The Real-World Problem** — Why version control matters. Examining code loss, file proliferation (`final_v2_really_final.zip`), and team overwrites.
- **Slide 03: The Git Mental Model** — Local-first distributed version control. The three local states: Working Directory, Staging Area (`git add`), and Local Repository (`git commit`).
- **Slide 04: Git Architecture & Object Storage** — How Git stores snapshots rather than file diffs. The DAG (Directed Acyclic Graph), SHA-1 commit hashes, and blob storage.
- **Slide 05: Essential Local Commands** — `git init`, `git status`, `git add`, `git commit -m`, and inspecting state changes without fear.
- **Slide 06: Commit Hygiene & Conventional Commits** — Writing clean, atomic commits with standard types (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`).

### Section 2: Branching & Merging Deep Dive (Slides 07–12)
- **Slide 07: Why Branches Matter** — Isolated environments for experimentation and parallel feature development without destabilizing production code.
- **Slide 08: Branch Mechanics** — Pointers to commits (`HEAD`), `git branch`, `git checkout -b`, and `git switch`.
- **Slide 09: Fast-Forward vs Three-Way Merge** — Linear history advances vs merge commits. Analyzing commit topologies and parent hashes.
- **Slide 10: Resolving Merge Conflicts** — Conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), manual conflict resolution, and aborting unsafe merges.
- **Slide 11: Rebase vs Merge** — Clean linear history (`git rebase`) vs preserving chronological context. Golden rules of never rebasing public branches.
- **Slide 12: Recovery & The Safety Net** — `git log --oneline --graph`, `git reflog`, `git stash`, and restoring mistakenly deleted commits.

### Section 3: GitHub Essentials & Remote Collaboration (Slides 13–18)
- **Slide 13: Git vs GitHub** — Engine vs Cloud Platform. Local distributed engine vs collaborative hosting, issue tracking, and code review platform.
- **Slide 14: Connecting Local to Remote** — SSH key authentication vs HTTPS Personal Access Tokens (PAT), `git remote add origin`, and `git push -u`.
- **Slide 15: Repository Setup & Standards** — Anatomy of a production repository: `README.md`, `.gitignore`, `LICENSE`, and directory structure.
- **Slide 16: Forks vs Clones** — When to clone (team collaborator with push rights) vs when to fork (external contributor in open source).
- **Slide 17: Syncing Upstream Changes** — Tracking `upstream`, fetching remote branches, and merging upstream updates into local forks.
- **Slide 18: Issues, Milestones & Projects** — Issue templates, labels, kanban boards, assigning reviewers, and connecting work to releases.

### Section 4: Pull Requests & Code Review Culture (Slides 19–24)
- **Slide 19: Anatomy of a Pull Request** — Title, problem description, implementation summary, screenshots, and checklist conventions.
- **Slide 20: Pull Request Mechanics** — Drafting PRs, requesting reviews, draft PR status, and branch auto-deletion upon merge.
- **Slide 21: Code Review Best Practices** — Constructive feedback, line-by-line comments, suggesting changes in GitHub UI, and respectful team communication.
- **Slide 22: Merge Strategies** — Create a merge commit vs Squash and merge vs Rebase and merge. When to pick each strategy.
- **Slide 23: Branch Protection Rules** — Enforcing required PR reviews, passing CI status checks, and preventing direct pushes to `main`.
- **Slide 24: GitHub Flow in Action** — End-to-end team lifecycle: Branch → Code → PR → Review → CI Pass → Merge → Deploy.

### Section 5: Automation & CI/CD with GitHub Actions (Slides 25–30)
- **Slide 25: What is CI/CD?** — Continuous Integration (lint, test, build) and Continuous Delivery/Deployment (staging, production release).
- **Slide 26: GitHub Actions Core Concepts** — Workflows (`.github/workflows/*.yml`), Events (`push`, `pull_request`), Jobs, Runners (`ubuntu-latest`), and Steps.
- **Slide 27: Writing Your First Workflow** — Step-by-step YAML syntax: `actions/checkout@v4`, `actions/setup-node@v4`, `npm install`, and `npm test`.
- **Slide 28: Matrix Builds & Artifacts** — Testing across multiple Node.js versions (18, 20, 22) and saving build artifacts for deployment.
- **Slide 29: Managing Secrets & Environment Variables** — Encrypted repository secrets (`secrets.DEPLOY_KEY`), environment protection rules, and zero-leakage security.
- **Slide 30: Real-World CampusConnect Pipeline** — Visualizing the full verification pipeline: Linting → Type Checking → Unit Tests → Production Build → Preview Deployment.

### Section 6: Security, Compliance & Maintenance (Slides 31–34)
- **Slide 31: Repository Security Essentials** — Secret scanning, push protection, and never committing `.env` or credentials.
- **Slide 32: Dependabot & Dependency Scanning** — Automated vulnerability detection, Software Bill of Materials (SBOM), and automated patch PRs.
- **Slide 33: Security Advisory & CodeQL** — Static application security testing (SAST), Common Vulnerabilities and Exposures (CVEs), and `SECURITY.md`.
- **Slide 34: Licensing & Governance** — Choosing open-source licenses (MIT, Apache 2.0, GPLv3), Contributor License Agreements, and Code of Conduct.

### Section 7: Modern Ecosystem & Developer Experience (Slides 35–39)
- **Slide 35: GitHub CLI (`gh`)** — Managing repositories, creating PRs, running workflows, and viewing issues directly from the terminal.
- **Slide 36: GitHub REST & GraphQL APIs** — Querying repository metadata, automating releases, and integrating with external developer tools.
- **Slide 37: GitHub Pages & Static Deployment** — Deploying documentation, portfolios, and static web apps directly from branches or Actions.
- **Slide 38: Open Source Contribution Workflow** — Discovering `good first issue` tags, communicating in discussions, following project guidelines, and making impactful PRs.
- **Slide 39: AI-Assisted Development with GitHub Copilot** — Context-aware completions, chat explanations, writing unit tests, and maintaining engineering discretion.

### Section 8: Professional Showcase & Architecture (Slides 40–41)
- **Slide 40: Crafting a World-Class Profile & README** — Profile README (`username/username`), badges, pinned repositories, technical storytelling, and commit activity.
- **Slide 41: Real Developer Profile Tour** — Live case study exploring the simulated engineering profile of `@Sangamlabs`, featuring repository structures, tech stacks, and metrics.

### Section 9: Course Synthesis & Knowledge Assessment (Slides 42–43)
- **Slide 42: Master Command Cheat Sheet & Interactive Quiz** — Comprehensive command matrix organized by workflow stage, paired with a 5-question interactive self-assessment.
- **Slide 43: Next Steps & The Developer Journey** — Final wrap-up, recommended certifications, resources, open-source communities, and student action plan.

---

## Recurring Case Study: CampusConnect

To ensure abstract concepts remain concrete, every slide connects to **CampusConnect**, an open-source college community web portal developed by a student engineering team:

| Scenario | Git / GitHub Concept | CampusConnect Context |
|---|---|---|
| Initial Prototype | `git init`, `git add`, `git commit` | Setting up the React + Vite frontend and documenting project scope. |
| Feature Isolation | `git checkout -b feature/auth` | Student developer building OAuth authentication without breaking the main portal. |
| Code Review | Pull Request + Reviewers | Senior student lead reviewing password hashing and input sanitization before approval. |
| Automated Checks | GitHub Actions CI | Running ESLint, TypeScript verification, and Jest tests on every PR. |
| Branch Protection | Rulesets | Requiring 1 approval and passing CI status before merging into `main`. |
| Dependency Management | Dependabot | Automatically patching an outdated UI component library vulnerability. |
| Production Release | GitHub Pages / Deployments | Shipping the verified static web app to students. |

---

## Interactive Features

The application is engineered as a responsive, hardware-accelerated web presentation with interactive controls:

1. **Physical 3D Perspective Cards**: Mouse-tracked 3D tilt and spring physics powered by `motion/react` on desktop, with touch fallback on mobile.
2. **Interactive Terminal Simulator**: Embedded simulated command-line interface demonstrating commands (`whoami`, `projects`, `help`, `contact`).
3. **Interactive Slide Navigator**: Full slide gallery drawer accessible via `G` key or top navigation, featuring search and section filtering across all 43 slides.
4. **Presenter Speaker Notes**: Side teleprompter panel with 3-part structured guidance (Opening Hook, Student Analogy, CampusConnect Real-World Case) accessible via `N` key.
5. **Interactive Knowledge Assessment**: End-of-course 5-question quiz with real-time feedback and score tracking.
6. **Audio Feedback**: Subtle, non-intrusive Web Audio API sound synthesis for transitions, keypresses, and interactions (toggleable via `S` key).
7. **Mobile Gestures & Touch Support**: Swipe-to-advance navigation, minimum 44px touch targets, and iOS safe-area support (`viewport-fit=cover`).

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `→` or `Space` or `PageDown` | Advance to next slide |
| `←` or `PageUp` | Return to previous slide |
| `Home` | Jump to Slide 01 |
| `End` | Jump to Slide 43 |
| `G` | Toggle 43-Slide Gallery & Search Drawer |
| `N` | Toggle Presenter Speaker Notes |
| `S` | Toggle Sound Effects |
| `F` | Toggle Fullscreen Mode |
| `Esc` | Close open modals and drawers |

---

## Visual Design System

The interface adheres to a GitHub-native design system built with custom Tailwind utility classes:

| Token | Value | Purpose |
|---|---|---|
| Background Canvas | `#010409` | Deepest GitHub dark background |
| Surface Panels | `#0d1117` | Card surfaces and terminal container |
| Elevated Cards | `#161b22` | Hovered items, inputs, and drawer containers |
| Subtle Borders | `#30363d` | Hairline dividers and card borders |
| GitHub Green | `#238636` / `#2ea043` | Primary action buttons, success states, and badges |
| GitHub Blue | `#58a6ff` | Hyperlinks, info badges, and technical highlights |
| GitHub Orange | `#ea580c` / `#fb923c` | Warnings, keycap highlights, and section bridges |
| GitHub Purple | `#bc8cff` | Cloud architecture, tags, and AI topics |
| Monospace Font | `Fira Code` | Code blocks, hashes, and terminal output |
| Body Font | `Plus Jakarta Sans` | High-readability sans-serif typography |

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Animations**: [Motion](https://motion.dev/) (`motion/react`)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Engine**: Web Audio API (Synthesized square and sine waves)
- **Deployment**: Static SPA (`dist/` output compatible with Netlify, Vercel, Cloud Run, GitHub Pages)

---

## Project Structure

```
├── index.html                   # HTML entry point with viewport-fit=cover & SEO metadata
├── package.json                 # Project dependencies and npm scripts
├── tsconfig.json                # Strict TypeScript configuration
├── vite.config.ts               # Vite build configuration with Tailwind plugin
├── netlify.toml                 # Netlify deployment configuration
├── src/
│   ├── main.tsx                 # Application mount point
│   ├── App.tsx                  # Slide manager, keyboard listeners, touch swipe handling
│   ├── index.css                # Tailwind import, custom glow styles, responsive safe-area rules
│   ├── types.ts                 # Type definitions for slides, sections, and speaker notes
│   ├── data/
│   │   ├── slides.ts            # Central registry importing and indexing all 43 slides
│   │   ├── slidesPart1.ts       # Slides 01 to 21 (Git fundamentals, branching, remotes)
│   │   └── slidesPart2.ts       # Slides 22 to 43 (PRs, Actions, security, profile, quiz)
│   ├── components/
│   │   ├── Navigation.tsx       # Top brand header, slide counter, and bottom progress bar
│   │   ├── SlideRenderer.tsx    # Slide layout dispatcher rendering individual slides
│   │   ├── Interactive3DObject.tsx # Mouse-tracked 3D tilt cards with touch fallback
│   │   ├── SlideDrawer.tsx      # 43-slide modal gallery with instant search
│   │   ├── SpeakerNotesModal.tsx # Presenter teleprompter drawer
│   │   ├── ProfileTour.tsx      # Comprehensive simulated developer profile view
│   │   ├── JarvisTerminal.tsx   # Simulated OS-core developer terminal
│   │   ├── KeyboardEnterButton.tsx # 3D mechanical ENTER keycap component
│   │   └── AnimatedBackground.tsx # Ambient developer background effects
│   └── utils/
│       └── sound.ts             # Web Audio API sound synthesis
```

---

## Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher (or pnpm / yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sangamlabs/github-masterclass.git
   cd github-masterclass
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:3000` (or the port specified in terminal output).

4. Build for production:
   ```bash
   npm run build
   ```
   Outputs production-optimized static files in `dist/`.

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## Deployment

The application is a pure client-side SPA and can be deployed to any static hosting provider.

### Netlify
A `netlify.toml` is included:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages
1. Build the application: `npm run build`
2. Push the `dist/` directory to your `gh-pages` branch or configure a GitHub Actions workflow:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

---

## Accessibility & Performance

- **WCAG AA Compliance**: All text elements adhere to minimum 4.5:1 contrast ratios on dark backgrounds.
- **Reduced Motion Support**: Respects `@media (prefers-reduced-motion: reduce)` by disabling 3D rotations and complex translations.
- **Mobile First Precision**: Designed with fluid layouts, clamped typography, no horizontal overflow, and minimum 44px tap targets.
- **Zero Heavy Runtimes**: Uses lightweight mathematical physics via `motion/react` springs and Web Audio synthesis rather than heavy external audio assets.

---

## Educational Philosophy

This presentation was constructed around three foundational educational principles:

1. **Analogy Before Abstraction**: Introducing every technical Git mechanism with an intuitive physical counterpart before revealing the terminal command.
2. **Continuous Narrative Thread**: Using the same codebase (`CampusConnect`) across all 43 slides so students observe an evolving project lifecycle rather than disconnected snippets.
3. **Active Engagement**: Incorporating interactive terminal inputs, 3D exploratory cards, and self-assessment quizzes to prevent passive lecture fatigue.

---

## License

This project is open source and available under the [MIT License](LICENSE).
Feel free to use and adapt these slides for educational lectures, developer workshops, and classroom evaluations.
