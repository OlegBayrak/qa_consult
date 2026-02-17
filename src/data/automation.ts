export const automation = [
  {
    title: 'Playwright Project Structure & Configuration',
    description: 'Scalable Playwright test framework with Page Object Model, custom fixtures, and multi-environment support.',
    type: 'code',
    tags: ['Playwright', 'TypeScript', 'Architecture'],
    filename: 'playwright.config.ts',
    code: `<span class="text-purple-400">import</span> { defineConfig, devices } <span class="text-purple-400">from</span> <span class="text-green-400">'@playwright/test'</span>;

<span class="text-purple-400">export default</span> <span class="text-yellow-400">defineConfig</span>({
  testDir: <span class="text-green-400">'./tests'</span>,
  fullyParallel: <span class="text-cyan-400">true</span>,
  retries: process.env.<span class="text-white">CI</span> ? <span class="text-cyan-400">2</span> : <span class="text-cyan-400">0</span>,
  workers: process.env.<span class="text-white">CI</span> ? <span class="text-cyan-400">4</span> : <span class="text-cyan-400">undefined</span>,
  reporter: [
    [<span class="text-green-400">'html'</span>],
    [<span class="text-green-400">'allure-playwright'</span>],
    [<span class="text-green-400">'github'</span>],  <span class="text-gray-500">// GitHub Actions annotations</span>
  ],

  use: {
    baseURL: process.env.<span class="text-white">BASE_URL</span> || <span class="text-green-400">'http://localhost:3000'</span>,
    trace: <span class="text-green-400">'on-first-retry'</span>,
    screenshot: <span class="text-green-400">'only-on-failure'</span>,
    video: <span class="text-green-400">'retain-on-failure'</span>,
  },

  projects: [
    {
      name: <span class="text-green-400">'setup'</span>,
      testMatch: <span class="text-green-400">'**/*.setup.ts'</span>,  <span class="text-gray-500">// Auth setup</span>
    },
    {
      name: <span class="text-green-400">'chromium'</span>,
      use: { ...devices[<span class="text-green-400">'Desktop Chrome'</span>] },
      dependencies: [<span class="text-green-400">'setup'</span>],
    },
    {
      name: <span class="text-green-400">'mobile'</span>,
      use: { ...devices[<span class="text-green-400">'iPhone 14'</span>] },
      dependencies: [<span class="text-green-400">'setup'</span>],
    },
  ],
});`,
    impact: 'Clean, maintainable framework used across 4 projects. New test engineers productive within 2 days.',
  },
  {
    title: 'Page Object Model Pattern',
    description: 'Reusable Page Object classes with typed locators, action methods, and assertion helpers.',
    type: 'code',
    tags: ['Playwright', 'POM', 'TypeScript'],
    filename: 'pages/LoginPage.ts',
    code: `<span class="text-purple-400">import</span> { <span class="text-cyan-400">Page</span>, <span class="text-cyan-400">Locator</span>, expect } <span class="text-purple-400">from</span> <span class="text-green-400">'@playwright/test'</span>;

<span class="text-purple-400">export class</span> <span class="text-cyan-400">LoginPage</span> {
  <span class="text-purple-400">private readonly</span> emailInput: <span class="text-cyan-400">Locator</span>;
  <span class="text-purple-400">private readonly</span> passwordInput: <span class="text-cyan-400">Locator</span>;
  <span class="text-purple-400">private readonly</span> submitBtn: <span class="text-cyan-400">Locator</span>;
  <span class="text-purple-400">private readonly</span> errorMsg: <span class="text-cyan-400">Locator</span>;

  <span class="text-purple-400">constructor</span>(<span class="text-purple-400">private</span> page: <span class="text-cyan-400">Page</span>) {
    <span class="text-purple-400">this</span>.emailInput = page.<span class="text-yellow-400">getByLabel</span>(<span class="text-green-400">'Email'</span>);
    <span class="text-purple-400">this</span>.passwordInput = page.<span class="text-yellow-400">getByLabel</span>(<span class="text-green-400">'Password'</span>);
    <span class="text-purple-400">this</span>.submitBtn = page.<span class="text-yellow-400">getByRole</span>(<span class="text-green-400">'button'</span>, { name: <span class="text-green-400">'Sign in'</span> });
    <span class="text-purple-400">this</span>.errorMsg = page.<span class="text-yellow-400">getByTestId</span>(<span class="text-green-400">'login-error'</span>);
  }

  <span class="text-purple-400">async</span> <span class="text-yellow-400">goto</span>() {
    <span class="text-purple-400">await</span> <span class="text-purple-400">this</span>.page.<span class="text-yellow-400">goto</span>(<span class="text-green-400">'/login'</span>);
  }

  <span class="text-purple-400">async</span> <span class="text-yellow-400">login</span>(email: <span class="text-cyan-400">string</span>, password: <span class="text-cyan-400">string</span>) {
    <span class="text-purple-400">await</span> <span class="text-purple-400">this</span>.emailInput.<span class="text-yellow-400">fill</span>(email);
    <span class="text-purple-400">await</span> <span class="text-purple-400">this</span>.passwordInput.<span class="text-yellow-400">fill</span>(password);
    <span class="text-purple-400">await</span> <span class="text-purple-400">this</span>.submitBtn.<span class="text-yellow-400">click</span>();
  }

  <span class="text-purple-400">async</span> <span class="text-yellow-400">expectError</span>(message: <span class="text-cyan-400">string</span>) {
    <span class="text-purple-400">await</span> <span class="text-yellow-400">expect</span>(<span class="text-purple-400">this</span>.errorMsg).<span class="text-yellow-400">toHaveText</span>(message);
  }

  <span class="text-purple-400">async</span> <span class="text-yellow-400">expectLoggedIn</span>() {
    <span class="text-purple-400">await</span> <span class="text-yellow-400">expect</span>(<span class="text-purple-400">this</span>.page).<span class="text-yellow-400">toHaveURL</span>(<span class="text-green-400">/dashboard/</span>);
  }
}`,
    impact: 'Single source of truth for each page. Locator changes fixed in one place, not scattered across 50 test files.',
  },
  {
    title: 'K6 Load Testing Script',
    description: 'Performance testing with K6: staged load, thresholds, custom metrics, and CI integration.',
    type: 'code',
    tags: ['K6', 'Performance', 'Load Testing'],
    filename: 'tests/load/api-load-test.js',
    code: `<span class="text-purple-400">import</span> http <span class="text-purple-400">from</span> <span class="text-green-400">'k6/http'</span>;
<span class="text-purple-400">import</span> { check, sleep } <span class="text-purple-400">from</span> <span class="text-green-400">'k6'</span>;
<span class="text-purple-400">import</span> { Rate, Trend } <span class="text-purple-400">from</span> <span class="text-green-400">'k6/metrics'</span>;

<span class="text-gray-500">// Custom metrics</span>
<span class="text-purple-400">const</span> errorRate = <span class="text-purple-400">new</span> <span class="text-cyan-400">Rate</span>(<span class="text-green-400">'errors'</span>);
<span class="text-purple-400">const</span> apiDuration = <span class="text-purple-400">new</span> <span class="text-cyan-400">Trend</span>(<span class="text-green-400">'api_duration'</span>);

<span class="text-purple-400">export const</span> options = {
  stages: [
    { duration: <span class="text-green-400">'1m'</span>,  target: <span class="text-cyan-400">50</span> },   <span class="text-gray-500">// Ramp up</span>
    { duration: <span class="text-green-400">'3m'</span>,  target: <span class="text-cyan-400">200</span> },  <span class="text-gray-500">// Peak load</span>
    { duration: <span class="text-green-400">'2m'</span>,  target: <span class="text-cyan-400">200</span> },  <span class="text-gray-500">// Sustain</span>
    { duration: <span class="text-green-400">'1m'</span>,  target: <span class="text-cyan-400">0</span> },    <span class="text-gray-500">// Ramp down</span>
  ],
  thresholds: {
    <span class="text-green-400">'http_req_duration'</span>: [<span class="text-green-400">'p(95)&lt;500'</span>],
    <span class="text-green-400">'errors'</span>: [<span class="text-green-400">'rate&lt;0.05'</span>],
    <span class="text-green-400">'api_duration'</span>: [<span class="text-green-400">'avg&lt;300'</span>],
  },
};

<span class="text-purple-400">export default function</span> () {
  <span class="text-purple-400">const</span> res = http.<span class="text-yellow-400">get</span>(<span class="text-green-400">\`\${__ENV.BASE_URL}/api/v1/products\`</span>);

  apiDuration.<span class="text-yellow-400">add</span>(res.timings.duration);
  errorRate.<span class="text-yellow-400">add</span>(res.status !== <span class="text-cyan-400">200</span>);

  <span class="text-yellow-400">check</span>(res, {
    <span class="text-green-400">'status is 200'</span>: (r) => r.status === <span class="text-cyan-400">200</span>,
    <span class="text-green-400">'response &lt; 500ms'</span>: (r) => r.timings.duration &lt; <span class="text-cyan-400">500</span>,
    <span class="text-green-400">'has valid body'</span>: (r) => r.json(<span class="text-green-400">'data'</span>).length > <span class="text-cyan-400">0</span>,
  });

  <span class="text-yellow-400">sleep</span>(<span class="text-cyan-400">1</span>);
}`,
    impact: 'Caught a critical N+1 query issue that only appeared under 150+ concurrent users. Fixed before launch.',
  },
  {
    title: 'API Testing Framework with Swagger Validation',
    description: 'REST API testing with response schema validation against Swagger/OpenAPI specs.',
    type: 'code',
    tags: ['API', 'Swagger', 'Playwright', 'REST'],
    filename: 'tests/api/products.spec.ts',
    code: `<span class="text-purple-400">import</span> { test, expect } <span class="text-purple-400">from</span> <span class="text-green-400">'@playwright/test'</span>;
<span class="text-purple-400">import</span> { validateSchema } <span class="text-purple-400">from</span> <span class="text-green-400">'../utils/schema-validator'</span>;
<span class="text-purple-400">import</span> spec <span class="text-purple-400">from</span> <span class="text-green-400">'../specs/openapi.json'</span>;

<span class="text-purple-400">const</span> API = <span class="text-green-400">'/api/v1'</span>;

test.<span class="text-yellow-400">describe</span>(<span class="text-green-400">'Products API'</span>, () => {
  test(<span class="text-green-400">'GET /products — returns list with valid schema'</span>,
    <span class="text-purple-400">async</span> ({ request }) => {
      <span class="text-purple-400">const</span> res = <span class="text-purple-400">await</span> request.<span class="text-yellow-400">get</span>(<span class="text-green-400">\`\${API}/products\`</span>);

      <span class="text-yellow-400">expect</span>(res.status()).<span class="text-yellow-400">toBe</span>(<span class="text-cyan-400">200</span>);

      <span class="text-purple-400">const</span> body = <span class="text-purple-400">await</span> res.<span class="text-yellow-400">json</span>();
      <span class="text-yellow-400">expect</span>(body.data.length).<span class="text-yellow-400">toBeGreaterThan</span>(<span class="text-cyan-400">0</span>);

      <span class="text-gray-500">// Validate against OpenAPI schema</span>
      <span class="text-purple-400">const</span> isValid = <span class="text-yellow-400">validateSchema</span>(
        body,
        spec.paths[<span class="text-green-400">'/products'</span>].get.responses[<span class="text-green-400">'200'</span>]
      );
      <span class="text-yellow-400">expect</span>(isValid.errors).<span class="text-yellow-400">toHaveLength</span>(<span class="text-cyan-400">0</span>);
  });

  test(<span class="text-green-400">'POST /products — validates required fields'</span>,
    <span class="text-purple-400">async</span> ({ request }) => {
      <span class="text-purple-400">const</span> res = <span class="text-purple-400">await</span> request.<span class="text-yellow-400">post</span>(<span class="text-green-400">\`\${API}/products\`</span>, {
        data: { name: <span class="text-green-400">''</span> }, <span class="text-gray-500">// Missing required fields</span>
      });

      <span class="text-yellow-400">expect</span>(res.status()).<span class="text-yellow-400">toBe</span>(<span class="text-cyan-400">422</span>);
      <span class="text-purple-400">const</span> body = <span class="text-purple-400">await</span> res.<span class="text-yellow-400">json</span>();
      <span class="text-yellow-400">expect</span>(body.errors).<span class="text-yellow-400">toContainEqual</span>(
        <span class="text-yellow-400">expect</span>.<span class="text-yellow-400">objectContaining</span>({ field: <span class="text-green-400">'price'</span> })
      );
  });
});`,
    impact: 'Schema drift caught automatically. API contract violations detected before reaching frontend.',
  },
  {
    title: 'Blockchain Smart Contract Testing with Hardhat',
    description: 'Testing Solidity smart contracts: unit tests, gas optimization, event validation, and edge cases.',
    type: 'code',
    tags: ['Hardhat', 'Solidity', 'Web3', 'Blockchain'],
    filename: 'test/Token.test.ts',
    code: `<span class="text-purple-400">import</span> { expect } <span class="text-purple-400">from</span> <span class="text-green-400">'chai'</span>;
<span class="text-purple-400">import</span> { ethers } <span class="text-purple-400">from</span> <span class="text-green-400">'hardhat'</span>;
<span class="text-purple-400">import</span> { <span class="text-cyan-400">Contract</span>, <span class="text-cyan-400">Signer</span> } <span class="text-purple-400">from</span> <span class="text-green-400">'ethers'</span>;

<span class="text-yellow-400">describe</span>(<span class="text-green-400">'Token Contract'</span>, () => {
  <span class="text-purple-400">let</span> token: <span class="text-cyan-400">Contract</span>;
  <span class="text-purple-400">let</span> owner: <span class="text-cyan-400">Signer</span>, addr1: <span class="text-cyan-400">Signer</span>;

  <span class="text-yellow-400">beforeEach</span>(<span class="text-purple-400">async</span> () => {
    [owner, addr1] = <span class="text-purple-400">await</span> ethers.<span class="text-yellow-400">getSigners</span>();
    <span class="text-purple-400">const</span> Token = <span class="text-purple-400">await</span> ethers.<span class="text-yellow-400">getContractFactory</span>(<span class="text-green-400">'MyToken'</span>);
    token = <span class="text-purple-400">await</span> Token.<span class="text-yellow-400">deploy</span>(<span class="text-green-400">'TestToken'</span>, <span class="text-green-400">'TT'</span>, <span class="text-cyan-400">1000000</span>);
  });

  <span class="text-yellow-400">it</span>(<span class="text-green-400">'should transfer tokens and emit event'</span>, <span class="text-purple-400">async</span> () => {
    <span class="text-purple-400">await</span> <span class="text-yellow-400">expect</span>(
      token.<span class="text-yellow-400">transfer</span>(<span class="text-purple-400">await</span> addr1.<span class="text-yellow-400">getAddress</span>(), <span class="text-cyan-400">100</span>)
    )
      .<span class="text-yellow-400">to</span>.<span class="text-yellow-400">emit</span>(token, <span class="text-green-400">'Transfer'</span>)
      .<span class="text-yellow-400">withArgs</span>(
        <span class="text-purple-400">await</span> owner.<span class="text-yellow-400">getAddress</span>(),
        <span class="text-purple-400">await</span> addr1.<span class="text-yellow-400">getAddress</span>(),
        <span class="text-cyan-400">100</span>
      );

    <span class="text-purple-400">const</span> balance = <span class="text-purple-400">await</span> token.<span class="text-yellow-400">balanceOf</span>(
      <span class="text-purple-400">await</span> addr1.<span class="text-yellow-400">getAddress</span>()
    );
    <span class="text-yellow-400">expect</span>(balance).<span class="text-yellow-400">to</span>.<span class="text-yellow-400">equal</span>(<span class="text-cyan-400">100</span>);
  });

  <span class="text-yellow-400">it</span>(<span class="text-green-400">'should revert on insufficient balance'</span>, <span class="text-purple-400">async</span> () => {
    <span class="text-purple-400">await</span> <span class="text-yellow-400">expect</span>(
      token.<span class="text-yellow-400">connect</span>(addr1).<span class="text-yellow-400">transfer</span>(
        <span class="text-purple-400">await</span> owner.<span class="text-yellow-400">getAddress</span>(), <span class="text-cyan-400">1</span>
      )
    ).<span class="text-yellow-400">to</span>.<span class="text-yellow-400">be</span>.<span class="text-yellow-400">revertedWith</span>(<span class="text-green-400">'Insufficient balance'</span>);
  });
});`,
    impact: 'Full smart contract test coverage including edge cases, reentrancy attacks, and gas optimization checks.',
  },
  {
    title: 'Cypress + Cucumber BDD Tests',
    description: 'Behavior-driven tests using Cypress with Cucumber Gherkin syntax for stakeholder-readable scenarios.',
    type: 'code',
    tags: ['Cypress', 'Cucumber', 'BDD'],
    filename: 'cypress/e2e/checkout.feature',
    code: `<span class="text-purple-400">Feature</span>: Checkout Flow
  <span class="text-gray-500">As a logged-in customer</span>
  <span class="text-gray-500">I want to complete a purchase</span>
  <span class="text-gray-500">So that I receive my ordered items</span>

  <span class="text-purple-400">Background</span>:
    <span class="text-cyan-400">Given</span> I am logged in as <span class="text-green-400">"test@example.com"</span>
    <span class="text-cyan-400">And</span> I have items in my cart

  <span class="text-purple-400">Scenario</span>: Successful checkout with credit card
    <span class="text-cyan-400">When</span> I navigate to checkout
    <span class="text-cyan-400">And</span> I fill in shipping address
    <span class="text-cyan-400">And</span> I select <span class="text-green-400">"Credit Card"</span> as payment method
    <span class="text-cyan-400">And</span> I confirm the order
    <span class="text-cyan-400">Then</span> I should see <span class="text-green-400">"Order confirmed"</span>
    <span class="text-cyan-400">And</span> I should receive a confirmation email

  <span class="text-purple-400">Scenario Outline</span>: Validation errors on checkout
    <span class="text-cyan-400">When</span> I navigate to checkout
    <span class="text-cyan-400">And</span> I leave <span class="text-green-400">"&lt;field&gt;"</span> empty
    <span class="text-cyan-400">And</span> I try to continue
    <span class="text-cyan-400">Then</span> I should see error <span class="text-green-400">"&lt;error&gt;"</span>

    <span class="text-purple-400">Examples</span>:
      | field    | error                    |
      | address  | Address is required      |
      | city     | City is required         |
      | zip      | Valid zip code required  |`,
    impact: 'Product owners and stakeholders can read and validate test scenarios directly. Bridged the gap between QA and business.',
  },
  {
    title: 'Database Testing — PostgreSQL Data Validation',
    description: 'SQL-based data integrity tests validating business logic at the database level.',
    type: 'code',
    tags: ['PostgreSQL', 'SQL', 'Data Testing'],
    filename: 'tests/db/data-integrity.spec.ts',
    code: `<span class="text-purple-400">import</span> { test, expect } <span class="text-purple-400">from</span> <span class="text-green-400">'@playwright/test'</span>;
<span class="text-purple-400">import</span> { db } <span class="text-purple-400">from</span> <span class="text-green-400">'../utils/db-client'</span>;

test.<span class="text-yellow-400">describe</span>(<span class="text-green-400">'Data Integrity'</span>, () => {
  test(<span class="text-green-400">'orders total matches line items sum'</span>,
    <span class="text-purple-400">async</span> () => {
      <span class="text-purple-400">const</span> mismatches = <span class="text-purple-400">await</span> db.<span class="text-yellow-400">query</span>(<span class="text-green-400">\`
        SELECT o.id, o.total,
               SUM(li.price * li.quantity) AS calculated
        FROM orders o
        JOIN line_items li ON li.order_id = o.id
        GROUP BY o.id, o.total
        HAVING o.total != SUM(li.price * li.quantity)
      \`</span>);

      <span class="text-yellow-400">expect</span>(mismatches.rows).toHaveLength(<span class="text-cyan-400">0</span>);
  });

  test(<span class="text-green-400">'no orphaned records after user deletion'</span>,
    <span class="text-purple-400">async</span> () => {
      <span class="text-purple-400">const</span> orphans = <span class="text-purple-400">await</span> db.<span class="text-yellow-400">query</span>(<span class="text-green-400">\`
        SELECT p.id FROM profiles p
        LEFT JOIN users u ON u.id = p.user_id
        WHERE u.id IS NULL
      \`</span>);

      <span class="text-yellow-400">expect</span>(orphans.rows).toHaveLength(<span class="text-cyan-400">0</span>);
  });
});`,
    impact: 'Caught a pricing calculation bug where tax rounding caused $0.01-$0.03 discrepancies on 15% of orders.',
  },
];
