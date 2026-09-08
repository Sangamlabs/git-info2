// Static imports of all 17 slide visuals
import welcomeImg from './welcome.jpg';
import gitVsGithubImg from './git-vs-github.jpg';
import whatIsGitImg from './what-is-git.jpg';
import githubImg from './github.jpg';
import repositoryImg from './repository.jpg';
import readmeImg from './readme.jpg';
import workingAreasImg from './working-areas.jpg';
import addCommitImg from './add-commit.jpg';
import commitHistoryImg from './commit-history.jpg';
import cloneImg from './clone.jpg';
import pushPullFetchImg from './push-pull-fetch.jpg';
import pullRequestImg from './pull-request.jpg';
import securityImg from './security.jpg';
import forkOpenSourceImg from './fork-open-source.jpg';
import githubApiImg from './github-api.jpg';
import profileTourImg from './profile-tour.jpg';
import thankYouImg from './thank-you.jpg';

export interface SlideVisualMeta {
  slideId: number;
  slug: string;
  title: string;
  imageSrc: string;
  conceptAlt: string;
  caption: string;
}

export const SLIDE_VISUALS: Record<number, SlideVisualMeta> = {
  1: {
    slideId: 1,
    slug: 'welcome',
    title: 'Good Morning Everyone',
    imageSrc: welcomeImg,
    conceptAlt: 'Cinematic developer workstation journey from code to global collaboration',
    caption: 'The Modern Software Development Journey: Code, Collaboration, & Cloud Deployment'
  },
  2: {
    slideId: 2,
    slug: 'git-vs-github',
    title: 'Git vs GitHub',
    imageSrc: gitVsGithubImg,
    conceptAlt: 'Split conceptual architecture comparing local Git engine with GitHub cloud collaboration',
    caption: 'Git = Local Version Control Engine | GitHub = Cloud Collaboration Platform'
  },
  3: {
    slideId: 3,
    slug: 'what-is-git',
    title: 'What is Git?',
    imageSrc: whatIsGitImg,
    conceptAlt: 'Local Git version control showing commit DAG snapshots, branches, and offline history',
    caption: 'Local Cryptographic Commit History & Immutable Version Snapshots'
  },
  4: {
    slideId: 4,
    slug: 'github',
    title: 'What is GitHub?',
    imageSrc: githubImg,
    conceptAlt: 'Central cloud repository connecting distributed developers, PR reviews, and CI/CD pipelines',
    caption: 'GitHub Cloud Ecosystem: Multi-Developer Sync, Code Reviews, & Project Hub'
  },
  5: {
    slideId: 5,
    slug: 'repository',
    title: 'Repository',
    imageSrc: repositoryImg,
    conceptAlt: 'Digital project container organizing source files, README docs, branches, and commit logs',
    caption: 'The Project Home: Source Code, Version Database (.git), & Project Metadata'
  },
  6: {
    slideId: 6,
    slug: 'readme',
    title: 'README',
    imageSrc: readmeImg,
    conceptAlt: 'Structured repository documentation showing setup guide, badges, and quickstart commands',
    caption: 'Essential Project Manual: Purpose, Installation, and Getting Started Guide'
  },
  7: {
    slideId: 7,
    slug: 'working-areas',
    title: 'Git Working Areas',
    imageSrc: workingAreasImg,
    conceptAlt: 'Technical pipeline diagram showing Working Directory, Staging Index, Local Repo, and Remote',
    caption: 'The 4-Stage Git Pipeline: Working Directory ➔ Staging Area ➔ Local Repo ➔ Remote'
  },
  8: {
    slideId: 8,
    slug: 'add-commit',
    title: 'Add & Commit',
    imageSrc: addCommitImg,
    conceptAlt: 'Workflow of modified files staging with git add, then bundling into a permanent commit snapshot',
    caption: 'git add (Stage files) ➔ git commit (Record permanent snapshot with SHA hash)'
  },
  9: {
    slideId: 9,
    slug: 'commit-history',
    title: 'Commit History',
    imageSrc: commitHistoryImg,
    conceptAlt: 'Chronological Git commit timeline DAG graph showing project evolution and merge points',
    caption: 'Immutable Project Timeline: Branch Divergence, Checkpoints, & Time Travel'
  },
  10: {
    slideId: 10,
    slug: 'clone',
    title: 'Clone',
    imageSrc: cloneImg,
    conceptAlt: 'Cloud repository transmitting full project files and complete commit history to local computer',
    caption: 'git clone: Download complete cloud repository, branches, and full commit history locally'
  },
  11: {
    slideId: 11,
    slug: 'push-pull-fetch',
    title: 'Push, Pull & Fetch',
    imageSrc: pushPullFetchImg,
    conceptAlt: 'Directional 3-way synchronization diagram showing Push, Pull, and Fetch paths',
    caption: 'Push (Upload to cloud) | Pull (Download & Merge) | Fetch (Inspect updates safely)'
  },
  12: {
    slideId: 12,
    slug: 'pull-request',
    title: 'Pull Request',
    imageSrc: pullRequestImg,
    conceptAlt: 'Pull Request workflow: Feature branch review, team peer comments, CI checks, and merge to main',
    caption: 'Collaborative Code Review: Propose, Discuss, Inspect Diffs, and Merge Safely'
  },
  13: {
    slideId: 13,
    slug: 'security',
    title: 'GitHub Security',
    imageSrc: securityImg,
    conceptAlt: 'Multi-layer security shield guarding code repositories from leaked secrets and vulnerable dependencies',
    caption: 'Repository Defense: Automated Secret Scanning, Dependabot, & Branch Protection'
  },
  14: {
    slideId: 14,
    slug: 'fork-open-source',
    title: 'Fork & Open Source',
    imageSrc: forkOpenSourceImg,
    conceptAlt: 'Open source contribution model: Fork parent repo, build independently, and submit PR upstream',
    caption: 'Open Source Contribution: Fork ➔ Develop in Personal Copy ➔ Submit Pull Request Upstream'
  },
  15: {
    slideId: 15,
    slug: 'github-api',
    title: 'GitHub API',
    imageSrc: githubApiImg,
    conceptAlt: 'Developer client applications interacting programmatically with GitHub REST/GraphQL API gateway',
    caption: 'Programmatic Automation: Query repos, automate releases, and build integrations'
  },
  16: {
    slideId: 16,
    slug: 'profile-tour',
    title: 'GitHub Profile Tour',
    imageSrc: profileTourImg,
    conceptAlt: 'Futuristic developer profile dashboard with commit heatmap, pinned repositories, and verified stats',
    caption: 'Developer Identity: Contribution Heatmap, Pinned Projects, & Proof of Work'
  },
  17: {
    slideId: 17,
    slug: 'thank-you',
    title: 'THANK YOU',
    imageSrc: thankYouImg,
    conceptAlt: 'Cinematic concluding visual with collaboration streams unifying into finished software product',
    caption: 'Code is written by developers. Great software is built together.'
  }
};
