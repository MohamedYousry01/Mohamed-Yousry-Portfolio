(() => {
  const token = document.currentScript?.dataset.cloudflareToken;
  if (!token || !/^[a-f0-9]{32}$/i.test(token)) return;
  const host = window.location.hostname.toLowerCase();
  if (['localhost', '127.0.0.1', '::1', '[::1]'].includes(host) || host.endsWith('.localhost') || host.endsWith('.test')) return;
  if (window.location.protocol !== 'https:' && window.location.protocol !== 'http:') return;
  // Astro can rerun this loader during client-side page transitions. The beacon
  // already measures SPA navigation, so install it once for the browser session.
  if (window.__portfolioCloudflareAnalyticsLoaded) return;
  window.__portfolioCloudflareAnalyticsLoaded = true;
  const beacon = document.createElement('script');
  beacon.id = 'cloudflare-web-analytics';
  beacon.type = 'module';
  beacon.defer = true;
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.setAttribute('data-cf-beacon', JSON.stringify({ token, spa: true }));
  document.head.appendChild(beacon);
})();
