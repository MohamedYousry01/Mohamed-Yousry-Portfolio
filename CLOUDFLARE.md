# Cloudflare Web Analytics on GitHub Pages

The portfolio stays hosted on GitHub Pages. Cloudflare is used only for Web Analytics: no hosting migration, DNS change, custom domain, or paid plan is required.

The supplied public Web Analytics token is configured in `src/data/analytics.ts`. It will be used after these local changes are committed, pushed, and deployed. A build-time repository variable can override it. Traffic has not yet been verified in the Cloudflare account.

## Create the analytics site

1. Sign in to [Cloudflare](https://dash.cloudflare.com/).
2. Open **Web Analytics** and choose **Add a site**.
3. In **Set up hostname**, enter `mohamedyousry01.github.io`. Do not include `https://` or `/Mohamed-Yousry-Portfolio/` in the hostname field.
4. Select the suggested hostname and choose **Done**.
5. Open **Manage site** and copy the JavaScript snippet.
6. The value inside `data-cf-beacon` named `token` is the public site identifier. It is normally 32 hexadecimal characters. This is not a Cloudflare API token and does not grant account access.

Official references: [setup for sites not proxied through Cloudflare](https://developers.cloudflare.com/web-analytics/get-started/), [free Web Analytics overview](https://developers.cloudflare.com/web-analytics/about/).

## Add the token using GitHub settings

1. Open `MohamedYousry01/Mohamed-Yousry-Portfolio` on GitHub.
2. Open **Settings → Secrets and variables → Actions → Variables**.
3. Choose **New repository variable**.
4. Name: `CLOUDFLARE_WEB_ANALYTICS_TOKEN`.
5. Value: only the public token from the snippet, without quotes or JSON.
6. Save and rerun **Deploy portfolio to GitHub Pages** after the updated workflow and source have been manually pushed.

The workflow passes this variable to Astro as `PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN`. The public identifier is rendered into the website as required by Cloudflare. Never put an API token or password into this variable.

Alternatively, paste the public identifier into `cloudflareWebAnalyticsToken` in `src/data/analytics.ts`, then commit and push the change manually. The build-time environment variable takes precedence. Leave both empty to disable analytics.

## Implementation

- `CloudflareAnalytics.astro` is included in the shared page layout, so all portfolio pages are covered.
- The Cloudflare beacon loads once per full page load, with automatic SPA measurement enabled across Astro client-side transitions. Astro client-side navigation does not create duplicate beacon instances.
- The loader skips localhost, loopback addresses, `.localhost` and `.test` hosts, and offline file previews. Local design reviews do not count as public visits.
- No custom click tracking, fingerprinting, API calls, or account credentials are added.
- When disabled, the component does not render its loader or make Cloudflare requests.

Cloudflare documents automatic navigation measurement in its [SPA support guide](https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/).

## Verify after deployment

1. Visit your public portfolio and navigate to a few case studies.
2. In browser developer tools, confirm `beacon.min.js` loads from `static.cloudflareinsights.com` and that only one element with ID `cloudflare-web-analytics` exists.
3. Return to Cloudflare **Web Analytics** and select the site to view traffic and performance statistics. Data may take a few minutes to appear.
4. Browser extensions that block analytics can prevent a visit from being recorded.

Run `npm run test:analytics` for the loader's initialization, local-host exclusion, missing-token, and SPA deduplication checks. These tests do not contact Cloudflare. A successful build is not proof that data is arriving in a Cloudflare account; that final check requires the real site token and the deployed site.

