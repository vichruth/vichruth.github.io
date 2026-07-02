# Vichruth M. — Portfolio

Personal portfolio site. Machine learning & edge-AI engineering — computer vision, LLMs, and models optimized to run natively on resource-constrained hardware.

**Live:** [vichruth.github.io](https://vichruth.github.io)

## Tech stack

- **React 19** + **TypeScript**
- **Vite** (build & dev server)
- **Tailwind CSS v4**
- **Motion** for scroll-driven animation
- **lucide-react** for icons

## Local development

```bash
npm install
npm run dev      # start dev server on http://localhost:3000
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # type-check with tsc
```

## Deployment

The site is built with Vite and deployed to GitHub Pages automatically via GitHub Actions
(`.github/workflows/deploy.yml`) on every push to `main`.

## Structure

```
src/
  App.tsx              # page composition
  data.ts              # all content (projects, experience, skills, education)
  types.ts             # shared types
  components/          # section components
```

Content lives in `src/data.ts` — edit there to update projects, experience, and skills.
