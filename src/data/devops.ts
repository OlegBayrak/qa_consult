export const devops = [
  {
    title: 'Release Pipeline Process with AI-Powered Release Notes & Auto Test Runs',
    description: 'Full release pipeline: auto-generates release notes from GH changes via AI, notifies per-stage deployment, creates test runs assigned to team, and tracks env-specific testing.',
    type: 'case-study',
    tags: ['Release', 'AI', 'Pipeline', 'TestOps', 'Alerting'],
    details: [
      {
        heading: 'Pipeline Stages & Alerts',
        content: 'Each deployment stage (Dev → QA → Staging → Production) triggers a Slack notification with a pre-filled message: release version, environment URL, deployment status, and estimated rollback window. Teams know exactly when and where to test.',
      },
      {
        heading: 'AI-Generated Release Notes',
        content: 'A GitHub Action collects all merged PRs since last release, sends the diff to an LLM (OpenAI/Claude), and generates: (1) User-facing changelog grouped by feature/fix/chore, (2) QA-facing impact analysis highlighting risky changes, (3) Auto-tagged areas needing regression testing.',
      },
      {
        heading: 'Auto Test Run Creation',
        content: 'On QA environment deployment, the system auto-creates test runs in TestRail/Allure TestOps: assigns test cases to team members based on feature ownership, sets priority based on change risk analysis, and includes the release notes + environment URLs in the run description. Team members get Slack DMs with their assigned test cases.',
      },
      {
        heading: 'Release Readiness Gate',
        content: 'Before production deploy: automated checks verify all test runs completed, pass rate > 95%, no P0/P1 bugs open, performance baseline met, and security scan passed. If any gate fails, deployment is blocked and the release manager gets a detailed report of what\'s missing.',
      },
    ],
    impact: 'Release cycle shortened from 5 days to 2 days. Zero manual release note writing. 100% test assignment coverage — nothing falls through cracks.',
  },
  {
    title: 'GitHub Actions CI/CD Pipeline for E2E Tests',
    description: 'Full CI/CD pipeline running Playwright E2E tests on every PR with parallel execution, caching, and Allure reporting.',
    type: 'code',
    tags: ['GitHub Actions', 'CI/CD', 'Playwright'],
    filename: '.github/workflows/e2e-tests.yml',
    code: `<span class="text-purple-400">name</span>: <span class="text-green-400">E2E Tests</span>
<span class="text-purple-400">on</span>:
  <span class="text-purple-400">pull_request</span>:
    <span class="text-purple-400">branches</span>: [<span class="text-green-400">main</span>, <span class="text-green-400">develop</span>]
  <span class="text-purple-400">push</span>:
    <span class="text-purple-400">branches</span>: [<span class="text-green-400">main</span>]

<span class="text-purple-400">env</span>:
  <span class="text-purple-400">CI</span>: <span class="text-green-400">true</span>
  <span class="text-purple-400">BASE_URL</span>: <span class="text-cyan-400">\${{ secrets.STAGING_URL }}</span>

<span class="text-purple-400">jobs</span>:
  <span class="text-purple-400">e2e</span>:
    <span class="text-purple-400">runs-on</span>: <span class="text-green-400">ubuntu-latest</span>
    <span class="text-purple-400">strategy</span>:
      <span class="text-purple-400">matrix</span>:
        <span class="text-purple-400">shard</span>: [<span class="text-cyan-400">1/4</span>, <span class="text-cyan-400">2/4</span>, <span class="text-cyan-400">3/4</span>, <span class="text-cyan-400">4/4</span>]
    <span class="text-purple-400">steps</span>:
      - <span class="text-purple-400">uses</span>: <span class="text-green-400">actions/checkout@v4</span>
      - <span class="text-purple-400">uses</span>: <span class="text-green-400">actions/setup-node@v4</span>
        <span class="text-purple-400">with</span>:
          <span class="text-purple-400">node-version</span>: <span class="text-cyan-400">20</span>
          <span class="text-purple-400">cache</span>: <span class="text-green-400">npm</span>
      - <span class="text-purple-400">run</span>: <span class="text-green-400">npm ci</span>
      - <span class="text-purple-400">run</span>: <span class="text-green-400">npx playwright install --with-deps chromium</span>
      - <span class="text-purple-400">name</span>: <span class="text-green-400">Run E2E tests (shard \${{ matrix.shard }})</span>
        <span class="text-purple-400">run</span>: <span class="text-green-400">npx playwright test --shard=\${{ matrix.shard }}</span>
      - <span class="text-purple-400">uses</span>: <span class="text-green-400">actions/upload-artifact@v4</span>
        <span class="text-purple-400">if</span>: <span class="text-cyan-400">always()</span>
        <span class="text-purple-400">with</span>:
          <span class="text-purple-400">name</span>: <span class="text-green-400">test-results-\${{ matrix.shard }}</span>
          <span class="text-purple-400">path</span>: <span class="text-green-400">test-results/</span>`,
    impact: 'Tests run in 4 parallel shards — total CI time reduced from 25min to 7min. Every PR gets quality gates.',
  },
  {
    title: 'Docker Containerized Test Environment',
    description: 'Docker Compose setup for spinning up isolated test environments with app, database, and test runner.',
    type: 'code',
    tags: ['Docker', 'Infrastructure', 'PostgreSQL'],
    filename: 'docker-compose.test.yml',
    code: `<span class="text-purple-400">version</span>: <span class="text-green-400">'3.8'</span>

<span class="text-purple-400">services</span>:
  <span class="text-purple-400">app</span>:
    <span class="text-purple-400">build</span>:
      <span class="text-purple-400">context</span>: <span class="text-green-400">.</span>
      <span class="text-purple-400">target</span>: <span class="text-green-400">test</span>
    <span class="text-purple-400">environment</span>:
      - <span class="text-green-400">DATABASE_URL=postgresql://test:test@db:5432/testdb</span>
      - <span class="text-green-400">NODE_ENV=test</span>
      - <span class="text-green-400">REDIS_URL=redis://redis:6379</span>
    <span class="text-purple-400">depends_on</span>:
      <span class="text-purple-400">db</span>:
        <span class="text-purple-400">condition</span>: <span class="text-green-400">service_healthy</span>
    <span class="text-purple-400">ports</span>:
      - <span class="text-green-400">"3000:3000"</span>

  <span class="text-purple-400">db</span>:
    <span class="text-purple-400">image</span>: <span class="text-green-400">postgres:16-alpine</span>
    <span class="text-purple-400">environment</span>:
      <span class="text-purple-400">POSTGRES_USER</span>: <span class="text-green-400">test</span>
      <span class="text-purple-400">POSTGRES_PASSWORD</span>: <span class="text-green-400">test</span>
      <span class="text-purple-400">POSTGRES_DB</span>: <span class="text-green-400">testdb</span>
    <span class="text-purple-400">healthcheck</span>:
      <span class="text-purple-400">test</span>: [<span class="text-green-400">"CMD-SHELL"</span>, <span class="text-green-400">"pg_isready -U test"</span>]
      <span class="text-purple-400">interval</span>: <span class="text-green-400">5s</span>
      <span class="text-purple-400">timeout</span>: <span class="text-green-400">5s</span>
      <span class="text-purple-400">retries</span>: <span class="text-green-400">5</span>

  <span class="text-purple-400">test-runner</span>:
    <span class="text-purple-400">build</span>:
      <span class="text-purple-400">context</span>: <span class="text-green-400">.</span>
      <span class="text-purple-400">dockerfile</span>: <span class="text-green-400">Dockerfile.tests</span>
    <span class="text-purple-400">depends_on</span>:
      - <span class="text-green-400">app</span>
    <span class="text-purple-400">volumes</span>:
      - <span class="text-green-400">./test-results:/app/test-results</span>`,
    impact: 'One command to spin up a full test environment. No more "works on my machine" — consistent across all engineers.',
  },
  {
    title: 'BetterStack + Grafana Alerting Pipeline',
    description: 'Monitoring and alerting setup: BetterStack for uptime, Prometheus for metrics, Grafana for dashboards, PagerDuty for on-call.',
    type: 'case-study',
    tags: ['BetterStack', 'Grafana', 'Prometheus', 'Alerting'],
    details: [
      {
        heading: 'Architecture',
        content: 'BetterStack monitors endpoint health (HTTP checks every 30s). Prometheus scrapes app metrics (response times, error rates, queue depth). Grafana visualizes both sources in unified dashboards. Critical alerts route to PagerDuty → Slack → Email escalation chain.',
      },
      {
        heading: 'Alert Rules',
        content: 'P0: Service down > 1min → PagerDuty + Slack. P1: Error rate > 5% for 5min → Slack #incidents. P2: Response time p95 > 2s for 10min → Slack #monitoring. P3: Test flakiness > 10% → Daily digest to QA channel.',
      },
      {
        heading: 'Dashboards',
        content: 'Four key dashboards: (1) Service Health — uptime, latency, error rates; (2) Test Health — pass rates, flaky tests, execution trends; (3) Release Quality — bug escape rate, rollback frequency; (4) Team Metrics — coverage %, automation velocity.',
      },
    ],
    impact: 'Mean time to detection (MTTD) dropped from 30min to 2min. Zero undetected production incidents over 8 months.',
  },
  {
    title: 'Secret Vault & Environment Variable Management',
    description: 'Secure secrets management using GitHub Secrets, HashiCorp Vault, and environment-specific configs.',
    type: 'code',
    tags: ['Security', 'Vault', 'GitHub Secrets'],
    filename: 'config/env-manager.ts',
    code: `<span class="text-gray-500">// Environment configuration manager with Vault integration</span>
<span class="text-purple-400">import</span> { config } <span class="text-purple-400">from</span> <span class="text-green-400">'dotenv'</span>;

<span class="text-purple-400">type</span> <span class="text-cyan-400">Env</span> = <span class="text-green-400">'local'</span> | <span class="text-green-400">'staging'</span> | <span class="text-green-400">'production'</span>;

<span class="text-purple-400">interface</span> <span class="text-cyan-400">AppConfig</span> {
  <span class="text-white">baseUrl</span>: <span class="text-cyan-400">string</span>;
  <span class="text-white">apiKey</span>: <span class="text-cyan-400">string</span>;
  <span class="text-white">dbConnectionString</span>: <span class="text-cyan-400">string</span>;
  <span class="text-white">slackWebhook</span>: <span class="text-cyan-400">string</span>;
}

<span class="text-purple-400">export function</span> <span class="text-yellow-400">getConfig</span>(): <span class="text-cyan-400">AppConfig</span> {
  <span class="text-purple-400">const</span> env = (process.env.<span class="text-white">TEST_ENV</span> || <span class="text-green-400">'local'</span>) <span class="text-purple-400">as</span> <span class="text-cyan-400">Env</span>;

  <span class="text-gray-500">// Local: use .env file (gitignored)</span>
  <span class="text-purple-400">if</span> (env === <span class="text-green-400">'local'</span>) {
    config({ path: <span class="text-green-400">'.env.local'</span> });
  }

  <span class="text-gray-500">// CI/Staging/Prod: use GitHub Secrets / Vault</span>
  <span class="text-purple-400">const</span> required = [<span class="text-green-400">'BASE_URL'</span>, <span class="text-green-400">'API_KEY'</span>, <span class="text-green-400">'DB_URL'</span>];
  <span class="text-purple-400">for</span> (<span class="text-purple-400">const</span> key <span class="text-purple-400">of</span> required) {
    <span class="text-purple-400">if</span> (!process.env[key]) {
      <span class="text-purple-400">throw new</span> <span class="text-cyan-400">Error</span>(<span class="text-green-400">\`Missing env var: \${key}\`</span>);
    }
  }

  <span class="text-purple-400">return</span> {
    baseUrl: process.env.<span class="text-white">BASE_URL</span>!,
    apiKey: process.env.<span class="text-white">API_KEY</span>!,
    dbConnectionString: process.env.<span class="text-white">DB_URL</span>!,
    slackWebhook: process.env.<span class="text-white">SLACK_WEBHOOK</span> || <span class="text-green-400">''</span>,
  };
}`,
    impact: 'Zero secret leaks. Environment configs validated at startup — no more runtime crashes from missing variables.',
  },
  {
    title: 'PR Quality Gates Workflow',
    description: 'Automated PR checks: lint, type check, unit tests, E2E smoke tests — all must pass before merge.',
    type: 'code',
    tags: ['GitHub Actions', 'Quality Gates', 'PR Checks'],
    filename: '.github/workflows/pr-checks.yml',
    code: `<span class="text-purple-400">name</span>: <span class="text-green-400">PR Quality Gates</span>
<span class="text-purple-400">on</span>:
  <span class="text-purple-400">pull_request</span>:
    <span class="text-purple-400">types</span>: [<span class="text-green-400">opened</span>, <span class="text-green-400">synchronize</span>, <span class="text-green-400">reopened</span>]

<span class="text-purple-400">concurrency</span>:
  <span class="text-purple-400">group</span>: <span class="text-green-400">pr-\${{ github.event.pull_request.number }}</span>
  <span class="text-purple-400">cancel-in-progress</span>: <span class="text-green-400">true</span>

<span class="text-purple-400">jobs</span>:
  <span class="text-purple-400">lint-and-types</span>:
    <span class="text-purple-400">runs-on</span>: <span class="text-green-400">ubuntu-latest</span>
    <span class="text-purple-400">steps</span>:
      - <span class="text-purple-400">uses</span>: <span class="text-green-400">actions/checkout@v4</span>
      - <span class="text-purple-400">run</span>: <span class="text-green-400">npm ci</span>
      - <span class="text-purple-400">run</span>: <span class="text-green-400">npm run lint</span>
      - <span class="text-purple-400">run</span>: <span class="text-green-400">npm run typecheck</span>

  <span class="text-purple-400">unit-tests</span>:
    <span class="text-purple-400">runs-on</span>: <span class="text-green-400">ubuntu-latest</span>
    <span class="text-purple-400">steps</span>:
      - <span class="text-purple-400">uses</span>: <span class="text-green-400">actions/checkout@v4</span>
      - <span class="text-purple-400">run</span>: <span class="text-green-400">npm ci</span>
      - <span class="text-purple-400">run</span>: <span class="text-green-400">npm run test:unit -- --coverage</span>
      - <span class="text-purple-400">uses</span>: <span class="text-green-400">codecov/codecov-action@v4</span>

  <span class="text-purple-400">smoke-e2e</span>:
    <span class="text-purple-400">needs</span>: [<span class="text-green-400">lint-and-types</span>]
    <span class="text-purple-400">runs-on</span>: <span class="text-green-400">ubuntu-latest</span>
    <span class="text-purple-400">steps</span>:
      - <span class="text-purple-400">uses</span>: <span class="text-green-400">actions/checkout@v4</span>
      - <span class="text-purple-400">run</span>: <span class="text-green-400">npm ci</span>
      - <span class="text-purple-400">run</span>: <span class="text-green-400">npx playwright install chromium</span>
      - <span class="text-purple-400">run</span>: <span class="text-green-400">npx playwright test --grep @smoke</span>`,
    impact: 'No PR merges without passing all gates. Caught 85% of issues before code review even started.',
  },
  {
    title: 'Test Environment Provisioning',
    description: 'On-demand test environments for feature branches with automatic cleanup.',
    type: 'case-study',
    tags: ['Infrastructure', 'Environments', 'Preview'],
    details: [
      {
        heading: 'Approach',
        content: 'Every PR gets an ephemeral preview environment deployed automatically. Uses Docker + cloud provider (Vercel/Railway) to spin up isolated instances with their own database seeded with test data.',
      },
      {
        heading: 'Lifecycle',
        content: 'PR opened → environment provisioned (2-3 min) → URL posted as PR comment → QA tests against it → PR merged/closed → environment destroyed. Cost-effective: environments only live while PR is open.',
      },
      {
        heading: 'Benefits',
        content: 'QA can test features in isolation without blocking staging. Multiple features tested simultaneously. Exact reproduction of bugs with specific branch code.',
      },
    ],
    impact: 'Eliminated staging bottleneck. QA throughput increased 3x — parallel testing of multiple features.',
  },
  {
    title: 'Allure Report Integration in CI',
    description: 'Automated Allure test report generation and publishing as GitHub Pages artifact on every test run.',
    type: 'code',
    tags: ['Allure', 'Reporting', 'CI/CD'],
    filename: '.github/workflows/allure-report.yml',
    code: `<span class="text-purple-400">name</span>: <span class="text-green-400">Publish Allure Report</span>

<span class="text-purple-400">on</span>:
  <span class="text-purple-400">workflow_run</span>:
    <span class="text-purple-400">workflows</span>: [<span class="text-green-400">"E2E Tests"</span>]
    <span class="text-purple-400">types</span>: [<span class="text-green-400">completed</span>]

<span class="text-purple-400">jobs</span>:
  <span class="text-purple-400">report</span>:
    <span class="text-purple-400">runs-on</span>: <span class="text-green-400">ubuntu-latest</span>
    <span class="text-purple-400">steps</span>:
      - <span class="text-purple-400">uses</span>: <span class="text-green-400">actions/checkout@v4</span>
      - <span class="text-purple-400">name</span>: <span class="text-green-400">Download test results</span>
        <span class="text-purple-400">uses</span>: <span class="text-green-400">actions/download-artifact@v4</span>
        <span class="text-purple-400">with</span>:
          <span class="text-purple-400">pattern</span>: <span class="text-green-400">test-results-*</span>
          <span class="text-purple-400">merge-multiple</span>: <span class="text-green-400">true</span>
          <span class="text-purple-400">path</span>: <span class="text-green-400">allure-results</span>
      - <span class="text-purple-400">name</span>: <span class="text-green-400">Generate Allure Report</span>
        <span class="text-purple-400">uses</span>: <span class="text-green-400">simple-elf/allure-report-action@v1</span>
        <span class="text-purple-400">with</span>:
          <span class="text-purple-400">allure_results</span>: <span class="text-green-400">allure-results</span>
          <span class="text-purple-400">allure_history</span>: <span class="text-green-400">allure-history</span>
          <span class="text-purple-400">keep_reports</span>: <span class="text-cyan-400">30</span>
      - <span class="text-purple-400">name</span>: <span class="text-green-400">Deploy to GitHub Pages</span>
        <span class="text-purple-400">uses</span>: <span class="text-green-400">peaceiris/actions-gh-pages@v4</span>
        <span class="text-purple-400">with</span>:
          <span class="text-purple-400">github_token</span>: <span class="text-cyan-400">\${{ secrets.GITHUB_TOKEN }}</span>
          <span class="text-purple-400">publish_dir</span>: <span class="text-green-400">allure-history</span>`,
    impact: 'Every test run produces a beautiful, browsable Allure report. Historical trends show test health over time.',
  },
];
