# Local validation — 31 October 2026

## Passed

- Astro 7.4.4 production static build: 12 generated HTML pages (eleven main pages plus 404), robots.txt, and sitemap.
- Astro / TypeScript checks: zero errors, warnings, or hints across 30 source files.
- Internal link, asset, and anchor validator: 288 checks passed in the updated root build.
- GitHub Pages repository-path rehearsal: build with `SITE_URL=https://example.github.io` and `BASE_PATH=/engineering-portfolio/`; all 256 link / asset / anchor checks passed, including the supplied resume. Canonical URL and robots sitemap included the repository prefix. This was a local build only.
- Root build restored after repository-path rehearsal.
- All ten main pages inspected for horizontal overflow at mobile (390 px), tablet (768 px), and desktop (1440 px).
- axe-core automated checks: 33 page / viewport combinations; zero detected WCAG 2 A / AA and 2.1 AA violations. See `accessibility-audit.json`. Automated checks do not establish complete accessibility conformance.
- Five walkthrough scenes switched in-browser: firmware, control, cybersecurity, secure boot, verification. Next from the last scene returned to the first. Pause set SVG animation play state to `paused`.
- Control model: keyboard adjustment changed damping from 0.55 to 0.60 and simulated peak overshoot from 12.6% to 9.5%. Disturbance toggle and model / accessible data disclosure worked. The generated sample table exposed eleven time samples.
- Native mobile menu opened and navigated to the projects page.
- Keyboard Tab focused the visible skip link; Enter moved focus to `main`.
- System-font typography and locally supplied SVG / PNG assets avoid third-party font or image requests. Main pages reported no missing image assets during responsive checks.
- Local `npm run dev` returned HTTP 200 for the homepage and control case study. `resolve.preserveSymlinks` avoids Vite's Windows drive-discovery subprocess in this restricted environment.
- Installed final dependency tree audited by npm: zero known vulnerabilities at installation time.

## Verification limits

- The full committed Playwright suite could not launch its worker because this environment rejected the child-process spawn with `EPERM`. Functional interaction checks and the complete browser-only axe / overflow audit were run using the available browser instead. The suite remains available for a normal development environment.
- Reduced motion is implemented in both CSS and Motion's `useReducedMotion` hook. Source checks confirm that SVG / CSS animations and page transitions are disabled and the diagram-motion toggle is disabled when the preference is enabled. Switching the operating-system preference was not exercised here; the committed Playwright test includes emulation for that check.
- A development-browser navigation check stalled after the successful HTTP checks; the production preview was used for final browser verification. No production-preview rendering or interaction failure was observed.
- GitHub Actions execution, a live GitHub Pages URL, DNS, HTTPS, and custom-domain routing have not been tested because no repository was uploaded and nothing was published.

## Content update — 31 October 2026

- Original supplied resume added unchanged at `public/resume.pdf`; download links enabled.
- GitHub set to `https://github.com/MohamedYousry01`.
- Professional email and current Senior Embedded Software Engineer title aligned with the supplied resume.
- All platform references generalized to NXP Power Architecture, including SVG labels.
- Brushless DC (BLDC) motor control added to control-related skills, expertise, experience, case-study content, and conceptual actuation diagram. The interactive model remains a generic normalized educational simulation.
- No Git remote, push, publication, or deployment operation performed.
- Original and copied PDF SHA-256 digests match: `44e758d22591fe6e15c0c957d8a8ca5d787e8a43dc74bc4352857b69a5f35da0`.
- Updated axe-core / overflow audit: all 30 page / viewport combinations passed with zero detected violations; audit evidence refreshed.
- Rendered homepage inspected to confirm the GitHub URL, actual resume download, and longer platform labels.

Remaining configuration: repository / domain choice when the owner manually publishes.

WhatsApp contact update: added `https://wa.me/201121670202` to the Contact page and shared contact sections, displaying `+20 112 167 0202`. Astro / TypeScript, production build, and internal-link validation rerun. Prior full browser-audit results describe the preceding version; the WhatsApp-only update does not include a renewed browser audit. No message sent and no publication performed.

Actuator-label update: control diagrams now show `BLDC motor / blower / Valves` above `Control output`, with a two-line actuator label to retain legibility. The scene description, accessible diagram description, and control case-study approach also include valve actuation. Astro / TypeScript, build, and internal-link checks rerun; no new full browser audit for this text update.

## Compliance-section update — 31 October 2026

- CPU platform label now includes an explicit separator: `NXP Power Architecture / STM32`.
- Added a shared Medical Device Compliance & Process Engineering section to the homepage and About page, covering process and procedure development for IEC 62304, IEC 81001-5-1, and ISO 13485.
- Standard-scope descriptions checked against the linked official IEC / ISO listings. No certification or regulatory approval is claimed.
- Desktop and stacked mobile layout inspected; renewed axe-core / overflow audit passed all 30 page / viewport combinations without detected violations.
- Root build and 258 internal link / asset / anchor checks passed. The previous repository-path rehearsal remains applicable to the unchanged base-path implementation.

Timeline update: added 2017–2022 CompuTech / GEEK technical experience from the supplied resume, with each role explicitly attributed to its business. The shared timeline on Home and Experience now uses years only, including 2022–Present for the current role. No individual business start or end months were invented. Build and internal-link checks rerun.

## Homepage access & case-study wording update — 31 October 2026

- Added a Medical Device Compliance expertise card with a direct link and a featured project card, both opening `/projects/medical-device-compliance/`.
- Added the complete sixth case study with process responsibilities, standards context, an independently created process diagram, trade-offs, reviews, and contributions.
- Replaced the note on Home and Projects with: “These case studies highlight my engineering contributions. Diagrams are conceptual, and confidential implementation details are omitted.”
- Browser interaction verified that the homepage project card opens the correct case study; rendered Projects note verified against the requested wording.
- Expanded browser-audit and Playwright page lists to include the new case study. Build, TypeScript, and 287 link checks passed.

Employment, education, technology areas, and contribution descriptions should receive the owner's final editorial review before publication. No proprietary code, actual keys, production addresses, private protocols, internal reports, numerical coverage claims, or regulatory approvals are included.

Latest homepage-access revision: all 33 accessibility and overflow checks passed across eleven main pages at desktop, tablet, and mobile widths.

Portrait update: original supplied photo added beside the name, displayed in a 68 px circle on desktop and 56 px on mobile. Name size increased to 24 px / 22 px. Desktop (1440 px) and mobile (390 px) browser inspection confirmed the photo loads, the identity row fits, and there is no horizontal overflow. TypeScript and build passed; all 288 link / asset / anchor checks passed. Full accessibility audit not repeated for this visual-only change. The original PNG is served directly because the local image transformer could not process it; CSS handles cropping without altering the source image.


Portrait size refinement: increased circle to 88 px desktop / 72 px mobile. Original 649 x 770 PNG verified byte-for-byte against the supplied photo. Browser confirmed the full-resolution source loads at the intended size, with no mobile horizontal overflow. Build and all 288 link checks passed.


Standards correction: standardized IEC 81001-5-1 across cards, skills, diagrams, timeline, case-study content, and documentation. Replaced the former connected-system scope with secure health-software lifecycle activities and the official IEC source. Removed drafting notes from the public timeline, Experience page, and ventilator case-study introduction. Build, TypeScript, and all 288 internal-link checks passed.
Renewed standards-correction browser audit: all 33 page / viewport combinations passed with zero detected accessibility violations or horizontal overflow.


## Copy and Cloudflare Web Analytics update — 1 November 2026

- Replaced slogans in the homepage, navigation/contact labels, footer, page headings, engineering-scene headings, case-study architecture titles, and social card with direct descriptions of the work.
- Kept GitHub Pages hosting and the current repository path. No domain, DNS, hosting-account, commit, push, or publication changes were made.
- Added the supplied public Cloudflare Web Analytics site token in `src/data/analytics.ts`, shared page integration, and optional GitHub Actions variable support.
- Loader skips local/test hosts and offline previews, initializes once across Astro client-side transitions, and leaves automatic Cloudflare SPA measurement enabled.
- Four analytics loader tests passed, including repeated initialization and local-host exclusion. Tests use a mocked browser and do not contact Cloudflare.
- TypeScript: zero errors, warnings, or hints across 30 source files. Production build and all 288 internal link / asset / anchor checks passed.
- Configured-token build emitted the loader on all 12 HTML pages; missing-token build emitted none. Final output uses the supplied real public token.
- Browser checks confirmed the photo loads, direct headings fit desktop/mobile, and no Cloudflare beacon is loaded from localhost.
- Renewed axe-core / overflow audit: all 33 page / viewport combinations passed with no detected violations or horizontal overflow.
- Live traffic arrival in the Cloudflare dashboard remains unverified until the owner manually pushes and deploys these changes.

## Architecture animations and shared category order — 1 November 2026

- Added Quality management to System architectures. Shared category order is Firmware, Security, Secure boot, Quality management, Verification across tabs, expertise, skill groups, project groups, and current-role responsibilities. Control remains within Firmware, including BLDC motors, blowers, and valves.
- Replaced the five explorer scenes with distinct four-step visual explanations: sensor/control/actuator flow, protected-key operations, authenticated boot, procedure review and controlled release, and requirement-to-verification evidence.
- Added manual step selection, playback and replay, keyboard tab navigation, an altered-image rejection example, and a failing-test example. Automatic progression pauses offscreen and when the document is hidden. Reduced-motion preferences disable automatic playback while retaining manual inspection.
- Prevented reduced-motion preferences from changing the initial server-rendered markup during hydration.
- All 35 browser interaction checks passed: shared ordering, all twenty manual diagram stages, failure paths, keyboard navigation, playback, pause, offscreen pause, and simulated reduced-motion preference. The reduced-motion test overrides `matchMedia` in a local iframe; it does not change the operating-system preference.
- Desktop and mobile visual review confirmed the diagrams and controls fit. Paused procedure drafting displays every SOP line fully, and its active document keeps a visible blue outline.
- Astro/TypeScript checks passed with zero errors, warnings, or hints across 34 files. All four analytics loader tests passed.
- Production build and all 288 internal link, asset, and anchor checks passed. Renewed axe-core and overflow audit passed all 33 page/viewport combinations with no detected violations or horizontal overflow.
- Work remains in the local source folder for owner review. The D: GitHub repository was not modified; no commit, push, or deployment was performed.

## PID controller and IIR filter laboratory — 1 November 2026

- Replaced the damping/frequency response illustration with a discrete closed-loop PID model. Added Kc, Ti, Td, and IIR measurement-filter time constant controls, noise/load toggles, and reset.
- Upper plot compares reference, raw sensor measurement, and filtered feedback. Lower plot shows the simulated actuator command. Charts can scroll within their own region on narrow screens; the page does not overflow.
- Documented the normalized two-lag plant, 10 ms sampling, backward-Euler IIR recurrence, derivative on measurement, conditional integration, 0–3 output limits, and metric definitions. Zero Ti disables integration; zero Td disables differentiation; zero filter time constant bypasses the IIR filter.
- Five numerical tests passed, covering filter step response and noise attenuation, zero gain, P-only offset versus integral correction, load rejection, no derivative setpoint kick, reproducibility, and finite/bounded results at 36 combinations of boundary settings.
- Browser interaction confirmed all four parameters change the plotted response, filter bypass makes raw and filtered traces identical, optional inputs toggle, reset restores defaults, and the accessible table exposes 13 sample rows. Browser log contained no captured warnings or errors.
- Updated page passed three axe-core/overflow audits at 1440, 768, and 390 px. TypeScript passed across 36 files with zero errors, warnings, or hints. Production build and 288 link/asset/anchor checks passed.
- Local preview only; D: repository remains clean and unchanged. No commit, push, or deployment.

Expertise-card consistency update: removed the Quality management full-width feature override. It now uses the same card width, background, padding, icon placement, and tag divider as its siblings, while retaining its compliance link and category order. Browser inspection confirmed identical widths and automatic grid placement across the five cards. Production build and all 288 internal-link checks passed. Local changes only.

Timeline ordering update: shared Home/Experience timeline now sorts by start year, newest first: 2022–Present, 2021, 2017–2022, 2017. Equal 2017 start years retain their existing relative order. Dates remain year-only. Both built pages checked; build and 288 link checks passed. Local only.
