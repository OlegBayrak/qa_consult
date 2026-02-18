## QA Consult — Oleh Bairak

Personal portfolio for **QA Tech Lead & Test Infrastructure Manager** work, built with **Astro + Tailwind CSS**.

The site highlights experience, skills, and real examples of test infrastructure, automation, and tooling.

- Main page: `http://localhost:4321/qa_consult/`
- Showcase page: `http://localhost:4321/qa_consult/showcase`

### Features

- **Hero section** with quick CTAs:
  - `View My Work & History` → scrolls to experience
  - `Check What I Can` → opens the showcase page
  - `Contact Me` → scrolls to the contact section
- **Sections**: About, Skills, Portfolio teaser, Experience, Contact
- **Showcase**: detailed examples of tooling, automation, and frameworks
- **Back to top** button that appears when you scroll down

### Tech stack

- [Astro](https://astro.build/) for the site framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- TypeScript config for better DX

### Local development

From the project root:

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321/qa_consult/`.

### Production build

```bash
npm run build
npm run preview
```

This builds the site into `dist/` and serves a local preview.
