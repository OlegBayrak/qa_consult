export interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  approach: string;
  impact: string;
  tags: string[];
  sections: {
    heading: string;
    content?: string;
    code?: string;
    filename?: string;
  }[];
}

export interface Pillar {
  id: string;
  label: string;
  tagline: string;
  icon: string;
  items: ShowcaseItem[];
}

// ─── I THINK ────────────────────────────────────────────────

const think: ShowcaseItem[] = [
  {
    id: 'qa-from-zero',
    title: 'Building a QA Team & Culture from Zero',
    subtitle: 'How I approach joining a company with no QA processes in place',
    problem:
      'Joined multiple companies (TON, Entangle) during high-risk periods with zero QA processes, no documentation, no automation, and releases shipping without testing.',
    approach:
      'Built everything from scratch: team structure, ceremonies, documentation system, test strategy, and a metrics-driven culture. Focused on quick wins first, then systematic improvement.',
    impact:
      'Reduced critical production bugs by 40%. Scaled QA from 0 to full team coverage across 4+ projects. Team retention rate 100% over 14 months.',
    tags: ['Leadership', 'Strategy', 'Process'],
    sections: [
      {
        heading: 'Phase 1: First 2 Weeks — Assessment & Quick Wins',
        content:
          'Map all active projects, identify highest-risk areas, set up basic smoke test suite for the most critical flow. Establish daily standup (async-first via Slack for distributed teams). Create a shared Notion workspace with bug report templates.',
      },
      {
        heading: 'Phase 2: Month 1 — Foundation',
        content:
          'Write the Test Strategy document: scope, approach, environments, tools, team structure. Set up CI pipeline with basic smoke tests. Introduce structured 1:1s with each engineer — assess skills, set growth plans. Create onboarding playbook for future hires.',
      },
      {
        heading: 'Phase 3: Month 2-3 — Scale',
        content:
          'Build automation framework (Playwright + TypeScript). Implement TestOps (Allure) for reporting. Launch bi-weekly knowledge sharing workshops. Introduce QA metrics dashboard: bug escape rate, coverage %, cycle time. Establish release readiness checklist.',
      },
      {
        heading: 'Team Ceremony Framework',
        code: `<span class="text-gray-500">// Team structure I implement at every company</span>

<span class="text-cyan-400">Daily</span>:     Async standup (Slack bot) — Blockers → Done → Today
<span class="text-cyan-400">Weekly</span>:    QA sync (30min) — metrics review, blockers, planning
<span class="text-cyan-400">Bi-weekly</span>: 1:1s with each engineer — growth, feedback, OKRs
<span class="text-cyan-400">Bi-weekly</span>: Knowledge sharing workshop — rotating presenters
<span class="text-cyan-400">Sprint</span>:    QA planning — test effort estimation, automation candidates
<span class="text-cyan-400">Monthly</span>:   Quality report to stakeholders — trends, risks, wins

<span class="text-gray-500">// OKR Example (Team Level)</span>
<span class="text-purple-400">Objective</span>: Ship with confidence — zero critical bugs in prod
<span class="text-green-400">KR1</span>: Bug escape rate &lt; 5%
<span class="text-green-400">KR2</span>: 80% automation coverage for critical paths
<span class="text-green-400">KR3</span>: Average test suite run &lt; 15 minutes`,
        filename: 'qa-team-framework.md',
      },
    ],
  },
  {
    id: 'release-process',
    title: 'Release Process & Quality Gates',
    subtitle: 'End-to-end release pipeline with AI-powered notes, auto test runs, and readiness gates',
    problem:
      'Releases were ad-hoc, manually coordinated via Slack messages. No standardized checklist, no automated quality gates. Teams shipped when they "felt ready" — leading to frequent rollbacks.',
    approach:
      'Designed a full release pipeline: each deployment stage triggers alerts, AI generates release notes from PR diffs, test runs auto-assign to team members, and readiness gates block bad releases.',
    impact:
      'Release cycle shortened from 5 days to 2 days. Zero manual release note writing. 100% test assignment coverage — nothing falls through cracks.',
    tags: ['Release', 'Pipeline', 'AI'],
    sections: [
      {
        heading: 'Pipeline Stages & Alerting',
        content:
          'Each stage (Dev → QA → Staging → Production) triggers a Slack notification: release version, environment URL, deployment status, rollback window. Teams know exactly when and where to test.',
      },
      {
        heading: 'AI-Generated Release Notes',
        content:
          'GitHub Action collects merged PRs since last release, sends the diff to an LLM, and generates: (1) User-facing changelog grouped by feature/fix/chore, (2) QA-facing impact analysis highlighting risky changes, (3) Auto-tagged areas needing regression.',
      },
      {
        heading: 'Release Readiness Gate',
        code: `<span class="text-gray-500"># Release readiness checklist — automated validation</span>

<span class="text-purple-400">gates</span>:
  <span class="text-purple-400">test_completion</span>:
    <span class="text-white">rule</span>: <span class="text-green-400">"All assigned test runs completed"</span>
    <span class="text-white">pass_rate</span>: <span class="text-cyan-400">&gt;= 95%</span>

  <span class="text-purple-400">bug_gate</span>:
    <span class="text-white">rule</span>: <span class="text-green-400">"No open P0 or P1 bugs"</span>
    <span class="text-white">source</span>: <span class="text-green-400">Linear / Jira API</span>

  <span class="text-purple-400">performance</span>:
    <span class="text-white">rule</span>: <span class="text-green-400">"p95 latency &lt; 500ms"</span>
    <span class="text-white">source</span>: <span class="text-green-400">K6 baseline comparison</span>

  <span class="text-purple-400">security</span>:
    <span class="text-white">rule</span>: <span class="text-green-400">"Zero critical/high vulnerabilities"</span>
    <span class="text-white">source</span>: <span class="text-green-400">Snyk / npm audit</span>

<span class="text-purple-400">on_failure</span>:
  <span class="text-white">block_deploy</span>: <span class="text-cyan-400">true</span>
  <span class="text-white">notify</span>: <span class="text-green-400">"#releases → release manager + QA lead"</span>
  <span class="text-white">report</span>: <span class="text-green-400">"Auto-generate gap report with action items"</span>`,
        filename: 'release-gates.yml',
      },
    ],
  },
  {
    id: 'metrics-culture',
    title: 'QA Metrics & Data-Driven Quality Culture',
    subtitle: 'Moving from "we think we\'re good" to proving it with numbers',
    problem:
      'Quality was measured by gut feeling. No visibility into test health, bug trends, or release readiness. Stakeholders had to trust QA "vibes" instead of data.',
    approach:
      'Built a metrics framework: Prometheus collects test execution data, Grafana visualizes trends, Allure TestOps tracks coverage, and weekly quality reports go to stakeholders with actionable insights.',
    impact:
      'Bug escape rate reduced from 12% to 4%. Flaky test count dropped from 15 to 2. Stakeholders gained confidence in release quality — no more "are we ready?" meetings.',
    tags: ['Metrics', 'Grafana', 'Prometheus'],
    sections: [
      {
        heading: 'Key Metrics I Track',
        content:
          'Bug escape rate (prod bugs / total bugs) — the north star. Test coverage % by feature area. Flaky test rate and trend. Average test execution time. Automation ROI (hours saved vs manual). Release cycle time. Mean time to detection (MTTD) for production issues.',
      },
      {
        heading: 'Prometheus Metrics Implementation',
        code: `<span class="text-purple-400">import</span> { Counter, Histogram, Gauge } <span class="text-purple-400">from</span> <span class="text-green-400">'prom-client'</span>;

<span class="text-purple-400">export const</span> testRuns = <span class="text-purple-400">new</span> <span class="text-cyan-400">Counter</span>({
  name: <span class="text-green-400">'qa_test_runs_total'</span>,
  help: <span class="text-green-400">'Total test executions'</span>,
  labelNames: [<span class="text-green-400">'suite'</span>, <span class="text-green-400">'status'</span>, <span class="text-green-400">'env'</span>],
});

<span class="text-purple-400">export const</span> bugEscapeRate = <span class="text-purple-400">new</span> <span class="text-cyan-400">Gauge</span>({
  name: <span class="text-green-400">'qa_bug_escape_rate'</span>,
  help: <span class="text-green-400">'Bugs reaching production (%)'</span>,
});

<span class="text-purple-400">export const</span> flakyTests = <span class="text-purple-400">new</span> <span class="text-cyan-400">Gauge</span>({
  name: <span class="text-green-400">'qa_flaky_tests_count'</span>,
  help: <span class="text-green-400">'Currently flaky tests'</span>,
  labelNames: [<span class="text-green-400">'suite'</span>],
});

<span class="text-gray-500">// Alert rules:</span>
<span class="text-gray-500">// Flaky tests &gt; 10%   → Slack #qa-alerts</span>
<span class="text-gray-500">// Coverage drop &gt; 5%  → Slack #qa-alerts</span>
<span class="text-gray-500">// Bug escape &gt; 8%     → PagerDuty escalation</span>`,
        filename: 'monitoring/qa-metrics.ts',
      },
      {
        heading: 'Grafana Dashboards',
        content:
          'Four dashboards: (1) Service Health — uptime, latency, error rates. (2) Test Health — pass/fail trends, flaky test leaderboard, execution times. (3) Release Quality — bug escape rate, rollback frequency, readiness scores. (4) Team Metrics — coverage velocity, automation ROI, sprint quality scores.',
      },
    ],
  },
];

// ─── I BUILD ────────────────────────────────────────────────

const build: ShowcaseItem[] = [
  {
    id: 'test-framework',
    title: 'Scalable Test Framework Architecture',
    subtitle: 'Playwright + TypeScript framework built for teams — not just individual contributors',
    problem:
      'Each project had ad-hoc test scripts — no shared patterns, no reusable utilities, no consistent reporting. New engineers spent weeks understanding the test codebase.',
    approach:
      'Designed a framework with Page Object Model, custom fixtures, multi-environment config, and Allure reporting. Structured so a new engineer can write their first test within 2 days.',
    impact:
      'Framework adopted across 4 projects. New engineer onboarding: from 3 weeks to 2 days. Test maintenance effort reduced by 60%.',
    tags: ['Playwright', 'TypeScript', 'Architecture'],
    sections: [
      {
        heading: 'Project Structure',
        code: `<span class="text-gray-500">tests/</span>
├── <span class="text-cyan-400">fixtures/</span>
│   ├── base.fixture.ts       <span class="text-gray-500"># Custom test fixtures (auth, API client)</span>
│   └── test-data.fixture.ts  <span class="text-gray-500"># Test data factories</span>
├── <span class="text-cyan-400">pages/</span>
│   ├── BasePage.ts            <span class="text-gray-500"># Shared page methods</span>
│   ├── LoginPage.ts           <span class="text-gray-500"># Page Object Model</span>
│   └── DashboardPage.ts
├── <span class="text-cyan-400">api/</span>
│   ├── ApiClient.ts           <span class="text-gray-500"># Typed API wrapper</span>
│   └── endpoints/
├── <span class="text-cyan-400">e2e/</span>
│   ├── auth.spec.ts           <span class="text-gray-500"># E2E test suites</span>
│   └── checkout.spec.ts
├── <span class="text-cyan-400">utils/</span>
│   ├── schema-validator.ts    <span class="text-gray-500"># OpenAPI validation</span>
│   └── db-client.ts           <span class="text-gray-500"># Direct DB assertions</span>
└── playwright.config.ts       <span class="text-gray-500"># Multi-env, parallel, Allure</span>`,
        filename: 'project-structure',
      },
      {
        heading: 'Page Object Pattern',
        code: `<span class="text-purple-400">import</span> { <span class="text-cyan-400">Page</span>, <span class="text-cyan-400">Locator</span>, expect } <span class="text-purple-400">from</span> <span class="text-green-400">'@playwright/test'</span>;

<span class="text-purple-400">export class</span> <span class="text-cyan-400">LoginPage</span> {
  <span class="text-purple-400">private readonly</span> email: <span class="text-cyan-400">Locator</span>;
  <span class="text-purple-400">private readonly</span> password: <span class="text-cyan-400">Locator</span>;
  <span class="text-purple-400">private readonly</span> submit: <span class="text-cyan-400">Locator</span>;

  <span class="text-purple-400">constructor</span>(<span class="text-purple-400">private</span> page: <span class="text-cyan-400">Page</span>) {
    <span class="text-purple-400">this</span>.email = page.<span class="text-yellow-400">getByLabel</span>(<span class="text-green-400">'Email'</span>);
    <span class="text-purple-400">this</span>.password = page.<span class="text-yellow-400">getByLabel</span>(<span class="text-green-400">'Password'</span>);
    <span class="text-purple-400">this</span>.submit = page.<span class="text-yellow-400">getByRole</span>(<span class="text-green-400">'button'</span>, { name: <span class="text-green-400">'Sign in'</span> });
  }

  <span class="text-purple-400">async</span> <span class="text-yellow-400">login</span>(email: <span class="text-cyan-400">string</span>, pass: <span class="text-cyan-400">string</span>) {
    <span class="text-purple-400">await</span> <span class="text-purple-400">this</span>.email.<span class="text-yellow-400">fill</span>(email);
    <span class="text-purple-400">await</span> <span class="text-purple-400">this</span>.password.<span class="text-yellow-400">fill</span>(pass);
    <span class="text-purple-400">await</span> <span class="text-purple-400">this</span>.submit.<span class="text-yellow-400">click</span>();
  }
}`,
        filename: 'pages/LoginPage.ts',
      },
      {
        heading: 'Config with Multi-Environment + Sharding',
        code: `<span class="text-purple-400">export default</span> <span class="text-yellow-400">defineConfig</span>({
  testDir: <span class="text-green-400">'./tests'</span>,
  fullyParallel: <span class="text-cyan-400">true</span>,
  retries: process.env.<span class="text-white">CI</span> ? <span class="text-cyan-400">2</span> : <span class="text-cyan-400">0</span>,
  workers: process.env.<span class="text-white">CI</span> ? <span class="text-cyan-400">4</span> : <span class="text-cyan-400">undefined</span>,
  reporter: [[<span class="text-green-400">'html'</span>], [<span class="text-green-400">'allure-playwright'</span>], [<span class="text-green-400">'github'</span>]],
  use: {
    baseURL: process.env.<span class="text-white">BASE_URL</span> || <span class="text-green-400">'http://localhost:3000'</span>,
    trace: <span class="text-green-400">'on-first-retry'</span>,
    screenshot: <span class="text-green-400">'only-on-failure'</span>,
  },
  projects: [
    { name: <span class="text-green-400">'setup'</span>, testMatch: <span class="text-green-400">'**/*.setup.ts'</span> },
    { name: <span class="text-green-400">'chromium'</span>, use: devices[<span class="text-green-400">'Desktop Chrome'</span>], dependencies: [<span class="text-green-400">'setup'</span>] },
    { name: <span class="text-green-400">'mobile'</span>, use: devices[<span class="text-green-400">'iPhone 14'</span>], dependencies: [<span class="text-green-400">'setup'</span>] },
  ],
});`,
        filename: 'playwright.config.ts',
      },
    ],
  },
  {
    id: 'cicd-pipeline',
    title: 'CI/CD Pipeline with Quality Gates',
    subtitle: 'Every PR gets automated quality validation — nothing merges without proof',
    problem:
      'PRs merged with broken tests, linting errors, and no E2E validation. Production bugs were caught by users, not by the pipeline.',
    approach:
      'Built a multi-stage GitHub Actions pipeline: lint → type check → unit tests → E2E smoke → security scan. 4x parallel sharding for speed. Allure reports published automatically.',
    impact:
      'CI time reduced from 25min to 7min with parallel shards. 85% of issues caught before code review. Zero PRs merge with failing tests.',
    tags: ['GitHub Actions', 'CI/CD', 'Docker'],
    sections: [
      {
        heading: 'Pipeline Architecture',
        code: `<span class="text-gray-500"># PR opens → parallel quality gates → merge allowed</span>

<span class="text-purple-400">name</span>: <span class="text-green-400">PR Quality Gates</span>
<span class="text-purple-400">on</span>:
  <span class="text-purple-400">pull_request</span>:
    <span class="text-purple-400">types</span>: [<span class="text-green-400">opened</span>, <span class="text-green-400">synchronize</span>]
<span class="text-purple-400">concurrency</span>:
  <span class="text-purple-400">group</span>: <span class="text-green-400">pr-\${{ github.event.pull_request.number }}</span>
  <span class="text-purple-400">cancel-in-progress</span>: <span class="text-cyan-400">true</span>

<span class="text-purple-400">jobs</span>:
  <span class="text-purple-400">lint-and-types</span>:        <span class="text-gray-500"># Stage 1: Fast checks</span>
    <span class="text-purple-400">runs-on</span>: <span class="text-green-400">ubuntu-latest</span>
    <span class="text-purple-400">steps</span>:
      - <span class="text-purple-400">run</span>: <span class="text-green-400">npm run lint && npm run typecheck</span>

  <span class="text-purple-400">unit-tests</span>:             <span class="text-gray-500"># Stage 1: Parallel with lint</span>
    <span class="text-purple-400">steps</span>:
      - <span class="text-purple-400">run</span>: <span class="text-green-400">npm run test:unit -- --coverage</span>
      - <span class="text-purple-400">uses</span>: <span class="text-green-400">codecov/codecov-action@v4</span>

  <span class="text-purple-400">e2e-tests</span>:              <span class="text-gray-500"># Stage 2: After lint passes</span>
    <span class="text-purple-400">needs</span>: [<span class="text-green-400">lint-and-types</span>]
    <span class="text-purple-400">strategy</span>:
      <span class="text-purple-400">matrix</span>:
        <span class="text-purple-400">shard</span>: [<span class="text-cyan-400">1/4</span>, <span class="text-cyan-400">2/4</span>, <span class="text-cyan-400">3/4</span>, <span class="text-cyan-400">4/4</span>]  <span class="text-gray-500"># 4x parallel</span>
    <span class="text-purple-400">steps</span>:
      - <span class="text-purple-400">run</span>: <span class="text-green-400">npx playwright test --shard=\${{ matrix.shard }}</span>`,
        filename: '.github/workflows/pr-checks.yml',
      },
      {
        heading: 'Docker Test Environment',
        code: `<span class="text-purple-400">services</span>:
  <span class="text-purple-400">app</span>:
    <span class="text-purple-400">build</span>: { <span class="text-purple-400">context</span>: <span class="text-green-400">.</span>, <span class="text-purple-400">target</span>: <span class="text-green-400">test</span> }
    <span class="text-purple-400">environment</span>:
      - <span class="text-green-400">DATABASE_URL=postgresql://test:test@db:5432/testdb</span>
    <span class="text-purple-400">depends_on</span>:
      <span class="text-purple-400">db</span>: { <span class="text-purple-400">condition</span>: <span class="text-green-400">service_healthy</span> }

  <span class="text-purple-400">db</span>:
    <span class="text-purple-400">image</span>: <span class="text-green-400">postgres:16-alpine</span>
    <span class="text-purple-400">healthcheck</span>:
      <span class="text-purple-400">test</span>: [<span class="text-green-400">"CMD"</span>, <span class="text-green-400">"pg_isready"</span>]
      <span class="text-purple-400">interval</span>: <span class="text-green-400">5s</span>
      <span class="text-purple-400">retries</span>: <span class="text-green-400">5</span>`,
        filename: 'docker-compose.test.yml',
      },
    ],
  },
  {
    id: 'performance-testing',
    title: 'Performance Testing at Scale',
    subtitle: 'K6 load testing integrated into CI with Grafana dashboards and automatic regression detection',
    problem:
      'No performance testing existed. A critical N+1 query issue only surfaced under real load. Users experienced 5+ second response times during peak hours.',
    approach:
      'Built K6 load test suite with staged load profiles, custom metrics, and threshold-based CI gates. Results stream to Grafana for visualization. Performance regression auto-detected via baseline comparison.',
    impact:
      'Caught the N+1 query before launch (only appeared at 150+ concurrent users). p95 latency reduced from 5.2s to 380ms. Zero performance incidents post-launch.',
    tags: ['K6', 'Grafana', 'Performance'],
    sections: [
      {
        heading: 'K6 Load Test with Custom Metrics',
        code: `<span class="text-purple-400">import</span> http <span class="text-purple-400">from</span> <span class="text-green-400">'k6/http'</span>;
<span class="text-purple-400">import</span> { check, sleep } <span class="text-purple-400">from</span> <span class="text-green-400">'k6'</span>;
<span class="text-purple-400">import</span> { Rate, Trend } <span class="text-purple-400">from</span> <span class="text-green-400">'k6/metrics'</span>;

<span class="text-purple-400">const</span> errorRate = <span class="text-purple-400">new</span> <span class="text-cyan-400">Rate</span>(<span class="text-green-400">'errors'</span>);
<span class="text-purple-400">const</span> apiLatency = <span class="text-purple-400">new</span> <span class="text-cyan-400">Trend</span>(<span class="text-green-400">'api_latency'</span>);

<span class="text-purple-400">export const</span> options = {
  stages: [
    { duration: <span class="text-green-400">'1m'</span>,  target: <span class="text-cyan-400">50</span> },   <span class="text-gray-500">// Warm up</span>
    { duration: <span class="text-green-400">'3m'</span>,  target: <span class="text-cyan-400">200</span> },  <span class="text-gray-500">// Peak</span>
    { duration: <span class="text-green-400">'2m'</span>,  target: <span class="text-cyan-400">200</span> },  <span class="text-gray-500">// Sustain</span>
    { duration: <span class="text-green-400">'1m'</span>,  target: <span class="text-cyan-400">0</span> },    <span class="text-gray-500">// Cool down</span>
  ],
  thresholds: {
    <span class="text-green-400">'http_req_duration'</span>: [<span class="text-green-400">'p(95)&lt;500'</span>],  <span class="text-gray-500">// p95 under 500ms</span>
    <span class="text-green-400">'errors'</span>:            [<span class="text-green-400">'rate&lt;0.05'</span>],  <span class="text-gray-500">// &lt;5% error rate</span>
  },
};

<span class="text-purple-400">export default function</span> () {
  <span class="text-purple-400">const</span> res = http.<span class="text-yellow-400">get</span>(<span class="text-green-400">\`\${__ENV.BASE_URL}/api/products\`</span>);
  apiLatency.<span class="text-yellow-400">add</span>(res.timings.duration);
  errorRate.<span class="text-yellow-400">add</span>(res.status !== <span class="text-cyan-400">200</span>);
  <span class="text-yellow-400">check</span>(res, {
    <span class="text-green-400">'status 200'</span>: (r) => r.status === <span class="text-cyan-400">200</span>,
    <span class="text-green-400">'fast response'</span>: (r) => r.timings.duration &lt; <span class="text-cyan-400">500</span>,
  });
  <span class="text-yellow-400">sleep</span>(<span class="text-cyan-400">1</span>);
}`,
        filename: 'tests/load/api-load.js',
      },
      {
        heading: 'CI Integration — Auto Regression Detection',
        content:
          'K6 runs nightly against staging. Results compared to the baseline from the last successful run. If p95 latency regresses by >20% or error rate increases, a Slack alert fires with the specific endpoint and commit range that caused the regression.',
      },
    ],
  },
];

// ─── I INNOVATE ─────────────────────────────────────────────

const innovate: ShowcaseItem[] = [
  {
    id: 'ai-test-generation',
    title: 'AI-Powered Test Generation & PR Review',
    subtitle: 'Using MCP servers and LLMs to generate tests, review PRs, and enforce best practices',
    problem:
      'Writing tests for repetitive CRUD endpoints was slow. PR reviews missed edge cases. New engineers didn\'t know the team\'s testing conventions.',
    approach:
      'Built an MCP server that gives AI context about our codebase, testing patterns, and conventions. AI generates test scaffolds, reviews PRs with QA-specific checklists, and enforces best practices via prompt rules.',
    impact:
      'Test creation speed increased 5x for repetitive scenarios. PR review quality improved — AI catches edge cases humans miss. New engineers productive in days, not weeks.',
    tags: ['MCP', 'AI', 'Automation'],
    sections: [
      {
        heading: 'MCP Server — Codebase Context for AI',
        code: `<span class="text-purple-400">import</span> { McpServer } <span class="text-purple-400">from</span> <span class="text-green-400">'@modelcontextprotocol/sdk/server'</span>;

<span class="text-purple-400">const</span> server = <span class="text-purple-400">new</span> <span class="text-cyan-400">McpServer</span>({
  name: <span class="text-green-400">'qa-assistant'</span>,
  version: <span class="text-green-400">'1.0.0'</span>,
});

<span class="text-gray-500">// Tool: Generate tests from source code</span>
server.<span class="text-yellow-400">tool</span>(
  <span class="text-green-400">'generate-tests'</span>,
  <span class="text-green-400">'Analyze source and generate Playwright tests'</span>,
  { filePath: { type: <span class="text-green-400">'string'</span> }, testType: { type: <span class="text-green-400">'string'</span> } },
  <span class="text-purple-400">async</span> ({ filePath, testType }) => {
    <span class="text-purple-400">const</span> source = <span class="text-purple-400">await</span> <span class="text-yellow-400">readFile</span>(filePath);
    <span class="text-purple-400">const</span> conventions = <span class="text-purple-400">await</span> <span class="text-yellow-400">loadTestConventions</span>();
    <span class="text-purple-400">return</span> {
      content: [{ type: <span class="text-green-400">'text'</span>, text: <span class="text-yellow-400">buildPrompt</span>(source, conventions, testType) }],
    };
  }
);

<span class="text-gray-500">// Resource: Expose team conventions to AI</span>
server.<span class="text-yellow-400">resource</span>(
  <span class="text-green-400">'conventions'</span>,
  <span class="text-green-400">'qa://conventions'</span>,
  <span class="text-purple-400">async</span> () => ({
    contents: [{ uri: <span class="text-green-400">'qa://conventions'</span>, text: <span class="text-purple-400">await</span> <span class="text-yellow-400">loadTestConventions</span>() }],
  })
);`,
        filename: 'mcp-server/qa-assistant.ts',
      },
      {
        heading: 'AI Prompt Rules for Test Best Practices',
        code: `<span class="text-gray-500"># .cursor/rules — AI prompt hinting for test quality</span>

<span class="text-purple-400">When writing Playwright tests</span>, follow these conventions:

<span class="text-cyan-400">Structure</span>:
- Use Page Object Model for all page interactions
- One spec file per feature area
- Group related tests with describe blocks
- Use <span class="text-green-400">getByRole</span>, <span class="text-green-400">getByLabel</span>, <span class="text-green-400">getByTestId</span> — never CSS selectors

<span class="text-cyan-400">Assertions</span>:
- Always assert <span class="text-green-400">visible state</span> before interaction
- Use <span class="text-green-400">toBeVisible()</span> not <span class="text-green-400">toExist()</span>
- Prefer <span class="text-green-400">toHaveText()</span> over <span class="text-green-400">toContainText()</span> for exact matches
- Add <span class="text-green-400">timeout assertions</span> for async operations

<span class="text-cyan-400">Anti-patterns to flag</span>:
- <span class="text-red-400">No hardcoded waits</span> (page.waitForTimeout)
- <span class="text-red-400">No test interdependence</span> — each test must be isolated
- <span class="text-red-400">No shared mutable state</span> between tests
- <span class="text-red-400">No selectors based on class names or CSS</span>

<span class="text-cyan-400">Data</span>:
- Use test data factories, never hardcoded values
- Clean up test data in afterEach hooks
- Use API shortcuts for setup, UI for assertions`,
        filename: '.cursor/rules',
      },
      {
        heading: 'Auto PR Checklist via GitHub Action',
        content:
          'On every PR, a GitHub Action analyzes the diff, identifies changed areas, and posts an auto-generated QA checklist as a PR comment. The checklist is tailored to what was changed — API changes get schema validation items, UI changes get cross-browser items, DB changes get data integrity items.',
      },
    ],
  },
  {
    id: 'smart-alerting',
    title: 'Smart Alerting & Observability',
    subtitle: 'Intelligent alerts that reduce noise and surface real issues — not just "test failed"',
    problem:
      'Alert fatigue — the team ignored Slack alerts because 80% were false positives (flaky tests, transient infra issues). Real problems got buried in noise.',
    approach:
      'Built a smart alerting layer: flaky test detection quarantines known flakes, alerts are grouped and deduplicated, severity is auto-classified, and escalation follows a clear chain. Grafana dashboards provide at-a-glance health.',
    impact:
      'False positive alerts reduced from 80% to 5%. Mean time to detection (MTTD) dropped from 30min to 2min. Zero undetected production incidents over 8 months.',
    tags: ['BetterStack', 'Grafana', 'Alerting'],
    sections: [
      {
        heading: 'Flaky Test Detection & Quarantine',
        code: `<span class="text-purple-400">export function</span> <span class="text-yellow-400">detectFlaky</span>(history: <span class="text-cyan-400">TestHistory</span>[]): <span class="text-cyan-400">string</span>[] {
  <span class="text-purple-400">return</span> history
    .<span class="text-yellow-400">filter</span>((t) => {
      <span class="text-purple-400">const</span> rate = t.results
        .<span class="text-yellow-400">filter</span>(r => r === <span class="text-green-400">'pass'</span>).length / t.results.length;
      <span class="text-purple-400">return</span> rate > <span class="text-cyan-400">0.2</span> && rate &lt; <span class="text-cyan-400">0.95</span>;  <span class="text-gray-500">// Inconsistent = flaky</span>
    })
    .<span class="text-yellow-400">map</span>(t => t.name);
}

<span class="text-gray-500">// Smart retry — only retry on known flaky patterns</span>
<span class="text-purple-400">export const</span> retryConfig = {
  <span class="text-yellow-400">shouldRetry</span>(error: <span class="text-cyan-400">Error</span>): <span class="text-cyan-400">boolean</span> {
    <span class="text-purple-400">const</span> flakyPatterns = [
      <span class="text-green-400">/timeout/i</span>,
      <span class="text-green-400">/ECONNRESET/</span>,
      <span class="text-green-400">/navigation interrupted/i</span>,
    ];
    <span class="text-purple-400">return</span> flakyPatterns.<span class="text-yellow-400">some</span>(p => p.<span class="text-yellow-400">test</span>(error.message));
  },
};`,
        filename: 'utils/flaky-detector.ts',
      },
      {
        heading: 'Alert Escalation Chain',
        content:
          'P0 (service down >1min): PagerDuty → Slack → Phone call. P1 (error rate >5% for 5min): Slack #incidents with auto-created Linear issue. P2 (p95 latency >2s): Slack #monitoring. P3 (flaky test rate >10%): Daily digest to QA channel. Each level has clear ownership and SLA.',
      },
    ],
  },
  {
    id: 'bug-capture-triage',
    title: 'Automated Bug Capture & Intelligent Triage',
    subtitle: 'From bug discovery to developer fix — automated with context-rich reports and smart prioritization',
    problem:
      'Bug reports took 15 minutes to write. Developers couldn\'t reproduce issues. Triage meetings wasted hours debating priority. User-reported bugs fell through cracks.',
    approach:
      'Integrated BrowserStack + JAM for auto-capture (screen recording, console logs, network requests). Built auto-triage pipeline: bugs classified by severity using historical data, auto-assigned based on feature ownership, support tickets linked to test coverage gaps.',
    impact:
      'Bug report creation: 15min → 2min. Developer reproduction time cut 70%. Critical bug recurrence reduced 35% through support-driven triaging.',
    tags: ['BrowserStack', 'JAM', 'Linear', 'Triage'],
    sections: [
      {
        heading: 'Auto-Capture Flow',
        content:
          'QA finds bug → clicks JAM extension → records screen + console + network → JAM generates shareable link. BrowserStack provides cross-browser screenshots. Both auto-attach to a Linear/Jira ticket with: environment info, browser version, OS, console errors, network failures, and reproduction video.',
      },
      {
        heading: 'Smart Triage Pipeline',
        code: `<span class="text-purple-400">interface</span> <span class="text-cyan-400">BugReport</span> {
  source: <span class="text-green-400">'automated'</span> | <span class="text-green-400">'manual'</span> | <span class="text-green-400">'user-reported'</span>;
  area: <span class="text-cyan-400">string</span>;          <span class="text-gray-500">// feature area from stacktrace</span>
  frequency: <span class="text-cyan-400">number</span>;     <span class="text-gray-500">// times reported in 30 days</span>
  userImpact: <span class="text-cyan-400">number</span>;    <span class="text-gray-500">// affected users count</span>
}

<span class="text-purple-400">function</span> <span class="text-yellow-400">autoTriage</span>(bug: <span class="text-cyan-400">BugReport</span>): <span class="text-cyan-400">Priority</span> {
  <span class="text-gray-500">// P0: Data loss or security issue</span>
  <span class="text-purple-400">if</span> (bug.area.<span class="text-yellow-400">match</span>(<span class="text-green-400">/auth|payment|data/</span>)) <span class="text-purple-400">return</span> <span class="text-green-400">'P0'</span>;

  <span class="text-gray-500">// P1: High frequency + many users affected</span>
  <span class="text-purple-400">if</span> (bug.frequency > <span class="text-cyan-400">5</span> && bug.userImpact > <span class="text-cyan-400">100</span>) <span class="text-purple-400">return</span> <span class="text-green-400">'P1'</span>;

  <span class="text-gray-500">// P2: Recurring but lower impact</span>
  <span class="text-purple-400">if</span> (bug.frequency > <span class="text-cyan-400">2</span>) <span class="text-purple-400">return</span> <span class="text-green-400">'P2'</span>;

  <span class="text-purple-400">return</span> <span class="text-green-400">'P3'</span>;
}

<span class="text-gray-500">// Auto-assign to feature owner from CODEOWNERS</span>
<span class="text-purple-400">async function</span> <span class="text-yellow-400">autoAssign</span>(bug: <span class="text-cyan-400">BugReport</span>) {
  <span class="text-purple-400">const</span> owner = <span class="text-purple-400">await</span> <span class="text-yellow-400">getCodeOwner</span>(bug.area);
  <span class="text-purple-400">await</span> linear.<span class="text-yellow-400">updateIssue</span>(bug.id, {
    assigneeId: owner,
    priority: <span class="text-yellow-400">autoTriage</span>(bug),
  });
}`,
        filename: 'integrations/auto-triage.ts',
      },
      {
        heading: 'Support-Driven Testing',
        content:
          'Linked Jira/Linear with support ticket data. Bugs reported by users automatically increase priority weight. Most-reported issues feed directly into regression test backlog. Weekly report shows "Top 5 user pain points" mapped to test coverage gaps.',
      },
    ],
  },
];

// ─── EXPORT ─────────────────────────────────────────────────

export const pillars: Pillar[] = [
  {
    id: 'think',
    label: 'I Think',
    tagline: 'Strategy, leadership, and quality culture',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>`,
    items: think,
  },
  {
    id: 'build',
    label: 'I Build',
    tagline: 'Frameworks, pipelines, and infrastructure',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`,
    items: build,
  },
  {
    id: 'innovate',
    label: 'I Innovate',
    tagline: 'AI integrations and smart tooling',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
    items: innovate,
  },
];
