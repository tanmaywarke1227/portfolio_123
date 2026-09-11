# Portfolio design update

## About and project bento update

The conceptual Beneath the Surface section is replaced by About content. About retains `system-study` as the internal animation target, the original three stages and their responsive heights; `GlobalThreeD.tsx` is unchanged. The duplicate About section is removed and the hero scroll link now points to About.

Matrix stream and grid alpha increased approximately 20%. Five projects now use an asymmetric bento with full-card case-study links, pointer highlights, image hover, visible keyboard focus and reduced-motion styling. Existing project data and imagery are reused. Lint, production build/TypeScript and browser checks passed, including all five routes, mobile overflow at 320/390/768px and the processor's exploded scroll phase. Screenshots are in `.portfolio-qa/`.

## Matrix background addition

Added an independent `MatrixBackground.tsx` in the root layout. Code streams use perspective projection, depth-dependent scale and parallax, with a faint vanishing-point grid. Canvas 2D avoids adding another WebGL context beside the existing processor. Rendering is capped at 24fps desktop and 12fps mobile, stops in hidden tabs, and becomes static for reduced motion or the pause control. No external assets or paid generation are used.

Hero.tsx and GlobalThreeD.tsx remain unchanged by this addition. Local lint, production build/TypeScript, and browser checks passed, including 320/390/768px overflow, pause/resume, reduced motion and existing hero controls. External 21st review was not run because automatic approval review blocked potential source disclosure; verification stayed local.

The latest creative brief supersedes the earlier scene lock. The hero and `src/app/components/three/GlobalThreeD.tsx` now present a procedural processor assembly with metallic substrate, instanced contacts, silicon tiles, circuit traces and a translucent cover. Project 06 remains removed; five project entries remain.

## Current 3D design

- Pointer input gently tilts the assembly; the Explore layers control separates its parts.
- The new `SystemStudy.tsx` section uses scroll progress to separate and reunite the layers. The scene fades before the portfolio content to protect readability.
- Rendering runs on demand and stops once movement settles. Instancing, bounded DPR, procedural lighting and lighter geometry reduce GPU work. Narrow or low-memory devices start at lower quality; sustained slow animation frames also reduce quality.
- Reduced-motion users receive immediate state changes without damped animation or pointer tilt. WebGL failure or context loss uses a CSS assembly fallback.
- The model is a conceptual engineering visualization, not a claim about project hardware. No model, texture or HDR downloads are required.
- Development browser checks cover 320px, 390px, 768px and desktop, assembly controls, scroll phases, reduced motion and WebGL fallback. Lint and production build pass, including TypeScript.
- Production browser verification passed for all five project routes and loaded images, homepage anchors and mobile quality. No console errors, page errors or failed asset responses were recorded. Instrumented WebGL reported zero draw calls during a settled one-second idle interval and resumed rendering on pointer input. Simulated context loss displayed the fallback. Results: `.portfolio-qa/processor-production-results.json`.

The notes below record the earlier content and editorial-design work.

## Editing content

- Existing project descriptions, links and images: `src/app/data/portfolio.ts`.
- Conditional analytics workflow and high-level system flows: `src/app/data/case-studies.ts`.
- Curated skills: `portfolioData.skills`; category relationships: `components/sections/Skills.tsx`.
- Project images: add local paths to each project's `images` array. Missing images have an explicit placeholder and a failed-image fallback.

## Evidence provenance

IEEE images were retrieved from the user's Google Drive folder `IEEE Internship project based intern / Screenshots and photos (project)`:

- `public/projects/ieee-energy-rl/monitoring.png`: original `Screenshot 2026-06-25 214921.png`, Drive ID `1RWsUhw23CmA8YvwqdOEsl5qGNl5niB7A`.
- `public/projects/ieee-energy-rl/dashboard.png`: original `Screenshot 2026-06-25 214934.png`, Drive ID `1LvNq4kNSFC0V3N02y9yB_NowZggWrIWM`.
- `public/projects/ieee-energy-rl/hardware.jpeg`: original `hardware connections.jpeg`, Drive ID `17NuOfDulCGf68RUD4SzLe27Uahg2OjNq`.

Loan workflow details also reference the project README in Drive (ID `1Xrk0ovJ-g5LAx43GtEWDLvY09y4GuJ9s`). Other added workflow copy follows the supplied brief and existing project records; no new accuracy claims or split ratios were added.

The Loan Approval and Term Grant Slip Drive folders contain README files only. No matching runnable local source was found in the checked common project locations. Rainfall and Character searches returned no matching Drive files. Uchit dashboard-review and frontend-audit images were extracted from inline objects i.2 and i.1 of UCHIT_VMS_Frontend_UI_Testing_Report (Drive document ID 1mYh9vfRM6c_jqg0-gHWWigSrw9-8Ass9qycAO9XCwdE). They retain the original annotations and snapshot-mode caveat. These projects retain honest visual placeholders; no fake screenshots were generated.

Inter and Space Grotesk are now served from `public/fonts`, with their OFL licenses included, replacing the external Google Fonts CSS request.

## Verification

- All six case-study routes and their contents anchors checked in Edge through Playwright.
- Category expansion, related categories, Escape to close, pause control, mobile menu, return-to-project navigation and reduced-motion behavior checked.
- Desktop 1440px and widths 768px, 390px and 320px checked for horizontal overflow.
- Four analytics workflows render; Term Grant Slip and VMS do not show an analytics section.
- Browser run reported no page errors, console errors or failed local asset responses after fixes.
- One custom cursor DOM element; standalone analytics pipeline absent.
- Local screenshots and machine-readable results are in `.portfolio-qa/` (ignored by Git).

Known dependency warning: React Three Fiber uses `THREE.Clock`, which Three.js marks deprecated. The new scene does not rely on elapsed time or continuous rotation.


Final production check: `npm run lint` and `npm run build` both exited 0. The built site on port 3001 loaded all five evidence images and `/resume.pdf` with HTTP 200, with no console/page errors. The Skills navigation highlight, category expansion and mobile overflow check passed.
