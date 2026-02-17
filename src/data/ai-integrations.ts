export const aiIntegrations = [
  {
    title: 'AI Meeting Notes — Auto Action Points & Deadline Tracking',
    description: 'AI-powered meeting transcription that auto-generates action items, assigns owners, tracks deadlines, and alerts on blocked/stale tasks.',
    type: 'case-study',
    tags: ['AI', 'Meetings', 'Automation', 'Slack'],
    details: [
      {
        heading: 'How It Works',
        content: 'Meeting recordings are processed through AI (Whisper + GPT). The system extracts action items, identifies assignees from the conversation, suggests deadlines based on sprint cadence, and pushes structured tasks to Linear/Jira.',
      },
      {
        heading: 'Smart Alerting',
        content: 'Tasks auto-linked to sprint boards. If a task stays in "In Progress" for >3 days or "Blocked" for >1 day, Slack alerts fire to the assignee + team lead. Weekly digest summarizes overdue items, completion rate, and blocked work.',
      },
      {
        heading: 'Integration Flow',
        content: 'Google Meet → Otter.ai/Fireflies (transcript) → Custom AI pipeline (action extraction) → Linear API (task creation) → Slack webhooks (alerts & reminders) → Notion (meeting archive with searchable notes).',
      },
    ],
    impact: 'Action item follow-through improved from 60% to 92%. Zero "forgotten" tasks from meetings. Average task completion 2 days faster.',
  },
  {
    title: 'Automatic Release Pipeline Alerting System',
    description: 'End-to-end release pipeline monitoring with intelligent alerts at every stage — build, test, deploy, post-deploy health.',
    type: 'code',
    tags: ['CI/CD', 'Alerting', 'Slack', 'Release'],
    filename: 'scripts/release-alerting.ts',
    code: `<span class="text-purple-400">interface</span> <span class="text-cyan-400">ReleaseStage</span> {
  name: <span class="text-cyan-400">string</span>;
  status: <span class="text-green-400">'pending'</span> | <span class="text-green-400">'running'</span> | <span class="text-green-400">'passed'</span> | <span class="text-green-400">'failed'</span>;
  duration: <span class="text-cyan-400">number</span>;
  threshold: <span class="text-cyan-400">number</span>;  <span class="text-gray-500">// max expected duration (ms)</span>
}

<span class="text-purple-400">const</span> PIPELINE_STAGES: <span class="text-cyan-400">ReleaseStage</span>[] = [
  { name: <span class="text-green-400">'Build'</span>,         status: <span class="text-green-400">'pending'</span>, duration: <span class="text-cyan-400">0</span>, threshold: <span class="text-cyan-400">300000</span> },
  { name: <span class="text-green-400">'Unit Tests'</span>,    status: <span class="text-green-400">'pending'</span>, duration: <span class="text-cyan-400">0</span>, threshold: <span class="text-cyan-400">180000</span> },
  { name: <span class="text-green-400">'E2E Tests'</span>,     status: <span class="text-green-400">'pending'</span>, duration: <span class="text-cyan-400">0</span>, threshold: <span class="text-cyan-400">600000</span> },
  { name: <span class="text-green-400">'Security Scan'</span>, status: <span class="text-green-400">'pending'</span>, duration: <span class="text-cyan-400">0</span>, threshold: <span class="text-cyan-400">120000</span> },
  { name: <span class="text-green-400">'Deploy Staging'</span>,status: <span class="text-green-400">'pending'</span>, duration: <span class="text-cyan-400">0</span>, threshold: <span class="text-cyan-400">240000</span> },
  { name: <span class="text-green-400">'Smoke Tests'</span>,   status: <span class="text-green-400">'pending'</span>, duration: <span class="text-cyan-400">0</span>, threshold: <span class="text-cyan-400">120000</span> },
  { name: <span class="text-green-400">'Deploy Prod'</span>,   status: <span class="text-green-400">'pending'</span>, duration: <span class="text-cyan-400">0</span>, threshold: <span class="text-cyan-400">300000</span> },
  { name: <span class="text-green-400">'Health Check'</span>,  status: <span class="text-green-400">'pending'</span>, duration: <span class="text-cyan-400">0</span>, threshold: <span class="text-cyan-400">60000</span> },
];

<span class="text-purple-400">async function</span> <span class="text-yellow-400">alertOnStageEvent</span>(stage: <span class="text-cyan-400">ReleaseStage</span>) {
  <span class="text-purple-400">if</span> (stage.status === <span class="text-green-400">'failed'</span>) {
    <span class="text-purple-400">await</span> <span class="text-yellow-400">sendSlackAlert</span>({
      channel: <span class="text-green-400">'#releases'</span>,
      level: <span class="text-green-400">'critical'</span>,
      text: <span class="text-green-400">\`Release BLOCKED: \${stage.name} failed\`</span>,
      mention: <span class="text-green-400">'@oncall-eng'</span>,
    });
  }

  <span class="text-purple-400">if</span> (stage.duration > stage.threshold) {
    <span class="text-purple-400">await</span> <span class="text-yellow-400">sendSlackAlert</span>({
      channel: <span class="text-green-400">'#releases'</span>,
      level: <span class="text-green-400">'warning'</span>,
      text: <span class="text-green-400">\`\${stage.name} exceeded threshold (\${stage.duration}ms > \${stage.threshold}ms)\`</span>,
    });
  }
}`,
    impact: 'Release failures detected in <30 seconds. Rollback initiated automatically on health check failure. Zero silent failures.',
  },
  {
    title: 'MCP Server for AI-Assisted Test Generation',
    description: 'Custom MCP (Model Context Protocol) server that provides AI assistants with context about the codebase to generate tests.',
    type: 'code',
    tags: ['MCP', 'AI', 'Test Generation'],
    filename: 'mcp-server/tools/generate-tests.ts',
    code: `<span class="text-purple-400">import</span> { McpServer } <span class="text-purple-400">from</span> <span class="text-green-400">'@modelcontextprotocol/sdk/server'</span>;

<span class="text-purple-400">const</span> server = <span class="text-purple-400">new</span> <span class="text-cyan-400">McpServer</span>({
  name: <span class="text-green-400">'qa-test-generator'</span>,
  version: <span class="text-green-400">'1.0.0'</span>,
});

<span class="text-gray-500">// Tool: Generate test cases from a source file</span>
server.<span class="text-yellow-400">tool</span>(
  <span class="text-green-400">'generate-tests'</span>,
  <span class="text-green-400">'Analyze source code and generate Playwright test cases'</span>,
  {
    filePath: { type: <span class="text-green-400">'string'</span>, description: <span class="text-green-400">'Path to source file'</span> },
    testType: {
      type: <span class="text-green-400">'string'</span>,
      enum: [<span class="text-green-400">'unit'</span>, <span class="text-green-400">'integration'</span>, <span class="text-green-400">'e2e'</span>],
    },
  },
  <span class="text-purple-400">async</span> ({ filePath, testType }) => {
    <span class="text-purple-400">const</span> source = <span class="text-purple-400">await</span> <span class="text-yellow-400">readFile</span>(filePath);
    <span class="text-purple-400">const</span> context = <span class="text-purple-400">await</span> <span class="text-yellow-400">getProjectContext</span>(filePath);

    <span class="text-purple-400">return</span> {
      content: [{
        type: <span class="text-green-400">'text'</span>,
        text: <span class="text-yellow-400">buildPrompt</span>(source, context, testType),
      }],
    };
  }
);

<span class="text-gray-500">// Resource: Expose test patterns & conventions</span>
server.<span class="text-yellow-400">resource</span>(
  <span class="text-green-400">'test-patterns'</span>,
  <span class="text-green-400">'qa://patterns/conventions'</span>,
  <span class="text-purple-400">async</span> () => ({
    contents: [{
      uri: <span class="text-green-400">'qa://patterns/conventions'</span>,
      text: <span class="text-purple-400">await</span> <span class="text-yellow-400">loadTestConventions</span>(),
    }],
  })
);`,
    impact: 'AI-generated tests follow project conventions. Test creation speed increased 5x for repetitive CRUD scenarios.',
  },
  {
    title: 'BrowserStack + JAM Bug Capture Integration',
    description: 'Automated bug capture workflow: BrowserStack screenshots, JAM recordings, auto-filed Jira tickets with reproduction steps.',
    type: 'case-study',
    tags: ['BrowserStack', 'JAM', 'Bug Capture', 'Jira'],
    details: [
      {
        heading: 'Bug Capture Flow',
        content: 'QA finds a bug → clicks JAM extension → records screen + console logs + network requests → JAM auto-generates a shareable link. BrowserStack provides cross-browser screenshots. Both attach to a Jira ticket created via automation.',
      },
      {
        heading: 'Auto-Filed Tickets',
        content: 'Integration between JAM/BrowserStack and Jira: bug reports auto-populate with environment info, browser version, OS, console errors, network failures, and reproduction video. Template ensures consistent bug reports across the team.',
      },
      {
        heading: 'Triage Dashboard',
        content: 'Custom Jira dashboard showing: new bugs by source (manual, automated, user-reported), average resolution time, bug trends by feature area, and reopened bugs tracker.',
      },
    ],
    impact: 'Bug report creation time dropped from 15min to 2min. Developer reproduction time cut by 70% thanks to auto-captured context.',
  },
  {
    title: 'Linear Integration — Auto Task Sync & Status Tracking',
    description: 'Bidirectional sync between test results and Linear project management. Test failures auto-create issues, passing tests auto-close them.',
    type: 'code',
    tags: ['Linear', 'API', 'Automation', 'Webhooks'],
    filename: 'integrations/linear-sync.ts',
    code: `<span class="text-purple-400">import</span> { LinearClient } <span class="text-purple-400">from</span> <span class="text-green-400">'@linear/sdk'</span>;

<span class="text-purple-400">const</span> linear = <span class="text-purple-400">new</span> <span class="text-cyan-400">LinearClient</span>({
  apiKey: process.env.<span class="text-white">LINEAR_API_KEY</span>!
});

<span class="text-purple-400">interface</span> <span class="text-cyan-400">TestResult</span> {
  name: <span class="text-cyan-400">string</span>;
  status: <span class="text-green-400">'passed'</span> | <span class="text-green-400">'failed'</span> | <span class="text-green-400">'flaky'</span>;
  error?: <span class="text-cyan-400">string</span>;
  duration: <span class="text-cyan-400">number</span>;
}

<span class="text-purple-400">export async function</span> <span class="text-yellow-400">syncTestResults</span>(
  results: <span class="text-cyan-400">TestResult</span>[]
) {
  <span class="text-purple-400">const</span> failures = results.<span class="text-yellow-400">filter</span>(r => r.status === <span class="text-green-400">'failed'</span>);

  <span class="text-purple-400">for</span> (<span class="text-purple-400">const</span> fail <span class="text-purple-400">of</span> failures) {
    <span class="text-gray-500">// Check if issue already exists</span>
    <span class="text-purple-400">const</span> existing = <span class="text-purple-400">await</span> <span class="text-yellow-400">findExistingIssue</span>(fail.name);

    <span class="text-purple-400">if</span> (!existing) {
      <span class="text-purple-400">await</span> linear.<span class="text-yellow-400">createIssue</span>({
        teamId: <span class="text-white">QA_TEAM_ID</span>,
        title: <span class="text-green-400">\`Test Failure: \${fail.name}\`</span>,
        description: <span class="text-yellow-400">formatFailureReport</span>(fail),
        labelIds: [<span class="text-white">LABEL_AUTO_BUG</span>],
        priority: <span class="text-cyan-400">2</span>,
      });
    }
  }

  <span class="text-gray-500">// Auto-close issues for now-passing tests</span>
  <span class="text-purple-400">const</span> passed = results.<span class="text-yellow-400">filter</span>(r => r.status === <span class="text-green-400">'passed'</span>);
  <span class="text-purple-400">for</span> (<span class="text-purple-400">const</span> pass <span class="text-purple-400">of</span> passed) {
    <span class="text-purple-400">await</span> <span class="text-yellow-400">autoCloseIfFixed</span>(pass.name);
  }
}`,
    impact: 'Test failures automatically tracked in project management. No more manual bug filing for automated test failures.',
  },
  {
    title: 'AI-Powered PR Review Checklist Generator',
    description: 'GitHub Action that analyzes PR diffs and auto-generates a QA checklist based on changed files and risk areas.',
    type: 'code',
    tags: ['GitHub', 'AI', 'PR Review', 'Automation'],
    filename: '.github/workflows/pr-checklist.yml',
    code: `<span class="text-purple-400">name</span>: <span class="text-green-400">AI QA Checklist</span>
<span class="text-purple-400">on</span>:
  <span class="text-purple-400">pull_request</span>:
    <span class="text-purple-400">types</span>: [<span class="text-green-400">opened</span>, <span class="text-green-400">synchronize</span>]

<span class="text-purple-400">jobs</span>:
  <span class="text-purple-400">generate-checklist</span>:
    <span class="text-purple-400">runs-on</span>: <span class="text-green-400">ubuntu-latest</span>
    <span class="text-purple-400">steps</span>:
      - <span class="text-purple-400">uses</span>: <span class="text-green-400">actions/checkout@v4</span>
        <span class="text-purple-400">with</span>:
          <span class="text-purple-400">fetch-depth</span>: <span class="text-cyan-400">0</span>
      - <span class="text-purple-400">name</span>: <span class="text-green-400">Get changed files</span>
        <span class="text-purple-400">id</span>: <span class="text-green-400">diff</span>
        <span class="text-purple-400">run</span>: |
          <span class="text-green-400">echo "files=$(git diff --name-only origin/main...HEAD | tr '\\n' ',')" >> $GITHUB_OUTPUT</span>
      - <span class="text-purple-400">name</span>: <span class="text-green-400">Generate QA checklist via AI</span>
        <span class="text-purple-400">uses</span>: <span class="text-green-400">actions/github-script@v7</span>
        <span class="text-purple-400">with</span>:
          <span class="text-purple-400">script</span>: |
            <span class="text-purple-400">const</span> checklist = <span class="text-purple-400">await</span> <span class="text-yellow-400">generateChecklist</span>({
              files: <span class="text-green-400">'\${{ steps.diff.outputs.files }}'</span>,
              prTitle: context.payload.pull_request.title,
              prBody: context.payload.pull_request.body,
            });
            <span class="text-purple-400">await</span> github.rest.issues.<span class="text-yellow-400">createComment</span>({
              ...context.repo,
              issue_number: context.issue.number,
              body: checklist,
            });`,
    impact: 'Every PR gets a tailored QA checklist. Reviewers know exactly what to test. Critical paths never missed.',
  },
  {
    title: 'AI Test Case Analyzer — Auto Coverage Assessment',
    description: 'Analyzes existing test suites against requirements and identifies coverage gaps using LLM analysis.',
    type: 'case-study',
    tags: ['AI', 'Coverage', 'Analysis', 'LLM'],
    details: [
      {
        heading: 'How It Works',
        content: 'Feeds the AI three inputs: (1) user stories / requirements from Jira, (2) existing test cases from code, (3) recent production bugs. The AI maps tests to requirements, identifies untested scenarios, and suggests new test cases ranked by risk.',
      },
      {
        heading: 'Output',
        content: 'Generates a coverage report: requirement → test mapping (with confidence %), gaps highlighted in red, suggested test cases for gaps, and a risk score for each uncovered area based on historical bug data.',
      },
      {
        heading: 'Integration',
        content: 'Runs weekly as a scheduled CI job. Posts coverage report to Notion and Slack. Team reviews gaps in sprint planning. Suggested tests added to backlog with priority labels.',
      },
    ],
    impact: 'Identified 23 critical untested paths in first run. Coverage visibility went from "we think we\'re good" to data-driven.',
  },
  {
    title: 'Grafana QA Dashboard with Prometheus Metrics',
    description: 'Real-time QA health dashboards: test execution trends, flaky test tracking, coverage metrics, and release quality scores.',
    type: 'code',
    tags: ['Grafana', 'Prometheus', 'Metrics', 'Dashboards'],
    filename: 'monitoring/prometheus-test-metrics.ts',
    code: `<span class="text-purple-400">import</span> { Counter, Histogram, Gauge } <span class="text-purple-400">from</span> <span class="text-green-400">'prom-client'</span>;

<span class="text-gray-500">// Test execution metrics</span>
<span class="text-purple-400">export const</span> testRunsTotal = <span class="text-purple-400">new</span> <span class="text-cyan-400">Counter</span>({
  name: <span class="text-green-400">'qa_test_runs_total'</span>,
  help: <span class="text-green-400">'Total test executions'</span>,
  labelNames: [<span class="text-green-400">'suite'</span>, <span class="text-green-400">'status'</span>, <span class="text-green-400">'environment'</span>],
});

<span class="text-purple-400">export const</span> testDuration = <span class="text-purple-400">new</span> <span class="text-cyan-400">Histogram</span>({
  name: <span class="text-green-400">'qa_test_duration_seconds'</span>,
  help: <span class="text-green-400">'Test execution duration'</span>,
  labelNames: [<span class="text-green-400">'suite'</span>],
  buckets: [<span class="text-cyan-400">1</span>, <span class="text-cyan-400">5</span>, <span class="text-cyan-400">15</span>, <span class="text-cyan-400">30</span>, <span class="text-cyan-400">60</span>, <span class="text-cyan-400">120</span>, <span class="text-cyan-400">300</span>],
});

<span class="text-purple-400">export const</span> flakyTestGauge = <span class="text-purple-400">new</span> <span class="text-cyan-400">Gauge</span>({
  name: <span class="text-green-400">'qa_flaky_tests_count'</span>,
  help: <span class="text-green-400">'Number of flaky tests detected'</span>,
  labelNames: [<span class="text-green-400">'suite'</span>],
});

<span class="text-purple-400">export const</span> coverageGauge = <span class="text-purple-400">new</span> <span class="text-cyan-400">Gauge</span>({
  name: <span class="text-green-400">'qa_test_coverage_percent'</span>,
  help: <span class="text-green-400">'Test coverage percentage'</span>,
  labelNames: [<span class="text-green-400">'type'</span>], <span class="text-gray-500">// unit, integration, e2e</span>
});

<span class="text-purple-400">export const</span> bugEscapeRate = <span class="text-purple-400">new</span> <span class="text-cyan-400">Gauge</span>({
  name: <span class="text-green-400">'qa_bug_escape_rate'</span>,
  help: <span class="text-green-400">'Percentage of bugs reaching production'</span>,
});

<span class="text-gray-500">// Grafana alert rules (provisioned via config)</span>
<span class="text-gray-500">// - Flaky tests > 10%  → Slack #qa-alerts</span>
<span class="text-gray-500">// - Coverage drop > 5%  → Slack #qa-alerts</span>
<span class="text-gray-500">// - Bug escape > 8%     → PagerDuty escalation</span>`,
    impact: 'Full observability into QA health. Flaky test count dropped from 15 to 2 after visibility enabled data-driven cleanup.',
  },
  {
    title: 'Flaky Test Detection & Auto-Retry Strategy',
    description: 'Automated system to detect, quarantine, and report flaky tests — with smart retry logic that distinguishes real failures from flakes.',
    type: 'code',
    tags: ['Flaky Tests', 'CI/CD', 'Reliability'],
    filename: 'utils/flaky-detector.ts',
    code: `<span class="text-purple-400">interface</span> <span class="text-cyan-400">TestHistory</span> {
  name: <span class="text-cyan-400">string</span>;
  results: (<span class="text-green-400">'pass'</span> | <span class="text-green-400">'fail'</span>)[];  <span class="text-gray-500">// last 20 runs</span>
}

<span class="text-purple-400">export function</span> <span class="text-yellow-400">detectFlakyTests</span>(
  history: <span class="text-cyan-400">TestHistory</span>[]
): <span class="text-cyan-400">string</span>[] {
  <span class="text-purple-400">return</span> history
    .<span class="text-yellow-400">filter</span>((test) => {
      <span class="text-purple-400">const</span> passRate = test.results
        .<span class="text-yellow-400">filter</span>(r => r === <span class="text-green-400">'pass'</span>).length
        / test.results.length;

      <span class="text-gray-500">// Flaky = passes sometimes, fails sometimes</span>
      <span class="text-purple-400">return</span> passRate > <span class="text-cyan-400">0.2</span> && passRate &lt; <span class="text-cyan-400">0.95</span>;
    })
    .<span class="text-yellow-400">map</span>(t => t.name);
}

<span class="text-gray-500">// Playwright retry config with flaky quarantine</span>
<span class="text-purple-400">export const</span> retryConfig = {
  retries: <span class="text-cyan-400">2</span>,
  <span class="text-gray-500">// Only retry on known flaky patterns</span>
  <span class="text-yellow-400">shouldRetry</span>(error: <span class="text-cyan-400">Error</span>): <span class="text-cyan-400">boolean</span> {
    <span class="text-purple-400">const</span> flakyPatterns = [
      <span class="text-green-400">/timeout/i</span>,
      <span class="text-green-400">/ECONNRESET/</span>,
      <span class="text-green-400">/element is not visible/i</span>,
      <span class="text-green-400">/navigation interrupted/i</span>,
    ];
    <span class="text-purple-400">return</span> flakyPatterns.<span class="text-yellow-400">some</span>(p => p.<span class="text-yellow-400">test</span>(error.message));
  },
};`,
    impact: 'Separated real failures from environmental flakes. CI false positive rate dropped from 18% to 2%.',
  },
  {
    title: 'Slack QA Bot — Automated Status Reporting',
    description: 'Custom Slack bot that posts daily QA summaries, responds to test status queries, and triggers test runs on demand.',
    type: 'case-study',
    tags: ['Slack Bot', 'Automation', 'Reporting'],
    details: [
      {
        heading: 'Daily Summary',
        content: 'Every morning at 9:00 AM, the bot posts to #qa-status: test suite health (pass/fail/flaky counts), coverage changes, new bugs filed, blocked releases, and upcoming release deadlines. Color-coded: green/yellow/red.',
      },
      {
        heading: 'Interactive Commands',
        content: '`/qa status` — current test health. `/qa run smoke` — triggers smoke suite on staging. `/qa flaky` — lists top 5 flakiest tests. `/qa release-check` — runs release readiness validation. `/qa coverage [feature]` — shows coverage for a specific feature area.',
      },
      {
        heading: 'Proactive Alerts',
        content: 'Bot monitors CI and proactively alerts: "E2E suite has been red for 3 consecutive runs — likely infrastructure issue, not a code bug." Reduces alert fatigue by grouping related failures.',
      },
    ],
    impact: 'Team checks QA health without leaving Slack. On-demand test runs enabled PMs to verify fixes independently.',
  },
];
