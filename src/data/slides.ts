import { SlideData, NavigationSection } from '../types';

export const SLIDES: SlideData[] = [
  // SLIDE 01: TEMPORARY WELCOME / GREETING
  {
    id: 1,
    numberStr: "01",
    title: "Good Afternoon Everyone",
    subtitle: "Today we're going to explore GitHub — from writing code to collaborating, reviewing and shipping software.",
    topic: "GITHUB: FROM CODE TO COLLABORATION",
    badge: "Welcome",
    section: "WELCOME",
    tempType: "TEMP_GREETING",
    visualType: "greeting",
    points: [
      "Welcome to this concise masterclass on modern software development",
      "We will explore how code travels from your local machine to global collaboration",
      "Designed for students and developers: clear, visual, and practical"
    ],
    takeaway: "Mastering Git and GitHub is the single most valuable foundational skill for any modern software engineer.",
    visualPlaceholderText: "VISUAL AREA • Temporary Greeting Hero (Cinematic Motion Placeholder)",
    speakerNotes: {
      whatToSay: "Good morning everyone. Today we are going to explore Git and GitHub — from writing your very first lines of code to collaborating with teams, reviewing pull requests, and shipping real software.",
      simpleExplanation: "Think of today as learning the flight controls for team software engineering.",
      realWorldExample: "Every top tech company and open-source project in the world runs on this exact workflow every single day.",
      technicalDetail: "We cover distributed version control, the Git object model, remote synchronization, and collaborative governance.",
      questionForStudents: "How many of you have ever had code break after making a change and wished you could turn back time?",
      transition: "Let's begin by clearing up one of the most common points of confusion: the difference between Git and GitHub."
    }
  },

  // SLIDE 02: GIT VS GITHUB
  {
    id: 2,
    numberStr: "02",
    title: "Git vs GitHub",
    subtitle: "Local Version Control System vs Global Collaboration Platform",
    badge: "Foundations",
    section: "FOUNDATIONS",
    visualType: "comparison",
    points: [
      "Git: A command-line version control tool that runs entirely on your local computer",
      "GitHub: A cloud-based platform that hosts Git repositories and connects engineering teams",
      "Git tracks file history and manages versions; GitHub enables code review, issues, and teamwork",
      "Git operates 100% offline; GitHub requires an internet connection for cloud collaboration"
    ],
    takeaway: "Git manages versions. GitHub helps people collaborate around them.",
    memory: "Git = Tool on your PC | GitHub = Cloud platform on the web",
    visualPlaceholderText: "VISUAL AREA • Side-by-Side Architectural Comparison Placeholder",
    speakerNotes: {
      whatToSay: "Many beginners use the words Git and GitHub interchangeably, but they are very different. Git is the engine inside your car; GitHub is the global highway network.",
      simpleExplanation: "Git is your personal offline save system. GitHub is the cloud lobby where multiplayer teamwork happens.",
      realWorldExample: "You can write code with Git on a flight with no Wi-Fi. When you land, you push to GitHub so your team can see it.",
      technicalDetail: "Git stores content-addressable objects locally in .git. GitHub wraps that with HTTP/SSH protocols, webhooks, and identity management.",
      questionForStudents: "Can you use Git without ever touching GitHub? (Yes, absolutely!)",
      transition: "Let's zoom into Git first to understand how it actually saves your files."
    }
  },

  // SLIDE 03: WHAT IS GIT?
  {
    id: 3,
    numberStr: "03",
    title: "What is Git?",
    subtitle: "Distributed Version Control System",
    badge: "Git Core",
    section: "FOUNDATIONS",
    visualType: "timeline",
    points: [
      "Git keeps track of changes in your code so you can understand, compare and restore versions",
      "Distributed architecture: every developer has a full copy of the project history on their computer",
      "Captures cryptographic snapshots of your files at specific moments, not fragile diff fragments",
      "Enables fearless experimentation through lightweight branches and instant rollbacks"
    ],
    takeaway: "Git keeps track of changes in your code so you can understand, compare and restore versions.",
    memory: "Git = Distributed Time Machine",
    visualPlaceholderText: "VISUAL AREA • Version Snapshot Timeline & SHA Pointer Diagram",
    speakerNotes: {
      whatToSay: "At its core, Git is a distributed version control system. It keeps track of changes in your code so you can understand, compare, and restore versions at any point in time.",
      simpleExplanation: "It is an unlimited undo button that records who made what change, when, and why.",
      realWorldExample: "If you change a CSS file and accidentally break the entire student portal layout, Git lets you rewind in two seconds.",
      technicalDetail: "Git represents commit history as a Directed Acyclic Graph (DAG) where each commit points backwards to its parent SHA-1/SHA-256 hash.",
      questionForStudents: "Have you ever created folders named 'project_final', 'project_final_v2', 'project_really_final'? Git eliminates that completely.",
      transition: "Now that we know Git is our local engine, what does GitHub bring to the table?"
    }
  },

  // SLIDE 04: WHAT IS GITHUB?
  {
    id: 4,
    numberStr: "04",
    title: "What is GitHub?",
    subtitle: "Cloud-Based Platform Built Around Git Repositories",
    badge: "Cloud Hub",
    section: "FOUNDATIONS",
    visualType: "grid",
    points: [
      "Repository Hosting: Safe, reliable cloud storage for your source code and full Git history",
      "Team Collaboration: Multiple developers work on features concurrently without overwriting code",
      "Pull Requests & Code Review: Structured peer inspection and comments before merging changes",
      "Issues & Project Boards: Built-in task tracking, bug reporting, and sprint planning",
      "Automation & CI/CD: Automated test pipelines, linting, and deployments with GitHub Actions"
    ],
    takeaway: "GitHub transforms individual codebases into connected, collaborative software products.",
    memory: "GitHub = Cloud Hub for Code, Reviews & Automation",
    visualPlaceholderText: "VISUAL AREA • GitHub Cloud Ecosystem & Feature Hub Diagram",
    speakerNotes: {
      whatToSay: "GitHub is the world's leading platform for software engineers. It takes Git repositories and surrounds them with collaboration tools, automated testing, and issue management.",
      simpleExplanation: "If Git is writing your document, GitHub is Google Docs with team comments, permissions, and automated publishing.",
      realWorldExample: "Over 100 million developers host their open source and enterprise software on GitHub.",
      technicalDetail: "GitHub provides cloud git-daemon services, OAuth/SSO security, REST/GraphQL APIs, and containerized runner environments.",
      questionForStudents: "Why is having code stored in the cloud safer than keeping it only on your personal laptop?",
      transition: "Everything on GitHub starts with a single foundational container: the Repository."
    }
  },

  // SLIDE 05: REPOSITORY
  {
    id: 5,
    numberStr: "05",
    title: "Repository",
    subtitle: "Repository = Project Home",
    badge: "Structure",
    section: "FOUNDATIONS",
    visualType: "grid",
    points: [
      "Repository = Project Home: The single central container for all your project assets",
      "Source Code: All application source files, styles, assets, and dependencies",
      "README: The essential project manual explaining installation and usage",
      "Git History: The complete record of every commit, author, and timestamp",
      "Branches & Configuration: Parallel working lines and settings like .gitignore"
    ],
    takeaway: "A repository is the single source of truth for your entire project.",
    memory: "Repository = Project Home",
    visualPlaceholderText: "VISUAL AREA • Clean Repository Anatomy & File Explorer Layout",
    speakerNotes: {
      whatToSay: "In Git and GitHub, we call a project container a 'Repository' or 'Repo'. Think of it as the project's digital home.",
      simpleExplanation: "A repository is a smart folder that contains your code files along with an invisible ledger recording every change ever made.",
      realWorldExample: "When you start a new app called CampusConnect, you create a repository called 'campusconnect-web' to store everything.",
      technicalDetail: "A repository consists of your working directory plus the hidden '.git' folder containing the object store and refs.",
      questionForStudents: "What should you NEVER put inside a public repository? (Secret API keys, passwords, personal data!)",
      transition: "Inside every great repository, there is one file that every developer reads first: the README."
    }
  },

  // SLIDE 06: README
  {
    id: 6,
    numberStr: "06",
    title: "README",
    subtitle: "README = Project Manual",
    badge: "Documentation",
    section: "FOUNDATIONS",
    visualType: "grid",
    points: [
      "README = Project Manual: The first file displayed on your repository's homepage",
      "What the project is: Clear overview of the project's purpose and key features",
      "How to install it: Step-by-step setup commands and environment requirements",
      "How to use it: Quickstart guides, code examples, and command references",
      "Important information: Contributing guidelines, license, and maintainer contacts"
    ],
    takeaway: "A great README turns strangers into productive contributors in minutes.",
    memory: "README = Project Manual",
    visualPlaceholderText: "VISUAL AREA • Markdown README Preview Card & Structural Layout",
    speakerNotes: {
      whatToSay: "The README is the front door of your project. If you build the best application in the world but have no README, nobody will know how to install or run it.",
      simpleExplanation: "It is the instruction manual that comes in the box when you buy furniture or electronics.",
      realWorldExample: "A recruiter reviewing your portfolio will look at your README before they ever inspect your code files.",
      technicalDetail: "Written in Markdown (.md), GitHub renders it automatically with syntax highlighting, badges, and image support.",
      questionForStudents: "What is the first command you look for in a README when trying out a new open-source library? (Usually npm install or docker run!)",
      transition: "Now that our project home is set up, let's look at how files move through Git's internal working areas."
    }
  },

  // SLIDE 07: GIT WORKING AREAS
  {
    id: 7,
    numberStr: "07",
    title: "Git Working Areas",
    subtitle: "The 4 Core Stages of File Lifecycle",
    badge: "Core Architecture",
    section: "WORKFLOW",
    visualType: "areas",
    points: [
      "Working Directory: Your actual project files on disk as you write and edit code",
      "Staging Area: The intermediate staging zone where you curate changes for the next snapshot",
      "Local Repository: Permanent, committed snapshots safely stored in your local .git database",
      "Remote Repository: The cloud-hosted copy on GitHub accessible to your entire team"
    ],
    flowSteps: [
      "Working Directory",
      "Staging Area",
      "Local Repository",
      "Remote Repository"
    ],
    takeaway: "Understanding the four areas gives you complete, predictable control over every commit.",
    memory: "Work (edit) → Stage (pick) → Commit (save) → Push (share)",
    visualPlaceholderText: "VISUAL AREA • 4-Stage File Lifecycle Pipeline & Command Flow",
    speakerNotes: {
      whatToSay: "One of the most important concepts in Git is understanding its four working areas. Your code moves systematically through each stage.",
      simpleExplanation: "Working directory is your kitchen counter; staging area is the plate you're assembling; local repo is your locked recipe book; remote repo is publishing the recipe online.",
      realWorldExample: "You might edit 5 files while fixing a bug, but you only want to stage and commit the 2 files directly related to the fix.",
      technicalDetail: "The staging area is technically the index file in .git/index, referencing blobs before tree object creation.",
      questionForStudents: "Why does Git have a Staging Area instead of committing everything immediately? (To allow clean, atomic, deliberate commits!)",
      transition: "Let's see the exact commands used to move code between these areas: Add and Commit."
    }
  },

  // SLIDE 08: ADD & COMMIT
  {
    id: 8,
    numberStr: "08",
    title: "Add & Commit",
    subtitle: "Preparing Changes and Creating Save Points",
    badge: "Essential Commands",
    section: "WORKFLOW",
    visualType: "terminal",
    points: [
      "git status: Check which files are modified, staged, or untracked in your workspace",
      "git add .: Stage all modified files into the staging area preparing for snapshot",
      "git commit -m \"Add login page\": Create a permanent, immutable save point with a message",
      "Commit = Save Point: Each commit records author, exact timestamp, and descriptive message"
    ],
    codeSnippet: {
      title: "Terminal — Standard Workflow",
      code: `$ git status\n$ git add .\n$ git commit -m "Add student login authentication"`,
      language: "bash"
    },
    takeaway: "Commit = Save Point. Make small, focused commits with clear messages.",
    memory: "Commit = Save Point",
    visualPlaceholderText: "VISUAL AREA • Terminal Console Visualizer with Output Status",
    speakerNotes: {
      whatToSay: "These three commands are the bread and butter of your daily engineering routine: check status, stage with add, and record with commit.",
      simpleExplanation: "git add is packing the box; git commit is sealing it with tape and writing a label on it.",
      realWorldExample: "You build the login form, run git add and commit. Now if your next feature breaks the app, your login form is completely safe.",
      technicalDetail: "A commit creates a SHA hash based on tree contents, parent hash, author metadata, and commit message.",
      questionForStudents: "What makes a good commit message? (Present tense, concise, explaining WHAT changed and WHY!)",
      transition: "When you string multiple commits together over time, you create your Commit History."
    }
  },

  // SLIDE 09: COMMIT HISTORY
  {
    id: 9,
    numberStr: "09",
    title: "Commit History",
    subtitle: "Timeline of Project Save Points",
    badge: "Timeline",
    section: "WORKFLOW",
    visualType: "timeline",
    points: [
      "Every commit is a permanent milestone connected sequentially along a historical timeline",
      "Each commit stores a unique 40-character SHA hash guaranteeing tamper-proof integrity",
      "You can inspect diffs between any two points in time or restore previous states instantly",
      "Example progression: Initial project → Add login → Fix validation → Add dashboard → Improve UI"
    ],
    flowSteps: [
      "Initial project",
      "Add login",
      "Fix validation",
      "Add dashboard",
      "Improve UI"
    ],
    takeaway: "Git lets you see how your project evolved.",
    memory: "History = Chain of Save Points",
    visualPlaceholderText: "VISUAL AREA • Interactive 5-Step Commit DAG Progression Timeline",
    speakerNotes: {
      whatToSay: "Your commit history is the story of your application. Git lets you see exactly how your project evolved, line by line, over days or years.",
      simpleExplanation: "It is like a photo album of your project growing up from day one.",
      realWorldExample: "If a bug was introduced last Tuesday, git log and git bisect help you pinpoint the exact commit that caused it.",
      technicalDetail: "Commits form a directed acyclic graph (DAG) where HEAD tracks your currently checked-out commit or branch tip.",
      questionForStudents: "Why is a clear history better than one huge commit with the message 'fixed stuff'? (Because you can isolate and revert bugs cleanly!)",
      transition: "Now that we know how to record history locally, how do we get a project from GitHub onto our computer? We Clone."
    }
  },

  // SLIDE 10: CLONE
  {
    id: 10,
    numberStr: "10",
    title: "Clone",
    subtitle: "Downloading a Complete Working Copy",
    badge: "Getting Started",
    section: "SYNC",
    visualType: "clone",
    points: [
      "git clone <url>: Copies a remote GitHub repository directly to your local computer",
      "Downloads the entire commit history, all branches, and complete file tree in one command",
      "Automatically configures the 'origin' remote URL link back to GitHub",
      "Clone = Download a Working Copy: You get an independent, fully functioning Git repository"
    ],
    flowSteps: [
      "GitHub Repository (Cloud)",
      "git clone https://github.com/...",
      "Developer Computer (Local Working Copy)"
    ],
    codeSnippet: {
      title: "Terminal — Cloning a Repository",
      code: `$ git clone https://github.com/organization/campusconnect.git\n$ cd campusconnect`,
      language: "bash"
    },
    takeaway: "Cloning gives you the complete project history right on your local machine.",
    memory: "Clone = Download a Working Copy",
    visualPlaceholderText: "VISUAL AREA • Cloud-to-Local Repository Download Architecture",
    speakerNotes: {
      whatToSay: "When you join a new company or contribute to an open-source project, your very first step is cloning the repository.",
      simpleExplanation: "Cloning isn't just downloading a zip file; it downloads the entire time machine and all its past history onto your machine.",
      realWorldExample: "When a new teammate joins CampusConnect, they run git clone and have the full codebase running locally in minutes.",
      technicalDetail: "git clone initializes a new local directory, creates remote-tracking branches, and checks out the default branch (main).",
      questionForStudents: "What is the difference between downloading a ZIP of a repo and running git clone? (ZIP has no .git folder or version history!)",
      transition: "Once you have a cloned repository, how do you exchange changes with your team? Push, Pull, and Fetch."
    }
  },

  // SLIDE 11: PUSH, PULL & FETCH
  {
    id: 11,
    numberStr: "11",
    title: "Push, Pull & Fetch",
    subtitle: "Synchronizing with Remote Repositories",
    badge: "Sync Operations",
    section: "SYNC",
    visualType: "sync",
    points: [
      "PUSH: Local → Remote (Uploads your committed local changes to GitHub for the team to see)",
      "PULL: Remote → Local + integrate changes (Downloads new team commits and merges into your branch)",
      "FETCH: Remote → Local information only (Downloads remote updates to inspect without merging)",
      "Memory Trick: Push = Send | Pull = Receive | Fetch = Check for updates"
    ],
    takeaway: "Fetch to check for updates, Pull to integrate them, and Push to share your progress.",
    memory: "Push = Send | Pull = Receive | Fetch = Check for updates",
    visualPlaceholderText: "VISUAL AREA • 3-Way Directional Sync Diagram (Push vs Pull vs Fetch)",
    speakerNotes: {
      whatToSay: "To collaborate with teammates, you need to exchange commits with GitHub. These three operations handle all remote synchronization.",
      simpleExplanation: "Push is uploading your homework; Pull is downloading your teacher's corrections and updating your notes; Fetch is checking the bulletin board to see if grades were posted.",
      realWorldExample: "Before starting work in the morning, developers always run git pull to get their teammates' latest updates.",
      technicalDetail: "git pull is essentially git fetch followed by git merge FETCH_HEAD.",
      questionForStudents: "What happens if two people push changes to the exact same line of code? (A merge conflict occurs!)",
      transition: "To avoid conflicts on the main branch, teams use branches and Pull Requests."
    }
  },

  // SLIDE 12: PULL REQUEST
  {
    id: 12,
    numberStr: "12",
    title: "Pull Request",
    subtitle: "Pull Request = Request Review",
    badge: "Teamwork",
    section: "COLLABORATION",
    visualType: "pr",
    points: [
      "Pull Request = Request Review: Proposing your feature branch changes to be merged into main",
      "Feature Branch: Developers write code on isolated branches to keep the main branch stable",
      "Code Review: Teammates review code line-by-line, leave comments, and suggest improvements",
      "Automated Checks: CI bots run unit tests, security scans, and build previews automatically",
      "Approval & Merge: Once approved and tests pass, changes are safely merged into the main codebase"
    ],
    flowSteps: [
      "Feature Branch",
      "Pull Request",
      "Code Review",
      "Approval",
      "Merge to Main"
    ],
    takeaway: "Pull Requests ensure quality, transfer knowledge, and prevent broken code in production.",
    memory: "Pull Request = Request Review",
    visualPlaceholderText: "VISUAL AREA • Pull Request Review Lifecycle & Merge Pipeline Diagram",
    speakerNotes: {
      whatToSay: "A Pull Request — or PR — is the cornerstone of professional software engineering. It is where developers talk about code before it ever touches production.",
      simpleExplanation: "It is submitting your draft essay to your peers for feedback before handing it in for final grading.",
      realWorldExample: "At tech companies, nobody commits directly to main. Every single line of code goes through a Pull Request and requires at least one peer approval.",
      technicalDetail: "GitHub PRs track branch diffs, commit histories, conversation threads, check statuses, and merge strategies (merge commit, squash, rebase).",
      questionForStudents: "Why do we review each other's code? (Catches bugs early, improves code quality, and shares knowledge across the team!)",
      transition: "When sharing code on GitHub, one rule stands above all others: Security."
    }
  },

  // SLIDE 13: GITHUB SECURITY
  {
    id: 13,
    numberStr: "13",
    title: "GitHub Security",
    subtitle: "Protecting Secrets, Credentials & Production Branches",
    badge: "Best Practices",
    section: "SECURITY",
    visualType: "security",
    points: [
      "Never commit API keys, database passwords, or private tokens to any Git repository",
      "Always protect .env files by adding them to your .gitignore before your first commit",
      "Use GitHub Secrets to inject production credentials securely into automated workflows",
      "Enable automated Secret Scanning and Dependabot alerts to catch vulnerabilities early",
      "Protect important branches (main) by requiring pull request reviews and passing checks"
    ],
    codeSnippet: {
      title: "Credential Management Example",
      code: `// ❌ BAD (Vulnerable to credential leak)\nconst API_KEY = "real-secret-key-12345";\n\n// ✅ GOOD (Using environment variable)\nconst API_KEY = process.env.API_KEY || "[REDACTED_SECRET]";`,
      language: "typescript"
    },
    takeaway: "Security is non-negotiable: never commit secrets and always protect production branches.",
    memory: "Never commit secrets • Use .env & GitHub Secrets",
    visualPlaceholderText: "VISUAL AREA • Security Audit Checklist & Safe vs Unsafe Code Box",
    speakerNotes: {
      whatToSay: "Security is one of the most critical topics for modern software engineers. Automated bots scan public GitHub repositories every second looking for leaked keys.",
      simpleExplanation: "Committing an API key to GitHub is like taping your house key and credit card PIN to your front door.",
      realWorldExample: "Developers have accidentally leaked cloud API keys and woke up to thousands of dollars in unauthorized server charges.",
      technicalDetail: "GitHub Secret Scanning partners with cloud providers to automatically revoke exposed credentials within seconds of a public commit.",
      questionForStudents: "If you accidentally commit a secret and then delete it in the next commit, is it safe? (NO! It remains forever in Git history!)",
      transition: "Now let's see how developers collaborate on projects they don't own: Forking and Open Source."
    }
  },

  // SLIDE 14: FORK & OPEN SOURCE
  {
    id: 14,
    numberStr: "14",
    title: "Fork & Open Source",
    subtitle: "Fork = Personal Copy",
    badge: "Open Source",
    section: "COLLABORATION",
    visualType: "fork",
    points: [
      "Fork = Personal Copy: An independent copy of someone else's repository under your account",
      "Enables you to experiment, add features, and fix bugs without affecting the original project",
      "Standard open-source workflow: Fork → Clone → Create Branch → Push → Submit Pull Request",
      "Empowers global developers to collaborate and improve software they don't own"
    ],
    flowSteps: [
      "Original Repository",
      "Fork to Account",
      "Personal Repository",
      "Make Changes",
      "Pull Request",
      "Original Project"
    ],
    takeaway: "Forks empower anyone in the world to contribute to open-source software safely.",
    memory: "Fork = Personal Copy",
    visualPlaceholderText: "VISUAL AREA • Open Source Fork & Upstream PR Contribution Cycle",
    speakerNotes: {
      whatToSay: "Open source is the foundation of modern technology, from Linux and React to Python. The fork mechanism makes contributing to open source accessible to everyone.",
      simpleExplanation: "Forking is photocopying a public recipe so you can add your own spices in your own kitchen without altering the library's master copy.",
      realWorldExample: "Anyone here can fork the React repository, fix a typo in the documentation, and submit a PR to Meta's team.",
      technicalDetail: "A fork maintains an upstream relationship, allowing you to sync changes from the original repository as it advances.",
      questionForStudents: "What is the difference between git clone and GitHub fork? (Clone is local to your PC; Fork creates a remote copy on your GitHub account!)",
      transition: "Beyond hosting repositories and forks, GitHub can also be controlled programmatically via its API."
    }
  },

  // SLIDE 15: GITHUB API
  {
    id: 15,
    numberStr: "15",
    title: "GitHub API",
    subtitle: "Connecting Applications to GitHub Programmatically",
    badge: "Ecosystem",
    section: "INTEGRATION",
    visualType: "api",
    points: [
      "REST and GraphQL endpoints allow applications to read and write GitHub data programmatically",
      "Retrieve repository metadata, developer profile stats, commit histories, and open issues",
      "Automate release deployments, issue bot replies, and external dashboard synchronization",
      "Concept: Application sends an API Request → GitHub processes it → Returns JSON Response"
    ],
    flowSteps: [
      "Your Application",
      "API Request (GET /users/...)",
      "GitHub API Gateway",
      "JSON Data Response",
      "Rendered UI in App"
    ],
    takeaway: "The GitHub API transforms GitHub into a programmable engine for your custom developer tools.",
    memory: "App Request → GitHub Cloud → JSON Response",
    visualPlaceholderText: "VISUAL AREA • REST/GraphQL Request-Response Educational Architecture",
    speakerNotes: {
      whatToSay: "GitHub is not just a website; it is an extensible API platform. Applications can talk to GitHub programmatically to automate workflows or build custom dashboards.",
      simpleExplanation: "An API is a waiter taking your order to the kitchen (GitHub) and bringing your food (data) back to your table (app).",
      realWorldExample: "DevOps dashboards, developer portfolio websites, and Discord alert bots all use the GitHub API.",
      technicalDetail: "GitHub supports REST v3 and GraphQL v4 with rate limiting, Personal Access Tokens (PAT), and fine-grained OAuth permissions.",
      questionForStudents: "How could you use the GitHub API to showcase your coding activity on your personal portfolio website?",
      transition: "Speaking of developer portfolios, let's explore the GitHub Profile Tour."
    }
  },

  // SLIDE 16: GITHUB PROFILE TOUR
  {
    id: 16,
    numberStr: "16",
    title: "GitHub Profile Tour",
    subtitle: "Developer Portfolio & Open Source Contributions",
    badge: "Portfolio",
    section: "PROFILE",
    visualType: "profile",
    points: [
      "Profile: Sangam Singh (@Sangamlabs) — Real developer profile & contribution showcase",
      "Your GitHub profile serves as your living developer resume and proof of genuine craft",
      "Highlights public repositories, contribution activity heatmaps, and starred projects",
      "Features customizable Profile README, pinned flagship projects, and technical skill tags"
    ],
    takeaway: "A polished GitHub profile showcases your consistency, technical skills, and collaboration abilities.",
    memory: "Profile = Your Developer Resume",
    visualPlaceholderText: "VISUAL AREA • Developer Profile Card, Stat Metrics & Activity Feed",
    speakerNotes: {
      whatToSay: "Your GitHub profile is the single best way to prove to tech recruiters and teams that you can write clean, consistent code.",
      simpleExplanation: "It is your developer resume, but with real code to back up every claim.",
      realWorldExample: "Sangam Singh's profile showcases open-source repos, pipeline architectures, and contributions at github.com/Sangamlabs.",
      technicalDetail: "Create a repository with the exact same name as your username (e.g. Sangamlabs/Sangamlabs) to build a custom profile README.",
      questionForStudents: "What is more persuasive on a job application: saying you know Git, or showing 200 real commits on GitHub?",
      transition: "Let's bring everything together in our closing thoughts."
    }
  },

  // SLIDE 17: TEMPORARY THANK YOU
  {
    id: 17,
    numberStr: "17",
    title: "THANK YOU",
    subtitle: "Code is written by developers. Great software is built together.",
    badge: "Conclusion",
    section: "CONCLUSION",
    tempType: "TEMP_THANK_YOU",
    visualType: "thank_you",
    points: [
      "Code is written by developers. Great software is built together.",
      "Questions?"
    ],
    takeaway: "Keep coding, keep committing, and build something meaningful with your team.",
    visualPlaceholderText: "VISUAL AREA • Temporary Closing Hero (Cinematic Conclusion Placeholder)",
    speakerNotes: {
      whatToSay: "Thank you all for your attention today. Remember: code is written by developers, but great software is always built together.",
      simpleExplanation: "Software engineering is a team sport, and Git & GitHub are the rules and playing field.",
      realWorldExample: "Every app on your phone right now was built by a team pushing commits and reviewing pull requests.",
      technicalDetail: "We completed our foundational review across Git core, local workflows, remote syncing, and collaborative governance.",
      questionForStudents: "What questions do you have about Git or GitHub?",
      transition: "Thank you, and happy coding!"
    }
  }
];

// STRICT REQUIREMENT VERIFICATION
export const TOTAL_SLIDES = SLIDES.length; // EXACTLY 17
if (TOTAL_SLIDES !== 17) {
  console.error(`CRITICAL ERROR: Slide count is ${TOTAL_SLIDES}. Exactly 17 slides are required!`);
}

export interface SectionMeta {
  key: NavigationSection;
  label: string;
  startSlide: number;
  endSlide: number;
  iconName: string;
}

export const SECTIONS: SectionMeta[] = [
  { key: 'WELCOME', label: 'Welcome', startSlide: 1, endSlide: 1, iconName: 'Sparkles' },
  { key: 'FOUNDATIONS', label: 'Foundations', startSlide: 2, endSlide: 6, iconName: 'BookOpen' },
  { key: 'WORKFLOW', label: 'Git Workflow', startSlide: 7, endSlide: 9, iconName: 'Terminal' },
  { key: 'SYNC', label: 'Sync & Remotes', startSlide: 10, endSlide: 11, iconName: 'RefreshCw' },
  { key: 'COLLABORATION', label: 'Pull Requests & Forks', startSlide: 12, endSlide: 14, iconName: 'GitPullRequest' },
  { key: 'SECURITY', label: 'Security', startSlide: 13, endSlide: 13, iconName: 'Shield' },
  { key: 'INTEGRATION', label: 'Ecosystem & API', startSlide: 15, endSlide: 15, iconName: 'Cpu' },
  { key: 'PROFILE', label: 'Profile Tour', startSlide: 16, endSlide: 16, iconName: 'User' },
  { key: 'CONCLUSION', label: 'Closing', startSlide: 17, endSlide: 17, iconName: 'Award' }
];

export function getSlide(id: number): SlideData {
  const found = SLIDES.find(s => s.id === id);
  return found || SLIDES[0];
}
