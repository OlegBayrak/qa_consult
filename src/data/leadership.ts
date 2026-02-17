export const leadership = [
  {
    title: 'QA Team Standup & Sprint Ceremony Framework',
    description: 'Structured daily standups and sprint ceremonies tailored for QA teams — async-first with Slack integration.',
    type: 'case-study',
    tags: ['Process', 'Agile'],
    details: [
      {
        heading: 'Approach',
        content:
          'Implemented a lightweight standup format: Blockers → Done → Today → Risks. Kept standups under 10 minutes with a rotating facilitator. Added async standups via Slack bot for distributed teams across time zones.',
      },
      {
        heading: 'Sprint Ceremonies',
        content:
          'QA-specific sprint planning: estimated test effort per story using T-shirt sizing, identified automation candidates upfront. Sprint retros included "Quality Score" — a custom metric combining bug escape rate + test coverage delta.',
      },
      {
        heading: 'Tools Used',
        content: 'Slack (async standups), Jira (sprint boards), Notion (ceremony templates), Google Meet.',
      },
    ],
    impact: 'Reduced standup time from 25min to 8min. Sprint planning accuracy improved by 40% after 3 sprints.',
  },
  {
    title: '1:1 Framework & Growth Plans',
    description: 'Structured 1:1 meetings with team members focused on growth, feedback, and career development.',
    type: 'case-study',
    tags: ['Mentoring', 'Leadership'],
    details: [
      {
        heading: '1:1 Structure',
        content:
          'Bi-weekly 30-minute 1:1s with a repeating agenda: (1) How are you feeling? (2) Wins this sprint, (3) Blockers / frustrations, (4) Growth goals check-in, (5) Open floor. Notes stored in shared Notion doc for accountability.',
      },
      {
        heading: 'Growth Plans',
        content:
          'Created Individual Development Plans (IDPs) for each engineer: identified skill gaps, set quarterly OKRs, assigned stretch tasks. Mapped skills to a QA competency matrix covering automation, communication, domain knowledge, and leadership.',
      },
      {
        heading: 'Outcome',
        content: 'Two junior QAs promoted to mid-level within 8 months. Team retention rate: 100% over 14 months.',
      },
    ],
    impact: 'Built a QA competency matrix adopted across 3 teams. 100% team retention over 14 months.',
  },
  {
    title: 'Knowledge Sharing Workshop System',
    description: 'Bi-weekly internal workshops where QA team members present tools, techniques, and lessons learned.',
    type: 'case-study',
    tags: ['Knowledge', 'Culture'],
    details: [
      {
        heading: 'Format',
        content:
          'Rotating presenters — each QA owns a topic they\'re passionate about. 30min presentation + 15min live demo + Q&A. Topics range from "Playwright Advanced Selectors" to "How to Read Blockchain Logs". Recorded and stored in Notion.',
      },
      {
        heading: 'Impact on Team',
        content:
          'Created a culture of ownership and continuous learning. Engineers started proactively identifying automation opportunities. Cross-pollination between manual and automation QAs improved collaboration.',
      },
    ],
    impact: 'Ran 20+ workshops. Team automation coverage increased from 30% to 65% organically through shared knowledge.',
  },
  {
    title: 'Slack Webhook Notifications for QA Events',
    description: 'Real-time Slack alerts for CI/CD test results, deployment status, and critical bug assignments.',
    type: 'code',
    tags: ['Slack', 'Webhooks', 'Automation'],
    filename: 'slack-webhook-config.yml',
    code: `<span class="text-gray-500"># GitHub Actions: Post test results to Slack</span>
<span class="text-purple-400">name</span>: <span class="text-green-400">Notify QA Channel</span>
<span class="text-purple-400">on</span>:
  <span class="text-purple-400">workflow_run</span>:
    <span class="text-purple-400">workflows</span>: [<span class="text-green-400">"E2E Tests"</span>, <span class="text-green-400">"API Tests"</span>]
    <span class="text-purple-400">types</span>: [<span class="text-green-400">completed</span>]

<span class="text-purple-400">jobs</span>:
  <span class="text-purple-400">notify</span>:
    <span class="text-purple-400">runs-on</span>: <span class="text-green-400">ubuntu-latest</span>
    <span class="text-purple-400">steps</span>:
      - <span class="text-purple-400">name</span>: <span class="text-green-400">Send Slack notification</span>
        <span class="text-purple-400">uses</span>: <span class="text-green-400">8398a7/action-slack@v3</span>
        <span class="text-purple-400">with</span>:
          <span class="text-purple-400">status</span>: <span class="text-cyan-400">\${{ github.event.workflow_run.conclusion }}</span>
          <span class="text-purple-400">fields</span>: <span class="text-green-400">repo,message,commit,author</span>
          <span class="text-purple-400">channel</span>: <span class="text-green-400">#qa-alerts</span>
        <span class="text-purple-400">env</span>:
          <span class="text-purple-400">SLACK_WEBHOOK_URL</span>: <span class="text-cyan-400">\${{ secrets.SLACK_WEBHOOK }}</span>`,
    impact: 'QA team gets instant test failure notifications. Average response time to broken builds dropped from 45min to 5min.',
  },
  {
    title: 'TestOps Setup & QA Metrics Dashboard',
    description: 'End-to-end TestOps integration: test management, reporting, and real-time quality metrics.',
    type: 'case-study',
    tags: ['TestOps', 'Metrics', 'Allure'],
    details: [
      {
        heading: 'Stack',
        content: 'Allure TestOps for test management and reporting. Integrated with Playwright, Jest, and K6. Jira sync for automatic defect linking. Grafana dashboards for historical trends.',
      },
      {
        heading: 'Key Metrics Tracked',
        content: 'Bug escape rate (prod bugs / total bugs), test coverage %, flaky test rate, average test execution time, automation ROI (hours saved vs manual), release cycle time.',
      },
      {
        heading: 'Dashboards',
        content: 'Built Grafana dashboards showing: daily test pass/fail trends, coverage heatmaps by feature, flaky test leaderboard, sprint quality scores. Shared in weekly stakeholder reviews.',
      },
    ],
    impact: 'Provided data-driven visibility into quality. Bug escape rate reduced from 12% to 4% over 6 months.',
  },
  {
    title: 'QA Documentation System',
    description: 'Standardized QA documentation framework: test plans, strategies, runbooks, and onboarding guides.',
    type: 'case-study',
    tags: ['Documentation', 'Notion', 'Process'],
    details: [
      {
        heading: 'Document Hierarchy',
        content: 'Test Strategy (project-level) → Test Plans (feature-level) → Test Cases (scenario-level) → Bug Reports (issue-level). Each level has a Notion template with required fields and review checklist.',
      },
      {
        heading: 'Onboarding Playbook',
        content: 'New QA engineer onboarding: Day 1-3 (environment setup, tool access, codebase tour), Week 1 (shadow testing, first bug report), Week 2 (own test cases, first automation PR), Month 1 (own feature ownership). Buddy system with senior QA.',
      },
      {
        heading: 'Release Readiness',
        content: 'Go/No-Go checklist: regression suite pass rate > 95%, zero P0/P1 open bugs, performance baseline met, smoke test on staging passed, stakeholder sign-off collected.',
      },
    ],
    impact: 'New engineer onboarding time reduced from 3 weeks to 1 week. Release process standardized across 4 projects.',
  },
  {
    title: 'OKR & Goal Framework for QA Teams',
    description: 'Quarterly OKR setting aligned with product goals, plus SMART goals for individual growth.',
    type: 'case-study',
    tags: ['OKRs', 'SMART', 'Strategy'],
    details: [
      {
        heading: 'Team OKR Example',
        content: 'Objective: "Ship with confidence — zero critical bugs in production." Key Results: (1) Reduce bug escape rate to < 5%, (2) Achieve 80% automation coverage for critical paths, (3) Average test suite execution < 15 minutes.',
      },
      {
        heading: 'Individual SMART Goals',
        content: 'Example for mid-level QA: "By end of Q2, create and maintain 50 automated E2E tests covering the checkout flow using Playwright, measured by Allure TestOps dashboard, reviewed in bi-weekly 1:1s."',
      },
    ],
    impact: 'Team achieved 85% of OKRs over 3 quarters. Clear alignment between individual growth and team objectives.',
  },
];
