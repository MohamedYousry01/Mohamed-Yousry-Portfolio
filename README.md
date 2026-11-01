# Mohamed Yousry — Engineering portfolio

A local-first, light-mode portfolio for an Embedded Software & Cybersecurity Engineer. Built with Astro, TypeScript, Tailwind CSS, React islands, Motion for React, Lucide, and independently created SVG architecture diagrams. The site is static, with no application account, database, or third-party fonts. Cloudflare Web Analytics is configured with the supplied public site token and skips local development traffic.

## Run locally

Prerequisite: Node.js 24 LTS (minimum 22.12) and npm. From this directory:

```sh
npm ci
npm run dev
```

Open the printed local address, usually `http://127.0.0.1:4321/`. Stop with Ctrl+C. `npm run preview` serves a completed production build locally. On Windows, if PowerShell blocks npm scripts, use `npm.cmd` in place of `npm`.

```sh
npm run check
npm run build
npm run test:links
npm run preview
```

`dist/` is the generated static website. Do not edit it; rebuild after editing source. Dependencies are locked in `package-lock.json` for reproducible installs. System typography avoids external font loading.

## Pages and content

- `/`: introduction, five ordered expertise cards, interactive engineering walkthrough, six featured projects, career timeline, skills, and contact.
- `/about/`: background, engineering perspective, capabilities, and explicitly separated learning interests.
- `/experience/`: supplied professional and education timeline with expandable role details.
- `/projects/`: complete project overview.
- `/projects/icu-ventilator-firmware/`
- `/projects/hardware-backed-cybersecurity/`
- `/projects/secure-boot-firmware-update/`
- `/projects/real-time-control-algorithms/`: includes adjustable educational response plot and accessible data table.
- `/projects/safety-critical-verification/`
- `/projects/medical-device-compliance/`: dedicated compliance and process-engineering case study, linked from homepage expertise and project cards.
- `/contact/` and custom `/404.html`.

Edit `src/data/profile.ts` for identity, skills, expertise, LinkedIn, GitHub, email, and resume. Leave missing values empty: no broken links or invented addresses are generated. Resume buttons lead to the experience page until a real resume exists.

The supplied resume is included unchanged at `public/resume.pdf`, and resume links are enabled. GitHub is set to `https://github.com/MohamedYousry01`; the professional email and current role title follow the supplied resume. To update the resume later, replace `public/resume.pdf`. The helper adds the repository base automatically. Edit profile data if your public contact details change. Do not add secrets to profile data; it is public website content.

WhatsApp is linked at `https://wa.me/201121670202` from the Contact page and shared contact sections. Edit `whatsapp` and `phone` in `src/data/profile.ts` to change it. Opening the link starts a chat; the site does not send any message automatically.

The homepage identity row uses the supplied portrait at `src/assets/mohamed-yousry.png`, displayed as a small circular photo beside the larger name. The image file is unchanged; CSS handles the circular presentation. Replace that asset to update the photo.

Platform descriptions consistently use **NXP Power Architecture**. Brushless DC (BLDC) motor control appears in the skills, expertise, experience, control case study, and conceptual actuation diagram. No specific motor-control technique or measured motor-performance claim is implied. The downloadable resume remains the original supplied document.

The homepage and About page include **Medical Device Compliance & Process Engineering**, covering creation of processes and procedures for IEC 62304, IEC 81001-5-1, and ISO 13485. Edit `src/data/compliance.ts` to update the three standards cards; `src/components/ComplianceSection.astro` provides the shared presentation. Official standard-scope links distinguish software lifecycle, secure health-software lifecycle processes, and medical-device quality management.

Edit `src/data/projects.ts` to change project descriptions. Its typed `Project` model holds each section; all project cards and detail routes derive from that data. To add a case study, add a unique slug and complete `Project` record. Set its `area` to one of the five IDs in `src/data/engineering.ts`. Projects are sorted by that shared order and numbered automatically. Select `scene` 0–5 for a static conceptual diagram; extend `Diagram.tsx` for a new architecture. Card illustrations are mapped by stable project slug, independent of display order. Shared navigation and metadata live in `src/layouts/Layout.astro`; styling lives in `src/styles/global.css`.

## Interactions and accessibility

`EngineeringExplorer.tsx` uses the shared order **Firmware → Security → Secure boot → Quality management → Verification**. The same order controls expertise, skill categories, project groups, and role responsibilities. The Firmware area includes real-time control and motor / valve actuation; the separate control case study remains available.

Each area has four visual stages, animated signal packets, active-node highlights, and a written step explanation. Firmware adds a feedback waveform, rotor, and valve animation; Security shows protected-key boundaries; Secure boot offers valid / altered image paths; Quality management shows SOP drafting, review, controlled release, and retained records; Verification shows traceability and passing / failing demonstration tests. All visual data and outcomes are illustrative.

Tab keys use the accessible tab pattern: Left / Right Arrow, Home, and End move between areas. Selecting a numbered step pauses automatic playback for inspection. Play / pause and replay controls are available. Automatic progression runs only when visible and the document is active, and is disabled for reduced-motion preferences. `AnimatedArchitecture.tsx` provides the SVG artwork; `src/data/architecture-scenes.ts` contains step explanations. The original `Diagram.tsx` provides static diagrams for the hero and case studies.


`ControlLab.tsx` provides an independent discrete PID simulation with Kc, Ti, Td, and a first-order IIR measurement-filter time constant. `src/data/control-simulation.ts` computes the closed-loop response at 100 Hz, including derivative on measurement, conditional-integration anti-windup, output limits, reproducible sensor noise, and an optional sustained load disturbance. Ti = 0 disables integration; Td = 0 disables differentiation; filter time constant zero bypasses filtering. Plots show reference, raw measurement, filtered feedback, and the simulated actuator output. The disclosure documents equations, plant assumptions, metric definitions, and accessible tabular data. Use `npm run test:control` for numerical checks. This educational simulation uses no production device data.

Native mobile navigation and timeline disclosures work without client JavaScript. Skip navigation, semantic landmarks, visible focus, labeled controls, diagram descriptions, and reduced-motion support are included.

## Browser verification

The committed Playwright suite tests all pages at desktop and mobile widths, internal navigation, the five scenes, pause controls, control plots, keyboard focus, reduced motion, and automated accessibility checks. It serves a production build itself:

```sh
npx playwright install chromium
npm run check
npm run build
npm run test:links
npm run test:browser
```

Use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` if Chromium is installed at a custom path. Screenshots and failure traces are written under ignored test-report directories. Automated checks complement visual and manual keyboard inspection; they do not establish formal accessibility conformance.

If your environment prevents Playwright from launching a worker process, the browser-only audit can run without one:

```sh
npm run build
node scripts/prepare-audit.mjs
npm run preview
```

Open `http://127.0.0.1:4321/__audit.html`, then choose **Run all accessibility checks**. It runs axe-core and overflow checks on all eleven main pages at 1440, 768, and 390 px. This harness uses the root-path build. Run `npm run build` again afterward to remove the temporary audit page and axe asset from `dist` before packaging or deploying. The harness is not part of the public site.

For the interactive architectures, also open `/__architecture-audit.html` and choose **Run interaction checks**. It checks the shared order, all twenty stages, rejection and failure behavior, keyboard navigation, automatic playback, and pause / offscreen behavior. `scripts/prepare-audit.mjs` prepares both local harnesses; a production rebuild removes them.

## Cloudflare Web Analytics

The site remains on GitHub Pages. Optional Cloudflare Web Analytics measures traffic and performance without changing hosting or DNS. See [CLOUDFLARE.md](CLOUDFLARE.md) for the free account setup, public site-token configuration, and verification steps. The supplied public site token is configured in `src/data/analytics.ts`; it takes effect after these changes are manually pushed and deployed.

Configure `CLOUDFLARE_WEB_ANALYTICS_TOKEN` as a GitHub repository Actions variable, or set `cloudflareWebAnalyticsToken` in `src/data/analytics.ts`. Never supply a Cloudflare API token. Run `npm run test:analytics` to verify local-host exclusion and once-only initialization across page transitions.

## GitHub Pages deployment

The existing GitHub Pages workflow runs when you push to `main` or manually dispatch it. Local edits are not published until you commit and push them yourself.

1. Review content, supply your real GitHub / email / resume as desired, and verify that all material is approved for public sharing.
2. Create your chosen GitHub repository. Copy this project source, including dotfiles and `package-lock.json`, into its root. Exclude `node_modules`, `.npm-cache`, `.astro`, `dist`, and test artifacts.
3. Commit and push to the repository’s `main` branch.
4. In GitHub **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**.
5. In **Actions**, run **Deploy portfolio to GitHub Pages**, or push another commit to `main`.
6. The workflow installs from the lockfile, runs Astro / TypeScript checks, reads the Pages origin and base path, builds, validates local links, uploads `dist`, and deploys. Open the URL shown by the deployment job.

The workflow uses Pages-provided `origin` and `base_path`: both account sites (`ACCOUNT.github.io`) and repository sites (`ACCOUNT.github.io/REPOSITORY/`) work without hardcoded account names. The `href()` helper prefixes navigation, assets, resume links, and case studies with Astro’s build-time base. Sitemap, canonical URLs, Open Graph image, and robots.txt use the same deployment configuration.

To rehearse a repository deployment locally in PowerShell:

```powershell
$env:SITE_URL = 'https://YOUR-ACCOUNT.github.io'
$env:BASE_PATH = '/YOUR-REPOSITORY/'
npm run build
npm run test:links
npm run preview
# Open http://127.0.0.1:4321/YOUR-REPOSITORY/
Remove-Item Env:SITE_URL, Env:BASE_PATH
```

In a POSIX shell: `SITE_URL=https://YOUR-ACCOUNT.github.io BASE_PATH=/YOUR-REPOSITORY/ npm run build`, followed by `BASE_PATH=/YOUR-REPOSITORY/ npm run test:links`.

### Custom domain

Configure your domain in the repository’s **Settings → Pages → Custom domain**, add the DNS records GitHub instructs for your domain, and enable HTTPS when available. An optional `public/CNAME` file may hold the domain alone, without scheme or path. Rerun the workflow after configuring the custom domain so canonical metadata and sitemap use the Pages-reported origin and root base. For a manual build set `SITE_URL=https://your-domain.example` and `BASE_PATH=/`. Do not commit the example domain. Validate DNS/HTTPS in GitHub before announcing the site publicly.

## Professional accuracy

The portfolio uses only supplied employment / education dates and areas of professional contribution. It does not claim certification, regulatory approval, achieved coverage percentages, performance gains, or dated project milestones. Embedded Linux, Yocto, and C++ remain learning interests. Diagrams, memory regions, and plots are sanitized, independent illustrations. Verification sections describe engineering considerations, not unpublished test results. Do not insert confidential specifications, proprietary code, production addresses, keys, private protocols, or internal reports.

See `VALIDATION.md` for the results collected for this delivery.

